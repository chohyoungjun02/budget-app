import type { Item, Unit } from '../types';
import { UNITS, fmtUnit, sum } from '../lib/format';
import { s } from '../styles/theme';

const PIE_COLORS = ['#3182f6', '#f04452', '#00c471', '#ffb331', '#8b5cf6', '#00b8d9', '#ff7a45', '#8b95a1'];

// 총 자산 + 단위 선택 + 원형 차트 + 비율 범례
export default function PortfolioChart(props: { items: Item[]; unit: Unit; onUnit: (u: Unit) => void }) {
  const { unit, onUnit } = props;
  // 큰 자산부터 보이게 내림차순 (아래 입력 목록은 수정 중 줄이 튀지 않게 입력 순서 유지)
  const items = [...props.items].sort((a, b) => b.amount - a.amount);
  const total = sum(items);
  // 각 항목을 누적 비율(%)로 이어 붙여 conic-gradient 한 줄로 그려요
  let acc = 0;
  const stops = items.map((item, idx) => {
    const from = (acc / total) * 100;
    acc += item.amount;
    return `${PIE_COLORS[idx % PIE_COLORS.length]} ${from}% ${(acc / total) * 100}%`;
  });

  return (
    <section style={s.card}>
      <div style={s.sectionHead}>
        <p style={s.heroLabel}>총 자산</p>
        <div style={s.unitTabs} role="group" aria-label="금액 단위">
          {UNITS.map((u) => (
            <button
              key={u.mul}
              aria-pressed={u.mul === unit.mul}
              style={{ ...s.unitTab, ...(u.mul === unit.mul ? s.tabActive : null) }}
              onClick={() => onUnit(u)}
            >
              {u.label}
            </button>
          ))}
        </div>
      </div>
      <p style={s.heroAmount}>{fmtUnit(total, unit)}</p>
      {total > 0 && (
        <>
          <div
            role="img"
            aria-label={items.map((i) => `${i.name} ${Math.round((i.amount / total) * 100)}%`).join(', ')}
            style={{ ...s.pie, background: `conic-gradient(${stops.join(', ')})` }}
          />
          <ul style={s.list}>
            {items.map((item, idx) => (
              <li key={item.id} style={s.legendRow}>
                <span style={{ ...s.dot, background: PIE_COLORS[idx % PIE_COLORS.length] }} />
                <span style={s.rowName}>{item.name}</span>
                <span style={s.summaryLabel}>{((item.amount / total) * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
