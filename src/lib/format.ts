import type { Unit } from '../types';

// 자산은 항상 원 단위로 저장하고, 고른 단위는 입력·표시에만 써요
export const UNITS: Unit[] = [
  { mul: 1, label: '원' },
  { mul: 10000, label: '만원' },
  { mul: 100000, label: '십만원' },
];

export const won = (n: number) => n.toLocaleString('ko-KR') + '원';

export const fmtUnit = (n: number, u: Unit) =>
  (n / u.mul).toLocaleString('ko-KR', { maximumFractionDigits: 2 }) + u.label;

export const sum = (items: { amount: number }[]) => items.reduce((acc, i) => acc + i.amount, 0);
