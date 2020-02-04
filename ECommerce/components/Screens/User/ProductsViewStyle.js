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
        fontWeight:'bold'
    },
  });
