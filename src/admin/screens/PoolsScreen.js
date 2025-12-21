import React, { useState } from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { View, Text, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { COLORS, SPACING } from '../../constants/theme';
import { POOLS } from '../../data/mockData';
import { Search, Filter, Plus } from 'lucide-react-native';

const PoolsScreen = () => {
    const { isDesktop, isTablet } = useResponsive();
    const numColumns = isDesktop ? 3 : isTablet ? 2 : 1;
    const [search, setSearch] = useState('');

    const filteredPools = POOLS.filter(pool =>
        pool.name.toLowerCase().includes(search.toLowerCase()) ||
        pool.address.toLowerCase().includes(search.toLowerCase())
    );

    const renderPoolItem = ({ item }) => (
        <Card style={[styles.poolCard, numColumns > 1 && { flex: 1, maxWidth: isDesktop ? '33%' : '50%' }]}>
            <Image source={{ uri: item.image }} style={styles.poolImage} />
            <View style={styles.poolContent}>
                <View style={styles.poolHeader}>
                    <Text style={styles.poolName}>{item.name}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: item.status === 'Active' ? COLORS.success + '20' : COLORS.warning + '20' }]}>
                        <Text style={[styles.statusText, { color: item.status === 'Active' ? COLORS.success : COLORS.warning }]}>
                            {item.status}
                        </Text>
                    </View>
                </View>
                <Text style={styles.poolAddress}>{item.address}</Text>
                <Text style={styles.poolType}>{item.type}</Text>
                <Text style={styles.lastMaintenance}>Dernier entretien: {item.lastMaintenance}</Text>
            </View>
        </Card>
    );

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Gestion des Piscines</Text>
                    <Button title="Ajouter" icon={<Plus size={20} color={COLORS.white} />} style={styles.addButton} />
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Search size={20} color={COLORS.textLight} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Rechercher une piscine..."
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                    <Button variant="outline" icon={<Filter size={20} color={COLORS.primary} />} style={styles.filterButton} />
                </View>

                <FlatList
                    key={numColumns}
                    data={filteredPools}
                    renderItem={renderPoolItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    numColumns={numColumns}
                    columnWrapperStyle={numColumns > 1 ? { gap: SPACING.m } : null}
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
        marginBottom: SPACING.m,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    addButton: {
        paddingVertical: SPACING.s,
        paddingHorizontal: SPACING.m,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: SPACING.m,
        gap: SPACING.s,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        paddingHorizontal: SPACING.m,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        height: 50,
    },
    searchInput: {
        flex: 1,
        marginLeft: SPACING.s,
        fontSize: 16,
    },
    filterButton: {
        width: 50,
        height: 50,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
    poolCard: {
        padding: 0,
        overflow: 'hidden',
        marginBottom: SPACING.m,
    },
    poolImage: {
        width: '100%',
        height: 150,
    },
    poolContent: {
        padding: SPACING.m,
    },
    poolHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    poolName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: SPACING.s,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    poolAddress: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: SPACING.xs,
    },
    poolType: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '500',
        marginBottom: SPACING.s,
    },
    lastMaintenance: {
        fontSize: 12,
        color: COLORS.textLight,
        fontStyle: 'italic',
    },
});

export default PoolsScreen;
