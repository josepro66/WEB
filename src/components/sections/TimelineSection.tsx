import React from 'react'
import { motion } from 'framer-motion'

const TimelineSection: React.FC = () => {
  const events = [
    {
      date: 'Agosto 2025',
      title: 'Loopo Lab IA',
      description: 'Participación en el laboratorio de inteligencia artificial musical',
      location: 'Virtual',
      status: 'upcoming'
    },
    {
      date: 'Julio 2025',
      title: 'Showcase Bogotá',
      description: 'Presentación de nuestros controladores en la capital colombiana',
      location: 'Bogotá, Colombia',
      status: 'upcoming'
    },
    {
      date: 'Mayo 2025',
      title: 'Residencia Creativa',
      description: 'Luthería electrónica aplicada a las artes',
      location: 'La Plaine Images',
      status: 'upcoming'
    },
    {
      date: 'Abril 2025',
      title: 'PIX Festival',
      description: 'Participación en festival de industrias culturales',
      location: 'La Plaine Images',
      status: 'upcoming'
    },
    {
      date: 'Marzo 2025',
      title: 'Evento París',
      description: 'Diseña, construye y usa tu propio controlador MIDI',
      location: 'París, Francia',
      status: 'completed'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative py-32 px-4 overflow-visible">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-800" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl">
        {/* Section Title */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-magenta to-neon-cyan bg-clip-text text-transparent">
              Nuestra Historia
            </span>
          </h2>
          <p className="text-lg text-gray-300 font-inter">
            Eventos y hitos que marcan nuestro camino
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-lime" />

          {/* Timeline Items */}
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="relative flex items-start mb-20"
              variants={itemVariants}
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center">
                <div className={`w-4 h-4 rounded-full ${
                  event.status === 'completed' 
                    ? 'bg-neon-lime neon-glow-lime' 
                    : 'bg-neon-cyan neon-glow-cyan'
                }`} />
                <div className={`absolute inset-0 rounded-full ${
                  event.status === 'completed' 
                    ? 'bg-neon-lime opacity-20 animate-pulse' 
                    : 'bg-neon-cyan opacity-20 animate-pulse'
                }`} />
              </div>

              {/* Event Card */}
              <motion.div
                className="ml-8 flex-1 glass rounded-xl p-6 border border-white/10 hover:border-neon-cyan/50 transition-all duration-300"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-orbitron font-semibold text-white mb-2 md:mb-0">
                    {event.title}
                  </h3>
                  <span className={`text-sm font-inter px-3 py-1 rounded-full ${
                    event.status === 'completed'
                      ? 'bg-neon-lime/20 text-neon-lime border border-neon-lime/30'
                      : 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                  }`}>
                    {event.status === 'completed' ? 'Completado' : 'Próximo'}
                  </span>
                </div>
                
                <p className="text-gray-300 font-inter mb-3">
                  {event.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-400">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-inter">{event.location}</span>
                  <span className="mx-2">•</span>
                  <span className="font-orbitron text-neon-cyan">{event.date}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 glass text-white font-bold rounded-full text-lg font-orbitron border border-neon-magenta/50 hover:border-neon-magenta transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Todos los Eventos
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default TimelineSection
