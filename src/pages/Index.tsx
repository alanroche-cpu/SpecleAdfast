import React, { useState, useRef, useEffect } from 'react';
import { Landing } from '@/components/portal/Landing';
import { Topbar } from '@/components/portal/Topbar';
import { Btn, Card, CardH, Stat, Pill, SBar, Sel, TRow, Notice, In, Txt, Lbl, UpZone } from '@/components/portal/SharedComponents';
import { B, BD, BL, BL2, G, O, R, BOOKINGS, JOBS, PUBLISHERS, SECTIONS, INBOX, SERVICES, THMAP, type Job, type Booking, type Publisher } from '@/data/constants';
import { LOGO_NEWSUK, LOGO_CONDENAST, LOGO_GMG, LOGO_REACH, LOGO_FT, LOGO_HEARST, LOGO_TMG } from '@/data/logos';
import economistLogo from '@/assets/economist-logo.png';
import calendarIcon from '@/assets/calendar-icon.png';
import clockIcon from '@/assets/clock-icon.jpg';
import colourMgmtIcon from '@/assets/colour-management-icon.jpeg';
import paperPlaneIcon from '@/assets/paper-plane-icon.png';
import tickIcon from '@/assets/tick-icon.png';
import warningIcon from '@/assets/warning-icon.png';
import sentIcon from '@/assets/sent-icon.png';
import receivedIcon from '@/assets/received-icon.jpeg';

const LOGOS: Record<string, string> = { NEWSUK: LOGO_NEWSUK, CONDENAST: LOGO_CONDENAST, GMG: LOGO_GMG, REACH: LOGO_REACH, FT: LOGO_FT, HEARST: LOGO_HEARST, TMG: LOGO_TMG, ECONOMIST: economistLogo };

// Reusable icon component for consistent sizing
function IconImg({ src, alt, size = 18 }: { src: string; alt: string; size?: number }) {
  return <img src={src} alt={alt} style={{ width: size, height: size, objectFit: 'contain' }} />;
}

// ── StatusBadge (rounded icon badge like action buttons) ──
function StatusBadge({ status, time }: { status: string; time?: string | null }) {
  const iconMap: Record<string, { bg: string; c: string; border: string; imgSrc?: string; icon?: string; t: string }> = {
    confirmed: { bg: '#DCFCE7', c: G, border: '#BBF7D0', imgSrc: tickIcon, t: 'Confirmed' },
    pending: { bg: '#FEF3C7', c: O, border: '#FDE68A', imgSrc: clockIcon, t: 'Pending' },
    sent: { bg: BL, c: B, border: '#BFDBFE', imgSrc: sentIcon, t: 'Sent' },
    received: { bg: '#DCFCE7', c: G, border: '#BBF7D0', imgSrc: receivedIcon, t: 'Received' },
    rejected: { bg: '#FEE2E2', c: R, border: '#FECACA', imgSrc: warningIcon, t: 'Rejected' },
    approved: { bg: '#DCFCE7', c: G, border: '#BBF7D0', imgSrc: tickIcon, t: 'Approved' },
    archived: { bg: '#F3F4F6', c: '#6B7280', border: '#E5E7EB', icon: '▪', t: 'Archived' },
    new: { bg: BL, c: B, border: '#BFDBFE', icon: '★', t: 'New' },
    reviewed: { bg: '#FEF3C7', c: O, border: '#FDE68A', imgSrc: clockIcon, t: 'Reviewed' },
    running: { bg: '#DCFCE7', c: G, border: '#BBF7D0', imgSrc: tickIcon, t: 'Running' },
    stopped: { bg: '#FEE2E2', c: R, border: '#FECACA', imgSrc: warningIcon, t: 'Stopped' },
    processed: { bg: '#F3F4F6', c: '#6B7280', border: '#E5E7EB', icon: '⚙', t: 'Processed' },
  };
  const d = iconMap[status] || { bg: '#F3F4F6', c: '#6B7280', border: '#E5E7EB', icon: '?', t: status };
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: d.bg, color: d.c, border: `1px solid ${d.border}`, whiteSpace: 'nowrap' }}>
    <span style={{ width: 18, height: 18, borderRadius: 4, background: d.imgSrc ? 'transparent' : d.c, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0, overflow: 'hidden' }}>
      {d.imgSrc ? <img src={d.imgSrc} alt={d.t} style={{ width: 16, height: 16, objectFit: 'contain' }} /> : d.icon}
    </span>
    {d.t}{time && <span style={{ fontWeight: 400, marginLeft: 2, color: d.c, opacity: .7 }}>{time}</span>}
  </span>;
}

// ── Ad Preview Thumbnail ──
function AdPreview({ job, onClick }: { job: Job; onClick?: () => void }) {
  const colors: Record<string, string[]> = {
    pdf: ['#E74C3C', '#C0392B', '#2C3E50', '#ECF0F1'],
    jpg: ['#3498DB', '#2ECC71', '#F39C12', '#E74C3C'],
    tif: ['#9B59B6', '#2980B9', '#1ABC9C', '#F1C40F'],
    eps: ['#34495E', '#E67E22', '#1ABC9C', '#3498DB'],
  };
  const c = colors[job.th] || colors.pdf;
  const isFull = job.fmt.toLowerCase().includes('full');
  const isDPS = job.fmt.toLowerCase().includes('dps') || job.fmt.toLowerCase().includes('double');
  const w = isDPS ? 64 : 44;
  const h = isFull ? 42 : 32;
  return <div onClick={onClick} style={{ width: w + 8, height: h + 8, borderRadius: 5, background: '#1A1A2E', border: '1px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: onClick ? 'zoom-in' : 'default', overflow: 'hidden', position: 'relative' }} title="Click to preview">
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="0" y="0" width={w} height={h} rx="2" fill="#fff" />
      <rect x="2" y="2" width={w * .6} height="5" rx="1" fill={c[0]} opacity=".85" />
      <rect x="2" y="9" width={w * .45} height="3" rx="1" fill={c[2]} opacity=".5" />
      <rect x="2" y="14" width={w - 4} height={h * .45} rx="1" fill={c[1]} opacity=".3" />
      <rect x="2" y={h - 8} width={w * .35} height="3" rx="1" fill={c[3]} opacity=".4" />
      <rect x={w * .4} y={h - 8} width={w * .3} height="3" rx="1" fill={c[0]} opacity=".3" />
    </svg>
  </div>;
}

// ── SoftproofOverlay ──
function SoftproofOverlay({ onClose }: { onClose: () => void }) {
  return <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.88)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
    <div onClick={e => e.stopPropagation()} style={{ background: '#1A1A2E', borderRadius: 10, padding: 16, maxWidth: 540, width: '90%', cursor: 'default' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Softproof Preview</div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 5, width: 26, height: 26, cursor: 'pointer', color: '#fff', fontSize: 14 }}>x</button>
      </div>
      <div style={{ background: '#fff', borderRadius: 5, minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 32 }}>
        <span style={{ fontSize: 56 }}>🖼</span>
        <div style={{ fontSize: 12, fontWeight: 600, textAlign: 'center' }}>MCS-00127_B_Spring_Seasonal_Press_UK</div>
        <div style={{ fontSize: 11, color: '#6B7280', textAlign: 'center' }}>Daily Record - Display/ROP</div>
      </div>
    </div>
  </div>;
}

// ── CreateDeliveryModal ──
function CreateDeliveryModal({ bk, onClose, onSubmit }: { bk: Booking; onClose: () => void; onSubmit: () => void }) {
  const [col, setCol] = useState('dont');
  const [uMode, setUMode] = useState('upload');
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  return <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 20, overflowY: 'auto' }}>
    <div onClick={e => e.stopPropagation()} style={{ background: '#F0EFEB', borderRadius: 8, width: '100%', maxWidth: 980, marginTop: 30, boxShadow: '0 20px 60px rgba(0,0,0,.3)', overflow: 'hidden' }}>
      <div style={{ background: '#F0EFEB', padding: '14px 28px 0' }}>
        <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>
          <span style={{ color: '#0D9488', cursor: 'pointer' }} onClick={onClose}>Home</span>{' > '}
          <span style={{ color: '#0D9488', cursor: 'pointer' }}>{bk.owner || 'News UK Ltd'}</span>{' > '}
          <span style={{ color: '#0D9488', cursor: 'pointer' }}>{bk.pub}</span>{' > Create Delivery'}
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{bk.pub}</h1>
        <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>United Kingdom (National)</div>
        <div style={{ borderBottom: '1px solid #D1D5DB' }} />
      </div>
      <div style={{ padding: '20px 28px 28px' }}>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, padding: '24px 28px', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Booking Details</div>
            <div style={{ background: '#F9FAFB', borderRadius: 6, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#374151' }}>{bk.pub}</div>
              {[['Size', bk.size], ['Advertiser', bk.adv], ['Brand', bk.brand], ['Insertion', bk.insertion], ['Deadline', bk.deadline], ['URN', bk.urn]].map(item => item[1] ? <div key={item[0]} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '5px 0', borderBottom: '1px solid #E5E7EB' }}>
                <span style={{ color: '#6B7280' }}>{item[0]}</span>
                <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{item[1]}</span>
              </div> : null)}
            </div>
            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6, padding: 12, fontSize: 12 }}>
              <div style={{ fontWeight: 600, color: '#1E3A8A', marginBottom: 5 }}>Colour Profile</div>
              <div style={{ color: '#374151', marginBottom: 8 }}>This publication requires <strong>WAN-IFRAnewspaper26v5.icc</strong></div>
              {[['dont', "Don't Optimise"], ['optimise', 'Optimise for me']].map(item => <label key={item[0]} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', marginBottom: 5 }}>
                <input type="radio" name="cdcol" checked={col === item[0]} onChange={() => setCol(item[0])} style={{ accentColor: '#0D9488' }} />{item[1]}
              </label>)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Delivery Information</div>
            <div style={{ paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid #E5E7EB' }}>
              {[['Advertiser', bk.adv, 'required'], ['Brand / Headline', bk.brand, ''], ['Media Buyer', '', '']].map(item => <div key={item[0]} style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 5 }}>{item[0]}{item[2] ? <span style={{ color: '#6B7280', fontSize: 12 }}> (required)</span> : null}</label>
                <input defaultValue={item[1] || ''} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
              </div>)}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Insertion Information</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 5 }}>Insertion Date <span style={{ color: '#6B7280', fontSize: 12 }}>(required)</span></label>
                  <input type="date" style={{ width: '100%', padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 13, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 5 }}>URN / Booking No.</label>
                  <input defaultValue={bk.urn || ''} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 24, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #E5E7EB' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, cursor: 'pointer' }}><input type="radio" name="cdcolour" defaultChecked style={{ accentColor: '#0D9488' }} /> Colour</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, cursor: 'pointer' }}><input type="radio" name="cdcolour" style={{ accentColor: '#0D9488' }} /> BW</label>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 5 }}>Notes / Special Instructions</label>
                <textarea style={{ width: '100%', padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 13, outline: 'none', resize: 'vertical', minHeight: 70, boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 20, marginBottom: 10 }}>
                {[['upload', 'Upload file now'], ['later', 'Save (upload later)']].map(item => <label key={item[0]} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, cursor: 'pointer' }}>
                  <input type="radio" name="cdup" checked={uMode === item[0]} onChange={() => setUMode(item[0])} style={{ accentColor: '#0D9488' }} />{item[1]}
                </label>)}
              </div>
              {uMode === 'upload' && <div style={{ border: '1px solid #E5E7EB', borderRadius: 6, padding: 14, background: '#fff' }}>
                <div style={{ marginBottom: 6, fontSize: 13, fontWeight: 500 }}>Choose file</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="file" ref={ref} style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} />
                  <button onClick={() => ref.current?.click()} style={{ padding: '5px 12px', background: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Choose file</button>
                  <span style={{ fontSize: 12, color: '#6B7280' }}>{file ? file.name : 'No file chosen'}</span>
                </div>
              </div>}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingTop: 8 }}>
              <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 13, cursor: 'pointer', color: '#374151' }}>Cancel</button>
              <button onClick={onSubmit} style={{ padding: '10px 28px', background: '#16A34A', color: '#fff', border: 'none', borderRadius: 5, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>Create Delivery ›</button>
              <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, cursor: 'pointer', marginLeft: 8 }}>
                <input type="checkbox" style={{ accentColor: '#0D9488' }} /> Auto Deliver
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

// ── SizeRow ──
function SizeRow({ sz, section, onSelect }: { sz: { n: string; w: string; h: string; bw?: string; bh?: string }; section: string; onSelect?: (sz: any) => void }) {
  const tw = parseFloat(sz.w) || 264, th = parseFloat(sz.h) || 338;
  const isDPS = sz.n.toLowerCase().includes('double') || sz.n.toLowerCase().includes('dps') || sz.n.toLowerCase().includes('spread');
  const rH = Math.min(Math.round(48 * (th / Math.max(tw, th))), 58);
  const rW = isDPS ? 76 : Math.min(Math.round(rH * (tw / th)), 44);
  const rW2 = isDPS ? Math.floor(rW / 2) - 2 : 0;
  return <div style={{ border: '1px solid #E5E7EB', borderRadius: 7, marginBottom: 10, overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
    <div style={{ padding: '12px 14px', flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{sz.n}</div>
      <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6 }}>{section}</div>
      <div style={{ fontSize: 10, color: BL2 }}>Type Area: {sz.w} x {sz.h}{sz.bw ? ' | PDF: ' + sz.bw + ' x ' + sz.bh : ' | No Bleed'}</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 12px', background: '#f0fdf4', borderLeft: '1px solid #E5E7EB', minWidth: 80 }}>
      <svg width={isDPS ? rW + 6 : rW + 4} height={rH + 4} xmlns="http://www.w3.org/2000/svg">
        {isDPS
          ? <><rect x="0" y="0" width={rW2} height={rH} fill="#bbf7d0" stroke="#16A34A" strokeWidth="1" rx="2" /><rect x={rW2 + 4} y="0" width={rW2} height={rH} fill="#bbf7d0" stroke="#16A34A" strokeWidth="1" rx="2" /></>
          : <rect x="0" y="0" width={rW} height={rH} fill="#bbf7d0" stroke="#16A34A" strokeWidth="1" rx="2" />}
      </svg>
    </div>
    <div style={{ padding: '10px 12px', borderLeft: '1px solid #E5E7EB', minWidth: 160 }}>
      <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}>
        <thead><tr><th style={{ padding: '2px 6px', color: '#6B7280', textAlign: 'left', fontSize: 10 }}></th><th style={{ padding: '2px 8px', fontWeight: 700, textAlign: 'center' }}>Width</th><th style={{ padding: '2px 8px', fontWeight: 700, textAlign: 'center' }}>Height</th></tr></thead>
        <tbody>
          <tr style={{ borderTop: '1px solid #F3F4F6' }}><td style={{ padding: '4px 6px', color: '#6B7280', fontSize: 10 }}><span style={{ display: 'inline-block', width: 7, height: 7, background: '#d63b3b', borderRadius: 2, marginRight: 3, verticalAlign: 'middle' }} />Type Area</td><td style={{ textAlign: 'center', padding: '4px 8px', fontWeight: 500 }}>{sz.w}</td><td style={{ textAlign: 'center', padding: '4px 8px', fontWeight: 500 }}>{sz.h}</td></tr>
          <tr style={{ borderTop: '1px solid #F3F4F6' }}><td style={{ padding: '4px 6px', color: '#6B7280', fontSize: 10 }}><span style={{ display: 'inline-block', width: 7, height: 7, background: '#1a5fb4', borderRadius: 2, marginRight: 3, verticalAlign: 'middle' }} />PDF Size</td><td style={{ textAlign: 'center', padding: '4px 8px', fontWeight: 500 }}>{sz.bw || sz.w}</td><td style={{ textAlign: 'center', padding: '4px 8px', fontWeight: 500 }}>{sz.bh || sz.h}</td></tr>
        </tbody>
      </table>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 12, background: '#f0fdf4', borderLeft: '1px solid #E5E7EB', justifyContent: 'center', minWidth: 120 }}>
      <button onClick={() => onSelect?.(sz)} style={{ padding: '6px 12px', background: '#16A34A', color: '#fff', border: 'none', borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Select Ad Size</button>
      <button style={{ padding: '4px 10px', background: '#fff', color: '#374151', border: '1px solid #E5E7EB', borderRadius: 5, fontSize: 11, cursor: 'pointer' }}>Add to Schedule</button>
      <button style={{ padding: '4px 10px', background: '#fff', color: '#374151', border: '1px solid #E5E7EB', borderRadius: 5, fontSize: 11, cursor: 'pointer' }}>InDesign Template</button>
    </div>
  </div>;
}

// ── PublisherPage (full page, replaces PubModal) ──
function PublisherPage({ pub, onClose, onPubSelected }: { pub: Publisher; onClose: () => void; onPubSelected: (pub: Publisher, idx: number) => void }) {
  const logoSrc = LOGOS[pub.logoKey];
  return <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', animation: 'fd .2s ease' }}>
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>
        <span onClick={onClose} style={{ color: '#0D9488', cursor: 'pointer' }}>← Back to Publishers</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ width: 80, height: 80, borderRadius: 10, background: '#F9FAFB', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {logoSrc
            ? <img src={logoSrc} alt={pub.name} style={{ height: 60, maxWidth: 70, objectFit: 'contain' }} />
            : <div style={{ fontSize: 18, fontWeight: 700, color: '#374151' }}>{pub.name.slice(0, 2)}</div>}
        </div>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>{pub.name}</h2>
          <p style={{ fontSize: 13, color: '#6B7280' }}>{pub.titles} publications · {pub.cat}</p>
        </div>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20, background: '#F9FAFB', borderRadius: 8, padding: 16, border: '1px solid #E5E7EB' }}>
      {[['Tel', pub.tel], ['Email', pub.email], ['Address', pub.addr]].map((item, i) => <div key={i} style={{ gridColumn: i === 2 ? 'span 3' : 'auto' }}><div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 2 }}>{item[0]}</div><div style={{ fontSize: 12, fontWeight: 600 }}>{item[1]}</div></div>)}
    </div>
    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#374151' }}>{pub.pubs.length} Publications</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
      {pub.pubs.map((p, i) => <div key={i} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{p.n}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 3 }}>{p.sec}</div>
          <div style={{ fontSize: 11, color: G, fontWeight: 600 }}>{p.h} x {p.w}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 46, borderRadius: 4, background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="28"><rect x="1" y="1" width="20" height="26" rx="2" fill="#bbf7d0" stroke="#16A34A" strokeWidth="1" /></svg>
          </div>
          <Btn v="green" sz="sm" onClick={() => { onPubSelected(pub, i); }}>Send Ad</Btn>
        </div>
      </div>)}
    </div>
  </div>;
}

// ── PubSpecPage (full page, replaces PubSpecModal) ──
function PubSpecPage({ pub, pubIdx, onClose, onSendAd }: { pub: Publisher; pubIdx: number; onClose: () => void; onSendAd?: (data: any) => void }) {
  const [secIdx, setSecIdx] = useState(0);
  const pubName = pub.pubs[pubIdx]?.n || pub.name;
  const s = SECTIONS[secIdx];
  return <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', animation: 'fd .2s ease' }}>
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>
        <span onClick={onClose} style={{ color: '#0D9488', cursor: 'pointer' }}>← Back to {pub.name}</span>
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>{pubName}</h2>
      <p style={{ fontSize: 13, color: '#6B7280' }}>{pub.name}</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, background: '#F9FAFB', borderRadius: 7, padding: 10, marginBottom: 14, border: '1px solid #E5E7EB' }}>
      {[['Tel', pub.tel], ['Email', pub.email], ['Address', pub.addr]].map((item, i) => <div key={i} style={{ gridColumn: i === 2 ? 'span 3' : 'auto' }}><div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 1 }}>{item[0]}</div><div style={{ fontSize: 11, fontWeight: 600 }}>{item[1]}</div></div>)}
    </div>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
      {SECTIONS.map((sec, i) => <button key={i} onClick={() => setSecIdx(i)} style={{ padding: '5px 12px', fontSize: 11, fontWeight: 600, borderRadius: 16, cursor: 'pointer', border: `1px solid ${i === secIdx ? B : '#E5E7EB'}`, background: i === secIdx ? B : '#fff', color: i === secIdx ? '#fff' : '#6B7280' }}>{sec.name}</button>)}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, background: '#F9FAFB', borderRadius: 7, padding: 10, marginBottom: 14, border: '1px solid #E5E7EB' }}>
      {[['Spec', s.spec], ['PDF Standard', s.pdf], ['Colour ICC', s.icc], ['TAC', s.tac], ['Bleed', s.bleed]].map(item => <div key={item[0]}><div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 1 }}>{item[0]}</div><div style={{ fontSize: 11, fontWeight: 600 }}>{item[1]}</div></div>)}
    </div>
    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Ad Sizes - {s.name}</div>
    {s.sizes.map((sz, i) => <SizeRow key={i} sz={sz} section={s.name} onSelect={(sz) => onSendAd?.({ pub, section: s.name, size: sz })} />)}
    {s.columns && <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden', marginTop: 16, marginBottom: 16, display: 'grid', gridTemplateColumns: '300px 1fr' }}>
      <div style={{ padding: 16, borderRight: '1px solid #E5E7EB', background: '#fff' }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Display Column Sizes</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #E5E7EB' }}>{pubName} | Display</div>
        {s.vectorLimit && <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, marginBottom: 3 }}>Vector limit set to <strong style={{ color: R }}>less</strong> than <strong style={{ color: R }}>{s.vectorLimit.toLocaleString()}</strong></div>
          <div style={{ fontSize: 12 }}>Image object limit set to <strong style={{ color: R }}>less</strong> than <strong style={{ color: R }}>{(s.imageLimit ?? 0).toLocaleString()}</strong></div>
        </div>}
        {s.deadlines && <div>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Sections and Deadlines:</div>
          {s.deadlines.map((d, di) => <div key={di} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: R, fontStyle: 'italic', marginBottom: 4 }}>{d.time}</div>
            <ul style={{ paddingLeft: 18, margin: 0 }}>{d.sections.map((sec, si) => <li key={si} style={{ fontSize: 12, marginBottom: 2 }}>{sec}</li>)}</ul>
          </div>)}
        </div>}
        {s.dpsNote && <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 10, marginTop: 4, fontSize: 12, color: '#374151' }}>
          For <strong style={{ color: R }}>DPS</strong> submissions, {s.dpsNote}
        </div>}
      </div>
      <div style={{ padding: 16, background: '#fff' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 14 }}>
          <thead><tr>
            <th style={{ padding: '6px 8px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#374151', borderBottom: '1px solid #E5E7EB' }}></th>
            {[1, 2, 3, 4, 5, 6, 7].map(n => <th key={n} style={{ padding: '6px 8px', textAlign: 'left', fontSize: 12, fontWeight: 700, borderBottom: '1px solid #E5E7EB' }}>{n}</th>)}
          </tr></thead>
          <tbody>
            {s.columns.map((row, ri) => <tr key={ri} style={{ borderBottom: '1px solid #F3F4F6' }}>
              <td style={{ padding: 8, fontSize: 12, fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}>{row.row}</td>
              {row.cols.map((val, ci) => <td key={ci} style={{ padding: 8, fontSize: 12, color: val ? '#374151' : '' }}>{val || ''}</td>)}
            </tr>)}
          </tbody>
        </table>
        <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 7, padding: 14 }}>
          <div style={{ fontSize: 12, color: BL2, fontWeight: 600, marginBottom: 10 }}>Maximum column height: {s.maxColH}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600 }}>Height</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="text" style={{ width: 80, padding: '6px 8px', border: '1px solid #E5E7EB', borderRadius: 5, fontSize: 12, outline: 'none' }} />
              <span style={{ fontSize: 12, color: '#6B7280' }}>mm</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 8, alignItems: 'center', marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600 }}>Width</label>
            <select style={{ padding: '6px 8px', border: '1px solid #E5E7EB', borderRadius: 5, fontSize: 12, outline: 'none', cursor: 'pointer' }}>
              <option value="">Select column width</option>
              {s.columns[0]?.cols.filter(v => v).map((v, i) => <option key={i} value={v!}>{i + 1} col - {v}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '8px 18px', background: '#16A34A', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Build Ad</button>
            <button onClick={() => onSendAd?.({ pub, section: s.name, size: s.sizes[0] })} style={{ padding: '8px 18px', background: '#16A34A', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Select Ad Size</button>
          </div>
        </div>
      </div>
    </div>}
  </div>;
}

// ── Dashboard ──
function Dashboard({ setTab }: { setTab: (t: string) => void }) {
  const [cdBk, setCdBk] = useState<Booking | null>(null);
  return <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', animation: 'fd .2s ease' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 18 }}>
      <Stat label="Bookings" val={BOOKINGS.length} icon={<IconImg src={calendarIcon} alt="Bookings" />} color={O} bg="#FEF3C7" />
      <Stat label="Require Attention" val="1" icon={<IconImg src={warningIcon} alt="Attention" />} color={R} bg="#FEE2E2" />
      <Stat label="Waiting to be delivered" val={BOOKINGS.filter(b => b.status !== 'sent' && b.status !== 'received').length} icon={<IconImg src={clockIcon} alt="Waiting" />} color={BL2} bg="#EFF6FF" />
      <Stat label="Completed This Month" val="28" icon={<IconImg src={tickIcon} alt="Completed" />} color={G} bg="#DCFCE7" />
    </div>
    <Card style={{ marginBottom: 16 }}>
      <CardH title="My Bookings" sub="Publisher booking data" right={<Btn v="ghost" sz="sm" onClick={() => setTab('bookings')}>View all</Btn>} />
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TRow cols={['Status', 'URN', 'Publication', 'Size', 'Advertiser', 'Insertion', 'Deadline', 'Actions']} />
          <tbody>
            {BOOKINGS.map((b, i) => <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={{ padding: '12px 8px' }}><StatusBadge status={b.status} /></td>
              <td style={{ padding: '12px 8px', fontSize: 11, fontFamily: 'monospace', color: '#6B7280' }}>{b.urn}</td>
              <td style={{ padding: '12px 8px' }}><div style={{ fontSize: 12, fontWeight: 600 }}>{b.pub}</div><div style={{ fontSize: 10, color: '#9CA3AF' }}>{b.owner}</div></td>
              <td style={{ padding: '12px 8px', fontSize: 12 }}>{b.size}</td>
              <td style={{ padding: '12px 8px', fontSize: 12 }}>{b.adv}</td>
              <td style={{ padding: '12px 8px', fontSize: 12 }}>{b.insertion}</td>
              <td style={{ padding: '12px 8px', fontSize: 11 }}>{b.deadline}</td>
              <td style={{ padding: '12px 8px' }}><Btn v="green" sz="sm" onClick={() => setCdBk(b)}>+ Create Delivery</Btn></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16 }}>
      <Card>
        <CardH title="Quick Actions" />
        <div style={{ padding: '4px 16px 12px' }}>
          {[{ icon: paperPlaneIcon, t: 'Send Ad', s: 'specs' }, { icon: null, t: 'My Ad Deliveries', s: 'tracking', isGear: true }, { icon: colourMgmtIcon, t: 'Colour Management', s: 'colour' }].map(a => <div key={a.t} onClick={() => setTab(a.s)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid #E5E7EB', cursor: 'pointer' }}>
            <div style={{ width: 34, height: 34, borderRadius: 7, background: BL, color: B, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>
              {a.isGear ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> : <img src={a.icon!} alt={a.t} style={{ width: 20, height: 20, objectFit: 'contain' }} />}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{a.t}</div>
          </div>)}
        </div>
      </Card>
      <Card>
        <CardH title="Recent Activity" />
        <div style={{ padding: '0 16px' }}>
          {[{ dot: G, t: 'Upload completed', s: 'The Times - Full Page', dt: '2 hours ago' }, { dot: BL2, t: 'Spec downloaded', s: 'Vogue UK', dt: '5 hours ago' }, { dot: O, t: 'Upload pending', s: 'Financial Times', dt: '1 day ago' }, { dot: G, t: 'Upload approved', s: 'The Guardian', dt: '2 days ago' }].map((a, i) => <div key={i} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '11px 0', borderBottom: i < 3 ? '1px solid #E5E7EB' : 'none', gap: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: a.dot, marginTop: 4, flexShrink: 0 }} />
            <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 500 }}>{a.t}</div><div style={{ fontSize: 11, color: '#6B7280', marginTop: 1 }}>{a.s}</div></div>
            <span style={{ fontSize: 11, color: '#9CA3AF', whiteSpace: 'nowrap' }}>{a.dt}</span>
          </div>)}
        </div>
      </Card>
    </div>
    {cdBk && <CreateDeliveryModal bk={cdBk} onClose={() => setCdBk(null)} onSubmit={() => setCdBk(null)} />}
  </div>;
}

// ── Tracking ──
function Tracking({ onContinue, preflightResult, onReUpload }: { onContinue?: () => void; preflightResult?: string | null; onReUpload?: () => void }) {
  const [jobs, setJobs] = useState<Job[]>(JOBS.map(j => ({ ...j })));
  const [q, setQ] = useState('');
  const [showArch, setShowArch] = useState(false);
  const [previewJob, setPreviewJob] = useState<Job | null>(null);
  const [actionsOpen, setActionsOpen] = useState(false);
  function toggle(id: string) { setJobs(jobs.map(x => x.id === id ? { ...x, sel: !x.sel } : x)); }
  const filt = jobs.filter(j => {
    const qOk = !q || j.id.toLowerCase().includes(q) || j.adv.toLowerCase().includes(q) || j.pub.toLowerCase().includes(q);
    return qOk && (showArch ? j.arch : !j.arch);
  });
  const sel = filt.filter(j => j.sel);
  const tot = jobs.filter(j => !j.arch).length;
  const sent = jobs.filter(j => j.status === 'sent' && !j.arch).length;
  const rcvd = jobs.filter(j => j.status === 'received' && !j.arch).length;
  const rjct = jobs.filter(j => j.status === 'rejected' && !j.arch).length;

  return <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', animation: 'fd .2s ease' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
      <div><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>My Ad Deliveries</h2><p style={{ fontSize: 12, color: '#6B7280' }}>Track and manage all your ad submissions</p></div>
      <div style={{ position: 'relative' }}>
        <Btn v="ghost" sz="sm" onClick={() => setActionsOpen(!actionsOpen)}>Actions ▾</Btn>
        {actionsOpen && <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 4, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,.1)', zIndex: 10, minWidth: 200, overflow: 'hidden' }}>
          <button onClick={() => { setJobs(jobs.map(x => x.sel ? { ...x, sel: false, arch: true } : x)); setActionsOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', fontSize: 13, border: 'none', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', borderBottom: '1px solid #F3F4F6' }}>Archive Selected Deliveries</button>
          <button onClick={() => { setJobs(jobs.map(x => ({ ...x, arch: true }))); setActionsOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', fontSize: 13, border: 'none', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', borderBottom: '1px solid #F3F4F6' }}>Archive All Deliveries</button>
          <button onClick={() => setActionsOpen(false)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', fontSize: 13, border: 'none', background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Export Deliveries</button>
        </div>}
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
      <Stat label="Total Uploads" val={tot} icon={<IconImg src={calendarIcon} alt="Total" />} color={BL2} bg="#EFF6FF" />
      <Stat label="Sent to Publisher" val={sent} icon={<IconImg src={sentIcon} alt="Sent" />} color={O} bg="#FEF3C7" />
      <Stat label="Received" val={rcvd} icon={<IconImg src={receivedIcon} alt="Received" />} color={G} bg="#DCFCE7" />
      <Stat label="Rejected" val={rjct} icon={<IconImg src={warningIcon} alt="Rejected" />} color={R} bg="#FEE2E2" />
    </div>
    {sel.length > 0 && <div style={{ background: B, color: '#fff', padding: '8px 14px', borderRadius: 7, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 12, fontWeight: 600 }}>{sel.length} selected</span>
      <Btn sz="sm" style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }} onClick={() => setJobs(jobs.map(x => x.sel ? { ...x, sel: false, arch: true } : x))}>Archive</Btn>
      <Btn sz="sm" style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }} onClick={() => setJobs(jobs.map(x => ({ ...x, sel: false })))}>Deselect all</Btn>
    </div>}
    <Card>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <SBar ph="Search by URN, advertiser..." val={q} onChange={setQ} style={{ flex: 1, maxWidth: 300 }} />
        <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, cursor: 'pointer' }}><input type="checkbox" checked={showArch} onChange={e => setShowArch(e.target.checked)} /> Archived</label>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TRow cols={['', 'Prev', 'URN', 'Advertiser / Brand', 'Publication', 'Format', 'Insertion', 'Uploaded', 'Status', 'Actions']} />
          <tbody>
            {filt.length === 0
              ? <tr><td colSpan={10} style={{ textAlign: 'center', color: '#9CA3AF', padding: 28, fontSize: 12 }}>No jobs match filters</td></tr>
              : filt.map(j => <tr key={j.id} style={{ borderBottom: '1px solid #E5E7EB', background: j.sel ? BL : '#fff' }}>
                <td style={{ padding: 12 }}><input type="checkbox" checked={j.sel || false} onChange={() => toggle(j.id)} /></td>
                <td style={{ padding: '12px 8px' }}><AdPreview job={j} onClick={() => setPreviewJob(j)} /></td>
                <td style={{ padding: '12px 8px', fontSize: 11, fontFamily: 'monospace', color: '#6B7280' }}>{j.id}</td>
                <td style={{ padding: '12px 8px' }}><div style={{ fontSize: 12, fontWeight: 600 }}>{j.adv}</div><div style={{ fontSize: 10, color: '#9CA3AF' }}>{j.brand}</div></td>
                <td style={{ padding: '12px 8px', fontSize: 12 }}>{j.pub}</td>
                <td style={{ padding: '12px 8px', fontSize: 12 }}>{j.fmt}</td>
                <td style={{ padding: '12px 8px', fontSize: 12 }}>{j.ins}</td>
                <td style={{ padding: '12px 8px', fontSize: 11, color: '#6B7280' }}>{j.up}</td>
                <td style={{ padding: '12px 8px' }}><StatusBadge status={j.arch ? 'archived' : (j.status === 'sent' && !j.arch) ? 'processed' : j.status} time={!j.arch && j.status !== 'sent' ? j.stime : undefined} /></td>
                <td style={{ padding: '12px 8px' }}>
                  {!j.arch && j.status === 'sent' && <Btn v="green" sz="sm" onClick={onContinue}>{preflightResult === 'error' ? 'Review Errors' : preflightResult === 'ok' ? 'Approve and Send' : 'Continue to Delivery'}</Btn>}
                  {!j.arch && j.status === 'rejected' && <Btn v="green" sz="sm" onClick={onReUpload}>Re-upload</Btn>}
                  {!j.arch && j.status === 'received' && <Btn sz="sm" style={{ background: '#1a1a1a', color: '#fff', border: 'none' }}>Download</Btn>}
                  {j.arch && <Btn v="green" sz="sm" onClick={() => setJobs(jobs.map(x => x.id === j.id ? { ...x, arch: false, sel: false } : x))}>Un-Archive</Btn>}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </Card>
    {previewJob && <div onClick={() => setPreviewJob(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)', zIndex: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#1A1A2E', borderRadius: 10, padding: 20, maxWidth: 580, width: '90%', cursor: 'default' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{previewJob.adv} - {previewJob.brand}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)' }}>{previewJob.pub} · {previewJob.fmt} · {previewJob.ins}</div>
          </div>
          <button onClick={() => setPreviewJob(null)} style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 5, width: 28, height: 28, cursor: 'pointer', color: '#fff', fontSize: 16 }}>x</button>
        </div>
        <div style={{ background: '#fff', borderRadius: 6, minHeight: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40 }}>
          <AdPreview job={previewJob} />
          <div style={{ fontSize: 14, fontWeight: 700, color: '#374151', textAlign: 'center', marginTop: 8 }}>{previewJob.id}</div>
          <div style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>{previewJob.adv} · {previewJob.brand}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center' }}>{previewJob.pub} · {previewJob.fmt} · Insertion: {previewJob.ins}</div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <button style={{ padding: '7px 16px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 5, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Download File</button>
            <button style={{ padding: '7px 16px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 5, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Download Softproof</button>
          </div>
        </div>
        <div style={{ marginTop: 10, textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,.35)' }}>Click outside to close</div>
      </div>
    </div>}
  </div>;
}

// ── Bookings ──
function BookingsPage() {
  const [q, setQ] = useState('');
  const [sf, setSf] = useState('');
  const [dr, setDr] = useState(7);
  const [cdBk, setCdBk] = useState<Booking | null>(null);
  const [selBookings, setSelBookings] = useState<Record<string, boolean>>({});
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS.map(b => ({ ...b })));
  function parseD(str: string) {
    const m = str.match(/^(\d{1,2})\s([A-Za-z]+)\s(\d{4})$/);
    if (m) { const mo: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }; return new Date(+m[3], mo[m[2]] || 0, +m[1]); }
    return null;
  }
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const rows = bookings.filter(b => {
    const qOk = !q || b.urn.toLowerCase().includes(q) || b.adv.toLowerCase().includes(q) || b.pub.toLowerCase().includes(q);
    const sOk = !sf || b.status.toLowerCase() === sf;
    let dOk = true; if (dr > 0) { const d = parseD(b.insertion); if (d) { const diff = (d.getTime() - today.getTime()) / 86400000; dOk = diff >= 0 && diff <= dr; } }
    return qOk && sOk && dOk;
  });
  const selCount = rows.filter(b => selBookings[b.urn]).length;
  function toggleBk(urn: string) { setSelBookings(prev => ({ ...prev, [urn]: !prev[urn] })); }
  function bulkSetStatus(status: string) {
    setBookings(bookings.map(b => selBookings[b.urn] ? { ...b, status } : b));
    setSelBookings({});
  }
  function DB({ label, range }: { label: string; range: number }) {
    return <button onClick={() => setDr(range)} style={{ border: 'none', background: dr === range ? B : '#F9FAFB', color: dr === range ? '#fff' : '#6B7280', fontWeight: dr === range ? 600 : 400, padding: '6px 12px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>{label}</button>;
  }
  return <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', animation: 'fd .2s ease' }}>
    <div style={{ marginBottom: 16 }}><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>My Bookings</h2><p style={{ fontSize: 12, color: '#6B7280' }}>Publisher booking data for your campaigns</p></div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
      <Stat label="Total" val="12" icon={<IconImg src={calendarIcon} alt="Total" />} color={O} bg="#FEF3C7" />
      <Stat label="Confirmed" val="9" icon={<IconImg src={tickIcon} alt="Confirmed" />} color={G} bg="#DCFCE7" />
      <Stat label="Pending" val="3" icon={<IconImg src={clockIcon} alt="Pending" />} color={BL2} bg="#EFF6FF" />
      <Stat label="This Week Deadline" val="5" icon={<IconImg src={warningIcon} alt="Deadline" />} color={R} bg="#FEE2E2" />
    </div>
    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ display: 'flex', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 7, overflow: 'hidden' }}>
        <DB label="Today" range={1} /><DB label="1 Week" range={7} /><DB label="2 Weeks" range={14} /><DB label="All" range={0} />
      </div>
      <SBar ph="Search URN, advertiser..." val={q} onChange={setQ} style={{ flex: 1, maxWidth: 280 }} />
      <Sel value={sf} onChange={e => setSf(e.target.value)} style={{ width: 130 }}>
        <option value="">All Status</option><option value="confirmed">Confirmed</option><option value="pending">Pending</option><option value="rejected">Rejected</option>
      </Sel>
    </div>
    {selCount > 0 && <div style={{ background: B, padding: '8px 14px', borderRadius: 7, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{selCount} selected</span>
      <Btn sz="sm" style={{ background: '#F59E0B', color: '#fff', border: 'none' }} onClick={() => bulkSetStatus('pending')}>Pending</Btn>
      <Btn sz="sm" style={{ background: '#16A34A', color: '#fff', border: 'none' }} onClick={() => bulkSetStatus('confirmed')}>Confirmed</Btn>
      <Btn sz="sm" style={{ background: '#DC2626', color: '#fff', border: 'none' }} onClick={() => bulkSetStatus('rejected')}>Rejected</Btn>
      <Btn v="ghost" sz="sm" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.25)' }} onClick={() => setSelBookings({})}>Deselect all</Btn>
    </div>}
    <Card>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TRow cols={['', 'Status', 'URN', 'Publication', 'Advertiser', 'Brand / Headline', 'Format', 'Insertion Date', 'Deadline', 'Actions']} />
          <tbody>
            {rows.length === 0
              ? <tr><td colSpan={10} style={{ textAlign: 'center', color: '#9CA3AF', padding: 28, fontSize: 12 }}>No bookings match filters</td></tr>
              : rows.map((b, i) => <tr key={i} style={{ borderBottom: '1px solid #E5E7EB', background: selBookings[b.urn] ? '#FFF7ED' : '#fff' }}>
                <td style={{ padding: 12 }}><input type="checkbox" checked={!!selBookings[b.urn]} onChange={() => toggleBk(b.urn)} /></td>
                <td style={{ padding: '12px 8px' }}><StatusBadge status={b.status} /></td>
                <td style={{ padding: '12px 8px', fontSize: 11, fontFamily: 'monospace', color: '#6B7280' }}>{b.urn}</td>
                <td style={{ padding: '12px 8px' }}><div style={{ fontSize: 12, fontWeight: 600 }}>{b.pub}</div><div style={{ fontSize: 10, color: '#9CA3AF' }}>{b.owner}</div></td>
                <td style={{ padding: '12px 8px', fontSize: 12 }}>{b.adv}</td>
                <td style={{ padding: '12px 8px', fontSize: 12 }}>{b.brand}</td>
                <td style={{ padding: '12px 8px', fontSize: 12 }}>{b.size}</td>
                <td style={{ padding: '12px 8px', fontSize: 12 }}>{b.insertion}</td>
                <td style={{ padding: '12px 8px', fontSize: 11, color: '#6B7280' }}>{b.deadline}</td>
                <td style={{ padding: '12px 8px' }}><Btn v="green" sz="sm" onClick={() => setCdBk(b)}>+ Create Delivery</Btn></td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </Card>
    {cdBk && <CreateDeliveryModal bk={cdBk} onClose={() => setCdBk(null)} onSubmit={() => setCdBk(null)} />}
  </div>;
}

// ── PublisherGrid (shared between Specs and Our Specs) ──
const PUB_ICONS: Record<string, { bg: string; icon: string }> = {
  newsuk: { bg: '#1E40AF', icon: '📰' }, conde: { bg: '#F97316', icon: '✨' }, gmg: { bg: '#0D9488', icon: '🌐' },
  ft: { bg: '#EA580C', icon: '📊' }, tmg: { bg: '#1E40AF', icon: '📋' }, hearst: { bg: '#E11D48', icon: '❤' },
  economist: { bg: '#0D9488', icon: '📈' }, reach: { bg: '#1E3A5F', icon: '📱' }, bauer: { bg: '#16A34A', icon: '🎵' }, future: { bg: '#7C3AED', icon: '💻' },
};

function PublisherGrid({ initialSearch = '', onSendAd, directPubId }: { initialSearch?: string; onSendAd?: (data: any) => void; directPubId?: string | null }) {
  const [q, setQ] = useState(initialSearch);
  const [selPub, setSelPub] = useState<Publisher | null>(() => {
    if (directPubId) return PUBLISHERS.find(p => p.id === directPubId) || null;
    return null;
  });
  const [spec, setSpec] = useState<{ pub: Publisher; idx: number } | null>(null);
  const [tab, setTab] = useState<'publishers' | 'favourites'>('publishers');

  useEffect(() => {
    if (directPubId) {
      const found = PUBLISHERS.find(p => p.id === directPubId);
      if (found) setSelPub(found);
    } else {
      setSelPub(null);
    }
  }, [directPubId]);

  // Reset search and selection when navigating back to Send Ad
  useEffect(() => {
    if (initialSearch === '' && !directPubId) {
      setQ('');
      setSelPub(null);
      setSpec(null);
    }
  }, [initialSearch, directPubId]);

  const filt = PUBLISHERS.filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase()) || p.cat.toLowerCase().includes(q.toLowerCase()));

  if (spec) {
    return <PubSpecPage pub={spec.pub} pubIdx={spec.idx} onClose={() => setSpec(null)} onSendAd={data => { setSpec(null); onSendAd?.(data); }} />;
  }

  if (selPub) {
    return <PublisherPage pub={selPub} onClose={() => setSelPub(null)} onPubSelected={(pub, idx) => { setSpec({ pub, idx }); }} />;
  }

  return <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', animation: 'fd .2s ease' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #D1D5DB', borderRadius: 8, padding: '0 14px', marginBottom: 16, height: 46 }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by publication name, publisher, or category..." style={{ border: 'none', background: 'transparent', fontSize: 13, flex: 1, outline: 'none' }} />
    </div>
    <div style={{ display: 'flex', gap: 0, marginBottom: 20 }}>
      <button onClick={() => setTab('publishers')} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', fontSize: 12, fontWeight: tab === 'publishers' ? 600 : 400, background: tab === 'publishers' ? '#fff' : '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '6px 0 0 6px', cursor: 'pointer', fontFamily: 'inherit', color: tab === 'publishers' ? '#1a1a1a' : '#6B7280' }}>🏢 Publishers</button>
      <button onClick={() => setTab('favourites')} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', fontSize: 12, fontWeight: tab === 'favourites' ? 600 : 400, background: tab === 'favourites' ? '#fff' : '#F9FAFB', border: '1px solid #E5E7EB', borderLeft: 'none', borderRadius: '0 6px 6px 0', cursor: 'pointer', fontFamily: 'inherit', color: tab === 'favourites' ? '#1a1a1a' : '#6B7280' }}>♡ Favourites</button>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
      {filt.length === 0
        ? <div style={{ gridColumn: 'span 4', textAlign: 'center', padding: 40, color: '#9CA3AF' }}>No publishers found.</div>
        : filt.map(p => {
          const pubIcon = PUB_ICONS[p.id] || { bg: '#6B7280', icon: '📄' };
          const logoSrc = LOGOS[p.logoKey];
          return <div key={p.id} onClick={() => setSelPub(p)} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: '24px 20px', textAlign: 'center', cursor: 'pointer', transition: 'box-shadow .18s' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              {logoSrc
                ? <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={logoSrc} alt={p.name} style={{ maxHeight: 56, maxWidth: 140, objectFit: 'contain' }} />
                  </div>
                : <div style={{ width: 64, height: 64, borderRadius: '50%', background: pubIcon.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#fff' }}>{pubIcon.icon}</div>
              }
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.5, marginBottom: 10, minHeight: 32 }}>{p.desc}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, padding: '2px 8px', background: '#F3F4F6', borderRadius: 3, fontWeight: 500, color: '#374151' }}>{p.cat}</span>
              <span style={{ fontSize: 10, padding: '2px 8px', background: '#16A34A', color: '#fff', borderRadius: 10, fontWeight: 700 }}>{p.titles} titles</span>
            </div>
            <button style={{ background: 'none', border: 'none', color: '#16A34A', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>View publications <span style={{ fontSize: 14 }}>›</span></button>
          </div>;
        })}
    </div>
  </div>;
}

// ── ColourMgmt ──
function ColourMgmt() {
  const [pub, setPub] = useState('');
  const [sec, setSec] = useState('');
  const [prof, setProf] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [showAll, setShowAll] = useState(true);
  const ref = useRef<HTMLInputElement>(null);
  const profiles = ['WAN-IFRAnewspaper26v5.icc', 'PSO_Coated_v3.icc', 'PRI_NP_V2_K1.icc', 'SC_paper_eci.icc', 'ISOnewspaper26v4.icc', 'ISO_Coated_v2.icc'];
  const results = [
    { file: 'ST_TEST.pdf', profile: 'WAN-IFRAnewspaper26v5.icc', date: '12/03/2026, 09:51' },
    { file: 'HOO_Tonys_REACH_Full_Page_v4.pdf', profile: 'WAN-IFRAnewspaper26v5.icc', date: '11/03/2026, 14:25' },
    { file: 'HOO_Tonys_REACH_Full_Page_v4.pdf', profile: 'ISOnewspaper26v4 TAC Reduction', date: '11/03/2026, 14:09' },
    { file: 'HOO_Tonys_REACH_Full_Page_v4.pdf', profile: 'ISOnewspaper26v4 TAC Reduction', date: '11/03/2026, 12:50' },
  ];
  return <div style={{ background: '#F0EFEB', minHeight: '100%' }}>
    <div style={{ padding: '10px 24px', fontSize: 12, color: '#6B7280' }}>
      <span style={{ color: '#0D9488', cursor: 'pointer' }}>Home</span>{' > Colour Management'}
    </div>
    <div style={{ padding: '4px 24px 0', background: '#F0EFEB' }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a', marginBottom: 3 }}>Colour Management</h1>
      <span style={{ fontSize: 13, color: '#6B7280' }}>Convert PDF and image files to any publication colour profile</span>
      <div style={{ marginTop: 10, borderBottom: '1px solid #D1D5DB' }} />
    </div>
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, marginBottom: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>🎨</span>
        <div><strong>Welcome to ad.fast colour optimisation.</strong> Convert image and PDF files to any Publication for as little as £2.00</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '440px 1fr', gap: 20 }}>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>Convert Colour Profile</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>Search for a publication or select a profile directly</div>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Search for a Publication</label>
              <input value={pub} onChange={e => setPub(e.target.value)} placeholder="Type publication name..." style={{ width: '100%', padding: '7px 10px', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 12, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, marginBottom: 12, alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Choose Publication</label>
                <select value={pub} onChange={e => setPub(e.target.value)} style={{ width: '100%', padding: '7px 10px', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 12, outline: 'none', cursor: 'pointer' }}>
                  <option value="">(select publication)</option>
                  {PUBLISHERS.reduce<{ n: string }[]>((acc, p) => acc.concat(p.pubs), []).map(p => <option key={p.n}>{p.n}</option>)}
                </select>
              </div>
              <button style={{ padding: '7px 12px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>Spec Info</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Choose Section</label>
                <select value={sec} onChange={e => setSec(e.target.value)} style={{ width: '100%', padding: '7px 10px', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 12, outline: 'none', cursor: 'pointer' }}>
                  <option value="">(select section)</option>
                  {['Display/ROP', 'Classified', 'Magazine Supplement'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Selected Profile</label>
                <div style={{ display: 'flex', gap: 5 }}>
                  <input value={prof} readOnly placeholder="(Selected Profile)" style={{ flex: 1, padding: '7px 10px', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 11, outline: 'none', background: '#F9FAFB', color: '#6B7280' }} />
                  <button style={{ padding: '4px 7px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap' }}>Favourites</button>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 12, margin: '10px 0', fontWeight: 600, letterSpacing: 1 }}>OR</div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Conversion Profile (ICC)</label>
              <div style={{ display: 'flex', gap: 16, marginBottom: 6 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, cursor: 'pointer' }}><input type="radio" name="cm_show" checked={showAll} onChange={() => setShowAll(true)} style={{ accentColor: '#0D9488' }} /> Show All</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, cursor: 'pointer' }}><input type="radio" name="cm_show" checked={!showAll} onChange={() => setShowAll(false)} style={{ accentColor: '#0D9488' }} /> Show Favourites</label>
              </div>
              <select value={prof} onChange={e => setProf(e.target.value)} style={{ width: '100%', padding: '7px 10px', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 12, outline: 'none', cursor: 'pointer' }}>
                <option value="">(select profile)</option>
                {profiles.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); }} onClick={() => ref.current?.click()}
              style={{ border: '2px dashed #D1D5DB', borderRadius: 6, padding: 24, textAlign: 'center', background: '#FAFAFA', cursor: 'pointer', marginBottom: 12 }}>
              <input ref={ref} type="file" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} />
              {file
                ? <div style={{ fontSize: 12, fontWeight: 600, color: B }}>{file.name}</div>
                : <>
                  <div style={{ fontSize: 28, color: '#9CA3AF', marginBottom: 8 }}>📄</div>
                  <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 10 }}>Drag your file(s) here or</div>
                  <button onClick={e => { e.stopPropagation(); ref.current?.click(); }} style={{ padding: '6px 14px', background: '#16A34A', color: '#fff', border: 'none', borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Select file(s)</button>
                </>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => { setPub(''); setSec(''); setProf(''); setFile(null); }} style={{ background: 'none', border: 'none', color: '#0D9488', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>Clear Form</button>
                <span style={{ color: '#D1D5DB' }}>/</span>
                <button onClick={() => { setPub(''); setSec(''); setProf(''); setFile(null); }} style={{ background: 'none', border: 'none', color: '#0D9488', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>Reset Form</button>
              </div>
              <button style={{ padding: '8px 20px', background: '#16A34A', color: '#fff', border: 'none', borderRadius: 5, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Convert File</button>
            </div>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <SBar ph="Search conversions..." val="" onChange={() => {}} style={{ flex: 1, maxWidth: 260 }} />
            <button style={{ padding: '5px 10px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Reset</button>
            <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, cursor: 'pointer' }}><input type="checkbox" /> Archived</label>
            <button style={{ padding: '5px 10px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Actions</button>
            <button style={{ padding: '5px 10px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Refresh</button>
          </div>
          <div style={{ padding: '8px 14px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', background: '#F9FAFB' }}>
            <input type="checkbox" style={{ marginRight: 8 }} /><span style={{ fontSize: 11, fontWeight: 600, color: '#6B7280' }}>Select all</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#6B7280' }}>Actions</span>
          </div>
          {results.map((r, i) => <div key={i} style={{ padding: '10px 14px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" />
            <div style={{ width: 40, height: 48, borderRadius: 4, background: '#F3F4F6', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="28" height="36" viewBox="0 0 28 36"><rect x="1" y="1" width="26" height="34" rx="2" fill="#fff" stroke="#D1D5DB" /><rect x="3" y="4" width="16" height="3" rx="1" fill="#E74C3C" opacity=".7" /><rect x="3" y="9" width="22" height="12" rx="1" fill="#3B82F6" opacity=".15" /><rect x="3" y="23" width="12" height="2" rx="1" fill="#9CA3AF" opacity=".4" /><rect x="3" y="27" width="8" height="2" rx="1" fill="#9CA3AF" opacity=".3" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{r.file}</div>
              <div style={{ fontSize: 11, color: '#6B7280' }}>{r.profile}</div>
              <div style={{ fontSize: 10, color: '#9CA3AF' }}>{r.date}</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <Btn sz="sm" style={{ background: '#1a1a1a', color: '#fff', border: 'none' }}>Download</Btn>
              <Btn v="ghost" sz="sm">Softproof</Btn>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  </div>;
}

// ── PubInbox (table layout like Agency Tracking) ──
function PubInbox() {
  const [ads, setAds] = useState(INBOX.map(a => ({ ...a })));
  const [q, setQ] = useState('');
  const [sf, setSf] = useState('');
  const [previewAd, setPreviewAd] = useState<typeof INBOX[0] | null>(null);
  const [showReject, setShowReject] = useState(false);
  const [rejectText, setRejectText] = useState('');
  function approve(id: string) { setAds(ads.map(x => x.id === id ? { ...x, status: 'approved' } : x)); }
  function reject(id: string) { setAds(ads.map(x => x.id === id ? { ...x, status: 'rejected' } : x)); setShowReject(false); setRejectText(''); }
  const filt = ads.filter(a => {
    const qOk = !q || a.file.toLowerCase().includes(q.toLowerCase()) || a.adv.toLowerCase().includes(q.toLowerCase());
    const sOk = !sf || a.status === sf;
    return qOk && sOk;
  });
  const newCount = ads.filter(a => a.status === 'new').length;
  const approvedCount = ads.filter(a => a.status === 'approved').length;

  return <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', animation: 'fd .2s ease' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
      <div><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Ad Inbox</h2><p style={{ fontSize: 12, color: '#6B7280' }}>Review, download and approve delivered ads</p></div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
      <Stat label="Total Received" val={ads.length} icon={<IconImg src={receivedIcon} alt="Received" />} color={BL2} bg="#EFF6FF" />
      <Stat label="New / Unread" val={newCount} icon="★" color={B} bg={BL} />
      <Stat label="Approved" val={approvedCount} icon={<IconImg src={tickIcon} alt="Approved" />} color={G} bg="#DCFCE7" />
      <Stat label="This Month" val="89" icon={<IconImg src={calendarIcon} alt="Month" />} color={O} bg="#FEF3C7" />
    </div>
    <Card>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <SBar ph="Search by filename, advertiser..." val={q} onChange={setQ} style={{ flex: 1, maxWidth: 300 }} />
        <Sel value={sf} onChange={e => setSf(e.target.value)} style={{ width: 150 }}>
          <option value="">All Status</option><option value="new">New</option><option value="reviewed">Reviewed</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
        </Sel>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TRow cols={['', 'Prev', 'File / Advertiser', 'Publication', 'Ad Size', 'Insertion', 'Received', 'Status', 'Actions']} />
          <tbody>
            {filt.length === 0
              ? <tr><td colSpan={9} style={{ textAlign: 'center', color: '#9CA3AF', padding: 28, fontSize: 12 }}>No ads match filters</td></tr>
              : filt.map(a => {
                const fakeJob: Job = { id: a.id, adv: a.adv, brand: '', pub: a.pub, fmt: a.size, ins: a.ins, up: a.rcv, status: a.status === 'new' ? 'sent' : a.status, stime: '', th: a.th, sel: false, arch: false };
                return <tr key={a.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: 12 }}><input type="checkbox" /></td>
                  <td style={{ padding: '12px 8px' }}><AdPreview job={fakeJob} onClick={() => setPreviewAd(a)} /></td>
                  <td style={{ padding: '12px 8px' }}><div style={{ fontSize: 12, fontWeight: 600 }}>{a.file}</div><div style={{ fontSize: 10, color: '#9CA3AF' }}>{a.adv}</div></td>
                  <td style={{ padding: '12px 8px', fontSize: 12 }}>{a.pub}</td>
                  <td style={{ padding: '12px 8px', fontSize: 12 }}>{a.size}</td>
                  <td style={{ padding: '12px 8px', fontSize: 12 }}>{a.ins}</td>
                  <td style={{ padding: '12px 8px', fontSize: 11, color: '#6B7280' }}>{a.rcv}</td>
                  <td style={{ padding: '12px 8px' }}><StatusBadge status={a.status} /></td>
                  <td style={{ padding: '12px 8px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {a.status !== 'approved' && a.status !== 'rejected' && <Btn v="green" sz="sm" onClick={() => approve(a.id)}>Approve</Btn>}
                      {a.status !== 'approved' && a.status !== 'rejected' && <Btn v="red" sz="sm" onClick={() => { setPreviewAd(a); setShowReject(true); }}>Reject</Btn>}
                      <Btn v="ghost" sz="sm">Download</Btn>
                    </div>
                  </td>
                </tr>;
              })}
          </tbody>
        </table>
      </div>
    </Card>
    {previewAd && <div onClick={() => { setPreviewAd(null); setShowReject(false); }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)', zIndex: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 10, padding: 24, maxWidth: 520, width: '90%', cursor: 'default' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div><div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{previewAd.file}</div><div style={{ fontSize: 11, color: '#6B7280' }}>{previewAd.adv} · {previewAd.pub} · {previewAd.size}</div></div>
          <button onClick={() => { setPreviewAd(null); setShowReject(false); }} style={{ background: '#F3F4F6', border: 'none', borderRadius: 5, width: 28, height: 28, cursor: 'pointer', fontSize: 16 }}>x</button>
        </div>
        <div style={{ background: '#1A1A2E', borderRadius: 7, minHeight: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
          <div style={{ background: '#fff', width: 120, height: 96, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 4px 16px rgba(0,0,0,.5)' }}><span style={{ fontSize: 28 }}>{THMAP[previewAd.th] || '?'}</span><div style={{ fontSize: 9, color: '#666', textAlign: 'center' }}>{previewAd.file}</div></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          {[['Publication', previewAd.pub], ['Ad Size', previewAd.size], ['Insertion', previewAd.ins], ['Received', previewAd.rcv]].map(item => <div key={item[0]} style={{ background: '#F9FAFB', borderRadius: 6, padding: '8px 10px' }}><div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 2 }}>{item[0]}</div><div style={{ fontSize: 12, fontWeight: 600 }}>{item[1]}</div></div>)}
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {previewAd.status !== 'approved' && previewAd.status !== 'rejected' && <Btn v="green" sz="sm" onClick={() => { approve(previewAd.id); setPreviewAd({ ...previewAd, status: 'approved' }); }}>Approve</Btn>}
          <Btn v="ghost" sz="sm">Download PDF</Btn>
          <Btn v="ghost" sz="sm">Softproof</Btn>
          {previewAd.status !== 'approved' && previewAd.status !== 'rejected' && <Btn v="red" sz="sm" onClick={() => setShowReject(true)}>Reject</Btn>}
        </div>
        {showReject && <div style={{ marginTop: 12, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Rejection Reason</div>
          <textarea value={rejectText} onChange={e => setRejectText(e.target.value)} placeholder="Enter reason..." style={{ width: '100%', padding: '7px 10px', border: '1px solid #FECACA', borderRadius: 4, fontSize: 12, outline: 'none', resize: 'vertical', minHeight: 60, boxSizing: 'border-box', marginBottom: 8 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn v="red" sz="sm" onClick={() => { reject(previewAd.id); setPreviewAd({ ...previewAd, status: 'rejected' }); }}>Confirm Reject</Btn>
            <Btn v="ghost" sz="sm" onClick={() => setShowReject(false)}>Cancel</Btn>
          </div>
        </div>}
      </div>
    </div>}
  </div>;
}

// ── SendAdForm (matches Create Delivery design) ──
function SendAdForm({ prefill, onBack, onSubmit }: { prefill: any; onBack: () => void; onSubmit: () => void }) {
  const [col, setCol] = useState('dont');
  const [uMode, setUMode] = useState('upload');
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const pubName = prefill?.pub?.name || 'News UK Ltd';
  const pubPubName = prefill?.size?.n ? (prefill?.pub?.pubs?.find((p: any) => true)?.n || 'The Times') : 'The Times';
  const sizeName = prefill?.size?.n || 'Full Page';
  const sizeW = prefill?.size?.w || '264mm';
  const sizeH = prefill?.size?.h || '338mm';
  const section = prefill?.section || 'Display/ROP';
  return <div style={{ background: '#F0EFEB', minHeight: '100%' }}>
    <div style={{ padding: '14px 28px 0' }}>
      <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>
        <span style={{ color: '#0D9488', cursor: 'pointer' }} onClick={onBack}>Home</span>{' > '}
        <span style={{ color: '#0D9488', cursor: 'pointer' }} onClick={onBack}>{pubName}</span>{' > '}
        <span style={{ color: '#0D9488', cursor: 'pointer' }}>{pubPubName}</span>{' > Create Delivery'}
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{pubPubName}</h1>
      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>United Kingdom (National)</div>
      <div style={{ borderBottom: '1px solid #D1D5DB' }} />
    </div>
    <div style={{ padding: '20px 28px 28px' }}>
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, padding: '24px 28px', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Booking Details</div>
          <div style={{ background: '#F9FAFB', borderRadius: 6, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#374151' }}>{pubPubName}</div>
            {[['Size', sizeName], ['Advertiser', ''], ['Brand', ''], ['Insertion', ''], ['Deadline', ''], ['URN', '']].map(item => <div key={item[0]} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '5px 0', borderBottom: '1px solid #E5E7EB' }}>
              <span style={{ color: '#6B7280' }}>{item[0]}</span>
              <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{item[1]}</span>
            </div>)}
          </div>
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6, padding: 12, fontSize: 12 }}>
            <div style={{ fontWeight: 600, color: '#1E3A8A', marginBottom: 5 }}>Colour Profile</div>
            <div style={{ color: '#374151', marginBottom: 8 }}>This publication requires <strong>WAN-IFRAnewspaper26v5.icc</strong></div>
            {[['dont', "Don't Optimise"], ['optimise', 'Optimise for me']].map(item => <label key={item[0]} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', marginBottom: 5 }}>
              <input type="radio" name="sacol" checked={col === item[0]} onChange={() => setCol(item[0])} style={{ accentColor: '#0D9488' }} />{item[1]}
            </label>)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Delivery Information</div>
          <div style={{ paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid #E5E7EB' }}>
            {[['Advertiser', 'required'], ['Brand / Headline', ''], ['Media Buyer', '']].map(item => <div key={item[0]} style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 5 }}>{item[0]}{item[1] ? <span style={{ color: '#6B7280', fontSize: 12 }}> ({item[1]})</span> : null}</label>
              <input style={{ width: '100%', padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
            </div>)}
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Insertion Information</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 5 }}>Insertion Date <span style={{ color: '#6B7280', fontSize: 12 }}>(required)</span></label>
                <input type="date" style={{ width: '100%', padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 13, outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 5 }}>URN / Booking No.</label>
                <input style={{ width: '100%', padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #E5E7EB' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, cursor: 'pointer' }}><input type="radio" name="sacolour" defaultChecked style={{ accentColor: '#0D9488' }} /> Colour</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, cursor: 'pointer' }}><input type="radio" name="sacolour" style={{ accentColor: '#0D9488' }} /> BW</label>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 5 }}>Notes / Special Instructions</label>
              <textarea style={{ width: '100%', padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 13, outline: 'none', resize: 'vertical', minHeight: 70, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 20, marginBottom: 10 }}>
              {[['upload', 'Upload file now'], ['later', 'Save (upload later)']].map(item => <label key={item[0]} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, cursor: 'pointer' }}>
                <input type="radio" name="saup" checked={uMode === item[0]} onChange={() => setUMode(item[0])} style={{ accentColor: '#0D9488' }} />{item[1]}
              </label>)}
            </div>
            {uMode === 'upload' && <div style={{ border: '1px solid #E5E7EB', borderRadius: 6, padding: 14, background: '#fff' }}>
              <div style={{ marginBottom: 6, fontSize: 13, fontWeight: 500 }}>Choose file</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="file" ref={ref} style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} />
                <button onClick={() => ref.current?.click()} style={{ padding: '5px 12px', background: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Choose file</button>
                <span style={{ fontSize: 12, color: '#6B7280' }}>{file ? file.name : 'No file chosen'}</span>
              </div>
            </div>}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingTop: 8 }}>
            <button onClick={onBack} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 13, cursor: 'pointer', color: '#374151' }}>Cancel</button>
            <button onClick={onSubmit} style={{ padding: '10px 28px', background: '#16A34A', color: '#fff', border: 'none', borderRadius: 5, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>Create Delivery ›</button>
            <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, cursor: 'pointer', marginLeft: 8 }}>
              <input type="checkbox" style={{ accentColor: '#0D9488' }} /> Auto Deliver
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

// ── Preflight ──
function Preflight({ onBack, onProceed, onResult }: { onBack: () => void; onProceed: () => void; onResult: (r: string) => void }) {
  const [fix, setFix] = useState('proceed');
  const [spOpen, setSpOpen] = useState(false);
  const results = [{ t: 'pass', title: 'PDF/X-1a:2001 Compliance', desc: 'File conforms.' }, { t: 'warn', title: 'Text x-height below 8pt', desc: 'May not be legible.' }, { t: 'warn', title: 'Ink coverage above 220%', desc: 'Above limit in some areas.' }, { t: 'error', title: 'PDF Output Intent Incorrect', desc: 'File must use WAN-IFRAnewspaper26v5.icc profile.' }, { t: 'pass', title: 'File Size Check', desc: 'Within permitted size.' }, { t: 'pass', title: 'Bleed Area', desc: '3mm bleed present.' }, { t: 'info', title: 'Text outside Type Area', desc: 'Text near trim.' }];
  const icons: Record<string, { bg: string; c: string; i: string }> = { pass: { bg: '#DCFCE7', c: G, i: 'v' }, warn: { bg: '#FEF3C7', c: O, i: '!' }, error: { bg: '#FEE2E2', c: R, i: 'x' }, info: { bg: '#EFF6FF', c: BL2, i: 'i' } };
  const hasErrors = results.some(r => r.t === 'error');
  const hasWarnings = results.some(r => r.t === 'warn');
  useEffect(() => { onResult(hasErrors ? 'error' : hasWarnings ? 'warn' : 'ok'); }, []);
  const fixes = [{ id: 'fix', t: 'Request a Fix - Qmuli team corrects the file', d: 'Prepress team fixes warnings. Typically 2-4 hours.', p: '+ £15' }, { id: 'reupload', t: 'Upload a corrected file yourself', d: 'Fix and upload a replacement.', p: 'Free' }, { id: 'proceed', t: 'Proceed to delivery - accept warnings', d: 'Deliver as-is. You accept responsibility.', p: '' }];
  return <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', animation: 'fd .2s ease' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
      <div><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Preflight Report</h2><p style={{ fontSize: 12, color: '#6B7280' }}>MCS-00127_B_Spring.pdf - Daily Record Display/ROP</p></div>
      <div style={{ display: 'flex', gap: 8 }}><Btn v="ghost" sz="sm" onClick={onBack}>Back</Btn><Btn v="ghost" sz="sm" onClick={() => setSpOpen(true)}>View Softproof</Btn></div>
    </div>
    <Notice type="warn" icon="⚠">File processed with warnings. Review below and choose an action.</Notice>
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card>
          <CardH title="Preflight Results" right={<div style={{ display: 'flex', gap: 8, fontSize: 11 }}><span style={{ color: R }}>1 error</span><span style={{ color: O }}>2 warnings</span><span style={{ color: G }}>3 passed</span></div>} />
          <div style={{ padding: '0 18px 10px' }}>
            {results.map((r, i) => { const ic = icons[r.t] || icons.pass; return <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: i < results.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: ic.bg, color: ic.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0, fontWeight: 700 }}>{ic.i}</div>
              <div><div style={{ fontSize: 12, fontWeight: 600, marginBottom: 1 }}>{r.title}</div><div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.5 }}>{r.desc}</div></div>
            </div>; })}
          </div>
        </Card>
        <Card>
          <CardH title="Choose an Action" />
          <div style={{ padding: '0 18px 16px' }}>
            {fixes.map(f => <div key={f.id} onClick={() => setFix(f.id)} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', border: `1px solid ${fix === f.id ? B : '#E5E7EB'}`, borderRadius: 7, cursor: 'pointer', marginBottom: 7, background: fix === f.id ? BL : '#fff' }}>
              <input type="radio" name="fix" checked={fix === f.id} readOnly style={{ marginTop: 2 }} />
              <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{f.t}</div><div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.5 }}>{f.d}</div></div>
              {f.p && <span style={{ fontSize: 11, fontWeight: 700, color: B, whiteSpace: 'nowrap' }}>{f.p}</span>}
            </div>)}
            {fix === 'reupload' && <div style={{ marginTop: 8 }}><UpZone /></div>}
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <Btn v="ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onBack}>Back</Btn>
              <Btn v="green" sz="lg" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { const a = document.createElement('a'); a.href = '#'; a.download = 'MCS-00127_B_Spring_FINAL.pdf'; a.click(); }}>Final File</Btn>
              <Btn v="green" sz="lg" style={{ flex: 2, justifyContent: 'center' }} onClick={() => { if (fix === 'proceed') onProceed(); }}>Confirm and Proceed</Btn>
            </div>
          </div>
        </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card>
          <CardH title="Softproof Preview" right={<span onClick={() => setSpOpen(true)} style={{ color: B, cursor: 'pointer', fontSize: 11 }}>Full view</span>} />
          <div style={{ padding: '0 18px 16px' }}>
            <div onClick={() => setSpOpen(true)} style={{ background: '#1A1A2E', borderRadius: 7, minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-in' }}>
              <div style={{ background: '#fff', width: 100, height: 82, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, boxShadow: '0 4px 16px rgba(0,0,0,.5)' }}>
                <span style={{ fontSize: 22 }}>🖼</span><span style={{ fontSize: 9, color: '#666' }}>Click to expand</span>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <CardH title="Cost Summary" />
          <div style={{ padding: '0 18px 14px' }}>
            {[['Colour Optimisation', '£10.00'], ['Delivery', '£10.00']].map(item => <div key={item[0]} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '8px 0', borderBottom: '1px solid #E5E7EB' }}><span style={{ color: '#6B7280' }}>{item[0]}</span><span style={{ fontWeight: 600 }}>{item[1]}</span></div>)}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '10px 0', fontWeight: 700 }}><span>Total</span><span style={{ color: B }}>£20.00</span></div>
          </div>
        </Card>
      </div>
    </div>
    {spOpen && <SoftproofOverlay onClose={() => setSpOpen(false)} />}
  </div>;
}

// ── Delivery ──
function Delivery({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) {
  const [spOpen, setSpOpen] = useState(false);
  return <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', animation: 'fd .2s ease' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
      <div><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Delivery Detail</h2><p style={{ fontSize: 12, color: '#6B7280' }}>Review and confirm before sending to publisher</p></div>
      <div style={{ display: 'flex', gap: 8 }}><Btn v="ghost" sz="sm" onClick={onBack}>Back</Btn><Btn v="ghost" sz="sm">Download Final File</Btn></div>
    </div>
    <Notice type="warn" icon="⚠">File has been optimised with warnings.</Notice>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card>
          <CardH title="Softproof Preview" right={<span onClick={() => setSpOpen(true)} style={{ color: B, cursor: 'pointer', fontSize: 11 }}>Full view</span>} />
          <div style={{ padding: '0 18px 16px' }}>
            <div onClick={() => setSpOpen(true)} style={{ background: '#1A1A2E', borderRadius: 7, minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-in' }}>
              <div style={{ background: '#fff', width: 100, height: 82, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, boxShadow: '0 4px 16px rgba(0,0,0,.5)' }}>
                <span style={{ fontSize: 22 }}>🖼</span><span style={{ fontSize: 9, color: '#666' }}>MCS-00127</span>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <CardH title="Cost Summary" />
          <div style={{ padding: '0 18px 14px' }}>
            {[['Colour Optimisation', '£10.00'], ['Delivery', '£10.00']].map(item => <div key={item[0]} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '8px 0', borderBottom: '1px solid #E5E7EB' }}><span style={{ color: '#6B7280' }}>{item[0]}</span><span style={{ fontWeight: 600 }}>{item[1]}</span></div>)}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '10px 0', fontWeight: 700 }}><span>Total</span><span style={{ color: B }}>£20.00</span></div>
          </div>
        </Card>
        <Btn v="green" sz="lg" style={{ justifyContent: 'center' }} onClick={onConfirm}>Deliver File</Btn>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn v="ghost" style={{ flex: 1, justifyContent: 'center' }}>Replace File</Btn>
          <Btn v="red" style={{ flex: 1, justifyContent: 'center' }} onClick={onBack}>Cancel</Btn>
        </div>
      </div>
      <Card>
        <CardH title="Delivery Details" />
        <div style={{ padding: '4px 18px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[['Filename', 'MCS-00127_B_Spring'], ['Tracking #', '2988601'], ['Publication', 'Daily Record'], ['Sender', 'Alan Roche'], ['Company', 'Qmuli Ltd'], ['Email', 'alan.roche@qmuli.com'], ['Advertiser', 'Qmuli'], ['Brand', 'Spring Campaign'], ['Insertion Date', '2026-03-08'], ['URN', 'Test']].map(item => <Lbl key={item[0]} t={item[0]}><In defaultValue={item[1]} readOnly style={{ background: '#F9FAFB', color: '#6B7280' }} /></Lbl>)}
          </div>
        </div>
      </Card>
    </div>
    {spOpen && <SoftproofOverlay onClose={() => setSpOpen(false)} />}
  </div>;
}

// ── Admin ──
function AdminMenu({ setTab }: { setTab: (t: string) => void }) {
  return <div>
    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18 }}>Maintenance</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, maxWidth: 900 }}>
      {[['⚙', 'Services', 'services'], ['📦', 'Deliveries', 'deliveries'], ['📊', 'Statistics', ''], ['📋', 'Booking Notes', ''], ['📄', 'Report Mappings', 'prfmap'], ['👥', 'Portal Users', 'users'], ['📺', 'Map Publication', ''], ['🔗', 'URN Mappings', ''], ['🏷', 'Brand Matching', 'brands']].map(item => <button key={item[1]} onClick={() => { if (item[2]) setTab(item[2]); }} style={{ textAlign: 'center', padding: '40px 20px', cursor: item[2] ? 'pointer' : 'default', border: '1px solid #E5E7EB', background: '#fff', borderRadius: 10, fontFamily: 'inherit' }}>
        <div style={{ fontSize: 44, marginBottom: 14 }}>{item[0]}</div><div style={{ fontSize: 16, fontWeight: 600 }}>{item[1]}</div>
      </button>)}
    </div>
  </div>;
}

function AdminServices() {
  const [srv, setSrv] = useState('north');
  const svcs = SERVICES.map(s => ({ ...s, comp: srv === 'north' ? 'UKNORTH-VM1' : 'UKSOUTH-VM1' }));
  return <div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}><h2 style={{ fontSize: 22, fontWeight: 700 }}>Services</h2><Btn v="ghost" sz="sm">Refresh</Btn></div>
    <div style={{ display: 'flex', gap: 7, marginBottom: 12 }}>
      {['north', 'south'].map(s => <button key={s} onClick={() => setSrv(s)} style={{ padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', background: srv === s ? B : '#fff', color: srv === s ? '#fff' : '#374151', border: `1px solid ${srv === s ? B : '#E5E7EB'}`, borderRadius: 5 }}>{s === 'north' ? 'UKNORTH-VM1' : 'UKSOUTH-VM1'}</button>)}
    </div>
    <Card>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TRow cols={['Computer', 'Service Name', 'Updated', 'Status', 'Actions']} />
          <tbody>
            {svcs.map(s => <tr key={s.name} style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={{ padding: 14, fontSize: 13 }}>{s.comp}</td>
              <td style={{ padding: 14, fontSize: 14, fontWeight: 500 }}>{s.name}</td>
              <td style={{ padding: 14, fontSize: 13, color: '#6B7280' }}>{s.date}</td>
              <td style={{ padding: 16 }}><StatusBadge status={s.status === 'running' ? 'running' : 'stopped'} /></td>
              <td style={{ padding: 16 }}>
                {s.status === 'running' ? <div style={{ display: 'flex', gap: 8 }}><Btn v="ghost">Stop</Btn><Btn v="ghost">Restart</Btn></div> : <Btn v="green">Start</Btn>}
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>
  </div>;
}

function AdminUsers() {
  const [uTab, setUTab] = useState('personal');
  const flags = [['User Active', 'Yes'], ['Super User', 'Yes'], ['Administrator', 'Yes'], ['usermaint', 'Yes'], ['useraudit', 'Yes'], ['maintusers', 'Yes'], ['AllowSpecDownload', 'Yes'], ['JobApiEnabled', 'Yes']];
  return <div>
    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18 }}>User Management</h2>
    <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #E5E7EB', marginBottom: 14 }}>
      {[['personal', 'Personal Details'], ['admin', 'Admin'], ['accounts', 'Invoicing']].map(item => <button key={item[0]} onClick={() => setUTab(item[0])} style={{ padding: '8px 16px', fontSize: 14, fontWeight: uTab === item[0] ? 700 : 500, color: uTab === item[0] ? B : '#6B7280', background: 'transparent', border: 'none', cursor: 'pointer', borderBottom: uTab === item[0] ? `2px solid ${B}` : '2px solid transparent', marginBottom: -1, fontFamily: 'inherit' }}>{item[1]}</button>)}
    </div>
    {uTab === 'personal' && <Card><div style={{ padding: '16px 18px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Lbl t="First Name" req><In defaultValue="Alan" /></Lbl><Lbl t="Last Name" req><In defaultValue="Roche" /></Lbl>
        <div style={{ gridColumn: 'span 2' }}><Lbl t="Email" req><In defaultValue="alan.roche@qmuli.com" /></Lbl></div>
        <Lbl t="Phone"><In defaultValue="7904365886" /></Lbl><Lbl t="Username" req><In defaultValue="aroche" /></Lbl>
        <div style={{ gridColumn: 'span 2' }}><Lbl t="Company"><In defaultValue="Qmuli Ltd" /></Lbl></div>
        <Lbl t="Address"><In defaultValue="Studio 12, 21 Wren Street" /></Lbl><Lbl t="Postcode"><In defaultValue="WC1X 0HF" /></Lbl>
      </div>
      <div style={{ textAlign: 'right', marginTop: 12 }}><Btn v="green">Save</Btn></div>
    </div></Card>}
    {uTab === 'admin' && <Card><div style={{ padding: '16px 18px' }}>
      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Admin Flags</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
        {flags.map(item => <div key={item[0]} style={{ background: '#F9FAFB', borderRadius: 6, padding: 10 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 5 }}>{item[0]}</div><StatusBadge status={item[1] === 'Yes' ? 'approved' : 'rejected'} /></div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Lbl t="Pricing Tier"><Sel defaultValue="Tier 2"><option>Tier 1</option><option>Tier 2</option><option>Tier 3</option></Sel></Lbl>
        <div style={{ gridColumn: 'span 2' }}><Lbl t="API Key"><div style={{ display: 'flex', gap: 7 }}><In defaultValue="230EAAB6-83B9-462C-AE36-27628B205382" readOnly style={{ background: '#F9FAFB', fontFamily: 'monospace', fontSize: 11 }} /><Btn v="ghost" sz="sm">Copy</Btn></div></Lbl></div>
      </div>
      <div style={{ textAlign: 'right', marginTop: 12 }}><Btn v="green">Save</Btn></div>
    </div></Card>}
    {uTab === 'accounts' && <Card><div style={{ padding: '16px 18px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Lbl t="VAT Rate (%)"><In defaultValue="20" /></Lbl><Lbl t="Account Number"><In defaultValue="1234567892" /></Lbl>
        <div style={{ gridColumn: 'span 2' }}><Lbl t="Invoice Email"><In defaultValue="alan.roche@qmuli.com" /></Lbl></div>
        <div style={{ gridColumn: 'span 2' }}><Lbl t="Invoice Company"><In defaultValue="Qmuli Ltd" /></Lbl></div>
        <Lbl t="Invoice Address"><In defaultValue="Studio 12, 21 Wren Street" /></Lbl><Lbl t="Postcode"><In defaultValue="WC1X 0HF" /></Lbl>
      </div>
      <div style={{ textAlign: 'right', marginTop: 12 }}><Btn v="green">Save Invoicing</Btn></div>
    </div></Card>}
  </div>;
}

function AdminPrfMap() {
  const mappings = [{ n: 'PDF/X entry is not PDF/X-1a:2001', desc: '' }, { n: 'Effective text x-height below 8pt', desc: 'Text may not be legible.' }, { n: 'Effective ink coverage above 220%', desc: 'Above 220% limit.' }, { n: 'FileSizeCheck', desc: 'Above max size.' }];
  return <div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}><h2 style={{ fontSize: 22, fontWeight: 700 }}>Report Mappings</h2><Btn v="green" sz="sm">+ Add</Btn></div>
    <Card>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <TRow cols={['Name', 'Description', 'Actions']} />
        <tbody>{mappings.map(m => <tr key={m.n} style={{ borderBottom: '1px solid #E5E7EB' }}>
          <td style={{ padding: 12, fontSize: 11, fontWeight: 600 }}>{m.n}</td><td style={{ padding: 14, fontSize: 13, color: '#6B7280' }}>{m.desc}</td>
          <td style={{ padding: 12 }}><div style={{ display: 'flex', gap: 7 }}><Btn v="ghost" sz="sm">Edit</Btn><Btn v="red" sz="sm">Del</Btn></div></td>
        </tr>)}</tbody>
      </table>
    </Card>
  </div>;
}

function AdminBrands() {
  const brands = [{ brand: '2480_Tudor_The Times Magazine_XXX', adv: 'Rolex_XXX', cnt: 1, unlinked: true, uid: 6, pid: 7770 }, { brand: 'BORN TO DARE_XXX', adv: 'Tudor_XXX', cnt: 3, unlinked: true, uid: 6, pid: 7862 }, { brand: 'Brand Test_XXX', adv: 'Michael Spiers_XXX', cnt: 101, unlinked: false, uid: 6, pid: 31 }];
  return <div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}><h2 style={{ fontSize: 22, fontWeight: 700 }}>Brand Matching</h2><Btn v="green" sz="sm">+ Add</Btn></div>
    <Card>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TRow cols={['', 'Brand Name', 'Advertiser', 'Verified', 'Unlinked', 'User Id', 'Pub Id']} />
          <tbody>{brands.map((b, i) => <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
            <td style={{ padding: 12 }}><div style={{ display: 'flex', gap: 6 }}><Btn v="ghost" sz="sm">Edit</Btn><Btn v="red" sz="sm">Del</Btn></div></td>
            <td style={{ padding: 12, fontSize: 11, maxWidth: 160 }}>{b.brand}</td><td style={{ padding: 14, fontSize: 13 }}>{b.adv}</td>
            <td style={{ padding: 12 }}>{b.cnt}</td><td style={{ padding: 12 }}><StatusBadge status={b.unlinked ? 'pending' : 'approved'} /></td>
            <td style={{ padding: 12 }}>{b.uid}</td><td style={{ padding: 12 }}>{b.pid}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </Card>
  </div>;
}

function Admin() {
  const [tab, setTab] = useState('menu');
  const sidebar = [{ id: 'menu', icon: '🏠', label: 'Dashboard' }, { id: 'services', icon: '⚙', label: 'Services' }, { id: 'deliveries', icon: '📦', label: 'Deliveries' }, { id: 'users', icon: '👥', label: 'User Management' }, { id: 'prfmap', icon: '📋', label: 'Report Mappings' }, { id: 'brands', icon: '🏷', label: 'Brand Matching' }];
  return <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 102px)' }}>
    <nav style={{ width: 260, flexShrink: 0, background: '#fff', borderRight: '1px solid #E5E7EB', padding: '16px 10px', overflowY: 'auto' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.8px', textTransform: 'uppercase', color: '#9CA3AF', padding: '8px 10px 6px', marginTop: 4 }}>Maintenance</div>
      {sidebar.map(s => <div key={s.id} onClick={() => setTab(s.id)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 11px', borderRadius: 6, fontSize: 14, fontWeight: 500, color: tab === s.id ? B : '#374151', background: tab === s.id ? BL : 'transparent', cursor: 'pointer', marginBottom: 1 }}>
        <span style={{ fontSize: 16 }}>{s.icon}</span>{s.label}
      </div>)}
    </nav>
    <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
      {tab === 'menu' && <AdminMenu setTab={setTab} />}
      {tab === 'services' && <AdminServices />}
      {tab === 'deliveries' && <div><h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18 }}>Deliveries</h2><Card><div style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, color: O, borderBottom: '1px solid #E5E7EB' }}>1 Queued in Pre Delivery</div><table style={{ width: '100%', borderCollapse: 'collapse' }}><TRow cols={['Delivery Id', 'User Id', 'Original File']} /><tbody><tr style={{ borderBottom: '1px solid #E5E7EB' }}><td style={{ padding: 14, fontSize: 14, fontWeight: 600 }}>2994302</td><td style={{ padding: 12 }}>24728</td><td style={{ padding: 14, fontSize: 13 }}>12569_27491_MailOS_Waitrose_East.pdf</td></tr></tbody></table></Card></div>}
      {tab === 'users' && <AdminUsers />}
      {tab === 'prfmap' && <AdminPrfMap />}
      {tab === 'brands' && <AdminBrands />}
    </div>
  </div>;
}

// ── MAIN APP ──
export default function Index() {
  const [page, setPage] = useState('landing');
  const [aTab, setATab] = useState('dashboard');
  const [pTab, setPTab] = useState('inbox');
  const [headerSearch, setHeaderSearch] = useState('');
  const [prefill, setPrefill] = useState<any>(null);
  const [preflightResult, setPreflightResult] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [searchPubId, setSearchPubId] = useState<string | null>(null);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 4000); }

  function login(type: string) {
    if (type === 'publisher') { setPage('publisher'); setPTab('inbox'); }
    else { setPage('agency'); setATab('dashboard'); }
  }
  function nav(dest: string) {
    if (dest === 'landing' || dest === 'login') setPage('landing');
    else if (dest === 'agency') { setPage('agency'); setATab('tracking'); }
    else if (dest === 'admin') setPage('admin');
  }
  function handleSendAd(data: any) { setPrefill(data); setATab('sendad'); }
  function handleSetATab(t: string) {
    if (t === 'specs') { setHeaderSearch(''); setPrefill(null); setSearchPubId(null); }
    setATab(t);
    if (t !== 'sendad') setPrefill(null);
  }
  function handleSearchSelect(pubId: string) {
    setSearchPubId(pubId);
    setATab('specs');
  }

  return <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Topbar page={page} aTab={aTab} setATab={handleSetATab} pTab={pTab} setPTab={setPTab} onNav={nav} headerSearch={headerSearch} setHeaderSearch={setHeaderSearch} onSearchSelect={handleSearchSelect} />
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {page === 'landing' && <Landing onLogin={login} />}
      {page === 'agency' && <>
        {aTab === 'dashboard' && <Dashboard setTab={handleSetATab} />}
        {aTab === 'tracking' && <Tracking onContinue={() => setATab('preflight')} preflightResult={preflightResult} onReUpload={() => { setPrefill({ pub: PUBLISHERS[0], section: 'Display/ROP', size: PUBLISHERS[0].pubs[0] ? { n: PUBLISHERS[0].pubs[0].n, w: PUBLISHERS[0].pubs[0].w, h: PUBLISHERS[0].pubs[0].h } : { n: 'Full Page', w: '264mm', h: '338mm' } }); setATab('sendad'); }} />}
        {aTab === 'colour' && <ColourMgmt />}
        {aTab === 'bookings' && <BookingsPage />}
        {aTab === 'specs' && <PublisherGrid initialSearch={headerSearch} onSendAd={handleSendAd} directPubId={searchPubId} />}
        {aTab === 'sendad' && <SendAdForm prefill={prefill} onBack={() => setATab('specs')} onSubmit={() => setATab('preflight')} />}
        {aTab === 'preflight' && <Preflight onBack={() => setATab('tracking')} onProceed={() => setATab('delivery')} onResult={setPreflightResult} />}
        {aTab === 'delivery' && <Delivery onBack={() => setATab('preflight')} onConfirm={() => { setATab('tracking'); showToast('Ad Delivered! Publisher notified. Tracking #2988601'); }} />}
      </>}
      {page === 'publisher' && <>
        {pTab === 'inbox' && <PubInbox />}
        {pTab === 'archive' && <div style={{ padding: 20 }}><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Archive</h2><Notice type="info">Previously processed ads appear here.</Notice></div>}
        {pTab === 'specs' && <PublisherGrid onSendAd={handleSendAd} />}
      </>}
      {page === 'admin' && <Admin />}
    </div>
    {toast && <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: '#1F2937', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,.25)', zIndex: 500, whiteSpace: 'nowrap' }}>{toast}</div>}
  </div>;
}
