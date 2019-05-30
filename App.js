import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import Router from './src/modules/Router';
import OneSignal from 'react-native-onesignal';

export default class App extends Component {

  componentWillMount() {
    OneSignal.init("5e88f222-9236-4542-84d9-ad1b38297e83");
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Router />
      </SafeAreaView>
    );
  }
}