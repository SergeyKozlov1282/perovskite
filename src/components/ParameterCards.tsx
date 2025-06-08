import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Battery, Gauge, TrendingUp } from 'lucide-react';
import { SolarCellParams } from '../data/solarCellData';

interface ParameterCardsProps {
  params: SolarCellParams;
}

const ParameterCards: React.FC<ParameterCardsProps> = ({ params }) => {
  const cards = [
    {
      label: 'Voc (В)',
      value: params.voc,
      icon: Battery,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Jsc (мА/см²)',
      value: params.jsc,
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      label: 'FF (%)',
      value: params.ff,
      icon: Gauge,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      label: 'КПД (%)',
      value: params.eta,
      icon: TrendingUp,
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-200',
      highlight: true
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-xl border-2 ${card.bgColor} ${card.borderColor} ${
            card.highlight ? 'ring-2 ring-accent-200' : ''
          } card-hover`}
        >
          <div className="flex items-center justify-between mb-3">
            <card.icon className={`w-5 h-5 ${card.color}`} />
            {card.highlight && (
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
            )}
          </div>
          <p className="text-sm text-gray-600 mb-1">{card.label}</p>
          <motion.p 
            className={`text-2xl font-bold ${card.color}`}
            key={card.value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {card.value}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
};

export default ParameterCards;