'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function MonthlyAnalytics() {
  const [monthlyStats, setMonthlyStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMonthlyData() {
      const { data } = await supabase.from('click_logs').select('created_at');
      if (data) {
        const counts = {};
        data.forEach((log) => {
          const date = new Date(log.created_at);
          const monthKey = `${date.getFullYear()} - شهر ${date.getMonth() + 1}`;
          counts[monthKey] = (counts[monthKey] || 0) + 1;
        });
        setMonthlyStats(counts);
      }
      setLoading(false);
    }
    loadMonthlyData();
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '800px', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', color: '#00e5ff' }}>سجل الزيارات الشهرية 📊</h1>
        <a href="/dashboard" style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none' }}>← العودة للوحة التحكم</a>
      </div>

      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
              <th style={{ padding: '14px' }}>السنة والشهر</th>
              <th style={{ padding: '14px' }}>إجمالي الزيارات للشهر</th>
              <th style={{ padding: '14px' }}>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(monthlyStats).length === 0 ? (
              <tr>
                <td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                  {loading ? 'جاري تجميع البيانات...' : 'لا توجد زيارات مسجلة لهذا الشهر بعد'}
                </td>
              </tr>
            ) : (
              Object.entries(monthlyStats).map(([month, count]) => (
                <tr key={month} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '14px', color: '#f8fafc', fontWeight: 'bold' }}>{month}</td>
                  <td style={{ padding: '14px', color: '#10b981', fontWeight: 'bold' }}>{count} زيارة</td>
                  <td style={{ padding: '14px', color: '#00e5ff' }}>نشط 🟢</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

