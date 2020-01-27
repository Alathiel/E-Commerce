/* eslint-disable prettier/prettier */
'use strict';

var React = require('react-native');

var {StyleSheet} = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ffffff',
        minHeight: '100%',
        minWidth: '100%',
    },
    logo_container:{
        minWidth: '90%',
        minHeight: '50%',
    },
    buttons_container:{
        minWidth: '90%',
        maxWidth: '90%',
        minHeight: '50%',
        justifyContent: "center",
    },
    button:{
        paddingTop:30,
    },
  });
