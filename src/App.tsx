import { useState } from 'react';
import { useAppData } from './hooks/useAppData';
import { globalCss, s } from './styles/theme';
import TabBar, { type Tab } from './components/TabBar';
import AdBanner from './components/AdBanner';
import BudgetPage from './pages/BudgetPage';
import PortfolioPage from './pages/PortfolioPage';

export default function App() {
  const data = useAppData();
  const [tab, setTab] = useState<Tab>('budget');

  return (
    <div style={s.page}>
      <style>{globalCss}</style>
      <TabBar tab={tab} onChange={setTab} />

      {tab === 'portfolio' ? (
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
