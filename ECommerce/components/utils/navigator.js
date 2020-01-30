/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
//navigator
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationService from './NavigationService';
//screens
import UserHomeScreen from '../Screens/UserHomeScreen.js';
import LoginHome from '../Screens/Authentication Flow/LoginHome.js';
import Login from '../Screens/Authentication Flow/Login.js';
import SignIn from '../Screens/Authentication Flow/SignIn.js';
import ProductsView from '../Screens/ProductsView';
import LoadingScreen from '../Screens/LoadingScreen.js';
import SettingsScreen from '../Screens/SettingsScreen';

const AppStack = createStackNavigator(
  {
    UserHome: UserHomeScreen,
    ProductsView: ProductsView,
    Settings: SettingsScreen,
    // AdminHome: AdminHomeScreen,
  },
  {
    initialRouteName: 'UserHome',
    // defaultNavigationOptions: {
    //   headerLeft: ()=>(
    //     <TouchableWithoutFeedback onPress={() => alert('a')} style={{paddingLeft: 20, paddingTop:2}}>
    //       <Icon name='home' type='material-icons' color='black'/>
    //     </TouchableWithoutFeedback>
    //   ),
    //   headerStyle: {
    //     backgroundColor: 'rgba(52, 52, 52, 0.0)',
    //     shadowColor: 'transparent',
    //     borderBottomWidth: 0,
    //     shadowOpacity: 0,
    //     shadowOffset: {
    //       height: 0,
    //       width: 0,
    //     },
    //     shadowRadius: 0,
    //     elevation: 0,
    //   },
    // },
  },
);

const LoginStack = createStackNavigator(
    {
        Home: LoginHome,
        Login: Login,
        SignIn: SignIn,
    },
    {
      initialRouteName: 'Home',
      headerMode: 'none',
    },
  );

//create external navigator
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
        Loading:LoadingScreen,
        LoginFlow:{
          screen:  LoginStack,
          headerMode: null,
        },
        App:{
          screen: AppStack,
          // navigationOptions: {
          //   headerLeft: ()=>(
          //     <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('UserHome')} style={{paddingLeft: 20, paddingTop:2}}>
          //       <Icon name='home' type='material-icons' color='black'/>
          //     </TouchableWithoutFeedback>
          //   ),
          //   headerStyle: {
          //     backgroundColor: 'rgba(52, 52, 52, 0.0)',
          //     shadowColor: 'transparent',
          //     borderBottomWidth: 0,
          //     shadowOpacity: 0,
          //     shadowOffset: {
          //       height: 0,
          //       width: 0,
          //     },
          //     shadowRadius: 0,
          //     elevation: 0,
          //   },
          // },
        },
    },
    {
      initialRouteName:'Loading',
      defaultNavigationOptions: {
        headerLeft: ()=>(
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('UserHome')} style={{paddingLeft: 20, paddingTop:2}}>
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
      },
    },
  ),
);

export default class Navigator extends React.Component {
  render() {
    return <AppContainer ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}/>;
  }
}

