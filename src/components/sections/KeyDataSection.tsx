import React from 'react'
import { motion } from 'framer-motion'

const KeyDataSection: React.FC = () => {
  const keyData = [
    {
      number: '6',
      label: 'Modelos Únicos',
      description: 'Controladores MIDI personalizados',
      color: 'from-neon-lime to-neon-cyan'
    },
    {
      number: '250+',
      label: 'Artistas',
      description: 'Han confiado en nosotros',
      color: 'from-neon-magenta to-neon-purple'
    },
    {
      number: '15+',
      label: 'Eventos',
      description: 'En 2025',
      color: 'from-neon-cyan to-neon-lime'
    },
    {
      number: '100%',
      label: 'DIY',
      description: 'Kits de construcción',
      color: 'from-neon-purple to-neon-magenta'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800 to-dark-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto w-full max-w-7xl px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-4 break-words">
            <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
              En Números
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-inter max-w-2xl mx-auto">
            Nuestro impacto en la comunidad musical y tecnológica
          </p>
        </motion.div>

        {/* Key Data Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {keyData.map((data, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
            >
              {/* Card */}
              <div className="glass rounded-2xl p-8 text-center h-full hover:scale-105 transition-all duration-300 border border-white/10 hover:border-neon-cyan/50">
                {/* Number */}
                <motion.div
                  className={`text-5xl md:text-6xl font-orbitron font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent mb-4`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {data.number}
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-orbitron font-semibold text-white mb-2">
                  {data.label}
                </h3>

                {/* Description */}
                <p className="text-gray-400 font-inter text-sm">
                  {data.description}
                </p>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${data.color} opacity-10 blur-xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-neon-lime to-neon-cyan text-black font-bold rounded-full text-lg font-orbitron hover:scale-105 transition-all duration-300 neon-glow-lime"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Únete a la Revolución
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default KeyDataSection
