/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {Icon, Input, Text, Button} from 'react-native-elements';
import styles from './LoginStyle.js';
import SQLite from 'react-native-sqlite-2';
import NavigationService from '../../utils/NavigationService';

const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);
var users = [];

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            secure:true,
            icon:'eye',
        };
    }

    login(){
        let username = this.state.username;
        let password = this.state.password;
        if (username != '' && password != ''){
            db.transaction(function (txn) {
                txn.executeSql('SELECT * FROM `Users`', [], function (tx, res) {
                    var len = res.rows.length;
                    for (var i = 0; i < len; i++) {
                        users [i] = res.rows.item(i);
                    }
                    users = users.filter(users => users.username == username && users.password == password);
                    if (users.length > 0)
                    {
                        txn.executeSql('UPDATE Logged SET login=1, user=' + users [0].id,[]);
                        if (users [0].admin == 'Yes'){
                            NavigationService.navigate('AdminHome');
                        }
                        else {
                            NavigationService.navigate('UserHome');
                        }
                    }
                    else {
                        alert('Login Fallito');
                    }
                });
            });
        }
        else {
            alert('Compila tutti i campi');
        }
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
                        containerStyle={{paddingTop:40,paddingRight:50}}/>
                    </View>
                </View>
                <Button title='Login' type='solid' style={{paddingTop:15}} onPress={() => this.login()}/>
            </View>
        );
    }
}