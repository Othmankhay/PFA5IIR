import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useResponsive } from '../../../hooks/useResponsive';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import { COLORS, SPACING } from '../../constants/theme';
import { 
    Droplets, 
    Calendar, 
    Bell, 
    MessageCircle, 
    ChevronRight,
    Clock,
    CheckCircle,
    AlertCircle
} from 'lucide-react-native';

const ClientHomeScreen = ({ navigation }) => {
    const { isDesktop } = useResponsive();

    // Mock client data
    const clientData = {
        name: 'Jean Dupont',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        poolsCount: 2,
        upcomingAppointments: 1,
        unreadMessages: 3,
    };

    const myPools = [
        {
            id: '1',
            name: 'Piscine Principale',
            status: 'Bon état',
            statusColor: COLORS.success,
            lastMaintenance: '15 Dec 2025',
            image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=500',
        },
        {
            id: '2',
            name: 'Spa Extérieur',
            status: 'Maintenance prévue',
            statusColor: COLORS.warning,
            lastMaintenance: '10 Dec 2025',
            image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=500',
        },
    ];

    const upcomingAppointment = {
        date: '23 Dec 2025',
        time: '10:00',
        service: 'Nettoyage complet',
        technician: 'Ahmed Benali',
    };

    const notifications = [
        { id: '1', text: 'Votre rendez-vous est confirmé pour le 23 Dec', time: '1h', type: 'info' },
        { id: '2', text: 'Nouveau message de votre technicien', time: '3h', type: 'message' },
        { id: '3', text: 'Rappel: Traitement de l\'eau prévu demain', time: '5h', type: 'alert' },
    ];

    const QuickAction = ({ icon: Icon, label, color, onPress }) => (
        <TouchableOpacity style={styles.quickAction} onPress={onPress}>
            <View style={[styles.quickActionIcon, { backgroundColor: color + '15' }]}>
                <Icon size={24} color={color} />
            </View>
            <Text style={styles.quickActionLabel}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper>
            <ScrollView 
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.greeting}>Bonjour, {clientData.name.split(' ')[0]} 👋</Text>
                        <Text style={styles.subtitle}>Bienvenue sur votre espace client</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={{ uri: clientData.avatar }} style={styles.avatar} />
                    </TouchableOpacity>
                </View>

                {/* Quick Actions */}
                <View style={[styles.quickActionsGrid, isDesktop && styles.quickActionsGridDesktop]}>
                    <QuickAction 
                        icon={Droplets} 
                        label="Mes Piscines" 
                        color={COLORS.primary}
                        onPress={() => navigation.navigate('ClientPools')}
                    />
                    <QuickAction 
                        icon={Calendar} 
                        label="Réservations" 
                        color={COLORS.success}
                        onPress={() => navigation.navigate('ClientReservations')}
                    />
                    <QuickAction 
                        icon={MessageCircle} 
                        label="Messages" 
                        color={COLORS.warning}
                        onPress={() => navigation.navigate('ClientMessages')}
                    />
                    <QuickAction 
                        icon={Bell} 
                        label="Notifications" 
                        color={COLORS.error}
                        onPress={() => navigation.navigate('ClientNotifications')}
                    />
                </View>

                {/* Upcoming Appointment Card */}
                <Card style={styles.appointmentCard}>
                    <View style={styles.appointmentHeader}>
                        <View style={styles.appointmentIconContainer}>
                            <Calendar size={24} color={COLORS.primary} />
                        </View>
                        <View style={styles.appointmentInfo}>
                            <Text style={styles.appointmentTitle}>Prochain rendez-vous</Text>
                            <Text style={styles.appointmentService}>{upcomingAppointment.service}</Text>
                        </View>
                        <ChevronRight size={20} color={COLORS.textLight} />
                    </View>
                    <View style={styles.appointmentDetails}>
                        <View style={styles.appointmentDetail}>
                            <Clock size={16} color={COLORS.textLight} />
                            <Text style={styles.appointmentDetailText}>
                                {upcomingAppointment.date} à {upcomingAppointment.time}
                            </Text>
                        </View>
                        <View style={styles.appointmentDetail}>
                            <CheckCircle size={16} color={COLORS.success} />
                            <Text style={styles.appointmentDetailText}>
                                Technicien: {upcomingAppointment.technician}
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* My Pools Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Mes Piscines</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ClientPools')}>
                        <Text style={styles.seeAllLink}>Voir tout</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.poolsScroll}
                >
                    {myPools.map(pool => (
                        <Card key={pool.id} style={styles.poolCard}>
                            <Image source={{ uri: pool.image }} style={styles.poolImage} />
                            <View style={styles.poolInfo}>
                                <Text style={styles.poolName}>{pool.name}</Text>
                                <View style={styles.poolStatusContainer}>
                                    <View style={[styles.statusDot, { backgroundColor: pool.statusColor }]} />
                                    <Text style={[styles.poolStatus, { color: pool.statusColor }]}>
                                        {pool.status}
                                    </Text>
                                </View>
                                <Text style={styles.poolMaintenance}>
                                    Dernier entretien: {pool.lastMaintenance}
                                </Text>
                            </View>
                        </Card>
                    ))}
                </ScrollView>

                {/* Recent Notifications */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Notifications récentes</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ClientNotifications')}>
                        <Text style={styles.seeAllLink}>Voir tout</Text>
                    </TouchableOpacity>
                </View>
                {notifications.map(notification => (
                    <Card key={notification.id} style={styles.notificationCard}>
                        <View style={[
                            styles.notificationIcon,
                            { backgroundColor: notification.type === 'alert' ? COLORS.warning + '15' : COLORS.primary + '15' }
                        ]}>
                            {notification.type === 'alert' ? (
                                <AlertCircle size={20} color={COLORS.warning} />
                            ) : notification.type === 'message' ? (
                                <MessageCircle size={20} color={COLORS.primary} />
                            ) : (
                                <Bell size={20} color={COLORS.primary} />
                            )}
                        </View>
                        <View style={styles.notificationContent}>
                            <Text style={styles.notificationText}>{notification.text}</Text>
                            <Text style={styles.notificationTime}>Il y a {notification.time}</Text>
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: SPACING.m,
        paddingBottom: SPACING.xxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    headerTextContainer: {
        flex: 1,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginTop: 4,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: SPACING.l,
    },
    quickActionsGridDesktop: {
        justifyContent: 'flex-start',
        gap: SPACING.m,
    },
    quickAction: {
        width: '23%',
        alignItems: 'center',
        marginBottom: SPACING.s,
    },
    quickActionIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    quickActionLabel: {
        fontSize: 12,
        color: COLORS.text,
        textAlign: 'center',
        fontWeight: '500',
    },
    appointmentCard: {
        marginBottom: SPACING.l,
        backgroundColor: COLORS.primary + '08',
        borderWidth: 1,
        borderColor: COLORS.primary + '20',
    },
    appointmentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    appointmentIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    appointmentInfo: {
        flex: 1,
    },
    appointmentTitle: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 2,
    },
    appointmentService: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    appointmentDetails: {
        gap: SPACING.s,
    },
    appointmentDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.s,
    },
    appointmentDetailText: {
        fontSize: 14,
        color: COLORS.text,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    seeAllLink: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '500',
    },
    poolsScroll: {
        marginHorizontal: -SPACING.m,
        paddingHorizontal: SPACING.m,
        marginBottom: SPACING.l,
    },
    poolCard: {
        width: 220,
        padding: 0,
        marginRight: SPACING.m,
        overflow: 'hidden',
    },
    poolImage: {
        width: '100%',
        height: 120,
    },
    poolInfo: {
        padding: SPACING.m,
    },
    poolName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    poolStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: SPACING.xs,
    },
    poolStatus: {
        fontSize: 13,
        fontWeight: '500',
    },
    poolMaintenance: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.s,
    },
    notificationIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    notificationContent: {
        flex: 1,
    },
    notificationText: {
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 2,
    },
    notificationTime: {
        fontSize: 12,
        color: COLORS.textLight,
    },
});

export default ClientHomeScreen;
