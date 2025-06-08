import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { materialProperties, defectProperties } from '../data/materialProperties';
import { solarCellData } from '../data/solarCellData';

interface ParametersModalProps {
  isOpen: boolean;
  onClose: () => void;
  perovskite: string;
  htl: string;
}

const ParametersModal: React.FC<ParametersModalProps> = ({
  isOpen,
  onClose,
  perovskite,
  htl
}) => {
  const currentConfigData = solarCellData[`${perovskite}_${htl}`];
  
  const parametersOrder = [
    'Толщина (мкм)',
    'Ширина запрещенной зоны, Eg (эВ)',
    'Электронное сродство, χ (эВ)',
    'Относительная диэлектрическая проницаемость, εr',
    'Эффективная плотность состояний в зоне проводимости, Nc (см⁻³)',
    'Эффективная плотность состояний в валентной зоне, Nv (см⁻³)',
    'Подвижность электронов, μn (см²∙В⁻¹∙с⁻¹)',
    'Подвижность дырок, μp (см²∙В⁻¹∙с⁻¹)',
    'Концентрация акцепторов, NA (см⁻³)',
    'Концентрация доноров, ND (см⁻³)'
  ];

  const getParameterValue = (material: string, paramName: string) => {
    if (paramName === 'Толщина (мкм)' && currentConfigData) {
      const thicknessKey = material === 'TiO2' ? 'TiO2' : 
                          material === 'MAPbI3' ? 'MAPbI3' :
                          material === 'CsPbI3' ? 'CsPbI3' :
                          htl === 'Spiro' ? 'Spiro' : 'PEDOT';
      return currentConfigData.chosenThickness[thicknessKey];
    }
    return materialProperties[material]?.[paramName];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-primary-600">
                  Параметры выбранной конфигурации
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Physical parameters table */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-gray-700">
                  Физические параметры слоёв
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Параметр
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          ЭТС (TiO₂)
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Перовскит
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          ДТС
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {parametersOrder.map((paramName, index) => (
                        <motion.tr
                          key={paramName}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="border border-gray-300 p-3 font-medium">
                            {paramName}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {getParameterValue('TiO2', paramName)}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {getParameterValue(perovskite, paramName)}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {getParameterValue(htl === 'Spiro' ? 'Spiro' : 'PEDOT', paramName)}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Defects table */}
              <div>
                <h4 className="text-xl font-semibold mb-4 text-gray-700">
                  Параметры дефектов (поглощающий слой и интерфейсы)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Дефект
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Локализация
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Плотность (см⁻³)
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          σₙ (см²)
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          σₚ (см²)
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Тип
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Eₜ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {defectProperties.map((defect, index) => (
                        <motion.tr
                          key={defect.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="border border-gray-300 p-3 font-medium">
                            {defect.name}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {defect.location}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {defect.density}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {defect.sigma_n}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {defect.sigma_p}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {defect.type}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {defect.et}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ParametersModal;