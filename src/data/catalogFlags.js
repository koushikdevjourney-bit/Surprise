export const catalogFlags = {
  'birthday-raid': { urgent: true, petFriendly: true, setting: 'indoor' },
  'secret-admirer': { urgent: true, petFriendly: true, setting: 'indoor' },
  'midnight-mission': { urgent: false, petFriendly: true, setting: 'indoor' },
  'romantic-surprise': { urgent: false, petFriendly: true, setting: 'indoor' },
  'office-birthday-attack': { urgent: true, petFriendly: false, setting: 'indoor' },
  'best-friend-roast': { urgent: true, petFriendly: true, setting: 'indoor' },
  'surprise-cab': { urgent: true, petFriendly: false, setting: 'outdoor' },
  'memory-maker': { urgent: false, petFriendly: true, setting: 'indoor' },
  'bollywood-moment': { urgent: false, petFriendly: false, setting: 'outdoor' },
  'nri-love-package': { urgent: false, petFriendly: true, setting: 'indoor' },
  'graduation-blast': { urgent: true, petFriendly: true, setting: 'outdoor' },
  'proposal-setup': { urgent: false, petFriendly: true, setting: 'indoor' },
  'facemask-raid': { urgent: false, petFriendly: false, setting: 'indoor' },
  'mall-ambush': { urgent: false, petFriendly: false, setting: 'indoor' },
  'outdoor-banner-drop': { urgent: true, petFriendly: true, setting: 'outdoor' },
  'flash-mob': { urgent: false, petFriendly: false, setting: 'outdoor' },
  'caravan-surprise': { urgent: false, petFriendly: false, setting: 'outdoor' },
  'midnight-link': { urgent: true, petFriendly: true, setting: 'indoor' },
  'love-timeline': { urgent: true, petFriendly: true, setting: 'indoor' },
  'memory-vault': { urgent: true, petFriendly: true, setting: 'indoor' },
  'magic-moment': { urgent: false, petFriendly: true, setting: 'indoor' },
  'bollywood-entry': { urgent: false, petFriendly: false, setting: 'outdoor' },
  'squad-pooled': { urgent: true, petFriendly: true, setting: 'indoor' },
}

export function flagsFor(id) {
  return catalogFlags[id] ?? { urgent: false, petFriendly: true, setting: 'indoor' }
}
