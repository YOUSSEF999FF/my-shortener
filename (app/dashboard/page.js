'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [todayClicks, setTodayClicks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    async function loadStats() {
      // جلب جميع الروابط
      const { data: urlsData } = await supabase.from('urls').select('*').order('created_at', { ascending: false });
      if (urlsData) {
        setLinks(urlsData);
        setTotalClicks(urlsData.reduce((acc, curr) => acc + (curr.clicks || 0), 0));
      }

      // حساب زيارات اليوم فقط (تتجدد تلقائياً كل 24 ساعة)
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const { data: todayLogs } = await supabase
        .from('click_logs')
        .select('id')
        .gte('created_at', startOfToday.toISOString());

      if (todayLogs) {
        setTodayClicks(todayLogs.length);
      }
    }

    loadStats();
  }, []);

  const deleteLink = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الرابط؟')) {
      await supabase.from('urls').delete().eq('id', id);
      setLinks(links.filter((l) => l.id !== id));
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '950px', padding: '20px', boxSizing: 'border-box' }}>
      
      {/* شريط التنقل العلوي */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '22px', color: '#00e5ff', margin: 0 }}>لوحة التحكم | Dashboard</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/dashboard/analytics" style={{ background: '#1e293b', color: '#38bdf8', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>تقرير الزيارات الشهرية 📈</a>
          <a href="/" style={{ background: '#0284c7', color: '#fff', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>اختصار جديد +</a>
        </div>
      </div>

      {/* كروت الإحصائيات مع الأسهم اليومية */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: '#0f172a', padding: '18px', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>زيارات اليوم (تتجدد يومياً)</p>
          <h2 style={{ fontSize: '26px', color: '#10b981', margin: '8px 0 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {todayClicks} <span style={{ fontSize: '18px' }}>🟢 ⬆️</span>
          </h2>
        </div>

        <div style={{ background: '#0f172a', padding: '18px', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>إجمالي النقرات الكلية</p>
          <h2 style={{ fontSize: '26px', color: '#00e5ff', margin: '8px 0 0 0' }}>{totalClicks}</h2>
        </div>

        <div style={{ background: '#0f172a', padding: '18px', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>إجمالي الروابط</p>
          <h2 style={{ fontSize: '26px', color: '#f8fafc', margin: '8px 0 0 0' }}>{links.length}</h2>
        </div>
      </div>

      {/* قسم إدارة الروابط Manage Links */}
      <h3 style={{ fontSize: '16px', color: '#f8fafc', marginBottom: '12px' }}>إدارة الروابط (Manage Links)</h3>
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
              <th style={{ padding: '12px' }}>الرابط المختصر</th>
              <th style={{ padding: '12px' }}>الرابط الأصلي</th>
              <th style={{ padding: '12px' }}>النقرات</th>
              <th style={{ padding: '12px' }}>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '12px', color: '#00e5ff', fontWeight: 'bold', direction: 'ltr', textAlign: 'right' }}>
                  /{link.short_code}
                </td>
                <td style={{ padding: '12px', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', direction: 'ltr', textAlign: 'right', color: '#94a3b8' }}>
                  {link.original_url}
                </td>
                <td style={{ padding: '12px', color: '#10b981', fontWeight: 'bold' }}>
                  {link.clicks || 0}
                </td>
                <td style={{ padding: '12px' }}>
                  <button onClick={() => deleteLink(link.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

