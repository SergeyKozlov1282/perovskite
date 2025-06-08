import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface LayerStructureProps {
  perovskite: string;
  htl: string;
  onMaterialChange: (layerType: "perovskite" | "htl", material: string) => void;
}

const LayerStructure: React.FC<LayerStructureProps> = ({
  perovskite,
  htl,
  onMaterialChange,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const materials = {
    perovskite: [
      { value: "MAPbI3", label: "MAPbI₃ (Перовскит)", color: "bg-red-100" },
      { value: "CsPbI3", label: "CsPbI₃ (Перовскит)", color: "bg-red-200" },
    ],
    htl: [
      { value: "Spiro", label: "Spiro-OMeTAD", color: "bg-green-100" },
      { value: "PEDOT", label: "PEDOT:PSS", color: "bg-green-200" },
    ],
  };

  const getCurrentLabel = (type: "perovskite" | "htl", value: string) => {
    return materials[type].find((m) => m.value === value)?.label || value;
  };

  const handleLayerClick = (layerType: "perovskite" | "htl") => {
    setActiveMenu(activeMenu === layerType ? null : layerType);
  };

  const handleMaterialSelect = (
    layerType: "perovskite" | "htl",
    material: string
  ) => {
    onMaterialChange(layerType, material);
    setActiveMenu(null);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-2xl font-semibold mb-6 text-gray-700">
        Структура элемента
      </h3>

      <div className="space-y-3 text-center w-full max-w-sm relative">
        {/* Fixed layers */}
        <motion.div
          className="bg-gray-200 p-4 rounded-lg shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <span className="font-medium">Прозрачный электрод</span>
        </motion.div>

        <motion.div
          className="bg-blue-100 p-4 rounded-lg shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <span className="font-medium">TiO₂ (ЭТС)</span>
        </motion.div>

        {/* Interactive perovskite layer */}
        <div className="relative">
          <motion.div
            className={`p-4 rounded-lg shadow-sm cursor-pointer transition-all duration-200 ${
              materials.perovskite.find((m) => m.value === perovskite)?.color ||
              "bg-red-100"
            } ${activeMenu === "perovskite" ? "ring-2 ring-accent-500" : ""}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLayerClick("perovskite")}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="font-medium">
                {getCurrentLabel("perovskite", perovskite)}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  activeMenu === "perovskite" ? "rotate-180" : ""
                }`}
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {activeMenu === "perovskite" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border z-10"
              >
                {materials.perovskite.map((material) => (
                  <motion.div
                    key={material.value}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    onClick={() =>
                      handleMaterialSelect("perovskite", material.value)
                    }
                  >
                    {material.label}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive HTL layer */}
        <div className="relative">
          <motion.div
            className={`p-4 rounded-lg shadow-sm cursor-pointer transition-all duration-200 ${
              materials.htl.find((m) => m.value === htl)?.color ||
              "bg-green-100"
            } ${activeMenu === "htl" ? "ring-2 ring-accent-500" : ""}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLayerClick("htl")}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="font-medium">
                {getCurrentLabel("htl", htl)} (ДТС)
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  activeMenu === "htl" ? "rotate-180" : ""
                }`}
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {activeMenu === "htl" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border z-10"
              >
                {materials.htl.map((material) => (
                  <motion.div
                    key={material.value}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    onClick={() => handleMaterialSelect("htl", material.value)}
                  >
                    {material.label}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="bg-yellow-100 p-4 rounded-lg shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <span className="font-medium">Au (Тыльный электрод)</span>
        </motion.div>
      </div>

      <motion.p
        className="text-sm text-gray-500 mt-4 text-center"
        key={`${perovskite}_${htl}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Текущая конфигурация:{" "}
        <span className="font-semibold text-primary-600">
          Прозрачный электрод / TiO₂ /{" "}
          {perovskite === "MAPbI3" ? "MAPbI₃" : "CsPbI₃"} /{" "}
          {getCurrentLabel("htl", htl)} / Au
        </span>
      </motion.p>
    </motion.div>
  );
};

export default LayerStructure;
