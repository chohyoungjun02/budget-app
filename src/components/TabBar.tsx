import { s } from '../styles/theme';

export type Tab = 'ledger' | 'budget' | 'portfolio';

const TABS: [Tab, string][] = [
  ['ledger', '가계부'],
  ['budget', '예산'],
  ['portfolio', '자산 포트폴리오'],
];

export default function TabBar(props: { tab: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav style={s.tabs}>
      {TABS.map(([key, label]) => (
        <button
          key={key}
          aria-pressed={props.tab === key}
          style={{ ...s.tab, ...(props.tab === key ? s.tabActive : null) }}
          onClick={() => props.onChange(key)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
