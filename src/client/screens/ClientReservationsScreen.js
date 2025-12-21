import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { useResponsive } from '../../../hooks/useResponsive';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { COLORS, SPACING } from '../../constants/theme';
import { 
    Calendar, 
    Clock, 
    MapPin, 
    User,
    Plus,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react-native';

const ClientReservationsScreen = () => {
    const { isDesktop } = useResponsive();
    const [filter, setFilter] = useState('Tous');
    const [showNewReservation, setShowNewReservation] = useState(false);

    const reservations = [
        {
            id: '1',
            service: 'Nettoyage complet',
            date: '23 Dec 2025',
            time: '10:00 - 12:00',
            pool: 'Piscine Principale',
            technician: 'Ahmed Benali',
            status: 'Confirmé',
            statusColor: COLORS.success,
        },
        {
            id: '2',
            service: 'Traitement de l\'eau',
            date: '28 Dec 2025',
            time: '14:00 - 15:00',
            pool: 'Spa Extérieur',
            technician: 'À assigner',
            status: 'En attente',
            statusColor: COLORS.warning,
        },
        {
            id: '3',
            service: 'Inspection annuelle',
            date: '15 Dec 2025',
            time: '09:00 - 11:00',
            pool: 'Piscine Principale',
            technician: 'Sarah Connor',
            status: 'Terminé',
            statusColor: COLORS.textLight,
        },
        {
            id: '4',
            service: 'Réparation pompe',
            date: '10 Dec 2025',
            time: '10:00 - 14:00',
            pool: 'Piscine Principale',
            technician: 'John Doe',
            status: 'Annulé',
            statusColor: COLORS.error,
        },
    ];

    const filteredReservations = reservations.filter(res => {
        if (filter === 'Tous') return true;
        return res.status === filter;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Confirmé':
                return <CheckCircle size={16} color={COLORS.success} />;
            case 'En attente':
                return <AlertCircle size={16} color={COLORS.warning} />;
            case 'Annulé':
                return <XCircle size={16} color={COLORS.error} />;
            default:
                return <CheckCircle size={16} color={COLORS.textLight} />;
        }
    };

    const renderReservationItem = ({ item }) => (
        <Card style={styles.reservationCard}>
            {/* Status Badge */}
            <View style={[styles.statusBadge, { backgroundColor: item.statusColor + '15' }]}>
                {getStatusIcon(item.status)}
                <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
            </View>

            {/* Service Title */}
            <Text style={styles.serviceName}>{item.service}</Text>
            
            {/* Pool Name */}
            <View style={styles.infoRow}>
                <MapPin size={16} color={COLORS.primary} />
                <Text style={styles.poolName}>{item.pool}</Text>
            </View>

            {/* Date and Time */}
            <View style={styles.dateTimeRow}>
                <View style={styles.infoRow}>
                    <Calendar size={16} color={COLORS.textLight} />
                    <Text style={styles.infoText}>{item.date}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Clock size={16} color={COLORS.textLight} />
                    <Text style={styles.infoText}>{item.time}</Text>
                </View>
            </View>

            {/* Technician */}
            <View style={styles.technicianRow}>
                <View style={styles.technicianInfo}>
                    <User size={16} color={COLORS.textLight} />
                    <Text style={styles.infoText}>{item.technician}</Text>
                </View>
                {item.status === 'Confirmé' && (
                    <TouchableOpacity style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Annuler</Text>
                    </TouchableOpacity>
                )}
                {item.status === 'Terminé' && (
                    <TouchableOpacity style={styles.reviewButton}>
                        <Text style={styles.reviewButtonText}>Donner un avis</Text>
                    </TouchableOpacity>
                )}
            </View>
        </Card>
    );

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Mes Réservations</Text>
                        <Text style={styles.subtitle}>{reservations.length} réservations au total</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.newButton}
                        onPress={() => setShowNewReservation(true)}
                    >
                        <Plus size={20} color={COLORS.white} />
                        <Text style={styles.newButtonText}>Nouvelle</Text>
                    </TouchableOpacity>
                </View>

                {/* Filter Tabs */}
                <View style={styles.filterTabs}>
                    {['Tous', 'Confirmé', 'En attente', 'Terminé'].map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.filterTab, filter === tab && styles.filterTabActive]}
                            onPress={() => setFilter(tab)}
                        >
                            <Text style={[
                                styles.filterTabText, 
                                filter === tab && styles.filterTabTextActive
                            ]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Reservations List */}
                <FlatList
                    data={filteredReservations}
                    renderItem={renderReservationItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Calendar size={48} color={COLORS.border} />
                            <Text style={styles.emptyText}>Aucune réservation</Text>
                        </View>
                    }
                />

                {/* New Reservation Modal */}
                <Modal
                    visible={showNewReservation}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowNewReservation(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, isDesktop && styles.modalContentDesktop]}>
                            <Text style={styles.modalTitle}>Nouvelle Réservation</Text>
                            <Text style={styles.modalSubtitle}>
                                Planifiez un entretien pour votre piscine
                            </Text>

                            {/* Service Options */}
                            <View style={styles.serviceOptions}>
                                {['Nettoyage complet', 'Traitement eau', 'Inspection', 'Réparation'].map(service => (
                                    <TouchableOpacity key={service} style={styles.serviceOption}>
                                        <Text style={styles.serviceOptionText}>{service}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity 
                                    style={styles.cancelModalButton}
                                    onPress={() => setShowNewReservation(false)}
                                >
                                    <Text style={styles.cancelModalButtonText}>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.confirmModalButton}
                                    onPress={() => setShowNewReservation(false)}
                                >
                                    <Text style={styles.confirmModalButtonText}>Continuer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        marginBottom: SPACING.m,
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
    newButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.s,
        paddingHorizontal: SPACING.m,
        borderRadius: 12,
        gap: SPACING.xs,
    },
    newButtonText: {
        color: COLORS.white,
        fontWeight: '600',
    },
    filterTabs: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 4,
        marginBottom: SPACING.m,
    },
    filterTab: {
        flex: 1,
        paddingVertical: SPACING.s,
        alignItems: 'center',
        borderRadius: 8,
    },
    filterTabActive: {
        backgroundColor: COLORS.primary,
    },
    filterTabText: {
        fontSize: 13,
        color: COLORS.textLight,
        fontWeight: '500',
    },
    filterTabTextActive: {
        color: COLORS.white,
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
    reservationCard: {
        marginBottom: SPACING.m,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: SPACING.s,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 6,
        marginBottom: SPACING.s,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.s,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    poolName: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '500',
    },
    dateTimeRow: {
        flexDirection: 'row',
        gap: SPACING.l,
        marginTop: SPACING.s,
        paddingTop: SPACING.s,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    infoText: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    technicianRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.m,
        paddingTop: SPACING.m,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    technicianInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    cancelButton: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.m,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.error,
    },
    cancelButtonText: {
        color: COLORS.error,
        fontSize: 13,
        fontWeight: '500',
    },
    reviewButton: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.m,
        borderRadius: 8,
        backgroundColor: COLORS.primary + '15',
    },
    reviewButtonText: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '500',
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: SPACING.xl,
    },
    modalContentDesktop: {
        maxWidth: 500,
        alignSelf: 'center',
        width: '100%',
        borderRadius: 24,
        marginBottom: SPACING.xl,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    modalSubtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: SPACING.l,
    },
    serviceOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.s,
        marginBottom: SPACING.xl,
    },
    serviceOption: {
        paddingVertical: SPACING.s,
        paddingHorizontal: SPACING.m,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    serviceOptionText: {
        color: COLORS.text,
        fontWeight: '500',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: SPACING.m,
    },
    cancelModalButton: {
        flex: 1,
        paddingVertical: SPACING.m,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
    cancelModalButtonText: {
        color: COLORS.textLight,
        fontWeight: '600',
    },
    confirmModalButton: {
        flex: 1,
        paddingVertical: SPACING.m,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    confirmModalButtonText: {
        color: COLORS.white,
        fontWeight: '600',
    },
});

export default ClientReservationsScreen;
