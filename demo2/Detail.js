/**
 * LICENSE: http://www.wtfpl.net/txt/copying/
 */
'use strict';

import React, { Component } from 'react';
import {
  WebView,
  ActivityIndicator,
} from 'react-native';
/*****************************************************************************/
const title = 'demo2 - Detail';
class Constants {
  static get title() {
    return title;
  }
}
/*****************************************************************************/
export default class Detail extends Component<{}> {
  static navigationOptions = {
    title: Constants.title,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  _onLoadStart = () => {
    //console.log("URL: " + JSON.stringify(this));    
  };
  render() {
    const { params } = this.props.navigation.state;
    const url = params ? params.url : null;
    const spinner = this.state.isLoading ?
      <ActivityIndicator size='large' style={{ marginTop: 10 }} /> : null;
    return (
      <WebView
        startInLoadingState={true}
        onLoadStart={this._onLoadStart}
        source={{ uri: url }}
        style={{ marginTop: 0, width: '100%' }}
      />
    );
  }
}
/*****************************************************************************/