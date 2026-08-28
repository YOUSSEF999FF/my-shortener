'use client';
import { useState, useEffect } from 'react';
import { AdBanner, NativeBanner } from './Ads';

export default function LinkUnlocker({ targetUrl }) {
  const [step, setStep] = useState(1);
  const [buttonState, setButtonState] = useState(1); // 1 = waiting btn 1, 2 = clicked btn 1/waiting btn 2, 3 = ready for next step
  const [timeLeft, setTimeLeft] = useState(10);
  const [vpnDetected, setVpnDetected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // مقالات فري فاير للـ 5 خطوات
  const content = [
    {
      title: "أسرار احتراف فري فاير وتجهيز حسابك",
      text: "لعبة فري فاير ليست مجرد لعبة إطلاق نار عادية، بل هي عالم متكامل يعتمد على الذكاء وسرعة البديهة. لكي تجعل حسابك يبدو احترافياً (نظيفاً) أمام أصدقائك، يجب عليك الاهتمام بتنسيق السكنات والملف الشخصي. اللاعب المحترف يُعرف من شكل حسابه قبل حتى أن يبدأ الجيم!"
    },
    {
      title: "استراتيجيات الهبوط الذكي في الخرائط",
      text: "السر الأول للوصول لرانك الهيرو هو اختيار مكان الهبوط. تجنب مناطق الزحام في بداية الجيم إذا كنت تلعب رانك، وركز على جمع اللوت بسرعة. تكتيك التمركز على أطراف الزون يمنحك أفضلية كشف الأعداء دون أن تكون محاصراً من كل الاتجاهات."
    },
    {
      title: "قليتشات فري فاير: لصناعة محتوى مبهر",
      text: "الكثير من صناع المحتوى يستخدمون قليتشات بصرية بسيطة لعمل لقطات سينمائية ومونتاج أسطوري. استغلال هذه الحركات بيخلي فيديوهاتك خرافية وحسابك بيطلع بشكل مرعب وأنيق. فكرة دمج السكنات بتعطي طابع خاص بيك بيميزك عن أي لاعب تاني."
    },
    {
      title: "كيف تحترف الهيدشوت بسهولة؟",
      text: "سر الهيدشوت يكمن في إعدادات الحساسية (Sensitivity) وسرعة رفع زر الضرب للأعلى (Drag). تأكد من إغلاق المساعد التلقائي في بعض المواقف لتتحكم في مسار الطلق. اللعب بـ 3 أو 4 أصابع يعطيك مرونة خيالية في الحركة ووضع الثلج بسرعة."
    },
    {
      title: "الخطوة الأخيرة: اللعب النظيف وأمان حسابك",
      text: "أهم نصيحة هي الابتعاد عن الهاكات والملفات غير الموثوقة التي قد تؤدي لتبنيد حسابك الذي تعبت عليه. العب بمهارتك، طور من نفسك، واجعل اسمك معروفاً بين أصدقائك باللعب النظيف والمهارة العالية."
    }
  ];

  // فحص الـ VPN عند فتح الصفحة
  useEffect(() => {
    const checkVpn = async () => {
      try {
        const res = await fetch('https://ipwho.is/');
        const data = await res.json();
        if (data.security && (data.security.vpn || data.security.proxy || data.security.tor)) {
          setVpnDetected(true);
        }
      } catch (e) {
        console.error("VPN Check Error");
      }
      setIsLoading(false);
    };
    checkVpn();
  }, []);

  // نظام العداد
  useEffect(() => {
    if (vpnDetected || isLoading || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, vpnDetected, isLoading]);

  const handleFirstButtonClick = () => {
    setButtonState(2);
    setTimeLeft(10); // إعادة العداد لـ 10 ثواني للزر الثاني
  };

  const handleSecondButtonClick = () => {
    if (step < 5) {
      setStep(step + 1);
      setButtonState(1);
      setTimeLeft(10);
      window.scrollTo(0, 0); // رفع الشاشة لأعلى مع الصفحة الجديدة
    } else {
      // توجيه للرابط النهائي
      window.location.href = targetUrl;
    }
  };

  if (isLoading) return <div style={{ textAlign: 'center', color: '#fff', padding: '50px' }}>جاري التحقق من أمان الاتصال...</div>;

  if (vpnDetected) {
    return (
      <div className="card" style={{ textAlign: 'center', borderColor: '#ef4444', maxWidth: '500px', margin: 'auto' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '15px' }}>🚫 تم حظر الوصول</h2>
        <p style={{ color: 'var(--text-muted)' }}>عفواً، لا يمكن الوصول للرابط أثناء استخدام برامج VPN أو Proxy. يرجى إيقافه وإعادة تحميل الصفحة.</p>
      </div>
    );
  }

  const currentContent = content[step - 1];

  return (
    <div className="card" style={{ maxWidth: '700px', width: '100%', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
        <span>الخطوة {step} من 5</span>
        <span>جاري تجهيز الرابط...</span>
      </div>

      <h2 style={{ color: 'var(--primary)', marginBottom: '15px', fontSize: '22px' }}>{currentContent.title}</h2>
      <p style={{ color: '#fff', fontSize: '15px', lineHeight: '1.8', marginBottom: '30px' }}>{currentContent.text}</p>

      {/* الإعلان العلوي */}
      <AdBanner adKey="aa6845a6aa8466a93f6f0addd208ca5a" width={300} height={250} />

      <div style={{ margin: '30px 0', textAlign: 'center' }}>
        
        {/* الزر الأول */}
        {buttonState === 1 && (
          timeLeft > 0 ? (
            <button className="btn-secondary" disabled style={{ width: '100%', opacity: 0.7 }}>
              الرجاء الانتظار ({timeLeft}) ثانية للحصول على الزر الأول...
            </button>
          ) : (
            <button className="btn-primary" onClick={handleFirstButtonClick} style={{ width: '100%' }}>
              اضغط هنا للاستمرار (الخطوة 1/2)
            </button>
          )
        )}

        {/* الزر الثاني */}
        {buttonState === 2 && (
          timeLeft > 0 ? (
            <button className="btn-secondary" disabled style={{ width: '100%', opacity: 0.7 }}>
              ممتاز! انتظر ({timeLeft}) ثانية للزر النهائي...
            </button>
          ) : (
            <button className="btn-primary" onClick={handleSecondButtonClick} style={{ width: '100%' }}>
              {step === 5 ? '🚀 انتقال إلى الرابط النهائي' : 'الانتقال للصفحة التالية ➔'}
            </button>
          )
        )}

      </div>

      {/* الإعلان السفلي */}
      <NativeBanner />
    </div>
  );
}
