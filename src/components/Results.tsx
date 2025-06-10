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
  "#007EA7", // Blue
  "#BC2C1A", // Red
  "#5FAD56", // Green
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
      return "#1F2937"; // Цвет как у кнопки 'Параметры слоёв'
    }
    const index = selectedConfigurations.indexOf(config);
    return chartColors[index % chartColors.length];
  };

  const jvData = {
    labels: [
      ...new Set([
        ...results.jv.voltage,
        ...selectedConfigurations.flatMap(
          (config) => solarCellData[config as ConfigurationKey].jv.v
        ),
      ]),
    ]
      .sort((a, b) => a - b)
      .map((v) => v.toFixed(2)),
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

  // Находим максимальное значение напряжения среди всех конфигураций
  const maxVoltage = Math.max(
    ...results.jv.voltage,
    ...selectedConfigurations.map((config) =>
      Math.max(...solarCellData[config as ConfigurationKey].jv.v)
    )
  );

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
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1a202c",
        bodyColor: "#4a5568",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        mode: "index" as const,
        intersect: false,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
        usePointStyle: true,
        titleFont: {
          size: 13,
          weight: "bold" as const,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2);
            }
            return label;
          },
        },
      },
      animation: {
        duration: 1200,
        easing: "easeInOutQuart",
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Напряжение (Vхх)",
          font: { size: 14 },
        },
        grid: baseGrid,
      },
      y: {
        title: {
          display: true,
          text: "Плотность тока (Jкз, мА/см²)",
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
        text: "Внешняя квантовая эффективность",
        font: { size: 18, weight: "bold" as const },
        color: "#222",
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1a202c",
        bodyColor: "#4a5568",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        mode: "index" as const,
        intersect: false,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
        usePointStyle: true,
        titleFont: {
          size: 13,
          weight: "bold" as const,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2);
            }
            return label;
          },
        },
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
          text: "КЭ (%)",
          font: { size: 14 },
        },
        min: 0,
        max: 105,
        grid: baseGrid,
        beginAtZero: true,
        ticks: {
          padding: 10,
          callback: function (tickValue: number | string) {
            const value = Number(tickValue);
            return value <= 100 ? value : "";
          },
        },
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
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
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1a202c",
        bodyColor: "#4a5568",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        mode: "index" as const,
        intersect: false,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
        usePointStyle: true,
        titleFont: {
          size: 13,
          weight: "bold" as const,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2);
            }
            return label;
          },
        },
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
          text: "КПД (%)",
          font: { size: 14 },
        },
        grid: baseGrid,
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
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
      <div className="sticky top-[76px] z-30 bg-white/60 backdrop-blur border-b border-gray-200 mb-2 rounded-b-xl shadow-sm">
        <div className="flex items-center justify-between px-4 pt-2 pb-2">
          <div className="flex flex-wrap gap-2">
            {(() => {
              const configs = [
                { key: "MAPbI3_Spiro", label: "MAPbI₃ / Spiro" },
                { key: "CsPbI3_Spiro", label: "CsPbI₃ / Spiro" },
                { key: "MAPbI3_PEDOT", label: "MAPbI₃ / PEDOT" },
                { key: "CsPbI3_PEDOT", label: "CsPbI₃ / PEDOT" },
              ];
              // Сортируем: текущая конфигурация первой
              const sorted = [
                ...configs.filter((c) => c.key === currentKey),
                ...configs.filter((c) => c.key !== currentKey),
              ];
              return sorted.map((config) => (
                <motion.button
                  key={config.key}
                  onClick={
                    config.key === currentKey
                      ? undefined
                      : () => handleConfigSelect(config.key)
                  }
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200
                    ${
                      config.key === currentKey
                        ? "bg-gray-800 text-white border-2 border-gray-800 font-bold shadow-lg cursor-default"
                        : selectedConfigurations.includes(config.key)
                        ? "bg-gray-800 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                    ${config.key === currentKey ? "ring-2 ring-gray-800" : ""}
                  `}
                  style={config.key === currentKey ? { order: -1 } : {}}
                  whileTap={
                    config.key === currentKey ? undefined : { scale: 0.95 }
                  }
                  disabled={config.key === currentKey}
                >
                  {config.label}
                </motion.button>
              ));
            })()}
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
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
      >
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
