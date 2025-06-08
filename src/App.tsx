import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import Header from "./components/Header";
import LayerStructure from "./components/LayerStructure";
import ParameterCards from "./components/ParameterCards";
import ChartComponent from "./components/ChartComponent";
import ComparisonPanel from "./components/ComparisonPanel";
import ParametersModal from "./components/ParametersModal";
import { solarCellData } from "./data/solarCellData";

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

  const currentKey = `${perovskite}_${htl}`;
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

  const createChartData = (type: "jv" | "qe" | "pce") => {
    const datasets = [];
    let colorIndex = 0;

    // Primary dataset
    const primaryData = currentData[type];
    datasets.push({
      label: `Основная (${perovskite}/${htl})`,
      data:
        type === "jv"
          ? primaryData.j
          : type === "qe"
          ? primaryData.qe
          : primaryData.eta,
      borderColor: chartColors[colorIndex],
      backgroundColor: chartColors[colorIndex].replace(")", ", 0.1)"),
      fill: false,
      borderWidth: 2,
      tension: 0.1,
    });
    colorIndex++;

    // Comparison datasets
    selectedConfigurations.forEach((config) => {
      if (config !== currentKey) {
        const compData = solarCellData[config];
        if (compData) {
          const [compPerovskite, compHtl] = config.split("_");
          datasets.push({
            label: `Сравнение (${compPerovskite}/${compHtl})`,
            data:
              type === "jv"
                ? compData[type].j
                : type === "qe"
                ? compData[type].qe
                : compData[type].eta,
            borderColor: chartColors[colorIndex % chartColors.length],
            backgroundColor: chartColors[
              colorIndex % chartColors.length
            ].replace(")", ", 0.1)"),
            fill: false,
            borderDash: [5, 5],
            borderWidth: 2,
            tension: 0.1,
          });
          colorIndex++;
        }
      }
    });

    return {
      labels:
        type === "jv"
          ? primaryData.v.map((v) => v.toFixed(2))
          : type === "qe"
          ? primaryData.lambda
          : primaryData.thickness,
      datasets,
    };
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
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:bg-gray-900 active:bg-black focus:outline-none transition-colors font-medium shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-5 h-5" />
                <span>Параметры слоёв</span>
              </motion.button>
            </motion.div>

            <ParameterCards params={currentData.params} />

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ChartComponent
                  title="Вольт-амперная характеристика"
                  data={createChartData("jv")}
                  height={350}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ChartComponent
                  title="Квантовая эффективность"
                  data={createChartData("qe")}
                  height={350}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ChartComponent
                title="Влияние толщины на КПД"
                data={createChartData("pce")}
                height={400}
              />
            </motion.div>

            <ComparisonPanel
              selectedConfigurations={selectedConfigurations}
              onConfigurationToggle={handleConfigurationToggle}
              onClearAll={handleClearAll}
            />
          </div>
        </motion.section>
      </main>

      <motion.footer
        className="bg-primary-500 text-white text-center p-6 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm">
          © 2025 С.В. Козлов, СПбГЭТУ «ЛЭТИ». Все права защищены.
        </p>
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
