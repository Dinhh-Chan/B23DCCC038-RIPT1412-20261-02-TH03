import { Text, TouchableOpacity, View } from 'react-native';
import { Conversation, User } from '../../commons/data';
import { useApp } from '../../contexts/AppContext';
import Avatar from '../Avatar';
import { styles } from './styles';

type Props = {
  conversation: Conversation;
  user: User;
  onPress: () => void;
};

export default function ConversationItem({
  conversation,
  user,
  onPress,
}: Props) {
  const { colors } = useApp();
  const last = conversation.messages[conversation.messages.length - 1];
  const hasUnread = conversation.unread > 0;
  const preview = last
    ? `${last.fromMe ? 'Bạn: ' : ''}${last.text}`
    : 'Bắt đầu cuộc trò chuyện';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, { backgroundColor: colors.card }]}
    >
      <Avatar uri={user.avatar} online={user.online} />
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {user.name}
          </Text>
          <Text
            style={[
              styles.time,
              { color: hasUnread ? colors.primary : colors.subText },
            ]}
          >
            {last?.time ?? ''}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            numberOfLines={1}
            style={[
              styles.preview,
              hasUnread
                ? { color: colors.text, fontWeight: '600' }
                : { color: colors.subText },
            ]}
          >
            {preview}
          </Text>
          {hasUnread && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.badgeText, { color: colors.onPrimary }]}>
                {conversation.unread > 99 ? '99+' : conversation.unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
