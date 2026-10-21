# Bài thực hành 2 – Ứng dụng Chat (React Native)

## Chạy ứng dụng
```bash
npm install
npm start            # terminal 1: Metro
npm run android      # terminal 2: build & cài lên máy ảo/thiết bị
```

Tài khoản demo: **admin / 123456**

## Các màn hình
| Màn hình | File | Chức năng |
|---|---|---|
| Đăng nhập | `src/screens/LoginScreen.tsx` | Kiểm tra rỗng, sai tài khoản/mật khẩu, ẩn/hiện mật khẩu |
| Home (Tin nhắn) | `src/screens/HomeScreen.tsx` | Danh sách hội thoại, số tin chưa đọc, tìm kiếm (không dấu) |
| Chat | `src/screens/ChatScreen.tsx` | Xem & gửi tin nhắn, tự đánh dấu đã đọc |
| Danh bạ | `src/screens/ContactsScreen.tsx` | Trạng thái online, tìm theo tên/SĐT, mở hội thoại |
| Thông báo | `src/screens/NotificationsScreen.tsx` | Lọc, phân biệt đã đọc/chưa đọc, đánh dấu đã đọc (từng cái / tất cả) |
| Cài đặt | `src/screens/SettingsScreen.tsx` | Thông tin tài khoản, Switch thông báo & chế độ tối, đăng xuất |

## Cấu trúc
```
src/
  commons/      dữ liệu mẫu, theme (sáng/tối), tiện ích
  contexts/     AppContext – trạng thái đăng nhập, hội thoại, thông báo
  navigation/   Stack (Login / Main / Chat) + Bottom Tabs
  components/   Avatar, SearchBar, ScreenHeader, ConversationItem, ...
  screens/      các màn hình
screenshots/    ảnh chụp giao diện
```
