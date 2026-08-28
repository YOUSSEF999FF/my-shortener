'use client';
import { useEffect, useState } from 'react';
import LinkUnlocker from '../../components/LinkUnlocker';
import Script from 'next/script';

export default function RedirectPage({ params }) {
  const { slug } = params;
  const [targetUrl, setTargetUrl] = useState(null);

  useEffect(() => {
    // جلب الرابط الأصلي من التخزين (أو وضع رابط افتراضي لو لم يجده)
    const savedUrl = localStorage.getItem(`link_${slug}`);
    setTargetUrl(savedUrl || 'https://google.com'); // سيتم التعديل لاحقاً لربطه بقاعدة بيانات حقيقية
  }, [slug]);

  if (!targetUrl) return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>جاري التحميل...</div>;

  return (
    <main className="container" style={{ padding: '20px 10px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* إعلانات البوب أندر تظهر هنا فقط */}
      <Script src="https://pl30960014.profitableratecpmnetwork.com/8e/6b/6f/8e6b6fcd93c610892f0baa3619c19f6e.js" strategy="afterInteractive" />
      <Script src="https://pl30960016.profitableratecpmnetwork.com/cc/fb/c3/ccfbc3f1b91eb97a93dad4bcf4e2ad38.js" strategy="afterInteractive" />

      <LinkUnlocker targetUrl={targetUrl} />
    </main>
  );
}
