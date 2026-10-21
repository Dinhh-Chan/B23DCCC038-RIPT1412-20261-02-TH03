import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  body: { flex: 1, gap: 3 },
  name: { fontSize: 15, fontWeight: '700' },
  status: { fontSize: 12, fontWeight: '500' },
  action: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
