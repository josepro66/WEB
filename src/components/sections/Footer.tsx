import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return
      
      const rect = footerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const deltaX = (x - centerX) / centerX
      const deltaY = (y - centerY) / centerY
      
      const glowElements = footerRef.current.querySelectorAll('.glow-effect')
      glowElements.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const links = {
    products: [
      { name: 'Beato 16', href: '/beato16info' },
      { name: 'Mixo', href: '/mixoinfo' },
      { name: 'Beato 8', href: '/beato8info' },
      { name: 'Fado', href: '/fadoinfo' },
      { name: 'Loopo', href: '/loopoinfo' },
      { name: 'Knobo', href: '/knoboinfo' }
    ],
    academy: [
      { name: 'Talleres', href: '#' },
      { name: 'Kits DIY', href: '#' },
      { name: 'Guía de Compra', href: '#' },
      { name: 'Tutoriales', href: '#' }
    ],
    company: [
      { name: 'Acerca de', href: '#' },
      { name: 'Eventos', href: '#eventos' },
      { name: 'Contacto', href: '#contacto' },
      { name: 'Blog', href: '#' }
    ],
    social: [
      { name: 'Instagram', href: '#' },
      { name: 'YouTube', href: '#' },
      { name: 'Twitter', href: '#' },
      { name: 'Discord', href: '#' }
    ]
  }

  return (
    <footer ref={footerRef} className="relative bg-dark-900 border-t border-white/10 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl glow-effect" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl glow-effect" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-lime/5 rounded-full blur-3xl glow-effect" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-orbitron font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-lime to-neon-cyan bg-clip-text text-transparent">
                CREART.TECH
              </span>
            </h3>
            <p className="text-gray-300 font-inter mb-6 max-w-md">
              Diseñamos el futuro de la música. Controladores MIDI personalizados y formación para artistas innovadores.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {links.social.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-neon-cyan hover:text-neon-lime transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-sm font-bold">{social.name[0]}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="text-lg font-orbitron font-semibold text-white mb-4">Productos</h4>
            <ul className="space-y-2">
              {links.products.map((product, index) => (
                <motion.li
                  key={product.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <a
                    href={product.href}
                    className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 font-inter"
                  >
                    {product.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Academy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-orbitron font-semibold text-white mb-4">Academia</h4>
            <ul className="space-y-2">
              {links.academy.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-neon-magenta transition-colors duration-300 font-inter"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-lg font-orbitron font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-2">
              {links.company.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-neon-lime transition-colors duration-300 font-inter"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="glass rounded-2xl p-8 mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h4 className="text-2xl font-orbitron font-bold text-white mb-4">
            Mantente al día
          </h4>
          <p className="text-gray-300 font-inter mb-6">
            Recibe las últimas noticias sobre nuestros productos y eventos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 bg-dark-800 border border-white/20 rounded-full text-white placeholder-gray-400 focus:border-neon-cyan focus:outline-none transition-colors duration-300"
            />
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-magenta text-white font-bold rounded-full font-orbitron hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Suscribirse
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-400 font-inter text-sm mb-4 md:mb-0">
            © 2025 Creart.Tech. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 font-inter">
              Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 font-inter">
              Términos
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 font-inter">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
