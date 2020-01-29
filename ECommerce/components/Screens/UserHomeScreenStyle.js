/* eslint-disable prettier/prettier */
'use strict';

var React = require('react-native');

var {StyleSheet} = React;

module.exports= StyleSheet.create({
  MainContainer: {
      paddingTop:10,
      minHeight:'95%',
      minWidth:'95%',
    },
    fixedButton: {
      position:'absolute',
      bottom: 30,
      right: 30,
      width: 46,
      height: 46,
      backgroundColor: "#42a5f5",
      borderRadius: 46,
      borderColor:'#2597f4',
      borderWidth:0.1,
      alignContent: "center",
      justifyContent: "center",
    },
    editModal: {
      maxWidth:'90%',
      minWidth:'90%',
    },
    editInput: {
      paddingBottom:10,
    },
  });
