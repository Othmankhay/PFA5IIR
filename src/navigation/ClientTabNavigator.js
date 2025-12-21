import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClientHomeScreen from '../client/screens/ClientHomeScreen';
import ClientPoolsScreen from '../client/screens/ClientPoolsScreen';
import ClientReservationsScreen from '../client/screens/ClientReservationsScreen';
import ClientMessagesScreen from '../client/screens/ClientMessagesScreen';
import ClientProfileScreen from '../client/screens/ClientProfileScreen';
import { COLORS } from '../constants/theme';
import { Home, Droplets, Calendar, MessageCircle, User } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const ClientTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textLight,
                tabBarShowLabel: true,
                tabBarLabelStyle: styles.tabLabel,
            }}
        >
            <Tab.Screen
                name="ClientHome"
                component={ClientHomeScreen}
                options={{
                    tabBarLabel: 'Accueil',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="ClientPools"
                component={ClientPoolsScreen}
                options={{
                    tabBarLabel: 'Piscines',
                    tabBarIcon: ({ color, size }) => <Droplets color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="ClientReservations"
                component={ClientReservationsScreen}
                options={{
                    tabBarLabel: 'Réservations',
                    tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="ClientMessages"
                component={ClientMessagesScreen}
                options={{
                    tabBarLabel: 'Messages',
                    tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="ClientProfile"
                component={ClientProfileScreen}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: COLORS.surface,
        borderTopColor: COLORS.border,
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '500',
    },
});

export default ClientTabNavigator;
