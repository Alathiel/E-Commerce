/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler} from 'react-native';
import {Button, Icon, Input, Text, Card, Image} from 'react-native-elements';
import styles from './UserHomeScreenStyle';
import SQLite from 'react-native-sqlite-2';
import BackgroundTimer from 'react-native-background-timer';
import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';
import NavigationService from '../../utils/NavigationService';

var categories = [];
var userID;
const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);

export default class UserHomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: 0,
            source:'',
        };
        //account/screen change
        this.props.navigation.addListener('willFocus', () => {
            // categories = categories.filter(categories => categories.adminId == userID);
            this.getCategories();
        });
        this.props.navigation.addListener('didFocus', () => {});
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: ()=>(
                <TouchableWithoutFeedback onPress={() => NavigationService.navigate('UserHome')} style={{paddingLeft: 20, paddingTop:2}}>
                    <Icon name='home' type='material-icons' color='black'/>
                </TouchableWithoutFeedback>
            ),
            headerRight: ()=>(
                <TouchableWithoutFeedback onPress={() => NavigationService.navigate('Settings')} style={{paddingLeft: 20, paddingTop:2}}>
                    <Icon name='settings' type='material-icons' color='black'/>
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

    componentWillMount(){ //first load
        this.getUserID();
        const timeoutId = BackgroundTimer.setTimeout(() => {this.getCategories();}, 200);
    }

    componentDidMount(){
        this.getUserID();
        this.getCategories();
        this.forceRemount();
    }

    getUserID(){
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM Logged', [], function (tx, res) {
                let row = res.rows.item(0);
                userID = row.user;
            });
        });
    }

    getCategories()
    {
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM `Items` GROUP BY category', [], function (tx, res) {
                var len = res.rows.length;
                var rows = [];
                for (let i = 0; i < len; i++) {
                    let row = res.rows.item(i);
                    rows [i] = row;
                }
                categories = rows.filter(rows => rows.category != categories.category);
            });
        });
        this.forceRemount();
    }

    forceRemount = () => {
        this.setState(({ reload }) => ({
          reload: reload + 1,
        }));
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Modal onHardwareBackPress={() => this.setState({ isVisible: false })} modalStyle={styles.modal} visible={this.state.isVisible} onTouchOutside={() => {this.setState({ isVisible: false });}}>
                    <ModalContent>
                        <ModalButton text='Delete' onPress={() => {this.setState({ isVisible: false }); this.delete(this.state.category);}}/>
                        <ModalButton text='Edit' onPress={() => {this.setState({ edit: true }); this.showEditInfo(this.state.category);}}/>
                        <ModalButton text='Show Informations' onPress={() => {this.setState({ info: true }); this.showInfo(this.state.index);}}/>
                    </ModalContent>
                </Modal>

                <ScrollView key={this.state.reload} locked={true} style={{maxHeight:'95%',alignContent:'center'}}>
                <Button title='Refresh' onPress={()=> this.getCategories()}></Button>
                    <Text h4 style={{textAlign:'center',paddingBottom:10}}>Categories</Text>
                    {
                        categories.map((l, i) => (
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('UserProductsView',{category: l.category})}
                            onLongPress={() => this.setState({ isVisible: true, category: l.category})}>
                            <Card key={i} containerStyle={styles.card} image={{ uri: l.img}} featuredTitle={l.category}>
                                <Text style={{textAlign:'center',fontSize:20}}>{l.category}</Text>
                            </Card>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}