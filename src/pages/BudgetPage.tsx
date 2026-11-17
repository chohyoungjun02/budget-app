import type { Item } from '../types';
import type { ListActions } from '../hooks/useAppData';
import { sum } from '../lib/format';
import { C, s } from '../styles/theme';
import BudgetSummary from '../components/BudgetSummary';
import ItemSection from '../components/ItemSection';

export default function BudgetPage(props: {
  incomes: Item[];
  expenses: Item[];
  incomeActions: ListActions;
  expenseActions: ListActions;
}) {
  const { incomes, expenses, incomeActions, expenseActions } = props;
  const today = new Date();

  return (
    <>
      <header style={s.header}>
        <p style={s.month}>{today.getMonth() + 1}월 예산</p>
      </header>

      <BudgetSummary incomeTotal={sum(incomes)} expenseTotal={sum(expenses)} today={today} />

      <ItemSection
        title="수입"
        items={incomes}
        color={C.blue}
        colorSoft={C.blueSoft}
        sign="+"
        namePlaceholder="항목 (예: 월급, 용돈, 부업)"
        onAdd={incomeActions.add}
        onRemove={incomeActions.remove}
      />

      <ItemSection
        title="고정지출"
        items={expenses}
        color={C.red}
        colorSoft={C.redSoft}
        sign="-"
        namePlaceholder="항목 (예: 월세, 통신비, 구독료)"
        onAdd={expenseActions.add}
        onRemove={expenseActions.remove}
      />
    </>
  );
}
