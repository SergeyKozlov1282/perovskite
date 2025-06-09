import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, ChevronDown, ChevronUp } from "lucide-react";
import Header from "./components/Header";
import LayerStructure from "./components/LayerStructure";
import ParameterCards from "./components/ParameterCards";
import ParametersModal from "./components/ParametersModal";
import Results from "./components/Results";
import { solarCellData, ConfigurationKey } from "./data/solarCellData";

const chartColors = [
  "#05336e", // ЛЭТИ Blue
  "#bb8d54", // ЛЭТИ Gold
  "#6d6e71", // ЛЭТИ Gray
  "#4CAF50",
  "#FFC107",
  "#E91E63",
];

function App() {
  const [perovskite, setPerovskite] = useState("MAPbI3");
  const [htl, setHtl] = useState("Spiro");
  const [selectedConfigurations, setSelectedConfigurations] = useState<
    string[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentKey = `${perovskite}_${htl}` as ConfigurationKey;
  const currentData = solarCellData[currentKey];

  const handleMaterialChange = (
    layerType: "perovskite" | "htl",
    material: string
  ) => {
    if (layerType === "perovskite") {
      setPerovskite(material);
    } else {
      setHtl(material);
    }
  };

  const handleConfigurationToggle = (config: string) => {
    setSelectedConfigurations((prev) =>
      prev.includes(config)
        ? prev.filter((c) => c !== config)
        : [...prev, config]
    );
  };

  const handleClearAll = () => {
    setSelectedConfigurations([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <motion.section
          id="explorer"
          className="scroll-mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-primary-600 mb-6 text-center">
              Исследование конфигураций перовскитных солнечных элементов
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-8 rounded-full"></div>
          </motion.div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <motion.p
              className="mb-8 text-center text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Используйте данный инструмент для анализа и сравнения
              электрофизических характеристик различных конфигураций
              перовскитных солнечных элементов. Кликните на слой в схеме, чтобы
              выбрать материал, обновить графики и ключевые показатели.
            </motion.p>

            <LayerStructure
              perovskite={perovskite}
              htl={htl}
              onMaterialChange={handleMaterialChange}
            />

            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:bg-gray-900 active:bg-black focus:outline-none transition-all duration-500 ease-in-out font-medium shadow-lg hover:shadow-2xl hover:shadow-gray-800/50"
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-5 h-5" />
                <span>Параметры слоёв</span>
              </motion.button>
            </motion.div>

            <ParameterCards params={currentData.params} />

            <div className="flex justify-center mb-6">
              <motion.button
                onClick={() => setShowResults(!showResults)}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:bg-gray-900 active:bg-black focus:outline-none transition-all duration-500 ease-in-out font-medium shadow-lg hover:shadow-2xl hover:shadow-gray-800/50"
                whileTap={{ scale: 0.95 }}
              >
                <span>
                  {showResults ? "Скрыть графики" : "Показать графики"}
                </span>
                {showResults ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </motion.button>
            </div>

            {showResults && (
              <Results
                results={{
                  jv: {
                    voltage: currentData.jv.v,
                    current: currentData.jv.j,
                  },
                  eqe: {
                    wavelength: currentData.qe.lambda,
                    efficiency: currentData.qe.qe,
                  },
                  pce: {
                    thickness: currentData.pce.thickness,
                    eta: currentData.pce.eta,
                  },
                  characteristics: {
                    voc: currentData.params.voc,
                    jsc: currentData.params.jsc,
                    ff: currentData.params.ff,
                    pce: currentData.params.pce,
                  },
                }}
                selectedConfigurations={selectedConfigurations}
                currentKey={currentKey}
              />
            )}
          </div>
        </motion.section>
      </main>

      <motion.footer
        className="bg-primary-500 text-white text-center p-6 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm">© 2024 СПбГЭТУ "ЛЭТИ". Все права защищены.</p>
      </motion.footer>

      <ParametersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        perovskite={perovskite}
        htl={htl}
      />
    </div>
  );
}

export default App;
