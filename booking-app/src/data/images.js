// 图片资源 —— Unsplash 公开 CDN URL
// 每张图都按主题挑选，菜名尽量对应图内容
// 如需替换：把同主题的图放到 public/images/ 并改成 '/images/xxx.jpg'

const U = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

// 经过整理的 Unsplash 图片库（按主题）
export const IMG = {
  // 餐厅封面（高级餐厅环境）
  rest: {
    yongfuhui: U('1414235077428-338989a2e8c0', 800),   // 暖色调高级餐厅
    yuzhilan:  U('1517248135467-4c7edcad34c4', 800),   // 餐厅暖光
    ultra:     U('1559339352-11d035aa65de', 800),      // 高级餐厅
    xinrong:   U('1592861956120-e524fc739696', 800),   // 中餐厅
    bund:      U('1551218372-a8789b81b253', 800),      // 外滩 / 法餐
    bistro:    U('1572116469696-31de0f17cc34', 800),   // 酒吧
  },

  // Banner / 城市夜景
  banner: {
    shanghai_night: U('1545558014-8692077e9b5c', 1200),
    chinese_dining: U('1466637574441-749b8f19452f', 1200),
    elegant_table:  U('1592861956120-e524fc739696', 1200),
    luxe_dining:    U('1414235077428-338989a2e8c0', 1200),  // 高级餐厅大图（用于首页主 Banner，做景深）
  },

  // 环境 / 大厅
  env: {
    hall_1:   U('1517248135467-4c7edcad34c4'),
    hall_2:   U('1559339352-11d035aa65de'),
    hall_3:   U('1555396273-367ea4eb4db5'),
    hall_4:   U('1466637574441-749b8f19452f'),
    door:     U('1414235077428-338989a2e8c0'),
    night:    U('1545558014-8692077e9b5c'),
    bund:     U('1518391846015-55a9cc003b25'),
    bar:      U('1572116469696-31de0f17cc34'),
    facade:   U('1552566626-52f8b828add9'),
  },

  // 包间
  room: {
    room_1: U('1592861956120-e524fc739696'),
    room_2: U('1552566626-52f8b828add9'),
    room_3: U('1554118811-1e0d58224f24'),
    room_4: U('1559339352-11d035aa65de'),
    room_5: U('1555396273-367ea4eb4db5'),
  },

  // 招牌菜 —— 按菜名匹配
  dish: {
    // 鱼
    fish_steamed:   U('1535140728325-a4d3707eee94'),   // 蒸鱼 → 葱油东星斑
    fish_whole:     U('1611599537845-1c7aca0091c0'),   // 整鱼 → 家烧大黄鱼
    fish_noodle:    U('1612927601601-6638404737ce'),   // 面食 → 黄鱼面
    // 红烧 / 肉
    pork_braised:   U('1547573854-74d2a71d0826'),      // 红烧肉/狮子头
    pork_glazed:    U('1551183053-bf91a1d81141'),      // 蜜汁火方
    beef_red:       U('1546964124-0cce460f38ef'),      // 红酒煨牛尾
    pot_meat:       U('1559054663-e8d23213f55c'),      // 坛子肉
    // 海鲜
    crab_jelly:     U('1559561853-08451507cbe7'),      // 蟹肉冻
    seafood_plate:  U('1574484184081-afea8a62f9c8'),   // 蟹/生蚝
    // 豆腐 / 汤
    tofu_mapo:      U('1582719471384-894fbb16e074'),   // 麻婆豆腐
    soup_clear:     U('1547308283-9347ac4cabb6'),      // 清汤 → 开水白菜
    soup_chicken:   U('1604908554049-29f7e7d99a8d'),   // 鸡豆花
    soup_red:       U('1614507017488-d31ec5a48c4f'),   // 罗宋汤
    // 主食 / 点心
    xiaolong:       U('1496116218417-1a781b1c416c'),   // 小笼
    dumpling:       U('1567620905732-2d1ec7ab7445'),   // 饺子
    sand_noodle:    U('1569718212165-3a8278d5f624'),   // 面食 → 沙蒜豆面
    // 西餐 / 法餐
    foie_gras:      U('1559847844-d721426d6edc'),      // 鹅肝
    tasting:        U('1546069901-ba9599a7e63c'),      // Tasting Menu 摆盘
    wine_pair:      U('1551024601-bec78aea704b'),      // 红酒
    // 其他
    chicken_dish:   U('1569058242253-92a9c755a0ec'),   // 鸡肉
  },

  // 主题 / 场景
  scene: {
    biz:     U('1592861956120-e524fc739696'),
    family:  U('1414235077428-338989a2e8c0'),
    friends: U('1559339352-11d035aa65de'),
    date:    U('1546069901-ba9599a7e63c'),
  },

  // 主题集合
  theme: {
    bund_night:    U('1545558014-8692077e9b5c', 1000),
    private_room:  U('1592861956120-e524fc739696', 1000),
    quiet_diner:   U('1559339352-11d035aa65de', 1000),
    rooftop:       U('1414235077428-338989a2e8c0', 1000),
    chefs_table:   U('1466637574441-749b8f19452f', 1000),
    michelin:      U('1551218372-a8789b81b253', 1000),
  },

  // 头像
  avatar: {
    flora:  U('1494790108377-be9c29b29330', 200),
    user_a: U('1535713875002-d1d0cf377fde', 200),
    user_b: U('1438761681033-6461ffad8d80', 200),
    user_c: U('1500648767791-00dcc994a43e', 200),
  },
}

// 给 mock 中字符串 key 提供回退映射
export const FALLBACK_IMG = {
  night: IMG.env.night,
  warm:  IMG.rest.yuzhilan,
  dish:  IMG.dish.fish_steamed,
  room:  IMG.room.room_1,
  gold:  IMG.banner.shanghai_night,
}
