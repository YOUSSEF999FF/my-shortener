'use client';

export default function QRCodeGenerator({ url }) {
  if (!url) return null;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}&color=6366f1&bgcolor=0f172a`;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', padding: '15px', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '10px' }}>كود QR الخاص برابطك:</p>
      <img src={qrUrl} alt="Link QR Code" style={{ borderRadius: '8px' }} />
      <br />
      <a href={qrUrl} download="qrcode.png" target="_blank" className="btn-secondary" style={{ display: 'inline-block', marginTop: '10px', fontSize: '12px', padding: '6px 14px' }}>
        تنزيل كود QR
      </a>
    </div>
  );
}

