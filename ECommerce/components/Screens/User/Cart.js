/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler,} from 'react-native';
import {Image, Text, Card, Icon, Button, ListItem, Input, Divider} from 'react-native-elements';
import styles from './UserStyles';
import SQLite from 'react-native-sqlite-2';
import BackgroundTimer from 'react-native-background-timer';
import { NavigationEvents } from 'react-navigation';
import NavigationService from '../../utils/NavigationService';
import Modal, {ModalContent, ModalTitle} from 'react-native-modals';
import { Table, Row,Rows, Cell } from 'react-native-table-component';
import ModalFooter from 'react-native-modals/dist/components/ModalFooter';
import ModalButton from 'react-native-modals/dist/components/ModalButton';
import ProductsView from '../Admin/ProductsView';

var products = [];
var items = [];
const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload:0,
            userID:this.props.navigation.getParam('userID','default-value'),
        };
        this.props.navigation.addListener('willFocus', () => {
            this.getProducts();
        });
        this.props.navigation.addListener('didFocus', () => {
            this.getProducts();
        });
    }


    getProducts()
    {
        var userID = this.state.userID;
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM Cart LEFT JOIN Items ON Cart.productID = Items.id', [], function (tx, res) {
                var len = res.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = res.rows.item(i);
                    products [i] = row;
                }
                products = products.filter(rows => rows.user == userID && rows.user!=products.user && rows.productID!=products.productID);
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
            <View style={styles.MainContainer} key={this.state.reload}>
            <NavigationEvents onWillFocus={payload => console.log('will focus', payload)} onDidFocus={payload => console.log('did focus', payload)}
            onWillBlur={payload => console.log('will blur', payload)} onDidBlur={payload => console.log('did blur', payload)}/>

            <ScrollView locked={true} style={{maxHeight:'95%',minWidth:'95%',alignContent:'center'}}>
                <View style={{flexDirection:'row',flex:1,minWidth:'95%',borderWidth:0.5,borderColor:'grey'}}>
                    <View style={{flex:0.25,borderRightWidth:0.5,borderColor:'grey'}}><Text style={styles.tableTitle}>N°</Text></View>
                    <View style={{flex:0.25,borderColor:'grey',borderRightWidth:0.5}}><Text style={styles.tableTitle}>Name</Text></View>
                    <View style={{flex:0.25,borderColor:'grey',borderRightWidth:0.5}}><Text style={styles.tableTitle}>Category</Text></View>
                    <View style={{flex:0.25}}><Text style={styles.tableTitle}>Quantity</Text></View>
                </View>
                {
                    products.map((items,i) => (
                    <View style={{flexDirection:'row',flex:1,minWidth:'95%',borderColor:'grey',borderBottomWidth:0.5,borderLeftWidth:0.5,borderRightWidth:0.5}}>
                        <View style={{flex:0.25,borderRightWidth:0.5,borderColor:'grey'}}><Text style={styles.tableTitle}>{i}</Text></View>
                        <View style={{flex:0.25,borderColor:'grey',borderRightWidth:0.5}}><Text style={styles.tableTitle}>{items.name}</Text></View>
                        <View style={{flex:0.25,borderColor:'grey',borderRightWidth:0.5}}><Text style={styles.tableTitle}>{items.category}</Text></View>
                        <View style={{flex:0.25}}><Text style={styles.tableTitle}>{items.qnt}</Text></View>
                    </View>
                    ))
                }
            </ScrollView>

            </View>
        );
    }
}
