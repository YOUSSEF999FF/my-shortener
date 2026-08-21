export const metadata = {
  title: 'AHM X & YOUSSEF 999 | اختصار الروابط السريع',
  description: 'منصة احترافية وفائقة السرعة لاختصار الروابط وحمايتها',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'Segoe UI, Tahoma, sans-serif',
        backgroundColor: '#070a12',
        color: '#f1f5f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          {children}
        </div>

        {/* حقوق الموقع الثابتة في كل صفحة */}
        <footer style={{
          width: '100%',
          padding: '16px 0',
          textAlign: 'center',
          backgroundColor: '#0b0f19',
          borderTop: '1px solid #1e293b',
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#94a3b8',
          letterSpacing: '0.5px'
        }}>
          COPYRIGHT ©️ AHM X & YOUSSEF 999
        </footer>
      </body>
    </html>
  );
}

