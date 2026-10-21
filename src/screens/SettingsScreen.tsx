import {
  Bell,
  IdCard,
  LogOut,
  Mail,
  Moon,
  Phone,
  User,
} from 'lucide-react-native';
import { ReactNode } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../commons/theme';
import { Avatar, ScreenHeader } from '../components';
import { useApp } from '../contexts/AppContext';

type RowProps = {
  colors: Colors;
  icon: ReactNode;
  label: string;
  value?: string;
  right?: ReactNode;
};

function Row({ colors, icon, label, value, right }: RowProps) {
  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <View style={[styles.rowIcon, { backgroundColor: colors.primaryLight }]}>
        {icon}
      </View>
      <Text style={[styles.rowLabel, { color: colors.text }]}>{label}</Text>
      {value ? (
        <Text style={[styles.rowValue, { color: colors.subText }]}>
          {value}
        </Text>
      ) : null}
      {right}
    </View>
  );
}

export default function SettingsScreen() {
  const {
    colors,
    account,
    logout,
    darkMode,
    setDarkMode,
    notificationsEnabled,
    setNotificationsEnabled,
  } = useApp();

  if (!account) return null;

  const handleLogout = () =>
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đăng xuất', style: 'destructive', onPress: logout },
    ]);

  const switchColors = {
    trackColor: { false: colors.offline, true: colors.primary },
    thumbColor: '#FFFFFF',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader title="Cài đặt" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.profile, { backgroundColor: colors.card }]}>
          <Avatar uri={account.avatar} size={84} online />
          <Text style={[styles.name, { color: colors.text }]}>
            {account.name}
          </Text>
          <Text style={[styles.username, { color: colors.subText }]}>
            {account.studentId} · @{account.username}
          </Text>
        </View>

        <Text style={[styles.section, { color: colors.subText }]}>
          THÔNG TIN TÀI KHOẢN
        </Text>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Row
            colors={colors}
            icon={<User size={18} color={colors.primary} />}
            label="Họ tên"
            value={account.name}
          />
          <Row
            colors={colors}
            icon={<IdCard size={18} color={colors.primary} />}
            label="Mã sinh viên"
            value={account.studentId}
          />
          <Row
            colors={colors}
            icon={<Mail size={18} color={colors.primary} />}
            label="Email"
            value={account.email}
          />
          <Row
            colors={colors}
            icon={<Phone size={18} color={colors.primary} />}
            label="Điện thoại"
            value={account.phone}
          />
        </View>

        <Text style={[styles.section, { color: colors.subText }]}>
          TÙY CHỌN
        </Text>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Row
            colors={colors}
            icon={<Bell size={18} color={colors.primary} />}
            label="Nhận thông báo"
            right={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                {...switchColors}
              />
            }
          />
          <Row
            colors={colors}
            icon={<Moon size={18} color={colors.primary} />}
            label="Chế độ tối"
            right={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                {...switchColors}
              />
            }
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          style={[styles.logout, { backgroundColor: colors.danger }]}
        >
          <LogOut size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  profile: {
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 24,
  },
  name: { fontSize: 20, fontWeight: '800', marginTop: 12 },
  username: { fontSize: 14, marginTop: 4 },
  section: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 22,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: { borderRadius: 16, paddingHorizontal: 14 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 56,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { flex: 1, fontSize: 15, fontWeight: '500' },
  rowValue: { fontSize: 14, flexShrink: 1, textAlign: 'right' },
  logout: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 14,
    marginTop: 28,
  },
  logoutText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
