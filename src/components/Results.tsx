import React, { useState, useRef } from "react";
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
import type { ChartOptions } from "chart.js";
import { Download } from "lucide-react";
import { useLanguage } from "../i18n";

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
  "#007EA7",
  "#BC2C1A",
  "#5FAD56",
];

export const Results: React.FC<ResultsProps> = ({
  results,
  selectedConfigurations: initialSelectedConfigurations,
  currentKey,
}) => {
  const [selectedConfigurations, setSelectedConfigurations] = useState<string[]>(
    initialSelectedConfigurations || []
  );
  const { t } = useLanguage();

  const jvChartRef = useRef<ChartJS<"line">>(null);
  const eqeChartRef = useRef<ChartJS<"line">>(null);
  const pceChartRef = useRef<ChartJS<"line">>(null);

  const getColorForConfig = (config: string) => {
    if (config === currentKey) {
      return "#1F2937";
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
        label: t.currentConfiguration,
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
        label: t.currentConfiguration,
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
        label: t.currentConfiguration,
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

  const tooltipDefaults = {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    titleColor: "#1a202c",
    bodyColor: "#4a5568",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    padding: 14,
    cornerRadius: 8,
    displayColors: true,
    mode: "index" as const,
    intersect: false,
    boxWidth: 10,
    boxHeight: 10,
    boxPadding: 5,
    usePointStyle: true,
    titleFont: { size: 22, weight: "bold" as const },
    bodyFont: { size: 20 },
    callbacks: {
      label: function (context: any) {
        let label = context.dataset.label || "";
        if (label) label += ": ";
        if (context.parsed.y !== null) label += context.parsed.y.toFixed(2);
        return label;
      },
    },
  };

  const legendDefaults = {
    position: "top" as const,
    labels: { boxWidth: 24, boxHeight: 5, font: { size: 24 }, padding: 24 },
  };

  const jvOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: legendDefaults,
      title: {
        display: true,
        text: t.jvTitle,
        font: { size: 32, weight: "bold" as const },
        color: "#222",
        padding: { top: 12, bottom: 24 },
      },
      tooltip: tooltipDefaults,
    },
    interaction: { mode: "index" as const, intersect: false },
    scales: {
      x: {
        title: { display: true, text: t.jvXAxis, font: { size: 24 } },
        grid: { color: "rgba(0,0,0,0.07)" },
        ticks: { font: { size: 20 } },
      },
      y: {
        title: { display: true, text: t.jvYAxis, font: { size: 24 } },
        grid: { color: "rgba(0,0,0,0.07)" },
        ticks: { font: { size: 20 } },
      },
    },
    maintainAspectRatio: false,
  };

  const eqeOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: legendDefaults,
      title: {
        display: true,
        text: t.eqeTitle,
        font: { size: 32, weight: "bold" as const },
        color: "#222",
        padding: { top: 12, bottom: 24 },
      },
      tooltip: tooltipDefaults,
    },
    scales: {
      x: {
        title: { display: true, text: t.eqeXAxis, font: { size: 24 } },
        grid: { color: "rgba(0,0,0,0.07)" },
        ticks: { font: { size: 20 } },
      },
      y: {
        title: { display: true, text: t.eqeYAxis, font: { size: 24 } },
        min: 0,
        max: 105,
        grid: { color: "rgba(0,0,0,0.07)" },
        beginAtZero: true,
        ticks: {
          padding: 12,
          font: { size: 20 },
          callback: function (tickValue: number | string) {
            const value = Number(tickValue);
            return value <= 100 ? value : "";
          },
        },
      },
    },
    interaction: { mode: "index" as const, intersect: false },
    maintainAspectRatio: false,
  };

  const pceOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: legendDefaults,
      title: {
        display: true,
        text: t.pceTitle,
        font: { size: 32, weight: "bold" as const },
        color: "#222",
        padding: { top: 12, bottom: 24 },
      },
      tooltip: tooltipDefaults,
    },
    scales: {
      x: {
        title: { display: true, text: t.pceXAxis, font: { size: 24 } },
        grid: { color: "rgba(0,0,0,0.07)" },
        ticks: { font: { size: 20 } },
      },
      y: {
        title: { display: true, text: t.pceYAxis, font: { size: 24 } },
        grid: { color: "rgba(0,0,0,0.07)" },
        ticks: { font: { size: 20 } },
      },
    },
    interaction: { mode: "index" as const, intersect: false },
    maintainAspectRatio: false,
  };

  const makeMobileOptions = (opts: ChartOptions<"line">) => ({
    ...opts,
    plugins: {
      ...opts.plugins,
      legend: {
        ...opts.plugins?.legend,
        labels: {
          ...(opts.plugins?.legend as any)?.labels,
          font: { size: 20 },
          padding: 12,
        },
      },
      title: {
        ...opts.plugins?.title,
        font: { size: 24, weight: "bold" as const },
        padding: { top: 8, bottom: 12 },
      },
    },
    scales: {
      x: {
        ...(opts.scales as any)?.x,
        title: { ...(opts.scales as any)?.x?.title, font: { size: 20 } },
        ticks: { font: { size: 18 } },
      },
      y: {
        ...(opts.scales as any)?.y,
        title: { ...(opts.scales as any)?.y?.title, font: { size: 20 } },
        ticks: { font: { size: 18 } },
      },
    },
    maintainAspectRatio: false,
  });

  const mobileJvOptions = makeMobileOptions(jvOptions);
  const mobileEqeOptions = makeMobileOptions(eqeOptions);
  const mobilePceOptions = makeMobileOptions(pceOptions);

  const handleConfigSelect = (config: string) => {
    if (config === currentKey) return;
    if (selectedConfigurations.includes(config)) {
      setSelectedConfigurations(selectedConfigurations.filter((c) => c !== config));
    } else {
      setSelectedConfigurations([...selectedConfigurations, config]);
    }
  };

  const handleClearAll = () => setSelectedConfigurations([]);

  const downloadChart = (chartRef: React.RefObject<ChartJS>, filename: string) => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename;
      link.href = image;
      link.click();
    }
  };

  return (
    <div className="space-y-6">
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
                  whileTap={config.key === currentKey ? undefined : { scale: 0.95 }}
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
              {t.clearAll}
            </motion.button>
          )}
        </div>
      </div>

      {[
        { ref: jvChartRef, data: jvData, options: mobileJvOptions, filename: "jv-characteristic.png" },
        { ref: eqeChartRef, data: eqeData, options: mobileEqeOptions, filename: "eqe-characteristic.png" },
        { ref: pceChartRef, data: pceData, options: mobilePceOptions, filename: "pce-characteristic.png" },
      ].map(({ ref, data, options, filename }, i) => (
        <motion.div
          key={filename}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}
          className="bg-white p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 w-full h-[220px] sm:h-[700px] max-w-[420px] mx-auto px-2 sm:max-w-none sm:mx-0 sm:px-0 relative"
        >
          <button
            onClick={() => downloadChart(ref, filename)}
            className="absolute top-2 right-2 z-10 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            title={t.downloadChart}
          >
            <Download className="w-5 h-5" />
          </button>
          <div className="w-full h-full">
            <Line ref={ref} options={options as any} data={data} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Results;
