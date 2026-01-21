import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import type { MessagesQuery as MessagesQueryType } from './__generated__/MessagesQuery.graphql'

const MessagesQuery = graphql`
  query MessagesQuery {
    messages {
      id
      text
      timestamp
    }
  }
`

export default function Messages() {
  const data = useLazyLoadQuery<MessagesQueryType>(MessagesQuery, {})

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Messages from Backend</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.messages.map((message) => (
          <div
            key={message.id}
            style={{
              padding: '15px',
              background: '#f0f0f0',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {message.text}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {new Date(message.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
