import { motion } from 'framer-motion'
import Button from '../Button'

export default function ApplySuccess({ applicationId }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <p className="text-6xl" aria-hidden="true">
        🎉
      </p>
      <h2 className="mt-5 font-display text-3xl font-bold text-snow sm:text-4xl">Application received!</h2>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-fog">
        We&apos;ll review your profile and WhatsApp you within 48 hours.
      </p>

      <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/10 bg-[#1a1a2e] p-6">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-pink-hot">Mission ID</p>
        <p className="mt-2 font-bebas text-4xl tracking-wide text-snow">Application #{applicationId}</p>
      </div>

      <Button to="/" className="mt-8 bg-[#FF3366] px-7 py-3 hover:bg-[#ff4d7a]">
        Back to Home →
      </Button>
    </motion.div>
  )
}
