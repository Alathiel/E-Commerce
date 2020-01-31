/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler, ImageBackground} from 'react-native';
import {Button, Icon, Input, Text, Card, Image} from 'react-native-elements';
import SQLite from 'react-native-sqlite-2';
import BackgroundTimer from 'react-native-background-timer';
import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';
import NavigationService from '../utils/NavigationService';

var userID;
var permissions;
const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: 0,
            admin : 'No',
        };
        this.props.navigation.addListener('willFocus', () => {
            this.getUserID();
            this.showPermissions();
            this.setState({admin:permissions});
        });
        this.props.navigation.addListener('didFocus', () => {
            this.getUserID();
            this.showPermissions();
            this.setState({admin:permissions});
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
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

    componentWillMount(){
        this.getUserID();
    }

    componentDidMount(){
        this.getUserID();
        // this.showPermissions();
    }

    getUserID(){
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM Logged', [], function (tx, res) {
                let row = res.rows.item(0);
                userID = row.user;
            });
        });
    }

    showPermissions(){
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM Users WHERE id='+userID, [], function (tx, res) {
                var row = res.rows.item(0);
                permissions=row.admin;
            });
        });
        this.forceRemount();
    }

    logout(){
        db.transaction(function (txn) {
            txn.executeSql('UPDATE Logged SET login=0',[]);
        });
        NavigationService.navigate('Home');
    }

    forceRemount = () => {
        this.setState(({ reload }) => ({
          reload: reload + 1,
        }));
    }

    render() {
        return (
            <View key={this.state.reload}>
                <Text style={{fontSize:20,alignSelf:'center'}}>Admin Permissions: {this.state.admin}</Text>
                <Button title='Logout' onPress={()=> this.logout()}></Button>
            </View>
        );
    }
}
