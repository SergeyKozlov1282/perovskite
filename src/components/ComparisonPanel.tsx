import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

interface ComparisonPanelProps {
  selectedConfigurations: string[];
  onConfigurationToggle: (config: string) => void;
  onClearAll: () => void;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  selectedConfigurations,
  onConfigurationToggle,
  onClearAll
}) => {
  const configurations = [
    { key: 'MAPbI3_Spiro', label: 'MAPbI₃ / Spiro-OMeTAD' },
    { key: 'CsPbI3_Spiro', label: 'CsPbI₃ / Spiro-OMeTAD' },
    { key: 'MAPbI3_PEDOT', label: 'MAPbI₃ / PEDOT:PSS' },
    { key: 'CsPbI3_PEDOT', label: 'CsPbI₃ / PEDOT:PSS' }
  ];

  return (
    <motion.div 
      className="mt-12 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-inner border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
        Добавить для сравнения
      </h3>
      <p className="mb-6 text-sm text-gray-600">
        Выберите дополнительные конфигурации для отображения их кривых на графиках.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {configurations.map((config, index) => (
          <motion.label
            key={config.key}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={selectedConfigurations.includes(config.key)}
              onChange={() => onConfigurationToggle(config.key)}
              className="w-5 h-5 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
            />
            <span className="text-gray-700 font-medium">{config.label}</span>
          </motion.label>
        ))}
      </div>
      
      <div className="text-center">
        <motion.button
          onClick={onClearAll}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Очистить сравнение</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ComparisonPanel;