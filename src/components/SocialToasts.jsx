import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { socialProofToasts } from '../data/toasts'

export default function SocialToasts() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let hideTimer
    const show = (i) => {
      setIndex(i)
      setVisible(true)
      hideTimer = window.setTimeout(() => setVisible(false), 4000)
    }

    const first = window.setTimeout(() => show(0), 1800)
    const cycle = window.setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % socialProofToasts.length
        show(next)
        return next
      })
    }, 14000)

    return () => {
      window.clearTimeout(first)
      window.clearTimeout(hideTimer)
      window.clearInterval(cycle)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-20 left-4 z-40 max-w-[min(90vw,20rem)] md:bottom-6">
      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="rounded-2xl border border-line bg-panel/95 px-4 py-3 text-sm text-snow shadow-xl backdrop-blur"
          >
            {socialProofToasts[index]}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
