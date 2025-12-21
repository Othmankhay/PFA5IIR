import React from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../admin/screens/DashboardScreen';
import PoolsScreen from '../admin/screens/PoolsScreen';
import TasksScreen from '../admin/screens/TasksScreen';
import EmployeesScreen from '../admin/screens/EmployeesScreen';
import ProfileScreen from '../admin/screens/ProfileScreen';
import ClientsScreen from '../admin/screens/ClientsScreen';
import SearchCompanionScreen from '../client/screens/SearchCompanionScreen';
import { COLORS, FONTS } from '../constants/theme';
import { Home, Droplets, ClipboardList, Users, User, Globe, UserCheck } from 'lucide-react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
            <View style={styles.drawerHeader}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' }}
                    style={styles.avatar}
                />
                <Text style={styles.userName}>Admin User</Text>
                <Text style={styles.userRole}>Gestionnaire</Text>
            </View>
            <View style={styles.drawerItems}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
};

const DrawerNavigator = () => {
    const { isLargeScreen } = useResponsive();
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: COLORS.primary + '10',
                drawerActiveTintColor: COLORS.primary,
                drawerInactiveTintColor: COLORS.text,
                drawerLabelStyle: styles.drawerLabel,
                drawerStyle: isLargeScreen ? styles.drawerStylesLarge : styles.drawerStyles,
                drawerType: isLargeScreen ? 'permanent' : 'slide',
                overlayColor: isLargeScreen ? 'transparent' : COLORS.overlay,
            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    drawerLabel: 'Accueil',
                    drawerIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="Pools"
                component={PoolsScreen}
                options={{
                    drawerLabel: 'Piscines',
                    drawerIcon: ({ color, size }) => <Droplets color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="Tasks"
                component={TasksScreen}
                options={{
                    drawerLabel: 'Tâches',
                    drawerIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="Employees"
                component={EmployeesScreen}
                options={{
                    drawerLabel: 'Équipe',
                    drawerIcon: ({ color, size }) => <Users color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="Clients"
                component={ClientsScreen}
                options={{
                    drawerLabel: 'Clients',
                    drawerIcon: ({ color, size }) => <UserCheck color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="Search"
                component={SearchCompanionScreen}
                options={{
                    drawerLabel: 'Recherche',
                    drawerIcon: ({ color, size }) => <Globe color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    drawerLabel: 'Profil',
                    drawerIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    drawerHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        marginBottom: 10,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    userRole: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    drawerItems: {
        flex: 1,
        paddingTop: 10,
    },
    drawerLabel: {
        marginLeft: -10,
        fontSize: 15,
        fontWeight: '500',
    },
    drawerStyles: {
        width: '75%',
    },
    drawerStylesLarge: {
        width: 280,
        borderRightWidth: 1,
        borderRightColor: COLORS.border,
    },
});

export default DrawerNavigator;
