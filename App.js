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

const store = createStore(mainReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <AppNavigator/>
      </Provider>
    );
  }
}
