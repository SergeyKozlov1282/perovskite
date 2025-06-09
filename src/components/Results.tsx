import React, { useState } from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { solarCellData, ConfigurationKey } from "../data/solarCellData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ResultsProps {
  results: {
    jv: {
      voltage: number[];
      current: number[];
    };
    eqe: {
      wavelength: number[];
      efficiency: number[];
    };
    pce: {
      thickness: number[];
      eta: number[];
    };
    characteristics: {
      voc: number;
      jsc: number;
      ff: number;
      pce: number;
    };
  };
  selectedConfigurations: string[];
  currentKey: string;
}

const chartColors = [
  "rgb(75, 192, 192)", // Основной цвет
  "rgb(255, 99, 132)", // Красный
  "rgb(54, 162, 235)", // Синий
  "rgb(255, 206, 86)", // Желтый
];

export const Results: React.FC<ResultsProps> = ({
  results,
  selectedConfigurations: initialSelectedConfigurations,
  currentKey,
}) => {
  const [selectedConfigurations, setSelectedConfigurations] = useState<
    string[]
  >(initialSelectedConfigurations || []);

  const getColorForConfig = (config: string) => {
    if (config === currentKey) {
      return "#2563eb"; // Цвет для текущей конфигурации
    }
    const index = selectedConfigurations.indexOf(config);
    return chartColors[index % chartColors.length];
  };

  const jvData = {
    labels: results.jv.voltage.map((v) => v.toFixed(2)),
    datasets: [
      {
        label: "Текущая конфигурация",
        data: results.jv.current,
        borderColor: getColorForConfig(currentKey),
        pointBackgroundColor: getColorForConfig(currentKey),
        pointRadius: 4,
        pointHoverRadius: 7,
        borderWidth: 3,
        tension: 0.5,
      },
      ...selectedConfigurations
        .filter((config) => config !== currentKey)
        .map((config) => ({
          label: config.replace("_", " / "),
          data: solarCellData[config as ConfigurationKey].jv.j,
          borderColor: getColorForConfig(config),
          pointBackgroundColor: getColorForConfig(config),
          pointRadius: 3,
          pointHoverRadius: 6,
          borderWidth: 2,
          tension: 0.5,
        })),
    ],
  };

  const eqeData = {
    labels: results.eqe.wavelength.map((w) => w.toFixed(0)),
    datasets: [
      {
        label: "Текущая конфигурация",
        data: results.eqe.efficiency,
        borderColor: getColorForConfig(currentKey),
        pointBackgroundColor: getColorForConfig(currentKey),
        pointRadius: 4,
        pointHoverRadius: 7,
        borderWidth: 3,
        tension: 0.5,
      },
      ...selectedConfigurations
        .filter((config) => config !== currentKey)
        .map((config) => ({
          label: config.replace("_", " / "),
          data: solarCellData[config as ConfigurationKey].qe.qe,
          borderColor: getColorForConfig(config),
          pointBackgroundColor: getColorForConfig(config),
          pointRadius: 3,
          pointHoverRadius: 6,
          borderWidth: 2,
          tension: 0.5,
        })),
    ],
  };

  const pceData = {
    labels: results.pce.thickness.map((t) => t.toFixed(1)),
    datasets: [
      {
        label: "Текущая конфигурация",
        data: results.pce.eta,
        borderColor: getColorForConfig(currentKey),
        pointBackgroundColor: getColorForConfig(currentKey),
        pointRadius: 4,
        pointHoverRadius: 7,
        borderWidth: 3,
        tension: 0.5,
      },
      ...selectedConfigurations
        .filter((config) => config !== currentKey)
        .map((config) => ({
          label: config.replace("_", " / "),
          data: solarCellData[config as ConfigurationKey].pce.eta,
          borderColor: getColorForConfig(config),
          pointBackgroundColor: getColorForConfig(config),
          pointRadius: 3,
          pointHoverRadius: 6,
          borderWidth: 2,
          tension: 0.5,
        })),
    ],
  };

  const baseGrid = {
    color: "rgba(0,0,0,0.07)",
    borderDash: [4, 4],
    drawBorder: false,
  };

  const jvOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 18,
          boxHeight: 3,
          font: { size: 14 },
          padding: 18,
        },
      },
      title: {
        display: true,
        text: "Вольт-амперная характеристика",
        font: { size: 18, weight: "bold" as const },
        color: "#222",
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#222",
        bodyColor: "#222",
        borderColor: "#2563eb",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
      animation: {
        duration: 1200,
        easing: "easeInOutQuart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Напряжение (V)",
          font: { size: 14 },
        },
        grid: baseGrid,
      },
      y: {
        title: {
          display: true,
          text: "Плотность тока (mA/cm²)",
          font: { size: 14 },
        },
        grid: baseGrid,
      },
    },
  };

  const eqeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 18,
          boxHeight: 3,
          font: { size: 14 },
          padding: 18,
        },
      },
      title: {
        display: true,
        text: "Внешний квантовый выход",
        font: { size: 18, weight: "bold" as const },
        color: "#222",
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#222",
        bodyColor: "#222",
        borderColor: "#059669",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
      animation: {
        duration: 1200,
        easing: "easeInOutQuart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Длина волны (нм)",
          font: { size: 14 },
        },
        grid: baseGrid,
      },
      y: {
        title: {
          display: true,
          text: "Эффективность (%)",
          font: { size: 14 },
        },
        min: 0,
        max: 100,
        grid: baseGrid,
      },
    },
  };

  const pceOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 18,
          boxHeight: 3,
          font: { size: 14 },
          padding: 18,
        },
      },
      title: {
        display: true,
        text: "Зависимость эффективности от толщины",
        font: { size: 18, weight: "bold" as const },
        color: "#222",
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#222",
        bodyColor: "#222",
        borderColor: "#f59e42",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
      animation: {
        duration: 1200,
        easing: "easeInOutQuart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Толщина (мкм)",
          font: { size: 14 },
        },
        grid: baseGrid,
      },
      y: {
        title: {
          display: true,
          text: "Эффективность (%)",
          font: { size: 14 },
        },
        grid: baseGrid,
      },
    },
  };

  const handleConfigSelect = (config: string) => {
    if (config === currentKey) return; // Prevent selecting current configuration
    if (selectedConfigurations.includes(config)) {
      setSelectedConfigurations(
        selectedConfigurations.filter((c) => c !== config)
      );
    } else {
      setSelectedConfigurations([...selectedConfigurations, config]);
    }
  };

  const handleClearAll = () => {
    setSelectedConfigurations([]);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "MAPbI3_Spiro", label: "MAPbI₃ / Spiro" },
              { key: "CsPbI3_Spiro", label: "CsPbI₃ / Spiro" },
              { key: "MAPbI3_PEDOT", label: "MAPbI₃ / PEDOT" },
              { key: "CsPbI3_PEDOT", label: "CsPbI₃ / PEDOT" },
            ].map((config) => (
              <motion.button
                key={config.key}
                onClick={() => handleConfigSelect(config.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedConfigurations.includes(config.key)
                    ? "bg-gray-800 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {config.label}
              </motion.button>
            ))}
          </div>
          {selectedConfigurations.length > 0 && (
            <motion.button
              onClick={handleClearAll}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              Очистить
            </motion.button>
          )}
        </div>
        <Line options={jvOptions} data={jvData} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
      >
        <Line options={eqeOptions} data={eqeData} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
      >
        <Line options={pceOptions} data={pceData} />
      </motion.div>
    </div>
  );
};

export default Results;
