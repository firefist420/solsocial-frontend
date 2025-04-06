import { useState } from 'react'

export default function TokenChart({ tokenAddress }) {
  const [iframeError, setIframeError] = useState(false)

  if (iframeError) {
    return <div className="chart-error">Chart unavailable</div>
  }

  return (
    <div className="chart-container">
      <iframe 
        src={`https://dexscreener.com/solana/${tokenAddress}?embed=1&theme=dark`}
        width="100%"
        height="400"
        frameBorder="0"
        onError={() => setIframeError(true)}
      />
      <style jsx>{`
        .chart-error {
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1e1e1e;
          color: #fff;
          border-radius: 8px;
        }
      `}</style>
    </div>
  )
}