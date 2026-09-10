export const PLAN_STORAGE_KEY = 'surprise.planWizard'
export const REVEAL_STORAGE_KEY = 'surprise.reveals'
export const TRACK_STORAGE_KEY = 'surprise.liveTracks'
export const WHATSAPP_NUMBER = '919876543210'

export const planOccasions = [
  { id: 'birthday', label: 'Birthday', emoji: '🎂', base: 4999 },
  { id: 'proposal', label: 'Proposal', emoji: '💍', base: 7999 },
  { id: 'romantic-date', label: 'Romantic Date', emoji: '🌹', base: 5999 },
  { id: 'anniversary', label: 'Anniversary', emoji: '🥂', base: 6999 },
  { id: 'farewell', label: 'Farewell', emoji: '✈️', base: 4499 },
  { id: 'baby-shower', label: 'Baby Shower', emoji: '👶', base: 5499 },
]

export const planVibes = [
  {
    id: 'bohemian-sunset',
    label: 'Bohemian Sunset',
    line: 'Terracotta, dried flowers, golden hour.',
    swatches: ['#C45C26', '#E8A87C', '#F4D6A0', '#3D1F12'],
  },
  {
    id: 'crimson-candlelight',
    label: 'Crimson Candlelight',
    line: 'Deep reds, wax glow, hush-romance.',
    swatches: ['#8B1E3F', '#C23B4A', '#F2C6C2', '#1A0B10'],
  },
  {
    id: 'neon-midnight',
    label: 'Neon Midnight',
    line: 'Electric pink, indigo, after-hours.',
    swatches: ['#FF2D8A', '#6C5CE7', '#00F5D4', '#07070B'],
  },
  {
    id: 'pastel-dream',
    label: 'Pastel Dream',
    line: 'Blush, lilac, soft daylight.',
    swatches: ['#F7C6D4', '#C9B8FF', '#B8E0D2', '#FFF7F2'],
  },
]

export const planVenues = [
  { id: 'home', label: 'Private Home / Balcony', line: 'Intimate. We come to their door.', price: 0 },
  { id: 'rooftop', label: 'Rooftop Dining', line: 'City lights, reserved table, wow factor.', price: 2499 },
  { id: 'theater', label: 'Private Theater / Cabana', line: 'A room that feels like a movie.', price: 3999 },
  { id: 'garden', label: 'Garden / Farmhouse', line: 'Open air, string lights, space to breathe.', price: 2999 },
  { id: 'yacht', label: 'Luxury Yacht / Drive-in', line: 'The grand gesture. Unforgettable.', price: 9999 },
]

export const planAddons = [
  { id: 'musician', label: 'Live Acoustic Musician', line: 'Violin or guitar, 30 minutes.', price: 2499 },
  { id: 'polaroid', label: 'Instant Polaroid & Memory Board', line: 'Printed on the spot. They leave with proof.', price: 1499 },
  { id: 'neon', label: 'Custom Neon / Marquee Letters', line: 'Their name, or a three-word punchline.', price: 2999 },
  { id: 'cake-flowers', label: 'Artisan Cake & Flower Bouquet', line: 'Custom icing message included.', price: 1299, needsMessage: true },
  { id: 'drone', label: 'Drone Capture Snippet', line: 'Outdoor only. 20-second cinematic clip.', price: 3499 },
]

export const emptyPlan = {
  step: 1,
  occasion: '',
  recipientName: '',
  date: '',
  time: '',
  vibe: '',
  venue: '',
  addons: [],
  cakeMessage: '',
  payMode: 'full',
  revealText: '',
  lockUntil: '',
}

export const liveMilestones = [
  { id: 1, title: 'Decorator Dispatched', detail: 'Crew is en route with the kit.', icon: 'truck' },
  { id: 2, title: 'On-Site Setup Underway', detail: 'Lights, flowers, and layout going in.', icon: 'map' },
  { id: 3, title: 'Final Quality Check Complete', detail: 'Details checked against your brief.', icon: 'check' },
  { id: 4, title: 'Cake & Props Staged', detail: 'The table is dressed. The reveal is ready.', icon: 'cake' },
  { id: 5, title: 'Ready for Grand Entry', detail: 'Hold. Wait for them to walk in.', icon: 'sparkles' },
]
