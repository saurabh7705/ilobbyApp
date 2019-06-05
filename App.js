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
