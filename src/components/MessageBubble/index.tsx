import { Text, View } from 'react-native';
import { Message } from '../../commons/data';
import { useApp } from '../../contexts/AppContext';
import { styles } from './styles';

export default function MessageBubble({ message }: { message: Message }) {
  const { colors } = useApp();
  const mine = message.fromMe;
  return (
    <View style={[styles.row, mine ? styles.rowMine : styles.rowOther]}>
      <View
        style={[
          styles.bubble,
          mine
            ? [styles.bubbleMine, { backgroundColor: colors.primary }]
            : [
                styles.bubbleOther,
                {
                  backgroundColor: colors.bubbleOther,
                  borderColor: colors.border,
                },
              ],
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: mine ? colors.onPrimary : colors.text },
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[
            styles.time,
            { color: mine ? colors.onPrimary : colors.subText },
          ]}
        >
          {message.time}
        </Text>
      </View>
    </View>
  );
}
