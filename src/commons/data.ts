export type User = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  phone: string;
};

export type Account = {
  username: string;
  password: string;
  name: string;
  studentId: string;
  email: string;
  phone: string;
  avatar: string;
};

export type Message = {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
};

export type Conversation = {
  id: string;
  userId: string;
  messages: Message[];
  unread: number;
};

export type AppNotification = {
  id: string;
  content: string;
  time: string;
  read: boolean;
};

const avatar = (n: number) => `https://i.pravatar.cc/150?img=${n}`;

// Tài khoản mẫu để đăng nhập
export const ACCOUNTS: Account[] = [
  {
    username: 'admin',
    password: '123456',
    name: 'Trần Đức Định',
    studentId: 'B23DCCC038',
    email: 'DinhTD.B23DCCC038@stu.ptit.edu.vn',
    phone: '0912 345 678',
    avatar: avatar(12),
  },
];

export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Nguyễn Văn An',
    avatar: avatar(3),
    online: true,
    phone: '0901 111 222',
  },
  {
    id: 'u2',
    name: 'Trần Thị Bích',
    avatar: avatar(5),
    online: false,
    phone: '0902 222 333',
  },
  {
    id: 'u3',
    name: 'Lê Hoàng Cường',
    avatar: avatar(8),
    online: true,
    phone: '0903 333 444',
  },
  {
    id: 'u4',
    name: 'Phạm Minh Dũng',
    avatar: avatar(11),
    online: false,
    phone: '0904 444 555',
  },
  {
    id: 'u5',
    name: 'Hoàng Thu Hà',
    avatar: avatar(9),
    online: true,
    phone: '0905 555 666',
  },
  {
    id: 'u6',
    name: 'Vũ Đức Huy',
    avatar: avatar(13),
    online: false,
    phone: '0906 666 777',
  },
  {
    id: 'u7',
    name: 'Đặng Ngọc Lan',
    avatar: avatar(16),
    online: true,
    phone: '0907 777 888',
  },
  {
    id: 'u8',
    name: 'Bùi Quang Minh',
    avatar: avatar(15),
    online: false,
    phone: '0908 888 999',
  },
  {
    id: 'u9',
    name: 'Đỗ Thanh Nga',
    avatar: avatar(20),
    online: true,
    phone: '0909 999 000',
  },
  {
    id: 'u10',
    name: 'Ngô Tiến Phát',
    avatar: avatar(33),
    online: false,
    phone: '0910 000 111',
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    userId: 'u1',
    unread: 2,
    messages: [
      {
        id: 'm1',
        text: 'Chào bạn, hôm nay rảnh không?',
        time: '09:10',
        fromMe: false,
      },
      {
        id: 'm2',
        text: 'Mình rảnh buổi chiều nhé',
        time: '09:12',
        fromMe: true,
      },
      {
        id: 'm3',
        text: 'Ok, chiều đi cà phê làm bài tập nhóm',
        time: '09:15',
        fromMe: false,
      },
      { id: 'm4', text: 'Nhớ mang laptop nha!', time: '09:16', fromMe: false },
    ],
  },
  {
    id: 'c2',
    userId: 'u2',
    unread: 0,
    messages: [
      {
        id: 'm1',
        text: 'Gửi mình slide môn Mobile với',
        time: '08:02',
        fromMe: false,
      },
      {
        id: 'm2',
        text: 'Mình gửi qua mail rồi đó',
        time: '08:30',
        fromMe: true,
      },
    ],
  },
  {
    id: 'c3',
    userId: 'u3',
    unread: 5,
    messages: [
      {
        id: 'm1',
        text: 'Tối nay đá bóng không?',
        time: 'Hôm qua',
        fromMe: false,
      },
      { id: 'm2', text: 'Sân cũ lúc 7h nhé', time: 'Hôm qua', fromMe: false },
    ],
  },
  {
    id: 'c4',
    userId: 'u5',
    unread: 0,
    messages: [
      {
        id: 'm1',
        text: 'Cảm ơn bạn nhiều nha 😊',
        time: 'Thứ 2',
        fromMe: false,
      },
      { id: 'm2', text: 'Không có gì đâu', time: 'Thứ 2', fromMe: true },
    ],
  },
  {
    id: 'c5',
    userId: 'u7',
    unread: 1,
    messages: [
      {
        id: 'm1',
        text: 'Deadline nộp báo cáo là thứ 6 đó',
        time: 'CN',
        fromMe: false,
      },
    ],
  },
  {
    id: 'c6',
    userId: 'u9',
    unread: 0,
    messages: [
      { id: 'm1', text: 'Hẹn gặp lại cuối tuần!', time: '18/10', fromMe: true },
    ],
  },
];

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    content: 'Nguyễn Văn An đã gửi cho bạn 2 tin nhắn mới.',
    time: '5 phút trước',
    read: false,
  },
  {
    id: 'n2',
    content: 'Lê Hoàng Cường đã thêm bạn vào nhóm "Đá bóng PTIT".',
    time: '1 giờ trước',
    read: false,
  },
  {
    id: 'n3',
    content: 'Đặng Ngọc Lan đã nhắc đến bạn trong một tin nhắn.',
    time: '3 giờ trước',
    read: false,
  },
  {
    id: 'n4',
    content: 'Trần Thị Bích đã chấp nhận lời mời kết bạn.',
    time: 'Hôm qua',
    read: true,
  },
  {
    id: 'n5',
    content: 'Tài khoản của bạn vừa đăng nhập trên thiết bị mới.',
    time: 'Hôm qua',
    read: true,
  },
  {
    id: 'n6',
    content: 'Hoàng Thu Hà đã cập nhật ảnh đại diện.',
    time: '2 ngày trước',
    read: true,
  },
  {
    id: 'n7',
    content: 'Chào mừng bạn đến với ChatApp! 🎉',
    time: '1 tuần trước',
    read: true,
  },
];
