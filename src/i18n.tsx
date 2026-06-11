import React, { createContext, useContext, useState } from "react";

export type Lang = "ru" | "en";

export const translations = {
  ru: {
    // Header
    title: "Инструмент моделирования ПСЭ",
    navExplorer: "Исследование конфигураций",

    // App
    explorerTitle:
      "Исследование конфигураций перовскитных солнечных элементов",
    explorerDescription:
      "Используйте данный инструмент для анализа и сравнения электрофизических характеристик различных конфигураций перовскитных солнечных элементов. Кликните на слой в схеме, чтобы выбрать материал, обновить графики и ключевые показатели.",
    layerParams: "Параметры слоёв",
    showCharts: "Показать графики",
    hideCharts: "Скрыть графики",
    footer: '© 2025 СПбГЭТУ "ЛЭТИ", Козлов Сергей. Все права защищены.',

    // LayerStructure
    elementStructure: "Структура элемента",
    transparentElectrode: "Прозрачный электрод",
    etlLabel: "ЭТС",
    htlLabel: "ДТС",
    perovskiteLabel: "Перовскит",
    backElectrode: "Тыльный электрод",
    currentConfig: "Текущая конфигурация:",

    // ParameterCards
    cardVoc: "Vхх (В)",
    cardJsc: "Jкз (мА/см²)",
    cardFf: "FF (%)",
    cardPce: "КПД (%)",

    // ParametersModal
    layerParamsTitle: "Параметры слоёв",
    physicalParams: "Физические параметры слоёв",
    paramColumn: "Параметр",

    // Results
    currentConfiguration: "Текущая конфигурация",
    clearAll: "Очистить",
    downloadChart: "Скачать график",

    // Chart options
    jvTitle: "Вольт-амперная характеристика",
    jvXAxis: "Напряжение (Vхх)",
    jvYAxis: "Плотность тока (Jкз, мА/см²)",
    eqeTitle: "Внешняя квантовая эффективность",
    eqeXAxis: "Длина волны (нм)",
    eqeYAxis: "КЭ (%)",
    pceTitle: "Зависимость эффективности от толщины",
    pceXAxis: "Толщина (мкм)",
    pceYAxis: "КПД (%)",

    // Parameter names (keys in materialProperties)
    paramKeys: [
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
    ] as string[],

    paramLabels: [
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
    ] as string[],
  },
  en: {
    title: "PSC Simulation Tool",
    navExplorer: "Configuration Explorer",

    explorerTitle: "Perovskite Solar Cell Configuration Explorer",
    explorerDescription:
      "Use this tool to analyze and compare the electrophysical characteristics of various perovskite solar cell configurations. Click on a layer in the diagram to select a material and update the charts and key metrics.",
    layerParams: "Layer Parameters",
    showCharts: "Show Charts",
    hideCharts: "Hide Charts",
    footer: '© 2025 SPbGETU "LETI", Kozlov Sergey. All rights reserved.',

    elementStructure: "Device Structure",
    transparentElectrode: "Transparent Electrode",
    etlLabel: "ETL",
    htlLabel: "HTL",
    perovskiteLabel: "Perovskite",
    backElectrode: "Back Electrode",
    currentConfig: "Current configuration:",

    cardVoc: "Voc (V)",
    cardJsc: "Jsc (mA/cm²)",
    cardFf: "FF (%)",
    cardPce: "PCE (%)",

    layerParamsTitle: "Layer Parameters",
    physicalParams: "Physical Layer Parameters",
    paramColumn: "Parameter",

    currentConfiguration: "Current configuration",
    clearAll: "Clear",
    downloadChart: "Download chart",

    jvTitle: "Current–Voltage Characteristic",
    jvXAxis: "Voltage (Voc)",
    jvYAxis: "Current Density (Jsc, mA/cm²)",
    eqeTitle: "External Quantum Efficiency",
    eqeXAxis: "Wavelength (nm)",
    eqeYAxis: "EQE (%)",
    pceTitle: "Efficiency vs. Thickness",
    pceXAxis: "Thickness (μm)",
    pceYAxis: "PCE (%)",

    // Keys stay Russian (used to look up materialProperties object)
    paramKeys: [
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
    ] as string[],

    paramLabels: [
      "Thickness (μm)",
      "Band gap, Eg (eV)",
      "Electron affinity, χ (eV)",
      "Relative permittivity, εr",
      "Effective density of states (conduction band), Nc (cm⁻³)",
      "Effective density of states (valence band), Nv (cm⁻³)",
      "Electron mobility, μn (cm²·V⁻¹·s⁻¹)",
      "Hole mobility, μp (cm²·V⁻¹·s⁻¹)",
      "Acceptor concentration, NA (cm⁻³)",
      "Donor concentration, ND (cm⁻³)",
      "Defect concentration, nt (cm⁻³)",
    ] as string[],
  },
} as const;

export type Translations = (typeof translations)["ru"];

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ru",
  t: translations.ru,
  toggleLang: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<Lang>("ru");
  const toggleLang = () => setLang((l) => (l === "ru" ? "en" : "ru"));

  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggleLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
