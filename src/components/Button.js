import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, FONTS } from '../constants/theme';

const Button = ({ title, onPress, variant = 'primary', style, loading = false, icon }) => {
    const backgroundColor = variant === 'outline' ? 'transparent' : COLORS[variant] || COLORS.primary;
    const textColor = variant === 'outline' ? COLORS.primary : COLORS.white;
    const borderStyle = variant === 'outline' ? { borderWidth: 1, borderColor: COLORS.primary } : {};

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, borderStyle, style]}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <>
                    {icon && icon}
                    <Text style={[styles.text, { color: textColor, marginLeft: icon ? SPACING.s : 0 }]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.l,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: FONTS.bold,
    },
});

export default Button;
