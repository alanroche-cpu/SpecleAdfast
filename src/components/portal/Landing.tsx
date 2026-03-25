import React from 'react';
import { B, BL, G, O, R, BL2 } from '@/data/constants';
import { Btn } from '@/components/portal/SharedComponents';
import specleLogo from '@/assets/specle-logo.png';

interface LandingProps { onLogin: (type: string) => void }

export function Landing({ onLogin }: LandingProps) {
  const [type, setType] = React.useState('agency');
  return <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 88px)' }}>
    <div style={{ background: B, padding: '56px 32px 64px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -60, top: -60, width: 380, height: 380, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }} />
      <div style={{ position: 'absolute', left: -80, bottom: -120, width: 400, height: 400, borderRadius: '50%', background: 'rgba(0,0,0,.05)' }} />
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'center', position: 'relative' }}>
        <div>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.15)', borderRadius: 16, padding: '4px 12px', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.9)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 20 }}>⚡ Trusted ad delivery platform since 2008</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 14 }}>Validate and deliver ads<br />to publishers <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,.65)' }}>worldwide</em></h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', lineHeight: 1.75, marginBottom: 28, maxWidth: 420 }}>Automated preflight checks, colour optimisation and direct delivery to 1,200+ publications.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
            <Btn v="ghost" sz="lg" style={{ background: '#fff', color: B, border: 'none', fontWeight: 700 }} onClick={() => onLogin('agency')}>Get Started Free</Btn>
            <Btn v="ghost" sz="lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }} onClick={() => onLogin('agency')}>Agency Demo</Btn>
            <Btn v="ghost" sz="lg" style={{ background: 'rgba(0,0,0,.1)', color: 'rgba(255,255,255,.6)', border: '1px solid rgba(255,255,255,.15)' }} onClick={() => onLogin('publisher')}>Publisher Demo</Btn>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.15)', paddingTop: 16, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            {['News UK', 'Reach', 'DMG Media', 'Guardian', 'Telegraph'].map(p => <span key={p} style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,.4)' }}>{p}</span>)}
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.25)' }}>+ 1,195 more</span>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,.25)' }}>
          <div style={{ textAlign: 'center', marginBottom: 12 }}><img src={specleLogo} alt="Specle" style={{ height: 28, filter: 'invert(1) grayscale(1) brightness(0)' }} /></div>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, textAlign: 'center' }}>Login to your account</div>
          <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 8, padding: 3, gap: 3, marginBottom: 16 }}>
            {(['agency', 'publisher'] as const).map(t => <button key={t} onClick={() => setType(t)} style={{ flex: 1, padding: 7, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', background: type === t ? '#fff' : 'transparent', color: type === t ? B : '#6B7280', border: type === t ? `1px solid ${B}` : '1px solid transparent' }}>{t === 'agency' ? 'Agency' : 'Publisher'}</button>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
            <input placeholder="Username" style={{ width: '100%', padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 12, outline: 'none' }} />
            <input type="password" placeholder="Password" style={{ width: '100%', padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 12, outline: 'none' }} onKeyDown={e => { if (e.key === 'Enter') onLogin(type); }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, fontSize: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#374151' }}><input type="checkbox" style={{ accentColor: B }} /> Remember me</label>
            <span style={{ color: B, cursor: 'pointer' }}>Forgotten password?</span>
          </div>
          <button onClick={() => onLogin(type)} style={{ width: '100%', padding: 11, background: B, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.3px' }}>Login</button>
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: '#9CA3AF' }}>No account? <span onClick={() => onLogin(type)} style={{ color: B, cursor: 'pointer', fontWeight: 600 }}>Register free</span></div>
        </div>
      </div>
    </div>
    <div style={{ background: '#fff', borderBottom: '1px solid #E5E7EB' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {[['1,200+', 'Publications in database'], ['50+', 'Countries covered'], ['300+', 'Agencies trust us'], ['99.9%', 'Successful delivery rate']].map((item, i) => <div key={i} style={{ textAlign: 'center', padding: 18, borderRight: i < 3 ? '1px solid #E5E7EB' : 'none' }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: B }}>{item[0]}</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>{item[1]}</div>
        </div>)}
      </div>
    </div>
    <div style={{ padding: '52px 32px', background: '#F9FAFB', flex: 1 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.8px', color: B, marginBottom: 8 }}>Workflow</div>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>From upload to delivery in three steps</h2>
          <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>Upload once. We preflight, fix and deliver.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {[['1', 'Send Ad and Preflight', 'Upload your PDF or JPG. Our system checks ink coverage, PDF/X compliance, colour profiles, bleed and text size against the exact publication spec.'],
            ['2', 'Review, Fix or Proceed', 'Review the softproof and preflight report. Request our team fix issues, upload a corrected file, or proceed if warnings are acceptable.'],
            ['3', 'Publisher Downloads and Approves', 'The publisher is notified instantly. They log in, review, download and approve - fully tracked end-to-end.']
          ].map(item => <div key={item[0]} style={{ border: '1px solid #E5E7EB', borderRadius: 8, padding: '24px 20px', background: '#fff' }}>
            <div style={{ width: 38, height: 38, background: BL, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: B, marginBottom: 14 }}>{item[0]}</div>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>{item[1]}</h4>
            <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65, margin: 0 }}>{item[2]}</p>
          </div>)}
        </div>
      </div>
    </div>
    <footer style={{ background: B, padding: '32px 32px 22px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, paddingBottom: 22, borderBottom: '1px solid rgba(255,255,255,.15)', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>AdFast</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', lineHeight: 1.6, maxWidth: 260 }}>Streamlined press advertising specification and delivery platform for agencies and publishers.</div>
        </div>
        <div>
          <h5 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 12, marginTop: 0 }}>Quick Links</h5>
          {['Specifications', 'Bookings', 'Tracking', 'Dashboard'].map(t => <div key={t} onClick={() => onLogin('agency')} style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', marginBottom: 7, cursor: 'pointer' }}>{t}</div>)}
        </div>
        <div>
          <h5 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 12, marginTop: 0 }}>Support</h5>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>support@adfast.com</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>+44 20 1234 5678</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}>Help Center</div>
        </div>
      </div>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,.4)' }}>
        <span>© 2026 AdFast. All rights reserved.</span><span>Powered by Qmuli</span>
      </div>
    </footer>
  </div>;
}
