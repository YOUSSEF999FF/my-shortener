'use client';
import { useEffect, useRef } from 'react';

export function AdBanner({ adKey, width, height }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current || bannerRef.current.hasChildNodes()) return;

    const conf = document.createElement('script');
    conf.type = 'text/javascript';
    conf.innerHTML = `atOptions = {'key' : '${adKey}','format' : 'iframe','height' : ${height},'width' : ${width},'params' : {}};`;

    const invoke = document.createElement('script');
    invoke.type = 'text/javascript';
    invoke.src = `https://www.highrevenueformat.com/${adKey}/invoke.js`;

    bannerRef.current.appendChild(conf);
    bannerRef.current.appendChild(invoke);
  }, [adKey, width, height]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px auto', overflow: 'hidden' }}>
      <div ref={bannerRef} style={{ width, height }}></div>
    </div>
  );
}

export function NativeBanner() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || ref.current.querySelector('script')) return;
    const script = document.createElement('script');
    script.async = true;
    script.dataset.cfasync = 'false';
    script.src = 'https://pl30960017.profitableratecpmnetwork.com/850fecc36bce2032e437d9cb07ea7e66/invoke.js';
    ref.current.appendChild(script);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <div id="container-850fecc36bce2032e437d9cb07ea7e66" ref={ref}></div>
    </div>
  );
}

