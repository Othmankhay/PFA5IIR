import React from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import { COLORS, SPACING } from '../../constants/theme';
import { User, Bell, Moon, Lock, ChevronRight, LogOut } from 'lucide-react-native';

const SettingItem = ({ icon: Icon, title, value, type = 'arrow', onPress }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={type === 'switch'}>
        <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
                <Icon size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.settingTitle}>{title}</Text>
        </View>
        {type === 'switch' ? (
            <Switch
                value={value}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
            />
        ) : (
            <ChevronRight size={20} color={COLORS.textLight} />
        )}
    </TouchableOpacity>
);

const ProfileScreen = () => {
    const { isDesktop } = useResponsive();
    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={[styles.container, isDesktop && styles.containerDesktop]}>
                <Text style={styles.headerTitle}>Profil</Text>

                <View style={styles.profileHeader}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>Admin User</Text>
                    <Text style={styles.role}>Gestionnaire Principal</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Compte</Text>
                    <Card style={styles.card}>
                        <SettingItem icon={User} title="Informations personnelles" />
                        <View style={styles.divider} />
                        <SettingItem icon={Lock} title="Changer mot de passe" />
                    </Card>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Préférences</Text>
                    <Card style={styles.card}>
                        <SettingItem icon={Bell} title="Notifications" type="switch" value={true} />
                        <View style={styles.divider} />
                        <SettingItem icon={Moon} title="Mode Sombre" type="switch" value={false} />
                    </Card>
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <LogOut size={20} color={COLORS.error} />
                    <Text style={styles.logoutText}>Se déconnecter</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SPACING.m,
        paddingBottom: SPACING.xl,
    },
    containerDesktop: {
        maxWidth: 600,
        alignSelf: 'center',
        width: '100%',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.l,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: SPACING.m,
        borderWidth: 4,
        borderColor: COLORS.surface,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    role: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    section: {
        marginBottom: SPACING.l,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textLight,
        marginBottom: SPACING.s,
        marginLeft: SPACING.s,
    },
    card: {
        padding: 0,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.m,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.m,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingTitle: {
        fontSize: 16,
        color: COLORS.text,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginLeft: 52 + SPACING.m, // Align with text
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.s,
        marginTop: SPACING.m,
        padding: SPACING.m,
    },
    logoutText: {
        color: COLORS.error,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ProfileScreen;
