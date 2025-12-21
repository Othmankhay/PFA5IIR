import React, { useState } from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { COLORS, SPACING } from '../../constants/theme';
import { CLIENTS } from '../../data/mockData';
import { Search, Plus, Phone, Mail, MapPin, X, Trash2, CheckCircle, Circle } from 'lucide-react-native';

const ClientsScreen = () => {
    const { isDesktop, isTablet } = useResponsive();
    const numColumns = isDesktop || isTablet ? 2 : 1;
    const [search, setSearch] = useState('');
    const [clients, setClients] = useState(CLIENTS);
    const [modalVisible, setModalVisible] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', address: '', type: 'Particulier' });

    // Selection state
    const [selectedIds, setSelectedIds] = useState([]);
    const isSelectionMode = selectedIds.length > 0;

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        client.phone.includes(search)
    );

    const handleAddClient = () => {
        if (newClient.name && newClient.email) {
            const clientToAdd = {
                id: (clients.length + 1).toString(),
                ...newClient,
                avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200',
            };
            setClients([...clients, clientToAdd]);
            setModalVisible(false);
            setNewClient({ name: '', email: '', phone: '', address: '', type: 'Particulier' });
        }
    };

    const toggleSelection = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleDeleteSelected = () => {
        Alert.alert(
            "Supprimer les clients",
            `Êtes-vous sûr de vouloir supprimer ${selectedIds.length} client(s) ?`,
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: () => {
                        setClients(clients.filter(c => !selectedIds.includes(c.id)));
                        setSelectedIds([]);
                    }
                }
            ]
        );
    };

    const renderClientItem = ({ item }) => {
        const isSelected = selectedIds.includes(item.id);

        return (
            <Card
                style={[
                    styles.clientCard,
                    isSelected && styles.selectedCard,
                    numColumns > 1 && { flex: 1, maxWidth: '49%' }
                ]}
                onPress={() => {
                    if (isSelectionMode) {
                        toggleSelection(item.id);
                    } else {
                        // Normal tap behavior (e.g. view details)
                    }
                }}
                onLongPress={() => toggleSelection(item.id)}
            >
                <View style={styles.cardInner}>
                    {isSelectionMode && (
                        <View style={styles.selectionIcon}>
                            {isSelected ? (
                                <CheckCircle size={24} color={COLORS.primary} fill={COLORS.white} />
                            ) : (
                                <Circle size={24} color={COLORS.textLight} />
                            )}
                        </View>
                    )}

                    <View style={styles.cardContent}>
                        <View style={styles.clientHeader}>
                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            <View style={styles.clientInfo}>
                                <Text style={styles.clientName}>{item.name}</Text>
                                <Text style={styles.clientType}>{item.type}</Text>
                            </View>
                        </View>

                        <View style={styles.contactInfo}>
                            <View style={styles.contactRow}>
                                <Mail size={16} color={COLORS.textLight} />
                                <Text style={styles.contactText}>{item.email}</Text>
                            </View>
                            <View style={styles.contactRow}>
                                <Phone size={16} color={COLORS.textLight} />
                                <Text style={styles.contactText}>{item.phone}</Text>
                            </View>
                            <View style={styles.contactRow}>
                                <MapPin size={16} color={COLORS.textLight} />
                                <Text style={styles.contactText}>{item.address}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        );
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    {isSelectionMode ? (
                        <View style={styles.selectionHeader}>
                            <TouchableOpacity onPress={() => setSelectedIds([])}>
                                <X size={24} color={COLORS.text} />
                            </TouchableOpacity>
                            <Text style={styles.selectionCount}>{selectedIds.length} sélectionné(s)</Text>
                            <TouchableOpacity onPress={handleDeleteSelected}>
                                <Trash2 size={24} color={COLORS.error} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <Text style={styles.title}>Gestion des Clients</Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
                                <Plus size={24} color={COLORS.white} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Search size={20} color={COLORS.textLight} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Rechercher un client..."
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>

                <FlatList
                    key={numColumns}
                    data={filteredClients}
                    renderItem={renderClientItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    numColumns={numColumns}
                    columnWrapperStyle={numColumns > 1 ? { gap: SPACING.m } : null}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Aucun client trouvé.</Text>
                    }
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
                                <Text style={styles.modalTitle}>Nouveau Client</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <X size={24} color={COLORS.text} />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Nom complet"
                                value={newClient.name}
                                onChangeText={(text) => setNewClient({ ...newClient, name: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                keyboardType="email-address"
                                value={newClient.email}
                                onChangeText={(text) => setNewClient({ ...newClient, email: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Téléphone"
                                keyboardType="phone-pad"
                                value={newClient.phone}
                                onChangeText={(text) => setNewClient({ ...newClient, phone: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Adresse"
                                value={newClient.address}
                                onChangeText={(text) => setNewClient({ ...newClient, address: text })}
                            />

                            <Button title="Enregistrer" onPress={handleAddClient} style={styles.submitButton} />
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
        height: 50,
    },
    selectionHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        paddingHorizontal: SPACING.s,
        borderRadius: 8,
    },
    selectionCount: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        marginBottom: SPACING.m,
    },
    searchInputContainer: {
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
    listContent: {
        paddingBottom: SPACING.xl,
    },
    clientCard: {
        marginBottom: SPACING.m,
        padding: 0,
    },
    selectedCard: {
        borderColor: COLORS.primary,
        borderWidth: 2,
        backgroundColor: COLORS.primary + '05',
    },
    cardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.m,
    },
    selectionIcon: {
        marginRight: SPACING.m,
    },
    cardContent: {
        flex: 1,
    },
    clientHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: SPACING.m,
    },
    clientInfo: {
        flex: 1,
    },
    clientName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    clientType: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '500',
    },
    contactInfo: {
        gap: SPACING.s,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.s,
    },
    contactText: {
        color: COLORS.textLight,
        fontSize: 14,
    },
    emptyText: {
        textAlign: 'center',
        color: COLORS.textLight,
        marginTop: SPACING.xl,
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

export default ClientsScreen;
