import type { Entry } from '../types';
import { dateKey } from '../lib/format';
import { C, s } from '../styles/theme';

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
const short = (n: number) => n.toLocaleString('ko-KR');

// 한 달 달력. 날짜마다 그날 수입(+)/지출(-) 합계를 작게 보여줘요.
export default function Calendar(props: {
  year: number;
  month: number; // 0~11
  entries: Entry[];
  selected: string;
  onSelect: (date: string) => void;
}) {
  const { year, month, entries, selected, onSelect } = props;
  const firstWeekday = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

  // 날짜별 합계 미리 계산
  const totals: Record<string, { income: number; expense: number }> = {};
  for (const e of entries) {
    const t = (totals[e.date] ??= { income: 0, expense: 0 });
    t[e.type] += e.amount;
  }

  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

  return (
    <div style={s.calGrid}>
      {WEEK.map((w, i) => (
        <div key={w} style={{ ...s.calWeek, color: i === 0 ? C.red : i === 6 ? C.blue : C.sub }}>
          {w}
        </div>
      ))}
      {cells.map((d, i) => {
        if (d === null) return <div key={`b${i}`} />;
        const key = dateKey(year, month, d);
        const t = totals[key];
        const isSel = key === selected;
        return (
          <button
            key={key}
            style={{ ...s.calCell, ...(isSel ? s.calCellSel : null) }}
            onClick={() => onSelect(key)}
            aria-pressed={isSel}
            aria-label={`${month + 1}월 ${d}일`}
          >
            <span style={{ fontWeight: key === todayKey ? 800 : 500, color: key === todayKey ? C.blue : C.text }}>
              {d}
            </span>
            {t?.income ? <span style={{ ...s.calAmt, color: C.blue }}>+{short(t.income)}</span> : null}
            {t?.expense ? <span style={{ ...s.calAmt, color: C.red }}>-{short(t.expense)}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
