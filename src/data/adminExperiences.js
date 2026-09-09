import { experiences } from './experiences'

export const adminExperienceMeta = {
  'birthday-raid': {
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bangalore', 'Pune'],
    status: 'Active',
  },
  'secret-admirer': {
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bangalore', 'Pune', 'Chennai', 'Kolkata'],
    status: 'Active',
  },
  'midnight-mission': {
    cities: ['Mumbai', 'Hyderabad', 'Bangalore', 'Delhi'],
    status: 'Active',
  },
  'romantic-surprise': {
    cities: ['Mumbai', 'Hyderabad', 'Bangalore', 'Pune', 'Chennai'],
    status: 'Active',
  },
  'office-birthday-attack': {
    cities: ['Mumbai', 'Delhi', 'Bangalore'],
    status: 'Limited',
  },
  'best-friend-roast': {
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bangalore', 'Pune'],
    status: 'Active',
  },
  'surprise-cab': {
    cities: ['Mumbai', 'Bangalore', 'Hyderabad', 'Delhi', 'Pune'],
    status: 'Active',
  },
  'memory-maker': {
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bangalore', 'Pune', 'Chennai'],
    status: 'Active',
  },
  'bollywood-moment': {
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bangalore'],
    status: 'Active',
  },
  'nri-love-package': {
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bangalore', 'Pune', 'Chennai'],
    status: 'Active',
  },
  'graduation-blast': {
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad'],
    status: 'Active',
  },
  'proposal-setup': {
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bangalore', 'Chennai'],
    status: 'Limited',
  },
}

export function getAdminExperiences() {
  return experiences.map((item) => ({
    ...item,
    cities: adminExperienceMeta[item.id]?.cities ?? [],
    opsStatus: adminExperienceMeta[item.id]?.status ?? 'Active',
  }))
}
