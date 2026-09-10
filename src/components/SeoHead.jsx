import { Helmet } from 'react-helmet-async'

export default function SeoHead({
  title = 'Surprise — Launch a moment',
  description = 'Plan a real-world surprise for someone in another city. Crew, cake, flowers, and the moment — handled.',
  path = '/',
}) {
  const url = `https://surprise.india${path}`
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="https://surprise.india/og-cover.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
