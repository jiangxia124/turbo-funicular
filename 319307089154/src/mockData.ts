// 模拟数据
// 当前日期：2025-11-01
// 美食节日期：2025-12-04

// 资金筹集规划数据 - 零资金启动方案
export const fundraisingPlanData = {
  // 众筹方案设计
  plans: [
    {
      id: 1,
      name: '校内师生小额众筹',
      targetAudience: '贵州大学全体师生',
      description: '面向校内师生的小额众筹计划，设置多个参与档位，降低参与门槛',
      tiers: [
        { amount: 10, reward: '美食节体验券1张 + 纪念徽章' },
        { amount: 20, reward: '美食节体验券2张 + 纪念T恤' },
        { amount: 30, reward: '美食节体验券3张 + 定制纪念品' },
        { amount: 50, reward: '美食节VIP体验券1张 + 全套纪念品' }
      ],
      expectedRaise: 30000,
      strategy: '利用校园广播、公众号、班级通知等渠道宣传，在食堂、宿舍区设置线下宣传点'
    },
    {
      id: 2,
      name: '周边商家赞助合作',
      targetAudience: '贵州大学周边餐饮及相关商家',
      description: '邀请周边商家以不同形式参与赞助，获取品牌曝光和商业机会',
      tiers: [
        { amount: 2000, reward: '标准展位1个 + 活动宣传物料展示' },
        { amount: 5000, reward: '优质展位1个 + 活动独家合作商资格' },
        { amount: 10000, reward: '黄金展位1个 + 活动冠名权 + 线上线下全方位宣传' }
      ],
      expectedRaise: 40000,
      strategy: '制定详细的赞助方案，突出商家权益和品牌曝光价值，上门拜访重点商家'
    },
    {
      id: 3,
      name: '校友情怀捐赠计划',
      targetAudience: '贵州大学校友',
      description: '面向广大校友发起的情怀捐赠计划，唤起校友对母校的情感共鸣',
      tiers: [
        { amount: 100, reward: '校友纪念卡 + 活动电子纪念册' },
        { amount: 500, reward: '校友荣誉墙展示 + 优先参与权' },
        { amount: 1000, reward: '校友年度活动通行证 + 专属纪念品' }
      ],
      expectedRaise: 20000,
      strategy: '通过校友会、校友群、校友公众号等渠道宣传，强调活动的文化传承意义'
    },
    {
      id: 4,
      name: '线上线下结合筹款',
      targetAudience: '社会各界爱心人士',
      description: '结合线上平台和线下活动，扩大筹款范围和影响力',
      tiers: [
        { amount: 50, reward: '电子感谢卡 + 活动直播权限' },
        { amount: 100, reward: '定制纪念品 + 活动照片集' },
        { amount: 200, reward: 'VIP线上互动 + 线下体验优先权' }
      ],
      expectedRaise: 10000,
      strategy: '利用社交媒体、众筹平台进行线上宣传，同时组织线下路演和推广活动'
    }
  ],
  
  // 资源盘点与整合
  resources: [
    {
      category: '校方支持',
      items: [
        { name: '场地提供', description: '争取学校免费提供体育馆或操场作为活动场地' },
        { name: '宣传渠道', description: '利用学校官方公众号、广播台、校内LED屏等宣传资源' },
        { name: '物资支持', description: '申请学校提供桌椅、音响设备等基础物资' }
      ]
    },
    {
      category: '学生组织协作',
      items: [
        { name: '学生会合作', description: '与学生会合作，利用其组织资源和影响力' },
        { name: '社团联合宣传', description: '联合各学生社团进行活动宣传和推广' },
        { name: '志愿者招募', description: '招募学生志愿者参与活动组织和执行' }
      ]
    },
    {
      category: '闲置资源盘活',
      items: [
        { name: '旧物置换', description: '组织旧物置换活动，筹集活动物资' },
        { name: '技能交换', description: '组织有特长的学生以技能换取活动参与机会' },
        { name: '校企合作', description: '与企业合作，获取闲置设备和物资支持' }
      ]
    }
  ],
  
  // 分阶段执行计划
  timeline: [
    {
      phase: '前期预热阶段',
      period: '0-15天',
      goals: [
        '完成众筹方案设计和物料准备',
        '建立线上众筹平台和宣传渠道',
        '启动校内宣传，招募志愿者团队',
        '联系首批合作商家和校友代表'
      ],
      keyActivities: [
        '召开动员大会，组建核心团队',
        '设计并制作宣传物料和众筹页面',
        '在校内开展预热宣传活动',
        '拜访重点商家和校友'
      ],
      targetRaise: 10000
    },
    {
      phase: '集中筹款阶段',
      period: '16-30天',
      goals: [
        '全面启动线上线下众筹活动',
        '完成80%的筹款目标',
        '确定所有合作商家和赞助方',
        '扩大活动影响力和参与度'
      ],
      keyActivities: [
        '举办线下路演和推广活动',
        '开展社交媒体宣传和互动活动',
        '组织校友专场宣传活动',
        '推出限时优惠和特别奖励'
      ],
      targetRaise: 80000
    },
    {
      phase: '收尾阶段',
      period: '31-40天',
      goals: [
        '完成所有筹款目标',
        '确认所有资金和物资到位',
        '整理和确认支持者信息',
        '准备活动执行细节'
      ],
      keyActivities: [
        '开展最后冲刺宣传活动',
        '确认所有赞助和合作细节',
        '统计和整理筹款数据',
        '准备回报发放计划'
      ],
      targetRaise: 10000
    }
  ],
  
  // 风险预案与备选方案
  riskPlans: [
    {
      scenario: '筹款不足50%',
      plan: '活动规模动态调整',
      measures: [
        '缩减活动场地和参与人数',
        '减少活动环节和演出内容',
        '降低物资采购标准和数量',
        '优化人员配置，增加志愿者比例'
      ]
    },
    {
      scenario: '筹款达到50%-80%',
      plan: '低成本替代方案',
      measures: [
        '寻找更多免费或低成本场地',
        '增加校企合作，获取物资赞助',
        '简化活动流程，提高执行效率',
        '调整活动内容，突出核心价值'
      ]
    },
    {
      scenario: '筹款达到80%-100%',
      plan: '多方合作资源再开发',
      measures: [
        '拓展更多合作渠道和赞助机会',
        '增加活动亮点和特色内容',
        '提升参与者体验和回报价值',
        '为下一届活动积累资源和经验'
      ]
    }
  ]
};

// 众筹目标金额和进度
export const crowdfundingData = {
  totalTarget: 100000, // 总目标金额10万元
  currentAmount: 0, // 当前已筹金额 - 尚未筹资到钱
  deadline: new Date('2025-12-01T23:59:59'), // 截止日期（美食节前3天截止）
  stages: [
    { name: '种子轮', target: 20000, current: 0, description: '面向校内社团与学生会' },
    { name: '成长轮', target: 50000, current: 0, description: '面向全校师生' },
    { name: '扩展轮', target: 30000, current: 0, description: '面向校友与周边社区' }
  ],
  costBreakdown: [
    { name: '场地租赁与布置', percentage: 30 },
    { name: '食材采购', percentage: 25 },
    { name: '宣传推广', percentage: 15 },
    { name: '人力成本', percentage: 15 },
    { name: '应急储备金', percentage: 15 }
  ],
  timelineData: [
    { date: '2025-11-01', amount: 0 },
    { date: '2025-11-10', amount: 0, isPredicted: true },
    { date: '2025-11-20', amount: 0, isPredicted: true },
    { date: '2025-11-30', amount: 0, isPredicted: true },
    { date: '2025-12-01', amount: 0, isPredicted: true }
  ],
  healthMetrics: {
    participationRate: 0, // 参与率0%
    avgInvestment: 0, // 平均投资金额0元
    viralCoefficient: 0 // 传播系数0
  }
};

// 美食项目数据 - 双轨制项目体系
export const foodProjects = [
  // 稳健型项目 (60%资金) - 传统美食摊位，低风险固定回报模式
  {
    id: 1,
    name: '贵州特色小吃集合',
    type: '稳健型',
    description: '汇集贵州各地特色小吃，展示贵州饮食文化',
    targetAmount: 30000,
    currentAmount: 0, // 尚未筹资到钱
    deadline: new Date('2025-11-25T23:59:59'), // 美食节前10天截止
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Guizhou%20local%20snacks%2C%20colorful%20street%20food%2C%20spicy%20dishes%2C%20traditional%20Chinese%20food%20festival&sign=56647430f5399f59b1e2e5d4a702ed48',
    story: '贵州小吃是贵州饮食文化的重要组成部分，种类繁多，风味独特。本项目旨在将贵州各地的特色小吃汇集一堂，让更多人了解和喜爱贵州美食。目前我们正在积极筹备中，期待您的支持！',
    fundUsage: [
      { name: '食材采购', amount: 12000 },
      { name: '摊位租赁', amount: 8000 },
      { name: '人员成本', amount: 5000 },
      { name: '设备租赁', amount: 3000 },
      { name: '其他费用', amount: 2000 }
    ],
    risks: [
      { type: '市场风险', description: '市场需求不确定', measure: '提前进行市场调研，根据反馈调整菜单' },
      { type: '运营风险', description: '人员不足', measure: '提前招募和培训志愿者' },
      { type: '财务风险', description: '成本超支', measure: '严格控制预算，建立成本预警机制' }
    ],
    riskLevel: '低',
    expectedReturn: '固定回报10%'
  },
  {
    id: 2,
    name: '少数民族美食体验',
    type: '稳健型',
    description: '体验贵州少数民族特色美食，感受民族文化魅力',
    targetAmount: 25000,
    currentAmount: 0, // 尚未筹资到钱
    deadline: new Date('2025-11-25T23:59:59'), // 美食节前10天截止
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Ethnic%20minority%20food%20in%20Guizhou%2C%20traditional%20cooking%20methods%2C%20colorful%20cultural%20experience%2C%20food%20festival&sign=1164b3e5281df68afbde6867abab891d',
    story: '贵州是多民族聚居的省份，各民族都有自己独特的饮食文化。本项目邀请少数民族厨师现场制作传统美食，让参与者在品尝美食的同时，了解少数民族文化。目前项目处于初期筹备阶段，急需资金支持。',
    fundUsage: [
      { name: '食材采购', amount: 10000 },
      { name: '民族文化展示', amount: 6000 },
      { name: '厨师邀请', amount: 5000 },
      { name: '设备租赁', amount: 2500 },
      { name: '其他费用', amount: 1500 }
    ],
    risks: [
      { type: '市场风险', description: '对民族美食认知度低', measure: '加强宣传，提供试吃活动' },
      { type: '运营风险', description: '文化展示环节协调', measure: '提前与民族文化专家沟通' },
      { type: '财务风险', description: '特色食材成本高', measure: '寻找本地供应商，提前锁定价格' }
    ],
    riskLevel: '低',
    expectedReturn: '固定回报12%'
  },
  {
    id: 5,
    name: '经典黔菜传承',
    type: '稳健型',
    description: '展示贵州传统名菜，传承经典烹饪技艺',
    targetAmount: 20000,
    currentAmount: 0, // 尚未筹资到钱
    deadline: new Date('2025-11-26T23:59:59'), // 美食节前9天截止
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Traditional%20Guizhou%20cuisine%2C%20classic%20dishes%2C%20culinary%20art%2C%20food%20festival&sign=7c54b5432c22f8caa6c7d58ac2a779d6',
    story: '黔菜是贵州饮食文化的瑰宝，具有鲜明的地方特色。本项目邀请资深黔菜厨师，现场展示经典黔菜的制作过程，让参与者品尝正宗黔菜，了解黔菜文化。目前正在联系厨师团队，确定菜品清单。',
    fundUsage: [
      { name: '食材采购', amount: 8000 },
      { name: '厨师邀请', amount: 6000 },
      { name: '场地布置', amount: 3000 },
      { name: '设备租赁', amount: 2000 },
      { name: '其他费用', amount: 1000 }
    ],
    risks: [
      { type: '市场风险', description: '口味接受度', measure: '选择大众接受度高的经典菜品' },
      { type: '运营风险', description: '食材新鲜度', measure: '建立严格的食材采购和存储标准' },
      { type: '财务风险', description: '成本控制', measure: '制定详细的成本预算和控制方案' }
    ],
    riskLevel: '低',
    expectedReturn: '固定回报11%'
  },
  {
    id: 6,
    name: '校园美食回忆',
    type: '稳健型',
    description: '重现校园经典美食，唤起青春回忆',
    targetAmount: 15000,
    currentAmount: 0, // 尚未筹资到钱
    deadline: new Date('2025-11-27T23:59:59'), // 美食节前8天截止
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Campus%20food%2C%20student%20canteen%20memories%2C%20nostalgic%20food%20festival&sign=fc90a0a2670cf2bb8229ae954f33061d',
    story: '校园美食承载着无数人的青春回忆。本项目邀请学校食堂的资深厨师，重现那些令人难忘的校园美食，让校友和在校生共同回味青春时光。目前正在收集校园美食回忆，确定菜品列表。',
    fundUsage: [
      { name: '食材采购', amount: 6000 },
      { name: '厨师邀请', amount: 4000 },
      { name: '宣传推广', amount: 3000 },
      { name: '设备租赁', amount: 1000 },
      { name: '其他费用', amount: 1000 }
    ],
    risks: [
      { type: '市场风险', description: '期望与现实差距', measure: '提前收集意见，确保菜品质量' },
      { type: '运营风险', description: '排队时间过长', measure: '增加服务窗口，优化流程' },
      { type: '财务风险', description: '客流量不稳定', measure: '制定灵活的采购和生产计划' }
    ],
    riskLevel: '低',
    expectedReturn: '固定回报9%'
  },
  
  // 创新型项目 (40%资金) - 创意融合美食，高风险高回报模式
  {
    id: 3,
    name: '创新美食研发',
    type: '创新型',
    description: '鼓励学生创新研发新型美食，培养创业精神',
    targetAmount: 20000,
    currentAmount: 0, // 尚未筹资到钱
    deadline: new Date('2025-11-20T23:59:59'), // 美食节前15天截止
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Food%20innovation%20research%20and%20development%2C%20chef%20creating%20new%20dishes%2C%20culinary%20experiment%2C%20food%20festival&sign=61f62254f8696c261d48a1cce182a5b6',
    story: '本项目鼓励学生团队创新研发新型美食，提供平台让学生展示创意和烹饪技能，同时培养学生的创业意识和团队合作精神。优秀项目将获得创业扶持。目前我们正在招募学生团队，准备相关设备。',
    fundUsage: [
      { name: '研发资金', amount: 8000 },
      { name: '比赛奖金', amount: 6000 },
      { name: '设备采购', amount: 4000 },
      { name: '宣传费用', amount: 1000 },
      { name: '其他费用', amount: 1000 }
    ],
    risks: [
      { type: '市场风险', description: '创新美食接受度', measure: '举办试吃活动，收集反馈' },
      { type: '运营风险', description: '比赛组织复杂度', measure: '建立专业评审团队，明确规则' },
      { type: '财务风险', description: '研发成本超支', measure: '设定研发预算上限，定期评估' }
    ],
    riskLevel: '高',
    expectedReturn: '浮动回报15%-25%'
  },
  {
    id: 4,
    name: '美食文化论坛',
    type: '创新型',
    description: '举办美食文化论坛，探讨美食与文化的关系',
    targetAmount: 15000,
    currentAmount: 0, // 尚未筹资到钱
    deadline: new Date('2025-11-28T23:59:59'), // 美食节前7天截止
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Food%20culture%20forum%2C%20experts%20discussing%20cuisine%20heritage%2C%20academic%20exchange%2C%20food%20festival&sign=a190d83c61d47156e5d22e715106fc10',
    story: '美食不仅仅是味觉的享受，更是文化的载体。本项目邀请美食专家、文化学者举办论坛，探讨美食与文化、美食与健康等话题，提升美食节的文化内涵。目前正在联系相关专家，确定论坛主题。',
    fundUsage: [
      { name: '专家邀请', amount: 6000 },
      { name: '场地布置', amount: 4000 },
      { name: '宣传推广', amount: 3000 },
      { name: '资料印刷', amount: 1000 },
      { name: '其他费用', amount: 1000 }
    ],
    risks: [
      { type: '市场风险', description: '论坛参与度', measure: '选择热门话题，邀请知名专家' },
      { type: '运营风险', description: '专家时间协调', measure: '提前与专家沟通，确认时间' },
      { type: '财务风险', description: '专家费用超支', measure: '设定费用预算，寻找本地专家' }
    ],
    riskLevel: '高',
    expectedReturn: '浮动回报12%-20%'
  },
  {
    id: 7,
    name: '国际美食融合',
    type: '创新型',
    description: '将贵州特色与国际美食融合，创造全新味觉体验',
    targetAmount: 20000,
    currentAmount: 0, // 尚未筹资到钱
    deadline: new Date('2025-11-24T23:59:59'), // 美食节前11天截止
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=International%20food%20fusion%2C%20creative%20cuisine%20combination%2C%20global%20flavors%20mixed%20with%20local%20taste&sign=f4cfdc6c6e7eb9b819d80d4ad066d6e3',
    story: '在全球化的背景下，美食也在不断融合创新。本项目邀请国际料理厨师与贵州本地厨师合作，将贵州特色食材和烹饪技法与国际美食相融合，创造出全新的味觉体验。目前正在确定合作厨师和创意菜品。',
    fundUsage: [
      { name: '厨师邀请', amount: 8000 },
      { name: '食材采购', amount: 6000 },
      { name: '研发成本', amount: 3000 },
      { name: '宣传推广', amount: 2000 },
      { name: '其他费用', amount: 1000 }
    ],
    risks: [
      { type: '市场风险', description: '口味接受度', measure: '提前进行市场测试，收集反馈' },
      { type: '运营风险', description: '跨文化合作', measure: '建立有效的沟通机制，明确分工' },
      { type: '财务风险', description: '成本控制', measure: '制定详细的预算，严格控制支出' }
    ],
    riskLevel: '高',
    expectedReturn: '浮动回报18%-30%'
  }
];

// 投资回报方案 - 详细版
export const returnTiers = [
  {
    amount: 80,
    rewards: [
      '价值100元的美食节通用券',
      '美食节纪念徽章一枚',
      '电子纪念证书'
    ],
    foodCouponValue: 100,
    priorityExperience: '普通体验',
    souvenir: '纪念徽章'
  },
  {
    amount: 200,
    rewards: [
      '价值250元的美食节通用券',
      'VIP体验资格（提前入场1小时）',
      '美食节定制T恤一件',
      '与厨师交流机会'
    ],
    foodCouponValue: 250,
    priorityExperience: '提前入场1小时',
    souvenir: '定制T恤'
  },
  {
    amount: 500,
    rewards: [
      '价值650元的美食节通用券',
      '超级VIP体验（专属休息区）',
      '美食节定制礼盒',
      '项目冠名权（可选）',
      '优先参与后续活动'
    ],
    foodCouponValue: 650,
    priorityExperience: '专属休息区',
    souvenir: '定制礼盒'
  },
  {
    amount: 1000,
    rewards: [
      '价值1300元的美食节通用券',
      '顶级VIP体验（专属服务）',
      '美食节限量版纪念品套装',
      '重要项目冠名权',
      '与主办方共同策划下一界活动'
    ],
    foodCouponValue: 1300,
    priorityExperience: '专属服务',
    souvenir: '限量版纪念品套装'
  }
];

// FAQ数据
export const faqData = [
  {
    question: '众筹参与资格与流程说明',
    answer: '所有贵州大学师生、校友以及关注贵州大学的社会人士均可参与众筹。参与流程：1. 浏览项目详情；2. 选择支持金额；3. 填写个人信息；4. 完成支付；5. 等待回报兑现。'
  },
  {
    question: '资金安全保障措施详解',
    answer: '我们采取多重措施保障资金安全：1. 所有资金进入学校专用账户；2. 定期公开资金使用情况；3. 成立监督委员会；4. 与第三方支付平台合作，确保交易安全。'
  },
  {
    question: '回报兑现机制与时间表',
    answer: '众筹成功后，我们将按照以下时间表兑现回报：1. 美食节开始前一周发放电子凭证；2. 美食节现场发放实物回报；3. 特殊回报（如冠名权）在活动期间落实。'
  },
  {
    question: '退款政策与条件说明',
    answer: '在众筹结束前，支持者可以申请全额退款。众筹成功后，如因不可抗力导致活动取消，将全额退款；如活动正常举办，原则上不予退款，但可以转让支持权益。'
  },
  {
    question: '税务相关问题解答',
    answer: '所有众筹金额均为税前金额，如涉及个人所得税，由支持者自行承担。我们将提供正规收据，用于相关税务处理。'
  }
];

// 风险评估数据 - 包含三级风险防控体系
export const riskAssessmentData = {
  market: {
    description: '市场需求不确定，参与人数可能低于预期',
    measures: [
      '提前进行市场调研，了解潜在参与者需求',
      '加大宣传力度，覆盖更多目标人群',
      '灵活调整活动内容，根据反馈及时优化'
    ]
  },
  operation: {
    description: '活动组织复杂度高，可能出现协调问题',
    measures: [
      '成立专门的执行团队，明确分工',
      '制定详细的活动流程和应急预案',
      '提前进行演练，确保各环节衔接顺畅'
    ]
  },
  financial: {
    description: '成本控制难度大，可能出现超支风险',
    measures: [
      '制定详细的预算计划，严格控制支出',
      '建立成本预警机制，定期评估财务状况',
      '寻找赞助商合作，降低资金压力'
    ]
  }
};

// 三级风险防控体系
export const riskControlSystem = [
  {
    level: '一级防控',
    name: '项目筛选机制',
    description: '建立严格的项目筛选标准和流程，确保所有项目具备可行性和盈利能力',
    measures: [
      '制定详细的项目评估指标体系',
      '组建专业评审委员会',
      '进行项目可行性研究',
      '建立项目淘汰机制'
    ]
  },
  {
    level: '二级防控',
    name: '资金监管流程',
    description: '实施严格的资金监管措施，确保资金安全和合理使用',
    measures: [
      '设立专用账户，专款专用',
      '制定详细的资金使用计划',
      '建立资金使用审批制度',
      '定期公开资金使用情况',
      '引入第三方审计机构'
    ]
  },
  {
    level: '三级防控',
    name: '应急预案设计',
    description: '针对可能出现的风险，制定全面的应急预案',
    measures: [
      '识别潜在风险点',
      '制定详细的应急处置流程',
      '建立应急响应机制',
      '定期进行应急演练',
      '准备应急资金储备'
    ]
  }
];

// 成功案例数据
export const successCasesData = [
  {
    name: '北京大学美食节',
    year: '2024',
    target: 80000,
    raised: 95000,
    completionRate: 118.75,
    roi: 22.5
  },
  {
    name: '清华大学文化节',
    year: '2024',
    target: 120000,
    raised: 138000,
    completionRate: 115,
    roi: 18.3
  },
  {
    name: '复旦大学艺术节',
    year: '2023',
    target: 90000,
    raised: 102000,
    completionRate: 113.33,
    roi: 20.1
  },
  {
    name: '浙江大学科技展',
    year: '2023',
    target: 150000,
    raised: 178000,
    completionRate: 118.67,
    roi: 25.2
  }
];

// 金融知识小课堂数据
export const financialKnowledgeData = [
  {
    term: '众筹',
    definition: '众筹是指通过互联网平台向公众募集资金，用于支持各种创业项目或活动的一种融资方式。'
  },
  {
    term: '风险投资',
    definition: '风险投资是指向初创企业提供资金支持并取得该公司股份的一种融资方式。'
  },
  {
    term: 'ROI',
    definition: 'ROI（Return on Investment）即投资回报率，是指投资收益与投资成本的比率，用于评估投资效益。'
  },
  {
    term: '现金流',
    definition: '现金流是指企业在一定会计期间按照现金收付实现制，通过一定经济活动（包括经营活动、投资活动、筹资活动和非经常性项目）而产生的现金流入、现金流出及其总量情况的总称。'
  },
  {
    term: '风险评估',
    definition: '风险评估是指在风险事件发生之前或之后（但还没有结束），该事件给人们的生活、生命、财产等各个方面造成的影响和损失的可能性进行量化评估的工作。'
  }
];

// 支持者名单数据
export const supportersData = [
  // 尚未有支持者
];

// 金融服务中心数据
export const financialServicesData = [
  {
    name: '微型信贷支持',
    description: '为美食摊主提供小额融资方案，帮助解决资金周转问题',
    details: '提供最高5000元的小额信贷，期限3个月，年利率6%，无需抵押担保，仅需提供经营计划和身份证明。'
  },
  {
    name: '预售与预订系统',
    description: '帮助摊主提前锁定未来收入流，降低经营风险',
    details: '建立线上预售平台，顾客可以提前购买美食券或预订特色美食，摊主可以根据预售情况安排生产和采购。'
  },
  {
    name: '电子支付解决方案',
    description: '整合多种支付渠道，提供便捷的支付体验',
    details: '提供微信支付、支付宝、校园卡等多种支付方式，支持扫码支付和线上支付，同时提供统一的结算服务。'
  },
  {
    name: '财务透明化公示',
    description: '定期更新资金使用报告，确保财务透明',
    details: '建立财务公示平台，每周更新资金筹集和使用情况，接受公众监督，确保每一笔资金都得到合理使用。'
  }
];

// 目标金额测算依据
export const targetCalculationData = {
  total: 100000,
  breakdown: [
    { name: '场地租赁', amount: 20000, basis: '学校体育馆3天租金' },
    { name: '场地布置', amount: 10000, basis: '舞台搭建、装饰材料等' },
    { name: '食材采购', amount: 25000, basis: '预计50个摊位，每个摊位500元食材' },
    { name: '宣传推广', amount: 15000, basis: '线上线下宣传、物料制作等' },
    { name: '人力成本', amount: 15000, basis: '工作人员、志愿者补贴等' },
    { name: '应急储备金', amount: 15000, basis: '应对突发情况的备用资金' }
  ],
  projections: [
    { name: '预期参与人数', value: 5000, basis: '学校师生加上周边社区居民' },
    { name: '平均投资金额', value: 200, basis: '参考同类活动数据' },
    { name: '预计收入', value: 100000, basis: '参与人数×平均投资金额' },
    { name: '预计支出', value: 100000, basis: '各项成本总和' },
    { name: '预计利润率', value: 0, basis: '公益性质，不追求利润' }
  ]
};