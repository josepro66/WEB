import React from 'react'
import { motion } from 'framer-motion'

const items = [
  { title: 'Knobo', desc: '8 perillas asignables para un control preciso y creativo.' },
  { title: 'LOOPO', desc: 'Dinámico, compacto y listo para la acción.' },
  { title: 'Beato 16', desc: 'Más control que nunca para directo y estudio.' },
]

export default function ProductShowcase() {
  return (
    <section id="productos" className="relative bg-[#0A0A1A] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Productos</h2>
          <p className="mt-2 text-white/70">Tarjetas con animación al hacer scroll y hover interactivo.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ rotateX: 6, rotateY: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <div className="absolute -inset-20 -z-10 bg-gradient-to-tr from-cyan-500/10 to-fuchsia-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="text-lg font-semibold text-white">{it.title}</h3>
              <p className="mt-2 text-sm text-white/70">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



