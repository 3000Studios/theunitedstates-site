import type { USStateInfo } from '@/lib/types'
import type { Article } from '@/lib/types'

export type ContentCluster = {
  title: string
  summary: string
  links: Array<{ label: string; to: string }>
}

export function buildHomeClusters(): ContentCluster[] {
  return [
    {
      title: 'Family vacation ideas in the USA',
      summary:
        'Plan family-friendly trips with fast links to state guides, capital cities, and trusted travel research for road trips, long weekends, and school-break planning.',
      links: [
        { label: 'California guide', to: '/states/california' },
        { label: 'Florida guide', to: '/states/florida' },
        { label: 'Texas guide', to: '/states/texas' },
      ],
    },
    {
      title: 'American history and civics',
      summary:
        'Read Constitution highlights, uplifting civic stories, and state-by-state history touchpoints that support trustworthy, educational, advertiser-safe content.',
      links: [
        { label: 'Constitution', to: '/constitution' },
        { label: 'Good news updates', to: '/updates' },
        { label: 'Washington, D.C.', to: '/states/district-of-columbia' },
      ],
    },
    {
      title: 'Travel planning by state',
      summary:
        'Use state pages to compare capitals, major cities, official tourism links, and media-rich hero sections for every destination in the United States.',
      links: [
        { label: 'All states', to: '/states' },
        { label: 'Trip guides', to: '/guides' },
        { label: 'Kid Zone', to: '/kids' },
      ],
    },
  ]
}

export function buildStateSeoBrief(state: USStateInfo, majorCities: string[]): string[] {
  const cityList = majorCities.length ? majorCities.slice(0, 4).join(', ') : `${state.capital} and other major cities`
  return [
    `${state.name} travel guide coverage on The United States focuses on family-friendly trip planning, state facts, and advertiser-safe destination research built for search discovery.`,
    `Visitors researching ${state.name} can use this page to compare the capital city of ${state.capital}, review well-known places around ${cityList}, and jump into official tourism and reference links.`,
    `This ${state.name} page is designed to support USA vacation planning, educational browsing, and SEO-rich internal linking across state travel, history, and good-news content.`,
  ]
}

export function buildStateFaq(state: USStateInfo): Array<{ question: string; answer: string }> {
  return [
    {
      question: `What is ${state.name} best known for?`,
      answer: `${state.name} is commonly researched for travel planning, history, capital-city facts, and state-by-state vacation ideas across the United States.`,
    },
    {
      question: `What is the capital of ${state.name}?`,
      answer: `The capital of ${state.name} is ${state.capital}.`,
    },
    {
      question: `Where can travelers start planning a trip to ${state.name}?`,
      answer: `Start with this guide for fast facts, major cities, media, and official tourism research links for ${state.name}.`,
    },
  ]
}

export function buildUpdatesCategorySummary(articles: Article[]): Array<{ heading: string; copy: string }> {
  const counts = articles.reduce<Record<string, number>>((acc, article) => {
    acc[article.category] = (acc[article.category] ?? 0) + 1
    return acc
  }, {})

  return [
    {
      heading: 'Good news coverage',
      copy: `The site currently publishes ${counts.good_news ?? 0} uplifting updates sourced from reputable feeds and rewritten into original, family-friendly summaries.`,
    },
    {
      heading: 'Travel content signals',
      copy: `Travel and destination content currently accounts for ${counts.travel ?? 0} indexed updates that support long-tail USA tourism searches and internal linking.`,
    },
    {
      heading: 'History content signals',
      copy: `History coverage currently includes ${counts.history ?? 0} indexed updates that reinforce educational value, trust, and advertiser-safe topical relevance.`,
    },
  ]
}
