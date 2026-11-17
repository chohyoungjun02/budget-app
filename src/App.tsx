import { useState } from 'react';
import { useAppData } from './hooks/useAppData';
import { globalCss, s } from './styles/theme';
import TabBar, { type Tab } from './components/TabBar';
import AdBanner from './components/AdBanner';
import BudgetPage from './pages/BudgetPage';
import PortfolioPage from './pages/PortfolioPage';
import LedgerPage from './pages/LedgerPage';

export default function App() {
  const data = useAppData();
  const [tab, setTab] = useState<Tab>('ledger');

  return (
    <div style={s.page}>
      <style>{globalCss}</style>
      <TabBar tab={tab} onChange={setTab} />

      {tab === 'ledger' ? (
        <LedgerPage ledger={data.ledger} onAdd={data.ledgerActions.add} onRemove={data.ledgerActions.remove}
          onUpdate={data.ledgerActions.update}
        />
      ) : tab === 'portfolio' ? (
        <PortfolioPage
          assets={data.assets}
          assetActions={data.assetActions}
          unit={data.unit}
          onUnit={(u) => data.setAssetUnit(u.mul)}
        />
      ) : (
        <BudgetPage
          incomes={data.incomes}
          expenses={data.expenses}
          incomeActions={data.incomeActions}
          expenseActions={data.expenseActions}
        />
      )}

      <AdBanner />
    </div>
  );
}
