'use client';

import { useState } from 'react';
import WaitlistSuccess from './WaitlistSuccess';

const USER_TYPES = [
  { value: '', label: 'i am a...' },
  { value: 'job-seeker', label: 'job seeker' },
  { value: 'sales', label: 'sales / biz dev' },
  { value: 'recruiter', label: 'recruiter' },
  { value: 'founder', label: 'founder / entrepreneur' },
  { value: 'student', label: 'student' },
  { value: 'networking', label: 'just networking' },
  { value: 'other', label: 'other' },
];

const SOURCES = [
  { value: '', label: 'how did you find us? (optional)' },
  { value: 'friend', label: 'friend or colleague' },
  { value: 'linkedin', label: 'linkedin' },
  { value: 'twitter', label: 'twitter / x' },
  { value: 'search', label: 'google search' },
  { value: 'other', label: 'other' },
];

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
  const [form, setForm] = useState({
    name: '',
    email: '',
    linkedinUrl: '',
    userType: '',
    messagingStruggle: '',
    source: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'waitlist');
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('linkedinUrl', form.linkedinUrl);
      formData.append('userType', form.userType);
      formData.append('messagingStruggle', form.messagingStruggle);
      formData.append('source', form.source);

      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setErrorMsg('Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <WaitlistSuccess name={form.name} />;
  }

  const getFocusStyle = (field: string): React.CSSProperties =>
    focusedField === field ? { borderColor: '#C4784A', boxShadow: '0 0 0 3px rgba(196, 120, 74, 0.1)' } : {};

  return (
    <form name="waitlist" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
      <input type="hidden" name="form-name" value="waitlist" />
      <p style={{ display: 'none' }}>
        <label>Don&apos;t fill this out: <input name="bot-field" /></label>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Name */}
        <div>
          <label style={labelStyle}>
            your name <span style={{ color: '#C4784A' }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="first name is fine"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField('')}
            required
            style={{ ...inputStyle, ...getFocusStyle('name') }}
          />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>
            email <span style={{ color: '#C4784A' }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField('')}
            required
            style={{ ...inputStyle, ...getFocusStyle('email') }}
          />
        </div>

        {/* User type */}
        <div>
          <label style={labelStyle}>
            what brings you to genUine? <span style={{ color: '#C4784A' }}>*</span>
          </label>
          <select
            name="userType"
            value={form.userType}
            onChange={(e) => set('userType', e.target.value)}
            onFocus={() => setFocusedField('userType')}
            onBlur={() => setFocusedField('')}
            required
            style={{
              ...inputStyle,
              ...getFocusStyle('userType'),
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B5E52' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px center',
              paddingRight: '40px',
              color: form.userType ? '#2D2D2D' : '#A08C7C',
            }}
          >
            {USER_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* LinkedIn URL (optional) */}
        <div>
          <label style={labelStyle}>your linkedin (optional)</label>
          <input
            type="url"
            name="linkedinUrl"
            placeholder="linkedin.com/in/yourname"
            value={form.linkedinUrl}
            onChange={(e) => set('linkedinUrl', e.target.value)}
            onFocus={() => setFocusedField('linkedin')}
            onBlur={() => setFocusedField('')}
            style={{ ...inputStyle, ...getFocusStyle('linkedin') }}
          />
        </div>

        {/* Struggle textarea (optional) */}
        <div>
          <label style={labelStyle}>
            what&apos;s your biggest struggle with LinkedIn messages? <span style={{ color: '#A08C7C', fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea
            name="messagingStruggle"
            placeholder="e.g. I never know how to start, or it sounds too formal..."
            value={form.messagingStruggle}
            onChange={(e) => set('messagingStruggle', e.target.value)}
            onFocus={() => setFocusedField('struggle')}
            onBlur={() => setFocusedField('')}
            rows={3}
            style={{
              ...inputStyle,
              ...getFocusStyle('struggle'),
              resize: 'none',
              lineHeight: 1.6,
            }}
          />
        </div>

        {/* Source (optional) */}
        <div>
          <select
            name="source"
            value={form.source}
            onChange={(e) => set('source', e.target.value)}
            onFocus={() => setFocusedField('source')}
            onBlur={() => setFocusedField('')}
            style={{
              ...inputStyle,
              ...getFocusStyle('source'),
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B5E52' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px center',
              paddingRight: '40px',
              color: form.source ? '#2D2D2D' : '#A08C7C',
            }}
          >
            {SOURCES.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === '' && form.source !== ''}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Error */}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading' || !form.name || !form.email || !form.userType}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '14px',
            fontSize: '16px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            opacity: (!form.name || !form.email || !form.userType) ? 0.5 : 1,
            cursor: (!form.name || !form.email || !form.userType) ? 'not-allowed' : 'pointer',
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
