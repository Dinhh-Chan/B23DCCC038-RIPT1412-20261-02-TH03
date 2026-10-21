import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NotificationItem, ScreenHeader } from '../components';
import { useApp } from '../contexts/AppContext';

type Filter = 'all' | 'unread' | 'read';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'unread', label: 'Chưa đọc' },
  { key: 'read', label: 'Đã đọc' },
];

export default function NotificationsScreen() {
  const {
    colors,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
  } = useApp();
  const [filter, setFilter] = useState<Filter>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const data = notifications.filter(n =>
    filter === 'all' ? true : filter === 'unread' ? !n.read : n.read,
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader
        title="Thông báo"
        subtitle={
          unreadCount > 0
            ? `${unreadCount} thông báo chưa đọc`
            : 'Bạn đã đọc tất cả thông báo'
        }
        right={
          <TouchableOpacity
            disabled={unreadCount === 0}
            onPress={markAllNotificationsRead}
            style={[
              styles.markAll,
              {
                backgroundColor: colors.primaryLight,
                opacity: unreadCount === 0 ? 0.5 : 1,
              },
            ]}
          >
            <Text style={[styles.markAllText, { color: colors.primary }]}>
              Đọc tất cả
            </Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.filters}>
        {FILTERS.map(f => {
          const active = f.key === filter;
          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[
                styles.pill,
                {
                  backgroundColor: active ? colors.primary : colors.card,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: active ? colors.onPrimary : colors.subText },
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => markNotificationRead(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.subText }]}>
            Không có thông báo
          </Text>
        }
        ListFooterComponent={
          data.length > 0 ? (
            <Text style={[styles.tip, { color: colors.subText }]}>
              Nhấn vào thông báo để đánh dấu là đã đọc
            </Text>
          ) : undefined
        }
      />
    </View>
  );
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: { flex: 1 },
  markAll: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  markAllText: { fontSize: 13, fontWeight: '700' },
  filters: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: { fontSize: 13, fontWeight: '600' },
  list: { paddingBottom: 20 },
  separator: { height: 8 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 14 },
  tip: { textAlign: 'center', fontSize: 12, marginTop: 16 },
});
