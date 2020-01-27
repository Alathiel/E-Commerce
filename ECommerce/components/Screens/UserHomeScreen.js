/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,TouchableWithoutFeedback,ScrollView,BackHandler} from 'react-native';
import {ListItem, Icon, Input, Text, Card} from 'react-native-elements';
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
        this.state = {
            reload: 0,

        };
    }

    getCategories()
    {
        // list.splice(0);
        db.transaction(function (txn) {
            txn.executeSql('SELECT * FROM `Items`', [], function (tx, res) {
                var len = res.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = res.rows.item(i);
                    let x = 0;
                    for (let y = 0; y < list.length && x === 0; y++)
                    {
                        if (row.name === list[y].name && row.url === list[y].url)
                        {
                            x = 1;
                        }
                    }
                    if (x === 0)
                    {
                    list.push({index:row.id ,name:row.name, avatar_url:row.avatar_url, subtitle:row.category, url:row.url});
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


    render() {
        return (
            <View style={styles.MainContainer}>
                <ScrollView key={this.state.reload} locked={true}>
                    <Text h4>Categories</Text>
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
            </View>
        );
    }
}