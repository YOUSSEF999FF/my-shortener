'use client';
import { useState, useEffect } from 'react';
import { AdBanner, NativeBanner } from './Ads';

export default function LinkUnlocker({ targetUrl }) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [step, setStep] = useState(1);
  const [isTabActive, setIsTabActive] = useState(true);
  const smartLink = "https://www.profitableratecpmnetwork.com/bwtiw9hz?key=232a4b02b4abb142d117a8ba3477a2fd";

  useEffect(() => {
    const handleVisibility = () => setIsTabActive(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    if (!isTabActive || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isTabActive]);

  const progress = Math.min(100, Math.round(((10 - timeLeft) / 10) * 100));

  const handleNextStep = () => {
    window.open(smartLink, '_blank');
    setStep(2);
  };

  return (
    <div className="card" style={{ textAlign: 'center', maxWidth: '650px', margin: '40px auto' }}>
      <h3 style={{ color: '#fff', marginBottom: '10px' }}>جاري فتح الرابط المحمي</h3>
      
      {!isTabActive && <p style={{ color: '#ef4444', fontSize: '14px' }}>⚠️ توقف العداد تلقائياً! الرجاء العودة للصفحة لاستكمال العداد.</p>}

      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', margin: '15px 0' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'var(--primary)', transition: 'width 0.3s' }}></div>
      </div>

      <AdBanner adKey="aa6845a6aa8466a93f6f0addd208ca5a" width={300} height={250} />

      <div style={{ marginTop: '20px' }}>
        {timeLeft > 0 ? (
          <button className="btn-primary" disabled style={{ width: '100%' }}>
            انتظر {timeLeft} ثانية...
          </button>
        ) : step === 1 ? (
          <button className="btn-primary" onClick={handleNextStep} style={{ width: '100%' }}>
            الاستمرار للخطوة التالية 🚀
          </button>
        ) : (
          <a href={targetUrl || "#"} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
            الذهاب للرابط الأصلي 🔗
          </a>
        )}
      </div>

      <NativeBanner />
    </div>
  );
}

