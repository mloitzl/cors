import { useLazyLoadQuery } from 'react-relay'
import MessagesQueryNode from './__generated__/MessagesQuery.graphql'
import type { MessagesQuery as MessagesQueryType } from './__generated__/MessagesQuery.graphql'

export default function Messages() {
  const data = useLazyLoadQuery<MessagesQueryType>(MessagesQueryNode, {})

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
