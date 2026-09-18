import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Send,
  Mic,
  Image,
  ArrowLeft,
  Bot,
  User,
  Sparkles,
  Activity,
  Moon,
  Utensils,
  Heart,
} from 'lucide-react-native';
import { Colors, Gradients, Shadows, BorderRadius, Spacing } from '@/constants/theme';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const suggestedQuestions = [
  { id: '1', text: 'How can I improve my sleep?', icon: Moon },
  { id: '2', text: 'Best exercises for heart health', icon: Heart },
  { id: '3', text: 'Tips for healthy eating', icon: Utensils },
  { id: '4', text: 'Stress management tips', icon: Activity },
];

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your AI Health Assistant. I\'m here to help answer your health-related questions, provide wellness tips, and guide you toward better health. How can I help you today?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const mockResponses: Record<string, string> = {
  sleep: 'Getting quality sleep is essential for overall health. Here are some tips:\n\n1. **Maintain a consistent sleep schedule** - Go to bed and wake up at the same time every day.\n\n2. **Create a relaxing bedtime routine** - Avoid screens 1 hour before bed, try reading or meditation.\n\n3. **Optimize your sleep environment** - Keep your bedroom cool, dark, and quiet.\n\n4. **Limit caffeine and heavy meals** - Avoid these 4-6 hours before bedtime.\n\nWould you like more specific recommendations?',
  heart: 'Here are the best exercises for cardiovascular health:\n\n1. **Aerobic exercises** - Brisk walking, jogging, swimming, cycling (30 mins daily)\n\n2. **Strength training** - Light weights or resistance bands (2-3 times weekly)\n\n3. **Flexibility exercises** - Yoga or stretching for circulation\n\n4. **HIIT workouts** - Short bursts of intense activity with rest periods\n\nAlways consult your doctor before starting a new exercise routine. How active are you currently?',
  default: 'Thank you for your question! Based on general health guidelines, here\'s my advice:\n\n1. **Stay hydrated** - Drink 8 glasses of water daily\n2. **Move regularly** - Aim for 30 minutes of activity\n3. **Eat balanced meals** - Include vegetables, fruits, and proteins\n4. **Get enough sleep** - 7-9 hours for adults\n\nWould you like me to elaborate on any specific aspect of your health?',
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const typingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let responseKey = 'default';
      if (messageText.toLowerCase().includes('sleep')) responseKey = 'sleep';
      else if (messageText.toLowerCase().includes('heart') || messageText.toLowerCase().includes('exercise')) responseKey = 'heart';

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: mockResponses[responseKey],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageContainer, isUser && styles.userMessageContainer]}>
        <View style={[styles.messageBubble, isUser ? styles.userMessage : styles.assistantMessage]}>
          <Text style={[styles.messageText, isUser && styles.userMessageText]}>
            {item.content}
          </Text>
        </View>
        <Text style={[styles.timestamp, isUser && styles.userTimestamp]}>
          {item.timestamp}
        </Text>
      </View>
    );
  };

  const TypingIndicator = () => (
    <View style={styles.typingContainer}>
      <View style={styles.assistantAvatar}>
        <Bot size={20} color={Colors.textWhite} />
      </View>
      <View style={styles.typingBubble}>
        <View style={styles.typingDots}>
          <Animated.View style={[styles.typingDot, { opacity: typingAnim }]} />
          <Animated.View style={[styles.typingDot, { opacity: typingAnim, marginLeft: 4 }]} />
          <Animated.View style={[styles.typingDot, { opacity: typingAnim, marginLeft: 4 }]} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <LinearGradient
            colors={[Colors.primary, '#4F46E5']}
            style={styles.headerAvatar}
          >
            <Sparkles size={20} color={Colors.textWhite} />
          </LinearGradient>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>AI Health Assistant</Text>
            <View style={styles.statusRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isTyping ? TypingIndicator : null}
      />

      {messages.length === 1 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Suggested Questions</Text>
          <View style={styles.suggestionsGrid}>
            {suggestedQuestions.map((q) => {
              const IconComponent = q.icon;
              return (
                <TouchableOpacity
                  key={q.id}
                  style={styles.suggestionCard}
                  onPress={() => handleSend(q.text)}
                  activeOpacity={0.8}
                >
                  <IconComponent size={20} color={Colors.primary} />
                  <Text style={styles.suggestionText}>{q.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Image size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor={Colors.textMuted}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
          </View>
          <TouchableOpacity style={styles.voiceButton}>
            <Mic size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={() => handleSend()}
            disabled={!inputText.trim()}
          >
            <Send size={20} color={Colors.textWhite} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadows.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  statusText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.success,
  },
  headerRight: {
    width: 40,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  messageContainer: {
    marginBottom: Spacing.lg,
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 16,
    borderRadius: 20,
    ...Shadows.sm,
  },
  assistantMessage: {
    backgroundColor: Colors.card,
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  userMessageText: {
    color: Colors.textWhite,
  },
  timestamp: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  userTimestamp: {
    textAlign: 'right',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  assistantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typingBubble: {
    backgroundColor: Colors.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  suggestionsContainer: {
    paddingHorizontal: 16,
    marginBottom: Spacing.lg,
  },
  suggestionsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  suggestionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  attachButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  textInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  voiceButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.border,
  },
});
