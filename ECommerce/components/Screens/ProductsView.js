/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler, Button, TouchableWithoutFeedbackBase} from 'react-native';
import {ListItem, Input, Text, Card, Icon} from 'react-native-elements';
import styles from './ProductViewStyle.js';
import SQLite from 'react-native-sqlite-2';
// import BackgroundTimer from 'react-native-background-timer';
import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';
import ImagePicker from 'react-native-image-picker';

var datas = [];
var userID;
const db = SQLite.openDatabase('ECommerce.db', '1.0', '', 1);

export default class ProductsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: 0,
            index:'',
            userID:'',
            id:'',
            name:'',
            categoryItem:'',
            isVisible: false,
            edit: false,
            info: false,
            add: false,
            imagePicker: false,
            source: '',
            icon_name:'',
        };
    }

    handleBackButton() {
        datas.splice(0);
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
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
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
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({source: "file:///" + response.path, icon_name: response.fileName});
            }
        });
    }
    //???
    getUserID(){
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM Logged', [], function (tx, res) {
                let row = res.rows.item(0);
                userID = row.user;
            });
        });
    }
    //????
    getDatas()
    {
        var categoryItem = this.state.categoryItem;
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM Items where adminId='+userID+' and category="'+categoryItem+'"', [], function (tx, res) {
                var len = res.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = res.rows.item(i);
                    let x = 0;
                    for (let y = 0; y < datas.length && x === 0; y++){
                        if (row.id === datas[y].id){
                            x = 1;
                        }
                    }
                    if (x === 0){
                        datas.push({id:row.id,name:row.name,category:row.category,userID:row.adminId});
                    }
                }
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
        this.setState({categoryItem: this.props.navigation.getParam('category','default-value')});
        this.getUserID();
        this.getDatas();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    check(name){
        let x = 0;
        datas.forEach(element => {
            if(element.name == name){
                x = 1;
            }
        });
        if(x === 0){
            return 0;
        }
        else{
            return 1;
        }
    }

    // add(){
    //     let name = this.state.name;
    //     let category=this.state.category;
    //     alert(name+'    '+category);
    //     if (this.state.name){
    //         let x = this.check(name);
    //         if (x === 0){
    //             db.transaction(function (txn) {
    //                 txn.executeSql('INSERT INTO Items (name,category,adminId) VALUES ("' + name + '","'+category+'",' + userID + ')',[]);
    //             });
    //             this.setState({name:'', icon_name:'Pick an Image', add: false});
    //             this.getDatas();
    //         }
    //         else {
    //             alert('Element already exists');
    //         }
    //     }
    //     else {
    //         alert('Please fill data');
    //     }
    // }


    render() {
        return (
            <View style={styles.MainContainer}>
            {/* <Modal onHardwareBackPress={() => this.setState({ isVisible: false })} modalStyle={styles.modal} visible={this.state.isVisible} onTouchOutside={() => {this.setState({ isVisible: false });}}>
                    <ModalContent>
                        <ModalButton text='Delete' onPress={() => {this.setState({ isVisible: false });
                            this.delete(this.state.index);}}/>
                        <ModalButton text='Edit' onPress={() => {this.setState({ edit: true }); this.showInfo(this.state.index);}}/>
                        <ModalButton text='Show Informations' onPress={() => {this.setState({ info: true }); this.showInfo(this.state.index);}}/>
                    </ModalContent>
                </Modal> */}

                {/* <Modal onHardwareBackPress={() => this.setState({ info: false })} modalStyle={styles.showInfoModal} modalTitle={<ModalTitle title="Site Informations" />}
                    visible={this.state.info} onTouchOutside={() => {this.setState({ info: false, isVisible: false });}}>
                    <ModalContent>
                    <Text style={styles.infoText}>Name: {this.state.name}</Text>
                    <Text style={styles.infoText}>Category: {this.state.category}</Text>
                    </ModalContent>
                </Modal> */}

                {/* <Modal onHardwareBackPress={() => this.setState({ edit: false })} modalStyle={styles.editModal} modalTitle={<ModalTitle title="Editing" />} visible={this.state.edit}
                onTouchOutside={() => {this.setState({ edit: false, isVisible: false});}} footer={
                    <ModalFooter>
                        <ModalButton text="Cancel" onPress={() => {this.setState({ edit: false, isVisible: false});}}/>
                        <ModalButton text="Apply" onPress={() => {this.editInfo(this.state.index);
                            this.setState({ edit: false, isVisible: false});}}/>
                    </ModalFooter>}>

                    <ModalContent>
                        <Input placeholder='Insert name' style={styles.editInput} onChangeText={(name) => this.setState({name})}
                            value={this.state.name} label='Name' labelStyle={styles.editLabel}/>
                        <View style={{flexDirection:'row', paddingTop:30,}}>
                            <TouchableWithoutFeedback onPress={() => {this.setState({imagePicker: true})}}>
                                <Icon name="photo" type="material-icons" color='grey'/>
                            </TouchableWithoutFeedback> 
                            <TouchableWithoutFeedback  onPress={() => {this.setState({imagePicker: true})}}>
                                <Text style={{color:'grey',fontSize:20,maxWidth:'90%'}} numberOfLines={1}>{this.state.avatar_url}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </ModalContent>
                </Modal> */}

                <Modal onHardwareBackPress={() => this.setState({ add: false })} modalStyle={styles.editModal} modalTitle={<ModalTitle title="Adding" />} visible={this.state.add}
                onTouchOutside={() => {this.setState({icon_name:'Pick an Image', add: false});}} footer={
                    <ModalFooter>
                        <ModalButton text="Cancel" onPress={() => {this.setState({icon_name:'Pick an Image', add: false});}}/>
                        <ModalButton text="Add" onPress={() => {this.add();}}/>
                    </ModalFooter>}>

                    <ModalContent>
                        <Input placeholder='Insert name' style={styles.editInput} onChangeText={(name) => this.setState({name})}
                            value={this.state.name} label='Name' labelStyle={styles.editLabel}/>

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

                <ScrollView key={this.state.reload} locked={true} style={{maxHeight:'95%',alignContent:'center'}}>
                <Button title='refresh' onPress={()=> this.componentDidMount()}></Button>
                    <Text h4 style={{textAlign:'center',paddingBottom:10}}>{this.props.navigation.getParam('category','default-value')}</Text>
                    {
                        datas.map((l, i) => (
                        <ListItem
                            key={i}
                            // leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={l.name}
                            // subtitle={l.subtitle}
                            bottomDivider
                            // rightIcon={
                            //     <TouchableWithoutFeedback data-id={i} onPress={() => this.setState({ isVisible: true, index: l.index})}>
                            //         <Icon name="menu" type="material-icons"/>
                            //     </TouchableWithoutFeedback>
                            // }
                            // onPress={() => this.props.navigation.navigate('ProductsView',{url: l.url})}
                            onLongPress={() => this.setState({ isVisible: true, index: l.i})}
                            />
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
