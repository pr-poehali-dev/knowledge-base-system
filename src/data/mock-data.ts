import { Article, Category, User } from "@/types/knowledge-base";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Алексей Петров",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    role: "admin",
  },
  {
    id: "2",
    name: "Мария Иванова",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    role: "editor",
  },
];

export const mockCategories: Category[] = [
  {
    id: "favorites",
    name: "Избранное",
    icon: "Bookmark",
    emoji: "📌",
    articleCount: 5,
  },
  {
    id: "internet",
    name: "Интернет",
    icon: "Globe",
    emoji: "🌐",
    articleCount: 12,
    children: [
      {
        id: "adsl",
        name: "ADSL",
        icon: "Router",
        emoji: "📡",
        parentId: "internet",
        articleCount: 4,
      },
      {
        id: "ethernet",
        name: "Ethernet",
        icon: "Cable",
        emoji: "🔌",
        parentId: "internet",
        articleCount: 3,
      },
      {
        id: "gpon",
        name: "GPON",
        icon: "Zap",
        emoji: "⚡",
        parentId: "internet",
        articleCount: 5,
      },
    ],
  },
  {
    id: "tv",
    name: "Телевидение",
    icon: "Tv",
    emoji: "📺",
    articleCount: 8,
    children: [
      {
        id: "iptv",
        name: "IPTV",
        icon: "Play",
        emoji: "📱",
        parentId: "tv",
        articleCount: 5,
      },
      {
        id: "cable",
        name: "Кабельное",
        icon: "Radio",
        emoji: "📻",
        parentId: "tv",
        articleCount: 3,
      },
    ],
  },
  {
    id: "phone",
    name: "Телефония",
    icon: "Phone",
    emoji: "📞",
    articleCount: 6,
    children: [
      {
        id: "sip",
        name: "SIP",
        icon: "PhoneCall",
        emoji: "☎️",
        parentId: "phone",
        articleCount: 4,
      },
      {
        id: "copper",
        name: "Медь",
        icon: "Phone",
        emoji: "📞",
        parentId: "phone",
        articleCount: 2,
      },
    ],
  },
  {
    id: "instructions",
    name: "Инструкции",
    icon: "BookOpen",
    emoji: "🛠",
    articleCount: 15,
    children: [
      {
        id: "techcards",
        name: "Техкарты",
        icon: "FileText",
        emoji: "📋",
        parentId: "instructions",
        articleCount: 8,
      },
      {
        id: "setup",
        name: "Настройка",
        icon: "Settings",
        emoji: "⚙️",
        parentId: "instructions",
        articleCount: 7,
      },
    ],
  },
  {
    id: "faq",
    name: "FAQ",
    icon: "HelpCircle",
    emoji: "❓",
    articleCount: 20,
  },
  {
    id: "training",
    name: "Обучение",
    icon: "GraduationCap",
    emoji: "🎓",
    articleCount: 10,
  },
];

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Настройка GPON оборудования",
    content: `# Настройка GPON оборудования

## Введение
GPON (Gigabit Passive Optical Network) — это технология пассивных оптических сетей...

## Необходимое оборудование
- OLT (Optical Line Terminal)
- ONT (Optical Network Terminal)
- Оптический кабель
- Сплиттеры

## Пошаговая настройка

### 1. Подготовка OLT
\`\`\`bash
configure terminal
pon-olt-template T1
gem port 1 name test traffic-table index 1 upstream
exit
\`\`\`

### 2. Регистрация ONT
1. Получите серийный номер устройства
2. Добавьте устройство в базу OLT
3. Назначьте профиль услуг

## Диагностика
Для проверки связи используйте команды:
- show pon onu-state
- show interface pon-port status`,
    categoryId: "gpon",
    tags: ["gpon", "настройка", "оборудование"],
    author: "Алексей Петров",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    views: 156,
    isFavorite: true,
  },
  {
    id: "2",
    title: "Troubleshooting IPTV проблем",
    content: `# Решение проблем с IPTV

## Основные проблемы
1. Пропадание сигнала
2. Зависание изображения
3. Отсутствие звука
4. Медленное переключение каналов

## Диагностика сети
Проверьте качество сигнала и пропускную способность сети.`,
    categoryId: "iptv",
    tags: ["iptv", "диагностика", "troubleshooting"],
    author: "Мария Иванова",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    views: 89,
    isFavorite: false,
  },
  {
    id: "3",
    title: "Конфигурация SIP-телефонии",
    content: `# Настройка SIP-телефонии

## Основные параметры
- SIP Proxy Server
- Регистрация пользователей  
- Маршрутизация вызовов

## Настройка сервера
Конфигурационный файл sip.conf должен содержать основные параметры подключения.`,
    categoryId: "sip",
    tags: ["sip", "телефония", "конфигурация"],
    author: "Алексей Петров",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-15"),
    views: 203,
    isFavorite: true,
  },
];

export const mockRecentlyViewed: Article[] = mockArticles.slice(0, 3);
export const mockPopularArticles: Article[] = mockArticles
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);
