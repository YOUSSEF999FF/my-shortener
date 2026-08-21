'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

// ضع رابط الـ Direct Link أو Pop-up الخاص بك هنا (من Adsterra أو Monetag)
const POPUP_AD_URL = 'https://www.google.com'; 

export default function GamingSafeRedirect({ params }) {
  const { code } = params;
  const [destination, setDestination] = useState('');
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(6);
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

  // دالة فتح إعلان البوب أب والانتقال للخطوة التالية
  const handleStepWithPopup = () => {
    if (timeLeft > 0) return;

    // فتح صفحة الإعلان في تبويب جديد (Pop-up/Direct Link)
    if (POPUP_AD_URL && POPUP_AD_URL !== '') {
      window.open(POPUP_AD_URL, '_blank');
    }

    // الانتقال للخطوة التالية
    setStep((prev) => prev + 1);
    setTimeLeft(6);
  };

  // دالة فتح الإعلان عند نقر الزر النهائي
  const handleFinalClick = () => {
    if (POPUP_AD_URL && POPUP_AD_URL !== '') {
      window.open(POPUP_AD_URL, '_blank');
    }
  };

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', background: '#0a0d14', color: '#ff4b4b', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '32px', textShadow: '0 0 10px #ff4b4b' }}>404 - الرابط غير صالح!</h1>
        <p style={{ color: '#94a3b8' }}>ربما تم حذف هذا الرابط أو انتهت صلاحيته.</p>
        <a href="/" style={{ color: '#00f0ff', textDecoration: 'none', border: '1px solid #00f0ff', padding: '10px 24px', borderRadius: '8px', marginTop: '20px' }}>العودة للرئيسية</a>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#07090e',
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.12) 0%, transparent 60%)',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      boxSizing: 'border-box'
    }}>

      {/* شارة الهيدر الجيمنج (AHM X & YOUSSEF 999) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        margin: '12px 0 20px 0',
        padding: '10px 24px',
        background: 'linear-gradient(135deg, rgba(255, 0, 85, 0.15), rgba(0, 240, 255, 0.15))',
        border: '1px solid rgba(0, 240, 255, 0.4)',
        borderRadius: '50px',
        boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
      }}>
        <span style={{ fontWeight: '900', fontSize: '17px', color: '#00f0ff', letterSpacing: '1px', textShadow: '0 0 12px #00f0ff' }}>AHM X</span>
        <span style={{ color: '#ff0055', fontWeight: 'bold' }}>⚡</span>
        <span style={{ fontWeight: '900', fontSize: '17px', color: '#ff0055', letterSpacing: '1px', textShadow: '0 0 12px #ff0055' }}>YOUSSEF 999</span>
      </div>

      {/* مساحة إعلانية 1: علوية رئيسية */}
      <div style={{
        width: '100%',
        maxWidth: '728px',
        minHeight: '75px',
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px dashed #00f0ff',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#00f0ff',
        fontSize: '12px',
        marginBottom: '16px'
      }}>
        [ إعلان 1: Top Leaderboard 728x90 ]
      </div>

      {/* مساحة إعلانية 2: شريط فرعي */}
      <div style={{
        width: '100%',
        maxWidth: '728px',
        minHeight: '50px',
        background: 'rgba(15, 23, 42, 0.5)',
        border: '1px dashed #ff0055',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ff0055',
        fontSize: '12px',
        marginBottom: '20px'
      }}>
        [ إعلان 2: Banner 468x60 / Social Bar ]
      </div>

      {/* الحاوية الأساسية للعبة والتخطي */}
      <div style={{
        width: '100%',
        maxWidth: '600px',
        background: 'linear-gradient(180deg, #0d121f 0%, #080b14 100%)',
        borderRadius: '20px',
        padding: '28px 20px',
        border: '1px solid #1e293b',
        boxShadow: '0 0 35px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(0, 240, 255, 0.05)',
        textAlign: 'center',
        position: 'relative'
      }}>

        {/* شريط مستويات التقدم (Step Indicators) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{
              flex: 1,
              height: '6px',
              borderRadius: '4px',
              background: step >= s ? (step === 3 ? '#10b981' : '#00f0ff') : '#1e293b',
              boxShadow: step >= s ? '0 0 10px #00f0ff' : 'none',
              transition: '0.4s'
            }} />
          ))}
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>
          {step === 1 && '🎮 المرحلة 1: جاري التحقق من أمان الخادم...'}
          {step === 2 && '⚡ المرحلة 2: جاري فك تشفير البيانات...'}
          {step === 3 && '🔥 المرحلة 3: تم تجهيز الرابط بنجاح!'}
        </h2>
        
        <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>
          انتظر انتهاء العد التنازلي لفتح بوابة النقل
        </p>

        {/* مساحة إعلانية 3: في قلب الصندوق */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px dashed #334155',
          borderRadius: '10px',
          padding: '20px',
          color: '#64748b',
          fontSize: '12px',
          margin: '0 auto 20px auto'
        }}>
          [ إعلان 3: داخل الصندوق Native / 300x250 ]
        </div>

        {/* دائرة العداد الجيمنج المضيئة */}
        <div style={{
          width: '75px',
          height: '75px',
          borderRadius: '50%',
          border: '3px solid #00f0ff',
          boxShadow: '0 0 15px #00f0ff, inset 0 0 15px rgba(0, 240, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
          fontSize: '26px',
          fontWeight: '900',
          color: '#00f0ff'
        }}>
          {timeLeft > 0 ? timeLeft : '✓'}
        </div>

        {/* أزرار التحويل الذكية مع Pop-up */}
        {step < 3 ? (
          <button
            onClick={handleStepWithPopup}
            disabled={timeLeft > 0}
            style={{
              padding: '16px 28px',
              borderRadius: '12px',
              border: 'none',
              background: timeLeft > 0 
                ? '#1e293b' 
                : 'linear-gradient(90deg, #00f0ff, #0070f3)',
              color: timeLeft > 0 ? '#64748b' : '#000000',
              fontSize: '16px',
              fontWeight: '900',
              letterSpacing: '0.5px',
              cursor: timeLeft > 0 ? 'not-allowed' : 'pointer',
              boxShadow: timeLeft > 0 ? 'none' : '0 0 25px rgba(0, 240, 255, 0.5)',
              width: '100%',
              maxWidth: '340px',
              transition: '0.3s'
            }}
          >
            {timeLeft > 0 ? `انتظر (${timeLeft}) ثوانٍ...` : `المتابعة للمرحلة (${step + 1}/3) ❯`}
          </button>
        ) : (
          <a
            href={timeLeft > 0 ? '#' : destination}
            onClick={handleFinalClick}
            style={{
              display: 'inline-block',
              padding: '16px 28px',
              borderRadius: '12px',
              background: timeLeft > 0 
                ? '#1e293b' 
                : 'linear-gradient(90deg, #10b981, #059669)',
              color: timeLeft > 0 ? '#64748b' : '#ffffff',
              fontSize: '17px',
              fontWeight: '900',
              textDecoration: 'none',
              boxShadow: timeLeft > 0 ? 'none' : '0 0 25px rgba(16, 185, 129, 0.5)',
              width: '100%',
              maxWidth: '340px',
              boxSizing: 'border-box',
              cursor: timeLeft > 0 ? 'not-allowed' : 'pointer',
              transition: '0.3s'
            }}
          >
            {timeLeft > 0 ? `انتظر (${timeLeft}) ثوانٍ...` : 'انتقل إلى الرابط المباشر 🚀'}
          </a>
        )}
      </div>

      {/* مساحة إعلانية 4: أسفل الصندوق */}
      <div style={{
        width: '100%',
        maxWidth: '600px',
        minHeight: '90px',
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px dashed #00f0ff',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#00f0ff',
        fontSize: '12px',
        marginTop: '20px'
      }}>
        [ إعلان 4: Banner 300x250 / Native Widget ]
      </div>

      {/* مساحة إعلانية 5: أسفل الصفحة بالكامل */}
      <div style={{
        width: '100%',
        maxWidth: '728px',
        minHeight: '75px',
        background: 'rgba(15, 23, 42, 0.5)',
        border: '1px dashed #ff0055',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ff0055',
        fontSize: '12px',
        marginTop: '16px',
        marginBottom: '30px'
      }}>
        [ إعلان 5: Footer Sticky Banner 728x90 ]
      </div>

    </div>
  );
}
