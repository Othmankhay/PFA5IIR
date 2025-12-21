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
import { 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    User, 
    Phone, 
    ArrowLeft, 
    Droplets, 
    Shield,
    ArrowRight,
    CheckCircle
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 768;

const RegisterScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [selectedRole, setSelectedRole] = useState('client');

    const updateFormData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleRegister = () => {
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
                    <Icon size={24} color={isSelected ? COLORS.white : COLORS.primary} />
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

    const InputField = ({ label, icon: Icon, value, onChangeText, placeholder, secureTextEntry, showToggle, isVisible, onToggleVisibility, keyboardType }) => (
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputWrapper}>
                <Icon size={20} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.textLight}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !isVisible}
                    keyboardType={keyboardType}
                    autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
                />
                {showToggle && (
                    <TouchableOpacity style={styles.eyeButton} onPress={onToggleVisibility}>
                        {isVisible ? (
                            <EyeOff size={20} color={COLORS.textLight} />
                        ) : (
                            <Eye size={20} color={COLORS.textLight} />
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
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

            {/* Wave Pattern */}
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
                                    Rejoignez des milliers d'utilisateurs{'\n'}qui nous font confiance
                                </Text>
                                
                                <View style={styles.benefits}>
                                    <View style={styles.benefitItem}>
                                        <CheckCircle size={20} color="#00CCFF" />
                                        <Text style={styles.benefitText}>Inscription gratuite</Text>
                                    </View>
                                    <View style={styles.benefitItem}>
                                        <CheckCircle size={20} color="#00CCFF" />
                                        <Text style={styles.benefitText}>Configuration en 2 minutes</Text>
                                    </View>
                                    <View style={styles.benefitItem}>
                                        <CheckCircle size={20} color="#00CCFF" />
                                        <Text style={styles.benefitText}>Support technique inclus</Text>
                                    </View>
                                    <View style={styles.benefitItem}>
                                        <CheckCircle size={20} color="#00CCFF" />
                                        <Text style={styles.benefitText}>Essai 30 jours sans engagement</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Right Side - Register Form */}
                    <View style={[styles.formSection, isLargeScreen && styles.formSectionLarge]}>
                        {/* Mobile Header */}
                        {!isLargeScreen && (
                            <View style={styles.mobileHeader}>
                                <TouchableOpacity
                                    style={styles.backButton}
                                    onPress={() => navigation.goBack()}
                                >
                                    <ArrowLeft size={24} color={COLORS.white} />
                                </TouchableOpacity>
                                <View style={styles.logoSmall}>
                                    <Droplets size={28} color={COLORS.white} />
                                </View>
                            </View>
                        )}

                        {/* Desktop Back Button */}
                        {isLargeScreen && (
                            <TouchableOpacity
                                style={styles.backButtonDesktop}
                                onPress={() => navigation.goBack()}
                            >
                                <ArrowLeft size={20} color={COLORS.white} />
                                <Text style={styles.backButtonText}>Retour</Text>
                            </TouchableOpacity>
                        )}

                        {/* Register Card */}
                        <View style={[styles.card, isLargeScreen && styles.cardLarge]}>
                            {/* Header */}
                            <View style={styles.cardHeader}>
                                <Text style={styles.welcomeText}>Créer un compte</Text>
                                <Text style={styles.welcomeSubtext}>
                                    Commencez à gérer vos piscines dès aujourd'hui
                                </Text>
                            </View>

                            {/* Role Selector */}
                            <View style={styles.roleSection}>
                                <Text style={styles.roleSectionTitle}>Type de compte</Text>
                                <View style={styles.roleSelector}>
                                    <RoleCard
                                        role="client"
                                        label="Client"
                                        description="Gérer mes piscines"
                                        icon={User}
                                        isSelected={selectedRole === 'client'}
                                    />
                                    <RoleCard
                                        role="admin"
                                        label="Administrateur"
                                        description="Gérer l'équipe"
                                        icon={Shield}
                                        isSelected={selectedRole === 'admin'}
                                    />
                                </View>
                            </View>

                            {/* Form Fields */}
                            <View style={styles.formFields}>
                                <InputField
                                    label="Nom complet"
                                    icon={User}
                                    value={formData.fullName}
                                    onChangeText={(v) => updateFormData('fullName', v)}
                                    placeholder="Jean Dupont"
                                />
                                <InputField
                                    label="Adresse email"
                                    icon={Mail}
                                    value={formData.email}
                                    onChangeText={(v) => updateFormData('email', v)}
                                    placeholder="exemple@email.com"
                                    keyboardType="email-address"
                                />
                                <InputField
                                    label="Téléphone"
                                    icon={Phone}
                                    value={formData.phone}
                                    onChangeText={(v) => updateFormData('phone', v)}
                                    placeholder="+33 6 00 00 00 00"
                                    keyboardType="phone-pad"
                                />
                                <InputField
                                    label="Mot de passe"
                                    icon={Lock}
                                    value={formData.password}
                                    onChangeText={(v) => updateFormData('password', v)}
                                    placeholder="••••••••"
                                    secureTextEntry
                                    showToggle
                                    isVisible={showPassword}
                                    onToggleVisibility={() => setShowPassword(!showPassword)}
                                />
                                <InputField
                                    label="Confirmer le mot de passe"
                                    icon={Lock}
                                    value={formData.confirmPassword}
                                    onChangeText={(v) => updateFormData('confirmPassword', v)}
                                    placeholder="••••••••"
                                    secureTextEntry
                                    showToggle
                                    isVisible={showConfirmPassword}
                                    onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </View>

                            {/* Terms */}
                            <TouchableOpacity
                                style={styles.termsContainer}
                                onPress={() => setAcceptedTerms(!acceptedTerms)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                                    {acceptedTerms && <CheckCircle size={14} color={COLORS.white} />}
                                </View>
                                <Text style={styles.termsText}>
                                    J'accepte les{' '}
                                    <Text style={styles.termsLink}>conditions d'utilisation</Text>
                                    {' '}et la{' '}
                                    <Text style={styles.termsLink}>politique de confidentialité</Text>
                                </Text>
                            </TouchableOpacity>

                            {/* Register Button */}
                            <TouchableOpacity
                                style={[styles.registerButton, isLoading && styles.registerButtonLoading]}
                                onPress={handleRegister}
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
                                    style={styles.registerButtonGradient}
                                >
                                    <Text style={styles.registerButtonText}>
                                        {isLoading ? 'Création en cours...' : 'Créer mon compte'}
                                    </Text>
                                    {!isLoading && <ArrowRight size={20} color={COLORS.white} />}
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Login Link */}
                            <View style={styles.loginSection}>
                                <Text style={styles.loginText}>Déjà un compte ?</Text>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Text style={styles.loginLink}>Se connecter</Text>
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
        top: '40%',
        left: -75,
    },
    floatingCircle3: {
        width: 100,
        height: 100,
        bottom: '15%',
        right: -30,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: SPACING.l,
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
    benefits: {
        gap: SPACING.m,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.m,
    },
    benefitText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    formSection: {
        flex: 1,
        alignItems: 'center',
    },
    formSectionLarge: {
        maxWidth: 500,
    },
    mobileHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: SPACING.l,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonDesktop: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: SPACING.m,
        gap: SPACING.xs,
    },
    backButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '500',
    },
    logoSmall: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: 'rgba(0, 102, 204, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 204, 255, 0.3)',
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
        flexDirection: 'row',
        gap: SPACING.s,
    },
    roleCard: {
        flex: 1,
        borderRadius: 12,
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
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.s,
    },
    roleIconWrapperSelected: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    roleTextContainer: {
        flex: 1,
    },
    roleLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    roleLabelSelected: {
        color: COLORS.white,
    },
    roleDescription: {
        fontSize: 11,
        color: COLORS.textLight,
    },
    roleDescriptionSelected: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    radioOuter: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioOuterSelected: {
        borderColor: COLORS.white,
    },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.white,
    },
    formFields: {
        gap: SPACING.m,
        marginBottom: SPACING.m,
    },
    inputGroup: {
        gap: 6,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.text,
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
        fontSize: 15,
        color: COLORS.text,
    },
    eyeButton: {
        padding: SPACING.xs,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: SPACING.l,
        gap: SPACING.s,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1,
    },
    checkboxChecked: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    termsText: {
        flex: 1,
        fontSize: 13,
        color: COLORS.textLight,
        lineHeight: 20,
    },
    termsLink: {
        color: COLORS.primary,
        fontWeight: '500',
    },
    registerButton: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: SPACING.l,
    },
    registerButtonLoading: {
        opacity: 0.8,
    },
    registerButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.m + 4,
        gap: SPACING.s,
    },
    registerButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
    loginSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    loginText: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    loginLink: {
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

export default RegisterScreen;
