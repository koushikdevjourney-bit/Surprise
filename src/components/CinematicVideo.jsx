import { useEffect, useRef, useState } from 'react'

export default function CinematicVideo({
  src,
  poster,
  label,
  className = '',
  overlay = 'bg-gradient-to-t from-[#07070b] via-[#07070b]/35 to-transparent',
  children,
  eager = false,
}) {
  const videoRef = useRef(null)
  const [motionOk, setMotionOk] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMotionOk(false)
    }
  }, [])

  useEffect(() => {
    const node = videoRef.current
    if (!node || !motionOk) return undefined

    const playSafe = () => node.play().catch(() => {})

    if (eager) {
      playSafe()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playSafe()
        else node.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [eager, motionOk])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay={motionOk}
        muted
        loop
        playsInline
        preload={eager ? 'auto' : 'metadata'}
        poster={poster}
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={`pointer-events-none absolute inset-0 ${overlay}`} />
      {children ? <div className="relative z-10 h-full">{children}</div> : null}
    </div>
  )
}
