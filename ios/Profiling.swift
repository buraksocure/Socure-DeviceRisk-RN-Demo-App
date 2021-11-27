//
//  Profiling.swift
//  Device Risk Profiling App
//
//  Created by BURAK KEBAPCI on 11/27/21.
//

import Foundation
import DeviceRisk

@objc(Profiling)

class Profiling: NSObject {
  
  let deviceRiskManager = DeviceRiskManager.sharedInstance
  var existingDeviceRiskUUID:String? = nil
  
  @objc
  func configProfile(_ callback: RCTResponseSenderBlock) {
    if let uuid = UserDefaults.standard.string(forKey: "DeviceRiskUUID") {
        existingDeviceRiskUUID = uuid
    }
    deviceRiskManager.setTracker(key: "dff2ebfc-fbdf-4d77-80f2-78f9900978f2", sources:  [.device, .network, .accessibility, .locale, .advertising, .accelerometer,.magnetometer,.motion, .pedometer, .location], existingUUID: existingDeviceRiskUUID)
    deviceRiskManager.delegate = self
    callback(["profiling configured"])
  }
  
  @objc
  func sendData(_ callback: RCTResponseSenderBlock) {
    deviceRiskManager.sendData()
    callback([existingDeviceRiskUUID ?? "profile failed"])
  }
  
}


extension Profiling:DeviceRiskUploadCallback {
    func dataUploadFinished(uploadResult: DeviceRiskUploadResult) {
        print(uploadResult.uuid ?? "")
        if let uuid = uploadResult.uuid {
            UserDefaults.standard.setValue(uuid, forKey: "DeviceRiskUUID")
        }
    }
    
    func onError(errorType: DeviceRiskErrorType, errorMessage: String) {
        print(errorMessage)
    }
    
    
}



