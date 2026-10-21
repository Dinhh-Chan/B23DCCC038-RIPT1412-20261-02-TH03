import { Eye, EyeOff, Lock, MessageCircle, User } from 'lucide-react-native';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useApp } from '../contexts/AppContext';

export default function LoginScreen() {
  const { colors, login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    form?: string;
  }>({});

  const handleLogin = () => {
    const next: typeof errors = {};
    if (!username.trim()) next.username = 'Vui lòng nhập tài khoản';
    if (!password) next.password = 'Vui lòng nhập mật khẩu';
    if (!next.username && !next.password && !login(username, password)) {
      next.form = 'Tài khoản hoặc mật khẩu không đúng';
    }
    setErrors(next);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.brand}>
        <View style={[styles.logo, { backgroundColor: colors.primary }]}>
          <MessageCircle size={42} color={colors.onPrimary} strokeWidth={2.2} />
        </View>
        <Text style={[styles.appName, { color: colors.text }]}>ChatApp</Text>
        <Text style={[styles.slogan, { color: colors.subText }]}>
          Kết nối mọi người, mọi lúc, mọi nơi
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text }]}>Tài khoản</Text>
        <View
          style={[
            styles.inputBox,
            { borderColor: errors.username ? colors.danger : colors.border },
          ]}
        >
          <User size={18} color={colors.subText} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Nhập tài khoản"
            placeholderTextColor={colors.subText}
            autoCapitalize="none"
            value={username}
            onChangeText={t => {
              setUsername(t);
              setErrors(e => ({ ...e, username: undefined, form: undefined }));
            }}
          />
        </View>
        {!!errors.username && (
          <Text style={[styles.error, { color: colors.danger }]}>
            {errors.username}
          </Text>
        )}

        <Text style={[styles.label, { color: colors.text }]}>Mật khẩu</Text>
        <View
          style={[
            styles.inputBox,
            { borderColor: errors.password ? colors.danger : colors.border },
          ]}
        >
          <Lock size={18} color={colors.subText} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Nhập mật khẩu"
            placeholderTextColor={colors.subText}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={t => {
              setPassword(t);
              setErrors(e => ({ ...e, password: undefined, form: undefined }));
            }}
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(s => !s)}
            hitSlop={8}
          >
            {showPassword ? (
              <EyeOff size={18} color={colors.subText} />
            ) : (
              <Eye size={18} color={colors.subText} />
            )}
          </TouchableOpacity>
        </View>
        {!!errors.password && (
          <Text style={[styles.error, { color: colors.danger }]}>
            {errors.password}
          </Text>
        )}

        {!!errors.form && (
          <Text style={[styles.formError, { color: colors.danger }]}>
            {errors.form}
          </Text>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
        >
          <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <Text style={[styles.hint, { color: colors.subText }]}>
          Tài khoản demo: admin / 123456
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  brand: { alignItems: 'center', marginBottom: 32 },
  logo: {
    width: 84,
    height: 84,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: { fontSize: 32, fontWeight: '800' },
  slogan: { fontSize: 14, marginTop: 6 },
  card: { borderRadius: 20, padding: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 8 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
  },
  input: { flex: 1, fontSize: 15, paddingVertical: 0 },
  error: { fontSize: 12, marginTop: 6 },
  formError: { fontSize: 13, marginTop: 12, textAlign: 'center' },
  button: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: { fontSize: 16, fontWeight: '700' },
  hint: { fontSize: 12, textAlign: 'center', marginTop: 14 },
});
