import { useEffect } from 'react';

export default function Redirect({ to }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: '#0e0e0e',
      color: '#f0ede8',
      fontFamily: 'monospace',
      fontSize: '14px'
    }}>
      Redirecting to {to}...
    </div>
  );
}
