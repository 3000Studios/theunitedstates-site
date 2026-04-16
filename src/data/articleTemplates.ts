import type { ArticleCategory } from '@/lib/types'

export interface ArticleTemplate {
  slugPrefix: string
  titlePrefix: string
  excerpt: string
  category: ArticleCategory
  bodyParagraphs: string[]
  rotatingHeadlines: string[]
  tags: string[]
  image: string
  imageCredit: string
}

export const articleTemplates: ArticleTemplate[] = [
  {
    slugPrefix: 'usa-briefing',
    titlePrefix: 'USA Briefing',
    category: 'news',
    excerpt:
      'A fast look at jobs, housing, and mobility patterns shaping American communities this year.',
    rotatingHeadlines: [
      'Labor markets stay tight in key metros',
      'Housing inventory edges higher in Sun Belt',
      'Energy prices influence household budgets',
    ],
    bodyParagraphs: [
      'Across the United States, local economies are reacting to interest rates, migration, and industry demand in different ways. Sun Belt metros continue to attract new residents seeking lower costs and warmer winters, while legacy hubs invest in transit and talent pipelines to stay competitive.',
      'For readers tracking careers and cost of living, the lesson is simple: opportunity is national, but the details are hyper‑local. Wages, rent, and commute time can swing dramatically between counties that sit only miles apart.',
      'We will keep publishing concise briefings you can scan in minutes—optimized for busy readers who still want trustworthy context. Replace this generator with an AI workflow later by mapping the same JSON schema to your model output.',
    ],
    tags: ['economy', 'briefing', 'usa'],
    image:
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageCredit: 'Pexels',
  },
  {
    slugPrefix: 'heartland-opportunity',
    titlePrefix: 'Heartland Opportunity',
    category: 'money',
    excerpt:
      'Why mid‑size cities are becoming launchpads for remote careers and small business experiments.',
    rotatingHeadlines: [
      'Remote work unlocks new hometown advantages',
      'Small business grants gain traction',
      'Broadband investments change the map',
    ],
    bodyParagraphs: [
      'Heartland communities are not standing still. Improved broadband, coworking spaces, and regional airports make it easier to build a national career without a coastal address.',
      'If you are evaluating a move, compare total cost—not just rent. Include taxes, insurance, childcare, and travel to clients or headquarters.',
      'This automated article demonstrates how your site can rotate evergreen angles while staying advertiser‑safe and informative.',
    ],
    tags: ['remote work', 'small business', 'heartland'],
    image:
      'https://images.pexels.com/photos/325045/pexels-photo-325045.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageCredit: 'Pexels',
  },
  {
    slugPrefix: 'tech-america',
    titlePrefix: 'Tech in America',
    category: 'tech',
    excerpt:
      'From AI adoption to cybersecurity basics, here is what American consumers should know right now.',
    rotatingHeadlines: [
      'Security hygiene beats fancy tools',
      'AI assistants change how we research',
      'Privacy settings deserve a spring cleaning',
    ],
    bodyParagraphs: [
      'Technology headlines move fast, but durable habits matter more than buzzwords. Strong passwords, device updates, and cautious clicking still stop the majority of everyday threats.',
      'If you are experimenting with AI for work, treat outputs as drafts: verify facts, disclose usage where required, and keep sensitive data out of public tools.',
      'Swap this template body with model‑generated copy later—the routing, SEO layer, and monetization slots remain unchanged.',
    ],
    tags: ['ai', 'security', 'productivity'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Unsplash',
  },
]
