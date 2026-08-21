'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

// ضع رابط البوب أب / Direct Link الخاص بك هنا
const POPUP_AD_URL = 'https://www.profitableratecpmnetwork.com/r3b7dixnds?key=523cd437bfb3a673d9afe33c5a41a35d';

export default function FastUltraRedirect({ params }) {
  const { code } = params;
  const [destination, setDestination] = useState('');
  const [step, setStep] = useState(1);
  const [mainTimer, setMainTimer] = useState(15);
  const [subTimer1, setSubTimer1] = useState(0);
  const [subTimer2, setSubTimer2] = useState(0);
  const [step1Passed, setStep1Passed] = useState(false);
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

      // تسجيل النقرة العامة وتاريخ النقرة للإحصائيات الشهرية واليومية
      await supabase.from('urls').update({ clicks: (data.clicks || 0) + 1 }).eq('short_code', code);
      await supabase.from('click_logs').insert([{ short_code: code }]);
    }

    fetchUrl();
  }, [code]);

  // العداد الرئيسي 15 ثانية
  useEffect(() => {
    if (loading || error || mainTimer <= 0) return;
    const timer = setInterval(() => setMainTimer((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [loading, error, mainTimer]);

  // عداد الضغطة الأولى 5 ثواني
  useEffect(() => {
    if (subTimer1 <= 0) return;
    const timer = setInterval(() => {
      setSubTimer1((prev) => {
        if (prev === 1) setStep1Passed(true);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [subTimer1]);

  // عداد الضغطة الثانية 5 ثواني
  useEffect(() => {
    if (subTimer2 <= 0) return;
    const timer = setInterval(() => {
      setSubTimer2((prev) => {
        if (prev === 1) {
          if (step < 3) {
            setStep((s) => s + 1);
            setMainTimer(15);
            setStep1Passed(false);
          } else {
            window.location.href = destination;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [subTimer2, step, destination]);

  const triggerButton1 = () => {
    if (POPUP_AD_URL) window.open(POPUP_AD_URL, '_blank');
    setSubTimer1(5);
  };

  const triggerButton2 = () => {
    if (POPUP_AD_URL) window.open(POPUP_AD_URL, '_blank');
    setSubTimer2(5);
  };

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: '#ef4444' }}>الرابط غير موجود أو تم حذفه</h2>
        <a href="/" style={{ color: '#38bdf8' }}>العودة للرئيسية</a>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '650px', padding: '12px', boxSizing: 'border-box' }}>
      
      {/* شارة الهوية */}
      <div style={{
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '30px',
        margin: '10px 0'
      }}>
        <span style={{ color: '#00e5ff', fontWeight: 'bold' }}>AHM X</span>
        <span style={{ color: '#ff0055', margin: '0 8px' }}>⚡</span>
        <span style={{ color: '#ff0055', fontWeight: 'bold' }}>YOUSSEF 999</span>
      </div>

      {/* إعلان 1: علوي */}
      <div style={{ background: '#0f172a', border: '1px dashed #38bdf8', padding: '16px', textAlign: 'center', color: '#94a3b8', fontSize: '12px', marginBottom: '16px', borderRadius: '8px' }}>
       <script>
  atOptions = {
    'key' : '8824083875b75393556ad43f19ff78f5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/8824083875b75393556ad43f19ff78f5/invoke.js"></script>
 
      </div>

      {/* إعلان 2 */}
      <div style={{ background: '#0f172a', border: '1px dashed #ff0055', padding: '14px', textAlign: 'center', color: '#94a3b8', fontSize: '12px', marginBottom: '20px', borderRadius: '8px' }}>
       <script>
  atOptions = {
    'key' : 'f6a70a2e1a25a5db61444a7dd240aec2',
    'format' : 'iframe',
    'height' : 60,
    'width' : 468,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/f6a70a2e1a25a5db61444a7dd240aec2/invoke.js"></script>
 
      </div>

      {/* صندوق العداد والزر الأول */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#00e5ff' }}>
          المرحلة ({step}/3): فحص السيرفر وتجهيز الرابط
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '13px' }}>
          العداد الأساسي: <b style={{ color: '#fff', fontSize: '18px' }}>{mainTimer}</b> ثانية
        </p>

        {/* الزر الأول (في أعلى الصفحة) */}
        <button
          onClick={triggerButton1}
          disabled={subTimer1 > 0 || step1Passed}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: step1Passed ? '#10b981' : subTimer1 > 0 ? '#334155' : '#0284c7',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: step1Passed || subTimer1 > 0 ? 'default' : 'pointer',
            width: '100%',
            marginTop: '10px'
          }}
        >
          {step1Passed ? '✓ تم التحقق من الجزء الأول' : subTimer1 > 0 ? `جاري التأكيد (${subTimer1})...` : '1. اضغط هنا لتأكيد الأمان (5 ثوانٍ)'}
        </button>
      </div>

      {/* إعلان 3: في الوسط */}
      <div style={{ background: '#0f172a', border: '1px dashed #38bdf8', padding: '18px', textAlign: 'center', color: '#94a3b8', fontSize: '12px', margin: '20px 0', borderRadius: '8px' }}>
       <script>
  atOptions = {
    'key' : 'aa6845a6aa8466a93f6f0addd208ca5a',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/aa6845a6aa8466a93f6f0addd208ca5a/invoke.js"></script>
 
      </div>

      {/* فاصل مسافة إجباري لضمان نزول المستخدم وتصفح الإعلانات */}
      <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: '12px' }}>
        ↓ انزل لأسفل الصفحة للمتابعة ↓
      </div>

      {/* إعلان 4 */}
      <div style={{ background: '#0f172a', border: '1px dashed #ff0055', padding: '18px', textAlign: 'center', color: '#94a3b8', fontSize: '12px', marginBottom: '20px', borderRadius: '8px' }}>
        <script>
  atOptions = {
    'key' : 'aa6845a6aa8466a93f6f0addd208ca5a',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/aa6845a6aa8466a93f6f0addd208ca5a/invoke.js"></script>

      </div>

      {/* الصندوق السفلي والزر الثاني */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 12px 0' }}>
          {!step1Passed ? '⚠️ يجب الضغط على الزر الأول بالأعلى أولاً' : mainTimer > 0 ? `انتظر انتهاء العداد العام (${mainTimer} ثانية)` : 'الزر جاهز للمتابعة!'}
        </p>

        {/* الزر الثاني (في أسفل الصفحة) */}
        <button
          onClick={triggerButton2}
          disabled={!step1Passed || mainTimer > 0 || subTimer2 > 0}
          style={{
            padding: '14px 28px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: (!step1Passed || mainTimer > 0) ? '#1e293b' : subTimer2 > 0 ? '#334155' : step === 3 ? '#10b981' : '#ff0055',
            color: (!step1Passed || mainTimer > 0) ? '#64748b' : '#fff',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: (!step1Passed || mainTimer > 0 || subTimer2 > 0) ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {subTimer2 > 0 ? `جاري التوجيه (${subTimer2})...` : step < 3 ? `2. متابعة إلى المرحلة (${step + 1}/3) ←` : '2. فتح الرابط النهائي المباشر 🚀'}
        </button>
      </div>

      {/* إعلان 5: سفلي */}
      <div style={{ background: '#0f172a', border: '1px dashed #38bdf8', padding: '16px', textAlign: 'center', color: '#94a3b8', fontSize: '12px', margin: '20px 0', borderRadius: '8px' }}>
        <script>
  atOptions = {
    'key' : '8824083875b75393556ad43f19ff78f5',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/8824083875b75393556ad43f19ff78f5/invoke.js"></script>

      </div>

    </div>
  );
}
