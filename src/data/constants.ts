// Color constants - Burnt Orange brand
export const B = '#C2410C';
export const BD = '#9A3412';
export const BL = '#FFF7ED';
export const BL2 = '#EA580C';
export const G = '#16A34A';
export const O = '#F59E0B';
export const R = '#DC2626';

export const THMAP: Record<string, string> = {
  pdf: '📄', jpg: '🖼', tif: '🎨', eps: '📐', ai: '🎯',
};

export interface Booking {
  urn: string;
  pub: string;
  owner: string;
  size: string;
  adv: string;
  brand: string;
  insertion: string;
  deadline: string;
  status: string;
}

export const BOOKINGS: Booking[] = [
  { urn: 'URN-2026-001', pub: 'The Times', owner: 'News UK Ltd', size: 'Full Page', adv: 'Nike', brand: 'Air Max 2026', insertion: '25 Mar 2026', deadline: '22 Mar 2026 18:00', status: 'confirmed' },
  { urn: 'URN-2026-002', pub: 'Daily Mail', owner: 'DMG Media', size: 'Half Page', adv: 'Unilever', brand: 'Dove Spring', insertion: '26 Mar 2026', deadline: '23 Mar 2026 12:00', status: 'confirmed' },
  { urn: 'URN-2026-003', pub: 'The Guardian', owner: 'Guardian Media', size: 'Quarter Page', adv: 'Apple', brand: 'iPad Pro', insertion: '27 Mar 2026', deadline: '24 Mar 2026 17:00', status: 'pending' },
  { urn: 'URN-2026-004', pub: 'Financial Times', owner: 'FT Group', size: 'Full Page', adv: 'HSBC', brand: 'Global Campaign', insertion: '28 Mar 2026', deadline: '25 Mar 2026 12:00', status: 'confirmed' },
  { urn: 'URN-2026-005', pub: 'The Telegraph', owner: 'TMG', size: 'DPS', adv: 'Mercedes-Benz', brand: 'EQS Launch', insertion: '01 Apr 2026', deadline: '28 Mar 2026 18:00', status: 'pending' },
];

export interface Job {
  id: string;
  adv: string;
  brand: string;
  pub: string;
  fmt: string;
  ins: string;
  up: string;
  status: string;
  stime: string;
  th: string;
  sel: boolean;
  arch: boolean;
}

export const JOBS: Job[] = [
  { id: 'MCS-00127', adv: 'Spring Campaign', brand: 'Qmuli', pub: 'Daily Record', fmt: 'Full Page', ins: '08 Mar 2026', up: '07 Mar 2026', status: 'sent', stime: '14:32', th: 'pdf', sel: false, arch: false },
  { id: 'MCS-00126', adv: 'Nike', brand: 'Air Max 2026', pub: 'The Times', fmt: 'Half Page', ins: '12 Mar 2026', up: '05 Mar 2026', status: 'received', stime: '09:15', th: 'pdf', sel: false, arch: false },
  { id: 'MCS-00125', adv: 'Unilever', brand: 'Dove Spring', pub: 'Daily Mail', fmt: 'Quarter Page', ins: '15 Mar 2026', up: '03 Mar 2026', status: 'rejected', stime: '16:44', th: 'jpg', sel: false, arch: false },
  { id: 'MCS-00124', adv: 'Apple', brand: 'iPad Pro', pub: 'The Guardian', fmt: 'Full Page', ins: '18 Mar 2026', up: '01 Mar 2026', status: 'sent', stime: '11:20', th: 'pdf', sel: false, arch: false },
  { id: 'MCS-00123', adv: 'HSBC', brand: 'Global Campaign', pub: 'Financial Times', fmt: 'DPS', ins: '20 Mar 2026', up: '28 Feb 2026', status: 'received', stime: '10:05', th: 'tif', sel: false, arch: false },
];

export interface Publisher {
  id: string;
  name: string;
  desc: string;
  cat: string;
  titles: number;
  logoKey: string;
  tel: string;
  email: string;
  addr: string;
  pubs: { n: string; sec: string; h: string; w: string }[];
}

export const PUBLISHERS: Publisher[] = [
  { id: 'newsuk', name: 'News UK Ltd', desc: 'Times, Sun, Times Literary Supplement', cat: 'National Press', titles: 4, logoKey: 'NEWSUK', tel: '+44 20 7782 5000', email: 'ci@news.co.uk', addr: '1 London Bridge Street, London SE1 9GF', pubs: [{ n: 'The Times', sec: 'Display/ROP', h: '338mm', w: '264mm' }, { n: 'The Sun', sec: 'Display/ROP', h: '340mm', w: '272mm' }, { n: 'The Sunday Times', sec: 'Magazine', h: '267mm', w: '200mm' }] },
  { id: 'reach', name: 'Reach PLC', desc: 'Mirror, Express, Star, regional titles', cat: 'National & Regional', titles: 6, logoKey: 'REACH', tel: '+44 20 7293 3000', email: 'ads@reach.co.uk', addr: 'One Canada Square, Canary Wharf, London E14 5AP', pubs: [{ n: 'Daily Mirror', sec: 'Display/ROP', h: '340mm', w: '264mm' }, { n: 'Daily Express', sec: 'Display/ROP', h: '340mm', w: '264mm' }] },
  { id: 'ft', name: 'Financial Times', desc: 'Global business & finance news', cat: 'Financial Press', titles: 1, logoKey: 'FT', tel: '+44 20 7873 3000', email: 'adsupport@ft.com', addr: 'Bracken House, London EC4M 9JA', pubs: [{ n: 'Financial Times', sec: 'Display/ROP', h: '338mm', w: '259mm' }] },
  { id: 'gmg', name: 'Guardian Media Group', desc: 'The Guardian, The Observer', cat: 'National Press', titles: 2, logoKey: 'GMG', tel: '+44 20 3353 2000', email: 'production@theguardian.com', addr: 'Kings Place, London N1 9GU', pubs: [{ n: 'The Guardian', sec: 'Display/ROP', h: '340mm', w: '264mm' }, { n: 'The Observer', sec: 'Display/ROP', h: '340mm', w: '264mm' }] },
  { id: 'tmg', name: 'Telegraph Media Group', desc: 'Daily Telegraph, Sunday Telegraph', cat: 'National Press', titles: 2, logoKey: 'TMG', tel: '+44 20 7931 2000', email: 'production@telegraph.co.uk', addr: '111 Buckingham Palace Road, London SW1W 0DT', pubs: [{ n: 'Daily Telegraph', sec: 'Display/ROP', h: '338mm', w: '264mm' }] },
  { id: 'conde', name: 'Condé Nast', desc: 'Vogue, GQ, Vanity Fair, WIRED UK', cat: 'Magazine', titles: 5, logoKey: 'CONDENAST', tel: '+44 20 7499 9080', email: 'production@condenast.co.uk', addr: 'The Adelphi, 1-11 John Adam Street, London WC2N 6HT', pubs: [{ n: 'Vogue UK', sec: 'Magazine', h: '280mm', w: '210mm' }, { n: 'GQ UK', sec: 'Magazine', h: '280mm', w: '210mm' }] },
  { id: 'hearst', name: 'Hearst UK', desc: 'Cosmopolitan, Elle, Esquire, Harper\'s Bazaar', cat: 'Magazine', titles: 4, logoKey: 'HEARST', tel: '+44 20 7439 5000', email: 'production@hearst.co.uk', addr: '30 Panton Street, London SW1Y 4AJ', pubs: [{ n: 'Cosmopolitan UK', sec: 'Magazine', h: '275mm', w: '210mm' }] },
  { id: 'economist', name: 'The Economist Group', desc: 'Business, politics and international affairs', cat: 'Business & Finance', titles: 12, logoKey: 'ECONOMIST', tel: '+44 20 7830 7000', email: 'production@economist.com', addr: '1-11 John Adam Street, London WC2N 6HT', pubs: [{ n: 'The Economist', sec: 'Magazine', h: '276mm', w: '210mm' }] },
  { id: 'bauer', name: 'Bauer Media Group', desc: 'Consumer magazines and radio', cat: 'Entertainment', titles: 78, logoKey: 'BAUER', tel: '+44 20 7520 6500', email: 'production@bauermedia.co.uk', addr: 'Media House, Peterborough PE2 6EA', pubs: [{ n: 'Grazia UK', sec: 'Magazine', h: '280mm', w: '210mm' }, { n: 'Heat Magazine', sec: 'Magazine', h: '280mm', w: '210mm' }] },
  { id: 'future', name: 'Future plc', desc: 'Special interest media', cat: 'Technology & Gaming', titles: 95, logoKey: 'FUTURE', tel: '+44 1225 442244', email: 'production@futureplc.com', addr: 'Quay House, The Ambury, Bath BA1 1UA', pubs: [{ n: 'T3 Magazine', sec: 'Magazine', h: '280mm', w: '210mm' }, { n: 'PC Gamer', sec: 'Magazine', h: '280mm', w: '210mm' }] },
];

export interface Section {
  name: string;
  spec: string;
  pdf: string;
  icc: string;
  tac: string;
  bleed: string;
  sizes: { n: string; w: string; h: string; bw?: string; bh?: string }[];
  columns?: { row: string; cols: (string | null)[] }[];
  vectorLimit?: number;
  imageLimit?: number;
  deadlines?: { time: string; sections: string[] }[];
  dpsNote?: string;
  maxColH?: string;
}

export const SECTIONS: Section[] = [
  {
    name: 'Display/ROP', spec: 'WAN-IFRAnewspaper26v5', pdf: 'PDF/X-1a:2001', icc: 'WAN-IFRAnewspaper26v5.icc',
    tac: '220%', bleed: '3mm',
    sizes: [
      { n: 'Full Page', w: '264mm', h: '338mm', bw: '270mm', bh: '344mm' },
      { n: 'Half Page Landscape', w: '264mm', h: '166mm', bw: '270mm', bh: '172mm' },
      { n: 'Half Page Portrait', w: '129mm', h: '338mm', bw: '135mm', bh: '344mm' },
      { n: 'Quarter Page', w: '129mm', h: '166mm' },
      { n: 'Double Page Spread', w: '540mm', h: '338mm', bw: '546mm', bh: '344mm' },
    ],
    columns: [
      { row: 'Type area width', cols: ['29mm', '62.5mm', '96mm', '129.5mm', '163mm', '196.5mm', '264mm'] },
      { row: 'PDF width (incl 3mm bleed)', cols: ['35mm', '68.5mm', '102mm', '135.5mm', '169mm', '202.5mm', '270mm'] },
    ],
    vectorLimit: 25000, imageLimit: 4000, maxColH: '338mm',
    deadlines: [
      { time: '6 pm Business Day before edition (Fri for Mon):', sections: ['Main Book', 'News', 'Business News', 'Sport', 'Times2'] },
      { time: "6 pm Wednesday for Friday's edition:", sections: ['Bricks and Mortar (Display)'] },
      { time: "6 pm Friday for Saturday's edition:", sections: ['Money (Display)', 'Property'] },
      { time: "6 pm Thursday for Saturday's edition:", sections: ['Weekend (Display)', 'Travel (Display)', 'Saturday Review'] },
    ],
    dpsNote: 'please leave the central 6 mm clear of any T+Cs for the gutter.',
  },
  {
    name: 'Classified', spec: 'WAN-IFRAnewspaper26v5', pdf: 'PDF/X-1a:2001', icc: 'WAN-IFRAnewspaper26v5.icc',
    tac: '220%', bleed: 'None',
    sizes: [
      { n: 'Full Page Classified', w: '264mm', h: '338mm' },
      { n: 'Half Page Classified', w: '264mm', h: '166mm' },
    ],
  },
  {
    name: 'Magazine Supplement', spec: 'PSO Coated v3', pdf: 'PDF/X-1a:2001', icc: 'PSO_Coated_v3.icc',
    tac: '320%', bleed: '3mm',
    sizes: [
      { n: 'Full Page Magazine', w: '200mm', h: '267mm', bw: '206mm', bh: '273mm' },
      { n: 'DPS Magazine', w: '406mm', h: '267mm', bw: '412mm', bh: '273mm' },
    ],
  },
];

export interface InboxAd {
  id: string;
  file: string;
  adv: string;
  pub: string;
  size: string;
  ins: string;
  rcv: string;
  status: string;
  th: string;
}

export const INBOX: InboxAd[] = [
  { id: 'IN-001', file: 'Nike_AirMax_FullPage_v3.pdf', adv: 'Nike', pub: 'Daily Mirror', size: 'Full Page', ins: '25 Mar 2026', rcv: '22 Mar 2026 14:32', status: 'new', th: 'pdf' },
  { id: 'IN-002', file: 'Unilever_Dove_HalfPage.pdf', adv: 'Unilever', pub: 'Daily Mirror', size: 'Half Page', ins: '26 Mar 2026', rcv: '22 Mar 2026 11:15', status: 'new', th: 'pdf' },
  { id: 'IN-003', file: 'HSBC_Global_DPS.pdf', adv: 'HSBC', pub: 'Daily Mirror', size: 'DPS', ins: '28 Mar 2026', rcv: '21 Mar 2026 09:45', status: 'reviewed', th: 'pdf' },
  { id: 'IN-004', file: 'Apple_iPadPro_QP.jpg', adv: 'Apple', pub: 'Daily Mirror', size: 'Quarter Page', ins: '30 Mar 2026', rcv: '20 Mar 2026 16:20', status: 'approved', th: 'jpg' },
];

export interface Service {
  name: string;
  status: string;
  date: string;
}

export const SERVICES: Service[] = [
  { name: 'AdFast.Preflight', status: 'running', date: '12/03/2026 09:41' },
  { name: 'AdFast.ColourMgr', status: 'running', date: '12/03/2026 09:40' },
  { name: 'AdFast.Delivery', status: 'running', date: '12/03/2026 09:38' },
  { name: 'AdFast.Scheduler', status: 'running', date: '12/03/2026 09:35' },
  { name: 'AdFast.Notifications', status: 'stopped', date: '11/03/2026 14:22' },
];
