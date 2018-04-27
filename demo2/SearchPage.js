/**
 * LICENSE: http://www.wtfpl.net/txt/copying/
 */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  Keyboard,
} from 'react-native';
/*****************************************************************************/
/**
 * Constants
 */
const rootUrl = 'https://jobs.github.com/positions.json?';
const demoLocation = ''; // 'london'
const demoDescription = ''; // 'javascript'
const title = 'demo2'
const colorPrimary = '#48BBEC';
const colorText = '#656565';
class Constants {
  static get rootUrl() {
    return rootUrl;
  }
  static get demoLocation() {
    return demoLocation;
  }
  static get demoDescription() {
    return demoDescription;
  }
  static get title() {
    return title;
  }
  static get colorPrimary() {
    return colorPrimary;
  }
  static get colorText() {
    return colorText;
  }
}
/*****************************************************************************/
/**
 * Given an object, returns the number of elements (keys) it has.
 */
function countProperties(obj) {
  return Object.keys(obj).length;
}
/*****************************************************************************/
/**
 * Generates a URL + query string from a set of 2 keyvalues (location and description).
 */
function urlForQueryAndPage(key1, value1, key2, value2, pageNumber) {
  const data = {
    //page: pageNumber, Unused for now due to the incremental scroll (it has its own page variable).
  };

  data[key1] = value1;
  data[key2] = value2;

  // Converts keyvalues in map to a query string.
  const querystring = Object
    .keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return Constants.rootUrl + querystring;
}
/*****************************************************************************/
export default class SearchPage extends Component<{}> {
  static navigationOptions = {
    title: Constants.title,
  };
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      searchStringLocation: Constants.demoLocation,
      searchStringDescription: Constants.demoDescription,
      isLoading: false,
    };
  }
  _onSearchLocationTextChanged = (event) => {
    this.setState({ searchStringLocation: event.nativeEvent.text });
    //console.log('Current: '+this.state.searchStringLocation+', Next: '+event.nativeEvent.text);
  };
  _onSearchDescriptionTextChanged = (event) => {
    this.setState({ searchStringDescription: event.nativeEvent.text });
    //console.log('Current: '+this.state.searchStringDescription+', Next: '+event.nativeEvent.text);
  };
  _executeQuery = (query) => {
    console.log("_executeQuery() : " + query);
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(query, json))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened:\n' + error
        }));
  };
  _handleResponse = (query, response) => {
    var num = countProperties(response);
    console.log("Query=" + query);
    console.log("Response=" + num);
    // TODO: Amagar missatge mentre navega a nova pàgina.
    this.setState({ isLoading: false, message: 'Last search returned ' + num + ' postings' });
    this.props.navigation.navigate(
      'Results', { url: query, listings: response });
  };
  _onSearchPressed = () => {
    Keyboard.dismiss();
    const query = urlForQueryAndPage('location', this.state.searchStringLocation, 'description', this.state.searchStringDescription, 0);
    this._executeQuery(query);
  };
  render() {
    //console.log('SearchPage.render');
    const spinner = this.state.isLoading ?
      <ActivityIndicator size='large' style={{ marginTop: 10 }} /> : null;
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Find job postings on github!
        </Text>
        <Text style={styles.description}>
          Search by location or description.
        </Text>
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.searchInput}
          value={this.state.searchStringLocation}
          onChange={this._onSearchLocationTextChanged}
          placeholder='Search by location' />
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.searchInput}
          value={this.state.searchStringDescription}
          onChange={this._onSearchDescriptionTextChanged}
          placeholder='Search by description' />
        <Button
          style={styles.button}
          onPress={this._onSearchPressed}
          color={Constants.colorPrimary}
          title='Go'
      />
        <Image source={require('./Resources/my_icon.png')} style={styles.image} />
        <Text style={styles.description}>{this.state.message}</Text>
        {spinner}
      </View>
    );
  }
}
/*****************************************************************************/
const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: Constants.colorText,
  },
  container: {
    flexDirection: 'column',
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
    flex: 1,
  },
  button: {        
  },
  flowRight: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',    
  },
  flowVertical: {
   
  },
  searchInput: {
    margin: 5,
    alignSelf: 'stretch',
    height: 36,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: Constants.colorPrimary,
    borderRadius: 8,
    color: Constants.colorPrimary,
  },
  image: {
    marginTop: 10,
    width: 128,
    height: 128,
  },
});
/*****************************************************************************/