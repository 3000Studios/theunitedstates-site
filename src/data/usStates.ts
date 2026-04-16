import type { USStateInfo } from '@/lib/types'

const RAW = `
AL,Alabama,Montgomery,5.1M,Southeast
AK,Alaska,Juneau,0.7M,Pacific
AZ,Arizona,Phoenix,7.4M,Southwest
AR,Arkansas,Little Rock,3.1M,South
CA,California,Sacramento,39.0M,Pacific
CO,Colorado,Denver,5.9M,Mountain
CT,Connecticut,Hartford,3.6M,Northeast
DE,Delaware,Dover,1.0M,South
FL,Florida,Tallahassee,22.6M,South
GA,Georgia,Atlanta,11.0M,Southeast
HI,Hawaii,Honolulu,1.4M,Pacific
ID,Idaho,Boise,2.0M,Mountain
IL,Illinois,Springfield,12.5M,Midwest
IN,Indiana,Indianapolis,6.9M,Midwest
IA,Iowa,Des Moines,3.2M,Midwest
KS,Kansas,Topeka,2.9M,Midwest
KY,Kentucky,Frankfort,4.5M,South
LA,Louisiana,Baton Rouge,4.6M,South
ME,Maine,Augusta,1.4M,Northeast
MD,Maryland,Annapolis,6.2M,South
MA,Massachusetts,Boston,7.0M,Northeast
MI,Michigan,Lansing,10.1M,Midwest
MN,Minnesota,Saint Paul,5.7M,Midwest
MS,Mississippi,Jackson,2.9M,South
MO,Missouri,Jefferson City,6.2M,Midwest
MT,Montana,Helena,1.1M,Mountain
NE,Nebraska,Lincoln,2.0M,Midwest
NV,Nevada,Carson City,3.2M,West
NH,New Hampshire,Concord,1.4M,Northeast
NJ,New Jersey,Trenton,9.3M,Northeast
NM,New Mexico,Santa Fe,2.1M,Southwest
NY,New York,Albany,19.5M,Northeast
NC,North Carolina,Raleigh,10.8M,Southeast
ND,North Dakota,Bismarck,0.8M,Midwest
OH,Ohio,Columbus,11.8M,Midwest
OK,Oklahoma,Oklahoma City,4.0M,South
OR,Oregon,Salem,4.3M,Pacific
PA,Pennsylvania,Harrisburg,13.0M,Northeast
RI,Rhode Island,Providence,1.1M,Northeast
SC,South Carolina,Columbia,5.3M,Southeast
SD,South Dakota,Pierre,0.9M,Midwest
TN,Tennessee,Nashville,7.0M,South
TX,Texas,Austin,30.0M,Southwest
UT,Utah,Salt Lake City,3.4M,Mountain
VT,Vermont,Montpelier,0.6M,Northeast
VA,Virginia,Richmond,8.7M,South
WA,Washington,Olympia,7.8M,Pacific
WV,West Virginia,Charleston,1.7M,South
WI,Wisconsin,Madison,5.9M,Midwest
WY,Wyoming,Cheyenne,0.6M,Mountain
`.trim()

const IMAGES = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
  'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/325045/pexels-photo-325045.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80',
]

export const US_STATES: USStateInfo[] = RAW.split('\n').map((line, i) => {
  const [abbr, name, capital, population, region] = line.split(',')
  const highlight = `${name} blends ${region} character with local industries, schools, and outdoor access—validate opportunities in your target metro.`
  return {
    id: abbr!.toLowerCase(),
    name: name!,
    abbreviation: abbr!,
    capital: capital!,
    population: population!,
    highlight,
    image: IMAGES[i % IMAGES.length]!,
  }
})
