'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Props = {
  priceId: string
}

export function FavoriteButton({ priceId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUserId(user.id)
      const { data } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('price_id', priceId)
        .single()

      setIsFavorite(!!data)
    }

    fetchStatus()
  }, [priceId])

  const toggleFavorite = async () => {
    if (!userId) {
      alert("Connecte-toi pour ajouter aux favoris.")
      return
    }

    if (isFavorite) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('price_id', priceId)
      setIsFavorite(false)
    } else {
      await supabase
        .from('favorites')
        .insert({ user_id: userId, price_id: priceId })
      setIsFavorite(true)
    }
  }

  return (
    <button onClick={toggleFavorite} className="text-xl">
      {isFavorite ? '❤️' : '🤍'}
    </button>
  )
}
