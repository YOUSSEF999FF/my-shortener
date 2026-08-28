'use client';
import Link from 'next/link';

export default function Register() {
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '10px' }}>Create Account</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '14px', marginBottom: '25px' }}>Start shortening and tracking links</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
          <input type="text" placeholder="Full Name" className="input-box" required />
          <input type="email" placeholder="Email Address" className="input-box" required />
          <input type="password" placeholder="Password" className="input-box" required />
          <button type="submit" className="btn-primary">Create Free Account</button>
        </form>

        <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

