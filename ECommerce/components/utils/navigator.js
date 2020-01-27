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
import HomeScreen from '../Screens/HomeScreen.js';
import LoginHome from '../Screens/Authentication Flow/LoginHome.js';
import Login from '../Screens/Authentication Flow/Login.js';
import SignIn from '../Screens/Authentication Flow/SignIn.js';

//create a sub-stack
const AppStack = createStackNavigator(
  {
    HomeApp: HomeScreen,
  },
  {
    initialRouteName: 'HomeApp',
    // headerMode: 'none',
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
        LoginFlow: LoginStack,
        App: AppStack,
    },
    {
      initialRouteName: 'LoginFlow',
      headerMode: 'none',
      defaultNavigationOptions: {
        // headerTintColor: '#fff',
        // headerLeft: ()=>(
        //   <TouchableWithoutFeedback onPress={() => NavigationService.navigate('SitesList')} style={{paddingLeft: 20, paddingTop:2}}>
        //   <Icon name='home' type='material-icons' color='white'/>
        //   </TouchableWithoutFeedback>
        // ),
        // headerStyle: {
        //   backgroundColor: '#42a5f5',
        //   shadowColor: 'transparent',
        //   borderBottomWidth: 0,
        //   shadowOpacity: 0,
        //   shadowOffset: {
        //     height: 0,
        //     width: 0,
        //   },
        //   shadowRadius: 0,
        //   elevation: 0,
        // },
      },
    },
  ),
);

export default class Navigator extends React.Component {
  render() {
    return <AppContainer ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}/>;
  }
}

