import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

// 比较部分组件
interface ComparisonItem {
  title: string;
  points: string[];
}

interface SectionContent {
  subtitle: string;
  content: ComparisonItem[];
}

interface ComparisonSectionProps {
  title: string;
  description: string;
  sections: SectionContent[];
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ 
  title, 
  description, 
  sections 
}) => {
  const { isDark } = useTheme();
  
  return (
    <div>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="mb-6 opacity-80">{description}</p>
      
      <div className="space-y-8">
        {sections.map((section, idx) => (
          <motion.div 
            key={idx}
            className={`p-5 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <h5 className="text-lg font-medium mb-4">{section.subtitle}</h5>
            <div className="grid md:grid-cols-2 gap-4">
              {section.content.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className={`p-4 rounded-lg ${
                    isDark 
                      ? itemIdx === 0 ? 'bg-blue-900/20' : 'bg-purple-900/20'
                      : itemIdx === 0 ? 'bg-blue-50' : 'bg-purple-50'
                  }`}
                >
                  <h6 className={`text-md font-medium mb-3 ${
                    itemIdx === 0 ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'
                  }`}>
                    {item.title}
                  </h6>
                  <ul className="space-y-2">
                    {item.points.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-start">
                        <i className={`fas fa-check-circle mt-1 mr-2 ${
                          itemIdx === 0 ? 'text-blue-500' : 'text-purple-500'
                        }`}></i>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 时间轴数据接口
interface TimelineItem {
  year: number;
  event: string;
  type: string;
  phase: string;
  nodeType: string;
  detailedDescription: string;
  significance?: string;
  comparativeAnalysis?: string;
  impactScope?: string;
  duration?: string;
}

// 平行对比时间轴组件 - 全新设计
interface ParallelTimelineProps {
  data: TimelineItem[];
}

export const ParallelTimeline: React.FC<ParallelTimelineProps> = ({ data }) => {
  const { isDark } = useTheme();
  const [activeEvent, setActiveEvent] = useState<TimelineItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // 分离数据为交子和比特币
  const jiaoziData = data.filter(item => item.type === '交子').sort((a, b) => a.year - b.year);
  const bitcoinData = data.filter(item => item.type === '比特币').sort((a, b) => a.year - b.year);
  
  // 过滤数据
  const getFilteredData = () => {
    switch(activeFilter) {
      case 'jiaozi':
        return { jiaozi: jiaoziData, bitcoin: [] };
      case 'bitcoin':
        return { jiaozi: [], bitcoin: bitcoinData };
      default:
        return { jiaozi: jiaoziData, bitcoin: bitcoinData };
    }
  };
  
  const { jiaozi, bitcoin } = getFilteredData();
  
  // 获取阶段颜色
  const getPhaseColor = (phase: string) => {
    switch(phase) {
      case '起源': return 'bg-blue-500';
      case '发展': return 'bg-green-500';
      case '鼎盛': return 'bg-purple-500';
      case '调整/变革': return 'bg-yellow-500';
      case '衰落': return 'bg-red-500';
      case '现状': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };
  
  // 获取节点类型图标
  const getNodeTypeIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case '技术': return 'fa-cogs';
      case '经济': return 'fa-chart-line';
      case '社会': return 'fa-users';
      case '政策': return 'fa-gavel';
      default: return 'fa-circle';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold flex items-center">
          <i className="fas fa-history mr-2 text-blue-500"></i>
          北宋交子与比特币生命周期对比
        </h4>
        
        {/* 过滤按钮 */}
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              activeFilter === 'all' 
                ? 'bg-blue-600 text-white' 
                : isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            全部
          </button>
          <button 
            onClick={() => setActiveFilter('jiaozi')}
            className={`px-3 py-1 rounded-full text-sm ${
              activeFilter === 'jiaozi' 
                ? 'bg-blue-500 text-white' 
                : isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            北宋交子
          </button>
          <button 
            onClick={() => setActiveFilter('bitcoin')}
            className={`px-3 py-1 rounded-full text-sm ${
              activeFilter === 'bitcoin' 
                ? 'bg-purple-500 text-white' 
                : isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            比特币
          </button>
        </div>
      </div>
      
      {/* 时间轴容器 */}
      <div 
        ref={timelineRef}
        className="relative overflow-x-auto pb-8"
        style={{ minHeight: '600px' }}
      >
        <div className="min-w-[1200px] px-4">
          {/* 年代标记线 */}
          <div className="absolute left-0 right-0 top-8 h-px bg-gray-300 dark:bg-gray-700"></div>
          
            {/* 年代标记线 */}
            <div className="flex justify-between mb-12 relative min-w-[1200px]">
              {[1000, 1100, 1200, 1900, 2000, 2020].map((year) => (
                <div key={year} className="flex flex-col items-center flex-shrink-0 w-[160px]">
                  <div className="h-4 w-1 bg-gray-300 dark:bg-gray-700 mx-auto"></div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 whitespace-nowrap">{year}</span>
                </div>
              ))}
            </div>
          
          {/* 交子时间轴 */}
          {jiaozi.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <h5 className="text-lg font-medium text-blue-500">北宋交子时间轴</h5>
              </div>
              
                <div className="relative pl-20 border-l-2 border-blue-300 dark:border-blue-700">
                 {jiaozi.map((item, index) => {
                   // 计算年份位置百分比 (1000-1200年为北宋时期，1900-2020为近现代)
                   const yearPosition = item.year < 1200 
                     ? ((item.year - 1000) / 200) * 33.33 // 北宋时期占33.33%
                     : 33.33 + ((item.year - 1900) / 120) * 66.67; // 近现代占66.67%
                   
                   return (
                     <motion.div 
                       key={`jiaozi-${item.year}-${index}`}
                       className="mb-8 relative"
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.5, delay: index * 0.1 }}
                       whileHover={{ x: 5 }}
                     >
                       {/* 时间点 */}
                       <div 
                         className={`absolute -left-[25px] top-0 w-6 h-6 rounded-full ${getPhaseColor(item.phase)} cursor-pointer flex items-center justify-center shadow-lg`}
                         onClick={() => setActiveEvent(item)}
                       >
                         <i className="fas fa-circle text-white text-xs"></i>
                       </div>
                       
                       {/* 年份标签 - 优化位置和样式 */}
                       <div className="absolute -left-[160px] top-0 w-36 text-right">
                         <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                           {item.year}年
                         </span>
                       </div>
                    
                     {/* 事件卡片 */}
                     <div 
                       className={`p-5 rounded-xl shadow-md cursor-pointer transition-all duration-300 transform ${
                         isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                       } border-l-4 ${getPhaseColor(item.phase)}`}
                       onClick={() => setActiveEvent(item)}
                       whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                     >
                       <div className="flex justify-between items-start">
                         <h6 className="text-md font-medium">{item.event}</h6>
                         <span className="text-xs px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                           {item.phase}
                         </span>
                       </div>
                       
                       <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                         <i className={`fas ${getNodeTypeIcon(item.nodeType)} mr-2`}></i>
                         <span>{item.nodeType}</span>
                         {item.impactScope && (
                           <>
                             <span className="mx-2">•</span>
                             <span>{item.impactScope}影响</span>
                           </>
                         )}
                         {item.duration && (
                           <>
                             <span className="mx-2">•</span>
                             <span>{item.duration}</span>
                           </>
                         )}
                       </div>
                     </div>
                  </motion.div>
                );
              })}
              </div>
            </div>
          )}
          
          {/* 比特币时间轴 */}
          {bitcoin.length > 0 && (
            <div>
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                <h5 className="text-lg font-medium text-purple-500">比特币时间轴</h5>
              </div>
              
                <div className="relative pl-20 border-l-2 border-purple-300 dark:border-purple-700">
                 {bitcoin.map((item, index) => {
                   // 计算年份位置百分比
                   const yearPosition = 33.33 + ((item.year - 1900) / 120) * 66.67;
                   
                   return (
                     <motion.div 
                       key={`bitcoin-${item.year}-${index}`}
                       className="mb-8 relative"
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.5, delay: index * 0.1 }}
                       whileHover={{ x: 5 }}
                     >
                       {/* 时间点 */}
                       <div 
                         className={`absolute -left-[25px] top-0 w-6 h-6 rounded-full ${getPhaseColor(item.phase)} cursor-pointer flex items-center justify-center shadow-lg`}
                         onClick={() => setActiveEvent(item)}
                       >
                         <i className="fas fa-circle text-white text-xs"></i>
                       </div>
                       
                       {/* 年份标签 - 优化位置和样式 */}
                       <div className="absolute -left-[160px] top-0 w-36 text-right">
                         <span className="text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                           {item.year}年
                         </span>
                       </div>
                    
                     {/* 事件卡片 */}
                     <div 
                       className={`p-5 rounded-xl shadow-md cursor-pointer transition-all duration-300 transform ${
                         isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                       } border-l-4 ${getPhaseColor(item.phase)}`}
                       onClick={() => setActiveEvent(item)}
                       whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                     >
                       <div className="flex justify-between items-start">
                         <h6 className="text-md font-medium">{item.event}</h6>
                         <span className="text-xs px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                           {item.phase}
                         </span>
                       </div>
                       
                       <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                         <i className={`fas ${getNodeTypeIcon(item.nodeType)} mr-2`}></i>
                         <span>{item.nodeType}</span>
                         {item.impactScope && (
                           <>
                             <span className="mx-2">•</span>
                             <span>{item.impactScope}影响</span>
                           </>
                         )}
                         {item.duration && (
                           <>
                             <span className="mx-2">•</span>
                             <span>{item.duration}</span>
                           </>
                         )}
                       </div>
                     </div>
                  </motion.div>
                );
              })}
              </div>
            </div>
          )}
        </div>
      </div>
      
       {/* 详细信息模态框 - 增强视觉效果和交互体验 */}
       <AnimatePresence>
         {activeEvent && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.3 }}
             className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={() => setActiveEvent(null)}
           >
             <motion.div 
               initial={{ y: 50, opacity: 0, scale: 0.95 }}
               animate={{ y: 0, opacity: 1, scale: 1 }}
               exit={{ y: 50, opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
               className={`w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl ${
                 isDark ? 'bg-gray-800' : 'bg-white'
               }`}
               onClick={(e) => e.stopPropagation()}
             >
               <div className={`p-6 ${
                 activeEvent.type === '交子' ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-purple-600 to-purple-700'
               } text-white relative overflow-hidden`}>
                 {/* 装饰背景 */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-20 -mb-20"></div>
                 
                 <div className="flex justify-between items-center relative z-10">
                   <h3 className="text-xl font-bold">{activeEvent.event}</h3>
                   <button 
                     onClick={() => setActiveEvent(null)}
                     className="text-white hover:text-gray-200 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                   >
                     <i className="fas fa-times"></i>
                   </button>
                 </div>
                 <div className="mt-3 flex flex-wrap gap-2 relative z-10">
                   <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                     {activeEvent.year}年
                   </span>
                   <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                     {activeEvent.type}
                   </span>
                   <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                     {activeEvent.phase}
                   </span>
                   {activeEvent.nodeType && (
                     <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center">
                       <i className={`fas ${getNodeTypeIcon(activeEvent.nodeType)} mr-1`}></i>
                       {activeEvent.nodeType}
                     </span>
                   )}
                 </div>
               </div>
               
               <div className="p-6 space-y-6">
                 <div>
                   <h4 className="text-lg font-medium mb-3 flex items-center">
                     <i className="fas fa-info-circle mr-2 text-blue-500"></i>
                     详细描述
                   </h4>
                   <p className="opacity-80 leading-relaxed">{activeEvent.detailedDescription}</p>
                 </div>
                 
                 {activeEvent.significance && (
                   <div>
                     <h4 className="text-lg font-medium mb-3 flex items-center">
                       <i className="fas fa-star mr-2 text-yellow-500"></i>
                       历史意义
                     </h4>
                     <p className="opacity-80 leading-relaxed">{activeEvent.significance}</p>
                   </div>
                 )}
                 
                 {activeEvent.comparativeAnalysis && (
                   <div>
                     <h4 className="text-lg font-medium mb-3 flex items-center">
                       <i className="fas fa-balance-scale mr-2 text-green-500"></i>
                       对比视角
                     </h4>
                     <p className="opacity-80 leading-relaxed">{activeEvent.comparativeAnalysis}</p>
                   </div>
                 )}
                 
                 <div className="grid grid-cols-2 gap-4 mt-6">
                   {activeEvent.impactScope && (
                     <motion.div 
                       className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/80' : 'bg-gray-50'} border-l-2 border-blue-500`}
                       whileHover={{ scale: 1.02 }}
                     >
                       <h5 className="text-sm font-medium mb-2 flex items-center">
                         <i className="fas fa-globe-asia mr-1.5 text-blue-500"></i>
                         影响范围
                       </h5>
                       <p className="font-medium">{activeEvent.impactScope}</p>
                     </motion.div>
                   )}
                   
                   {activeEvent.duration && (
                     <motion.div 
                       className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/80' : 'bg-gray-50'} border-l-2 border-purple-500`}
                       whileHover={{ scale: 1.02 }}
                     >
                       <h5 className="text-sm font-medium mb-2 flex items-center">
                         <i className="fas fa-clock mr-1.5 text-purple-500"></i>
                         持续时间
                       </h5>
                       <p className="font-medium">{activeEvent.duration}</p>
                     </motion.div>
                   )}
                 </div>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
      
      {/* 使用说明 */}
      <div className={`p-4 rounded-lg text-sm ${
        isDark ? 'bg-gray-800/50' : 'bg-gray-100'
      }`}>
        <p className="opacity-70 flex items-center">
          <i className="fas fa-info-circle mr-2"></i>
          使用说明：平行时间轴分别展示北宋交子和比特币的发展历程。点击任一事件卡片可查看详细信息。
        </p>
      </div>
    </div>
  );
};

// 对比图表组件 - 替代思维导图
interface ComparisonCard {
  id: string;
  title: string;
  jiaoziTitle: string;
  jiaoziDescription: string;
  bitcoinTitle: string;
  bitcoinDescription: string;
  keyDifference: string;
  icon: string;
}

export const ComparisonCharts: React.FC = () => {
  const { isDark } = useTheme();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  // 定义对比维度卡片数据
  const comparisonCards: ComparisonCard[] = [
    {
      id: 'background',
      title: '产生背景',
      jiaoziTitle: '北宋交子',
      jiaoziDescription: '北宋时期商品经济繁荣，四川地区铁钱笨重（1000个大钱重25斤），商业贸易不便。民间自发出现交子铺，后因信用问题由官方接管。',
      bitcoinTitle: '比特币',
      bitcoinDescription: '2008年全球金融危机后，人们对传统金融体系失去信任。中本聪发表比特币白皮书，提出去中心化电子现金系统理念。',
      keyDifference: '交子源于实体货币流通不便，比特币源于对中心化金融体系的不信任',
      icon: 'fa-landmark'
    },
    {
      id: 'issuer',
      title: '发行主体',
      jiaoziTitle: '北宋交子',
      jiaoziDescription: '北宋政府设立益州交子务，由官方垄断发行和管理。',
      bitcoinTitle: '比特币',
      bitcoinDescription: '去中心化，无中央发行机构，通过工作量证明机制由矿工挖掘产生。',
      keyDifference: '交子是中心化政府发行，比特币是去中心化网络发行',
      icon: 'fa-users'
    },
    {
      id: 'credit',
      title: '信用基础',
      jiaoziTitle: '北宋交子',
      jiaoziDescription: '初期以铁钱储备为基础（准备金率约30%），后期主要依赖国家信用和法律强制流通。',
      bitcoinTitle: '比特币',
      bitcoinDescription: '基于数学算法和密码学，通过共识机制和分布式账本技术建立信任，无政府背书。',
      keyDifference: '交子依赖国家信用，比特币依赖算法和代码信任',
      icon: 'fa-shield-alt'
    },
    {
      id: 'technology',
      title: '技术基础',
      jiaoziTitle: '北宋交子',
      jiaoziDescription: '依赖造纸术和雕版印刷术，采用复杂图案、暗记等防伪技术。',
      bitcoinTitle: '比特币',
      bitcoinDescription: '基于区块链技术、密码学、共识算法（工作量证明）和分布式网络。',
      keyDifference: '交子基于传统印刷技术，比特币基于现代计算机和密码学技术',
      icon: 'fa-microchip'
    },
    {
      id: 'management',
      title: '管理方式',
      jiaoziTitle: '北宋交子',
      jiaoziDescription: '中心化管理，政府控制发行量、兑换规则和流通范围。',
      bitcoinTitle: '比特币',
      bitcoinDescription: '分布式管理，通过代码和共识机制自动执行，无中心化控制。',
      keyDifference: '交子是人为管理，比特币是代码自律',
      icon: 'fa-tasks'
    },
    {
      id: 'scarcity',
      title: '稀缺性保证',
      jiaoziTitle: '北宋交子',
      jiaoziDescription: '初期有发行限额，但后期为应对财政危机不断超发，导致通货膨胀。',
      bitcoinTitle: '比特币',
      bitcoinDescription: '通过算法固定总量2100万枚，发行速度每4年减半，确保稀缺性。',
      keyDifference: '交子稀缺性由政府控制，比特币稀缺性由数学算法保证',
      icon: 'fa-coins'
    }
  ];
  
  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };
  
  return (
    <div>
      <h4 className="text-xl font-semibold mb-6 flex items-center">
        <i className="fas fa-chart-bar mr-2 text-purple-500"></i>
        北宋交子与比特币核心差异对比
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisonCards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* 卡片标题栏 */}
            <div 
              className={`p-4 flex items-center cursor-pointer ${
                expandedCard === card.id 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}
              onClick={() => toggleCard(card.id)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                expandedCard === card.id ? 'bg-white bg-opacity-20' : isDark ? 'bg-gray-600' : 'bg-gray-200'
              }`}>
                <i className={`fas ${card.icon} ${expandedCard === card.id ? 'text-white' : isDark ? 'text-gray-300' : 'text-gray-600'}`}></i>
              </div>
              <h3 className={`text-lg font-medium ${expandedCard === card.id ? 'text-white' : ''}`}>
                {card.title}
              </h3>
              <div className="ml-auto">
                <i className={`fas fa-chevron-down transition-transform duration-300 ${
                  expandedCard === card.id ? 'transform rotate-180' : ''
                }`}></i>
              </div>
            </div>
            
            {/* 卡片内容 */}
            <AnimatePresence>
              {expandedCard === card.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {/* 交子内容 */}
                  <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <h4 className="font-medium text-blue-500">{card.jiaoziTitle}</h4>
                    </div>
                    <p className="text-sm opacity-80 pl-5">{card.jiaoziDescription}</p>
                  </div>
                  
                  {/* 比特币内容 */}
                  <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <h4 className="font-medium text-purple-500">{card.bitcoinTitle}</h4>
                    </div>
                    <p className="text-sm opacity-80 pl-5">{card.bitcoinDescription}</p>
                  </div>
                  
                  {/* 关键差异 */}
                  <div className={`p-4 ${isDark ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <div className="flex items-center mb-2">
                      <i className="fas fa-lightbulb text-green-500 mr-2"></i>
                      <h4 className="font-medium text-green-500">关键差异</h4>
                    </div>
                    <p className="text-sm pl-6">{card.keyDifference}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* 提示展开 */}
            {expandedCard !== card.id && (
              <div className="p-2 text-center">
                <span className="text-xs text-gray-400 cursor-pointer">点击查看详情</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* 使用说明 */}
      <div className={`mt-6 p-4 rounded-lg text-sm ${
        isDark ? 'bg-gray-800/50' : 'bg-gray-100'
      }`}>
        <p className="opacity-70">点击任意对比维度卡片，展开查看交子与比特币的详细对比信息</p>
      </div>
    </div>
  );
};

// 参考资料组件
interface Reference {
  title: string;
  author: string;
  year: string;
}

interface ReferencesProps {
  references: Reference[];
}

export const References: React.FC<ReferencesProps> = ({ references }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`p-6 rounded-2xl shadow-lg ${isDark ? 'bg-gray-800/50' : 'bg-white'}`}>
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <i className="fas fa-book mr-3 text-green-500"></i>
        参考资料
      </h3>
      
      <ul className="space-y-4">
        {references.map((ref, idx) => (
          <motion.li 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}
          >
            <span className="text-green-600 dark:text-green-400 font-medium">{idx + 1}.</span> 
            <span className="ml-2">《{ref.title}》</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">({ref.author}, {ref.year})</span>
          </motion.li>
        ))}
      </ul>
      
      <div className={`mt-6 p-4 rounded-lg text-center ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
        <p>由AI生成，并经本人核实</p>
      </div>
    </div>
  );
};