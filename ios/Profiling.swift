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
    deviceRiskManager.setTracker(key: "990c3f80-4162-4410-841c-63a9ec0bef16", sources:  [.device, .network, .accessibility, .locale, .advertising, .accelerometer,.magnetometer,.motion, .pedometer, .location], existingUUID: existingDeviceRiskUUID)
    callback(["profiling configured"])
  }
  
  @objc
  func sendData(_ callback: RCTResponseSenderBlock) {
    deviceRiskManager.sendData()
    callback([existingDeviceRiskUUID])
  }
  
}
