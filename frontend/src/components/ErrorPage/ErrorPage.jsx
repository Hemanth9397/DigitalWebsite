import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();

   return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}>
      <h1>Oops! Something went wrong.</h1>
      <p>{error.statusText || error.message || 'Unknown error occurred.'}</p>

      {error.status && (
        <p>
          <strong>Status:</strong> {error.status}
        </p>
      )}

      {error.data && (
        <pre>
          <code>{JSON.stringify(error.data, null, 2)}</code>
        </pre>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>
            Try Again
          </button>
          <button onClick={() => window.location.href = '/'} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
            Go to Home
          </button>
          </div>
    </div>

  );
}


export default ErrorPage