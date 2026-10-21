import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', paddingHorizontal: 12, marginVertical: 3 },
  rowMine: { justifyContent: 'flex-end' },
  rowOther: { justifyContent: 'flex-start' },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  bubbleMine: { borderBottomRightRadius: 4 },
  bubbleOther: { borderBottomLeftRadius: 4, borderWidth: 1 },
  text: { fontSize: 15, lineHeight: 20 },
  time: { fontSize: 10, marginTop: 3, alignSelf: 'flex-end', opacity: 0.75 },
});
