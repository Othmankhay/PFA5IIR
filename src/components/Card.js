import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';

const Card = ({ children, style, onPress, onLongPress }) => {
    const Container = (onPress || onLongPress) ? TouchableOpacity : View;

    return (
        <Container
            style={[styles.card, style]}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.8}
        >
            {children}
        </Container>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        ...SHADOWS.small,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
});

export default Card;
