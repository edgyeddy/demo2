/**
 * LICENSE: http://www.wtfpl.net/txt/copying/
 */
'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
/*****************************************************************************/
/*
 * JavaScript Pretty Date
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 */

// Takes an ISO time and returns a string representing how
// long ago the date represents.
function prettyDate(time) {
  var date = new Date(Date.parse(time));
  //console.log("TIME/DATE=" + time + " --> " + date);
  //var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
  var diff = (((new Date()).getTime() - date.getTime()) / 1000),
    day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

  return day_diff == 0 && (
    diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
}
/*****************************************************************************/
// Custom component: ListItem
/*****************************************************************************/
class ListItem extends React.PureComponent {
  static navigationOptions = {
    title: 'Results',
  };
  _onPress = () => {
    this.props.onPressItem(this.props.item.url, this.props.index);
  }

  render() {
    const item = this.props.item;
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
/*****************************************************************************/
// This screen
/*****************************************************************************/
export default class SearchResults extends Component {
  
  static navigationOptions = {
    title: 'Results',
  };

  constructor()
  {
      super();
 
      this.state =
      {
          isLoading: true,
          JSON_from_server: [],
          fetching_Status: false,
      }
 
      this.page = -1
  }

  componentDidMount()
  {
      this.page = this.page + 1;
 
      var url = this.state.url  + '&page=' + this.page;
              console.log("A SET STATE URL=" + url);
      //fetch('https://reactnativecode.000webhostapp.com/counting_table.php?page=' + this.page)
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) =>
      {
          this.setState({ JSON_from_server: [ ...this.state.JSON_from_server, ...responseJson ], isLoading: false });
      })
      .catch((error) =>
      {
          console.error(error);
      });
  }

  fetch_more_data_from_server =()=>
  {        
      this.page = this.page + 1;
 
      this.setState({ fetching_Status: true }, () =>
      {
              var url = this.state.url  + '&page=' + this.page;
              console.log("B SET STATE URL=" + url);
              //fetch('https://reactnativecode.000webhostapp.com/counting_table.php?page=' + this.page)
              fetch(url)
              .then((response) => response.json())
              .then((responseJson) =>
              {
                  this.setState({ JSON_from_server: [ ...this.state.JSON_from_server, ...responseJson ], fetching_Status: false });
              })
              .catch((error) =>
              {
                  console.error(error);
              });
         
      });
  }

  Render_Footer=()=>
  {
    return (
        <View style = { styles.footerStyle }>

            <TouchableOpacity 
                activeOpacity = { 0.7 } 
                style = { styles.TouchableOpacity_style }
                onPress = { this.fetch_more_data_from_server } 
                >

                <Text style = { styles.TouchableOpacity_Inside_Text }>Load More Data From Server</Text>
                {
                    ( this.state.fetching_Status )
                    ?
                        <ActivityIndicator color = "#fff" style = {{ marginLeft: 6 }} />
                    :
                        null
                }

            </TouchableOpacity> 

        </View>
    )
  }

  _keyExtractor = (item) => item.id.toString();

  _renderItem = ({ item, index }) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (url, index) => {
    console.log("Arg url: " + url);
    console.log("Arg index: " + index);
    this.props.navigation.navigate(
      'Detail', { index: index, url: url });
  };

  render() {
    const { params } = this.props.navigation.state;    
    const url = params ? params.url : null;
    this.state.url = url;
    return (
      <FlatList
        //data={params.listings}
        data = { this.state.JSON_from_server }
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListFooterComponent = { this.Render_Footer }
      />
    );
  }
}
/*****************************************************************************/
// Styles
/*****************************************************************************/
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
  footerStyle:
  {
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: '#009688'
  },
 
  TouchableOpacity_style:
  {
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F44336',
    borderRadius: 5,
  },
 
  TouchableOpacity_Inside_Text:
  {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18
  },
});
