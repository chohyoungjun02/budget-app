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

// 로컬 시간 기준 'YYYY-MM-DD' (toISOString은 UTC라 한국 새벽에 날짜가 하루 밀려요)
export const dateKey = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export const sum =(items: { amount: number }[]) => items.reduce((acc, i) => acc + i.amount, 0);
