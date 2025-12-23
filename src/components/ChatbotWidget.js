import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Animated,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from 'react-native';
import { COLORS, SPACING, SHADOWS } from '../constants/theme';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react-native';

// Ollama Configuration
const OLLAMA_BASE_URL = 'http://localhost:11434';
const OLLAMA_MODEL = 'llama3.2'; // Good balance of speed and quality

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: '1',
            text: "Bonjour! 👋 Je suis votre assistant UniversPiscine. Comment puis-je vous aider aujourd'hui?",
            isBot: true,
            timestamp: new Date(),
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const scrollViewRef = useRef(null);

    // Pulse animation for the FAB
    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, []);

    const toggleChat = () => {
        if (isOpen) {
            // Close animation
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => setIsOpen(false));
        } else {
            setIsOpen(true);
            // Open animation
            Animated.parallel([
                Animated.spring(slideAnim, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            text: message.trim(),
            isBot: false,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        const userInput = message.trim();
        setMessage('');
        setIsTyping(true);

        try {
            // Create a context-aware prompt for pool-related assistance
            const contextPrompt = `You are a helpful assistant for UniversPiscine, a pool management and maintenance company. 
You help clients with questions about their pools, reservations, maintenance schedules, and services.
Keep responses concise and friendly. Respond in French when the user writes in French, otherwise respond in the same language as the user.

User question: ${userInput}`;

            // Call Ollama API
            const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: OLLAMA_MODEL,
                    prompt: contextPrompt,
                    stream: false, // Disable streaming for simpler handling
                    options: {
                        temperature: 0.7,
                        top_p: 0.9,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const botResponse = data.response || "Je n'ai pas pu générer une réponse.";

            const botMessage = {
                id: (Date.now() + 1).toString(),
                text: botResponse,
                isBot: true,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Ollama API Error:', error);
            
            let errorText = "Désolé, je rencontre un problème technique. ";
            if (error.message.includes('Network request failed') || error.message.includes('Failed to fetch')) {
                errorText += "Veuillez vérifier qu'Ollama est bien démarré (ollama serve).";
            } else {
                errorText += "Veuillez réessayer plus tard.";
            }
            
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                text: errorText,
                isBot: true,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    };

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollViewRef.current) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const chatTranslateY = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    return (
        <View style={styles.container} pointerEvents="box-none">
            {/* Chat Window */}
            {isOpen && (
                <Animated.View 
                    style={[
                        styles.chatWindow,
                        {
                            opacity: scaleAnim,
                            transform: [
                                { translateY: chatTranslateY },
                                { scale: scaleAnim },
                            ],
                        }
                    ]}
                >
                    {/* Chat Header */}
                    <View style={styles.chatHeader}>
                        <View style={styles.headerLeft}>
                            <View style={styles.botAvatarSmall}>
                                <Bot size={18} color={COLORS.white} />
                            </View>
                            <View>
                                <Text style={styles.headerTitle}>Assistant IA</Text>
                                <View style={styles.onlineStatus}>
                                    <View style={styles.onlineDot} />
                                    <Text style={styles.onlineText}>En ligne</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={toggleChat} style={styles.closeButton}>
                            <X size={20} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>

                    {/* Messages Area */}
                    <ScrollView 
                        ref={scrollViewRef}
                        style={styles.messagesContainer}
                        contentContainerStyle={styles.messagesContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {messages.map((msg) => (
                            <View 
                                key={msg.id} 
                                style={[
                                    styles.messageWrapper,
                                    msg.isBot ? styles.botMessageWrapper : styles.userMessageWrapper
                                ]}
                            >
                                {msg.isBot && (
                                    <View style={styles.botAvatar}>
                                        <Bot size={14} color={COLORS.primary} />
                                    </View>
                                )}
                                <View style={[
                                    styles.messageBubble,
                                    msg.isBot ? styles.botBubble : styles.userBubble
                                ]}>
                                    <Text style={[
                                        styles.messageText,
                                        msg.isBot ? styles.botText : styles.userText
                                    ]}>
                                        {msg.text}
                                    </Text>
                                    <Text style={[
                                        styles.messageTime,
                                        msg.isBot ? styles.botTime : styles.userTime
                                    ]}>
                                        {formatTime(msg.timestamp)}
                                    </Text>
                                </View>
                                {!msg.isBot && (
                                    <View style={styles.userAvatar}>
                                        <User size={14} color={COLORS.white} />
                                    </View>
                                )}
                            </View>
                        ))}
                        
                        {/* Typing Indicator */}
                        {isTyping && (
                            <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
                                <View style={styles.botAvatar}>
                                    <Bot size={14} color={COLORS.primary} />
                                </View>
                                <View style={[styles.messageBubble, styles.botBubble, styles.typingBubble]}>
                                    <View style={styles.typingDots}>
                                        <View style={[styles.typingDot, styles.dot1]} />
                                        <View style={[styles.typingDot, styles.dot2]} />
                                        <View style={[styles.typingDot, styles.dot3]} />
                                    </View>
                                </View>
                            </View>
                        )}
                    </ScrollView>

                    {/* Input Area */}
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        keyboardVerticalOffset={80}
                    >
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={message}
                                onChangeText={setMessage}
                                placeholder="Tapez votre message..."
                                placeholderTextColor={COLORS.textLight}
                                multiline
                                maxLength={500}
                                onSubmitEditing={sendMessage}
                                returnKeyType="send"
                            />
                            <TouchableOpacity 
                                style={[
                                    styles.sendButton,
                                    !message.trim() && styles.sendButtonDisabled
                                ]}
                                onPress={sendMessage}
                                disabled={!message.trim() || isTyping}
                            >
                                <Send size={18} color={message.trim() ? COLORS.white : COLORS.textLight} />
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </Animated.View>
            )}

            {/* Floating Action Button */}
            <Animated.View style={[
                styles.fabContainer,
                !isOpen && { transform: [{ scale: pulseAnim }] }
            ]}>
                <TouchableOpacity 
                    style={[styles.fab, isOpen && styles.fabActive]}
                    onPress={toggleChat}
                    activeOpacity={0.8}
                >
                    {isOpen ? (
                        <X size={24} color={COLORS.white} />
                    ) : (
                        <MessageCircle size={24} color={COLORS.white} />
                    )}
                </TouchableOpacity>
                {!isOpen && messages.length > 1 && (
                    <View style={styles.notificationBadge}>
                        <Text style={styles.badgeText}>!</Text>
                    </View>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 80,
        right: 16,
        zIndex: 1000,
        elevation: 1000,
    },
    fabContainer: {
        position: 'relative',
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.large,
        // Gradient effect simulation
        borderWidth: 2,
        borderColor: COLORS.secondary + '40',
    },
    fabActive: {
        backgroundColor: COLORS.error,
        borderColor: COLORS.error + '40',
    },
    notificationBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.error,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    chatWindow: {
        position: 'absolute',
        bottom: 70,
        right: 0,
        width: Math.min(360, SCREEN_WIDTH - 32),
        height: Math.min(500, SCREEN_HEIGHT * 0.6),
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        ...SHADOWS.large,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s + 4,
        backgroundColor: COLORS.primary,
        // Gradient simulation
        borderBottomWidth: 0,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botAvatarSmall: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.s,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    onlineStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4ADE80',
        marginRight: 4,
    },
    onlineText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
    },
    closeButton: {
        padding: SPACING.xs,
    },
    messagesContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    messagesContent: {
        padding: SPACING.m,
        paddingBottom: SPACING.s,
    },
    messageWrapper: {
        flexDirection: 'row',
        marginBottom: SPACING.m,
        alignItems: 'flex-end',
    },
    botMessageWrapper: {
        justifyContent: 'flex-start',
    },
    userMessageWrapper: {
        justifyContent: 'flex-end',
    },
    botAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.xs,
    },
    userAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SPACING.xs,
    },
    messageBubble: {
        maxWidth: '75%',
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s + 2,
        borderRadius: 18,
    },
    botBubble: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    userBubble: {
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 4,
    },
    messageText: {
        fontSize: 14,
        lineHeight: 20,
    },
    botText: {
        color: COLORS.text,
    },
    userText: {
        color: COLORS.white,
    },
    messageTime: {
        fontSize: 10,
        marginTop: 4,
    },
    botTime: {
        color: COLORS.textLight,
    },
    userTime: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'right',
    },
    typingBubble: {
        paddingVertical: SPACING.m,
    },
    typingDots: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.textLight,
        marginHorizontal: 2,
    },
    dot1: {
        opacity: 0.4,
    },
    dot2: {
        opacity: 0.6,
    },
    dot3: {
        opacity: 0.8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        backgroundColor: COLORS.background,
        borderRadius: 20,
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s,
        fontSize: 14,
        color: COLORS.text,
        marginRight: SPACING.s,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: COLORS.border,
    },
});

export default ChatbotWidget;
