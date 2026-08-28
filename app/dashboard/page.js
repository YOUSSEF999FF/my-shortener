'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [links] = useState([
    { id: 1, short: '/Ab7Xk', original: 'example.com/long-link', clicks: 1245, created: 'Today' },
    { id: 2, short: '/YT2026', original: 'youtube.com/watch?v=xyz', clicks: 823, created: 'Yesterday' },
    { id: 3, short: '/FFskin', original: 'mediafire.com/file/skin.zip', clicks: 4502, created: '3 days ago' },
  ]);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '28px' }}>Welcome back, Ahmed 👋</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>تابع إحصائيات وروابط حسابك من مكان واحد.</p>
        </div>
        <Link href="/" className="btn-primary">+ Create Short Link</Link>
      </div>

      {/* Stat Cards */}
      <div className="grid-4" style={{ marginBottom: '30px' }}>
        <div className="card">
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Total Links</p>
          <h2 style={{ color: '#fff', marginTop: '5px' }}>128</h2>
        </div>
        <div className="card">
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Total Clicks</p>
          <h2 style={{ color: 'var(--primary)', marginTop: '5px' }}>45,892</h2>
        </div>
        <div className="card">
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Today Clicks</p>
          <h2 style={{ color: 'var(--accent-cyan)', marginTop: '5px' }}>823</h2>
        </div>
        <div className="card">
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>This Month</p>
          <h2 style={{ color: '#10b981', marginTop: '5px' }}>12,421</h2>
        </div>
      </div>

      {/* Click Analytics Chart Simulation */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#fff', marginBottom: '20px' }}>Click Analytics (Last 7 Days)</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px', height: '150px', paddingTop: '20px' }}>
          {[40, 65, 30, 85, 95, 75, 100].map((height, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '100%', height: `${height}%`, background: 'var(--primary)', borderRadius: '6px' }}></div>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Links Table */}
      <div className="card">
        <h3 style={{ color: '#fff', marginBottom: '15px' }}>Your Short Links</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Short Link</th>
                <th>Original URL</th>
                <th>Clicks</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id}>
                  <td style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{link.short}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{link.original}</td>
                  <td><span className="badge">{link.clicks}</span></td>
                  <td style={{ color: 'var(--text-muted)' }}>{link.created}</td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => alert(`Copied ${link.short}`)}>Copy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

