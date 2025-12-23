import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
import ClientTabNavigator from './ClientTabNavigator';
import ClientDrawerNavigator from './ClientDrawerNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { useResponsive } from '../../hooks/useResponsive';
import { StatusBar } from 'react-native';
import ChatbotWidget from '../components/ChatbotWidget';

const Stack = createNativeStackNavigator();

// Admin Main Navigator with Chatbot Widget
const AdminMainNavigator = () => {
    const { isDesktop } = useResponsive();
    return (
        <View style={{ flex: 1 }}>
            {isDesktop ? <DrawerNavigator /> : <TabNavigator />}
            <ChatbotWidget />
        </View>
    );
};

// Client Main Navigator with Chatbot Widget
const ClientMainNavigator = () => {
    const { isDesktop } = useResponsive();
    return (
        <View style={{ flex: 1 }}>
            {isDesktop ? <ClientDrawerNavigator /> : <ClientTabNavigator />}
            <ChatbotWidget />
        </View>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator 
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="AdminMain" component={AdminMainNavigator} />
                <Stack.Screen name="ClientMain" component={ClientMainNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
