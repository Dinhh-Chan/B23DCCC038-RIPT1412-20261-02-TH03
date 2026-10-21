import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import {
  Account,
  ACCOUNTS,
  AppNotification,
  Conversation,
  CONVERSATIONS,
  NOTIFICATIONS,
  User,
  USERS,
} from '../commons/data';
import { Colors, darkColors, lightColors } from '../commons/theme';
import { nowTime } from '../commons/utils';

type AppContextValue = {
  account: Account | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;

  users: User[];
  getUser: (id: string) => User | undefined;

  conversations: Conversation[];
  openConversation: (userId: string) => string; // trả về id cuộc trò chuyện
  markConversationRead: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;

  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (v: boolean) => void;
  colors: Colors;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [conversations, setConversations] =
    useState<Conversation[]>(CONVERSATIONS);
  const [notifications, setNotifications] =
    useState<AppNotification[]>(NOTIFICATIONS);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const value = useMemo<AppContextValue>(() => {
    const login = (username: string, password: string) => {
      const found = ACCOUNTS.find(
        a => a.username === username.trim() && a.password === password,
      );
      if (found) setAccount(found);
      return !!found;
    };

    const openConversation = (userId: string) => {
      const existing = conversations.find(c => c.userId === userId);
      if (existing) return existing.id;
      const id = `c_${userId}`;
      setConversations(prev => [
        { id, userId, unread: 0, messages: [] },
        ...prev,
      ]);
      return id;
    };

    const markConversationRead = (id: string) =>
      setConversations(prev =>
        prev.map(c => (c.id === id && c.unread > 0 ? { ...c, unread: 0 } : c)),
      );

    const sendMessage = (conversationId: string, text: string) => {
      setConversations(prev => {
        const target = prev.find(c => c.id === conversationId);
        if (!target) return prev;
        const updated: Conversation = {
          ...target,
          messages: [
            ...target.messages,
            { id: `m${Date.now()}`, text, time: nowTime(), fromMe: true },
          ],
        };
        // Đưa cuộc trò chuyện vừa nhắn lên đầu danh sách
        return [updated, ...prev.filter(c => c.id !== conversationId)];
      });
    };

    return {
      account,
      login,
      logout: () => setAccount(null),
      users: USERS,
      getUser: id => USERS.find(u => u.id === id),
      conversations,
      openConversation,
      markConversationRead,
      sendMessage,
      notifications,
      markNotificationRead: id =>
        setNotifications(prev =>
          prev.map(n => (n.id === id ? { ...n, read: true } : n)),
        ),
      markAllNotificationsRead: () =>
        setNotifications(prev => prev.map(n => ({ ...n, read: true }))),
      darkMode,
      setDarkMode,
      notificationsEnabled,
      setNotificationsEnabled,
      colors: darkMode ? darkColors : lightColors,
    };
  }, [account, conversations, notifications, darkMode, notificationsEnabled]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp phải được dùng bên trong AppProvider');
  return ctx;
}
