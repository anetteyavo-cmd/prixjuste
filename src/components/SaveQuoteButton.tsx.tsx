'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type QuoteData = {
  secteur: string
  ville: string
  devis_data: any
}

export function SaveQuoteButton({ secteur, ville, devis_data }: QuoteData) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Tu dois être connecté pour sauvegarder ton devis.")
      setLoading(false)
      return
    }

    const { error } = await supabase.from('quotes').insert({
      user_id: user.id,
      secteur,
      ville,
      devis_data
    })

    if (error) {
      console.error(error)
      alert("Erreur lors de la sauvegarde")
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  return (
    <button
      onClick={handleSave}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      disabled={loading}
    >
      {loading ? "Sauvegarde..." : success ? "✅ Sauvegardé !" : "💾 Sauvegarder le devis"}
    </button>
  )
}
