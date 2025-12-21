import React from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { View, Text, StyleSheet, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { COLORS, SPACING } from '../../constants/theme';
import { EMPLOYEES } from '../../data/mockData';
import { Phone, MessageCircle, Plus } from 'lucide-react-native';

const EmployeesScreen = () => {
    const { isDesktop, isTablet } = useResponsive();
    const numColumns = isDesktop || isTablet ? 2 : 1;
    const handleCall = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };

    const renderEmployeeItem = ({ item }) => (
        <Card style={[styles.card, numColumns > 1 && { flex: 1, maxWidth: '49%' }]}>
            <View style={styles.cardContent}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.status}>{item.status}</Text>
                    <View style={styles.languages}>
                        {item.languages.map((lang, index) => (
                            <View key={index} style={styles.langBadge}>
                                <Text style={styles.langText}>{lang}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.success + '20' }]} onPress={() => handleCall(item.phone)}>
                        <Phone size={20} color={COLORS.success} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.primary + '20' }]}>
                        <MessageCircle size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Gestion des Employés</Text>
                    <Button title="Ajouter" icon={<Plus size={20} color={COLORS.white} />} style={styles.addButton} />
                </View>

                <FlatList
                    key={numColumns}
                    data={EMPLOYEES}
                    renderItem={renderEmployeeItem}
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
    listContent: {
        paddingBottom: SPACING.xl,
    },
    card: {
        padding: SPACING.m,
        marginBottom: SPACING.m,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: SPACING.m,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    status: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: SPACING.xs,
    },
    languages: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    langBadge: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    langText: {
        fontSize: 10,
        color: COLORS.text,
    },
    actions: {
        gap: SPACING.s,
    },
    actionBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EmployeesScreen;
