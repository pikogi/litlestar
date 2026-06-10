"use client"

import { useState } from "react"
import { ReservationsList } from "./reservations-list"

type Reservation = {
  id: string
  teacher: string
  date: string
  time_slot: string
  status: string
  parent_name: string | null
  child_name: string | null
  child_age: string | null
  created_at: string
}

export function AdminReservations({ initialReservations }: { initialReservations: Reservation[] }) {
  const [reservations, setReservations] = useState(initialReservations)

  function handleStatusChange(id: string, status: string) {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    )
  }

  return (
    <ReservationsList
      reservations={reservations}
      isAdmin
      onStatusChange={handleStatusChange}
    />
  )
}
