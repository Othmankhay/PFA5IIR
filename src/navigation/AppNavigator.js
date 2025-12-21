import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
import { useResponsive } from '../../hooks/useResponsive';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { isDesktop } = useResponsive();

    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={isDesktop ? DrawerNavigator : TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
