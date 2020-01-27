/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler} from 'react-native';
import {ListItem, Icon, Input, Text, Button} from 'react-native-elements';
import styles from './LoginStyle.js';
import SQLite from 'react-native-sqlite-2';
import NavigationService from '../../utils/NavigationService';
// import BackgroundTimer from 'react-native-background-timer';
// import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';

const db = SQLite.openDatabase('test.db', '1.0', '', 1);
var x = true;

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    login(){
        let username = this.state.username;
        let password = this.state.password;
        var i=0;
        if (username != '' && password != ''){
            db.transaction(function (txn) {
                txn.executeSql('SELECT * FROM `Users`', [], function (tx, res) {
                    var len = res.rows.length;
                    for (; i < len; i++) {
                        let row = res.rows.item(i);
                        if (username == row.username && password == row.password)
                        {
                            NavigationService.navigate('UserHome');
                            break;
                        }
                    }
                    if (i == len){
                        alert('Login Fallito');
                    }
                });
            });
            if (x == false){
                alert('Login Fallito');
            }
        }
        else {
            alert('Compila tutti i campi');
        }
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
                <Button title='Login' type='solid' style={{paddingTop:15}} onPress={() => this.login()}/>
            </View>
        );
    }
}