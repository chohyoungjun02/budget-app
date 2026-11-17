export type Item = { id: number; name: string; amount: number };

// 저장소에 들어가는 전체 데이터 (금액은 모두 원 단위)
export type Data = { incomes: Item[]; expenses: Item[]; assets: Item[]; assetUnit: number };

// 화면에서 쓰는 금액 단위: mul원 = 1label
export type Unit = { mul: number; label: string };
