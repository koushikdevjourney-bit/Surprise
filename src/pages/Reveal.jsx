import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SeoHead from '../components/SeoHead'
import { getReveal } from '../lib/plan'

export default function Reveal() {
  const { id } = useParams()
  const reveal = getReveal(id)
  const lockedUntil = reveal?.lockUntil ? new Date(reveal.lockUntil).getTime() : 0
  const [now, setNow] = useState(() => Date.now())
  const locked = lockedUntil > now
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (!locked) return undefined
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [locked])

  if (!reveal) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-ink px-5 text-center text-snow">
        <h1 className="font-display text-3xl font-bold">This reveal expired.</h1>
        <Link to="/plan" className="mt-4 text-pink-hot">
          Build a new surprise →
        </Link>
      </div>
    )
  }

  const remain = Math.max(0, lockedUntil - now)
  const hours = Math.floor(remain / 3_600_000)
  const minutes = Math.floor((remain % 3_600_000) / 60_000)

  return (
    <div className="min-h-svh bg-[radial-gradient(circle_at_30%_20%,rgba(255,45,138,0.22),transparent_40%),#07070b] px-5 py-16 text-snow">
      <SeoHead
        title={`A surprise for ${reveal.recipientName}`}
        description="Scratch to unlock a secret moment."
        path={`/reveal/${id}`}
      />
      <div className="mx-auto max-w-md text-center">
        <p className="font-ui text-xs uppercase tracking-[0.18em] text-pink-hot">Digital surprise reveal</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold">Hey {reveal.recipientName}.</h1>
        <p className="mt-3 text-fog">Someone planned something. Scratch the card.</p>

        {locked ? (
          <div className="mt-10 rounded-3xl border border-line bg-panel p-8">
            <p className="font-display text-2xl">Locked until the moment.</p>
            <p className="mt-3 text-3xl font-bold text-pink-hot">
              {hours}h {minutes}m
            </p>
          </div>
        ) : (
          <div className="relative mx-auto mt-10 aspect-[4/3] w-full overflow-hidden rounded-3xl border border-pink/30 bg-panel">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <p className="font-display text-2xl font-bold leading-snug sm:text-3xl">{reveal.revealText}</p>
            </div>
            {opened ? null : <ScratchLayer onUnlock={() => setOpened(true)} />}
          </div>
        )}

        {opened ? (
          <Link to="/create-surprise" className="mt-8 inline-block font-ui text-sm font-semibold text-pink-hot">
            Plan one back →
          </Link>
        ) : null}
      </div>
    </div>
  )
}

function ScratchLayer({ onUnlock }) {
  const canvasRef = useRef(null)
  const drawing = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.fillStyle = '#ff4da6'
    ctx.font = '600 18px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Scratch to reveal ✨', rect.width / 2, rect.height / 2)

    function pos(event) {
      const box = canvas.getBoundingClientRect()
      const point = event.touches ? event.touches[0] : event
      return { x: point.clientX - box.left, y: point.clientY - box.top }
    }

    function scratch(event) {
      if (!drawing.current) return
      const { x, y } = pos(event)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, 22, 0, Math.PI * 2)
      ctx.fill()
    }

    function start(event) {
      drawing.current = true
      scratch(event)
    }
    function end() {
      drawing.current = false
      const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      let clear = 0
      for (let i = 3; i < sample.length; i += 16) {
        if (sample[i] === 0) clear += 1
      }
      if (clear / (sample.length / 16) > 0.45) onUnlock()
    }

    canvas.addEventListener('mousedown', start)
    canvas.addEventListener('mousemove', scratch)
    window.addEventListener('mouseup', end)
    canvas.addEventListener('touchstart', start, { passive: true })
    canvas.addEventListener('touchmove', scratch, { passive: true })
    window.addEventListener('touchend', end)
    return () => {
      canvas.removeEventListener('mousedown', start)
      canvas.removeEventListener('mousemove', scratch)
      window.removeEventListener('mouseup', end)
      canvas.removeEventListener('touchstart', start)
      canvas.removeEventListener('touchmove', scratch)
      window.removeEventListener('touchend', end)
    }
  }, [onUnlock])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
      aria-label="Scratch card overlay"
    />
  )
}
