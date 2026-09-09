import { experiences } from './experiences'

export const adminExperienceMeta = {
  'birthday-bumps': {
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bangalore', 'Pune'],
    status: 'Active',
  },
  'surprise-delivery': {
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bangalore', 'Pune', 'Chennai', 'Kolkata'],
    status: 'Active',
  },
  performer: {
    cities: ['Mumbai', 'Hyderabad', 'Bangalore', 'Delhi'],
    status: 'Active',
  },
  'cake-flowers': {
    cities: ['Mumbai', 'Hyderabad', 'Bangalore', 'Pune', 'Chennai'],
    status: 'Active',
  },
  'friends-on-demand': {
    cities: ['Mumbai', 'Delhi', 'Bangalore'],
    status: 'Limited',
  },
  custom: {
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bangalore', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'],
    status: 'Active',
  },
}

export function getAdminExperiences() {
  return experiences.map((item) => ({
    ...item,
    cities: adminExperienceMeta[item.id]?.cities ?? [],
    opsStatus: adminExperienceMeta[item.id]?.status ?? 'Active',
  }))
}
