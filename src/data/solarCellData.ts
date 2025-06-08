export interface SolarCellParams {
  voc: number;
  jsc: number;
  ff: number;
  eta: number;
}

export interface ChartData {
  v: number[];
  j: number[];
}

export interface QEData {
  lambda: number[];
  qe: number[];
}

export interface PCEData {
  thickness: number[];
  eta: number[];
}

export interface ThicknessData {
  [key: string]: number;
}

export interface SolarCellConfiguration {
  params: SolarCellParams;
  jv: ChartData;
  qe: QEData;
  pce: PCEData;
  chosenThickness: ThicknessData;
}

export type ConfigurationKey =
  | "MAPbI3_Spiro"
  | "CsPbI3_Spiro"
  | "MAPbI3_PEDOT"
  | "CsPbI3_PEDOT";

export const solarCellData: Record<ConfigurationKey, SolarCellConfiguration> = {
  MAPbI3_Spiro: {
    params: { voc: 1.34, jsc: 20.32, ff: 84.03, eta: 22.95 },
    jv: {
      v: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0, 1.1, 1.2, 1.25, 1.3, 1.32, 1.34],
      j: [
        -20.32, -20.3, -20.3, -20.3, -20.3, -20.25, -20.1, -19.5, -16.0, -10.0,
        -4.0, -1.0, 0,
      ],
    },
    qe: {
      lambda: [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900],
      qe: [60, 75, 85, 95, 99, 100, 100, 98, 90, 70, 40, 10, 0],
    },
    pce: {
      thickness: [
        0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4,
        1.5,
      ],
      eta: [
        16.0, 20.5, 22.8, 22.5, 22.0, 21.5, 21.0, 20.5, 20.0, 19.5, 19.0, 18.5,
        18.0, 17.5, 17.0,
      ],
    },
    chosenThickness: { MAPbI3: 0.3, TiO2: 0.05, Spiro: 0.2 },
  },
  CsPbI3_Spiro: {
    params: { voc: 1.25, jsc: 17.5, ff: 82.5, eta: 18.04 },
    jv: {
      v: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0, 1.05, 1.1, 1.15, 1.2, 1.22, 1.25],
      j: [
        -17.5, -17.5, -17.5, -17.5, -17.4, -17.3, -17.0, -16.5, -14.0, -9.0,
        -3.0, -0.5, 0,
      ],
    },
    qe: {
      lambda: [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900],
      qe: [55, 70, 80, 90, 95, 96, 95, 85, 60, 20, 0, 0, 0],
    },
    pce: {
      thickness: [
        0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4,
        1.5,
      ],
      eta: [
        10.0, 15.0, 18.0, 18.3, 18.2, 18.0, 17.8, 17.6, 17.4, 17.2, 17.0, 16.8,
        16.6, 16.4, 16.2,
      ],
    },
    chosenThickness: { CsPbI3: 0.4, TiO2: 0.05, Spiro: 0.2 },
  },
  MAPbI3_PEDOT: {
    params: { voc: 1.3, jsc: 20.0, ff: 83.0, eta: 21.58 },
    jv: {
      v: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3],
      j: [
        -20.0, -20.0, -20.0, -20.0, -19.9, -19.8, -19.5, -19.0, -17.0, -12.0,
        -5.0, -1.5, 0,
      ],
    },
    qe: {
      lambda: [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900],
      qe: [58, 73, 83, 93, 97, 98, 97, 94, 88, 68, 38, 8, 0],
    },
    pce: {
      thickness: [
        0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4,
        1.5,
      ],
      eta: [
        15.0, 19.5, 21.5, 21.2, 20.8, 20.4, 20.0, 19.6, 19.2, 18.8, 18.4, 18.0,
        17.6, 17.2, 16.8,
      ],
    },
    chosenThickness: { MAPbI3: 0.3, TiO2: 0.05, PEDOT: 0.2 },
  },
  CsPbI3_PEDOT: {
    params: { voc: 1.2, jsc: 17.0, ff: 80.0, eta: 16.5 },
    jv: {
      v: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0, 1.05, 1.1, 1.15, 1.2, 1.22, 1.23],
      j: [
        -17.0, -17.0, -17.0, -17.0, -16.9, -16.8, -16.5, -16.0, -13.5, -8.5,
        -2.5, -0.3, 0,
      ],
    },
    qe: {
      lambda: [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900],
      qe: [53, 68, 78, 88, 93, 94, 93, 83, 58, 18, 0, 0, 0],
    },
    pce: {
      thickness: [
        0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4,
        1.5,
      ],
      eta: [
        9.5, 14.0, 16.0, 16.3, 16.2, 16.0, 15.8, 15.6, 15.4, 15.2, 15.0, 14.8,
        14.6, 14.4, 14.2,
      ],
    },
    chosenThickness: { CsPbI3: 0.4, TiO2: 0.05, PEDOT: 0.2 },
  },
};
