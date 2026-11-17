import { Storage } from '@apps-in-toss/web-framework';
import type { Data, Entry, Item } from '../types';
import { UNITS } from './format';

const KEY = 'budget-data';

// 토스 앱(샌드박스 포함)에서는 SDK Storage, PC 브라우저에서는 localStorage로 대체해요.
export async function load(): Promise<Data | null> {
  let raw: string | null = null;
  try {
    raw = await Storage.getItem(KEY);
  } catch {
    try { raw = localStorage.getItem(KEY); } catch { /* 저장소 없음 */ }
  }
  if (!raw) return null;
  try {
    const d = JSON.parse(raw);
    // 이전 버전(수입 하나만 저장) 데이터도 자동으로 변환
    const incomes: Item[] = Array.isArray(d.incomes)
      ? d.incomes
      : d.income
        ? [{ id: 1, name: '수입', amount: Number(d.income) }]
        : [];
    const expenses: Item[] = Array.isArray(d.expenses) ? d.expenses : [];
    const assets: Item[] = Array.isArray(d.assets) ? d.assets : [];
    const assetUnit = UNITS.some((u) => u.mul === d.assetUnit) ? d.assetUnit : 10000;
    const ledger: Entry[] = Array.isArray(d.ledger) ? d.ledger : [];
    return { incomes, expenses, assets, assetUnit, ledger };
  } catch {
    return null;
  }
}

export async function save(data: Data) {
  const raw = JSON.stringify(data);
  try {
    await Storage.setItem(KEY, raw);
  } catch {
    try { localStorage.setItem(KEY, raw); } catch { /* 저장소 없음 */ }
  }
}
