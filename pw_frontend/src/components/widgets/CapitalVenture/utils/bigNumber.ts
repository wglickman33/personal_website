import { BigNumber } from '../types/capitalVentureTypes';

const SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod', 'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg', 'Tg'];

export const ZERO: BigNumber = { mantissa: 0, exponent: 0 };
export const ONE: BigNumber = { mantissa: 1, exponent: 0 };

function normalize(bn: BigNumber): BigNumber {
  if (bn.mantissa === 0) return ZERO;
  
  const absMantissa = Math.abs(bn.mantissa);
  if (absMantissa >= 10 || (absMantissa < 1 && absMantissa > 0)) {
    const exp = Math.floor(Math.log10(absMantissa));
    if (exp === 0 && absMantissa === 1) return bn;
    const sign = bn.mantissa < 0 ? -1 : 1;
    const normalizedMantissa = sign * (absMantissa / Math.pow(10, exp));
    return {
      mantissa: normalizedMantissa,
      exponent: bn.exponent + exp
    };
  }
  return bn;
}

export function create(value: number): BigNumber {
  if (value === 0) return ZERO;
  if (value === 1) return ONE;
  return normalize({ mantissa: value, exponent: 0 });
}

export function add(a: BigNumber, b: BigNumber): BigNumber {
  if (a.mantissa === 0) return b;
  if (b.mantissa === 0) return a;
  
  const expDiff = a.exponent - b.exponent;
  if (Math.abs(expDiff) > 15) {
    return expDiff > 0 ? a : b;
  }
  
  const adjustedMantissa = b.mantissa * Math.pow(10, -expDiff);
  return normalize({
    mantissa: a.mantissa + adjustedMantissa,
    exponent: a.exponent
  });
}

export function subtract(a: BigNumber, b: BigNumber): BigNumber {
  return add(a, { mantissa: -b.mantissa, exponent: b.exponent });
}

export function multiply(a: BigNumber, b: BigNumber): BigNumber {
  if (a.mantissa === 0 || b.mantissa === 0) return ZERO;
  return normalize({
    mantissa: a.mantissa * b.mantissa,
    exponent: a.exponent + b.exponent
  });
}

export function multiplyScalar(bn: BigNumber, scalar: number): BigNumber {
  if (bn.mantissa === 0 || scalar === 0) return ZERO;
  return normalize({
    mantissa: bn.mantissa * scalar,
    exponent: bn.exponent
  });
}

export function compare(a: BigNumber, b: BigNumber): number {
  if (a.mantissa === 0 && b.mantissa === 0) return 0;
  if (a.mantissa === 0) return -1;
  if (b.mantissa === 0) return 1;
  
  const expDiff = a.exponent - b.exponent;
  if (Math.abs(expDiff) > 15) {
    return expDiff > 0 ? 1 : -1;
  }
  
  const adjustedMantissa = b.mantissa * Math.pow(10, -expDiff);
  if (a.mantissa > adjustedMantissa) return 1;
  if (a.mantissa < adjustedMantissa) return -1;
  return 0;
}

export function greaterThan(a: BigNumber, b: BigNumber): boolean {
  return compare(a, b) > 0;
}

export function greaterThanOrEqual(a: BigNumber, b: BigNumber): boolean {
  return compare(a, b) >= 0;
}

export function lessThan(a: BigNumber, b: BigNumber): boolean {
  return compare(a, b) < 0;
}

export function lessThanOrEqual(a: BigNumber, b: BigNumber): boolean {
  return compare(a, b) <= 0;
}

export function floor(bn: BigNumber): BigNumber {
  if (bn.mantissa === 0) return ZERO;
  if (bn.exponent < 0) return ZERO;
  if (bn.exponent === 0) return { mantissa: Math.floor(bn.mantissa), exponent: 0 };
  
  const factor = Math.pow(10, bn.exponent);
  const value = bn.mantissa * factor;
  const floored = Math.floor(value);
  return create(floored);
}

export function format(bn: BigNumber, decimals: number = 2): string {
  if (bn.mantissa === 0) return '0';
  
  const value = bn.mantissa * Math.pow(10, bn.exponent);
  
  if (!isFinite(value) || isNaN(value)) {
    return '0';
  }
  
  if (value < 1 && value > 0) {
    return value.toFixed(decimals);
  }
  
  if (value < 0) {
    return '-' + format({ mantissa: -bn.mantissa, exponent: bn.exponent }, decimals);
  }
  
  const absValue = Math.abs(value);
  const exp = Math.floor(Math.log10(absValue));
  
  if (!isFinite(exp)) {
    return value.toExponential(2);
  }
  
  const suffixIndex = Math.floor(exp / 3);
  
  if (suffixIndex === 0) {
    return value.toFixed(decimals);
  }
  
  if (suffixIndex >= SUFFIXES.length || suffixIndex < 0) {
    return value.toExponential(2);
  }
  
  const divisor = Math.pow(1000, suffixIndex);
  const displayValue = value / divisor;
  const suffix = SUFFIXES[suffixIndex];
  
  return `${displayValue.toFixed(decimals)}${suffix}`;
}

export function formatCompact(bn: BigNumber): string {
  return format(bn, 1);
}

export function fromJSON(data: { mantissa: number; exponent: number }): BigNumber {
  return normalize({ mantissa: data.mantissa, exponent: data.exponent });
}

export function toJSON(bn: BigNumber): { mantissa: number; exponent: number } {
  return { mantissa: bn.mantissa, exponent: bn.exponent };
}

