import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', background: '#090d16', padding: '50px 0 20px', marginTop: 'auto' }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '40px' }}>
          <div>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>LINKSHORT-PRO</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
              Short Links. More Reach. More Control.
              أنشئ روابط قصيرة، آمنة وموثوقة خلال ثوانٍ.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '15px' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <Link href="#features" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Features</Link>
              <Link href="#pricing" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Pricing</Link>
              <Link href="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '15px' }}>Legal & Safety</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</Link>
              <Link href="/abuse" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Report Abuse</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '15px' }}>Developers</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <Link href="/api/v1/shorten" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>REST API Documentation</Link>
              <span style={{ color: 'var(--text-muted)' }}>Status: <span style={{ color: '#10b981' }}>99.9% Online</span></span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
          © {new Date().getFullYear()} LINKSHORT-PRO. All rights reserved. Designed for high performance.
        </div>
      </div>
    </footer>
  );
}

