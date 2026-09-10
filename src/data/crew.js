export const crewTypes = [
  {
    id: 'cake-artist',
    emoji: '🎂',
    role: 'Cake Artist',
    earning: '₹300–₹800/order',
    description: 'Deliver and present cakes with flair',
  },
  {
    id: 'singer',
    emoji: '🎤',
    role: 'Singer',
    earning: '₹800–₹2,000/order',
    description: 'Perform 1-2 songs at the surprise location',
  },
  {
    id: 'dancer',
    emoji: '💃',
    role: 'Dancer',
    earning: '₹600–₹1,500/order',
    description: 'Solo or group performance for flash mobs',
  },
  {
    id: 'photographer',
    emoji: '📸',
    role: 'Photographer',
    earning: '₹600–₹1,200/order',
    description: 'Capture the reaction, edit within 2 hours',
  },
  {
    id: 'magician',
    emoji: '🎩',
    role: 'Magician',
    earning: '₹1,500–₹3,000/order',
    description: 'Close-up magic for premium surprise moments',
  },
  {
    id: 'driver-decorator',
    emoji: '🚗',
    role: 'Driver/Decorator',
    earning: '₹400–₹800/order',
    description: 'Drive and decorate the surprise cab/caravan',
  },
  {
    id: 'crew-member',
    emoji: '🎁',
    role: 'Crew Member',
    earning: '₹400–₹800/order',
    description: 'Be part of the surprise crew, show up with energy',
  },
  {
    id: 'decorator',
    emoji: '🌸',
    role: 'Decorator',
    earning: '₹500–₹1,200/order',
    description: 'Set up flowers, balloons, romantic/birthday setups',
  },
]

export const crewCities = [
  'Hyderabad',
  'Mumbai',
  'Bangalore',
  'Delhi',
  'Pune',
  'Chennai',
  'Kolkata',
  'Other',
]

export const crewHowSteps = [
  {
    n: '01',
    t: 'Apply Online',
    d: 'Fill a 2-minute form. Tell us your skill and city.',
  },
  {
    n: '02',
    t: 'Get Verified',
    d: 'We verify your identity and do a quick skill check.',
  },
  {
    n: '03',
    t: 'Receive Orders',
    d: 'Get notified when a surprise is planned in your area.',
  },
  {
    n: '04',
    t: 'Show Up & Earn',
    d: 'Execute the surprise. Get paid within 24 hours.',
  },
]

export const weeklyEarnings = {
  1: 2400,
  2: 4800,
  3: 8000,
  4: 11200,
  5: 14000,
  6: 17500,
  7: 21000,
}

export const experienceLevels = [
  { id: 'starting', emoji: '🌱', label: 'Just Starting' },
  { id: 'some', emoji: '⭐', label: 'Some Experience' },
  { id: 'pro', emoji: '🔥', label: 'Professional' },
]

export const availabilityOptions = [
  'Weekday mornings',
  'Weekday evenings',
  'Weekends',
  'Late nights (after 10pm)',
  'Flexible',
]

export const hearAboutOptions = ['Instagram', 'WhatsApp', 'Friend referral', 'Google', 'Other']

export const applySteps = [
  { id: 1, number: '01', label: 'About You' },
  { id: 2, number: '02', label: 'Your Work' },
  { id: 3, number: '03', label: 'Final Step' },
]

export const emptyCrewApplication = {
  fullName: '',
  phone: '',
  city: '',
  skills: [],
  instagram: '',
  portfolio: '',
  bio: '',
  experience: '',
  availability: [],
  hearAbout: '',
  standout: '',
  agreeVerify: false,
  agreeRepresent: false,
}

export const weeklyChart = [
  { label: 'Week 1', amount: 2400 },
  { label: 'Week 2', amount: 3200 },
  { label: 'Week 3', amount: 4800 },
  { label: 'Week 4', amount: 2000 },
]

export const completedMissions = [
  { name: 'Birthday Raid', date: '8 Sept', role: 'Photographer', pay: 800, rating: 5.0 },
  { name: 'Midnight Mission', date: '5 Sept', role: 'Photographer', pay: 750, rating: 4.8 },
  { name: 'Bollywood Moment', date: '1 Sept', role: 'Photographer', pay: 900, rating: 5.0 },
]
