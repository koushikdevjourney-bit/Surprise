export const emptyBuilder = {
  crewId: '',
  transportId: 'none',
  sweets: [],
  decor: [],
  entertainmentId: '',
  capture: [],
  messages: [],
  addons: [],
}

export const crewOptions = [
  {
    id: 'solo',
    emoji: '👤',
    name: 'Solo Delivery',
    people: '1 person',
    description: 'One person delivers the surprise quietly. No drama.',
    price: 299,
  },
  {
    id: 'duo',
    emoji: '👤👤',
    name: 'Duo Surprise',
    people: '2 people',
    description: 'A small crew with cake and energy. Subtle but sweet.',
    price: 499,
  },
  {
    id: 'surprise-crew',
    emoji: '👤👤👤',
    name: 'Surprise Crew',
    people: '3 people',
    description: 'The classic raid. Loud, joyful, impossible to ignore.',
    price: 799,
    badge: 'RECOMMENDED',
  },
  {
    id: 'big-squad',
    emoji: '👤👤👤👤👤',
    name: 'Big Squad',
    people: '5 people',
    description: 'For when you want them to feel like a celebrity.',
    price: 1299,
  },
  {
    id: 'flash-mob',
    emoji: '👥👥👥👥👥',
    name: 'Flash Mob',
    people: '10+ people',
    description: 'A full choreographed mob. Outdoor. Cinematic. Legendary.',
    price: 4999,
  },
]

export const transportOptions = [
  {
    id: 'none',
    emoji: '🚶',
    name: 'No Transport Needed',
    description: 'Crew travels by auto/bike. Works for nearby locations.',
    price: 0,
    included: true,
  },
  {
    id: 'bike-auto',
    emoji: '🛵',
    name: 'Bike/Auto',
    description: 'Fast, affordable. Good for apartments and quick raids.',
    price: 149,
  },
  {
    id: 'cab',
    emoji: '🚗',
    name: 'Surprise Cab',
    description: 'A cab arrives decorated with balloons and ribbons. The ride IS part of the surprise.',
    price: 599,
    badge: 'POPULAR',
  },
  {
    id: 'van',
    emoji: '🚐',
    name: 'Decorated Van',
    description: 'A van decorated with their name, fairy lights, and flowers inside.',
    price: 1299,
  },
  {
    id: 'caravan',
    emoji: '🚌',
    name: 'Luxury Caravan',
    description: 'A luxury caravan fully decorated. The celebration happens inside.',
    price: 3999,
  },
]

export const sweetOptions = [
  { id: 'cake-half', emoji: '🎂', name: 'Half kg Cake', description: 'Classic birthday cake, any flavour', price: 399 },
  { id: 'cake-1kg', emoji: '🎂', name: '1kg Cake', description: 'Go bigger. More cake = more love.', price: 649 },
  { id: 'cupcakes', emoji: '🧁', name: 'Cupcakes (6 pcs)', description: 'Cute, shareable, instagrammable', price: 299 },
  { id: 'chocolate-box', emoji: '🍫', name: 'Chocolate Box', description: 'Premium assorted chocolates', price: 249 },
  { id: 'dessert-hamper', emoji: '🍰', name: 'Dessert Hamper', description: 'Cake + chocolates + cookies combo', price: 799 },
]

export const decorOptions = [
  { id: 'bouquet', emoji: '💐', name: 'Flower Bouquet', description: 'Classic roses and lilies, wrapped beautifully', price: 299 },
  { id: 'rose-basket', emoji: '🌹', name: 'Rose Basket', description: '50 roses in a basket with a message card', price: 499 },
  { id: 'balloon-bunch', emoji: '🎈', name: 'Balloon Bunch', description: '10 balloons, any colour or message', price: 199 },
  { id: 'balloon-arch', emoji: '🎈', name: 'Balloon Arch', description: 'Full arch setup at their door or venue', price: 799 },
  { id: 'rose-petal', emoji: '🕯️', name: 'Rose Petal Setup', description: 'Petals arranged at their location (home/venue only)', price: 599 },
  { id: 'fairy-lights', emoji: '✨', name: 'Fairy Light Setup', description: 'String lights decorating the space', price: 499 },
  { id: 'custom-banner', emoji: '🪧', name: 'Custom Banner', description: 'Printed banner with their photo and your message', price: 899 },
]

export const entertainmentOptions = [
  { id: 'singer', emoji: '🎤', name: 'Singer', description: 'Performs 2 songs of your choice live', price: 999 },
  { id: 'dancer', emoji: '💃', name: 'Dancer', description: 'Solo dance performance, any style', price: 799 },
  { id: 'musician', emoji: '🎹', name: 'Musician', description: 'Live instrument (guitar/keyboard/flute)', price: 1299 },
  { id: 'magician', emoji: '🎩', name: 'Magician', description: 'Close-up magic at the surprise location', price: 1999 },
  { id: 'comedian', emoji: '😂', name: 'Comedian', description: 'Stand-up roast or funny performance', price: 899 },
  { id: 'dhol', emoji: '🥁', name: 'Dhol Player', description: 'Pure desi energy. For the big moments.', price: 1499 },
]

export const captureOptions = [
  {
    id: 'reaction-video',
    emoji: '📱',
    name: 'Reaction Video',
    description: 'Crew films the reaction on phone, edited reel delivered within 2 hours',
    price: 499,
  },
  {
    id: 'photographer',
    emoji: '📸',
    name: 'Photographer',
    description: 'Professional photos of the surprise moment (20+ edited photos delivered)',
    price: 799,
  },
  {
    id: 'cinematic',
    emoji: '🎬',
    name: 'Cinematic Video',
    description: 'Full cinematic short video (1-2 min, drone if outdoor, delivered in 24 hours)',
    price: 1999,
  },
  {
    id: 'live-stream',
    emoji: '📲',
    name: 'Live Stream',
    description: 'We live stream the surprise to your phone in real time',
    price: 399,
  },
]

export const messageOptions = [
  {
    id: 'message-card',
    emoji: '💌',
    name: 'Personalized Message Card',
    description: 'Handwritten card with your message, delivered with the surprise',
    price: 99,
  },
  {
    id: 'mystery-letter',
    emoji: '📜',
    name: 'Mystery Letter',
    description: 'A sealed envelope the crew hands them. They open it in front of everyone.',
    price: 149,
  },
  {
    id: 'video-message',
    emoji: '🎥',
    name: 'Video Message from You',
    description: 'Record a short video. Crew plays it on their phone at the moment.',
    price: 199,
  },
  {
    id: 'voice-note',
    emoji: '🎙️',
    name: 'Voice Note Reveal',
    description: 'A voice note plays when they scan a QR code on the card',
    price: 149,
  },
]

export const addonOptions = [
  { id: 'confetti', emoji: '🎉', name: 'Confetti Cannon', description: 'A colour burst the second they open the door', price: 199 },
  { id: 'fog', emoji: '💨', name: 'Fog Moment', description: 'A short fog burst for that movie-scene entrance', price: 349 },
  { id: 'playlist', emoji: '🎵', name: 'Custom Playlist', description: 'Your songs, queued and ready when the crew arrives', price: 149 },
  { id: 'sparklers', emoji: '🪩', name: 'Sparkler Entry', description: 'Handheld sparklers for the walk-in (outdoor/venue)', price: 249 },
  { id: 'polaroids', emoji: '📷', name: 'Instant Polaroids', description: 'Printed on the spot so they leave with the memory', price: 349 },
  { id: 'mocktails', emoji: '🥂', name: 'Toast Setup', description: 'Two glasses, garnished, ready to raise a toast', price: 299 },
  { id: 'mystery-wrap', emoji: '🎁', name: 'Mystery Gift Wrap', description: 'We wrap any item you send us for a cinematic reveal', price: 199 },
]

export const builderCatalog = {
  crew: crewOptions,
  transport: transportOptions,
  sweets: sweetOptions,
  decor: decorOptions,
  entertainment: entertainmentOptions,
  capture: captureOptions,
  messages: messageOptions,
  addons: addonOptions,
}

export const experienceBuilderPresets = {
  'birthday-raid': { crewId: 'surprise-crew', sweets: ['cake-half'], capture: ['reaction-video'] },
  'secret-admirer': { crewId: 'solo', decor: ['bouquet'], messages: ['message-card'] },
  'midnight-mission': { crewId: 'duo', decor: ['fairy-lights'], messages: ['mystery-letter'] },
  'romantic-surprise': { crewId: 'duo', transportId: 'cab', decor: ['rose-basket'], messages: ['message-card'] },
  'office-birthday-attack': { crewId: 'surprise-crew', sweets: ['cake-1kg'], addons: ['confetti'] },
  'best-friend-roast': { crewId: 'duo', entertainmentId: 'comedian' },
  'surprise-cab': { crewId: 'duo', transportId: 'cab' },
  'memory-maker': { crewId: 'duo', capture: ['photographer'] },
  'bollywood-moment': { crewId: 'flash-mob', entertainmentId: 'dhol' },
  'nri-love-package': { crewId: 'surprise-crew', capture: ['live-stream'], messages: ['video-message'] },
  'graduation-blast': { crewId: 'big-squad', addons: ['confetti'], sweets: ['cake-1kg'] },
  'proposal-setup': { crewId: 'surprise-crew', decor: ['rose-petal', 'fairy-lights'], capture: ['cinematic'] },
  'flash-mob': { crewId: 'flash-mob' },
  'caravan-surprise': { crewId: 'duo', transportId: 'caravan' },
  'squad-pooled': { crewId: 'big-squad' },
  'magic-moment': { crewId: 'duo', entertainmentId: 'magician' },
  'bollywood-entry': { crewId: 'big-squad', entertainmentId: 'dhol', transportId: 'van' },
}

export function findBuilderItem(id) {
  return Object.values(builderCatalog)
    .flat()
    .find((item) => item.id === id)
}
