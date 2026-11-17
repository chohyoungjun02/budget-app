import { won } from '../lib/format';
import { C, s } from '../styles/theme';

// 이번 달 쓸 수 있는 돈 카드
export default function BudgetSummary(props: { incomeTotal: number; expenseTotal: number; today: Date }) {
  const { incomeTotal, expenseTotal, today } = props;
  const available = incomeTotal - expenseTotal;
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysLeft = lastDay - today.getDate() + 1;
  const daily = Math.floor(Math.max(available, 0) / daysLeft);
  const isMinus = available < 0;

  return (
    <section style={s.card}>
      <p style={s.heroLabel}>이번 달 쓸 수 있는 돈</p>
      <p style={{ ...s.heroAmount, color: isMinus ? C.red : C.text }}>{won(available)}</p>

      {isMinus ? (
        <p style={{ ...s.pill, background: C.redSoft, color: C.red }}>
          고정지출이 수입보다 {won(-available)} 많아요
        </p>
      ) : (
        <p style={{ ...s.pill, background: C.blueSoft, color: C.blue }}>
          남은 {daysLeft}일 동안 하루 {won(daily)}씩 쓸 수 있어요
        </p>
      )}

      <div style={s.divider} />

      <div style={s.summaryRow}>
        <span style={s.summaryLabel}>수입 합계</span>
        <span style={s.summaryValue}>{won(incomeTotal)}</span>
      </div>
      <div style={s.summaryRow}>
        <span style={s.summaryLabel}>고정지출 합계</span>
        <span style={s.summaryValue}>-{won(expenseTotal)}</span>
      </div>
    </section>
  );
}
