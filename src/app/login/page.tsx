'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Zap, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const callbackUrl = searchParams.get('callbackUrl');
      
      // If there's a callback URL, go there. Otherwise we rely on the middleware 
      // to handle role-based redirection if we send them to /dashboard by default.
      if (callbackUrl) {
        window.location.href = callbackUrl;
      } else {
        window.location.href = '/dashboard';
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--dash-bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', 'Cairo', system-ui, sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '0 20px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, background: 'var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
          }}>
            <Zap size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dash-text)', marginBottom: 4 }}>
            Canter Dashboard
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--dash-muted)' }}>
            Sign in to manage your equestrian center
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'white', borderRadius: 16, border: '1px solid var(--dash-border)',
          padding: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: 'var(--dash-danger-bg)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 10, padding: '10px 14px', marginBottom: 20,
                fontSize: '0.85rem', color: 'var(--dash-danger)',
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--dash-text)', marginBottom: 6 }}>
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 10,
                  border: '1.5px solid var(--dash-border)', fontSize: '0.9rem',
                  background: 'white', color: 'var(--dash-text)',
                  outline: 'none', transition: 'border-color 0.15s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--dash-border)'}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--dash-text)', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '10px 42px 10px 14px', borderRadius: 10,
                    border: '1.5px solid var(--dash-border)', fontSize: '0.9rem',
                    background: 'white', color: 'var(--dash-text)', outline: 'none',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--dash-border)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dash-muted)',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px', borderRadius: 10,
                background: loading ? 'var(--primary-hover)' : 'var(--primary)',
                color: 'white', border: 'none', fontSize: '0.95rem',
                fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.15s',
              }}
            >
              {loading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.8rem', color: 'var(--dash-muted)' }}>
          Demo: <strong>admin@al-khalediah.sa</strong> / <strong>password123</strong>
        </p>
      </div>
    </div>
  );
}
