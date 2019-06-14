/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducers/mainreducer';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { ThemeProvider } from 'react-native-elements';

const store = createStore(mainReducer);

const AppContainer = createAppContainer(AppNavigator);

// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

/*  // fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
}*/

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      	<ThemeProvider>
        	<AppContainer />
        </ThemeProvider>
      </Provider>
    );
  }
}
