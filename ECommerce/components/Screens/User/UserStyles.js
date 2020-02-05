/* eslint-disable prettier/prettier */
'use strict';

var React = require('react-native');

var {StyleSheet} = React;

module.exports= StyleSheet.create({
  MainContainer: {
        minHeight:'97%',
        maxHeight:'97%',
        minWidth:'97%',
    },
    optionsList: {
        alignContent: "center",
        justifyContent: "center",
    },
    modal: {
        maxHeight:'40%',
        alignContent: "center",
        justifyContent: "center",
    },
    showInfoModal: {
        maxWidth:'90%',
        minWidth:'90%',
    },
    infoText:{
        fontSize:20,
        fontWeight:'bold',
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
    tableTitle:{
        fontSize:20,
        fontWeight:'bold',
    },
    tableText:{
        fontSize:20,
    },
  });
