/* eslint-disable prettier/prettier */
import React from 'react';
import 'react-native-gesture-handler';
import Navigator from './components/utils/navigator.js';
import SQLite from 'react-native-sqlite-2';

  export default class App extends React.Component {
    constructor(props) {
      super(props);
      const db = SQLite.openDatabase('test.db', '1.0', '', 1);
      db.transaction(function (txn) {
        txn.executeSql('CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(30),password VARCHAR(30), admin INTEGER)',[]);
        txn.executeSql('SELECT * FROM `Users`', [], function (tx, res) {
          var len = res.rows.length;
          if (len === 0){
            txn.executeSql('Insert INTO `Users` (username,password,admin) VALUES ("Admin","admin",1)', []);
          }
        });
        txn.executeSql('CREATE TABLE IF NOT EXISTS Items(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(30),category VARCHAR(30), adminId INTEGER, FOREIGN KEY(adminId) REFERENCES Users(id))',[]);
      });
    }
    render() {
      return (
        <Navigator/>
      );
    }
  }
