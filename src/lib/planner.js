import { experiences } from '../data/experiences'

const PLANNER_PROMPT = `You are Surprise's AI planner — a hype, Indian consumer brand that launches real-life surprise missions.

Return STRICT JSON only. No markdown. No commentary. Shape:
{
  "title": string,
  "experienceId": one of ${experiences.map((item) => item.id).join(', ')},
  "occasion": one of birthday, anniversary, celebration, congratulations, just-for-fun, apology, something-else,
  "city": an Indian city,
  "summary": short personal message / copy,
  "estimatedPrice": number in INR,
  "whyItWorks": why this experience fits,
  "crewNotes": notes for the Surprise Crew
}

User request:
`

export const mockPlan = {
  title: 'Midnight Birthday Raid in Hyderabad',
  experienceId: 'birthday-raid',
  occasion: 'birthday',
  city: 'Hyderabad',
  summary: 'Happy birthday. I couldn’t fly in — so I sent the crew. Don’t even try to act unbothered.',
  estimatedPrice: 999,
  whyItWorks: 'Cake + chaos + their favourite people energy, even if you’re in another timezone.',
  crewNotes: 'Keep it joyful, not scary. Cake first. Song second. Capture a 15-second clip.',
}

export function extractJson(text) {
  if (!text) return null
  const trimmed = String(text).trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const raw = fenced ? fenced[1] : trimmed
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1) return null
  try {
    return JSON.parse(raw.slice(start, end + 1))
  } catch {
    return null
  }
}

export async function requestSurprisePlan(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 800,
      messages: [{ role: 'user', content: `${PLANNER_PROMPT}${prompt}` }],
    }),
  })

  if (!response.ok) {
    throw new Error('planner_failed')
  }

  const payload = await response.json()
  const text = payload?.content?.find((part) => part.type === 'text')?.text ?? payload?.content?.[0]?.text
  const parsed = extractJson(text)
  if (!parsed?.experienceId) throw new Error('planner_parse')
  return parsed
}
