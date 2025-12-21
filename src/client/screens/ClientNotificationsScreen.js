import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import { COLORS, SPACING } from '../../constants/theme';
import { 
    Bell, 
    Calendar, 
    MessageCircle, 
    AlertCircle,
    CheckCircle,
    Droplets,
    Settings,
    Trash2
} from 'lucide-react-native';

const ClientNotificationsScreen = () => {
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            type: 'appointment',
            title: 'Rendez-vous confirmé',
            message: 'Votre rendez-vous de nettoyage est confirmé pour le 23 Dec à 10h',
            time: 'Il y a 1 heure',
            read: false,
        },
        {
            id: '2',
            type: 'message',
            title: 'Nouveau message',
            message: 'Ahmed Benali vous a envoyé un message',
            time: 'Il y a 3 heures',
            read: false,
        },
        {
            id: '3',
            type: 'alert',
            title: 'Rappel d\'entretien',
            message: 'Le traitement de l\'eau de votre piscine est prévu demain',
            time: 'Il y a 5 heures',
            read: false,
        },
        {
            id: '4',
            type: 'pool',
            title: 'État de la piscine',
            message: 'Le niveau de pH de votre Spa Extérieur nécessite attention',
            time: 'Hier',
            read: true,
        },
        {
            id: '5',
            type: 'success',
            title: 'Entretien terminé',
            message: 'L\'entretien de votre Piscine Principale a été effectué avec succès',
            time: 'Il y a 2 jours',
            read: true,
        },
        {
            id: '6',
            type: 'system',
            title: 'Mise à jour de l\'application',
            message: 'De nouvelles fonctionnalités sont disponibles !',
            time: 'Il y a 3 jours',
            read: true,
        },
    ]);

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'appointment':
                return { icon: Calendar, color: COLORS.primary };
            case 'message':
                return { icon: MessageCircle, color: COLORS.success };
            case 'alert':
                return { icon: AlertCircle, color: COLORS.warning };
            case 'pool':
                return { icon: Droplets, color: COLORS.secondary };
            case 'success':
                return { icon: CheckCircle, color: COLORS.success };
            case 'system':
                return { icon: Settings, color: COLORS.textLight };
            default:
                return { icon: Bell, color: COLORS.primary };
        }
    };

    const markAsRead = (id) => {
        setNotifications(prev => 
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const renderNotificationItem = ({ item }) => {
        const { icon: Icon, color } = getNotificationIcon(item.type);
        
        return (
            <TouchableOpacity 
                onPress={() => markAsRead(item.id)}
                activeOpacity={0.7}
            >
                <Card style={[
                    styles.notificationCard,
                    !item.read && styles.notificationCardUnread
                ]}>
                    <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
                        <Icon size={22} color={color} />
                    </View>
                    <View style={styles.notificationContent}>
                        <View style={styles.notificationHeader}>
                            <Text style={styles.notificationTitle}>{item.title}</Text>
                            {!item.read && <View style={styles.unreadDot} />}
                        </View>
                        <Text style={styles.notificationMessage}>{item.message}</Text>
                        <Text style={styles.notificationTime}>{item.time}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => deleteNotification(item.id)}
                    >
                        <Trash2 size={18} color={COLORS.textLight} />
                    </TouchableOpacity>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Notifications</Text>
                        <Text style={styles.subtitle}>
                            {unreadCount > 0 
                                ? `${unreadCount} non lue${unreadCount > 1 ? 's' : ''}` 
                                : 'Toutes lues'}
                        </Text>
                    </View>
                    {unreadCount > 0 && (
                        <TouchableOpacity 
                            style={styles.markAllButton}
                            onPress={markAllAsRead}
                        >
                            <Text style={styles.markAllText}>Tout marquer comme lu</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Notifications List */}
                <FlatList
                    data={notifications}
                    renderItem={renderNotificationItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Bell size={48} color={COLORS.border} />
                            <Text style={styles.emptyText}>Aucune notification</Text>
                        </View>
                    }
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.m,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginTop: 2,
    },
    markAllButton: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.m,
    },
    markAllText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: SPACING.s,
    },
    notificationCardUnread: {
        borderLeftWidth: 3,
        borderLeftColor: COLORS.primary,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    notificationContent: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        marginLeft: SPACING.xs,
    },
    notificationMessage: {
        fontSize: 14,
        color: COLORS.textLight,
        lineHeight: 20,
        marginBottom: 4,
    },
    notificationTime: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    deleteButton: {
        padding: SPACING.xs,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: SPACING.xxl,
    },
    emptyText: {
        marginTop: SPACING.m,
        color: COLORS.textLight,
        fontSize: 16,
    },
});

export default ClientNotificationsScreen;
