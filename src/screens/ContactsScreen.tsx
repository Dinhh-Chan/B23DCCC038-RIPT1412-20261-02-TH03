import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { normalize } from '../commons/utils';
import { ContactItem, ScreenHeader, SearchBar } from '../components';
import { useApp } from '../contexts/AppContext';
import { RootStackParamList } from '../navigation/types';

export default function ContactsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, users, openConversation } = useApp();
  const [query, setQuery] = useState('');

  const onlineCount = users.filter(u => u.online).length;
  const q = normalize(query);
  const data = users
    .filter(
      u =>
        !q ||
        normalize(u.name).includes(q) ||
        u.phone.replace(/\s/g, '').includes(q.replace(/\s/g, '')),
    )
    // Người đang online lên trước, sau đó sắp theo tên
    .sort(
      (a, b) =>
        Number(b.online) - Number(a.online) ||
        a.name.localeCompare(b.name, 'vi'),
    );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader
        title="Danh bạ"
        subtitle={`${users.length} liên hệ · ${onlineCount} đang hoạt động`}
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <ContactItem
            user={item}
            onPress={() =>
              navigation.navigate('Chat', {
                conversationId: openConversation(item.id),
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.subText }]}>
            Không tìm thấy liên hệ nào
          </Text>
        }
      />
    </View>
  );
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingBottom: 20 },
  separator: { height: 8 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 14 },
});
