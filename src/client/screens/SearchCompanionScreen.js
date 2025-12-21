import React, { useState } from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import { COLORS, SPACING } from '../../constants/theme';
import { EMPLOYEES } from '../../data/mockData';
import { Search, Globe, Phone } from 'lucide-react-native';

const LANGUAGES = ['Tous', 'Français', 'Arabe', 'Anglais', 'Espagnol'];

const SearchCompanionScreen = () => {
    const { isDesktop, isTablet } = useResponsive();
    const numColumns = isDesktop ? 4 : isTablet ? 3 : 2;
    const [selectedLang, setSelectedLang] = useState('Tous');

    const filteredEmployees = EMPLOYEES.filter(e =>
        selectedLang === 'Tous' ? true : e.languages.includes(selectedLang)
    );

    const renderEmployeeItem = ({ item }) => (
        <Card style={[styles.card, { width: isDesktop ? '23%' : isTablet ? '31%' : '48%' }]}>
            <View style={styles.cardHeader}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.statusDotContainer}>
                    <View style={[styles.statusDot, { backgroundColor: item.status === 'Disponible' ? COLORS.success : COLORS.error }]} />
                </View>
            </View>

            <Text style={styles.name}>{item.name}</Text>

            <View style={styles.languagesContainer}>
                {item.languages.map((lang, index) => (
                    <Text key={index} style={styles.langText}>
                        {lang}{index < item.languages.length - 1 ? ' • ' : ''}
                    </Text>
                ))}
            </View>

            <TouchableOpacity style={styles.contactButton}>
                <Phone size={16} color={COLORS.white} />
                <Text style={styles.contactButtonText}>Contacter</Text>
            </TouchableOpacity>
        </Card>
    );

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text style={styles.title}>Recherche Accompagnateur</Text>
                <Text style={styles.subtitle}>Trouvez un employé parlant votre langue</Text>

                <View style={styles.langFilterContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langFilterContent}>
                        {LANGUAGES.map(lang => (
                            <TouchableOpacity
                                key={lang}
                                style={[styles.langChip, selectedLang === lang && styles.activeLangChip]}
                                onPress={() => setSelectedLang(lang)}
                            >
                                <Text style={[styles.langChipText, selectedLang === lang && styles.activeLangChipText]}>{lang}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <FlatList
                    data={filteredEmployees}
                    renderItem={renderEmployeeItem}
                    keyExtractor={item => item.id}
                    numColumns={numColumns}
                    key={numColumns}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Globe size={48} color={COLORS.border} />
                            <Text style={styles.emptyText}>Aucun accompagnateur trouvé</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: SPACING.l,
    },
    langFilterContainer: {
        marginBottom: SPACING.l,
    },
    langFilterContent: {
        gap: SPACING.s,
    },
    langChip: {
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    activeLangChip: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    langChipText: {
        color: COLORS.text,
        fontWeight: '500',
    },
    activeLangChipText: {
        color: COLORS.white,
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    card: {
        alignItems: 'center',
        padding: SPACING.m,
        marginBottom: SPACING.m,
    },
    cardHeader: {
        position: 'relative',
        marginBottom: SPACING.s,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    statusDotContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.surface,
        padding: 2,
        borderRadius: 10,
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.xs,
        textAlign: 'center',
    },
    languagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: SPACING.m,
    },
    langText: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s,
        borderRadius: 20,
        gap: SPACING.s,
    },
    contactButtonText: {
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 12,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: SPACING.xl,
    },
    emptyText: {
        marginTop: SPACING.m,
        color: COLORS.textLight,
    },
});

export default SearchCompanionScreen;
