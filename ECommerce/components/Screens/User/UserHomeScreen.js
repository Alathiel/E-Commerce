/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler,FlatList} from 'react-native';
import {Button, Icon, Text, Card, ListItem} from 'react-native-elements';
import styles from './UserStyles';
import SQLite from 'react-native-sqlite-2';
import BackgroundTimer from 'react-native-background-timer';
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
            view:true,
            icon:'view-list',
        };
        //account/screen change
        this.props.navigation.addListener('willFocus', () => {
            this.getCategories();
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        });
        this.props.navigation.addListener('didFocus', () => {
            this.getCategories();
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle:'Home',
            headerLeft: ()=>(
                <Icon name='home' type='material-icons' color='black' onPress={() => NavigationService.navigate('UserHome')} containerStyle={{paddingLeft: 10, paddingTop:2}}/>
            ),
            headerRight: ()=>(
                <View style={{paddingRight: 10, paddingTop:2,flexDirection:'row'}}>
                <Icon name='cart' type='material-community' color='black' onPress={() => NavigationService.navigate('Cart',{userID: userID})} containerStyle={{paddingRight:10}}/>
                <Icon name='settings' type='material-icons' color='black' onPress={() => NavigationService.navigate('Settings')}/>
                </View>
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
        const timeoutId2 = BackgroundTimer.setTimeout(() => {this.getCategories();}, 1000);
    }

    componentDidMount(){
        const timeoutId = BackgroundTimer.setTimeout(() => {this.getCategories();}, 200);
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

    handleBackButton() {
        BackHandler.exitApp();
    }

    navigation(category){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        this.props.navigation.navigate('UserProductsView',{category: category});
    }

    renderItems(){
        if(this.state.view){
            return(
                <ScrollView key={this.state.reload} locked={true} style={{maxHeight:'95%',alignContent:'center'}}>
                    <Button title='Refresh' onPress={()=> this.getCategories()}/>
                    <Text h4 style={{textAlign:'center',paddingBottom:10}}>Categories</Text>
                    <FlatList data={categories} numColumns={2} keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                            <TouchableWithoutFeedback onPress={() => this.navigation(item.category)}>
                                <Card containerStyle={styles.card} image={{ uri: item.img}} featuredTitle={item.category}/>
                            </TouchableWithoutFeedback>
                        </View>
                    )}/>
                </ScrollView>
            );
        }
        else{
            return(
                <ScrollView key={this.state.reload} locked={true} style={{maxHeight:'95%',alignContent:'center'}}>
                <Button title='Refresh' onPress={()=> this.getCategories()}/>
                <Text h4 style={{textAlign:'center',paddingBottom:10}}>Categories</Text>
                {
                    categories.map((l, i) => (
                      <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.img } }}
                        title={l.category}
                        bottomDivider
                        onPress={() => this.navigation(l.category)}/>
                    ))
                }
                </ScrollView>
            );
        }
    }

    changeState()
    {
        if(this.state.view)
        this.setState({view:false,icon:'view-module'});
        else
        this.setState({view:true,icon:'view-list'});
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={{flexDirection:'row-reverse'}} backgroundColor='rgba(52, 52, 52, 0.0)'>
                    <TouchableWithoutFeedback onPress={()=>{this.changeState()}}>
                        <Icon name={this.state.icon} type='material-community' color='black' containerStyle={{paddingRight:10}}/>
                    </TouchableWithoutFeedback>
                </View>
                {this.renderItems()}
            </View>
        );
    }
}