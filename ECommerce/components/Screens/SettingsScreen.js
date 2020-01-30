/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler, ImageBackground} from 'react-native';
import {Button, Icon, Input, Text, Card, Image} from 'react-native-elements';
import styles from './UserHomeScreenStyle.js';
import SQLite from 'react-native-sqlite-2';
import BackgroundTimer from 'react-native-background-timer';
import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';
import ImagePicker from 'react-native-image-picker';
import NavigationService from '../utils/NavigationService';

var categories = [];
var userID;
const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: 0,
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: ()=>(
                <TouchableWithoutFeedback onPress={() => NavigationService.navigate('UserHome')} style={{paddingLeft: 20, paddingTop:2}}>
                    <Icon name='home' type='material-icons' color='black'/>
                </TouchableWithoutFeedback>
            ),
            headerStyle: {
                backgroundColor: 'rgba(52, 52, 52, 0.0)',
                shadowColor: 'transparent',
                borderBottomWidth: 0,
                shadowOpacity: 0,
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
                shadowRadius: 0,
                elevation: 0,
            },
        };
    };


    render() {
        return (
            <View style={styles.MainContainer}>
            </View>
        );
    }
}
