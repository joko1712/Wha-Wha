import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from '../components/Login';
import Signup from '../components/SignUp';
import App from '../App';
import SettingsModal from '../components/SettingsModal';
import Sobre from '../components/Sobre';

const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        },
        App: {
            screen: App
        },
        Settings: {
            screen: SettingsModal
        },
        Sobre: {
            screen: Sobre
        },
    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)