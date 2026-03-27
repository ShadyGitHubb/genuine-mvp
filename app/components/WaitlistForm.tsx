'use client';

import { useState } from 'react';
import WaitlistSuccess from './WaitlistSuccess';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(196, 120, 74, 0.2)',
  borderRadius: '12px',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '15px',
  color: '#2D2D2D',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s ease',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '13px',
  fontWeight: 600,
  color: '#6B5E52',
  marginBottom: '6px',
};

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const formData = new FormData(e.currentTarget);
      const params = new URLSearchParams();

      formData.forEach((value, key) => {
        if (typeof value === 'string') {
          params.append(key, value);
        }
      });

      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (!res.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <WaitlistSuccess />;
  }

  const getFocusStyle = (field: string): React.CSSProperties =>
    focusedField === field ? { borderColor: '#C4784A', boxShadow: '0 0 0 3px rgba(196, 120, 74, 0.1)' } : {};

  return (
    <form
      name="waitlist"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}
    >
      <input type="hidden" name="form-name" value="waitlist" />
      <p style={{ display: 'none' }}>
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={labelStyle}>
            email <span style={{ color: '#C4784A' }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField('')}
            required
            style={{ ...inputStyle, ...getFocusStyle('email') }}
          />
        </div>

        {status === 'error' && (
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(196, 120, 74, 0.08)',
              border: '1px solid rgba(196, 120, 74, 0.2)',
              borderRadius: '10px',
              fontSize: '14px',
              color: '#C4784A',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '14px',
            fontSize: '16px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            opacity: !email ? 0.5 : 1,
            cursor: !email ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'loading' ? 'joining...' : 'join the waitlist →'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#A08C7C', fontFamily: "'DM Sans', sans-serif" }}>
          no spam. ever. we&apos;ll only email you when genUine is ready.
        </p>
      </div>
    </form>
  );
}
