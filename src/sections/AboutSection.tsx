import React from 'react'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="acerca" className="relative bg-[#0A0A1A] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            ¿Quiénes somos?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-5 text-white/75"
          >
            Creart.Tech es una fábrica y academia de tecnología musical dedicada al diseño y fabricación de
            controladores MIDI personalizados. Enseñamos a artistas a construir sus propios dispositivos y a llevar
            sus ideas del prototipado al escenario.
          </motion.p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-lg font-semibold text-white">Academia y Comunidad</h3>
            <p className="mt-2 text-white/70">Kits DIY, talleres prácticos y formación para que explores la luthería electrónica aplicada a las artes.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-lg font-semibold text-white">Fabricación Boutique</h3>
            <p className="mt-2 text-white/70">Experiencia personalizada de construcción: materiales de calidad y diseño centrado en el artista.</p>
          </div>
        </div>
      </div>
    </section>
  )
}



