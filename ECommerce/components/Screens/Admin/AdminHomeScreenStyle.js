/* eslint-disable prettier/prettier */
'use strict';

var React = require('react-native');

var {StyleSheet} = React;

module.exports= StyleSheet.create({
  MainContainer: {
      minHeight:'97%',
      maxHeight:'97%',
      minWidth:'95%',
      alignContent:'center',
    },
    fixedButton: {
      position:'absolute',
      bottom: 20,
      right: 20,
      width: 46,
      height: 46,
      backgroundColor: "#42a5f5",
      borderRadius: 46,
      borderColor:'#2597f4',
      borderWidth:0.1,
      alignContent: "center",
      justifyContent: "center",
    },
    modal: {
      maxHeight:'35%',
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
