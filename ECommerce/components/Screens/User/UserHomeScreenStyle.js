/* eslint-disable prettier/prettier */
'use strict';

var React = require('react-native');

var {StyleSheet} = React;

module.exports= StyleSheet.create({
  MainContainer: {
      paddingTop:10,
      minHeight:'95%',
      maxHeight:'95%',
      minWidth:'95%',
      alignContent:'center',
    },
    modal: {
      maxHeight:'40%',
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
    card: {
      alignSelf:'center',
      minWidth:'90%',
      maxWidth:'90%',
    },
    imagePickerModal: {
      maxWidth:'90%',
      minWidth:'90%',
      minHeight:'20%',
    },
    imagePickerButtons: {
      maxHeight:'30%',
      minHeight:'30%',
      paddingTop:40,
    },
  });
