'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { CheckCircle, Clock, RefreshCw } from 'lucide-react'

type FormState = 'idle' | 'submitting' | 'success' | 'error' | 'slot_taken'

export default function BookingForm() {
  const { t } = useLanguage()
  const f = t.booking.form

  const [state, setState] = useState<FormState>('idle')
  const [selectedDate, setSelectedDate] = useState('')
  const [slots, setSlots] = useState<string[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')

  // Min date = today
  const minDate = new Date().toISOString().split('T')[0]

  const fetchSlots = useCallback(async (date: string) => {
    if (!date) return
    setSlotsLoading(true)
    setSelectedTime('')
    try {
      const res = await fetch(`/api/slots?date=${date}`)
      const data = await res.json()
      setSlots(data.slots ?? [])
    } catch {
      setSlots([])
    } finally {
      setSlotsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (selectedDate) fetchSlots(selectedDate)
    else setSlots([])
  }, [selectedDate, fetchSlots])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    setState('submitting')

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      message: formData.get('message'),
      date: selectedDate,
      time: selectedTime,
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.status === 409) {
        setState('slot_taken')
        // Refresh slots to show updated availability
        await fetchSlots(selectedDate)
      } else if (res.ok) {
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

        {/* Date — full width */}
        <div className="md:col-span-2">
          <label className="eyebrow block mb-2">{f.date}</label>
          <input
            type="date"
            name="date"
            min={minDate}
            value={selectedDate}
            onChange={e => {
              setSelectedDate(e.target.value)
              if (state === 'slot_taken') setState('idle')
            }}
            className="input-luxury md:w-1/2"
          />
        </div>

        {/* Time slot picker — full width */}
        <div className="md:col-span-2">
          <label className="eyebrow block mb-2">{f.timeSlot}</label>

          {!selectedDate && (
            <p className="text-sm text-taupe flex items-center gap-2">
              <Clock size={14} />
              {f.selectDateFirst}
            </p>
          )}

          {selectedDate && slotsLoading && (
            <p className="text-sm text-taupe flex items-center gap-2">
              <RefreshCw size={14} className="animate-spin" />
              {f.loadingSlots}
            </p>
          )}

          {selectedDate && !slotsLoading && slots.length === 0 && (
            <p className="text-sm text-taupe">{f.noSlots}</p>
          )}

          {selectedDate && !slotsLoading && slots.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {slots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    setSelectedTime(slot)
                    if (state === 'slot_taken') setState('idle')
                  }}
                  className={`px-4 py-2 text-sm tracking-widest uppercase transition-all duration-200 border ${
                    selectedTime === slot
                      ? 'bg-charcoal text-cream border-charcoal'
                      : 'bg-transparent text-charcoal border-charcoal/30 hover:border-charcoal'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
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

      {state === 'slot_taken' && (
        <p className="mt-4 text-body-sm text-amber-700 font-medium">{f.slotTaken}</p>
      )}

      {state === 'error' && (
        <p className="mt-4 text-body-sm text-red-500">{f.error}</p>
      )}

      <div className="mt-10">
        <button
          type="submit"
          disabled={state === 'submitting' || !selectedDate || !selectedTime}
          className="btn-primary w-full md:w-auto px-12 py-4 justify-center disabled:opacity-40"
        >
          {state === 'submitting' ? f.submitting : f.submit}
        </button>
      </div>
    </form>
  )
}
