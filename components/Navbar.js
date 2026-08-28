'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        <Link href="/" style={{ fontSize: '22px', fontWeight: '900', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--primary)' }}>LINKSHORT</span>-PRO
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }} className="desktop-nav">
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
          <Link href="#features" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>Features</Link>
          <Link href="#pricing" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>Pricing</Link>
          <Link href="/api/v1/shorten" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>API</Link>
          <Link href="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Login</Link>
          <Link href="/register" className="btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>Get Started</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div style={{ background: 'var(--bg-dark)', padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
          <Link href="#features" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Features</Link>
          <Link href="#pricing" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Pricing</Link>
          <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-secondary">Login</Link>
          <Link href="/register" onClick={() => setMenuOpen(false)} className="btn-primary">Get Started</Link>
        </div>
      )}
    </nav>
  );
}

