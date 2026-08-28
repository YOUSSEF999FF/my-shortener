'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [links] = useState([
    { id: 1, short: '/FfSKn', original: 'mediafire.com/file/...', date: 'منذ يومين' },
    { id: 2, short: '/YTv1x', original: 'youtube.com/watch?...', date: 'منذ أسبوع' }
  ]);

  return (
    <div className="container" style={{ padding: '30px 15px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
        <h1 style={{ color: '#fff', fontSize: '24px' }}>لوحة التحكم ⚙️</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>إدارة روابطك المختصرة بسرعة وسهولة.</p>
        <Link href="/" className="btn-primary" style={{ width: 'max-content' }}>+ اختصار رابط جديد</Link>
      </div>

      <h2 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>روابطي السابقة:</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {links.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>لا توجد روابط حتى الآن.</p>
        ) : (
          links.map(link => (
            <div key={link.id} className="card" style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '18px' }}>{link.short}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{link.date}</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#94a3b8', fontSize: '13px' }}>
                {link.original}
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className="btn-secondary" style={{ flex: 1, padding: '8px', fontSize: '13px' }}>نسخ</button>
                <button className="btn-secondary" style={{ flex: 1, padding: '8px', fontSize: '13px', color: '#ef4444' }}>حذف</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
