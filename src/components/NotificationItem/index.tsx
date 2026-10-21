import { Bell, CheckCheck } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { AppNotification } from '../../commons/data';
import { useApp } from '../../contexts/AppContext';
import { styles } from './styles';

type Props = {
  notification: AppNotification;
  onPress: () => void;
};

export default function NotificationItem({ notification, onPress }: Props) {
  const { colors } = useApp();
  const unread = !notification.read;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: unread ? colors.primaryLight : colors.card,
          borderColor: unread ? colors.primary : colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.icon,
          { backgroundColor: unread ? colors.primary : colors.border },
        ]}
      >
        <Bell size={18} color={unread ? colors.onPrimary : colors.subText} />
      </View>
      <View style={styles.body}>
        <Text
          style={[
            styles.content,
            { color: colors.text, fontWeight: unread ? '700' : '400' },
          ]}
        >
          {notification.content}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.time, { color: colors.subText }]}>
            {notification.time}
          </Text>
          <Text
            style={[
              styles.state,
              { color: unread ? colors.primary : colors.subText },
            ]}
          >
            {unread ? '• Chưa đọc' : 'Đã đọc'}
          </Text>
        </View>
      </View>
      {unread ? (
        <View style={[styles.dot, { backgroundColor: colors.danger }]} />
      ) : (
        <CheckCheck size={16} color={colors.subText} />
      )}
    </TouchableOpacity>
  );
}
