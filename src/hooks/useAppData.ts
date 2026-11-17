import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import type { Entry, Item } from '../types';
import { UNITS } from '../lib/format';
import { load, save } from '../lib/storage';

// 목록 하나에 대한 추가/삭제/금액수정 함수 묶음
function listActions(set: Dispatch<SetStateAction<Item[]>>) {
  return {
    add: (name: string, amount: number) => set((prev) => [...prev, { id: Date.now(), name, amount }]),
    remove: (id: number) => set((prev) => prev.filter((i) => i.id !== id)),
    update: (id: number, amount: number) =>
      set((prev) => prev.map((i) => (i.id === id ? { ...i, amount } : i))),
  };
}

export type ListActions = ReturnType<typeof listActions>;

// 앱 전체 데이터 상태 + 저장소 동기화
export function useAppData() {
  const [incomes, setIncomes] = useState<Item[]>([]);
  const [expenses, setExpenses] = useState<Item[]>([]);
  const [assets, setAssets] = useState<Item[]>([]);
  const [assetUnit, setAssetUnit] = useState(10000);
  const [ledger, setLedger] = useState<Entry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    load().then((d) => {
      if (d) {
        setIncomes(d.incomes);
        setExpenses(d.expenses);
        setAssets(d.assets);
        setAssetUnit(d.assetUnit);
        setLedger(d.ledger);
      }
      setLoaded(true);
    });
  }, []);

  // 불러오기가 끝난 뒤에만 저장 (빈 값으로 덮어쓰기 방지)
  useEffect(() => {
    if (loaded) save({ incomes, expenses, assets, assetUnit, ledger });
  }, [incomes, expenses, assets, assetUnit, ledger, loaded]);

  return {
    incomes,
    expenses,
    assets,
    unit: UNITS.find((u) => u.mul === assetUnit) ?? UNITS[1],
    setAssetUnit,
    incomeActions: listActions(setIncomes),
    expenseActions: listActions(setExpenses),
    assetActions: listActions(setAssets),
    ledger,
    ledgerActions: {
      add: (date: string, type: Entry['type'], name: string, amount: number) =>
        setLedger((prev) => [...prev, { id: Date.now(), date, type, name, amount }]),
      remove: (id: number) => setLedger((prev) => prev.filter((e) => e.id !== id)),
      update: (id: number, amount: number) =>
        setLedger((prev) => prev.map((e) => (e.id === id ? { ...e, amount } : e))),
    },
  };
}
