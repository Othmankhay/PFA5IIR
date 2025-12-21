import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../admin/screens/DashboardScreen';
import PoolsScreen from '../admin/screens/PoolsScreen';
import TasksScreen from '../admin/screens/TasksScreen';
import EmployeesScreen from '../admin/screens/EmployeesScreen';
import ProfileScreen from '../admin/screens/ProfileScreen';
import ClientsScreen from '../admin/screens/ClientsScreen';
import SearchCompanionScreen from '../client/screens/SearchCompanionScreen';
import { COLORS } from '../constants/theme';
import { Home, Droplets, ClipboardList, Users, User, Globe, UserCheck } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Accueil',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Pools"
                component={PoolsScreen}
                options={{
                    tabBarLabel: 'Piscines',
                    tabBarIcon: ({ color, size }) => <Droplets color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Tasks"
                component={TasksScreen}
                options={{
                    tabBarLabel: 'Tâches',
                    tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Employees"
                component={EmployeesScreen}
                options={{
                    tabBarLabel: 'Équipe',
                    tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Clients"
                component={ClientsScreen}
                options={{
                    tabBarLabel: 'Clients',
                    tabBarIcon: ({ color, size }) => <UserCheck color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchCompanionScreen}
                options={{
                    tabBarLabel: 'Recherche',
                    tabBarIcon: ({ color, size }) => <Globe color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
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

export default TabNavigator;
