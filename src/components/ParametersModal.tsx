import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { solarCellData } from "../data/solarCellData";

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
  const [activeTab, setActiveTab] = useState<"perovskite" | "htl">(
    "perovskite"
  );
  const [parameters, setParameters] = useState({
    perovskite: {
      thickness: 500,
      bandgap: 1.55,
      mobility: 2.0,
      doping: 1e16,
    },
    htl: {
      thickness: 200,
      bandgap: 2.8,
      mobility: 1e-4,
      doping: 1e19,
    },
  });

  useEffect(() => {
    const currentKey = `${perovskite}_${htl}` as keyof typeof solarCellData;
    const currentData = solarCellData[currentKey];
    if (currentData) {
      setParameters({
        perovskite: {
          thickness: currentData.params.thickness || 500,
          bandgap: currentData.params.bandgap || 1.55,
          mobility: currentData.params.mobility || 2.0,
          doping: currentData.params.doping || 1e16,
        },
        htl: {
          thickness: currentData.params.htlThickness || 200,
          bandgap: currentData.params.htlBandgap || 2.8,
          mobility: currentData.params.htlMobility || 1e-4,
          doping: currentData.params.htlDoping || 1e19,
        },
      });
    }
  }, [perovskite, htl]);

  const handleParameterChange = (
    layer: "perovskite" | "htl",
    param: string,
    value: number
  ) => {
    setParameters((prev) => ({
      ...prev,
      [layer]: {
        ...prev[layer],
        [param]: value,
      },
    }));
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
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab("perovskite")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "perovskite"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Перовскит
                </button>
                <button
                  onClick={() => setActiveTab("htl")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "htl"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  HTL
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(parameters[activeTab]).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleParameterChange(
                          activeTab,
                          key,
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ParametersModal;
