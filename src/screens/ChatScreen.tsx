import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, Send } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, MessageBubble } from '../components';
import { useApp } from '../contexts/AppContext';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function ChatScreen({ navigation, route }: Props) {
  const { conversationId } = route.params;
  const { colors, conversations, getUser, sendMessage, markConversationRead } =
    useApp();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const listRef = useRef<FlatList>(null);

  const conversation = conversations.find(c => c.id === conversationId);
  const user = conversation ? getUser(conversation.userId) : undefined;

  // Mở cuộc trò chuyện -> đánh dấu đã đọc
  useEffect(() => {
    if (conversation?.unread) markConversationRead(conversationId);
  }, [conversation?.unread, conversationId, markConversationRead]);

  if (!conversation || !user) return null;

  const handleSend = () => {
    const value = text.trim();
    if (!value) return;
    sendMessage(conversationId, value);
    setText('');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Avatar uri={user.avatar} online={user.online} size={42} />
        <View style={styles.headerText}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {user.name}
          </Text>
          <Text
            style={[
              styles.status,
              { color: user.online ? colors.success : colors.subText },
            ]}
          >
            {user.online ? 'Đang hoạt động' : 'Ngoại tuyến'}
          </Text>
        </View>
      </View>

      <FlatList
        ref={listRef}
        data={conversation.messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.messages}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Avatar uri={user.avatar} size={72} />
            <Text style={[styles.emptyText, { color: colors.subText }]}>
              Hãy gửi lời chào đến {user.name} 👋
            </Text>
          </View>
        }
      />

      <View
        style={[
          styles.inputBar,
          {
            paddingBottom: insets.bottom + 8,
            backgroundColor: colors.card,
            borderTopColor: colors.border,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.bg, color: colors.text },
          ]}
          value={text}
          onChangeText={setText}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor={colors.subText}
          multiline
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!text.trim()}
          style={[
            styles.send,
            { backgroundColor: colors.primary, opacity: text.trim() ? 1 : 0.5 },
          ]}
        >
          <Send size={20} color={colors.onPrimary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerText: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700' },
  status: { fontSize: 12, marginTop: 2 },
  messages: { paddingVertical: 12, flexGrow: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { fontSize: 14 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 12,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 110,
    borderRadius: 21,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },
  send: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
