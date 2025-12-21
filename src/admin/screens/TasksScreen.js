import React, { useState } from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { COLORS, SPACING } from '../../constants/theme';
import { TASKS, POOLS, EMPLOYEES } from '../../data/mockData';
import { Calendar, Clock, User, Plus, CheckCircle, Circle } from 'lucide-react-native';

const TasksScreen = () => {
    const { isDesktop, isTablet } = useResponsive();
    const numColumns = isDesktop ? 3 : isTablet ? 2 : 1;
    const [filter, setFilter] = useState('Tous'); // Tous, En cours, Terminée
    const [tasks, setTasks] = useState(TASKS);
    
    // Simulation du rôle admin (à remplacer par une vraie gestion d'authentification)
    const isAdmin = true;

    const handleStatusChange = (taskId) => {
        if (!isAdmin) {
             // Si pas admin, on ne fait rien ou on affiche une alerte
             // Alert.alert('Attention', 'Seul l\'administrateur peut changer le statut.');
             return;
        }

        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === taskId) {
                const newStatus = task.status === 'Terminée' ? 'En cours' : 'Terminée';
                return { ...task, status: newStatus };
            }
            return task;
        }));
    };

    const getPoolName = (id) => POOLS.find(p => p.id === id)?.name || 'Inconnue';
    const getEmployeeName = (id) => EMPLOYEES.find(e => e.id === id)?.name || 'Non assigné';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'Tous') return true;
        if (filter === 'En cours') return task.status === 'En cours' || task.status === 'À faire';
        if (filter === 'Terminée') return task.status === 'Terminée';
        return true;
    });

    const renderTaskItem = ({ item }) => (
        <Card style={[styles.taskCard, numColumns > 1 && { flex: 1, maxWidth: isDesktop ? '32%' : '48%' }]}>
            <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <TouchableOpacity onPress={() => handleStatusChange(item.id)}>
                    {item.status === 'Terminée' ?
                        <CheckCircle size={24} color={COLORS.success} /> :
                        <Circle size={24} color={COLORS.border} />
                    }
                </TouchableOpacity>
            </View>

            <Text style={styles.poolName}>{getPoolName(item.poolId)}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.metaContainer}>
                <View style={styles.metaItem}>
                    <Calendar size={16} color={COLORS.textLight} />
                    <Text style={styles.metaText}>{item.date}</Text>
                </View>
                <View style={styles.metaItem}>
                    <Clock size={16} color={COLORS.textLight} />
                    <Text style={styles.metaText}>{item.time}</Text>
                </View>
            </View>

            <View style={styles.assigneeContainer}>
                <User size={16} color={COLORS.primary} />
                <Text style={styles.assigneeText}>{getEmployeeName(item.employeeId)}</Text>
            </View>
        </Card>
    );

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Gestion des Tâches</Text>
                    <Button title="Nouvelle" icon={<Plus size={20} color={COLORS.white} />} style={styles.addButton} />
                </View>

                <View style={styles.filterTabs}>
                    {['Tous', 'En cours', 'Terminée'].map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, filter === tab && styles.activeTab]}
                            onPress={() => setFilter(tab)}
                        >
                            <Text style={[styles.tabText, filter === tab && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <FlatList
                    key={numColumns}
                    data={filteredTasks}
                    renderItem={renderTaskItem}
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
    filterTabs: {
        flexDirection: 'row',
        marginBottom: SPACING.m,
        backgroundColor: COLORS.surface,
        padding: 4,
        borderRadius: 12,
    },
    tab: {
        flex: 1,
        paddingVertical: SPACING.s,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: COLORS.primary,
    },
    tabText: {
        color: COLORS.textLight,
        fontWeight: '600',
    },
    activeTabText: {
        color: COLORS.white,
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
    taskCard: {
        marginBottom: SPACING.m,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    poolName: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '600',
        marginBottom: SPACING.s,
    },
    description: {
        fontSize: 14,
        color: COLORS.text,
        marginBottom: SPACING.m,
    },
    metaContainer: {
        flexDirection: 'row',
        gap: SPACING.m,
        marginBottom: SPACING.s,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    metaText: {
        color: COLORS.textLight,
        fontSize: 12,
    },
    assigneeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        backgroundColor: COLORS.background,
        padding: SPACING.s,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    assigneeText: {
        color: COLORS.text,
        fontSize: 12,
        fontWeight: '500',
    },
});

export default TasksScreen;
