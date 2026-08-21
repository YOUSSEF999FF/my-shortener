'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'حدث خطأ ما');

      const fullShortUrl = `${window.location.origin}/${data.shortCode}`;
      setShortUrl(fullShortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main style={{ width: '100%', maxWidth: '520px', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{
        background: '#1e293b',
        borderRadius: '16px',
        padding: '32px 24px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
        border: '1px solid #334155',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#38bdf8' }}>
          مختصر الروابط السريع 🚀
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '24px' }}>
          ضع رابطك الطويل بالأسفل لتحويله إلى رابط قصير فوري
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="url"
            required
            placeholder="ضع الرابط هنا (مثال: https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              padding: '14px 16px',
              borderRadius: '10px',
              border: '1px solid #475569',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              fontSize: '15px',
              outline: 'none',
              direction: 'ltr',
              textAlign: 'left'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: '0.2s'
            }}
          >
            {loading ? 'جاري الاختصار...' : 'اختصار الرابط الآن'}
          </button>
        </form>

        {error && (
          <p style={{ color: '#f87171', marginTop: '16px', fontSize: '14px' }}>
            {error}
          </p>
        )}

        {shortUrl && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#0f172a',
            borderRadius: '10px',
            border: '1px dashed #38bdf8'
          }}>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>رابطك المختصر:</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="text"
                readOnly
                value={shortUrl}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  color: '#38bdf8',
                  direction: 'ltr',
                  textAlign: 'left',
                  fontSize: '14px'
                }}
              />
              <button
                type="button"
                onClick={copyToClipboard}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: copied ? '#16a34a' : '#38bdf8',
                  color: copied ? '#ffffff' : '#0f172a',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {copied ? 'تم النسخ!' : 'نسخ'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

