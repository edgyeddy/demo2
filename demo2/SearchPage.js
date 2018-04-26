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

function countProperties(obj) {
  return Object.keys(obj).length;
}
function urlForQueryAndPage(key1, value1, key2, value2, pageNumber) {
  const data = {
    //page: pageNumber,
  };
	/*
  const data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  */
  data[key1] = value1;
  data[key2] = value2;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  //return 'https://api.nestoria.co.uk/api?' + querystring;
  return 'https://jobs.github.com/positions.json?' + querystring;
}
export default class SearchPage extends Component<{}> {
  static navigationOptions = {
    title: 'demo2',
  };
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      searchStringLocation: '', // 'barcelona',
      searchStringDescription: '', // 'javascript',
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
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      //.then(json => this._handleResponse(json.response))
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
    /*
    if (response.application_response_code.substr(0, 1) === '1') {
      console.log('Properties found: ' + response.listings.length);
    } else {
      this.setState({ message: 'Location not recognized; please try again.'});
    }
    */
    /*
    var num = response.length;
    if (num > 0) {
      console.log('Properties found: ' + num);
    } else {
      this.setState({ message: 'Location not recognized; please try again.'});
    }
    */
  };

  _onSearchPressed = () => {
    Keyboard.dismiss();
    //const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
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
          color='#48BBEC'
          title='Go'
        />
        <Image source={require('./Resources/my_icon.png')} style={styles.image} />
        <Text style={styles.description}>{this.state.message}</Text>
        {spinner}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    flexDirection: 'column',
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    /*
    flexDirection: 'row',    
    height: 36,
    padding: 4,
    //marginRight: 5,
    //flex:1,
    //flexGrow: 1,
    fontSize: 18,
    margin: 5,
    alignSelf: 'stretch',
    flex: 1,
    */
    /*
    
    flexGrow: 1,
    margin: 5,
    alignSelf: 'stretch',
    textAlign: 'center',
    */
  },
  flowRight: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    //flex: 1,    
  },
  flowVertical: {
    /*
    //flex: 1,
    margin: 5,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    */
  },
  searchInput: {
    margin: 5,
    alignSelf: 'stretch',
    height: 36,
    padding: 4,
    //marginRight: 5,
    //flex:1,
    //flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    marginTop: 10,
    width: 128,
    height: 128,
  },
});