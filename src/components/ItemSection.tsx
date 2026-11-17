import { useState, type KeyboardEvent } from 'react';
import type { Item, Unit } from '../types';
import { UNITS, fmtUnit, sum } from '../lib/format';
import { C, s } from '../styles/theme';

// 항목 목록 + 추가 폼 (수입·고정지출·자산 공통)
export default function ItemSection(props: {
  title: string;
  items: Item[];
  color: string;
  colorSoft: string;
  sign: '+' | '-' | '';
  namePlaceholder: string;
  onAdd: (name: string, amount: number) => void;
  onRemove: (id: number) => void;
  onUpdate?: (id: number, amount: number) => void; // 있으면 목록에서 금액을 바로 수정
  unit?: Unit; // 입력·표시 단위 (저장은 원)
}) {
  const { title, items, color, colorSoft, sign, namePlaceholder, onAdd, onRemove, onUpdate } = props;
  const unit = props.unit ?? UNITS[0];
  const [name, setName] = useState('');
  const [amountText, setAmountText] = useState('');

  const fmt = (n: number) => fmtUnit(n, unit);
  const pad = 20 + unit.label.length * 16; // 단위 글자 수만큼 입력칸 오른쪽 여백
  const amount = Number(amountText.replace(/,/g, '')) * unit.mul;
  const canAdd = name.trim() !== '' && amount > 0;

  const add = () => {
    if (!canAdd) return;
    onAdd(name.trim(), amount);
    setName('');
    setAmountText('');
  };

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') add();
  };

  return (
    <section style={s.card}>
      <div style={s.sectionHead}>
        <h2 style={s.sectionTitle}>{title}</h2>
        <span style={{ ...s.sectionTotal, color }}>{fmt(sum(items))}</span>
      </div>

      {items.length === 0 ? (
        <p style={s.empty}>아직 추가한 항목이 없어요</p>
      ) : (
        <ul style={s.list}>
          {items.map((item) => (
            <li key={item.id} style={s.row}>
              <span style={{ ...s.badge, background: colorSoft, color }}>{item.name.slice(0, 1)}</span>
              <span style={s.rowName}>{item.name}</span>
              {onUpdate ? (
                <div style={s.amountWrap}>
                  <input
                    className="ait-input"
                    style={{ ...s.rowInput, paddingRight: pad }}
                    inputMode="numeric"
                    aria-label={`${item.name} 금액`}
                    // shortcut: 고른 단위보다 작은 끝자리는 반올림해 보여줘요, 고치면 그 단위로 맞춰져요
                    value={item.amount ? Math.round(item.amount / unit.mul).toLocaleString('ko-KR') : ''}
                    onChange={(e) => onUpdate(item.id, Number(e.target.value.replace(/[^0-9]/g, '')) * unit.mul)}
                  />
                  <span style={{ ...s.unit, right: 10, fontSize: 15 }}>{unit.label}</span>
                </div>
              ) : (
                <span style={s.rowAmount}>
                  {sign}
                  {fmt(item.amount)}
                </span>
              )}
              <button style={s.remove} onClick={() => onRemove(item.id)} aria-label={`${item.name} 삭제`}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={s.form}>
        <input
          className="ait-input"
          style={s.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={onEnter}
          placeholder={namePlaceholder}
        />
        <div style={s.amountWrap}>
          <input
            className="ait-input"
            style={{ ...s.input, paddingRight: pad + 8 }}
            inputMode="numeric"
            value={amountText}
            onChange={(e) => {
              const digits = e.target.value.replace(/[^0-9]/g, '');
              setAmountText(digits ? Number(digits).toLocaleString('ko-KR') : '');
            }}
            onKeyDown={onEnter}
            placeholder="금액"
          />
          <span style={s.unit}>{unit.label}</span>
        </div>
        <button
          style={{ ...s.addBtn, background: canAdd ? C.blue : '#d1d6db' }}
          disabled={!canAdd}
          onClick={add}
        >
          추가하기
        </button>
      </div>
    </section>
  );
}
