import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'موقع اختصار الروابط',
  description: 'أفضل موقع لاختصار الروابط',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {children}
        
        {/* إعلان البوب أندر */}
        <Script strategy="afterInteractive" src="https://pl30960014.profitableratecpmnetwork.com/8e/6b/6f/8e6b6fcd93c610892f0baa3619c19f6e.js" />
        
        {/* إعلان السوشيال بار */}
        <Script strategy="afterInteractive" src="https://pl30960016.profitableratecpmnetwork.com/cc/fb/c3/ccfbc3f1b91eb97a93dad4bcf4e2ad38.js" />
      </body>
    </html>
  );
}
