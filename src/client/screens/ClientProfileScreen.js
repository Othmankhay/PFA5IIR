import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Switch,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import { COLORS, SPACING } from '../../constants/theme';
import { 
    User, 
    Mail, 
    Phone, 
    MapPin,
    Bell,
    Shield,
    CreditCard,
    HelpCircle,
    LogOut,
    ChevronRight,
    Edit3,
    Moon,
    Globe
} from 'lucide-react-native';

const ClientProfileScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const clientData = {
        name: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        phone: '+33 6 00 00 00 01',
        address: '12 Rue de la Paix, 75001 Paris',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        memberSince: 'Décembre 2023',
        plan: 'Premium',
    };

    const MenuItem = ({ icon: Icon, label, value, onPress, showArrow = true, rightComponent }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                    <Icon size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.menuLabel}>{label}</Text>
            </View>
            <View style={styles.menuItemRight}>
                {value && <Text style={styles.menuValue}>{value}</Text>}
                {rightComponent}
                {showArrow && !rightComponent && <ChevronRight size={20} color={COLORS.textLight} />}
            </View>
        </TouchableOpacity>
    );

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <ScreenWrapper>
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: clientData.avatar }} style={styles.avatar} />
                        <TouchableOpacity style={styles.editAvatarButton}>
                            <Edit3 size={14} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{clientData.name}</Text>
                    <View style={styles.planBadge}>
                        <Text style={styles.planText}>{clientData.plan}</Text>
                    </View>
                    <Text style={styles.memberSince}>Membre depuis {clientData.memberSince}</Text>
                </View>

                {/* Personal Information */}
                <Card style={styles.section}>
                    <Text style={styles.sectionTitle}>Informations personnelles</Text>
                    <MenuItem 
                        icon={User} 
                        label="Nom complet" 
                        value={clientData.name}
                    />
                    <MenuItem 
                        icon={Mail} 
                        label="Email" 
                        value={clientData.email}
                    />
                    <MenuItem 
                        icon={Phone} 
                        label="Téléphone" 
                        value={clientData.phone}
                    />
                    <MenuItem 
                        icon={MapPin} 
                        label="Adresse" 
                        value="Modifier"
                    />
                </Card>

                {/* Preferences */}
                <Card style={styles.section}>
                    <Text style={styles.sectionTitle}>Préférences</Text>
                    <MenuItem 
                        icon={Bell} 
                        label="Notifications" 
                        showArrow={false}
                        rightComponent={
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: COLORS.border, true: COLORS.primary + '50' }}
                                thumbColor={notificationsEnabled ? COLORS.primary : COLORS.textLight}
                            />
                        }
                    />
                    <MenuItem 
                        icon={Moon} 
                        label="Mode sombre" 
                        showArrow={false}
                        rightComponent={
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                trackColor={{ false: COLORS.border, true: COLORS.primary + '50' }}
                                thumbColor={darkMode ? COLORS.primary : COLORS.textLight}
                            />
                        }
                    />
                    <MenuItem 
                        icon={Globe} 
                        label="Langue" 
                        value="Français"
                    />
                </Card>

                {/* Account */}
                <Card style={styles.section}>
                    <Text style={styles.sectionTitle}>Compte</Text>
                    <MenuItem 
                        icon={CreditCard} 
                        label="Paiement & Facturation" 
                    />
                    <MenuItem 
                        icon={Shield} 
                        label="Sécurité" 
                    />
                    <MenuItem 
                        icon={HelpCircle} 
                        label="Centre d'aide" 
                    />
                </Card>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <LogOut size={20} color={COLORS.error} />
                    <Text style={styles.logoutText}>Déconnexion</Text>
                </TouchableOpacity>

                {/* App Version */}
                <Text style={styles.versionText}>UniversPiscine v1.0.0</Text>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: SPACING.m,
        paddingBottom: SPACING.xxl,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: SPACING.m,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: COLORS.primary,
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    planBadge: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: SPACING.m,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: SPACING.xs,
    },
    planText: {
        color: COLORS.text,
        fontSize: 12,
        fontWeight: '600',
    },
    memberSince: {
        fontSize: 13,
        color: COLORS.textLight,
    },
    section: {
        marginBottom: SPACING.m,
        padding: SPACING.m,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.m,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.m,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: COLORS.primary + '10',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    menuLabel: {
        fontSize: 15,
        color: COLORS.text,
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    menuValue: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.error + '10',
        paddingVertical: SPACING.m,
        borderRadius: 12,
        marginTop: SPACING.m,
        gap: SPACING.s,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.error,
    },
    versionText: {
        textAlign: 'center',
        marginTop: SPACING.l,
        fontSize: 13,
        color: COLORS.textLight,
    },
});

export default ClientProfileScreen;
