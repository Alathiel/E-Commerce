/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler,FlatList} from 'react-native';
import {Image, Text, Card, Icon, Button, ListItem} from 'react-native-elements';
import styles from './ProductsViewStyle';
import SQLite from 'react-native-sqlite-2';
import BackgroundTimer from 'react-native-background-timer';
import { NavigationEvents } from 'react-navigation';
import NavigationService from '../../utils/NavigationService';
import Modal, {ModalContent, ModalTitle} from 'react-native-modals';

var datas = [];
var userID;
const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);

export default class ProductsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: 0,
            id:'',
            name:'',
            categoryItem:'',
            isVisible: false,
            info: false,
            view:true,
            source: '',
            icon:'view-list',
        };
        this.props.navigation.addListener('willFocus', () => {//category change
            datas.splice(0);
            this.getDatas();
        });
        this.props.navigation.addListener('didFocus', () => {});
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle:'Products',
            headerLeft: ()=>(
                    <TouchableWithoutFeedback onPress={() => NavigationService.navigate('UserHome')} style={{paddingLeft: 20, paddingTop:2}}>
                      <Icon name='home' type='material-icons' color='black'/>
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

    componentWillMount(){
        const refreshTimeout = BackgroundTimer.setTimeout(() => {this.getDatas();}, 200);
        const refreshTimeout2 = BackgroundTimer.setTimeout(() => {this.getDatas();}, 1000);
    }

    componentDidMount(){
        const refreshTimeout = BackgroundTimer.setTimeout(() => {this.getDatas();}, 200);
        this.setState({categoryItem: this.props.navigation.getParam('category','default-value')});
        this.getUserID();
        this.getDatas();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        true;
    }

    getUserID(){
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM Logged', [], function (tx, res) {
                let row = res.rows.item(0);
                userID = row.user;
            });
        });
    }

    getDatas()
    {
        var categoryItem = this.state.categoryItem;
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM Items where category="'+categoryItem+'"', [], function (tx, res) {
                var len = res.rows.length;
                var rows = [];
                for (let i = 0; i < len; i++) {
                    let row = res.rows.item(i);
                    rows [i] = row;
                }
                datas = rows.filter(rows => rows.category != datas.category && rows.name!=datas.name);
            });
        });
        this.forceRemount();
    }

    forceRemount = () => {
        this.setState(({ reload }) => ({
          reload: reload + 1,
        }));
    }

    onDidFocus()
    {
        this.getDatas();
        this.getDatas();
    }

    renderItems(){
        if (this.state.view){
            return (
                <ScrollView key={this.state.reload} locked={true} style={{maxHeight:'95%',alignContent:'center'}}>
                    <Button title='refresh' onPress={()=> this.getDatas()}/>
                    <Text h4 style={{textAlign:'center',paddingBottom:10}}>Products of {this.props.navigation.getParam('category','default-value')}</Text>
                    <FlatList data={datas} numColumns={2} keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                            <TouchableWithoutFeedback onPress={() => this.setState({ info: true, uri:item.img, name:item.name, category:item.category})}>
                                <Card containerStyle={styles.card} image={{ uri: item.img}}>
                                    <Text style={{textAlign:'center',fontSize:20}}>{item.name}</Text>
                                </Card>
                            </TouchableWithoutFeedback>
                        </View>
                    )}/>
                </ScrollView>
            );
        }
        else {
            return (
                <ScrollView key={this.state.reload} locked={true} style={{maxHeight:'95%',alignContent:'center'}}>
                <Button title='Refresh' onPress={()=> this.getCategories()}/>
                <Text h4 style={{textAlign:'center',paddingBottom:10}}>Products of {this.props.navigation.getParam('category','default-value')}</Text>
                {
                    datas.map((l, i) => (
                      <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.img } }}
                        title={l.name}
                        bottomDivider
                        onPress={() => this.setState({ info: true, uri:l.img, name:l.name, category:l.category})}/>
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
            <NavigationEvents onWillFocus={payload => console.log('will focus', payload)} onDidFocus={payload => console.log('did focus', payload)}
                onWillBlur={payload => console.log('will blur', payload)} onDidBlur={payload => console.log('did blur', payload)}/>

                <Modal onHardwareBackPress={() => this.setState({ info: false })} modalStyle={styles.showInfoModal} modalTitle={<ModalTitle title="Product Informations"/>}
                    visible={this.state.info} onTouchOutside={() => {this.setState({ info: false});}}>
                    <ModalContent>
                    <Image source={{uri:this.state.uri}} style={{minWidth:'100%',minHeight:'50%'}} containerStyle={{borderTopWidth:15,borderBottomWidth:15,borderColor:'rgba(52, 52, 52, 0.0)'}}/>
                    <View style={{flexDirection:'row'}}><Text style={styles.infoText}>Name:</Text><Text style={{fontSize:20}}> {this.state.name}</Text></View>
                    <View style={{flexDirection:'row'}}><Text style={styles.infoText}>Category:</Text><Text style={{fontSize:20}}> {this.state.category}</Text></View>
                    </ModalContent>
                </Modal>

                <View style={{flexDirection:'row-reverse'}} backgroundColor='rgba(52, 52, 52, 0.0)'>
                    <TouchableWithoutFeedback onPress={()=>{this.changeState()}}>
                        <Icon name={this.state.icon} type='material-community' color='black'/>
                    </TouchableWithoutFeedback>
                </View>
                {this.renderItems()}
            </View>
        );
    }
}
