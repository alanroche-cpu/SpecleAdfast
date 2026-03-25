import React from 'react';
import { B, BL, BL2, G, O, R } from '@/data/constants';

// ── Btn ──
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  v?: string;
  sz?: string;
  children: React.ReactNode;
}
export function Btn({ v = 'ghost', sz = '', children, style, ...rest }: BtnProps) {
  const base: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', borderRadius: 5, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, whiteSpace: 'nowrap', transition: 'filter .12s', ...style };
  const sizes: Record<string, React.CSSProperties> = { sm: { padding: '5px 12px', fontSize: 11 }, lg: { padding: '9px 20px', fontSize: 14 }, '': { padding: '7px 14px', fontSize: 12 } };
  const variants: Record<string, React.CSSProperties> = {
    brand: { background: B, color: '#fff' },
    ghost: { background: '#fff', color: '#374151', border: '1px solid #E5E7EB' },
    green: { background: G, color: '#fff' },
    red: { background: R, color: '#fff' },
  };
  return <button style={{ ...base, ...sizes[sz] || sizes[''], ...variants[v] || variants.ghost }} {...rest}>{children}</button>;
}

// ── Card ──
interface CardProps { children: React.ReactNode; style?: React.CSSProperties }
export function Card({ children, style }: CardProps) {
  return <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden', ...style }}>{children}</div>;
}

// ── CardH ──
interface CardHProps { title: string; sub?: string; right?: React.ReactNode }
export function CardH({ title, sub, right }: CardHProps) {
  return <div style={{ padding: '10px 18px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div><div style={{ fontWeight: 700, fontSize: 13 }}>{title}</div>{sub && <div style={{ fontSize: 11, color: '#9CA3AF' }}>{sub}</div>}</div>
    {right}
  </div>;
}

// ── Pill ──
interface PillProps { s: string; time?: string | null }
export function Pill({ s, time }: PillProps) {
  const m: Record<string, { bg: string; c: string; t: string }> = {
    confirmed: { bg: '#DCFCE7', c: G, t: 'Confirmed' }, pending: { bg: '#FEF3C7', c: O, t: 'Pending' },
    sent: { bg: BL, c: B, t: 'Sent' }, received: { bg: '#DCFCE7', c: G, t: 'Received' }, rejected: { bg: '#FEE2E2', c: R, t: 'Rejected' },
    approved: { bg: '#DCFCE7', c: G, t: 'Approved' }, archived: { bg: '#F3F4F6', c: '#6B7280', t: 'Archived' },
    new: { bg: BL, c: B, t: 'New' }, reviewed: { bg: '#FEF3C7', c: O, t: 'Reviewed' },
    running: { bg: '#DCFCE7', c: G, t: 'Running' }, stopped: { bg: '#FEE2E2', c: R, t: 'Stopped' },
  };
  const d = m[s] || { bg: '#F3F4F6', c: '#6B7280', t: s };
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 12, fontSize: 10, fontWeight: 700, background: d.bg, color: d.c, whiteSpace: 'nowrap' }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: d.c }} />{d.t}{time && <span style={{ fontWeight: 400, marginLeft: 2 }}>{time}</span>}
  </span>;
}

// ── Stat ──
interface StatProps { label: string; val: string | number; icon: React.ReactNode; color: string; bg: string }
export function Stat({ label, val, icon, color, bg }: StatProps) {
  return <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div><div style={{ fontSize: 11, color: '#6B7280', marginBottom: 2 }}>{label}</div><div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{val}</div></div>
    <div style={{ width: 42, height: 42, borderRadius: '50%', background: bg, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, color, opacity: 0.85 }}>{icon}</div>
  </div>;
}

// ── SBar ──
interface SBarProps { ph: string; val: string; onChange: (v: string) => void; style?: React.CSSProperties }
export function SBar({ ph, val, onChange, style }: SBarProps) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, padding: '0 10px', height: 32, ...style }}>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
    <input value={val} onChange={e => onChange(e.target.value)} placeholder={ph} style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 12, flex: 1 }} />
  </div>;
}

// ── Sel ──
export function Sel(props: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  const { style, children, ...rest } = props;
  return <select style={{ padding: '6px 10px', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 12, outline: 'none', cursor: 'pointer', ...style }} {...rest}>{children}</select>;
}

// ── In ──
export function In(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { style, ...rest } = props;
  return <input style={{ width: '100%', padding: '7px 10px', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 12, outline: 'none', boxSizing: 'border-box', ...style }} {...rest} />;
}

// ── Txt ──
export function Txt(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { style, ...rest } = props;
  return <textarea style={{ width: '100%', padding: '7px 10px', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 12, outline: 'none', resize: 'vertical', minHeight: 70, boxSizing: 'border-box', ...style }} {...rest} />;
}

// ── Lbl ──
interface LblProps { t: string; req?: boolean; children: React.ReactNode }
export function Lbl({ t, req, children }: LblProps) {
  return <div style={{ marginBottom: 10 }}>
    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>{t}{req && <span style={{ color: R }}> *</span>}</label>
    {children}
  </div>;
}

// ── Notice ──
interface NoticeProps { type?: string; icon?: string; children: React.ReactNode }
export function Notice({ type = 'info', icon, children }: NoticeProps) {
  const t: Record<string, { bg: string; bd: string; c: string }> = {
    info: { bg: '#EFF6FF', bd: '#BFDBFE', c: '#1E3A8A' }, warn: { bg: '#FEF3C7', bd: '#FDE68A', c: '#78350F' },
    error: { bg: '#FEE2E2', bd: '#FECACA', c: '#7F1D1D' }, success: { bg: '#DCFCE7', bd: '#BBF7D0', c: '#14532D' },
  };
  const d = t[type] || t.info;
  return <div style={{ display: 'flex', gap: 8, padding: '10px 12px', borderRadius: 7, fontSize: 12, marginBottom: 12, border: `1px solid ${d.bd}`, background: d.bg, color: d.c }}>
    {icon && <span style={{ flexShrink: 0 }}>{icon}</span>}<div>{children}</div>
  </div>;
}

// ── TRow ──
interface TRowProps { cols: string[] }
export function TRow({ cols }: TRowProps) {
  return <thead><tr>{cols.map((c, i) => <th key={i} style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #E5E7EB', whiteSpace: 'nowrap' }}>{c}</th>)}</tr></thead>;
}

// ── UpZone ──
interface UpZoneProps { onFile?: (f: File) => void }
export function UpZone({ onFile }: UpZoneProps) {
  const [drag, setDrag] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const ref = React.useRef<HTMLInputElement>(null);
  function handle(f: File) { setFile(f); if (onFile) onFile(f); }
  return <div
    onDragOver={e => { e.preventDefault(); setDrag(true); }}
    onDragLeave={() => setDrag(false)}
    onDrop={e => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) handle(e.dataTransfer.files[0]); }}
    onClick={() => ref.current?.click()}
    style={{ border: `2px dashed ${drag ? B : '#D1D5DB'}`, borderRadius: 7, padding: 24, textAlign: 'center', background: drag ? BL : '#fff', cursor: 'pointer' }}>
    <input ref={ref} type="file" accept=".pdf,.jpg,.jpeg" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) handle(e.target.files[0]); }} />
    {file
      ? <div style={{ fontSize: 12, fontWeight: 600, color: B }}>{file.name}</div>
      : <>
        <div style={{ fontSize: 24, marginBottom: 6 }}>📄</div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>Drag your ad here</div>
        <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 10 }}>PDF or JPG</div>
        <Btn v="ghost" sz="sm">Browse files</Btn>
      </>
    }
  </div>;
}
