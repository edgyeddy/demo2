/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict'; // ev>
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
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';
import Detail from './Detail';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
// https://stackoverflow.com/questions/49789150/warning-ismounted-is-deprecated-in-plain-javascript-classes
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

type Props = {};
//export default class App extends Component<Props> {
/*	
class SearchPage extends Component<{}> {
	static navigationOptions = {
		title: 'demo2',
	};
  render() {
	  return <Text style={styles.description}>555</Text>;
	  //return React.createElement(Text, {style: styles.description}, "Hello, World!");
	  / *
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
	* /	
  }
}
*/
const App = StackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
  Detail: { screen: Detail },
});
export default App;
/*
const styles = StyleSheet.create({
	description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
*/
