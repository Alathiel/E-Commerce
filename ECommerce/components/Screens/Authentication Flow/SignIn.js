/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler} from 'react-native';
import {ListItem, Icon, Input, Text, Button} from 'react-native-elements';
import styles from './LoginStyle.js';
import SQLite from 'react-native-sqlite-2';
// import BackgroundTimer from 'react-native-background-timer';
// import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';

var list = [];
const db = SQLite.openDatabase('test.db', '1.0', '', 1);

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                 <View style={styles.inputs_container}>
                 <Input label='Username' placeholder='Hi, Write Here!!' style={{paddingBottom:20}}
                onChangeText={(username) => this.setState({username})} value={this.state.username}/>
                <Input label='Password' placeholder='Hi, Write Here!!' style={{paddingBottom:20,paddingTop:20}} secureTextEntry={true}
                onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                </View>
                <Button title='Sign In' type='solid' style={{paddingTop:15}} onPress={() => this.props.navigation.navigate('Login')}/>
            </View>
        );
    }
}