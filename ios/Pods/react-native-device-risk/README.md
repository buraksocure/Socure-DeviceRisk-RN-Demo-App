# Socure Device Risk SDK React Native Bridge

# Version: 1.0.0.68 - Release Date : February 17, 2022

The Socure Device Risk SDK React Native bridge provides Reach developers with the ability to call the Socure Device Risk SDK, either the [Android](https://github.com/socure-inc/Socure-DeviceRisk-Android-sdk) or [iOS](https://github.com/socure-inc/Socure-DeviceRisk-iOS-sdk) native library variants, through React. 

This guide covers the integration within React, as well as React Native implementation on iOS and Android. 

**Minimum Requirements**
iOS 12 and above
Android SDK version 21

## Introduction
Please read the documentation on either the [Android](https://github.com/socure-inc/Socure-DeviceRisk-Android-sdk) or [iOS](https://github.com/socure-inc/Socure-DeviceRisk-iOS-sdk) native library variants to understand how the Device Risk SDK works.

## Installation
### Android
**Step 1: Open the module level build.gradle for the main project module and inside of the defaultConfig section, set the minSdkVersion to 22**

**Step 2: Synchronize your gradle projects**

The Android side of the Bridge should be ready to run.

Note: If pulling from Maven, implement the below)
```
buildscript {
	…………..
	dependencies {
		……………………
		classpath ‘com.github.dcendents:android-maven-gradle-plugin:1.5’
	}
}
```

(NOT IN THE `buildscript` code block above. allprojects is a sibling to build script)
```
You will receive a username and token from Socure
Place these variables in you gradle.properties file inside your Android project

allprojects {
    repositories {
        …….

        maven {
            url “https://jitpack.io” 
	   credentials { username authToken }
        }
    }
}
```

In the module level build.gradle implement the below in the dependencies section:
```
dependencies {
	implementation ‘com.github.socure-inc:Socure-DeviceRisk-React-sdk:1.0.0.68’
}
```

**Step 3: Synchronize the project gradle**

Android Setup should be completed and ready to use.

**Step 4: Add the Device Risk package**

In the file MainApplication.java add the Device Risk package.

First, add the following import declaration

```
    import com.reactnativedevicerisk.DeviceRiskPackage;
```
Then add the package into the `getPackages` function

```
    packages.add(new DeviceRiskPackage());    
```

Your file should look similar to the following:

```
    import com.reactnativedevicerisk.DeviceRiskPackage;

    //[...More Code...]

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
          
      packages.add(new DeviceRiskPackage());
      return packages;
    }
```
### iOS 

**Step 0: Install cocoapods-user-defined-build-types**

Since the Socure Document Verification SDK is an XCFramework, Cocoapods doesn’t easily allow dynamic frameworks to intermingle with static libraries. This gem modifies Cocoapods to allow both to exist at the same time. Follow the instructions over at [https://github.com/joncardasis/cocoapods-user-defined-build-types](https://github.com/joncardasis/cocoapods-user-defined-build-types)

**Step 1: Install Socure SDK React Native Bridge using CocoaPods (recommended)**

Before your `target`, add the following:

```
plugin 'cocoapods-user-defined-build-types'
enable_user_defined_build_types!
```

and inside your `target`, add the corresponding `pod` lines 

```
use_frameworks!

  pod 'DeviceRisk', :build_type => :dynamic_framework, :git =>'git@github.com:socure-inc/socure-ios-sdk.git'
  pod 'react-native-device-risk', :git => 'git@github.com:socure-inc/socure-devicerisk-react-sdk.git'
```

Update your pods from the terminal
```
pod install
```

You can also copy the folder `react-native-device-risk` and add it along with your other React Native pods. 

**Step 1.5: Add Placehodler Swift File**

Since the Device Risk SDK was written in Swift, it requires that the Swift runtime libraries be included into your application. If you're not using any Swift code in your application, then you need to add an empty Swift file into your project. In doing so, it will add a Objective-C Bridging Header to your project.

**Step 2: Add appropriate permissions for the services you want DeviceRisk SDK to use**

This is explained in more detail in the [native iOS library’s introduction](https://github.com/socure-inc/Socure-DeviceRisk-iOS-sdk#introduction)

**Step 3: Import the SDK into your desired View Controller**

Call `import DeviceRisk` at the top of your View Controller.

## Usage

Copy the content of the root `index.js` file into your project, and you should be set. 

## Set-up and configuration

The main class used by the DeviceRisk SDK is `DeviceRiskManager`. All subsequent functions are available via `DeviceRiskManager`.

### setTracker

```
setTracker(key:String, sources:[DeviceRiskDataSources])
```

Where the `key` input parameter is your SDK key procured from the Socure admin dashboard. `DeviceRiskDataSources` is an enum that encompasses all of the different device features and services we support., and the function `setTracker` is expecting an array of `DeviceRiskDataSources` to determine which data from which services to expect. 

These are:

### DeviceRiskDataSources

```
    case device
    case accelerometer
    case motion
    case magnetometer
    case locale
    case location
    case advertising
    case pedometer
    case network
    case accessibility
    case external
```

If you wanted to track all services possible, for example, you would call `setTracker` as so: 

```
DeviceRiskManager.sharedInstance.setTracker(key: "your-key-goes-here", sources:  [.device, .network, .accessibility, .locale, .advertising, .accelerometer,.magnetometer,.motion, .pedometer, .location, .external])
```

Note: you must call RnDeviceRisk.toggleUserConsent(state) _before_ setTracker for Android and iOS.

### sendData

`sendData` communicates with Socure’s back-end services, takes all of the information provided and calculates a `UUID` for your device.  Please note: once successful, you can retrieve the calculated UUID from the `uuid` variable of `DeviceRiskManager`. 

Call `DeviceRiskManager.sendData()`. It returns a “promise” which can then be managed with an `async/await` call or with a `.then` call.  

You can call `sendData` like so: 

```
DeviceRiskManager.sendData().then((res) => {
      navigation.navigate(‘ScannedInformation’, res);
    });
```

## Example
Within this directory is an example React project that showcases how to use Device Risk. The file `App.js` shows the JS function calls used and how to ultimately retrieve the Device Risk Session ID. 

## Device Validation
If you'd like to implement a device validation call using our ID Plus services from within your app, you would need to implement the appropriate network call to our `EmailAuthScore` endpoint. This call requires two parameters:
- `modules`, which is an array object, of which you MUST include devicerisk as one of the objects inside of the array in order to use Socure's Device Risk services
- `deviceSessionId`, which uses the `UUID` calculated by DeviceRiskManager

## FAQ's
Make sure you are using the latest version

- Getting 'RnDeviceRisk' not found or doesn't exist?
    Android: Make sure you added the module into the MainApplication class
        into getPackages function `packages.add(new DeviceRiskPackage());`

- Setting trackers throws an error they are not valid? (NoSuchFieldError) \n
    You can use the `getConstants` method to know the real name of the providers.
    Because at the native level, Android and iOS handle differently the string enum convertion. Make sure to send the right one for each platform.

- Lib isn't working properly?
    Make sure you call `setTracker` using the right token and later call `sendData`

- Not seeing any request firing?
    Make sure to call `toggleUserConsent` with true before the `sendData` call

- Getting IllegalArgumentException or similar when calling function?
    This are the argument types of each function. Check if you are sending the right one.

    `toggleUserConsent (state: Boolean)`
    `setTracker (socureKey: String, providers: [String])`
    
Main Libraries we are using at the SDK level, so you can check if you have any version conflicts.

```
implementation 'com.google.android.gms:play-services-location:17.1.0'
implementation 'androidx.ads:ads-identifier:1.0.0-alpha04'

// coroutines
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.1"
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.4.0"
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-rx2:1.3.2"
implementation 'com.karumi:dexter:6.2.1'
implementation 'com.google.code.gson:gson:2.8.6'

// Network
implementation 'com.squareup.retrofit2:retrofit:2.6.2'
implementation 'com.squareup.retrofit2:converter-gson:2.6.2'
implementation 'com.squareup.okhttp3:logging-interceptor:4.2.2'
implementation 'androidx.legacy:legacy-support-v4:1.0.0'

// Used for the calls to addCallback() in the snippets on this page.
implementation 'com.google.guava:guava:28.0-android'

implementation "com.github.drewnoakes:metadata-extractor:2.15.0"
```
    

