'use client';

import { useState } from 'react';
import Confetti from './Confetti';

export default function WaitlistSuccess() {
  const [copied, setCopied] = useState(false);

  const shareText = `just joined the waitlist for genUine — an AI that writes LinkedIn messages in your actual voice. worth checking out: https://genuine.so/waitlist`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <Confetti />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '48px 24px',
          animation: 'fadeInUp 0.5s ease both',
        }}
      >
        {/* Checkmark */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: 'rgba(196, 120, 74, 0.1)',
            border: '2px solid rgba(196, 120, 74, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C4784A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: 'checkDraw 0.6s ease both 0.2s' }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 800,
            color: '#2D2D2D',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
          }}
        >
          you&apos;re in!
        </h2>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '16px',
            color: '#6B5E52',
            lineHeight: 1.6,
            maxWidth: '360px',
            marginBottom: '32px',
          }}
        >
          we&apos;ll let you know the moment genUine is ready for you. you&apos;re early — that matters.
        </p>

        <div
          style={{
            backgroundColor: 'rgba(196, 120, 74, 0.06)',
            border: '1px solid rgba(196, 120, 74, 0.15)',
            borderRadius: '16px',
            padding: '20px 24px',
            maxWidth: '400px',
            marginBottom: '24px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#A08C7C', marginBottom: '12px', fontWeight: 500 }}>
            know someone who struggles with LinkedIn messages?
          </p>
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto',
              padding: '10px 20px',
              backgroundColor: copied ? 'rgba(196, 120, 74, 0.15)' : '#FFFFFF',
              border: '1px solid rgba(196, 120, 74, 0.25)',
              borderRadius: '10px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              color: '#C4784A',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                share the link
              </>
            )}
          </button>
        </div>

        <style>{`
          @keyframes checkDraw {
            from { stroke-dasharray: 30; stroke-dashoffset: 30; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </>
  );
}
