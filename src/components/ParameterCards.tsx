import React from "react";
import { motion } from "framer-motion";
import { Battery, Zap, Gauge, TrendingUp } from "lucide-react";

interface ParameterCardsProps {
  params: {
    voc: number;
    jsc: number;
    ff: number;
    pce: number;
  };
}

const ParameterCards: React.FC<ParameterCardsProps> = ({ params }) => {
  const cards = [
    {
      label: "Voc (В)",
      value: params.voc.toFixed(2),
      icon: Battery,
      color: "text-blue-600",
      hover: "hover:border-blue-600 hover:shadow-blue-100",
    },
    {
      label: "Jsc (мА/см²)",
      value: params.jsc.toFixed(2),
      icon: Zap,
      color: "text-purple-600",
      hover: "hover:border-purple-600 hover:shadow-purple-100",
    },
    {
      label: "FF (%)",
      value: `${(params.ff * 100).toFixed(1)}%`,
      icon: Gauge,
      color: "text-green-600",
      hover: "hover:border-green-600 hover:shadow-green-100",
    },
    {
      label: "КПД (%)",
      value: `${(params.pce * 100).toFixed(2)}%`,
      icon: TrendingUp,
      color: "text-yellow-600",
      hover: "hover:border-yellow-500 hover:shadow-yellow-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -8, boxShadow: "0 8px 32px 0 rgba(30,41,59,0.10)" }}
          className={`p-6 rounded-lg border border-gray-300 bg-white transition-shadow transition-transform duration-150 ease-out cursor-pointer ${card.hover}`}
        >
          <div className="flex items-center justify-between mb-3">
            <card.icon className={`w-5 h-5 ${card.color}`} />
          </div>
          <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
            {card.label}
          </p>
          <motion.p className={`text-2xl font-bold text-gray-900`}>
            {card.value}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
};

export default ParameterCards;
