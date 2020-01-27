/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler} from 'react-native';
import {ListItem, Icon, Input, Text} from 'react-native-elements';
import styles from './UserHomeScreenStyle.js';
import SQLite from 'react-native-sqlite-2';
// import BackgroundTimer from 'react-native-background-timer';
// import Modal, {ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';
// import ImagePicker from 'react-native-image-picker';

var list = [];
const db = SQLite.openDatabase('test.db', '1.0', '', 1);

export default class UserHomeScreen extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     reload: 0,
        //     refresh: true,
        //     isVisible:false,
        //     info:false,
        //     edit: false,
        //     add: false,
        //     added: false,
        //     imagePicker: false,
        //     icon_name:'Pick an Image',
        //     index:'',
        //     name:'',
        //     avatar_url:'',
        //     subtitle:'',
        //     url:'',
        //     uri:'',
        //     source:'',
        // };
    }
    // imagePick= async() => {
    //     const options = {
    //         title: 'Select Image',
    //         storageOptions: {noData: true, mediaType:'photo', skipBackup: true, path: 'images',},
    //     };
    //     ImagePicker.launchImageLibrary(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             alert(response.error);
    //         }
    //         else {
    //             // You can also display the image using data:
    //             // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //             this.setState({source:  "file:///" + response.path, icon_name: response.fileName, avatar_url:response.uri});
    //         }
    //     });
    // }
    // photoPick= async() =>{
    //     const options = {
    //         title: 'Select Image',
    //         storageOptions: {noData: true, mediaType:'photo', skipBackup: true, path: 'images',},
    //     };

    //     ImagePicker.launchCamera(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             alert(response.error);
    //         }
    //         else {
    //             // You can also display the image using data:
    //             // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //             this.setState({source: "file:///" + response.path, icon_name: response.fileName, avatar_url:response.uri});
    //         }
    //     });
    // }
    // componentDidMount(){
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    //     BackgroundTimer.runBackgroundTimer(() => {
    //             this.GetDatas();
    //     }, 5000);
    // }

    // handleBackButton() {
    //     return true;
    // }

    // GetDatas()
    // {
    //     // list.splice(0);
    //     db.transaction(function (txn) {
    //         txn.executeSql('SELECT * FROM `Sites`', [], function (tx, res) {
    //             var len = res.rows.length;
    //             for (let i = 0; i < len; i++) {
    //                 let row = res.rows.item(i);
    //                 let x = 0;
    //                 for (let y = 0; y < list.length && x === 0; y++)
    //                 {
    //                     if (row.name === list[y].name && row.url === list[y].url)
    //                     {
    //                         x = 1;
    //                     }
    //                 }
    //                 if (x === 0)
    //                 {
    //                 list.push({index:row.id ,name:row.name, avatar_url:row.avatar_url, subtitle:row.category, url:row.url});
    //                 }
    //             }
    //         });
    //     });
    //     this.forceRemount();
    // }

    // forceRemount = () => {
    //     this.setState(({ reload }) => ({
    //       reload: reload + 1,
    //     }));
    // }

    // check(name,url){
    //     let x = 0;
    //     list.forEach(element => {
    //         if(element.name === name && element.url === url){
    //             x = 1;
    //         }
    //     });
    //     if(x === 0){
    //         return 0;
    //     }
    //     else{
    //         return 1;
    //     }
    // }

    // add(){
    //     let name = this.state.name;
    //     let url = this.state.url;
    //     let subtitle = this.state.subtitle;
    //     let avatar_url=this.state.source;
    //     if (this.state.name && this.state.url && this.state.subtitle){
    //         let x = this.check(name,url);
    //         if (x === 0){
    //             db.transaction(function (txn) {
    //                 if(avatar_url === 'Pick an Image')
    //                 {txn.executeSql('INSERT INTO Sites (name,avatar_url,url,category) VALUES ("' + name + '","http://www.mangago.me/images/ywz-1-7070.png?1","' + url + '","' + subtitle + '")',[]);}
    //                 else
    //                 {txn.executeSql('INSERT INTO Sites (name,avatar_url,url,category) VALUES ("' + name + '","'+avatar_url+'","' + url + '","' + subtitle + '")',[]);}
    //             });
    //             this.setState({name:'', url:'', subtitle:'', added:true, icon_name:'Pick an Image', add: false});
    //             this.GetDatas();
    //         }
    //         else {
    //             alert('Element already exists');
    //         }
    //     }
    //     else {
    //         alert('Please fill data');
    //     }
    // }

    // delete(i){
    //     db.transaction(function (txn) {
    //         txn.executeSql('Delete from Sites where id=' + i,[]);
    //     });
    //     let deleted = 0;
    //     for (let x = 0; x < list.length && deleted === 0; x++)
    //     {
    //         if (list[x].index === i){
    //             list.splice(x, 1);
    //             deleted = 1;
    //         }
    //     }
    //     this.GetDatas();
    // }

    // showInfo(ind){
    //     let token = 0;
    //     for (let i = 0; i < list.length && token === 0; i++)
    //     {
    //         if(list[i].index === ind)
    //         {
    //             this.setState({name:list[i].name, avatar_url:list[i].avatar_url, subtitle:list[i].subtitle, url:list[i].url});
    //             token = 1;
    //         }
    //     }
    // }

    // editInfo(ind)
    // {
    //     let token = 0;
    //     let i;
    //     for (i = 0; i < list.length && token === 0; i++)
    //     {
    //         if(list[i].index === ind)
    //         {
    //             list[i].name = this.state.name;
    //             list[i].avatar_url = this.state.source;
    //             list[i].subtitle = this.state.subtitle;
    //             list[i].url = this.state.url;
    //             token = 1;
    //         }
    //     }
    //     db.transaction(function (txn) {
    //         txn.executeSql('UPDATE Sites SET name="' + list[i - 1].name + '", avatar_url="' + list[i - 1].avatar_url + '", url="' + list[i - 1].url + '", category="' + list[i - 1].subtitle + '" WHERE id=' + ind,[]);
    //     });
    //     this.setState({name:'', subtitle:'', url:''});
    //     this.forceRemount();
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
                </Modal>

                <Modal onHardwareBackPress={() => this.setState({ info: false })} modalStyle={styles.showInfoModal} modalTitle={<ModalTitle title="Site Informations" />}
                    visible={this.state.info} onTouchOutside={() => {this.setState({ info: false, isVisible: false });}}>
                    <ModalContent>
                    <Text style={styles.infoText}>Name: {this.state.name}</Text>
                    <Text style={styles.infoText}>Avatar Url: {this.state.avatar_url}</Text>
                    <Text style={styles.infoText}>Category: {this.state.subtitle}</Text>
                    <Text style={styles.infoText}>Url Site: {this.state.url}</Text>
                    </ModalContent>
                </Modal>

                <Modal onHardwareBackPress={() => this.setState({ edit: false })} modalStyle={styles.editModal} modalTitle={<ModalTitle title="Editing" />} visible={this.state.edit}
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
                        <Input placeholder='Insert category' style={styles.editInput} onChangeText={(subtitle) => this.setState({subtitle})}
                            value={this.state.subtitle} label='Category' labelStyle={styles.editLabel}/>
                        <Input placeholder='Insert url' style={styles.editInput} onChangeText={(url) => this.setState({url})}
                            value={this.state.url} label='Url Site' labelStyle={styles.editLabel}/>
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

                        <View style={{flexDirection:'row', paddingTop:30,}}>
                            <TouchableWithoutFeedback  onPress={() => {this.setState({imagePicker: true})}}>
                                <Icon name="photo" type="material-icons" color='grey'/>
                            </TouchableWithoutFeedback> 
                            <TouchableWithoutFeedback  onPress={() => {this.setState({imagePicker: true})}}>
                                <Text style={{color:'grey',fontSize:20,maxWidth:'90%'}} numberOfLines={1}>{this.state.icon_name}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        
                        <Input placeholder='Insert category' style={styles.editInput} onChangeText={(subtitle) => this.setState({subtitle})}
                            value={this.state.subtitle} label='Category' labelStyle={styles.editLabel}/>
                        <Input placeholder='Insert url' style={styles.editInput} onChangeText={(url) => this.setState({url})}
                            value={this.state.url} label='Url Site' labelStyle={styles.editLabel}/>
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

                <ScrollView key={this.state.reload} locked={true}>
                    <View style={{paddingBottom:10}}>
                        <TouchableWithoutFeedback
                        onPress={() => this.GetDatas()}>
                            <Icon name="refresh" type="material-icons"/>
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        list.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={l.name}
                            subtitle={l.subtitle}
                            bottomDivider
                            rightIcon={
                                <TouchableWithoutFeedback data-id={i} onPress={() => this.setState({ isVisible: true, index: l.index})}>
                                    <Icon name="menu" type="material-icons"/>
                                </TouchableWithoutFeedback>
                            }
                            onPress={() => this.props.navigation.navigate('Site',{url: l.url})}
                            onLongPress={() => this.setState({ isVisible: true, index: l.index})}
                            />
                        ))
                    }
                </ScrollView>
                <View style={styles.fixedButton}>
                    <TouchableWithoutFeedback onPress={() => this.setState({ add: true, name:'', subtitle:'', url:''})}>
                        <Icon name="add" type="material-icons" color="white"/>
                    </TouchableWithoutFeedback>
                </View> */}
            </View>
        );
    }
}