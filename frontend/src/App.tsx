import { Suspense, useState } from 'react'
import { RelayEnvironmentProvider } from 'react-relay'
import { RelayEnvironment } from './RelayEnvironment'
import Messages from './Messages'

function App() {
  const [showMessages, setShowMessages] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetchMessages = () => {
    setError(null)
    setShowMessages(true)
  }

  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>
        <h1>🌐 CORS Showcase</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
          This application demonstrates Cross-Origin Resource Sharing (CORS) between a React frontend
          and a GraphQL backend.
        </p>

        <div style={{ 
          padding: '20px', 
          background: '#e3f2fd', 
          borderRadius: '8px',
          marginTop: '20px',
          border: '1px solid #90caf9'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>🔒 CORS Status</h3>
          <p style={{ margin: '0' }}>
            The backend at <code>http://localhost:4000</code> is configured to allow requests from
            this frontend at <code>http://localhost:5173</code>.
          </p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <button
            onClick={handleFetchMessages}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Fetch Messages from Backend
          </button>
        </div>

        {error && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            background: '#ffebee',
            borderRadius: '8px',
            border: '1px solid #ef5350',
            color: '#c62828'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {showMessages && (
          <Suspense fallback={<div style={{ marginTop: '20px' }}>Loading messages...</div>}>
            <Messages />
          </Suspense>
        )}

        <div style={{ 
          marginTop: '40px', 
          padding: '20px', 
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <h3>💡 What's Happening?</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li>Frontend runs on <code>http://localhost:5173</code></li>
            <li>Backend runs on <code>http://localhost:4000</code></li>
            <li>These are different origins (different ports)</li>
            <li>The backend's CORS configuration allows this frontend to make requests</li>
            <li>Without CORS, the browser would block the request</li>
          </ol>
        </div>
      </div>
    </RelayEnvironmentProvider>
  )
}

export default App
