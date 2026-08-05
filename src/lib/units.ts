export interface DualMeasurement {
  metric: { value: number; unit: string };
  imperial: { value: number; unit: string };
}

export function kgToLbs(kg: number): number {
  return kg * 2.20462;
}

export function lbsToKg(lbs: number): number {
  return lbs / 2.20462;
}

export function cmToInches(cm: number): number {
  return cm * 0.393701;
}

export function inchesToCm(inches: number): number {
  return inches / 0.393701;
}

export function formatDualWeight(kg: number): DualMeasurement {
  return {
    metric: { value: Math.round(kg * 100) / 100, unit: 'kg' },
    imperial: { value: Math.round(kgToLbs(kg) * 10) / 10, unit: 'lbs' },
  };
}

export function formatDualHeight(cm: number): DualMeasurement {
  return {
    metric: { value: Math.round(cm * 10) / 10, unit: 'cm' },
    imperial: { value: Math.round(cmToInches(cm) * 10) / 10, unit: 'in' },
  };
}
