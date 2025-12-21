import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useResponsive } from '../../../hooks/useResponsive';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import { COLORS, SPACING } from '../../constants/theme';
import { 
    Search, 
    Send, 
    Check,
    CheckCheck,
    Phone,
    Video
} from 'lucide-react-native';

const ClientMessagesScreen = () => {
    const { isDesktop } = useResponsive();
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageText, setMessageText] = useState('');

    const conversations = [
        {
            id: '1',
            name: 'Ahmed Benali',
            role: 'Technicien',
            avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200',
            lastMessage: 'Bonjour, je serai là demain à 10h pour l\'entretien.',
            time: '10:30',
            unread: 2,
            online: true,
        },
        {
            id: '2',
            name: 'Support Client',
            role: 'Assistance',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
            lastMessage: 'Votre demande a bien été prise en compte.',
            time: 'Hier',
            unread: 0,
            online: true,
        },
        {
            id: '3',
            name: 'Sarah Connor',
            role: 'Technicienne',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
            lastMessage: 'Les travaux sont terminés !',
            time: 'Lun',
            unread: 0,
            online: false,
        },
    ];

    const messages = [
        { id: '1', text: 'Bonjour !', sent: false, time: '10:00' },
        { id: '2', text: 'Bonjour M. Dupont, comment allez-vous ?', sent: true, time: '10:01' },
        { id: '3', text: 'Très bien merci ! J\'ai une question concernant l\'entretien de demain.', sent: false, time: '10:05' },
        { id: '4', text: 'Bien sûr, je vous écoute.', sent: true, time: '10:06' },
        { id: '5', text: 'À quelle heure pensez-vous arriver ?', sent: false, time: '10:08' },
        { id: '6', text: 'Je serai là demain à 10h pour l\'entretien.', sent: true, time: '10:30' },
    ];

    const renderConversationItem = ({ item }) => (
        <TouchableOpacity 
            style={[
                styles.conversationItem,
                selectedChat?.id === item.id && styles.conversationItemActive
            ]}
            onPress={() => setSelectedChat(item)}
        >
            <View style={styles.avatarContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                {item.online && <View style={styles.onlineDot} />}
            </View>
            <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                    <Text style={styles.conversationName}>{item.name}</Text>
                    <Text style={styles.conversationTime}>{item.time}</Text>
                </View>
                <View style={styles.conversationFooter}>
                    <Text style={styles.conversationRole}>{item.role}</Text>
                    <Text style={styles.conversationMessage} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
                </View>
            </View>
            {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    const renderMessage = ({ item }) => (
        <View style={[
            styles.messageBubble,
            item.sent ? styles.messageSent : styles.messageReceived
        ]}>
            <Text style={[
                styles.messageText,
                item.sent ? styles.messageTextSent : styles.messageTextReceived
            ]}>
                {item.text}
            </Text>
            <View style={styles.messageFooter}>
                <Text style={[
                    styles.messageTime,
                    item.sent && styles.messageTimeSent
                ]}>
                    {item.time}
                </Text>
                {item.sent && <CheckCheck size={14} color={COLORS.white} />}
            </View>
        </View>
    );

    const ChatView = () => (
        <View style={styles.chatContainer}>
            {/* Chat Header */}
            <View style={styles.chatHeader}>
                {!isDesktop && (
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => setSelectedChat(null)}
                    >
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                )}
                <Image source={{ uri: selectedChat.avatar }} style={styles.chatAvatar} />
                <View style={styles.chatHeaderInfo}>
                    <Text style={styles.chatName}>{selectedChat.name}</Text>
                    <Text style={styles.chatStatus}>
                        {selectedChat.online ? 'En ligne' : 'Hors ligne'}
                    </Text>
                </View>
                <View style={styles.chatActions}>
                    <TouchableOpacity style={styles.chatAction}>
                        <Phone size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chatAction}>
                        <Video size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Messages */}
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messagesList}
                showsVerticalScrollIndicator={false}
            />

            {/* Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Écrivez un message..."
                    placeholderTextColor={COLORS.textLight}
                    value={messageText}
                    onChangeText={setMessageText}
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Send size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (!isDesktop && selectedChat) {
        return (
            <ScreenWrapper>
                <ChatView />
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper>
            <View style={[styles.container, isDesktop && styles.containerDesktop]}>
                {/* Conversations List */}
                <View style={[styles.conversationsList, isDesktop && styles.conversationsListDesktop]}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Messages</Text>
                    </View>

                    {/* Search */}
                    <View style={styles.searchContainer}>
                        <Search size={18} color={COLORS.textLight} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Rechercher..."
                            placeholderTextColor={COLORS.textLight}
                        />
                    </View>

                    <FlatList
                        data={conversations}
                        renderItem={renderConversationItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                {/* Chat View (Desktop) */}
                {isDesktop && (
                    <View style={styles.chatSection}>
                        {selectedChat ? (
                            <ChatView />
                        ) : (
                            <View style={styles.noChatSelected}>
                                <Text style={styles.noChatText}>
                                    Sélectionnez une conversation
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerDesktop: {
        flexDirection: 'row',
    },
    conversationsList: {
        flex: 1,
        padding: SPACING.m,
    },
    conversationsListDesktop: {
        width: 350,
        borderRightWidth: 1,
        borderRightColor: COLORS.border,
    },
    header: {
        marginBottom: SPACING.m,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        paddingHorizontal: SPACING.m,
        marginBottom: SPACING.m,
    },
    searchInput: {
        flex: 1,
        paddingVertical: SPACING.s + 2,
        marginLeft: SPACING.s,
        fontSize: 15,
        color: COLORS.text,
    },
    conversationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.m,
        borderRadius: 12,
        marginBottom: SPACING.xs,
    },
    conversationItemActive: {
        backgroundColor: COLORS.primary + '10',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.success,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    conversationContent: {
        flex: 1,
        marginLeft: SPACING.m,
    },
    conversationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    conversationName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    conversationTime: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    conversationFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    conversationRole: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '500',
    },
    conversationMessage: {
        fontSize: 13,
        color: COLORS.textLight,
        flex: 1,
    },
    unreadBadge: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    unreadText: {
        color: COLORS.white,
        fontSize: 11,
        fontWeight: 'bold',
    },
    chatSection: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.m,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.white,
    },
    backButton: {
        marginRight: SPACING.s,
    },
    backButtonText: {
        fontSize: 24,
        color: COLORS.primary,
    },
    chatAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    chatHeaderInfo: {
        flex: 1,
        marginLeft: SPACING.m,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    chatStatus: {
        fontSize: 13,
        color: COLORS.success,
    },
    chatActions: {
        flexDirection: 'row',
        gap: SPACING.s,
    },
    chatAction: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary + '10',
        justifyContent: 'center',
        alignItems: 'center',
    },
    messagesList: {
        padding: SPACING.m,
    },
    messageBubble: {
        maxWidth: '75%',
        padding: SPACING.m,
        borderRadius: 16,
        marginBottom: SPACING.s,
    },
    messageSent: {
        alignSelf: 'flex-end',
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: 4,
    },
    messageReceived: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.background,
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },
    messageTextSent: {
        color: COLORS.white,
    },
    messageTextReceived: {
        color: COLORS.text,
    },
    messageFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 4,
        gap: 4,
    },
    messageTime: {
        fontSize: 11,
        color: COLORS.textLight,
    },
    messageTimeSent: {
        color: 'rgba(255,255,255,0.7)',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.m,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.white,
        gap: SPACING.s,
    },
    textInput: {
        flex: 1,
        backgroundColor: COLORS.background,
        borderRadius: 24,
        paddingVertical: SPACING.s + 2,
        paddingHorizontal: SPACING.m,
        fontSize: 15,
        color: COLORS.text,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noChatSelected: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noChatText: {
        fontSize: 16,
        color: COLORS.textLight,
    },
});

export default ClientMessagesScreen;
