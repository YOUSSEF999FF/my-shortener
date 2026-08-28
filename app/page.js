'use client';
import { useState } from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = (e) => {
    e.preventDefault();
    if (!longUrl) return;
    const slug = Math.random().toString(36).substring(2, 7);
    const finalShort = `${window.location.origin}/${slug}`;
    setShortUrl(finalShort);
    
    // حفظ الرابط الأصلي في المتصفح لربطه بالرابط المختصر
    localStorage.setItem(`link_${slug}`, longUrl);
  };

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <section style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#fff', marginBottom: '15px' }}>
          اختصر روابطك بذكاء وشاركها
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '30px' }}>
          أداة بسيطة وسريعة لاختصار الروابط الطويلة وتحويلها إلى روابط احترافية.
        </p>

        <div className="card">
          <form onSubmit={handleShorten} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="url" 
              className="input-box" 
              placeholder="🔗 ضع الرابط الطويل هنا..." 
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>اختصار الرابط</button>
          </form>

          {shortUrl && (
            <div style={{ marginTop: '25px', textAlign: 'right', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <p style={{ color: 'var(--accent-cyan)', fontSize: '14px', marginBottom: '10px' }}>رابطك جاهز:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" className="input-box" value={shortUrl} readOnly />
                <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(shortUrl)}>نسخ الرابط</button>
              </div>
              <QRCodeGenerator url={shortUrl} />
            </div>
          )}
        </div>
      </section>

      {/* الخطوات المنطقية بدلاً من الأرقام الوهمية */}
      <section className="grid-3" style={{ margin: '60px 0', textAlign: 'center' }}>
        <div className="card">
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>1. الصق الرابط</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>ضع أي رابط طويل ترغب في مشاركته في المربع أعلاه.</p>
        </div>
        <div className="card">
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>2. انسخ الرابط المختصر</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>بضغطة زر ستحصل على رابط قصير وشيك جاهز للاستخدام.</p>
        </div>
        <div className="card">
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>3. شاركه مع الجميع</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>انشر الرابط في قنواتك واستمتع بتجربة تحويل آمنة وموثوقة.</p>
        </div>
      </section>
    </main>
  );
}
