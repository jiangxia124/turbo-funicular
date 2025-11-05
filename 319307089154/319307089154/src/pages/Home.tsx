import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { toast } from 'sonner';
import { 
  CreditCard, ChevronDown, ChevronUp, Share2, Clock, 
  Users, TrendingUp, Shield, Award, BookOpen, DollarSign, 
  AlertTriangle, CheckCircle, ArrowRight, Heart
} from 'lucide-react';
import { riskControlSystem } from '../mockData';

// 导入模拟数据
import { 
  crowdfundingData, 
  foodProjects, 
  returnTiers, 
  faqData, 
  riskAssessmentData, 
  successCasesData, 
  financialKnowledgeData,
  supportersData,
  financialServicesData,
  targetCalculationData,
  fundraisingPlanData
} from '../mockData';



// 自定义手风琴组件
const AccordionItem = ({ 
  question, 
  answer, 
  isOpen, 
  toggleOpen 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  toggleOpen: () => void; 
}) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-4 px-1 text-left font-medium text-gray-900 focus:outline-none"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-4 px-1 text-gray-600">{answer}</div>
      </motion.div>
    </div>
  );
};

// 自定义项目卡片组件 - 增加项目类型标识
const ProjectCard = ({ 
  project, 
  onOpenModal 
}: { 
  project: typeof foodProjects[0]; 
  onOpenModal: (project: typeof foodProjects[0]) => void; 
}) => {
  const progress = (project.currentAmount / project.targetAmount) * 100;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      {/* 项目类型标签 */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          project.type === '稳健型' 
            ? 'bg-blue-500 text-white' 
            : 'bg-purple-500 text-white'
        }`}>
          {project.type}
        </span>
      </div>
      
      <div 
        className="h-48 bg-cover bg-center cursor-pointer relative" 
        style={{ backgroundImage: `url(${project.image})` }}
        onClick={() => onOpenModal(project)}
      />
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        
        {/* 风险和回报信息 */}
        <div className="flex justify-between mb-3 text-sm">
          <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full">
            风险: {project.riskLevel}
          </span>
          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full">
            {project.expectedReturn}
          </span>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">已筹: ¥{project.currentAmount.toLocaleString()}</span>
            <span className="font-medium">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        

        
        <button 
          onClick={() => onOpenModal(project)}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
        >
          查看详情
        </button>
      </div>
    </motion.div>
  );
};

// 自定义项目详情弹窗组件
const ProjectModal = ({ 
  project, 
  onClose 
}: { 
  project: typeof foodProjects[0] | null; 
  onClose: () => void; 
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="relative h-64">
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-3">{project.name}</h2>
          <p className="text-gray-600 mb-6">{project.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">项目故事</h3>
            <p className="text-gray-700">{project.story}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">资金用途明细</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">用途</th>
                    <th className="py-2 px-4 text-right">金额(元)</th>
                    <th className="py-2 px-4 text-right">占比</th>
                  </tr>
                </thead>
                <tbody>
                  {project.fundUsage.map((item, index) => {
                    const percentage = (item.amount / project.targetAmount) * 100;
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2 px-4">{item.name}</td>
                        <td className="py-2 px-4 text-right">{item.amount.toLocaleString()}</td>
                        <td className="py-2 px-4 text-right">{percentage.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-gray-100 font-medium">
                    <td className="py-2 px-4">总计</td>
                    <td className="py-2 px-4 text-right">{project.targetAmount.toLocaleString()}</td>
                    <td className="py-2 px-4 text-right">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">风险说明与应对措施</h3>
            <div className="space-y-3">
              {project.risks.map((risk, index) => (
                <div key={index} className="bg-yellow-50 p-3 rounded-lg">
                  <p className="font-medium text-yellow-800">{risk.type}</p>
                  <p className="text-sm text-yellow-700 mt-1">风险描述: {risk.description}</p>
                  <p className="text-sm text-green-700 mt-1">应对措施: {risk.measure}</p>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            支持此项目
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// 投资回报计算器组件 - 增强版
const ReturnCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [selectedTier, setSelectedTier] = useState<typeof returnTiers[0] | null>(null);

  useEffect(() => {
    const amount = parseFloat(investment);
    if (!isNaN(amount)) {
      // 找到最接近但不超过投资金额的回报方案
      let closestTier = returnTiers[0];
      for (const tier of returnTiers) {
        if (tier.amount <= amount && tier.amount > closestTier.amount) {
          closestTier = tier;
        }
      }
      setSelectedTier(closestTier);
    } else {
      setSelectedTier(null);
    }
  }, [investment]);

  // 计算预计总收益
  const calculateTotalReturn = () => {
    if (!selectedTier || !investment) return 0;
    const investmentAmount = parseFloat(investment);
    // 基础收益率：美食券价值/投资金额
    return (selectedTier.foodCouponValue / investmentAmount) * 100;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">投资回报计算器</h3>
      
      <div className="mb-4">
        <label htmlFor="investment" className="block text-sm font-medium text-gray-700 mb-1">
          输入投资金额(元)
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">¥</span>
          <input
            type="number"
            id="investment"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入投资金额"
            min="0"
            step="1"
          />
        </div>
      </div>
      
      {selectedTier && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-blue-800 mb-2">
            您将获得 {selectedTier.amount} 元档回报
          </h4>
          
          {/* 收益组合分析 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-xs text-gray-500">美食券价值</div>
              <div className="text-lg font-bold text-blue-700">¥{selectedTier.foodCouponValue}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-xs text-gray-500">优先体验权</div>
              <div className="text-lg font-bold text-blue-700">{selectedTier.priorityExperience}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-xs text-gray-500">定制纪念品</div>
              <div className="text-lg font-bold text-blue-700">{selectedTier.souvenir}</div>
            </div>
          </div>
          
          {/* 预计收益率 */}
          <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">预计总收益率</div>
              <div className="text-xl font-bold text-green-600">{calculateTotalReturn().toFixed(1)}%</div>
            </div>
          </div>
          
          <ul className="space-y-2">
            {selectedTier.rewards.map((reward, index) => (
              <li key={index} className="flex items-center text-blue-700">
                <CheckCircle size={16} className="mr-2 text-green-500" />
                {reward}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {returnTiers.map((tier) => (
          <button
            key={tier.amount}
            onClick={() => setInvestment(tier.amount.toString())}
            className={`py-2 px-3 border rounded-lg transition-colors ${
              selectedTier?.amount === tier.amount
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            ¥{tier.amount}
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => {
          if (investment) {
            toast.success('感谢您的支持！我们将引导您完成支付流程。');
          } else {
            toast.error('请先输入投资金额');
          }
        }}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        立即支持
      </button>
    </div>
  );
};

// 主页面组件
export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof foodProjects[0] | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 监听滚动事件，更新进度条
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 计算总体众筹进度
  const overallProgress = (crowdfundingData.currentAmount / crowdfundingData.totalTarget) * 100;

  // 饼图数据
  const pieData = crowdfundingData.costBreakdown;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 滚动进度条 */}
      <div 
        className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* 头部区域 */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
              <h1 className="text-3xl md:text-5xl font-bold mb-4">以金融思维打造校园美食盛宴</h1>
              <p className="text-xl md:text-2xl opacity-90 mb-2">贵州大学美食节众筹企划</p>
              <p className="text-lg md:text-xl opacity-80 mb-1">课程 :AI+数字金融</p>
              <p className="text-lg md:text-xl opacity-80 mb-8">分享人名字：姜佶颖</p>
              
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="text-4xl md:text-5xl font-bold">
                      ¥{crowdfundingData.currentAmount.toLocaleString()}
                    </div>
                    <div className="text-sm opacity-90">已筹金额 / 目标 ¥{crowdfundingData.totalTarget.toLocaleString()}</div>
                  </div>
                  
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-3 mb-4">
                    <div 
                      className="bg-yellow-400 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${overallProgress}%` }}
                    ></div>
                  </div>
                  

                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {crowdfundingData.stages.map((stage, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold">{stage.name}</div>
                        <div className="text-sm opacity-80">
                          ¥{stage.current.toLocaleString()} / ¥{stage.target.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <ReturnCalculator />
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="relative h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={40}
                        fill="#8884d8"
                        dataKey="percentage"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-white font-bold text-lg">资金分配</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>
      
      {/* 主要内容区域 */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          {/* 零资金启动方案 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <DollarSign className="inline-block mr-2" /> 零资金启动方案
          </h2>
          
          {/* 众筹方案设计 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 text-sm">1</span>
              众筹方案设计
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fundraisingPlanData.plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h4 className="text-lg font-bold mb-2">{plan.name}</h4>
                  <p className="text-sm text-gray-500 mb-3">目标受众: {plan.targetAudience}</p>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2 text-sm">参与档位:</h5>
                    <div className="space-y-2">
                      {plan.tiers.map((tier, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm">¥{tier.amount}</span>
                          <span className="text-sm text-gray-600">{tier.reward}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">预期筹集: ¥{plan.expectedRaise}</span>
                    <span className="text-xs text-gray-500">占总目标: {((plan.expectedRaise / crowdfundingData.totalTarget) * 100).toFixed(1)}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* 资源盘点与整合 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 text-sm">2</span>
              资源盘点与整合
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fundraisingPlanData.resources.map((category, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h4 className="text-lg font-bold mb-4">{category.category}</h4>
                  <ul className="space-y-4">
                    {category.items.map((item, idx) => (
                      <li key={idx}>
                        <div className="font-medium mb-1">{item.name}</div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* 分阶段执行计划 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 text-sm">3</span>
              分阶段执行计划
            </h3>
            
            <div className="space-y-6">
              {fundraisingPlanData.timeline.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <h4 className="text-lg font-bold">{phase.phase}</h4>
                    </div>
                    <div className="md:ml-auto flex items-center">
                      <Clock size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm text-gray-500">{phase.period}</span>
                      <div className="mx-4 h-4 border-r border-gray-200"></div>
                      <DollarSign size={16} className="text-green-500 mr-2" />
                      <span className="font-medium">目标: ¥{phase.targetRaise}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold mb-3 text-gray-700">阶段目标</h5>
                      <ul className="space-y-2">
                        {phase.goals.map((goal, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-3 text-gray-700">核心活动</h5>
                      <ul className="space-y-2">
                        {phase.keyActivities.map((activity, idx) => (
                          <li key={idx} className="flex items-start">
                            <ArrowRight size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* 风险预案与备选方案 */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 text-sm">4</span>
              风险预案与备选方案
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fundraisingPlanData.riskPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`bg-white rounded-xl shadow-lg p-6 border-t-4 ${
                    index === 0 ? 'border-red-500' : index === 1 ? 'border-yellow-500' : 'border-green-500'
                  }`}
                >
                  <h4 className="text-lg font-bold mb-2">
                    {index === 0 ? '最差情况' : index === 1 ? '一般情况' : '理想情况'}
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">{plan.scenario}</p>
                  <h5 className="font-semibold mb-2">{plan.plan}</h5>
                  <ul className="space-y-2">
                    {plan.measures.map((measure, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle size={14} className={`mt-1 mr-2 flex-shrink-0 ${
                          index === 0 ? 'text-red-500' : index === 1 ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                        <span className="text-gray-600">{measure}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 金融化运营框架 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <DollarSign className="inline-block mr-2" /> 美食节金融化运营框架
          </h2>
          
          {/* 双轨制美食项目体系 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 text-sm">1</span>
              "双轨制"美食项目体系
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* 稳健型项目 */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    <i className="fas fa-shield-alt text-lg"></i>
                  </div>
                  <h4 className="text-lg font-bold">稳健型项目 (60%资金)</h4>
                </div>
                <p className="text-gray-600 mb-4">传统美食摊位，低风险固定回报模式，适合风险偏好较低的投资者。</p>
                
                <div className="space-y-3">
                  {foodProjects.filter(project => project.type === '稳健型').map(project => (
                    <div key={project.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span>{project.name}</span>
                      <span className="font-medium">{project.expectedReturn}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 创新型项目 */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                    <i className="fas fa-rocket text-lg"></i>
                  </div>
                  <h4 className="text-lg font-bold">创新型项目 (40%资金)</h4>
                </div>
                <p className="text-gray-600 mb-4">创意融合美食，高风险高回报模式，适合风险偏好较高的投资者。</p>
                
                <div className="space-y-3">
                  {foodProjects.filter(project => project.type === '创新型').map(project => (
                    <div key={project.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span>{project.name}</span>
                      <span className="font-medium">{project.expectedReturn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* 投资回报计算器 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 text-sm">2</span>
              投资回报计算器
            </h3>
            <ReturnCalculator />
          </div>
          
          {/* 三级风险防控体系 */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2 text-sm">3</span>
              三级风险防控体系
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {riskControlSystem.map((system, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500"
                >
                  <h4 className="text-lg font-bold mb-3">{system.level}: {system.name}</h4>
                  <p className="text-gray-600 mb-4">{system.description}</p>
                  <ul className="space-y-2">
                    {system.measures.map((measure, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{measure}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 美食项目展示 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <Heart className="inline-block mr-2" /> 美食项目详情
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpenModal={setSelectedProject} />
            ))}
          </div>
        </section>
        

        
        {/* 数据可视化 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <TrendingUp className="inline-block mr-2" /> 众筹数据
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">众筹趋势</h3>
               <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={crowdfundingData.timelineData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => `¥${value}`} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                {crowdfundingData.currentAmount === 0 && (
                  <div className="absolute text-center text-gray-500">
                    <p>众筹活动尚未开始，请持续关注</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">众筹健康度指标</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">参与率</span>
                    <span className="font-medium">{Math.round(crowdfundingData.healthMetrics.participationRate * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full" 
                      style={{ width: `${crowdfundingData.healthMetrics.participationRate * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">平均投资金额</span>
                    <span className="font-medium">¥{crowdfundingData.healthMetrics.avgInvestment}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full" 
                      style={{ width: `${(crowdfundingData.healthMetrics.avgInvestment / 500) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">传播系数</span>
                    <span className="font-medium">{crowdfundingData.healthMetrics.viralCoefficient}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-purple-500 h-3 rounded-full" 
                      style={{ width: `${(crowdfundingData.healthMetrics.viralCoefficient / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 风险评估 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <AlertTriangle className="inline-block mr-2" /> 风险评估
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500"
            >
              <h3 className="text-xl font-bold mb-3">市场风险</h3>
              <p className="text-gray-600 mb-4">{riskAssessmentData.market.description}</p>
              <ul className="space-y-2">
                {riskAssessmentData.market.measures.map((measure, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{measure}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500"
            >
              <h3 className="text-xl font-bold mb-3">运营风险</h3>
              <p className="text-gray-600 mb-4">{riskAssessmentData.operation.description}</p>
              <ul className="space-y-2">
                {riskAssessmentData.operation.measures.map((measure, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{measure}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500"
            >
              <h3 className="text-xl font-bold mb-3">财务风险</h3>
              <p className="text-gray-600 mb-4">{riskAssessmentData.financial.description}</p>
              <ul className="space-y-2">
                {riskAssessmentData.financial.measures.map((measure, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{measure}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
        
        {/* 成功案例 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <Award className="inline-block mr-2" /> 成功案例
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">活动名称</th>
                  <th className="py-3 px-4 text-left">年份</th>
                  <th className="py-3 px-4 text-right">目标金额</th>
                  <th className="py-3 px-4 text-right">筹集金额</th>
                  <th className="py-3 px-4 text-right">完成率</th>
                  <th className="py-3 px-4 text-right">投资回报率</th>
                </tr>
              </thead>
              <tbody>
                {successCasesData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.year}</td>
                    <td className="py-3 px-4 text-right">¥{item.target.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">¥{item.raised.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-green-600 font-medium">{item.completionRate}%</td>
                    <td className="py-3 px-4 text-right text-green-600 font-medium">{item.roi}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        
        {/* 目标金额测算依据 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <DollarSign className="inline-block mr-2" /> 目标金额测算依据
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">成本明细</h3>
              <div className="space-y-3">
                {targetCalculationData.breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.basis}</div>
                    </div>
                    <div className="font-bold">¥{item.amount.toLocaleString()}</div>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2 font-bold text-lg">
                  <div>总计</div>
                  <div>¥{targetCalculationData.total.toLocaleString()}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">预期数据</h3>
              <div className="space-y-4">
                {targetCalculationData.projections.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-medium">
                        {item.name.includes('金额') || item.name.includes('收入') || item.name.includes('支出') 
                          ? `¥${item.value.toLocaleString()}` 
                          : item.name.includes('率') 
                            ? `${item.value}%` 
                            : item.value}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{item.basis}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* 金融服务中心 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <CreditCard className="inline-block mr-2" /> 金融服务中心
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financialServicesData.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-sm text-gray-500">{service.details}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* 金融知识小课堂 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <BookOpen className="inline-block mr-2" /> 金融知识小课堂
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {financialKnowledgeData.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-gray-100 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <h3 className="font-bold text-blue-700 mb-1">{item.term}</h3>
                  <p className="text-gray-600 text-sm">{item.definition}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
         {/* 支持者名单 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <Users className="inline-block mr-2" /> 支持者名单
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            {supportersData.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <p>目前暂无支持者，成为第一个支持者吧！</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left">支持者</th>
                      <th className="py-3 px-4 text-right">支持金额</th>
                      <th className="py-3 px-4 text-right">支持时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supportersData.map((supporter) => (
                      <tr key={supporter.id} className="border-t border-gray-100">
                        <td className="py-3 px-4">{supporter.name}</td>
                        <td className="py-3 px-4 text-right font-medium">¥{supporter.amount}</td>
                        <td className="py-3 px-4 text-right text-gray-500">{supporter.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
        
        {/* FAQ区域 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <Shield className="inline-block mr-2" /> 常见问题
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFaqIndex === index}
                toggleOpen={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              />
            ))}
          </div>
        </section>
        
        {/* 社交媒体分享 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <Share2 className="inline-block mr-2" /> 分享活动
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="mb-6 text-gray-600">
              请分享本活动给您的朋友，一起参与贵州大学美食节众筹！
            </p>
            
            <div className="flex justify-center space-x-4 mb-6">
              <button className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                <i className="fab fa-weixin text-xl"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                <i className="fab fa-weibo text-xl"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                <i className="fab fa-qq text-xl"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                <i className="fas fa-link text-xl"></i>
              </button>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-gray-500 text-sm">二维码</span>
              </div>
              <p className="text-sm text-gray-500">扫描二维码分享活动</p>
            </div>
          </div>
        </section>
        
        {/* 众筹大使招募 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <Users className="inline-block mr-2" /> 众筹大使招募
          </h2>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold mb-4">成为众筹大使，获得额外奖励！</h3>
                <p className="mb-6 opacity-90">
                  我们正在招募众筹大使，帮助我们宣传美食节众筹活动。作为众筹大使，您将获得额外的推广奖励和优先参与权。
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                    <span>每成功推荐一位支持者，可获得其支持金额5%的奖励</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                    <span>推荐支持者累计达到10人，可获得VIP体验资格</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={18} className="text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                    <span>推荐金额累计达到5000元，可获得与主办方共同策划下一届活动的机会</span>
                  </li>
                </ul>
                <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                  立即申请 <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 max-w-xs w-full">
                  <h4 className="text-lg font-bold mb-4 text-center">大使申请表</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1">姓名</label>
                      <input type="text" className="w-full px-3 py-2 bg-white bg-opacity-30 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-white placeholder-opacity-50" placeholder="请输入姓名" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">联系方式</label><input type="tel" className="w-full px-3 py-2 bg-white bg-opacity-30 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-white placeholder-opacity-50" placeholder="请输入手机号码" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">电子邮箱</label>
                      <input type="email" className="w-full px-3 py-2 bg-white bg-opacity-30 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-white placeholder-opacity-50" placeholder="请输入电子邮箱" />
                    </div>
                    <button className="w-full bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
                      提交申请
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 底部行动号召 */}
        <section className="text-center">
           <h2 className="text-2xl md:text-3xl font-bold mb-6">
  立即参与贵州大学美食节众筹！
</h2>
<p className="text-gray-600 mb-8 max-w-2xl mx-auto">
  美食节将于12月4日举办，目前我们正在紧张筹备中。您的每一份支持，都将帮助我们打造一场难忘的美食盛宴，展示贵州饮食文化的魅力。
  让我们一起用金融思维，共创校园美食文化新体验！
</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
              立即支持
            </button>
            <button className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-8 rounded-lg transition-colors text-lg border border-blue-600">
              了解更多
            </button>
          </div>
        </section>
      </main>
      
      {/* 页脚区域 */}
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">贵州大学美食节</h3>
               <p className="text-gray-400">
  以金融思维打造的校园美食文化盛宴，将于12月4日举办，展示贵州饮食文化魅力。
</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">快速链接</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">项目详情</a></li>
                <li><a href="#" className="hover:text-white transition-colors">常见问题</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">联系方式</h3>
              <ul className="space-y-2 text-gray-400">
                <li>贵州大学</li>
                <li>电话：0851-12345678</li>
                <li>邮箱：foodfest@guizhou.edu.cn</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">关注我们</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <i className="fab fa-weixin"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                  <i className="fab fa-weibo"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                  <i className="fab fa-qq"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} 贵州大学美食节众筹项目. 保留所有权利.</p>
          </div>
        </div>
      </footer>
      
      {/* 项目详情弹窗 */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}