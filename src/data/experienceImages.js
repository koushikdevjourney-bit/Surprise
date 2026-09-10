import birthdayRaid from '../assets/experiences/birthday-raid.png'
import bollywoodMoment from '../assets/experiences/bollywood-moment.png'
import midnightMission from '../assets/experiences/midnight-mission.png'
import nriLove from '../assets/experiences/nri-love-package.png'
import proposalSetup from '../assets/experiences/proposal-setup.png'
import romanticSurprise from '../assets/experiences/romantic-surprise.png'
import secretAdmirer from '../assets/experiences/secret-admirer.png'
import surpriseCab from '../assets/experiences/surprise-cab.png'

const byId = {
  'birthday-raid': birthdayRaid,
  'office-birthday-attack': birthdayRaid,
  'graduation-blast': birthdayRaid,
  'facemask-raid': birthdayRaid,
  'romantic-surprise': romanticSurprise,
  'proposal-setup': proposalSetup,
  'secret-admirer': secretAdmirer,
  'bollywood-moment': bollywoodMoment,
  'bollywood-entry': bollywoodMoment,
  'flash-mob': bollywoodMoment,
  'mall-ambush': bollywoodMoment,
  'nri-love-package': nriLove,
  'midnight-mission': midnightMission,
  'midnight-link': midnightMission,
  'magic-moment': midnightMission,
  'memory-maker': romanticSurprise,
  'love-timeline': romanticSurprise,
  'memory-vault': secretAdmirer,
  'surprise-cab': surpriseCab,
  'caravan-surprise': surpriseCab,
  'outdoor-banner-drop': surpriseCab,
  'best-friend-roast': birthdayRaid,
  'squad-pooled': birthdayRaid,
}

export function imageForExperience(id) {
  return byId[id] ?? birthdayRaid
}
