import { createContext, useContext, useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const wallet = useWallet()
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      fetchUserProfile(wallet.publicKey.toString())
    } else {
      setUserProfile(null)
      setLoading(false)
    }
  }, [wallet.connected, wallet.publicKey])

  const fetchUserProfile = async (publicKey) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/users/${publicKey}`)
      const data = await response.json()
      setUserProfile(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ wallet, userProfile, loading, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}