import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../contexts/AppContext';
import { styles } from './styles';

type Props = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
};

export default function ScreenHeader({ title, subtitle, right }: Props) {
  const { colors } = useApp();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.texts}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {!!subtitle && (
          <Text style={[styles.subtitle, { color: colors.subText }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {right}
    </View>
  );
}
