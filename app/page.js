'use client';
import { useState } from 'react';
import { AdBanner } from '@/components/Ads';
import LinkUnlocker from '@/components/LinkUnlocker';
import QRCodeGenerator from '@/components/QRCodeGenerator';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = (e) => {
    e.preventDefault();
    if (!longUrl) return;
    const slug = Math.random().toString(36).substring(2, 7);
    setShortUrl(`${window.location.origin}/${slug}`);
  };

  return (
    <main className="container" style={{ padding: '60px 20px' }}>
      
      {/* 1. Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#fff', lineHeight: '1.2', marginBottom: '15px' }}>
          Shorten Links.<br />
          <span style={{ color: 'var(--primary)' }}>Grow Your Reach.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '35px' }}>
          Create short, powerful and trackable links in seconds.
        </p>

        {/* Shortener Box */}
        <div className="card">
          <form onSubmit={handleShorten} className="input-group">
            <input 
              type="url" 
              className="input-box" 
              placeholder="🔗 Paste your long URL here... (e.g. https://example.com/very/long/url)" 
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Shorten</button>
          </form>

          {shortUrl && (
            <div style={{ marginTop: '20px', textAlign: 'right', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
              <p style={{ color: 'var(--accent-cyan)', fontSize: '14px', marginBottom: '8px' }}>الرابط المختصر جاهز:</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" className="input-box" value={shortUrl} readOnly />
                <button className="btn-primary" onClick={() => navigator.clipboard.writeText(shortUrl)}>نسخ</button>
              </div>
              <QRCodeGenerator url={shortUrl} />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px', color: 'var(--text-muted)', fontSize: '13px' }}>
            <span>✓ Free to use</span>
            <span>✓ Fast</span>
            <span>✓ Analytics</span>
          </div>
        </div>
      </section>

      <AdBanner adKey="8824083875b75393556ad43f19ff78f5" width={728} height={90} />

      {/* 2. Statistics Section */}
      <section className="grid-4" style={{ margin: '60px 0', textAlign: 'center' }}>
        <div className="card">
          <h2 style={{ color: 'var(--primary)', fontSize: '32px' }}>10M+</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Links Shortened</p>
        </div>
        <div className="card">
          <h2 style={{ color: 'var(--primary)', fontSize: '32px' }}>2M+</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Happy Users</p>
        </div>
        <div className="card">
          <h2 style={{ color: 'var(--primary)', fontSize: '32px' }}>150+</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Countries</p>
        </div>
        <div className="card">
          <h2 style={{ color: 'var(--primary)', fontSize: '32px' }}>99.9%</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Uptime</p>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" style={{ margin: '80px 0' }}>
        <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '40px', fontSize: '30px' }}>
          Everything you need to manage your links.
        </h2>
        <div className="grid-3">
          <div className="card">
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>🔗 Smart Short Links</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>اختصر أي رابط خلال ثوانٍ معدودة مع سهولة التتبع والمشاركة.</p>
          </div>
          <div className="card">
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>📊 Advanced Analytics</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>شاهد النقر، البلدان، الأجهزة، المتصفحات ومصادر الزيارات بدقة.</p>
          </div>
          <div className="card">
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>🎯 Custom Links</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>خصص اسم الرابط المختصر ليعبر عن علامتك التجارية بسهولة.</p>
          </div>
          <div className="card">
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>🔒 Secure Links</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>حماية من السبام، فحص الروابط الخبيثة ونظام الإبلاغ الفوري.</p>
          </div>
          <div className="card">
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>📱 Mobile Friendly</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>لوحة تحكم وتجربة مستخدم مخصصة بالكامل للعمل على الهواتف.</p>
          </div>
          <div className="card">
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>⚡ Fast Redirects</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>سيرفرات فائقة السرعة تضمن توجيه الزوار بدون أي تأخير.</p>
          </div>
        </div>
      </section>

      {/* 4. Pricing Section */}
      <section id="pricing" style={{ margin: '80px 0' }}>
        <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '40px', fontSize: '30px' }}>Flexible Plans for Everyone</h2>
        <div className="grid-3">
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#fff' }}>Free</h3>
            <h2 style={{ color: 'var(--primary)', fontSize: '36px', margin: '15px 0' }}>$0</h2>
            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '2', marginBottom: '20px' }}>
              <li>100 Links / month</li>
              <li>Basic Analytics</li>
              <li>QR Codes Generator</li>
            </ul>
            <button className="btn-secondary" style={{ width: '100%' }}>Start Free</button>
          </div>
          <div className="card" style={{ textAlign: 'center', border: '2px solid var(--primary)' }}>
            <span className="badge" style={{ marginBottom: '10px', display: 'inline-block' }}>MOST POPULAR</span>
            <h3 style={{ color: '#fff' }}>Pro</h3>
            <h2 style={{ color: 'var(--primary)', fontSize: '36px', margin: '15px 0' }}>$4.99<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/mo</span></h2>
            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '2', marginBottom: '20px' }}>
              <li>Unlimited Links</li>
              <li>Advanced Analytics</li>
              <li>Custom Slugs & Domains</li>
              <li>API Access</li>
            </ul>
            <button className="btn-primary" style={{ width: '100%' }}>Upgrade to Pro</button>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#fff' }}>Business</h3>
            <h2 style={{ color: 'var(--primary)', fontSize: '36px', margin: '15px 0' }}>$14.99<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/mo</span></h2>
            <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '2', marginBottom: '20px' }}>
              <li>Everything in Pro</li>
              <li>Team Members</li>
              <li>Priority Support</li>
            </ul>
            <button className="btn-secondary" style={{ width: '100%' }}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Demo Redirect Component */}
      <section style={{ margin: '60px 0' }}>
        <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '20px' }}>معاينة صفحة التحويل والإعلانات</h2>
        <LinkUnlocker targetUrl={longUrl || "https://google.com"} />
      </section>

    </main>
  );
}

