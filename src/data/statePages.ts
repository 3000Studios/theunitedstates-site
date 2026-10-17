// Real text content for the 10 highest-population state pages (2026-10-17).
// The live /states/<slug> pages previously carried metadata only.
// Field names mirror the seedArticles style (slug, paragraphs, tags-style
// string arrays). Deploy note: map these fields into the existing
// StatePage component — `paragraphs` as the body copy, `keyFacts` as a
// fact list, `topAttractions` as the attractions list. All facts are
// standard reference facts (capitals, nicknames, well-known attractions);
// no statistics are stated beyond widely published reference values.

export interface StatePageContent {
  slug: string
  state: string
  capital: string
  nickname: string
  paragraphs: string[]
  keyFacts: string[]
  topAttractions: { name: string; description: string }[]
}

export const STATE_PAGE_CONTENT: StatePageContent[] = [
  {
    slug: 'california',
    state: 'California',
    capital: 'Sacramento',
    nickname: 'The Golden State',
    paragraphs: [
      'California is the most populous state in the Union and one of the most geographically varied places on Earth. Within its borders you can stand in the hottest place in North America — Death Valley — and, on the same trip, walk among the tallest trees on the planet in the redwood forests of the north coast. Its capital, Sacramento, grew up during the Gold Rush of 1849, the event that gave California its nickname, the Golden State, and flooded it with settlers almost overnight. California entered the Union in 1850 as the 31st state, barely two years after gold was found at Sutter\'s Mill.',
      'For travelers, California divides naturally into journeys: the Pacific coast highway from San Diego through Los Angeles to San Francisco and beyond; the Sierra Nevada with Yosemite and Lake Tahoe; the desert parks of the southeast; and the wine country and redwoods of the north. Distances are the thing to respect — the state is nearly 800 miles long, and the best California trips pick a region rather than attempting all of it.',
    ],
    keyFacts: [
      'Capital: Sacramento',
      'Nickname: The Golden State',
      'State motto: "Eureka" ("I have found it")',
      'Admitted to the Union: September 9, 1850 (31st state)',
      'Mount Whitney is the highest summit in the contiguous United States',
    ],
    topAttractions: [
      { name: 'Yosemite National Park', description: 'Granite cliffs, giant sequoias, and waterfalls including Yosemite Falls in the Sierra Nevada.' },
      { name: 'Golden Gate Bridge', description: 'San Francisco\'s landmark suspension bridge, opened in 1937, spanning the entrance to San Francisco Bay.' },
      { name: 'Death Valley National Park', description: 'The largest national park in the contiguous U.S., famous for Badwater Basin, the lowest point in North America.' },
      { name: 'Redwood National and State Parks', description: 'Protected groves of coast redwoods, the tallest living trees on Earth.' },
    ],
  },
  {
    slug: 'texas',
    state: 'Texas',
    capital: 'Austin',
    nickname: 'The Lone Star State',
    paragraphs: [
      'Texas is the largest state in the contiguous United States and carries a history unlike any other: before joining the Union in 1845 as the 28th state, it spent nearly a decade as an independent republic — the origin of its nickname, the Lone Star State. Its capital, Austin, is known for live music and the vast pink-granite State Capitol, which stands taller than the U.S. Capitol in Washington. Texas geography runs from Gulf Coast beaches to pine forests, Hill Country rivers, and the desert mountains of Big Bend.',
      'Travelers should think in regions. San Antonio pairs the Alamo with the River Walk; Houston brings Space Center Houston and world-class museums; Dallas and Fort Worth split modern skylines from stockyard heritage; and the Hill Country between Austin and San Antonio is the state\'s favorite weekend country, full of small towns, rivers, and barbecue. Texas distances are serious — budget driving time the way you would in a small country.',
    ],
    keyFacts: [
      'Capital: Austin',
      'Nickname: The Lone Star State',
      'State motto: "Friendship"',
      'Admitted to the Union: December 29, 1845 (28th state)',
      'Was an independent republic from 1836 to 1845',
    ],
    topAttractions: [
      { name: 'The Alamo', description: 'The famous San Antonio mission and site of the 1836 battle, now a museum in the heart of the city.' },
      { name: 'Space Center Houston', description: 'The visitor center for NASA\'s Johnson Space Center, with flown spacecraft and Mission Control tours.' },
      { name: 'Big Bend National Park', description: 'Remote desert, canyons, and mountains along the Rio Grande in West Texas.' },
      { name: 'San Antonio River Walk', description: 'A network of shaded walkways along the river through downtown, lined with shops and restaurants.' },
    ],
  },
  {
    slug: 'florida',
    state: 'Florida',
    capital: 'Tallahassee',
    nickname: 'The Sunshine State',
    paragraphs: [
      'Florida is a peninsula between the Atlantic Ocean and the Gulf of Mexico, and water defines nearly everything about it — its weather, its wildlife, and its appeal. Its capital, Tallahassee, sits in the rolling Panhandle hills, a world away in feel from the tropical south. Florida became the 27th state in 1845, but its history runs far deeper: St. Augustine, founded by Spain in 1565, is the oldest continuously inhabited European-established settlement in the continental United States, and its fort and old town predate the country by two centuries.',
      'Most visitors come for the coasts and the theme parks of Orlando, but the state rewards going further. The Everglades is a river of grass unlike any ecosystem in the country; the Florida Keys stretch the highway to Key West over open water; and the Space Coast pairs beaches with rocket launches from Kennedy Space Center. Summer is hot, humid, and storm-prone, while winter and spring bring the mild, sunny weather that earned the Sunshine State its name.',
    ],
    keyFacts: [
      'Capital: Tallahassee',
      'Nickname: The Sunshine State',
      'State motto: "In God We Trust"',
      'Admitted to the Union: March 3, 1845 (27th state)',
      'Has the longest coastline of any state in the contiguous United States',
    ],
    topAttractions: [
      { name: 'Everglades National Park', description: 'A vast subtropical wetland of sawgrass, mangroves, alligators, and wading birds.' },
      { name: 'Kennedy Space Center', description: 'NASA\'s launch site on the Space Coast, with exhibits, rockets, and viewing areas for launches.' },
      { name: 'St. Augustine', description: 'The nation\'s oldest city, with the stone fortress Castillo de San Marcos and a Spanish colonial old town.' },
      { name: 'The Florida Keys', description: 'A chain of islands running to Key West, linked by the Overseas Highway.' },
    ],
  },
  {
    slug: 'new-york',
    state: 'New York',
    capital: 'Albany',
    nickname: 'The Empire State',
    paragraphs: [
      'New York holds two reputations at once: the state contains the largest city in the United States, and also some of the wildest country in the East. The capital is not New York City but Albany, a Hudson River port older than the republic, where state government sits beneath the dramatic towers of the Empire State Plaza. New York was one of the original thirteen colonies and ratified the Constitution in 1788 as the 11th state. Upstate, the Adirondack Park protects six million acres of mountains, lakes, and forest — a patchwork of public and private land larger than some national parks combined.',
      'A New York trip can be built many ways: the museums and neighborhoods of the five boroughs; the Hudson Valley\'s estates and farm towns; the Finger Lakes with their long glacial lakes and waterfalls; or the thunder of Niagara Falls on the Canadian border. The state\'s nickname, the Empire State, dates to the era when its port, its canal, and its commerce made it the young nation\'s engine — the Erie Canal, opened in 1825, still threads across the state and can be followed town by town.',
    ],
    keyFacts: [
      'Capital: Albany',
      'Nickname: The Empire State',
      'State motto: "Excelsior" ("Ever Upward")',
      'Admitted to the Union: July 26, 1788 (11th state, original colony)',
      'Adirondack Park covers about six million acres, the largest publicly protected area in the contiguous U.S.',
    ],
    topAttractions: [
      { name: 'Statue of Liberty', description: 'The colossal statue in New York Harbor, a gift from France dedicated in 1886, with Ellis Island nearby.' },
      { name: 'Niagara Falls', description: 'Three great waterfalls on the Niagara River at the Canadian border, viewed from Niagara Falls State Park.' },
      { name: 'Central Park', description: 'New York City\'s 843-acre green heart, with meadows, lakes, and miles of paths in the middle of Manhattan.' },
      { name: 'The Adirondacks', description: 'A mountain region of high peaks, clear lakes, and classic small towns including Lake Placid, host of two Winter Olympics.' },
    ],
  },
  {
    slug: 'pennsylvania',
    state: 'Pennsylvania',
    capital: 'Harrisburg',
    nickname: 'The Keystone State',
    paragraphs: [
      'Pennsylvania is where the United States was argued into existence. In Philadelphia\'s Independence Hall, the Declaration of Independence was adopted in 1776 and the Constitution drafted in 1787; Pennsylvania ratified that Constitution second among the states, in December 1787. Its nickname, the Keystone State, recalls both its central place among the original thirteen colonies and the keystone\'s role in holding an arch together. The capital, Harrisburg, is a modest Susquehanna River city crowned by a capitol dome inspired by St. Peter\'s in Rome.',
      'Beyond the history, Pennsylvania offers the battlefield at Gettysburg, where the Civil War\'s bloodiest battle turned in 1863; the covered bridges and farm country of Lancaster County, home to the nation\'s oldest Amish settlement; Pittsburgh\'s rivers and inclines; and the long forested ridges of the Alleghenies. It is a state where a traveler can stand in the room where the country began in the morning and be alone on a mountain trail by afternoon.',
    ],
    keyFacts: [
      'Capital: Harrisburg',
      'Nickname: The Keystone State',
      'State motto: "Virtue, Liberty and Independence"',
      'Admitted to the Union: December 12, 1787 (2nd state, original colony)',
      'The Declaration of Independence and the U.S. Constitution were both adopted in Philadelphia',
    ],
    topAttractions: [
      { name: 'Independence Hall', description: 'The Philadelphia hall where the Declaration of Independence and the Constitution were debated and adopted.' },
      { name: 'Gettysburg National Military Park', description: 'The preserved battlefield of July 1863, with monuments, the national cemetery, and Lincoln\'s Gettysburg Address site.' },
      { name: 'The Liberty Bell', description: 'The famous cracked bell, an enduring symbol of American independence, displayed in Philadelphia.' },
      { name: 'Lancaster County', description: 'Rolling farmland known for Amish communities, covered bridges, and farmers\' markets.' },
    ],
  },
  {
    slug: 'illinois',
    state: 'Illinois',
    capital: 'Springfield',
    nickname: 'The Prairie State',
    paragraphs: [
      'Illinois is two places in one: Chicago, the great city on Lake Michigan, and the prairie — mile after mile of some of the richest farmland on Earth. The capital is neither the biggest city nor on the lake; Springfield, in the center of the state, is Abraham Lincoln\'s hometown, where he lived for 24 years, practiced law, and began his political career. Illinois became the 21st state in 1818, and its motto and second nickname honor Lincoln, the Land of Lincoln, who is buried in Springfield\'s Oak Ridge Cemetery.',
      'Chicago rewards days of exploration: Millennium Park and its reflective Cloud Gate sculpture, architecture best seen from a river boat, deep-dish pizza, and neighborhoods that feel like separate cities. Downstate, Route 66 begins in Chicago and rolls southwest through small towns toward St. Louis. In the far south, Shawnee National Forest trades prairie for forested hills and the sandstone formations of the Garden of the Gods — Illinois\'s own reminder that a state\'s reputation rarely covers all of it.',
    ],
    keyFacts: [
      'Capital: Springfield',
      'Nickname: The Prairie State (also "Land of Lincoln")',
      'State motto: "State Sovereignty, National Union"',
      'Admitted to the Union: December 3, 1818 (21st state)',
      'Chicago is the third-largest city in the United States',
    ],
    topAttractions: [
      { name: 'Millennium Park', description: 'Chicago\'s downtown showpiece with the Cloud Gate sculpture, Crown Fountain, and the Pritzker Pavilion.' },
      { name: 'Lincoln Home National Historic Site', description: 'Abraham Lincoln\'s preserved Springfield home and neighborhood, the only home he ever owned.' },
      { name: 'Route 66', description: 'The historic highway begins in downtown Chicago and crosses Illinois through classic small towns.' },
      { name: 'Starved Rock State Park', description: 'Sandstone canyons and seasonal waterfalls along the Illinois River, a favorite state park.' },
    ],
  },
  {
    slug: 'ohio',
    state: 'Ohio',
    capital: 'Columbus',
    nickname: 'The Buckeye State',
    paragraphs: [
      'Ohio, the 17th state (1803), sits at the crossroads of the East, the Midwest, and the Great Lakes, and American history keeps passing through it. Seven U.S. presidents were born in Ohio, from Ulysses S. Grant to Warren G. Harding, and two brothers from Dayton, Wilbur and Orville Wright, built the first successful airplane. The nickname comes from the buckeye tree and its distinctive nut. The capital, Columbus, is also the state\'s largest city — a fast-growing university and government town in the state\'s center.',
      'Ohio\'s travel map has three big anchors: Cleveland on Lake Erie, with the Rock and Roll Hall of Fame and lakefront parks; Cincinnati on the Ohio River, with its hills, chili, and German heritage; and the countryside between them, including Amish Country in Holmes County. For nature, Hocking Hills in the southeast hides waterfalls and hemlock gorges, and the Lake Erie islands offer ferries, vineyards, and a slower summer pace.',
    ],
    keyFacts: [
      'Capital: Columbus',
      'Nickname: The Buckeye State',
      'State motto: "With God, All Things Are Possible"',
      'Admitted to the Union: March 1, 1803 (17th state)',
      'Seven U.S. presidents were born in Ohio, and it is the birthplace of aviation pioneers the Wright brothers',
    ],
    topAttractions: [
      { name: 'Rock and Roll Hall of Fame', description: 'Cleveland\'s lakefront museum honoring the artists and history of rock music.' },
      { name: 'Hocking Hills State Park', description: 'Forested gorges, waterfalls, and the vast rock shelter of Old Man\'s Cave in southeastern Ohio.' },
      { name: 'National Museum of the U.S. Air Force', description: 'The world\'s largest military aviation museum, at Wright-Patterson Air Force Base near Dayton, with free admission.' },
      { name: 'Cedar Point', description: 'The Sandusky amusement park on Lake Erie, long famous for its collection of major roller coasters.' },
    ],
  },
  {
    slug: 'georgia',
    state: 'Georgia',
    capital: 'Atlanta',
    nickname: 'The Peach State',
    paragraphs: [
      'Georgia was the last of the original thirteen colonies founded and the fourth state to ratify the Constitution, in January 1788. Its capital, Atlanta, began as a railroad crossing and rebuilt itself after the Civil War into the commercial and cultural center of the Southeast — and a central stage of the civil rights movement, where Martin Luther King Jr. was born, preached, and is buried. The Peach State nickname honors the fruit Georgia made famous, though the state\'s farms grow plenty besides.',
      'Georgia\'s variety runs north to south: the Blue Ridge mountains and waterfalls around Dahlonega and Helen; Atlanta\'s museums, aquarium, and historic sites; Savannah, one of America\'s best-preserved old cities, with its squares, oaks, and riverfront; and the quiet barrier islands and the vast Okefenokee Swamp in the south. Distances are kind here — most of the state\'s highlights sit within a half-day\'s drive of Atlanta, which makes Georgia one of the easiest Southern states to tour well.',
    ],
    keyFacts: [
      'Capital: Atlanta',
      'Nickname: The Peach State',
      'State motto: "Wisdom, Justice, and Moderation"',
      'Admitted to the Union: January 2, 1788 (4th state, original colony)',
      'Atlanta is home to Hartsfield-Jackson, long ranked among the world\'s busiest airports',
    ],
    topAttractions: [
      { name: 'Savannah Historic District', description: 'One of the largest historic districts in the U.S., with shaded squares, antebellum homes, and Spanish moss.' },
      { name: 'Martin Luther King Jr. National Historical Park', description: 'Atlanta sites including Dr. King\'s birth home, Ebenezer Baptist Church, and his tomb.' },
      { name: 'Georgia Aquarium', description: 'One of the largest aquariums in the world, in downtown Atlanta, home to whale sharks.' },
      { name: 'Stone Mountain Park', description: 'A massive granite mountain east of Atlanta with a summit skyride, trails, and the largest bas-relief carving in the world.' },
    ],
  },
  {
    slug: 'north-carolina',
    state: 'North Carolina',
    capital: 'Raleigh',
    nickname: 'The Tar Heel State',
    paragraphs: [
      'North Carolina stretches from the Atlantic to the highest mountains in the eastern United States, and its story is written at both ends. On the coast at Kitty Hawk in 1903, the Wright brothers made the first powered airplane flights; the state\'s license plates still say "First in Flight." In the west, the Blue Ridge Mountains rise into some of the oldest landscapes in America. The capital, Raleigh, anchors the Research Triangle with Durham and Chapel Hill, one of the country\'s great university and technology regions. North Carolina ratified the Constitution in November 1789 as the 12th state.',
      'The Tar Heel nickname dates, by tradition, to Civil War soldiers who held their ground as if tar stuck them to it. Travelers divide the state into three easy regions: the Outer Banks, a ribbon of barrier islands with lighthouses and wild horses; the Piedmont cities with their food, music, and museums; and the mountains, where the Blue Ridge Parkway winds past overlooks toward Great Smoky Mountains National Park, the most visited national park in the country.',
    ],
    keyFacts: [
      'Capital: Raleigh',
      'Nickname: The Tar Heel State (also "Old North State")',
      'State motto: "Esse Quam Videri" ("To Be, Rather Than To Seem")',
      'Admitted to the Union: November 21, 1789 (12th state, original colony)',
      'The Wright brothers\' first powered flights took place at Kitty Hawk in 1903',
    ],
    topAttractions: [
      { name: 'Wright Brothers National Memorial', description: 'The Kill Devil Hills site of the first powered flights, with the memorial monument and flight markers.' },
      { name: 'Blue Ridge Parkway', description: 'A 469-mile scenic road linking Virginia and North Carolina mountain overlooks, trails, and historic sites.' },
      { name: 'Biltmore Estate', description: 'George Vanderbilt\'s great house in Asheville, the largest privately owned home in the United States, with gardens and a winery.' },
      { name: 'The Outer Banks', description: 'Barrier islands with historic lighthouses, the Wright brothers\' coast, and the wild horses of Corolla.' },
    ],
  },
  {
    slug: 'michigan',
    state: 'Michigan',
    capital: 'Lansing',
    nickname: 'The Great Lakes State',
    paragraphs: [
      'Michigan is the only state made of two peninsulas, and no place in it is more than a few miles from one of the Great Lakes — it has more freshwater coastline than any other state. The Upper Peninsula is a north woods of waterfalls, iron ranges, and Lake Superior shores; the Lower Peninsula, shaped like a mitten, holds the cities, farms, and the auto industry that made Detroit famous. The capital, Lansing, sits in the Lower Peninsula\'s center, near Michigan State University. The two peninsulas are joined by the Mackinac Bridge, one of the world\'s longest suspension bridges, opened in 1957.',
      'Michigan joined the Union in 1837 as the 26th state. Travel here follows the water: beach towns up the Lake Michigan shore to the Sleeping Bear Dunes; Mackinac Island, where cars are banned and horses and bicycles rule the streets; and in the U.P., Pictured Rocks\' colored cliffs over Lake Superior. Winters are serious and celebrated, summers are the state\'s glory, and the freshwater — no salt, no sharks — is the local boast.',
    ],
    keyFacts: [
      'Capital: Lansing',
      'Nickname: The Great Lakes State (also "Wolverine State")',
      'State motto: "Si Quaeris Peninsulam Amoenam Circumspice" ("If you seek a pleasant peninsula, look about you")',
      'Admitted to the Union: January 26, 1837 (26th state)',
      'The only state consisting of two peninsulas, bordered by four of the five Great Lakes',
    ],
    topAttractions: [
      { name: 'Mackinac Island', description: 'A car-free island between Lakes Huron and Michigan, known for its fort, fudge shops, and horse-drawn carriages.' },
      { name: 'Sleeping Bear Dunes National Lakeshore', description: 'Towering sand dunes over Lake Michigan with scenic drives, trails, and island ferry trips.' },
      { name: 'The Henry Ford', description: 'Dearborn\'s great history complex, with Greenfield Village and a museum of American innovation.' },
      { name: 'Pictured Rocks National Lakeshore', description: 'Multicolored sandstone cliffs, waterfalls, and kayaking along Lake Superior in the Upper Peninsula.' },
    ],
  },
]
