import React from 'react'
import { motion } from 'framer-motion'

const events = [
  { title: 'Loopo Lab IA', date: '6 de agosto, 2025', place: '', },
  { title: 'Showcase Creart.Tech — Bogotá', date: '26 de julio, 2025', place: 'Bogotá', },
  { title: 'Residencia en luthería electrónica', date: '30 de mayo, 2025', place: '', },
  { title: 'PIX — Festival cultural', date: '2 de abril, 2025', place: 'La Plaine Images', },
  { title: 'París — DIY MIDI controllers', date: '29 de marzo, 2025', place: 'París', },
]

export default function EventsSection() {
  return (
    <section id="eventos" className="relative bg-[#0A0A1A] py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-48 w-px bg-gradient-to-b from-fuchsia-400/60 via-cyan-400/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Eventos y experiencias</h2>
          <p className="mt-2 text-white/70">Participación en showcases, residencias y festivales internacionales.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <div className="pointer-events-none absolute -inset-20 -z-10 bg-gradient-to-tr from-cyan-500/10 to-fuchsia-500/10 blur-2xl" />
              <h3 className="text-lg font-semibold text-white">{e.title}</h3>
              <p className="mt-2 text-white/70">{e.date}{e.place ? ` — ${e.place}` : ''}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



