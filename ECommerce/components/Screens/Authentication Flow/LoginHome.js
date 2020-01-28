/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import styles from './LoginHomeStyle.js';


export default class LoginHome extends React.Component {
    constructor(props) {
        super(props);
    }

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