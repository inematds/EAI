'use client'

import { useEffect } from 'react'

export default function VisitTracker() {
  useEffect(() => {
    let sid = localStorage.getItem('eai_sid')
    if (!sid) {
      sid = crypto.randomUUID()
      localStorage.setItem('eai_sid', sid)
    }

    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sid }),
    })
  }, [])

  return null
}
