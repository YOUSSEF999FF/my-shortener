'use client';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '10px' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '14px', marginBottom: '25px' }}>Login to your LINKSHORT-PRO account</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
          <input type="email" placeholder="Email Address" className="input-box" required />
          <input type="password" placeholder="Password" className="input-box" required />
          <button type="submit" className="btn-primary">Login</button>
        </form>

        <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', marginTop: '20px' }}>
          Don't have an account? <Link href="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

