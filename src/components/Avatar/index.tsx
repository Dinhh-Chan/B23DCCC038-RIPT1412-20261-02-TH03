import { Image, View } from 'react-native';
import { useApp } from '../../contexts/AppContext';
import { styles } from './styles';

type Props = {
  uri: string;
  size?: number;
  online?: boolean; // undefined = không hiển thị chấm trạng thái
};

export default function Avatar({ uri, size = 52, online }: Props) {
  const { colors } = useApp();
  const dot = Math.round(size * 0.28);
  return (
    <View style={{ width: size, height: size }}>
      <Image
        source={{ uri }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
          { backgroundColor: colors.border },
        ]}
      />
      {online !== undefined && (
        <View
          style={[
            styles.dot,
            {
              width: dot,
              height: dot,
              borderRadius: dot / 2,
              borderColor: colors.card,
              backgroundColor: online ? colors.success : colors.offline,
            },
          ]}
        />
      )}
    </View>
  );
}
