'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';

/*
 * JavaScript Pretty Date
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 */

// Takes an ISO time and returns a string representing how
// long ago the date represents.
function prettyDate(time) {
  var date = new Date(Date.parse(time));
  console.log("TIME/DATE=" + time + " --> " + date);
  //var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
  var diff = (((new Date()).getTime() - date.getTime()) / 1000),
    day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

  return day_diff == 0 && (
    diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
}

class ListItem extends React.PureComponent {
  static navigationOptions = {
    title: 'Results',
  };
  _onPress = () => {
    //console.log(JSON.stringify(this.props.item.url));
    this.props.onPressItem(this.props.item.url, this.props.index);
  }

  render() {
    const item = this.props.item;
    //const price = item.price_formatted.split(' ')[0];
    const date = prettyDate(item.created_at);
    const url = item.url;
    const company_location = item.company + " @ " + item.location;
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.company_logo }} />
            <View style={styles.textContainer}>
              <Text style={styles.title}
                numberOfLines={1}>{item.title}</Text>
              <Text style={styles.company_location}>{company_location}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }
}
export default class SearchResults extends Component {
  static navigationOptions = {
    title: 'Results',
  };

  //_keyExtractor = (item, index) => index;
  _keyExtractor = (item) => item.id.toString();

  /*
  _renderItem = ({item}) => {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'>
        <View>
          <Text>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
    
  };
  */
  _renderItem = ({ item, index }) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (url, index) => {
    console.log("Arg url: " + url);
    console.log("Arg row: " + index);
    //console.log("ITEM: " + item.url);
    this.props.navigation.navigate(
      'Detail', { index: index, url: url }); // 'https://www.google.es'  });
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <FlatList
        data={params.listings}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    resizeMode: 'center',    
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  date: {
    fontSize: 14,
    color: '#656565'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  company_location: {
    fontSize: 14,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});
