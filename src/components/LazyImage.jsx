import { useState } from 'react'

export default function LazyImage({ src, alt = '', className = '' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-raised ${className}`}>
      <div
        className={`absolute inset-0 animate-pulse bg-gradient-to-br from-line/80 to-raised ${loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        aria-hidden="true"
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-700 ${loaded ? 'scale-100 blur-0 opacity-100' : 'scale-105 blur-md opacity-70'}`}
      />
    </div>
  )
}
