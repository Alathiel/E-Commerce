/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler, ImageBackground} from 'react-native';
import {Button, Icon, Input, Text, Card, Image} from 'react-native-elements';
import styles from './UserHomeScreenStyle.js';
import SQLite from 'react-native-sqlite-2';
import BackgroundTimer from 'react-native-background-timer';
import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';
import ImagePicker from 'react-native-image-picker';
import NavigationService from '../utils/NavigationService';

var categories = [];
var userID;
const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);

export default class UserHomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: 0,
            add: false,
            edit:false,
            imagePicker:false,
            source:'',
            icon_name:'Pick Image',
            new_category:'',
        };
        //account/screen change
        this.props.navigation.addListener('willFocus', () => {
            categories = categories.filter(categories => categories.adminId == userID);
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
            txn.executeSql('SELECT * FROM `Items` GROUP BY category HAVING adminId=' + userID, [], function (tx, res) {
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

    add(){
        let name = this.state.name;
        let category=this.state.category;
        let img = this.state.source;
        if (this.state.name && this.state.category && this.state.source){
            // let x = this.check(name);
            let x = 0;
            if (x === 0){
                db.transaction(function (txn) {
                    txn.executeSql('INSERT INTO Items (name,category,adminId,img) VALUES ("' + name + '","'+category+'",' + userID + ',"' + img + '")',[]);
                });
                this.setState({add: false});
                const timeoutId = BackgroundTimer.setTimeout(() => {this.getCategories(); this.forceRemount();}, 200);
            }
            else {
                alert('Element already exists');
            }
        }
        else {
            alert('Please fill data');
        }
    }

    imagePick= async() => {
        const options = {
            title: 'Select Image',
            storageOptions: {noData: true, mediaType:'photo', skipBackup: true, path: 'images',},
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                alert(response.error);
            }
            else {
                this.setState({source:  "file:///" + response.path, icon_name: response.fileName});
            }
        });
    }

    photoPick= async() =>{
        const options = {
            title: 'Select Image',
            storageOptions: {noData: true, mediaType:'photo', skipBackup: true, path: 'images',},
        };

        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                alert(response.error);
            }
            else {
                this.setState({source: "file:///" + response.path, icon_name: response.fileName});
            }
        });
    }

    delete(category){
        db.transaction(function (txn) {
            txn.executeSql('Delete from Items where category="' + category + '"',[]);
        });
        categories = categories.filter(categories => categories.category !== category);
        this.getCategories();
    }

    showEditInfo(category){
        this.setState({new_category:category});
    }

    editInfo(category,new_category){
        categories.forEach(element => {
            if(element.category == category){
                element.category = new_category;
            }
        });
        db.transaction(function (txn) {
            txn.executeSql('UPDATE Items SET category="' + new_category + '" WHERE category="' + category + '"',[]);
        });
        this.forceRemount();
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

                <Modal onHardwareBackPress={() => this.setState({ imagePicker: false})} modalStyle={styles.imagePickerModal} modalTitle={<ModalTitle title="Select Avatar"/>} visible={this.state.imagePicker}
                onTouchOutside={() => {this.setState({imagePicker: false});}}>
                    <ModalContent>
                        <ModalButton style={styles.imagePickerButtons} text='From Gallery' onPress={() => {this.imagePick();
                        this.setState({imagePicker: false});}}/>
                        <ModalButton style={styles.imagePickerButtons} text='From Camera' onPress={() => {this.photoPick();
                        this.setState({imagePicker: false});}}/>
                    </ModalContent>
                </Modal>

                <Modal onHardwareBackPress={() => this.setState({ edit: false })} modalStyle={styles.editModal} modalTitle={<ModalTitle title="Editing" />} visible={this.state.edit}
                onTouchOutside={() => {this.setState({ edit: false, isVisible: false});}} footer={
                    <ModalFooter>
                        <ModalButton text="Cancel" onPress={() => {this.setState({ edit: false, isVisible: false});}}/>
                        <ModalButton text="Apply" onPress={() => {this.editInfo(this.state.category,this.state.new_category);
                            this.setState({ edit: false, isVisible: false});}}/>
                    </ModalFooter>}>

                    <ModalContent>
                        <Input placeholder='Insert category name' style={styles.editInput} onChangeText={(new_category) => this.setState({new_category})}
                            value={this.state.new_category} label='Category name' labelStyle={styles.editLabel}/>
                    </ModalContent>
                </Modal>

                <ScrollView key={this.state.reload} locked={true} style={{maxHeight:'95%',alignContent:'center'}}>
                <Button title='Refresh' onPress={()=> this.getCategories()}></Button>
                    <Text h4 style={{textAlign:'center',paddingBottom:10}}>Categories</Text>
                    {
                        categories.map((l, i) => (
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ProductsView',{category: l.category})}
                            onLongPress={() => this.setState({ isVisible: true, category: l.category})}>
                            <Card key={i} containerStyle={styles.card} image={{ uri: l.img}} featuredTitle={l.category}>
                                <Text style={{textAlign:'center',fontSize:20}}>{l.category}</Text>
                            </Card>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </ScrollView>
                <View style={styles.fixedButton}>
                    <TouchableWithoutFeedback onPress={() => this.setState({ add: true, name:'', category:'', icon_name:'Pick an Image'})}>
                        <Icon name="add" type="material-icons" color="white"/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}