/* eslint-disable prettier/prettier */
'use strict';

var React = require('react-native');

var {StyleSheet} = React;

module.exports= StyleSheet.create({
  MainContainer: {
      paddingTop:10,
      minHeight:'100%',
      minWidth:'100%',
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
    optionsList: {
      alignContent: "center",
      justifyContent: "center",
    },
    modal: {
      maxHeight:'50%',
      alignContent: "center",
      justifyContent: "center",
    },
    showInfoModal: {
      maxWidth:'90%',
      minWidth:'90%',
    },
    infoText:{
      fontSize:20,
    },
    editModal: {
      maxWidth:'90%',
      minWidth:'90%',
    },
    editInput: {
      paddingBottom:10,
    },
    editLabel: {
      paddingTop:25,
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
    }
  });
