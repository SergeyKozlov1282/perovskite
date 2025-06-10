import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { solarCellData } from "../data/solarCellData";
import {
  materialProperties,
  defectProperties,
} from "../data/materialProperties";

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
  htl,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const currentConfigData =
    solarCellData[(perovskite + "_" + htl) as keyof typeof solarCellData];

  const parametersOrder = [
    "Толщина (мкм)",
    "Ширина запрещенной зоны, Eg (эВ)",
    "Электронное сродство, χ (эВ)",
    "Относительная диэлектрическая проницаемость, εr",
    "Эффективная плотность состояний в зоне проводимости, Nc (см⁻³)",
    "Эффективная плотность состояний в валентной зоне, Nv (см⁻³)",
    "Подвижность электронов, μn (см²·В⁻¹·с⁻¹)",
    "Подвижность дырок, μp (см²·В⁻¹·с⁻¹)",
    "Концентрация акцепторов, NA (см⁻³)",
    "Концентрация доноров, ND (см⁻³)",
    "Концентрация дефектов, nt (см⁻³)",
  ];

  const getParameterValue = (material: string, paramName: string) => {
    if (paramName === "Толщина (мкм)" && currentConfigData) {
      const thicknessKey =
        material === "TiO2"
          ? "TiO2"
          : material === "MAPbI3"
          ? "MAPbI3"
          : material === "CsPbI3"
          ? "CsPbI3"
          : htl === "Spiro"
          ? "Spiro"
          : "PEDOT";
      return currentConfigData.chosenThickness[thicknessKey];
    }
    return materialProperties[material as keyof typeof materialProperties]?.[
      paramName
    ];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Параметры слоёв
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-gray-700">
                  Физические параметры слоёв
                </h4>
                <div className="overflow-x-hidden">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Параметр
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          TiO₂
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          {perovskite}
                        </th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          {htl === "Spiro" ? "Spiro-OMeTAD" : "PEDOT:PSS"}
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
                            {getParameterValue("TiO2", paramName)}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {getParameterValue(
                              perovskite as keyof typeof materialProperties,
                              paramName
                            )}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {getParameterValue(
                              (htl === "Spiro"
                                ? "Spiro"
                                : "PEDOT") as keyof typeof materialProperties,
                              paramName
                            )}
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
