/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler} from 'react-native';
import {ListItem, Icon, Input, Text, Button} from 'react-native-elements';
import styles from './LoginHomeStyle.js';
import SQLite from 'react-native-sqlite-2';
// import BackgroundTimer from 'react-native-background-timer';
// import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';

var list = [];
const db = SQLite.openDatabase('test.db', '1.0', '', 1);

export default class LoginHome extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     reload: 0,
        //     refresh: true,
        //     isVisible:false,
        //     info:false,
        //     edit: false,
        //     add: false,
        //     added: false,
        //     imagePicker: false,
        //     icon_name:'Pick an Image',
        //     index:'',
        //     name:'',
        //     avatar_url:'',
        //     subtitle:'',
        //     url:'',
        //     uri:'',
        //     source:'',
        // };
    }
    // componentDidMount(){
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    //     BackgroundTimer.runBackgroundTimer(() => {
    //             this.GetDatas();
    //     }, 5000);
    // }

    // handleBackButton() {
    //     return true;
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttons_container}>
                    <Button title='Login' type='solid' style={styles.button} onPress={() => this.props.navigation.navigate('Login')}/>
                    <Button title='SignIn' type='solid' style={styles.button} onPress={() => this.props.navigation.navigate('SignIn')}/>
                </View>
            </View>
        );
    }
}