import type { StoreProduct } from '@/lib/types'

/** Replace with your Amazon Associates tracking ID in one place if needed */
const TAG = 'theunitedsit-20'

function affiliateSearch(keyword: string): string {
  const k = encodeURIComponent(keyword)
  return `https://www.amazon.com/s?k=${k}&tag=${TAG}`
}

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'p1',
    title: 'Electric Standing Desk Frame',
    description: 'Upgrade your home office ergonomics with a stable electric frame for long work sessions.',
    priceDisplay: 'See price on Amazon',
    category: 'office',
    affiliateUrl: affiliateSearch('electric standing desk frame'),
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'p2',
    title: 'Noise-Canceling Headphones',
    description: 'Focus anywhere—trains, cafes, living rooms—with comfortable over-ear ANC headphones.',
    priceDisplay: 'See price on Amazon',
    category: 'tech',
    affiliateUrl: affiliateSearch('noise canceling headphones over ear'),
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'p3',
    title: 'Insulated Stainless Water Bottle',
    description: 'Stay hydrated on road trips, hikes, and workdays—durable stainless construction.',
    priceDisplay: 'See price on Amazon',
    category: 'lifestyle',
    affiliateUrl: affiliateSearch('insulated stainless water bottle 32 oz'),
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'p4',
    title: 'LED Desk Lamp with USB Ports',
    description: 'Warm-to-cool lighting for late reading sessions and video calls.',
    priceDisplay: 'See price on Amazon',
    category: 'office',
    affiliateUrl: affiliateSearch('led desk lamp usb charging port'),
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'p5',
    title: 'Portable Power Station',
    description: 'Backup power for outages and outdoor weekends—match capacity to your devices.',
    priceDisplay: 'See price on Amazon',
    category: 'outdoor',
    affiliateUrl: affiliateSearch('portable power station solar'),
    image:
      'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=900',
    featured: true,
  },
  {
    id: 'p6',
    title: 'Compact Mechanical Keyboard',
    description: 'Tactile typing for writers and developers who live in documents and IDEs.',
    priceDisplay: 'See price on Amazon',
    category: 'tech',
    affiliateUrl: affiliateSearch('compact mechanical keyboard rgb'),
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'p7',
    title: 'Extra-Thick Yoga Mat',
    description: 'Joint-friendly support for stretching routines after long desk days.',
    priceDisplay: 'See price on Amazon',
    category: 'wellness',
    affiliateUrl: affiliateSearch('extra thick yoga mat non slip'),
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 'p8',
    title: 'Carbon Monoxide Detector',
    description: 'Home safety baseline—especially important in winter heating season.',
    priceDisplay: 'See price on Amazon',
    category: 'home',
    affiliateUrl: affiliateSearch('carbon monoxide detector battery powered'),
    image:
      'https://images.pexels.com/photos/5691607/pexels-photo-5691607.jpeg?auto=compress&cs=tinysrgb&w=900',
    featured: false,
  },
]
