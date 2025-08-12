import { Book, User, ChatSession } from '../types';

// 模拟书籍数据
export const mockBooks: Book[] = [
  {
    id: '1',
    title: '人工智能的未来',
    author: '李明华',
    category: 'technology',
    description: '深入探讨人工智能技术的发展趋势，以及对人类社会的深远影响。作者结合多年的研究经验，为读者展现了一个充满可能性的未来世界。',
    cover: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    publishYear: 2023,
    pages: 320,
    isbn: '978-7-111-12345-6',
    tags: ['人工智能', '未来科技', '社会影响'],
    authorBio: '李明华，清华大学计算机系教授，人工智能领域专家，发表论文200余篇。',
    tableOfContents: ['第一章：AI的历史回顾', '第二章：现代AI技术', '第三章：未来展望', '第四章：伦理考量']
  },
  {
    id: '2',
    title: '时间简史续编',
    author: '史蒂芬·霍金',
    category: 'science',
    description: '继《时间简史》之后，霍金教授继续为我们解读宇宙的奥秘，探讨黑洞、时间旅行和多维空间的可能性。',
    cover: 'https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    publishYear: 2022,
    pages: 280,
    isbn: '978-7-111-23456-7',
    tags: ['物理学', '宇宙学', '黑洞'],
    authorBio: '史蒂芬·霍金，剑桥大学理论物理学教授，现代宇宙学大师。',
    tableOfContents: ['第一章：黑洞的秘密', '第二章：时间的本质', '第三章：多重宇宙', '第四章：生命的意义']
  },
  {
    id: '3',
    title: '百年孤独新解',
    author: '加夫列尔·加西亚·马尔克斯',
    category: 'literature',
    description: '魔幻现实主义的巅峰之作，讲述了布恩迪亚家族七代人的传奇故事，反映了拉丁美洲的历史变迁。',
    cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    publishYear: 2021,
    pages: 450,
    isbn: '978-7-111-34567-8',
    tags: ['魔幻现实主义', '家族史', '拉美文学'],
    authorBio: '加西亚·马尔克斯，哥伦比亚作家，1982年诺贝尔文学奖获得者。',
    tableOfContents: ['第一章：创世纪', '第二章：繁荣与衰落', '第三章：爱与战争', '第四章：终结']
  },
  {
    id: '4',
    title: '商业思维革命',
    author: '彼得·德鲁克',
    category: 'business',
    description: '管理学大师德鲁克的最新思考，探讨数字时代企业管理的新范式和商业模式创新。',
    cover: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    publishYear: 2023,
    pages: 380,
    isbn: '978-7-111-45678-9',
    tags: ['管理学', '商业模式', '数字化转型'],
    authorBio: '彼得·德鲁克，现代管理学之父，著有《管理的实践》等经典著作。',
    tableOfContents: ['第一章：数字时代的管理', '第二章：创新驱动', '第三章：人才战略', '第四章：可持续发展']
  },
  {
    id: '5',
    title: '哲学的慰藉',
    author: '阿兰·德波顿',
    category: 'philosophy',
    description: '用通俗易懂的语言解释深奥的哲学思想，帮助读者在现代生活中找到智慧的指引。',
    cover: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    publishYear: 2022,
    pages: 320,
    isbn: '978-7-111-56789-0',
    tags: ['哲学', '生活智慧', '心理学'],
    authorBio: '阿兰·德波顿，瑞士裔英国哲学家和作家，擅长将哲学应用于日常生活。',
    tableOfContents: ['第一章：苏格拉底的智慧', '第二章：伊壁鸠鲁的快乐', '第三章：塞涅卡的坚韧', '第四章：蒙田的怀疑']
  },
  {
    id: '6',
    title: '中华五千年',
    author: '余秋雨',
    category: 'history',
    description: '从远古文明到现代社会，全景式展现中华民族的历史进程和文化传承。',
    cover: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    publishYear: 2021,
    pages: 520,
    isbn: '978-7-111-67890-1',
    tags: ['中国历史', '文化传承', '文明史'],
    authorBio: '余秋雨，著名文化学者，上海戏剧学院教授，代表作《文化苦旅》。',
    tableOfContents: ['第一章：文明的起源', '第二章：春秋战国', '第三章：盛世唐朝', '第四章：近现代变革']
  }
];

// 模拟用户数据
export const mockUser: User = {
  id: 'user1',
  username: '书虫小明',
  email: 'xiaoming@example.com',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
  favoriteBooks: ['1', '3', '5'],
  readingHistory: [
    {
      bookId: '1',
      startDate: new Date('2023-01-15'),
      lastReadDate: new Date('2023-02-10'),
      progress: 75,
      notes: [
        {
          id: 'note1',
          content: 'AI技术的发展确实令人震撼',
          page: 45,
          createdAt: new Date('2023-01-20'),
          bookId: '1'
        }
      ]
    }
  ],
  chatHistory: [],
  joinDate: new Date('2023-01-01')
};

// 模拟对话数据
export const mockChatSessions: ChatSession[] = [
  {
    id: 'chat1',
    bookId: '1',
    authorName: '李明华',
    title: '关于AI未来的讨论',
    messages: [
      {
        id: 'msg1',
        content: '您好，李教授！我对人工智能的伦理问题很感兴趣，您认为AI发展的边界在哪里？',
        sender: 'user',
        timestamp: new Date('2023-02-01T10:00:00'),
        bookId: '1',
        authorName: '李明华'
      },
      {
        id: 'msg2',
        content: '这是一个非常深刻的问题！AI的发展确实需要伦理约束。我认为，AI应该始终服务于人类福祉，而不是替代人类的判断。在我的书中，我强调了"人机协作"的重要性。AI可以处理复杂的数据分析，但最终的道德判断和价值选择应该由人类来做。',
        sender: 'author',
        timestamp: new Date('2023-02-01T10:02:00'),
        bookId: '1',
        authorName: '李明华',
        rating: 5
      }
    ],
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01')
  }
];

// 分类映射
export const categoryLabels = {
  literature: '文学',
  technology: '科技',
  history: '历史',
  science: '科学',
  philosophy: '哲学',
  biography: '传记',
  fiction: '小说',
  business: '商业'
};