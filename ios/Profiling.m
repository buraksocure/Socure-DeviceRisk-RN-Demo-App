//
//  Profiling.m
//  ProfilingApp
//
//  Created by BURAK KEBAPCI on 11/27/21.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(Profiling, NSObject)
RCT_EXTERN_METHOD(sendData: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(configProfile: (RCTResponseSenderBlock)callback)
@end
