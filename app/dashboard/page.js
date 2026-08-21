'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from('urls').select('*').order('created_at', { ascending: false });
      if (data) {
        setLinks(data);
        const clicks = data.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
        setTotalClicks(clicks);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '900px', padding: '24px', boxSizing: 'border-box' }}>
      
      {/* رأس الصفحة */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#38bdf8' }}>لوحة التحكم 📊</h1>
        <a href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>← العودة للرئيسية</a>
      </div>

      {/* كروت الإحصائيات */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '30px' }}>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>إجمالي الروابط</p>
          <h2 style={{ fontSize: '28px', color: '#f8fafc', margin: '8px 0 0 0' }}>{links.length}</h2>
        </div>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>إجمالي النقرات</p>
          <h2 style={{ fontSize: '28px', color: '#38bdf8', margin: '8px 0 0 0' }}>{totalClicks}</h2>
        </div>
      </div>

      {/* جدول الروابط */}
      <div style={{ background: '#1e293b', borderRadius: '12px', border: '1px solid #334155', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
              <th style={{ padding: '14px' }}>الكود</th>
              <th style={{ padding: '14px' }}>الرابط الأصلي</th>
              <th style={{ padding: '14px' }}>النقرات</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '14px', color: '#38bdf8', fontWeight: 'bold', direction: 'ltr', textAlign: 'right' }}>
                  /{link.short_code}
                </td>
                <td style={{ padding: '14px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', direction: 'ltr', textAlign: 'right', color: '#cbd5e1' }}>
                  {link.original_url}
                </td>
                <td style={{ padding: '14px', color: '#22c55e', fontWeight: 'bold' }}>
                  {link.clicks || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

