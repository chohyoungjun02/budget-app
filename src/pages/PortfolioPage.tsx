import type { Item, Unit } from '../types';
import type { ListActions } from '../hooks/useAppData';
import { C } from '../styles/theme';
import PortfolioChart from '../components/PortfolioChart';
import ItemSection from '../components/ItemSection';

export default function PortfolioPage(props: {
  assets: Item[];
  assetActions: ListActions;
  unit: Unit;
  onUnit: (u: Unit) => void;
}) {
  const { assets, assetActions, unit, onUnit } = props;

  return (
    <>
      <PortfolioChart items={assets} unit={unit} onUnit={onUnit} />
      <ItemSection
        title="자산"
        items={assets}
        color={C.blue}
        colorSoft={C.blueSoft}
        sign=""
        namePlaceholder="항목 (예: 예금, 주식, 코인, 부동산)"
        unit={unit}
        onAdd={assetActions.add}
        onRemove={assetActions.remove}
        onUpdate={assetActions.update}
      />
    </>
  );
}
