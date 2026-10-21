import { Search, X } from 'lucide-react-native';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useApp } from '../../contexts/AppContext';
import { styles } from './styles';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
};

export default function SearchBar({ value, onChangeText, placeholder }: Props) {
  const { colors } = useApp();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <Search size={19} color={colors.subText} strokeWidth={2.2} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.subText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} hitSlop={8}>
          <X size={18} color={colors.subText} />
        </TouchableOpacity>
      )}
    </View>
  );
}
