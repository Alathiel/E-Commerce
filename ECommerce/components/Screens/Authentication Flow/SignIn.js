/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback} from 'react-native';
import {ListItem, Icon, Input, Text, Button} from 'react-native-elements';
import styles from './LoginStyle.js';
import SQLite from 'react-native-sqlite-2';
// import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';

const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);
var x = true;
var users = [];

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            secure:true,
            icon:'eye',
        };
    }

    signIn(){
        let username = this.state.username;
        let password = this.state.password;
        if (username!='' && password!=''){
            db.transaction(function (txn) {
                txn.executeSql('SELECT * FROM `Users`', [], function (tx, res) {
                    var len = res.rows.length;
                    for (var i = 0; i < len; i++) {
                        users [i] = res.rows.item(i);
                    }
                    users = users.filter(users => users.username == username);
                    if (users.length == 0)
                    {
                        db.transaction(function (txn) {
                            txn.executeSql('Insert INTO `Users` (username,password,admin) VALUES ("'+username+'","'+password+'","No")',[]);
                        });
                        alert("Utente aggiunto con successo");
                    }
                    else {
                        alert('Username già in uso, prova con un altro');
                    }
                });
            });
        }
        else {
            alert('Compila tutti i campi');
        }
        this.setState({username:'', password:''});
    }

    visibility(){
        if (this.state.secure){
            this.setState({secure:false,icon:'eye-off'});
        }
        else {
            this.setState({secure:true,icon:'eye'});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                 <View style={styles.inputs_container}>
                    <Input label='Username' placeholder='Hi, Write Here!!' containerStyle={{maxWidth:'90%'}}
                    onChangeText={(username) => this.setState({username})} value={this.state.username}/>
                    <View style={{flexDirection:'row'}}>
                        <Input label='Password' placeholder='Hi, Write Here!!' containerStyle={{maxWidth:'90%',paddingBottom:20,paddingTop:20}}
                        secureTextEntry={this.state.secure} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                        <Icon name={this.state.icon} type='material-community' color='grey' onPress={()=>this.visibility()}
                        containerStyle={{paddingTop:60,paddingRight:50}}/>
                    </View>
                </View>
                <Button title='Sign In' type='solid' style={{paddingTop:15}} onPress={() => this.signIn()}/>
            </View>
        );
    }
}