/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import 'react-native-gesture-handler';
//navigator
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationService from './NavigationService';
//screens
import AdminHomeScreen from '../Screens/Admin/AdminHomeScreen.js';
import LoginHome from '../Screens/Authentication Flow/LoginHome.js';
import Login from '../Screens/Authentication Flow/Login.js';
import SignIn from '../Screens/Authentication Flow/SignIn.js';
import ProductsView from '../Screens/Admin/ProductsView';
import LoadingScreen from '../Screens/LoadingScreen.js';
import SettingsScreen from '../Screens/SettingsScreen';
import UserHomeScreen from '../Screens/User/UserHomeScreen';
import UserProductsView from '../Screens/User/ProductsView';
import Cart from '../Screens/User/Cart';

const AppStack = createStackNavigator(
  {
    AdminHome: AdminHomeScreen,
    ProductsView: ProductsView,
    Settings: SettingsScreen,
    UserHome: UserHomeScreen,
    UserProductsView: UserProductsView,
    Cart: Cart,
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
        },
    },
    {
      initialRouteName:'Loading',
    },
  ),
);

export default class Navigator extends React.Component {
  render() {
    return <AppContainer ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}/>;
  }
}

