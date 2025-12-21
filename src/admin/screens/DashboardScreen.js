import React from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import { COLORS, SPACING, FONTS } from '../../constants/theme';
import { POOLS, TASKS, EMPLOYEES } from '../../data/mockData';
import { Activity, CheckCircle, Users, Droplets } from 'lucide-react-native';

const StatCard = ({ title, value, icon: Icon, color, style }) => (
    <Card style={[styles.statCard, style]}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <Icon size={24} color={color} />
        </View>
        <View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
        </View>
    </Card>
);

const DashboardScreen = () => {
    const { isDesktop } = useResponsive();
    const activePools = POOLS.filter(p => p.status === 'Active').length;
    const pendingTasks = TASKS.filter(t => t.status !== 'Terminée').length;
    const availableEmployees = EMPLOYEES.filter(e => e.status === 'Disponible').length;

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.greeting}>Bonjour, Admin</Text>
                        <Text style={styles.subtitle}>Voici le résumé de la journée</Text>
                    </View>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' }}
                        style={styles.avatar}
                    />
                </View>

                <View style={styles.statsGrid}>
                    <StatCard
                        title="Piscines Actives"
                        value={activePools}
                        icon={Droplets}
                        color={COLORS.primary}
                        style={isDesktop && { width: '23%' }}
                    />
                    <StatCard
                        title="Tâches en cours"
                        value={pendingTasks}
                        icon={Activity}
                        color={COLORS.warning}
                        style={isDesktop && { width: '23%' }}
                    />
                    <StatCard
                        title="Employés Dispo"
                        value={availableEmployees}
                        icon={Users}
                        color={COLORS.success}
                        style={isDesktop && { width: '23%' }}
                    />
                    <StatCard
                        title="Tâches Finies"
                        value={TASKS.length - pendingTasks}
                        icon={CheckCircle}
                        color={COLORS.secondary}
                        style={isDesktop && { width: '23%' }}
                    />
                </View>

                <Text style={styles.sectionTitle}>Tâches Urgentes</Text>
                {TASKS.slice(0, 2).map(task => (
                    <Card key={task.id} style={styles.taskCard}>
                        <View style={styles.taskHeader}>
                            <Text style={styles.taskTitle}>{task.title}</Text>
                            <View style={[styles.badge, { backgroundColor: task.status === 'En cours' ? COLORS.warning + '20' : COLORS.border }]}>
                                <Text style={[styles.badgeText, { color: task.status === 'En cours' ? COLORS.warning : COLORS.textLight }]}>
                                    {task.status}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.taskDesc}>{task.description}</Text>
                        <View style={styles.taskFooter}>
                            <Text style={styles.taskTime}>{task.time} - {task.date}</Text>
                        </View>
                    </Card>
                ))}

                <Text style={styles.sectionTitle}>Aperçu Piscines</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.poolsScroll}>
                    {POOLS.map(pool => (
                        <Card key={pool.id} style={styles.poolCard}>
                            <Image source={{ uri: pool.image }} style={styles.poolImage} />
                            <View style={styles.poolInfo}>
                                <Text style={styles.poolName}>{pool.name}</Text>
                                <Text style={styles.poolStatus}>{pool.status}</Text>
                            </View>
                        </Card>
                    ))}
                </ScrollView>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: SPACING.m,
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
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: SPACING.l,
    },
    statCard: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.s,
    },
    iconContainer: {
        padding: SPACING.s,
        borderRadius: 10,
        marginRight: SPACING.s,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    statTitle: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.m,
    },
    taskCard: {
        marginBottom: SPACING.s,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xs,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    badge: {
        paddingHorizontal: SPACING.s,
        paddingVertical: 2,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '500',
    },
    taskDesc: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: SPACING.s,
    },
    taskTime: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    poolsScroll: {
        marginHorizontal: -SPACING.m,
        paddingHorizontal: SPACING.m,
    },
    poolCard: {
        width: 200,
        padding: 0,
        marginRight: SPACING.m,
        overflow: 'hidden',
    },
    poolImage: {
        width: '100%',
        height: 120,
    },
    poolInfo: {
        padding: SPACING.s,
    },
    poolName: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    poolStatus: {
        fontSize: 12,
        color: COLORS.success,
    },
});

export default DashboardScreen;
