import React from 'react';

import { StyleSheet, Button, View, SafeAreaView, Text, Alert, NativeModules } from 'react-native';
const { RnDeviceRisk } = NativeModules;

RnDeviceRisk.toggleUserConsent(true);

const startDocV = () => {
 onSetTracker();
};

const App = () => (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
       React-Native Device Risk
      </Text>
      <Button
        title="Start Fingerprint"
        onPress={startDocV}
      />
    </View>
    {/* <View>
      <Text>{this.state.value}</Text>
    </View> */}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const onSetTracker = async () => {
  try {
    await RnDeviceRisk.setTracker(
      '990c3f80-4162-4410-841c-63a9ec0bef16',
      ["Locale","Network","Device"]
      );

      onSendData();
  } catch (error) {
    Alert.alert('Failed', `${error}`);
  }
};

const onSendData = async () => {
  try{
    const res = await RnDeviceRisk.sendData();
    const { deviceRiskSessionId } = res;
    Alert.alert('Success', `Device Risk Sesison ID: ${deviceRiskSessionId}`);
  } catch(error){
    Alert.alert('Failed', `${error}`);
  }
}

export default App;
