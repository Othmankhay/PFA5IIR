import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useResponsive } from '../../../hooks/useResponsive';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import { COLORS, SPACING } from '../../constants/theme';
import { 
    Droplets, 
    Thermometer, 
    Activity, 
    Calendar,
    ChevronRight,
    Plus
} from 'lucide-react-native';

const ClientPoolsScreen = () => {
    const { isDesktop, isTablet } = useResponsive();
    const numColumns = isDesktop ? 2 : 1;

    const myPools = [
        {
            id: '1',
            name: 'Piscine Principale',
            address: '12 Rue de la Paix, Paris',
            status: 'Bon état',
            statusColor: COLORS.success,
            lastMaintenance: '15 Dec 2025',
            nextMaintenance: '22 Dec 2025',
            temperature: '28°C',
            ph: '7.2',
            chlorine: 'Optimal',
            image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=500',
        },
        {
            id: '2',
            name: 'Spa Extérieur',
            address: '12 Rue de la Paix, Paris',
            status: 'Maintenance prévue',
            statusColor: COLORS.warning,
            lastMaintenance: '10 Dec 2025',
            nextMaintenance: '23 Dec 2025',
            temperature: '36°C',
            ph: '7.4',
            chlorine: 'Optimal',
            image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=500',
        },
    ];

    const renderPoolItem = ({ item }) => (
        <Card style={[styles.poolCard, isDesktop && styles.poolCardDesktop]}>
            <Image source={{ uri: item.image }} style={styles.poolImage} />
            <View style={styles.poolContent}>
                {/* Header */}
                <View style={styles.poolHeader}>
                    <View>
                        <Text style={styles.poolName}>{item.name}</Text>
                        <Text style={styles.poolAddress}>{item.address}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: item.statusColor + '15' }]}>
                        <View style={[styles.statusDot, { backgroundColor: item.statusColor }]} />
                        <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                        <View style={[styles.statIcon, { backgroundColor: COLORS.error + '15' }]}>
                            <Thermometer size={18} color={COLORS.error} />
                        </View>
                        <View>
                            <Text style={styles.statValue}>{item.temperature}</Text>
                            <Text style={styles.statLabel}>Température</Text>
                        </View>
                    </View>
                    <View style={styles.statItem}>
                        <View style={[styles.statIcon, { backgroundColor: COLORS.primary + '15' }]}>
                            <Droplets size={18} color={COLORS.primary} />
                        </View>
                        <View>
                            <Text style={styles.statValue}>{item.ph}</Text>
                            <Text style={styles.statLabel}>pH</Text>
                        </View>
                    </View>
                    <View style={styles.statItem}>
                        <View style={[styles.statIcon, { backgroundColor: COLORS.success + '15' }]}>
                            <Activity size={18} color={COLORS.success} />
                        </View>
                        <View>
                            <Text style={styles.statValue}>{item.chlorine}</Text>
                            <Text style={styles.statLabel}>Chlore</Text>
                        </View>
                    </View>
                </View>

                {/* Maintenance Info */}
                <View style={styles.maintenanceSection}>
                    <View style={styles.maintenanceItem}>
                        <Calendar size={16} color={COLORS.textLight} />
                        <Text style={styles.maintenanceText}>
                            Dernier entretien: <Text style={styles.maintenanceDate}>{item.lastMaintenance}</Text>
                        </Text>
                    </View>
                    <View style={styles.maintenanceItem}>
                        <Calendar size={16} color={COLORS.primary} />
                        <Text style={styles.maintenanceText}>
                            Prochain: <Text style={[styles.maintenanceDate, { color: COLORS.primary }]}>{item.nextMaintenance}</Text>
                        </Text>
                    </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Voir les détails</Text>
                    <ChevronRight size={18} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
        </Card>
    );

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Mes Piscines</Text>
                        <Text style={styles.subtitle}>{myPools.length} piscines enregistrées</Text>
                    </View>
                    <TouchableOpacity style={styles.addButton}>
                        <Plus size={20} color={COLORS.white} />
                        <Text style={styles.addButtonText}>Ajouter</Text>
                    </TouchableOpacity>
                </View>

                {/* Pools List */}
                <FlatList
                    key={numColumns}
                    data={myPools}
                    renderItem={renderPoolItem}
                    keyExtractor={item => item.id}
                    numColumns={numColumns}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
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
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.s,
        paddingHorizontal: SPACING.m,
        borderRadius: 12,
        gap: SPACING.xs,
    },
    addButtonText: {
        color: COLORS.white,
        fontWeight: '600',
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    poolCard: {
        marginBottom: SPACING.m,
        padding: 0,
        overflow: 'hidden',
    },
    poolCardDesktop: {
        width: '48%',
    },
    poolImage: {
        width: '100%',
        height: 160,
    },
    poolContent: {
        padding: SPACING.m,
    },
    poolHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.m,
    },
    poolName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    poolAddress: {
        fontSize: 13,
        color: COLORS.textLight,
        marginTop: 2,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.s,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 6,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: SPACING.m,
        marginBottom: SPACING.m,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.s,
    },
    statIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    statLabel: {
        fontSize: 11,
        color: COLORS.textLight,
    },
    maintenanceSection: {
        gap: SPACING.xs,
        marginBottom: SPACING.m,
    },
    maintenanceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.s,
    },
    maintenanceText: {
        fontSize: 13,
        color: COLORS.textLight,
    },
    maintenanceDate: {
        color: COLORS.text,
        fontWeight: '500',
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary + '10',
        paddingVertical: SPACING.s + 2,
        borderRadius: 10,
        gap: SPACING.xs,
    },
    detailsButtonText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
});

export default ClientPoolsScreen;
