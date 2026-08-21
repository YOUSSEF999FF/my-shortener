'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function SafeTimerRedirect({ params }) {
  const { code } = params;
  const [destination, setDestination] = useState('');
  const [timeLeft, setTimeLeft] = useState(8); // مدة الانتظار بالثواني
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUrl() {
      const { data, error } = await supabase
        .from('urls')
        .select('original_url, clicks')
        .eq('short_code', code)
        .single();

      if (error || !data) {
        setError(true);
        setLoading(false);
        return;
      }

      setDestination(data.original_url);
      setLoading(false);

      // زيادة عداد النقرات
      await supabase
        .from('urls')
        .update({ clicks: (data.clicks || 0) + 1 })
        .eq('short_code', code);
    }

    fetchUrl();
  }, [code]);

  useEffect(() => {
    if (loading || error || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, error, timeLeft]);

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ color: '#f87171' }}>عذراً، الرابط غير موجود أو تم حذفه!</h2>
        <a href="/" style={{ color: '#38bdf8', marginTop: '16px', display: 'inline-block' }}>العودة للرئيسية</a>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '650px', padding: '20px', boxSizing: 'border-box' }}>
      
      {/* مساحة إعلانية علوية */}
      <div style={{
        background: '#1e293b',
        border: '1px dashed #475569',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '13px',
        marginBottom: '20px'
      }}>
        [ مساحة إعلانية علوية - AdSense Banner ]
      </div>

      {/* صندوق العداد وتجهيز الرابط */}
      <div style={{
        background: '#1e293b',
        borderRadius: '16px',
        padding: '30px 20px',
        textAlign: 'center',
        border: '1px solid #334155',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)'
      }}>
        <h2 style={{ fontSize: '22px', color: '#f8fafc', marginBottom: '8px' }}>
          جاري تجهيز الرابط الخاص بك...
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
          يرجى الانتظار بضع ثوانٍ لحين التحقق من أمان الرابط
        </p>

        {/* دائرة العداد */}
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          border: '4px solid #38bdf8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#38bdf8'
        }}>
          {timeLeft > 0 ? timeLeft : '✓'}
        </div>

        {/* زر التوجه للرابط */}
        {timeLeft > 0 ? (
          <button
            disabled
            style={{
              padding: '14px 28px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#334155',
              color: '#94a3b8',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'not-allowed',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            يرجى الانتظار ({timeLeft})...
          </button>
        ) : (
          <a
            href={destination}
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              borderRadius: '10px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none',
              width: '100%',
              maxWidth: '300px',
              boxSizing: 'border-box'
            }}
          >
            الانتقال إلى الرابط الآن 🚀
          </a>
        )}
      </div>

      {/* مساحة إعلانية سفلية */}
      <div style={{
        background: '#1e293b',
        border: '1px dashed #475569',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '13px',
        marginTop: '20px'
      }}>
        [ مساحة إعلانية سفلية - AdSense Banner ]
      </div>

    </div>
  );
}
