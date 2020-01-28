/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import NavigationService from '../utils/NavigationService';

const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);

export default class UserHomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM `Logged`', [], function (tx, res) {
              var len = res.rows.length;
              if (len == 0){
                txn.executeSql('INSERT INTO Logged (login) VALUES (0)',[]);
                // NavigationService.navigate('LoginFlow');
                NavigationService.navigate('LoginFlow');
              }
              else {
                let row = res.rows.item(0);
                if (row.login == 0)
                {
                  // NavigationService.navigate('LoginFlow');
                  NavigationService.navigate('LoginFlow');
                }
                else {
                  // NavigationService.navigate('App');
                  NavigationService.navigate('App');
                }
              }
            });
          });
    }


    render() {
        return (
            <View>
            </View>
        );
    }
}