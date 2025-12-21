import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING } from '../constants/theme';
import { Mail, Lock, Eye, EyeOff, Droplets, Shield, User, ArrowRight, Waves } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 768;

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('client');

    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (selectedRole === 'admin') {
                navigation.replace('AdminMain');
            } else {
                navigation.replace('ClientMain');
            }
        }, 1500);
    };

    const RoleCard = ({ role, label, description, icon: Icon, isSelected }) => (
        <TouchableOpacity
            style={[styles.roleCard, isSelected && styles.roleCardSelected]}
            onPress={() => setSelectedRole(role)}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={isSelected 
                    ? (role === 'admin' ? ['#6B46C1', '#805AD5'] : ['#0066CC', '#0099FF'])
                    : ['transparent', 'transparent']
                }
                style={styles.roleCardGradient}
            >
                <View style={[styles.roleIconWrapper, isSelected && styles.roleIconWrapperSelected]}>
                    <Icon size={28} color={isSelected ? COLORS.white : COLORS.primary} />
                </View>
                <View style={styles.roleTextContainer}>
                    <Text style={[styles.roleLabel, isSelected && styles.roleLabelSelected]}>
                        {label}
                    </Text>
                    <Text style={[styles.roleDescription, isSelected && styles.roleDescriptionSelected]}>
                        {description}
                    </Text>
                </View>
                <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Background */}
            <LinearGradient
                colors={['#0A1628', '#1A365D', '#0A1628']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
            />

            {/* Animated Wave Pattern */}
            <View style={styles.wavePattern}>
                <View style={styles.wave1} />
                <View style={styles.wave2} />
                <View style={styles.wave3} />
            </View>

            {/* Floating Elements */}
            <View style={[styles.floatingCircle, styles.floatingCircle1]} />
            <View style={[styles.floatingCircle, styles.floatingCircle2]} />
            <View style={[styles.floatingCircle, styles.floatingCircle3]} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        isLargeScreen && styles.scrollContentLarge
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Left Side - Branding (Desktop) */}
                    {isLargeScreen && (
                        <View style={styles.brandingSection}>
                            <View style={styles.brandingContent}>
                                <View style={styles.logoLarge}>
                                    <LinearGradient
                                        colors={['#00CCFF', '#0066CC']}
                                        style={styles.logoGradient}
                                    >
                                        <Droplets size={56} color={COLORS.white} />
                                    </LinearGradient>
                                </View>
                                <Text style={styles.brandName}>UniversPiscine</Text>
                                <Text style={styles.brandTagline}>
                                    La solution complète pour la gestion{'\n'}professionnelle de vos piscines
                                </Text>
                                
                                <View style={styles.features}>
                                    <View style={styles.featureItem}>
                                        <View style={styles.featureIcon}>
                                            <Waves size={20} color="#00CCFF" />
                                        </View>
                                        <Text style={styles.featureText}>Suivi en temps réel</Text>
                                    </View>
                                    <View style={styles.featureItem}>
                                        <View style={styles.featureIcon}>
                                            <Shield size={20} color="#00CCFF" />
                                        </View>
                                        <Text style={styles.featureText}>Sécurité garantie</Text>
                                    </View>
                                    <View style={styles.featureItem}>
                                        <View style={styles.featureIcon}>
                                            <User size={20} color="#00CCFF" />
                                        </View>
                                        <Text style={styles.featureText}>Support 24/7</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Right Side - Login Form */}
                    <View style={[styles.formSection, isLargeScreen && styles.formSectionLarge]}>
                        {/* Mobile Logo */}
                        {!isLargeScreen && (
                            <View style={styles.mobileHeader}>
                                <View style={styles.logoSmall}>
                                    <Droplets size={36} color={COLORS.white} />
                                </View>
                                <Text style={styles.mobileAppName}>UniversPiscine</Text>
                            </View>
                        )}

                        {/* Login Card */}
                        <View style={[styles.card, isLargeScreen && styles.cardLarge]}>
                            {/* Header */}
                            <View style={styles.cardHeader}>
                                <Text style={styles.welcomeText}>Connexion</Text>
                                <Text style={styles.welcomeSubtext}>
                                    Accédez à votre espace personnel
                                </Text>
                            </View>

                            {/* Role Selector */}
                            <View style={styles.roleSection}>
                                <Text style={styles.roleSectionTitle}>Type de compte</Text>
                                <View style={styles.roleSelector}>
                                    <RoleCard
                                        role="client"
                                        label="Espace Client"
                                        description="Gérer mes piscines"
                                        icon={User}
                                        isSelected={selectedRole === 'client'}
                                    />
                                    <RoleCard
                                        role="admin"
                                        label="Espace Admin"
                                        description="Tableau de bord"
                                        icon={Shield}
                                        isSelected={selectedRole === 'admin'}
                                    />
                                </View>
                            </View>

                            {/* Form Fields */}
                            <View style={styles.formFields}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Adresse email</Text>
                                    <View style={styles.inputWrapper}>
                                        <Mail size={20} color={COLORS.textLight} style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="exemple@email.com"
                                            placeholderTextColor={COLORS.textLight}
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputGroup}>
                                    <View style={styles.inputLabelRow}>
                                        <Text style={styles.inputLabel}>Mot de passe</Text>
                                        <TouchableOpacity>
                                            <Text style={styles.forgotLink}>Mot de passe oublié ?</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.inputWrapper}>
                                        <Lock size={20} color={COLORS.textLight} style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="••••••••"
                                            placeholderTextColor={COLORS.textLight}
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeButton}
                                            onPress={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff size={20} color={COLORS.textLight} />
                                            ) : (
                                                <Eye size={20} color={COLORS.textLight} />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity
                                style={[styles.loginButton, isLoading && styles.loginButtonLoading]}
                                onPress={handleLogin}
                                disabled={isLoading}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={selectedRole === 'admin' 
                                        ? ['#6B46C1', '#805AD5'] 
                                        : ['#0066CC', '#00AAFF']
                                    }
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.loginButtonGradient}
                                >
                                    <Text style={styles.loginButtonText}>
                                        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                                    </Text>
                                    {!isLoading && <ArrowRight size={20} color={COLORS.white} />}
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={styles.divider}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>ou continuer avec</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            {/* Social Buttons */}
                            <View style={styles.socialButtons}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Text style={styles.socialIcon}>G</Text>
                                    <Text style={styles.socialButtonText}>Google</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Text style={styles.socialIcon}>f</Text>
                                    <Text style={styles.socialButtonText}>Facebook</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Register Link */}
                            <View style={styles.registerSection}>
                                <Text style={styles.registerText}>Pas encore de compte ?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={styles.registerLink}>Créer un compte</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Footer */}
                        <Text style={styles.footerText}>
                            © 2025 UniversPiscine. Tous droits réservés.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A1628',
    },
    gradientBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    wavePattern: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%',
        overflow: 'hidden',
    },
    wave1: {
        position: 'absolute',
        left: -100,
        right: -100,
        bottom: -200,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(0, 102, 204, 0.08)',
        transform: [{ scaleX: 2 }],
    },
    wave2: {
        position: 'absolute',
        left: -50,
        right: -50,
        bottom: -250,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(0, 204, 255, 0.05)',
        transform: [{ scaleX: 1.5 }],
    },
    wave3: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -300,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(0, 102, 204, 0.03)',
    },
    floatingCircle: {
        position: 'absolute',
        borderRadius: 999,
        backgroundColor: 'rgba(0, 204, 255, 0.1)',
    },
    floatingCircle1: {
        width: 200,
        height: 200,
        top: -50,
        right: -50,
    },
    floatingCircle2: {
        width: 150,
        height: 150,
        top: '30%',
        left: -75,
    },
    floatingCircle3: {
        width: 100,
        height: 100,
        bottom: '20%',
        right: -30,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: SPACING.l,
        justifyContent: 'center',
    },
    scrollContentLarge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    brandingSection: {
        flex: 1,
        paddingRight: 60,
        justifyContent: 'center',
    },
    brandingContent: {
        maxWidth: 400,
    },
    logoLarge: {
        marginBottom: SPACING.l,
    },
    logoGradient: {
        width: 100,
        height: 100,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandName: {
        fontSize: 42,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: SPACING.s,
        letterSpacing: -1,
    },
    brandTagline: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)',
        lineHeight: 28,
        marginBottom: SPACING.xl,
    },
    features: {
        gap: SPACING.m,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.m,
    },
    featureIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 204, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    featureText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    formSection: {
        flex: 1,
        alignItems: 'center',
    },
    formSectionLarge: {
        maxWidth: 480,
    },
    mobileHeader: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    logoSmall: {
        width: 72,
        height: 72,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 102, 204, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.m,
        borderWidth: 1,
        borderColor: 'rgba(0, 204, 255, 0.3)',
    },
    mobileAppName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.white,
        letterSpacing: -0.5,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: SPACING.xl,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 40,
        elevation: 20,
    },
    cardLarge: {
        padding: SPACING.xl + 8,
    },
    cardHeader: {
        marginBottom: SPACING.l,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    welcomeSubtext: {
        fontSize: 15,
        color: COLORS.textLight,
    },
    roleSection: {
        marginBottom: SPACING.l,
    },
    roleSectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.s,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    roleSelector: {
        gap: SPACING.s,
    },
    roleCard: {
        borderRadius: 14,
        borderWidth: 2,
        borderColor: COLORS.border,
        overflow: 'hidden',
    },
    roleCardSelected: {
        borderColor: 'transparent',
    },
    roleCardGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.m,
    },
    roleIconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    roleIconWrapperSelected: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    roleTextContainer: {
        flex: 1,
    },
    roleLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 2,
    },
    roleLabelSelected: {
        color: COLORS.white,
    },
    roleDescription: {
        fontSize: 13,
        color: COLORS.textLight,
    },
    roleDescriptionSelected: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioOuterSelected: {
        borderColor: COLORS.white,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.white,
    },
    formFields: {
        gap: SPACING.m,
        marginBottom: SPACING.l,
    },
    inputGroup: {
        gap: SPACING.xs,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.text,
    },
    inputLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    forgotLink: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '500',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: SPACING.m,
    },
    inputIcon: {
        marginRight: SPACING.s,
    },
    textInput: {
        flex: 1,
        paddingVertical: SPACING.m,
        fontSize: 16,
        color: COLORS.text,
    },
    eyeButton: {
        padding: SPACING.xs,
    },
    loginButton: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: SPACING.l,
    },
    loginButtonLoading: {
        opacity: 0.8,
    },
    loginButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.m + 4,
        gap: SPACING.s,
    },
    loginButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
    },
    dividerText: {
        marginHorizontal: SPACING.m,
        color: COLORS.textLight,
        fontSize: 13,
    },
    socialButtons: {
        flexDirection: 'row',
        gap: SPACING.m,
        marginBottom: SPACING.l,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.s + 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.background,
        gap: SPACING.s,
    },
    socialIcon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    socialButtonText: {
        fontSize: 14,
        color: COLORS.text,
        fontWeight: '500',
    },
    registerSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    registerText: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    registerLink: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '600',
    },
    footerText: {
        marginTop: SPACING.l,
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.4)',
        textAlign: 'center',
    },
});

export default LoginScreen;
