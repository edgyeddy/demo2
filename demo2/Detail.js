'use strict';

import React, { Component } from 'react';
import {
  WebView,
  ActivityIndicator,
} from 'react-native';

export default class Detail extends Component<{}> {
  static navigationOptions = {
    title: 'Detail',
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  _onLoadStart = () => {
    //console.log("URL4: " + JSON.stringify(this));    
  };
  render() {
    const { params } = this.props.navigation.state;
    const url = params ? params.url : null;
    const spinner = this.state.isLoading ?
      <ActivityIndicator size='large' style={{ marginTop: 10 }} /> : null;
    return (
      <WebView
         startInLoadingState={true} 
        //source={{ uri: 'https://github.com/facebook/react-native' }}
        //onLoadStart={this._onLoadStart}
        source={{ uri: url }}
        style={{ marginTop: 0 }}
      />
    );
  }
}