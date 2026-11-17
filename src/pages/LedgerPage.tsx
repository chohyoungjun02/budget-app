import { useState } from 'react';
import type { Entry } from '../types';
import { dateKey, sum, won } from '../lib/format';
import { C, s } from '../styles/theme';
import Calendar from '../components/Calendar';
import ItemSection from '../components/ItemSection';

export default function LedgerPage(props: {
  ledger: Entry[];
  onAdd: (date: string, type: Entry['type'], name: string, amount: number) => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, amount: number) => void;
}) {
  const { ledger, onAdd, onRemove, onUpdate } = props;
  const [view, setView] = useState(() => {
    const t = new Date();
    return { year: t.getFullYear(), month: t.getMonth() };
  });
  const [selected, setSelected] = useState(() => {
    const t = new Date();
    return dateKey(t.getFullYear(), t.getMonth(), t.getDate());
  });

  const [type, setType] = useState<Entry['type']>('expense');
  const isExpense = type === 'expense';

  const { year, month } = view;
  const prefix = dateKey(year, month, 1).slice(0, 8); // 'YYYY-MM-'
  const monthEntries = ledger.filter((e) => e.date.startsWith(prefix));
  const income = sum(monthEntries.filter((e) => e.type === 'income'));
  const expense = sum(monthEntries.filter((e) => e.type === 'expense'));

  const dayEntries = ledger.filter((e) => e.date === selected);
  const [, sm, sd] = selected.split('-').map(Number);

  const move = (diff: number) => {
    const d = new Date(year, month + diff, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  };

  return (
    <>
      <section style={s.card}>
        <div style={s.calHead}>
          <button style={s.calNav} onClick={() => move(-1)} aria-label="이전 달">‹</button>
          <h2 style={s.sectionTitle}>{year}년 {month + 1}월</h2>
          <button style={s.calNav} onClick={() => move(1)} aria-label="다음 달">›</button>
        </div>

        <Calendar year={year} month={month} entries={monthEntries} selected={selected} onSelect={setSelected} />

        <div style={s.divider} />
        <div style={s.summaryRow}>
          <span style={s.summaryLabel}>이번 달 수입</span>
          <span style={{ ...s.summaryValue, color: C.blue }}>+{won(income)}</span>
        </div>
        <div style={s.summaryRow}>
          <span style={s.summaryLabel}>이번 달 지출</span>
          <span style={{ ...s.summaryValue, color: C.red }}>-{won(expense)}</span>
        </div>
        <div style={s.summaryRow}>
          <span style={s.summaryLabel}>합계</span>
          <span style={{ ...s.summaryValue, color: income - expense < 0 ? C.red : C.text }}>
            {won(income - expense)}
          </span>
        </div>
      </section>

      {/* 선택한 날짜의 기록 — 패널 하나에서 지출/수입을 전환해 보고 적어요 */}
      <ItemSection
        toolbar={
          <div style={{ ...s.tabs, margin: '0 0 16px' }} role="group" aria-label="지출 또는 수입">
            {(['expense', 'income'] as const).map((t) => (
              <button
                key={t}
                aria-pressed={type === t}
                style={{ ...s.tab, ...(type === t ? { ...s.tabActive, color: t === 'expense' ? C.red : C.blue } : null) }}
                onClick={() => setType(t)}
              >
                {t === 'expense' ? '지출' : '수입'}
              </button>
            ))}
          </div>
        }
        title={`${sm}월 ${sd}일 ${isExpense ? '지출' : '수입'}`}
        items={dayEntries.filter((e) => e.type === type)}
        color={isExpense ? C.red : C.blue}
        colorSoft={isExpense ? C.redSoft : C.blueSoft}
        sign={isExpense ? '-' : '+'}
        namePlaceholder={isExpense ? '내용 (예: 점심, 커피, 교통비)' : '내용 (예: 월급, 용돈, 환급)'}
        onAdd={(name, amount) => onAdd(selected, type, name, amount)}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    </>
  );
}
