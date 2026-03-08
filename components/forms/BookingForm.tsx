'use client'

import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { CheckCircle } from 'lucide-react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function BookingForm() {
  const { t } = useLanguage()
  const f = t.booking.form
  const [state, setState] = useState<FormState>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')

    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setState('success')
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle size={40} className="text-gold" />
        <p className="font-serif text-2xl text-charcoal">{f.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        {/* First name */}
        <div>
          <label className="eyebrow block mb-2">{f.firstName}</label>
          <input
            type="text"
            name="firstName"
            required
            className="input-luxury"
            placeholder={f.firstName}
          />
        </div>

        {/* Last name */}
        <div>
          <label className="eyebrow block mb-2">{f.lastName}</label>
          <input
            type="text"
            name="lastName"
            required
            className="input-luxury"
            placeholder={f.lastName}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="eyebrow block mb-2">{f.phone}</label>
          <input
            type="tel"
            name="phone"
            required
            className="input-luxury"
            placeholder={f.phone}
            dir="ltr"
          />
        </div>

        {/* Email */}
        <div>
          <label className="eyebrow block mb-2">{f.email}</label>
          <input
            type="email"
            name="email"
            className="input-luxury"
            placeholder={f.email}
            dir="ltr"
          />
        </div>

        {/* Date */}
        <div>
          <label className="eyebrow block mb-2">{f.date}</label>
          <input
            type="date"
            name="date"
            className="input-luxury"
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="eyebrow block mb-2">{f.message}</label>
          <textarea
            name="message"
            rows={4}
            className="input-luxury"
            placeholder={f.message}
          />
        </div>
      </div>

      {state === 'error' && (
        <p className="mt-4 text-body-sm text-red-500">{f.error}</p>
      )}

      <div className="mt-10">
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="btn-primary w-full md:w-auto px-12 py-4 justify-center disabled:opacity-60"
        >
          {state === 'submitting' ? f.submitting : f.submit}
        </button>
      </div>
    </form>
  )
}
