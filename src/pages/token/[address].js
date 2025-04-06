import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import ErrorComponent from '../../components/UI/ErrorComponent'
import SkeletonLoader from '../../components/UI/SkeletonLoader'

const TokenHeader = dynamic(() => import('../../components/Token/TokenHeader'));
const TokenChart = dynamic(() => import('../../components/Token/TokenChart'));
const TokenInfo = dynamic(() => import('../../components/Token/TokenInfo'));
const TokenSocial = dynamic(() => import('../../components/Token/TokenSocial'));
const PostFeed = dynamic(() => import('../../components/Feed/PostFeed'));

export default function TokenPage() {
  const router = useRouter()
  const { address } = router.query
  const [tokenData, setTokenData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (address) {
      if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
        setError('Invalid token address');
        setLoading(false);
        return;
      }
      fetchTokenData()
    }
  }, [address])

  const fetchTokenData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tokens/${address}`)
      if (!response.ok) throw new Error('Failed to fetch token data');
      const data = await response.json()
      setTokenData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <SkeletonLoader count={5} />
  if (error) return <ErrorComponent message={error} />
  if (!tokenData) return <ErrorComponent message="Token not found" />

  return (
    <div className="token-page">
      <TokenHeader token={tokenData} />
      
      <div className="token-layout">
        <div className="token-main">
          <TokenChart tokenAddress={tokenData.contract_address} />
          <PostFeed tokenAddress={address} />
        </div>
        
        <div className="token-sidebar">
          <TokenInfo token={tokenData} />
          <TokenSocial token={tokenData} />
        </div>
      </div>

      <style jsx>{`
        .token-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }
        .token-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }
        @media (max-width: 768px) {
          .token-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}