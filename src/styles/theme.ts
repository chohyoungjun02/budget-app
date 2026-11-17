import type { CSSProperties } from 'react';

export const C = {
  bg: '#f2f4f6',
  card: '#ffffff',
  text: '#191f28',
  sub: '#6b7684',
  faint: '#8b95a1',
  line: '#e5e8eb',
  input: '#f2f4f6',
  blue: '#3182f6',
  blueSoft: '#e8f3ff',
  red: '#f04452',
  redSoft: '#ffeeee',
};

export const globalCss = `
  * { box-sizing: border-box; }
  html, body, #root { margin: 0; padding: 0; background: ${C.bg}; }
  body {
    font-family: 'Toss Product Sans', 'Pretendard', -apple-system, BlinkMacSystemFont,
      'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
    color: ${C.text};
    -webkit-font-smoothing: antialiased;
  }
  #root { max-width: 480px; margin: 0 auto; text-align: left; }
  .ait-input:focus { outline: none; box-shadow: inset 0 0 0 2px ${C.blue}; background: #fff; }
  button { font-family: inherit; cursor: pointer; }
  button:disabled { cursor: default; }
`;

// 여러 컴포넌트가 함께 쓰는 공통 스타일
export const s: Record<string, CSSProperties> = {
  page: { minHeight: '100vh', padding: '8px 16px 40px' },
  header: { padding: '16px 4px 12px' },
  month: { margin: 0, fontSize: 22, fontWeight: 700 },

  tabs: { display: 'flex', gap: 4, padding: 4, margin: '8px 0 4px', background: C.line, borderRadius: 14 },
  tab: { flex: 1, height: 40, border: 'none', borderRadius: 10, background: 'transparent', color: C.sub, fontSize: 15, fontWeight: 600 },
  tabActive: { background: C.card, color: C.text },
  unitTabs: { display: 'flex', gap: 2, padding: 3, background: C.input, borderRadius: 10 },
  unitTab: { height: 30, padding: '0 10px', border: 'none', borderRadius: 8, background: 'transparent', color: C.sub, fontSize: 13, fontWeight: 600 },

  pie: { width: 200, height: 200, borderRadius: '50%', margin: '8px auto 20px' },
  legendRow: { display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 15 },
  dot: { width: 12, height: 12, borderRadius: 4, flexShrink: 0 },

  card: { background: C.card, borderRadius: 20, padding: '22px 20px', marginBottom: 12 },

  heroLabel: { margin: 0, fontSize: 15, color: C.sub, fontWeight: 500 },
  heroAmount: { margin: '6px 0 14px', fontSize: 32, fontWeight: 700, letterSpacing: -0.5 },
  pill: { display: 'inline-block', margin: 0, padding: '8px 12px', borderRadius: 10, fontSize: 14, fontWeight: 600 },
  divider: { height: 1, background: C.line, margin: '20px 0 14px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 15 },
  summaryLabel: { color: C.sub },
  summaryValue: { fontWeight: 600 },

  sectionHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 },
  sectionTitle: { margin: 0, fontSize: 18, fontWeight: 700 },
  sectionTotal: { fontSize: 16, fontWeight: 700 },
  empty: { margin: '12px 0 16px', color: C.faint, fontSize: 14 },

  list: { listStyle: 'none', margin: '4px 0 12px', padding: 0 },
  row: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' },
  badge: {
    width: 36, height: 36, borderRadius: 12, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700,
  },
  rowName: { flex: 1, fontSize: 16, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  rowAmount: { fontSize: 16, fontWeight: 600 },
  rowInput: {
    width: 140, height: 38, padding: '0 30px 0 10px', border: 'none', borderRadius: 10,
    background: C.input, fontSize: 15, fontWeight: 600, color: C.text, textAlign: 'right',
  },
  remove: {
    width: 28, height: 28, border: 'none', borderRadius: 8, background: C.input,
    color: C.faint, fontSize: 18, lineHeight: 1, flexShrink: 0,
  },

  form: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 },
  input: {
    width: '100%', height: 50, padding: '0 16px', border: 'none', borderRadius: 14,
    background: C.input, fontSize: 16, color: C.text,
  },
  amountWrap: { position: 'relative' },
  unit: { position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: C.sub, fontSize: 16 },
  addBtn: { height: 52, border: 'none', borderRadius: 14, color: '#fff', fontSize: 16, fontWeight: 600 },
};
