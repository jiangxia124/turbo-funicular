import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { useTheme } from '@/hooks/useTheme';
import { ComparisonSection, References, ParallelTimeline, ComparisonCharts } from '@/components/ReportComponents';

  // 比较数据 - 根据参考图片调整数据，确保所有维度都能清晰显示
  const comparisonData = [
    { name: '出现年份', 交子: 1023, 比特币: 2009 },
    { name: '发行主体', 交子: 950, 比特币: 400 },
    { name: '防伪技术', 交子: 700, 比特币: 1800 },
    { name: '流通范围', 交子: 600, 比特币: 1900 },
    { name: '认可度', 交子: 850, 比特币: 1200 },
  ];

// 雷达图数据
const radarData = [
  { subject: '中心化程度', 交子: 9, 比特币: 1, fullMark: 10 },
  { subject: '技术复杂度', 交子: 3, 比特币: 9, fullMark: 10 },
  { subject: '流动性', 交子: 5, 比特币: 7, fullMark: 10 },
  { subject: '稳定性', 交子: 6, 比特币: 3, fullMark: 10 },
  { subject: '监管程度', 交子: 9, 比特币: 2, fullMark: 10 },
  { subject: '接受度', 交子: 7, 比特币: 5, fullMark: 10 },
];

// 生命周期关键节点对比数据 - 全面梳理版本
const timelineData = [
  // 北宋交子生命周期节点
  { 
    year: 1000, 
    event: '北宋初期，四川地区出现私交子', 
    type: '交子',
    phase: '起源',
    nodeType: '经济',
    detailedDescription: '北宋初年，四川地区商业繁荣但使用铁钱交易极为不便（1000个大钱重25斤）。当地富商为解决交易难题，自发创立交子铺，发行可兑换铁钱的纸质凭证"交子"。最初的交子由十几家富商联合发行，以各自的财产和信誉作为担保。',
    significance: '这是世界上最早的纸币雏形，标志着货币形式从金属货币向信用货币的重要过渡。',
    comparativeAnalysis: '与比特币类似，私交子最初也是民间自发创新的产物，而非由官方主导设计。',
    impactScope: '区域',
    duration: '约23年'
  },
  { 
    year: 1023, 
    event: '宋仁宗天圣元年，政府设立益州交子务，发行官交子', 
    type: '交子',
    phase: '发展',
    nodeType: '政策',
    detailedDescription: '由于部分交子铺经营者破产或挪用准备金，导致民间交子信用危机频发。宋仁宗天圣元年（1023年），政府设立益州交子务，将交子发行权收归国有，正式发行官方交子。官方交子初期有严格的发行限额，规定每界（3年）发行1256340贯，并准备36万贯铁钱作为准备金。',
    significance: '这是世界上最早由政府正式发行的纸币，标志着纸币从民间信用向国家信用的转变。',
    comparativeAnalysis: '与比特币的去中心化发行机制截然不同，交子经历了从民间到官方、从去中心化到中心化的转变过程。',
    impactScope: '区域',
    duration: '约45年'
  },
  { 
    year: 1068, 
    event: '宋神宗熙宁年间，交子开始在陕西等地流通', 
    type: '交子',
    phase: '鼎盛',
    nodeType: '经济',
    detailedDescription: '宋神宗熙宁年间（1068-1077年），为解决西北边境军费问题，政府开始在陕西等地推行交子，交子的流通范围从四川扩展到北宋其他地区。同时，为增加财政收入，政府开始增发交子，发行限额逐渐被突破。',
    significance: '交子的流通范围扩大标志着其作为全国性货币的尝试，但同时也埋下了超发贬值的隐患。',
    comparativeAnalysis: '与比特币自诞生起就具有全球流通性不同，交子的流通范围是逐步扩展的，且始终受限于北宋的统治区域。',
    impactScope: '全国',
    duration: '约37年'
  },
  { 
    year: 1105, 
    event: '宋徽宗崇宁四年，交子改名为钱引', 
    type: '交子',
    phase: '调整/变革',
    nodeType: '政策',
    detailedDescription: '宋徽宗崇宁四年（1105年），交子正式改名为"钱引"，同时废除了交子的准备金制度，完全依赖国家信用发行。钱引的发行量迅速增加，导致严重的通货膨胀，其价值急剧贬值。',
    significance: '钱引的出现标志着纸币从有储备担保向纯粹信用货币的转变，但也加速了其信用的崩溃。',
    comparativeAnalysis: '与比特币固定总量的机制相反，钱引的发行完全不受约束，最终导致了严重的通货膨胀。',
    impactScope: '全国',
    duration: '约56年'
  },
  { 
    year: 1161, 
    event: '南宋绍兴三十一年，交子被会子取代', 
    type: '交子',
    phase: '衰落',
    nodeType: '政策',
    detailedDescription: '南宋绍兴三十一年（1161年），政府发行了新的纸币"会子"，逐渐取代了交子和钱引。此时的交子（钱引）由于长期超发，已经严重贬值，失去了民众的信任。',
    significance: '交子的被取代标志着中国最早的纸币制度的衰落，但其作为信用货币的尝试为后世提供了宝贵经验。',
    comparativeAnalysis: '与交子相比，比特币的去中心化特性使其不会被任何机构随意替换或废除，其生命周期由算法和社区共识决定。',
    impactScope: '历史',
    duration: '约161年（从私交子出现到被取代）'
  },
  
  // 比特币生命周期节点
  { 
    year: 2008, 
    event: '中本聪发表《比特币：一种点对点的电子现金系统》论文', 
    type: '比特币',
    phase: '起源',
    nodeType: '技术',
    detailedDescription: '2008年11月1日，一个化名为"中本聪"的人在密码学邮件列表上发表了题为《比特币：一种点对点的电子现金系统》的论文，提出了一种不依赖中心化机构的电子现金系统构想。这篇论文直接回应了2008年全球金融危机后人们对传统金融体系的信任危机。',
    significance: '这篇论文奠定了比特币和区块链技术的理论基础，开创了去中心化数字货币的新时代。',comparativeAnalysis: '与交子源于商业交易需求不同，比特币的诞生更多是对现有金融体系的反思和挑战。',
    impactScope: '全球',
    duration: '约1年'
  },
  { 
    year: 2009, 
    event: '比特币创世区块被挖出，比特币正式诞生', 
    type: '比特币',
    phase: '发展',
    nodeType: '技术',
    detailedDescription: '2009年1月3日，中本聪挖出了比特币的创世区块（Genesis Block），获得了第一批50个比特币。创世区块中包含了一条具有象征意义的信息："The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"，直接引用了当天《泰晤士报》的头条，记录了金融危机的影响。',
    significance: '创世区块的诞生标志着比特币从理论走向实践，去中心化数字货币正式进入历史舞台。',
    comparativeAnalysis: '与交子从民间自发到官方接管的发展路径不同，比特币自诞生起就设计为去中心化系统，不受任何单一实体控制。',
    impactScope: '全球',
    duration: '约2年'
  },
  { 
    year: 2010, 
    event: '第一笔比特币交易：10000个比特币购买了两个披萨', 
    type: '比特币',
    phase: '发展',
    nodeType: '经济',
    detailedDescription: '2010年5月22日，程序员拉斯洛·豪涅茨（Laszlo Hanyecz）用10000个比特币购买了两个披萨，这是比特币首次用于现实世界的商品交易，被称为"比特币披萨日"。当时10000个比特币的价值约为41美元。',
    significance: '这一事件标志着比特币开始从技术实验向实用货币迈出了第一步，验证了其作为交易媒介的可能性。',
    comparativeAnalysis: '与交子最初就是作为交易媒介出现不同，比特币经历了从概念到实际交易的渐进过程。',
    impactScope: '全球',
    duration: '约3年'
  },
  { 
    year: 2013, 
    event: '比特币价格首次突破1000美元', 
    type: '比特币',
    phase: '鼎盛',
    nodeType: '经济',
    detailedDescription: '2013年12月，比特币价格首次突破1000美元，较年初上涨了约100倍。这一轮涨势主要受到塞浦路斯金融危机、中国投资者兴趣增加以及主流媒体报道增多等因素的推动。',
    significance: '比特币价格突破1000美元标志着其开始获得更广泛的认可，吸引了大量投资者和媒体的关注。',
    comparativeAnalysis: '与交子的价值始终与铁钱挂钩不同，比特币的价格完全由市场供需关系决定，波动剧烈。',
    impactScope: '全球',
    duration: '约8年'
  },
  { 
    year: 2021, 
    event: '比特币价格达到历史峰值约64000美元', 
    type: '比特币',
    phase: '鼎盛',
    nodeType: '经济',
    detailedDescription: '2021年4月，比特币价格达到历史峰值约64000美元，较2020年3月的低点上涨了约90倍。这一轮上涨受到机构投资者（如特斯拉、MicroStrategy等）入场、部分国家对数字货币的监管态度趋于明朗以及全球量化宽松政策等因素的推动。',
    significance: '比特币价格的持续上涨和机构投资者的入场，标志着其正在逐步融入传统金融体系，获得更广泛的认可。',
    comparativeAnalysis: '与交子最终因超发而崩溃不同，比特币通过算法固定总量，理论上避免了通货膨胀问题，但其价格波动性远大于传统货币。',
    impactScope: '全球',
    duration: '至今（约14年）'
  },
];

// 生命周期对比分析框架 - 结构化版本
const lifeCycleComparisonFramework = [
  {
    dimension: '节点性质',
    subDimensions: [
      { name: '技术节点', description: '由技术创新推动的关键事件' },
      { name: '经济节点', description: '由经济需求或市场变化推动的关键事件' },
      { name: '社会节点', description: '由社会因素或公众认知变化推动的关键事件' },
      { name: '政策节点', description: '由政府政策或监管变化推动的关键事件' }
    ]
  },
  {
    dimension: '影响范围',
    subDimensions: [
      { name: '区域性影响', description: '影响范围局限于特定地区' },
      { name: '全国性影响', description: '影响范围覆盖整个国家' },
      { name: '全球性影响', description: '影响范围跨越国界，具有全球意义' },
      { name: '历史性影响', description: '对后世发展产生深远历史影响' }
    ]
  },
  {
    dimension: '持续时间',
    subDimensions: [
      { name: '短期影响', description: '影响持续时间较短（1-5年）' },
      { name: '中期影响', description: '影响持续时间中等（5-20年）' },
      { name: '长期影响', description: '影响持续时间较长（20-100年）' },
      { name: '超长期影响', description: '影响持续时间超百年，成为历史遗产' }
    ]
  },
  {
    dimension: '驱动因素',
    subDimensions: [
      { name: '技术驱动', description: '由技术进步或创新推动的发展' },
      { name: '经济驱动', description: '由经济需求或市场力量推动的发展' },
      { name: '政治驱动', description: '由政府政策或政治因素推动的发展' },
      { name: '社会驱动', description: '由社会需求或文化因素推动的发展' }
    ]
  },
  {
    dimension: '生命周期阶段',
    subDimensions: [
      { name: '起源阶段', description: '概念形成与初步尝试阶段' },
      { name: '发展阶段', description: '快速成长与完善阶段' },
      { name: '鼎盛阶段', description: '影响力和使用范围达到高峰阶段' },
      { name: '调整/变革阶段', description: '面临挑战并进行调整或变革阶段' },
      { name: '衰落/现状阶段', description: '影响力下降或稳定发展阶段' }
    ]
  }
];

// 参考资料
const references = [
  { title: '《北宋交子研究》', author: '王曾瑜', year: '2005' },
  { title: '《比特币：一种点对点的电子现金系统》', author: '中本聪', year: '2008' },
  { title: '《中国货币史》', author: '彭信威', year: '2015' },
  { title: '《宋代货币与货币流通研究》', author: '高聪明', year: '2000' },
  { title: '《区块链技术指南》', author: '邹均', year: '2016' },
];

// 分析框架数据
const analysisFramework = [
  {
    title: "基本维度",
    items: [
      "历史背景与时代特征",
      "发行主体与管理机制",
      "流通范围与使用场景",
      "技术基础与实现原理",
      "生命周期与历史意义"
    ]
  },
  {
    title: "深度对比维度",
    items: [
      "产生背景（社会经济需求、技术前提）",
      "信用基础（信用来源、价值担保）",
      "运作机制（发行方式、防伪措施、流通规则）",
      "经济影响（对商品流通、金融体系、政府财政的影响）",
      "历史局限性与现代启示"
    ]
  }
];

export default function Home() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'framework' | 'background' | 'credit' | 'timeline' | 'mindmap' | 'visualization' | 'valueGuarantee'>('framework');
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-opacity-80 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            北宋交子与比特币对比分析
          </motion.h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 报告标题和基本信息 */}
        <motion.section
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            北宋官方交子与比特币的对比分析
          </h2>
          <div className={`inline-block px-6 py-3 rounded-full mb-6 ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
            <p className="font-medium">学号：2400050133 | 专业班级：金融2404</p>
          </div>
          <p className="text-lg max-w-3xl mx-auto opacity-80">
            本报告深入探讨中国北宋时期官方发行的交子与现代数字货币比特币的异同，
            分析它们的产生背景、信用基础及历史意义。
          </p>
        </motion.section>

        {/* 分析框架展示 */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className={`p-6 rounded-2xl shadow-lg ${isDark ? 'bg-gray-800/50' : 'bg-white'}`}>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <i className="fas fa-sitemap mr-3 text-green-500"></i>
              北宋官方交子与比特币对比分析框架
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {analysisFramework.map((framework, idx) => (
                <motion.div
                  key={idx}
                  className={`p-5 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <h4 className="text-xl font-semibold mb-4">{framework.title}</h4>
                  <ul className="space-y-3">
                    {framework.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start">
                        <i className="fas fa-check-circle mt-1 mr-2 text-green-500"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className={`mt-8 p-5 rounded-xl ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'} border-l-4 border-blue-500`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p className="text-lg font-medium">框架使用说明：</p>
              <p className="mt-2 opacity-80">
                本分析框架从基本维度和深度对比维度两个层面构建，帮助系统性地对比北宋交子与比特币的异同。
                您可以根据研究需求，选择适合的维度进行深入分析，也可以在此基础上扩展更多个性化的对比维度。
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* 探索与协作阶段 */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={`p-6 rounded-2xl shadow-lg ${isDark ? 'bg-gray-800/50' : 'bg-white'}`}>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <i className="fas fa-search-circle mr-3 text-blue-500"></i>
              探索与协作阶段
            </h3>
            
            <div className="space-y-6">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h4 className="text-xl font-semibold mb-3">AI头脑风暴</h4>
                <p className="mb-3">
                  借助AI工具进行关于北宋交子与比特币的头脑风暴，梳理两者的核心特征与历史背景。
                  通过输入关键词"北宋交子特征"、"比特币核心技术"、"古代纸币与现代数字货币对比"等，
                  获取了大量基础信息。
                </p>
              </div>
              
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h4 className="text-xl font-semibold mb-3">文献整理</h4>
                <p className="mb-3">
                  系统整理相关历史文献、学术观点及技术资料，包括《宋史·食货志》中关于交子的记载，
                  中本聪的比特币白皮书，以及现代学者对比特币技术原理的研究论文。
                </p>
              </div>
              
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h4 className="text-xl font-semibold mb-3">逻辑验证</h4>
                <p className="mb-3">
                  对关键论点进行逻辑验证，识别潜在的分析偏差或信息缺口。例如，针对"交子是世界上最早的纸币"这一观点，
                  通过对比同时期其他地区的货币形式进行验证。
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 创作与整合阶段 */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={`p-6 rounded-2xl shadow-lg ${isDark ? 'bg-gray-800/50' : 'bg-white'}`}>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <i className="fas fa-paint-brush mr-3 text-purple-500"></i>
              创作与整合阶段
            </h3>
            
            {/* 选项卡导航 */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveTab('framework')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'framework' 
                    ? 'bg-green-600 text-white shadow-md' 
                    : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                分析框架
              </button>
              <button
                onClick={() => setActiveTab('background')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'background' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                产生背景
              </button>
              <button
                onClick={() => setActiveTab('credit')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'credit' 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                信用基础
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'timeline' 
                    ? 'bg-green-600 text-white shadow-md' 
                    : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                历史时间轴
              </button>
              <button
                onClick={() => setActiveTab('mindmap')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'mindmap' 
                    ? 'bg-yellow-600 text-white shadow-md' 
                    : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                思维导图
              </button>
              <button
                onClick={() => setActiveTab('visualization')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'visualization' 
                    ? 'bg-red-600 text-white shadow-md' 
                    : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                数据可视化
              </button>
              <button
                onClick={() => setActiveTab('valueGuarantee')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'valueGuarantee' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                价值担保机制
              </button>
            </div>
            
            {/* 选项卡内容 */}
            <div className="mt-6">
              {activeTab === 'framework' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {analysisFramework.map((framework, idx) => (
                    <motion.div
                      key={idx}
                      className={`p-5 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <h4 className="text-xl font-semibold mb-4">{framework.title}</h4>
                      <ul className="space-y-3">
                        {framework.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start">
                            <i className="fas fa-check-circle mt-1 mr-2 text-green-500"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    className={`mt-8 md:mt-0 p-5 rounded-xl ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'} border-l-4 border-blue-500 md:col-span-2`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    <p className="text-lg font-medium">框架使用说明：</p>
                    <p className="mt-2 opacity-80">
                      本分析框架从基本维度和深度对比维度两个层面构建，帮助系统性地对比北宋交子与比特币的异同。
                      您可以根据研究需求，选择适合的维度进行深入分析，也可以在此基础上扩展更多个性化的对比维度。
                    </p>
                  </motion.div>
                </div>
              )}
              
              {activeTab === 'background' && (
                <ComparisonSection 
                  title="产生背景对比"
                  description="分析北宋交子与比特币为何会在各自的时代出现"
                  sections={[
                    {
                      subtitle: "社会经济需求",
                        content: [
                          {
                            title: "北宋交子",
                            points: [
                              "北宋时期商品经济繁荣，四川地区因铁钱笨重（1000个大钱重25斤），不利于商业贸易",
                              "四川地区是北宋的经济中心之一，商业活动频繁，对轻便货币的需求迫切",
                              "民间自发出现了由富商经营的交子铺，发行可兑换铁钱的交子",
                              "直接导火索：民间交子铺因信用问题频繁出现挤兑风波，部分经营者破产或挪用准备金",
                              "四川地区特殊的货币体系（铁钱与铜钱并行）造成市场混乱",
                              "政府面临财政压力，尤其是军费开支巨大，需要更灵活的货币工具"
                            ]
                          },
                        {
                          title: "比特币",
                          points: [
                            "2008年全球金融危机后，人们对传统金融体系和中心化货币发行机构失去信任，这是比特币诞生的核心经济痛点",
                            "银行倒闭、政府救市措施引发通货膨胀担忧，促使人们寻求不受政府控制的价值存储手段",
                            "传统金融体系存在的交易成本高、跨境转账慢、金融排斥等问题日益凸显",
                            "互联网时代对去中心化、匿名、便捷的电子支付方式的需求日益增长",
                            "跨境贸易和汇款对低手续费、高效率支付工具的需求"
                          ]
                        }
                      ]
                    },
                    {
                      subtitle: "技术前提",
                        content: [
                          {
                            title: "北宋交子",
                            points: [
                              "造纸术和印刷术的成熟，为纸币的产生提供了物质基础",
                              "宋代的雕版印刷技术达到很高水平，能够制作复杂的纸币图案，增强防伪能力",
                              "数学和记账技术的发展，为纸币发行和兑换提供了技术支持",
                              "宋代完善的官僚体系和管理制度，为官方货币发行提供了组织保障",
                              "宋朝政府对经济的干预能力较强，具备推行新型货币制度的条件"
                            ]
                          },
                        {
                          title: "比特币",
                          points: [
                            "密码学的发展，特别是哈希函数、公钥密码学和数字签名技术",
                            "分布式系统和点对点网络技术的成熟",
                            "共识算法（工作量证明）的创新应用",
                            "2008年金融危机后，技术社区对构建去中心化金融系统的意愿更加强烈",
                            "创世区块中包含的泰晤士报标题'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks'直接记录了金融危机的影响"
                          ]
                        }
                      ]
                    }
                  ]}
                />
              )}
              
              {activeTab === 'credit' && (
               <ComparisonSection 
                 title="信用基础对比"
                 description="探讨人们因何信任并接受北宋交子与比特币作为支付或价值存储手段"
                 sections={[
                   {
                     subtitle: "北宋交子信用基础的建立与崩溃",
                       content: [
                         {
                           title: "信用基础的建立",
                           points: [
                             "民间起源阶段：北宋初年，四川富商自发创立交子铺，通过商业信誉和资产担保发行交子",
                             "官方接管：1023年宋仁宗时期，政府设立益州交子务，将交子发行权收归国有，以国家信用背书",
                             "制度保障：建立了严格的发行限额、准备金制度和分界（每三年更换）制度，初期准备金率约为28%",
                             "法律确认：通过国家法律形式确立交子的合法地位，增强权威性",
                             "管理规范：设置专门的机构和官员负责交子的印刷、发行、兑换和监管",
                             "价值稳定：初期严格控制发行量，确保交子与铁钱的稳定兑换比例"
                           ]
                         },
                         {
                           title: "后期崩溃的原因",
                           points: [
                             "财政压力导致超发：北宋中后期，为应对战争、自然灾害等财政开支，政府不断突破发行限额",
                             "准备金制度被破坏：随着超发加剧，准备金比例大幅下降，甚至完全被废弃",
                             "通货膨胀严重：交子发行量激增，导致严重贬值，甚至出现'交子一贯只值铁钱一百文'的情况",
                             "政府信用丧失：官方随意更改兑换规则，降低了民众对交子的信任",
                             "分界制度名存实亡：原本每三年更换一次的制度被打乱，新旧交子并行流通，加剧混乱",
                             "伪钞泛滥：政府监管不力，防伪技术逐渐被民间掌握，伪钞大量出现进一步损害交子信用",
                             "社会动荡：北宋末年战乱频繁，政府失去对经济的有效控制"
                           ]
                         }
                     ]
                   },
                   {
                     subtitle: "比特币的信用基础：无政府背书的全球认可",
                       content: [
                         {
                           title: "比特币信用的建立机制",
                           points: [
                             "算法信任：基于数学和密码学原理，而非特定机构或政府的信用背书",
                             "去中心化架构：没有中央发行机构，网络由全球节点共同维护，任何单一实体无法控制",
                             "透明可验证：所有交易记录在公开的区块链账本上，任何人都可以查看和验证",
                             "固定供应上限：通过算法设定2100万枚的总量上限，解决了传统货币超发问题",
                             "抗审查性：交易无需第三方批准，保护用户财产权和交易自由",
                             "技术安全性：密码学技术和共识机制确保系统难以被攻击和篡改"
                           ]
                         },
                         {
                           title: "算法信任与社区共识详解",
                           points: [
                             "算法信任的具体含义：依靠预先设定的数学规则和密码学机制建立信任，而非依赖个人或机构的信用",
                             "共识机制的作用：通过工作量证明(PoW)等机制，确保网络中的大多数节点对交易和账本状态达成一致",
                             "分布式账本技术：每个节点都保存完整账本副本，避免单点故障和篡改风险",
                             "社区共识的形成：开发者、矿工、用户和投资者共同参与网络维护和规则制定，形成去中心化的治理模式",
                             "代码即法律：系统规则通过开源代码明确规定，所有参与者都必须遵守，确保规则的透明性和一致性",
                             "市场认可的积累：从2009年诞生至今，比特币经历多次市场考验，逐渐获得全球越来越多用户和机构的认可"
                           ]
                         }
                     ]
                   },
                   {
                     subtitle: "信用基础的本质区别",
                       content: [
                         {
                           title: "北宋交子",
                           points: [
                             "中心化信用：依赖政府的权威和信用背书",
                             "人治管理：货币发行和管理依赖政府官员的决策",
                             "弹性规则：发行规则可以根据政府需要随时调整",
                             "地域限制：主要在北宋统治区域内流通",
                             "金属货币本位：本质上是金属货币的价值符号，最终需要兑换为金属货币"
                           ]
                         },
                         {
                           title: "比特币",
                           points: [
                             "算法信用：依赖数学规则和密码学保证，无需中心化机构背书",
                             "代码治理：规则通过代码预先设定，不受人为干预",
                             "刚性规则：发行总量和速度由算法严格控制，无法随意更改",
                             "全球流通：基于互联网的特性，可以在全球范围内自由流通",
                             "独立价值体系：不依附于任何现有货币或资产，形成了独立的价值体系"
                           ]
                         }
                     ]
                   }
                 ]}
               />
              )}
              
               {activeTab === 'timeline' && (
                 <ParallelTimeline data={timelineData} />
               )}
              
               {activeTab === 'mindmap' && (
                 <ComparisonCharts />
               )}
              
               {activeTab === 'visualization' && (
                 <div className="space-y-8">
                   <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                     <h4 className="text-xl font-semibold mb-4">特征对比图表</h4>
                        <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                         <BarChart
                           data={comparisonData}
                           margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                         >
                           <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#444" : "#ccc"} />
                           <XAxis dataKey="name" tick={{ fill: isDark ? "#eee" : "#333" }} />
                           <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                           <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" />
                           <Tooltip 
                              cursor="default"
                              contentStyle={{ 
                               backgroundColor: isDark ? "#333" : "#fff",
                               color: isDark ? "#eee" : "#333",
                               borderColor: isDark ? "#555" : "#ddd"
                             }} 
                           />
                           <Legend wrapperStyle={{ color: isDark ? "#eee" : "#333" }} />
                           <Bar yAxisId="left" dataKey="交子" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                           <Bar yAxisId="right" dataKey="比特币" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                         </BarChart>
                       </ResponsiveContainer>
                     </div>
                   </div>
                   
                   <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                     <h4 className="text-xl font-semibold mb-4">属性雷达图对比</h4>
                        <div className="h-96 md:h-[500px]">
                        <ResponsiveContainer width="100%" height="100%">
                         <RadarChart outerRadius={90} data={radarData}>
                           <PolarGrid stroke={isDark ? "#555" : "#ccc"} />
                           <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? "#eee" : "#333" }} />
                           <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: isDark ? "#eee" : "#333" }} />
                           <Radar name="交子" dataKey="交子" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                           <Radar name="比特币" dataKey="比特币" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                           <Legend wrapperStyle={{ color: isDark ? "#eee" : "#333" }} />
                           <Tooltip 
                              cursor="default"
                              contentStyle={{ 
                               backgroundColor: isDark ? "#333" : "#fff",
                               color: isDark ? "#eee" : "#333",
                               borderColor: isDark ? "#555" : "#ddd"
                             }} 
                           />
                         </RadarChart>
                       </ResponsiveContainer>
                     </div>
                   </div>
                 </div>
               )}
              
              {activeTab === 'valueGuarantee' && (
                <ComparisonSection 
                  title="价值担保机制对比"
                  description="分析北宋交子、现代法币与比特币的价值担保机制特点及异同"
                  sections={[
                    {
                      subtitle: "北宋交子与现代法币的价值担保机制异同",
                        content: [
                          {
                            title: "北宋交子的价值担保机制",
                            points: [
                              "初期以金属货币为储备：官方交子发行初期，政府规定发行1贯交子需要储备300文铁钱，准备金率约为30%",
                              "国家信用背书：随着时间推移，政府逐渐降低准备金比例，越来越依赖国家信用作为价值担保",
                              "法律强制流通：通过法律手段强制民众接受交子作为支付手段",
                              "有限流通范围：主要在四川地区流通，后期扩展到其他地区但仍受地域限制",
                              "与金属货币的可兑换性：初期保证交子可随时兑换为铁钱，但后期兑换承诺逐渐失效",
                              "发行限额控制：初期有严格的发行限额，但后期为应对财政危机而超发，破坏了价值担保"
                            ]
                          },
                        {
                          title: "现代法币的价值担保机制",
                          points: [
                            "国家信用和主权背书：现代法币不与任何商品（如黄金）挂钩，完全依赖发行国的主权信用和经济实力",
                            "中央银行的货币政策：通过中央银行的货币政策（如利率调整、公开市场操作等）维持货币价值稳定",
                            "法律强制流通：通过法律规定法币是法定支付手段，任何交易不得拒绝接受",
                            "广泛的流通范围：在国家主权范围内普遍接受，国际货币如美元等可在全球范围内流通",
                            "部分准备金制度：商业银行实行部分准备金制度，中央银行作为最后贷款人提供流动性支持",
                            "通胀目标制：大多数现代中央银行以控制通货膨胀率为主要目标，间接维护货币价值"
                          ]
                        }
                      ]
                    },
                    {
                      subtitle: "北宋交子与现代法币的价值担保机制相同点与差异",
                        content: [
                          {
                            title: "相同点",
                            points: [
                              "都依赖国家信用：北宋交子和现代法币最终都以国家信用作为核心价值担保",
                              "都通过法律强制流通：两者都依靠法律手段确保货币的法定地位和强制接受性",
                              "都经历了从商品货币到信用货币的演变：交子从兑换铁钱的凭证逐渐演变为信用货币；现代法币从金本位演变为纯粹的信用货币",
                              "都存在超发风险：当政府面临财政压力时，两者都可能出现货币超发导致贬值",
                              "都由中心化机构发行和管理：北宋交子由官方机构发行，现代法币由中央银行发行和管理"
                            ]
                          },
                        {
                          title: "差异",
                          points: [
                            "准备金制度不同：北宋交子初期有明确的金属货币准备金要求，现代法币没有商品准备金要求",
                            "货币政策工具不同：现代中央银行拥有更复杂和完善的货币政策工具来维持货币稳定",
                            "信用基础不同：现代法币的信用基础更加多元，包括国家经济实力、财政状况、国际地位等综合因素",
                            "流通范围不同：现代法币特别是国际货币的流通范围远超北宋交子",
                            "金融监管体系不同：现代有更完善的金融监管体系来保障货币的信用和稳定"
                          ]
                        }
                      ]
                    },
                    {
                      subtitle: "比特币的价值担保与价格波动分析",
                        content: [
                          {
                            title: "比特币的价值担保机制",
                            points: [
                              "算法稀缺性：通过数学算法设定2100万枚的总量上限，确保不会超发，这是比特币价值担保的核心机制",
                              "去中心化网络：没有中央发行机构，网络由全球节点共同维护，任何单一实体无法控制货币供应",
                              "共识机制：通过工作量证明(PoW)等共识算法确保网络安全和交易的不可篡改性",
                              "密码学安全：基于SHA-256等密码学技术，确保交易的安全性和用户资产的所有权",
                              "市场需求驱动：价值主要由市场供需关系决定，而非依赖特定机构的信用背书",
                              "全球流动性：基于互联网的特性，可在全球范围内自由流通和交易",
                              "技术创新价值：作为区块链技术的首个成功应用，具有技术创新和示范价值"
                            ]
                          },
                        {
                          title: "比特币价值担保的稳定性与价格波动原因",
                          points: [
                            "价值担保的相对稳定性：算法稀缺性和去中心化特性提供了相对稳定的供应机制，但市场认可度和监管环境仍在发展中",
                            "市场认可度波动：作为新兴资产类别，市场对其价值的认知存在较大分歧，导致价格波动",
                            "流动性因素：相比传统货币和金融资产，比特币市场规模较小，更容易受到大额交易的影响",
                            "投机行为影响：市场中存在大量投机资金，放大了价格波动",
                            "监管政策变化：各国对数字货币的监管政策不明确且不断变化，政策不确定性导致价格剧烈波动",
                            "技术因素：网络拥堵、安全漏洞、硬分叉等技术问题也会引起价格波动",
                            "传统金融市场关联度增加：随着机构投资者参与度提高，比特币价格与传统金融市场的联动性增强，受宏观经济因素影响加大",
                            "缺乏价值锚定：不像传统法币有国家信用和经济基本面作为价值锚定，比特币的价值更多依赖市场共识"
                          ]
                        }
                      ]
                    }
                  ]}
                />
              )}
            </div>
          </div>
         </motion.section>

        {/* 结论部分 */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className={`p-8 rounded-2xl shadow-lg border border-green-200 dark:border-green-900 ${isDark ? 'bg-green-900/10' : 'bg-green-50'}`}>
            <h3 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400 flex items-center">
              <i className="fas fa-flag-checkered mr-3"></i>
              结论：货币形态演变的永恒命题
            </h3>
            
            <motion.div
              className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/80' : 'bg-white'} shadow-md border-l-4 border-green-500`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-lg mb-6">
                交子与比特币是人类货币史上两次极端实验：
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                    <i className="fas fa-landmark text-blue-600 dark:text-blue-400 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">交子证明</h4>
                    <p className="opacity-80">
                      中心化货币需平衡效率与信用，过度依赖政府信用易引发通胀危机。
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                    <i className="fas fa-cryptocurrency text-purple-600 dark:text-purple-400 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">比特币证明</h4>
                    <p className="opacity-80">
                      去中心化货币需解决实用与共识，缺乏实体锚定难以成为主流支付工具。
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                    <i className="fas fa-lightbulb text-green-600 dark:text-green-400 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">未来货币创新方向</h4>
                    <p className="opacity-80">
                      未来货币创新（如央行数字货币CBDC）需融合两者优势：用技术保障效率，用制度锚定信用。
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-5 rounded-lg bg-gray-100 dark:bg-gray-700/50 border-l-4 border-blue-500">
                <p className="italic text-gray-600 dark:text-gray-300">
                  "历史不会简单重复，但总是压着相同的韵脚。" 交子与比特币相隔近千年的两次货币实验，揭示了货币形态演变的本质规律：货币的核心是信用，而信用的建立既需要技术保障，也需要制度约束。
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 参考资料 */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <References references={references} />
        </motion.section>
      </main>
      
      <footer className={`py-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 text-center opacity-70 text-sm">
          <p>由AI生成，并经本人核实</p>
          <p className="mt-2">© 2025 北宋交子与比特币对比分析报告</p>
        </div>
      </footer>
    </div>
  );
}