import React from 'react';
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

const Stack = createNativeStackNavigator();

// Admin Main Navigator
const AdminMainNavigator = () => {
    const { isDesktop } = useResponsive();
    return isDesktop ? <DrawerNavigator /> : <TabNavigator />;
};

// Client Main Navigator
const ClientMainNavigator = () => {
    const { isDesktop } = useResponsive();
    return isDesktop ? <ClientDrawerNavigator /> : <ClientTabNavigator />;
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
