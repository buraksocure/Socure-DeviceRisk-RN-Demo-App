/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  Text,
  useColorScheme,
  View,
  NativeModules,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  var [uuid, setUUID] = useState("");

  function configProfile() {
    NativeModules.Profiling.configProfile(value => {
      console.log("Profile: " + value)
    })
  }

  function getUUID() {
    return uuid;
  }

  function doProfile() {
    NativeModules.Profiling.sendData(value => {
      console.log("Profile: " + value)
      setUUID(value);
    })
  }

return (
  <SafeAreaView>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic" style="styles"> 
      <Header />
      <View>
        <Text onPress={configProfile}> Configure Device Risk SDK</Text>
      </View>
      <View>
        <Text onPress={doProfile}> do Profiling </Text>
      </View>
      <View>
        <Text>Device ID: {uuid} </Text>
      
      </View>
    </ScrollView>
  </SafeAreaView>
)

}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  Text: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
