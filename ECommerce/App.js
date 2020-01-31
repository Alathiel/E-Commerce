/* eslint-disable prettier/prettier */
import React from 'react';
import 'react-native-gesture-handler';
import Navigator from './components/utils/navigator.js';
import SQLite from 'react-native-sqlite-2';

var items = [{
    name:'c',
    category:'aa',
    adminId:1,
  },
  {
    name:'a',
    category:'bb',
    adminId:1,
  },
];

  export default class App extends React.Component {
    constructor(props) {
      super(props);
      const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);
      db.transaction(function (txn) {
        txn.executeSql('CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(30),password VARCHAR(30), admin VARCHAR(30))',[]);
        txn.executeSql('SELECT * FROM `Users`', [], function (tx, res) {
          var len = res.rows.length;
          if (len === 0){
            txn.executeSql('Insert INTO `Users` (username,password,admin) VALUES ("Admin","admin","Yes")', []);
            txn.executeSql('Insert INTO `Users` (username,password,admin) VALUES ("AdminYes","adminyes","Yes")', []);
          }
        });
        txn.executeSql('CREATE TABLE IF NOT EXISTS Items(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(30),category VARCHAR(30), adminId INTEGER, img VARCHAR(30), FOREIGN KEY(adminId) REFERENCES Users(id))',[]);
        txn.executeSql('CREATE TABLE IF NOT EXISTS Logged(login INTEGER, user INTEGER, FOREIGN KEY(user) REFERENCES Users(id))',[]);

        // items.forEach(element => {
        //   txn.executeSql('INSERT INTO Items (name,category,adminId) VALUES ("' + element.name + '","'+element.category+'",' + element.adminId + ')',[]);
        // });
      });
    }
    render() {
      return (
        <Navigator/>
      );
    }
  }
