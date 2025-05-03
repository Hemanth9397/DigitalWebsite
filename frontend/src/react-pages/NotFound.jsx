import React from 'react'

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', height: '100vh' }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <button onClick={() => window.location.href = '/'} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
            Go to Home
          </button>
        </div>
      );
}

export default NotFound