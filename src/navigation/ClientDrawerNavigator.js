import React from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ClientHomeScreen from '../client/screens/ClientHomeScreen';
import ClientPoolsScreen from '../client/screens/ClientPoolsScreen';
import ClientReservationsScreen from '../client/screens/ClientReservationsScreen';
import ClientMessagesScreen from '../client/screens/ClientMessagesScreen';
import ClientNotificationsScreen from '../client/screens/ClientNotificationsScreen';
import ClientProfileScreen from '../client/screens/ClientProfileScreen';
import { COLORS } from '../constants/theme';
import { Home, Droplets, Calendar, MessageCircle, Bell, User } from 'lucide-react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
            <View style={styles.drawerHeader}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' }}
                    style={styles.avatar}
                />
                <Text style={styles.userName}>Jean Dupont</Text>
                <View style={styles.planBadge}>
                    <Text style={styles.planText}>Client Premium</Text>
                </View>
            </View>
            <View style={styles.drawerItems}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
};

const ClientDrawerNavigator = () => {
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
                name="ClientHome"
                component={ClientHomeScreen}
                options={{
                    drawerLabel: 'Accueil',
                    drawerIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="ClientPools"
                component={ClientPoolsScreen}
                options={{
                    drawerLabel: 'Mes Piscines',
                    drawerIcon: ({ color, size }) => <Droplets color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="ClientReservations"
                component={ClientReservationsScreen}
                options={{
                    drawerLabel: 'Réservations',
                    drawerIcon: ({ color, size }) => <Calendar color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="ClientMessages"
                component={ClientMessagesScreen}
                options={{
                    drawerLabel: 'Messages',
                    drawerIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="ClientNotifications"
                component={ClientNotificationsScreen}
                options={{
                    drawerLabel: 'Notifications',
                    drawerIcon: ({ color, size }) => <Bell color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="ClientProfile"
                component={ClientProfileScreen}
                options={{
                    drawerLabel: 'Mon Profil',
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
        marginBottom: 4,
    },
    planBadge: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    planText: {
        fontSize: 12,
        color: COLORS.text,
        fontWeight: '500',
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

export default ClientDrawerNavigator;
