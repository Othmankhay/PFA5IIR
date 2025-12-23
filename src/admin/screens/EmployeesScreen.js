import React, { useState } from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { View, Text, StyleSheet, FlatList, Image, Linking, TouchableOpacity, Modal, TextInput } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { COLORS, SPACING } from '../../constants/theme';
import { EMPLOYEES } from '../../data/mockData';
import { Phone, MessageCircle, Plus, X } from 'lucide-react-native';

const EmployeesScreen = () => {
    const { isDesktop, isTablet } = useResponsive();
    const numColumns = isDesktop || isTablet ? 2 : 1;
    const [employees, setEmployees] = useState(EMPLOYEES);
    const [modalVisible, setModalVisible] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ name: '', role: '', phone: '', email: '', languages: [] });

    const handleCall = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };

    const handleAddEmployee = () => {
        if (newEmployee.name && newEmployee.role) {
            const employeeToAdd = {
                id: (employees.length + 1).toString(),
                ...newEmployee,
                status: newEmployee.role, // Mapping role to status for display
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200',
                languages: ['Français'], // Default language
            };
            setEmployees([...employees, employeeToAdd]);
            setModalVisible(false);
            setNewEmployee({ name: '', role: '', phone: '', email: '', languages: [] });
        }
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
                    <Button 
                        title="Ajouter" 
                        icon={<Plus size={20} color={COLORS.white} />} 
                        style={styles.addButton} 
                        onPress={() => setModalVisible(true)}
                    />
                </View>

                <FlatList
                    key={numColumns}
                    data={employees}
                    renderItem={renderEmployeeItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    numColumns={numColumns}
                    columnWrapperStyle={numColumns > 1 ? { gap: SPACING.m } : null}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Nouvel Employé</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <X size={24} color={COLORS.text} />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Nom complet"
                                value={newEmployee.name}
                                onChangeText={(text) => setNewEmployee({ ...newEmployee, name: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Rôle / Poste"
                                value={newEmployee.role}
                                onChangeText={(text) => setNewEmployee({ ...newEmployee, role: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                keyboardType="email-address"
                                value={newEmployee.email}
                                onChangeText={(text) => setNewEmployee({ ...newEmployee, email: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Téléphone"
                                keyboardType="phone-pad"
                                value={newEmployee.phone}
                                onChangeText={(text) => setNewEmployee({ ...newEmployee, phone: text })}
                            />

                            <Button title="Enregistrer" onPress={handleAddEmployee} style={styles.submitButton} />
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
    modalOverlay: {
        flex: 1,
        backgroundColor: COLORS.overlay,
        justifyContent: 'center',
        padding: SPACING.m,
    },
    modalContent: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: SPACING.l,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    input: {
        backgroundColor: COLORS.background,
        padding: SPACING.m,
        borderRadius: 8,
        marginBottom: SPACING.m,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    submitButton: {
        marginTop: SPACING.s,
    },
});

export default EmployeesScreen;
