/* eslint-disable prettier/prettier */
'use strict';

var React = require('react-native');

var {StyleSheet} = React;

module.exports= StyleSheet.create({
  MainContainer: {
      minHeight:'97%',
      maxHeight:'97%',
      minWidth:'97%',
      alignContent:'center',
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
