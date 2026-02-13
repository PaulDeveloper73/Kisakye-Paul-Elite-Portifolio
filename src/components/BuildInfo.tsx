import React, { useEffect, useState } from 'react';
Usage;
// Import and place <BuildInfo /> in your footer or admin page. Enable only for previews/staging by setting REACT_APP_SHOW_BUILD_INFO=true in the CI build step for PR previews.

type BuildInfo = {
  COMMIT?: string;
  BRANCH?: string;
  RUN_ID?: string;
  BUILT_AT?: string;
};

export default function BuildInfo() {
  const [info, setInfo] = useState<BuildInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Only render when explicitly enabled at build time
  if (process.env.REACT_APP_SHOW_BUILD_INFO !== 'true') return null;

  useEffect(() => {
    fetch('/BUILD_INFO', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        const obj: BuildInfo = {};
        text.split('\n').forEach((line) => {
          const [k, ...rest] = line.split('=');
          if (k) obj[k.trim() as keyof BuildInfo] = rest.join('=').trim();
        });
        setInfo(obj);
      })
      .catch((err) => {
        setError(String(err));
      });
  }, []);

  if (error) return <div style={{ fontSize: 12, opacity: 0.8 }}>Build info unavailable</div>;
  if (!info) return null;

  return (
    <div style={{ fontSize: 12, opacity: 0.8 }}>
      <strong>Commit</strong>: {info.COMMIT?.slice(0, 8) || 'n/a'} &nbsp;|&nbsp;
      <strong>Branch</strong>: {info.BRANCH || 'n/a'} &nbsp;|&nbsp;
      <strong>Built</strong>: {info.BUILT_AT || 'n/a'}
    </div>
  );
}
