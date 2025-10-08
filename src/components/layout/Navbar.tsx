import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type NavItem = {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Productos', href: '#productos' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Acerca de', href: '#acerca' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [active, setActive] = useState<string>('Inicio')
  const [open, setOpen] = useState<boolean>(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md shadow-[0_0_30px_rgba(0,245,255,0.12)]">
          <a href="#inicio" className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_3px_rgba(0,245,255,0.7)]" />
            <span className="text-sm font-semibold tracking-widest text-white/90">Creart.Tech</span>
          </a>

          <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setActive(item.label)}
                className="relative text-sm text-white/80 transition-colors hover:text-white"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
                {active === item.label && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] rounded bg-cyan-400 shadow-[0_0_10px_2px_rgba(0,245,255,0.6)]"
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Botón hamburguesa (móvil) */}
          <button
            aria-label="Abrir menú"
            aria-expanded={open}
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Drawer móvil */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.button
              key="overlay"
              aria-label="Cerrar menú"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Panel lateral */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25 }}
              className="fixed right-0 top-0 z-50 h-full w-72 border-l border-white/10 bg-[#0B0B16]/95 p-6 backdrop-blur-xl md:hidden"
              onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
              role="dialog"
              aria-modal="true"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-semibold tracking-widest text-white/90">Menú</span>
                <button aria-label="Cerrar" className="text-white/80 hover:text-white" onClick={() => setOpen(false)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base text-white/90 hover:bg-white/5"
                    tabIndex={0}
                    autoFocus={idx === 0}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}


