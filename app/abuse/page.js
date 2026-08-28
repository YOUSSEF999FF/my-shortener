'use client';
import { useState } from 'react';

export default function AbuseReport() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '600px' }}>
      <div className="card">
        <h2 style={{ color: '#fff', marginBottom: '10px' }}>Report Malicious Link</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
          نحن نأخذ الأمان على محمل الجد. إذا وجدت رابطاً ينتهك السياسات أو يحتوي على برمجيات ضارة، أبلغنا فوراً.
        </p>

        {submitted ? (
          <p style={{ color: '#10b981', fontWeight: 'bold' }}>شكراً لك! تم استلام البلاغ وسنقوم بمراجعة الرابط فوراً.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="url" placeholder="Short URL (e.g. https://linkshort-pro.com/Ab7Xk)" className="input-box" required />
            <textarea placeholder="Reason for report (Spam, Malware, Phishing...)" className="input-box" style={{ height: '100px' }} required></textarea>
            <button type="submit" className="btn-primary">Submit Report</button>
          </form>
        )}
      </div>
    </div>
  );
}

