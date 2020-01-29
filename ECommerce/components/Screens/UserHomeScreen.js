/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler} from 'react-native';
import {Button, Icon, Input, Text, Card} from 'react-native-elements';
import styles from './UserHomeScreenStyle.js';
import SQLite from 'react-native-sqlite-2';
// import BackgroundTimer from 'react-native-background-timer';
import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';
// import ImagePicker from 'react-native-image-picker';

var categories = [];
var userID;
const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);

export default class UserHomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: 0,
            add: false,
        };
    }

    getCategories()
    {
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM `Items` GROUP BY category', [], function (tx, res) {
                var len = res.rows.length;
                var rows = [];
                for (let i = 0; i < len; i++) {
                    let row = res.rows.item(i);
                    rows [i] = row.category;
                }
                categories = rows.filter(category => category != categories.category);
            });
        });
        this.forceRemount();
    }

    forceRemount = () => {
        this.setState(({ reload }) => ({
          reload: reload + 1,
        }));
    }

    componentDidMount(){
        this.getCategories();
        this.getUserID();
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

    add(){
        let name = this.state.name;
        let category=this.state.category;
        if (this.state.name && this.state.category){
            // let x = this.check(name);
            let x = 0;
            if (x === 0){
                db.transaction(function (txn) {
                    txn.executeSql('INSERT INTO Items (name,category,adminId) VALUES ("' + name + '","'+category+'",' + userID + ')',[]);
                });
                this.setState({name:'', category:'', icon_name:'Pick an Image', add: false});
                this.getCategories();
            }
            else {
                alert('Element already exists');
            }
        }
        else {
            alert('Please fill data');
        }
    }


    render() {
        return (
            <View style={styles.MainContainer}>
                <Modal onHardwareBackPress={() => this.setState({ add: false })} modalStyle={styles.editModal} modalTitle={<ModalTitle title="Adding" />} visible={this.state.add}
                    onTouchOutside={() => {this.setState({icon_name:'Pick an Image', add: false});}} footer={
                    <ModalFooter>
                        <ModalButton text="Cancel" onPress={() => {this.setState({icon_name:'Pick an Image', add: false});}}/>
                        <ModalButton text="Add" onPress={() => {this.add();}}/>
                    </ModalFooter>}>

                    <ModalContent>
                        <Input placeholder='Insert name' style={styles.editInput} onChangeText={(name) => this.setState({name})}
                            value={this.state.name} label='Name' labelStyle={styles.editLabel}/>
                        <Input placeholder='Insert Category' style={styles.editInput} onChangeText={(category) => this.setState({category})}
                            value={this.state.category} label='Category' labelStyle={styles.editLabel}/>

                        <View style={{flexDirection:'row', paddingTop:30,}}>
                            <TouchableWithoutFeedback  onPress={() => {this.setState({imagePicker: true})}}>
                                <Icon name="photo" type="material-icons" color='grey'/>
                            </TouchableWithoutFeedback> 
                            <TouchableWithoutFeedback  onPress={() => {this.setState({imagePicker: true})}}>
                                <Text style={{color:'grey',fontSize:20,maxWidth:'90%'}} numberOfLines={1}>{this.state.icon_name}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </ModalContent>
                </Modal>

                <ScrollView key={this.state.reload} locked={true} style={{maxHeight:'95%',alignContent:'center'}}>
                <Button title='Refresh' onPress={()=> this.getCategories()}></Button>
                    <Text h4 style={{textAlign:'center',paddingBottom:10}}>Categories</Text>
                    {
                        categories.map((l, i) => (
                        <Card key={i} containerStyle={{maxWidth:'90%'}} title={l}>
                            <Button title='See Catalog' style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} onPress={() => this.props.navigation.navigate('ProductsView',{category: l})}/>
                        </Card>
                        ))
                    }
                </ScrollView>
                <View style={styles.fixedButton}>
                    <TouchableWithoutFeedback onPress={() => this.setState({ add: true, name:'', subtitle:'', url:''})}>
                        <Icon name="add" type="material-icons" color="white"/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}