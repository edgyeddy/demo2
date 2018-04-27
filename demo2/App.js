/**
 * LICENSE: http://www.wtfpl.net/txt/copying/
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
/*****************************************************************************/
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';
import Detail from './Detail';
/*****************************************************************************/
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
/*****************************************************************************/
// https://stackoverflow.com/questions/49789150/warning-ismounted-is-deprecated-in-plain-javascript-classes
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
/*****************************************************************************/
type Props = {};

const App = StackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
  Detail: { screen: Detail },
});
export default App;
/*****************************************************************************/
