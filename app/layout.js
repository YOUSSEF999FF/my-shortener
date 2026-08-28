import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'LINKSHORT-PRO | Shorten Links. Grow Your Reach.',
  description: 'Create short, powerful and trackable links in seconds.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Navbar />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />

        {/* Adsterra Background Ad Scripts */}
        <Script src="https://pl30960014.profitableratecpmnetwork.com/8e/6b/6f/8e6b6fcd93c610892f0baa3619c19f6e.js" strategy="afterInteractive" />
        <Script src="https://pl30960016.profitableratecpmnetwork.com/cc/fb/c3/ccfbc3f1b91eb97a93dad4bcf4e2ad38.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

