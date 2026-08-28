import LinkUnlocker from '@/components/LinkUnlocker';

export default function RedirectPage({ params }) {
  const { slug } = params;

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#fff' }}>LINKSHORT-PRO</h1>
        <p style={{ color: 'var(--text-muted)' }}>جاري التوجيه للرابط المختصر: /{slug}</p>
      </div>
      <LinkUnlocker targetUrl="https://google.com" />
    </main>
  );
}

