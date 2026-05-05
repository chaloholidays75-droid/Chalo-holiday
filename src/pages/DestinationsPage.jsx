'use client'
import { useState, useRef, useEffect, useMemo ,useCallback} from "react"
import {
  MapPin, ArrowUpRight, ChevronDown, Search, X,
  ChevronRight, Globe, Waves, Mountain, Building2, Plane,
  Sun, Utensils, Camera, Compass, Users, ArrowRight,
  Phone, Star, ChevronLeft
} from "lucide-react"
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import DestinationHeroImg from '../assets/destination/destination-page.jpg'
import DestinationImg from '../assets/destination/destination-page.webp'

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — Luxury Editorial / Auction Catalogue
═══════════════════════════════════════════════════════ */
const G = '#B8860B'   // deep gold
const G2 = '#D4A017'   // bright gold
const G3 = '#FAF3DC'   // gold tint bg
const R = '#B91C1C'   // crimson
const INK = '#0E0C08'   // near-black
const PARCH = '#F9F5EC'   // parchment page bg
const CARD = '#FFFDF7'   // card surface
const SL = '#5C4F3A'   // warm sepia text
const SL2 = '#9C8B78'   // muted warm
const BR = '#E6DDD0'   // warm border
const BR2 = '#D4C9B8'   // darker border

/* ═══════════════════════════════════════════════════════
   ICONS MAP
═══════════════════════════════════════════════════════ */
const ICON_MAP = { Sun, Utensils, Camera, Compass, Users }

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
function useInView(threshold = 0.06) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const ALL_DESTINATIONS = [
  { id: 1, country: 'United Kingdom', region: 'Western Europe', flag: '🇬🇧', category: 'city', name: 'London', tagline: 'Royal heritage meets modern edge', hot: true, desc: 'Buckingham Palace, the Thames, world-class museums, Michelin stars and electric nightlife — London never runs out of surprises.', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1000&q=85', highlights: ['Buckingham Palace', 'West End Shows', 'Borough Market'], insights: { season: 'Apr – Jun · Sep – Oct', duration: '5 – 7 Days', type: 'Culture & History', pace: 'Energetic' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–June for blooming parks and mild weather. September–October for arts season.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Afternoon tea at Claridge\'s, Scotch egg at Fortnum & Mason, modern British tasting menu at The Ledbury.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Tower of London tour, West End show with backstage access, Thames sunset dinner cruise.' }, { icon: 'Compass', title: 'Getting Around', body: 'The Tube is your best friend — use Oyster or contactless. Heathrow Express to Paddington in 15 mins.' }, { icon: 'Users', title: 'Ideal For', body: 'First-time European travellers, theatre lovers, shoppers and royal heritage enthusiasts.' }] },
  { id: 2, country: 'United Kingdom', region: 'Western Europe', flag: '🇬🇧', category: 'city', name: 'Edinburgh', tagline: 'Castle on volcanic rock, whisky in hand', hot: false, desc: 'Scotland\'s dramatic capital — a medieval Old Town, an imposing castle, and the annual Fringe Festival that transforms the city.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=85', highlights: ['Edinburgh Castle', 'Royal Mile', 'Scotch Whisky Trail'], insights: { season: 'May – Sep', duration: '3 – 4 Days', type: 'Heritage & Culture', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'August is Edinburgh Festival Fringe — the world\'s largest arts festival.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Haggis at The Witchery, Cullen Skink at The Shore in Leith.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Dawn walk on Arthur\'s Seat for panoramic views, private castle ghost tour.' }, { icon: 'Compass', title: 'Getting Around', body: 'Edinburgh Old Town and New Town are highly walkable.' }, { icon: 'Users', title: 'Ideal For', body: 'History enthusiasts, whisky lovers, arts and festival seekers.' }] },
  { id: 3, country: 'United Kingdom', region: 'Western Europe', flag: '🇬🇧', category: 'mountain', name: 'Scottish Highlands', tagline: 'Untamed wilderness and ancient lochs', hot: true, desc: 'Misty glens, brooding mountains, shimmering lochs and Hogwarts-esque viaducts. The Highlands are pure raw Scotland.', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1000&q=85', highlights: ['Loch Ness', 'Glencoe Valley', 'Glenfinnan Viaduct'], insights: { season: 'May – Sep', duration: '4 – 6 Days', type: 'Nature & Wilderness', pace: 'Exploratory' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–September for the best weather and long daylight hours.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Fresh venison and Highland beef, smoked salmon from a lochside smokehouse.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Jacobite Steam Train (Hogwarts Express), Loch Ness boat cruise, Glen Coe sunset hike.' }, { icon: 'Compass', title: 'Getting Around', body: 'Self-drive is essential — hire a car in Inverness or Edinburgh.' }, { icon: 'Users', title: 'Ideal For', body: 'Nature lovers, photographers, adventure seekers.' }] },
  { id: 4, country: 'United Kingdom', region: 'Western Europe', flag: '🇬🇧', category: 'city', name: 'Dublin', tagline: 'Pubs, history and Celtic warmth', hot: false, desc: 'Temple Bar\'s lively pubs, Trinity College\'s Book of Kells, and the warmest welcomes you\'ll find anywhere in Europe.', img: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=1000&q=85', highlights: ['St Patrick\'s Cathedral', 'Guinness Storehouse', 'Cliffs of Moher'], insights: { season: 'Apr – Oct', duration: '3 – 4 Days', type: 'City & Coastal', pace: 'Lively' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–October for milder weather and all attractions open.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Irish stew at The Old Storehouse, Guinness at the source.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Book of Kells at Trinity College, Cliffs of Moher on the Wild Atlantic Way.' }, { icon: 'Compass', title: 'Getting Around', body: 'Dublin city centre is walkable. DART rail for coastal suburbs.' }, { icon: 'Users', title: 'Ideal For', body: 'History lovers, pub culture enthusiasts, families.' }] },
  { id: 5, country: 'Italy', region: 'Central Europe', flag: '🇮🇹', category: 'city', name: 'Rome', tagline: 'Eternal city, infinite layers of history', hot: true, desc: 'Colosseum, Vatican City, Trevi Fountain — and the world\'s finest gelato. Rome is 3,000 years of civilisation in one city.', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1000&q=85', highlights: ['Colosseum', 'Vatican Museums', 'Trastevere Walk'], insights: { season: 'Mar – Jun · Sep – Oct', duration: '5 – 7 Days', type: 'Cultural Immersion', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'Spring (March–June) offers mild weather and fewer crowds.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Carbonara at Roscioli, supplì at Supplì Roma, Aperol Spritz in Campo de\' Fiori.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Colosseum arena floor at dawn, Vatican after-hours tour.' }, { icon: 'Compass', title: 'Getting Around', body: 'Rome rewards walkers. Use taxis for longer trips.' }, { icon: 'Users', title: 'Ideal For', body: 'Culture seekers, history enthusiasts, honeymooners.' }] },
  { id: 6, country: 'Italy', region: 'Central Europe', flag: '🇮🇹', category: 'beach', name: 'Amalfi Coast', tagline: 'La dolce vita on dramatic limestone cliffs', hot: true, desc: 'Pastel villages cascade down cliffs into turquoise Tyrrhenian waters. Positano, Ravello, Capri — pure southern Italian magic.', img: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1000&q=85', highlights: ['Positano', 'Capri Day Trip', 'Ravello Gardens'], insights: { season: 'May – Oct', duration: '5 – 8 Days', type: 'Coastal Luxury', pace: 'Indulgent' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–June is perfect: warm seas, flowers in bloom, roads manageable.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Fresh scialatielli alle vongole, limoncello from Sfusato lemons.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private boat hire along the coastline, Blue Grotto at Capri by kayak.' }, { icon: 'Compass', title: 'Getting Around', body: 'Ferry between towns is the sanest option in high season.' }, { icon: 'Users', title: 'Ideal For', body: 'Romantics, luxury seekers, food lovers.' }] },
  { id: 7, country: 'Italy', region: 'Central Europe', flag: '🇮🇹', category: 'city', name: 'Venice', tagline: 'Floating city of canals and golden domes', hot: false, desc: 'No cars, no roads — just 177 canals, 400 bridges and a labyrinth of calli leading to Piazza San Marco and beyond.', img: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=1000&q=85', highlights: ['Grand Canal', 'St Mark\'s Basilica', 'Murano Glass'], insights: { season: 'Mar – May · Oct – Nov', duration: '3 – 4 Days', type: 'Romance & Art', pace: 'Slow' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'March–May and October–November avoid peak summer crowds.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Cicchetti at bacaro bars in Cannaregio, fresh bigoli in salsa.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Dawn gondola ride on empty canals, private glassblowing on Murano.' }, { icon: 'Compass', title: 'Getting Around', body: 'Vaporetto (water bus) is the main public transport.' }, { icon: 'Users', title: 'Ideal For', body: 'Romantics, art lovers, photographers.' }] },
  { id: 8, country: 'Italy', region: 'Central Europe', flag: '🇮🇹', category: 'city', name: 'Florence', tagline: 'Renaissance perfection at every corner', hot: false, desc: 'Michelangelo\'s David, the Uffizi Gallery, Brunelleschi\'s dome. Florence is where art, architecture and Chianti unite.', img: 'https://images.unsplash.com/photo-1558768059-08c06ad515b7?w=1000&q=85', highlights: ['Uffizi Gallery', 'Duomo Cathedral', 'Ponte Vecchio'], insights: { season: 'Apr – Jun · Sep – Oct', duration: '3 – 4 Days', type: 'Art & Renaissance', pace: 'Cultural' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–June and September–October offer ideal weather.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Bistecca alla Fiorentina at Buca Mario, ribollita at Trattoria Mario.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Uffizi Gallery early-morning tour, Michelangelo\'s David.' }, { icon: 'Compass', title: 'Getting Around', body: 'Florence historic centre is entirely walkable.' }, { icon: 'Users', title: 'Ideal For', body: 'Art and architecture lovers, food and wine enthusiasts.' }] },
  { id: 9, country: 'Switzerland', region: 'Central Europe', flag: '🇨🇭', category: 'mountain', name: 'Interlaken', tagline: 'Alpine adventure between two glacial lakes', hot: true, desc: 'Flanked by Lake Thun and Lake Brienz, Interlaken is the gateway to the Bernese Oberland — Europe\'s most spectacular mountain arena.', img: 'https://images.unsplash.com/photo-1612215864092-355d4b25083f?w=1000&q=85', highlights: ['Jungfrau Top of Europe', 'Paragliding', 'Lauterbrunnen Valley'], insights: { season: 'Jun – Sep · Dec – Mar', duration: '3 – 5 Days', type: 'Adventure & Nature', pace: 'Active' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'Summer (June–September) for hiking, paragliding and lake swimming.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Swiss cheese fondue at Chäsi Hofstetten in Grindelwald.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Sunrise at Jungfraujoch "Top of Europe" (3,454m), tandem paraglide.' }, { icon: 'Compass', title: 'Getting Around', body: 'Swiss Travel Pass covers trains, buses and most mountain railways.' }, { icon: 'Users', title: 'Ideal For', body: 'Adventure enthusiasts, families with teenagers, ski groups.' }] },
  { id: 10, country: 'Switzerland', region: 'Central Europe', flag: '🇨🇭', category: 'mountain', name: 'Zermatt', tagline: 'Beneath the iconic Matterhorn', hot: false, desc: 'Car-free alpine village, ski runs for all levels, and the most photographed peak in the Alps. Pure Swiss luxury.', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1000&q=85', highlights: ['Matterhorn Views', 'Glacier Paradise', 'Gornergrat Railway'], insights: { season: 'Dec – Apr · Jul – Sep', duration: '3 – 5 Days', type: 'Luxury Alpine', pace: 'Relaxed' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'December–April for world-class skiing with Matterhorn views.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Käseschnitte at a mountain hut, raclette by the fire.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Gornergrat cogwheel railway sunrise, Glacier Paradise at 3,883m.' }, { icon: 'Compass', title: 'Getting Around', body: 'No private cars — arrive by train from Visp or Täsch.' }, { icon: 'Users', title: 'Ideal For', body: 'Luxury ski travellers, alpine wellness seekers, photographers.' }] },
  { id: 11, country: 'France', region: 'Western Europe', flag: '🇫🇷', category: 'city', name: 'Paris', tagline: 'City of light, love and haute cuisine', hot: true, desc: 'Eiffel Tower at golden hour, the Louvre\'s endless halls, Seine-side strolls and café culture that invented the phrase joie de vivre.', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000&q=85', highlights: ['Eiffel Tower', 'Louvre Museum', 'Versailles Day Trip'], insights: { season: 'Apr – Jun · Sep – Oct', duration: '5 – 7 Days', type: 'Art & Romance', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–June: Paris in bloom. September–October: golden light on Haussmann boulevards.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Croissant from Du Pain et des Idées, steak frites at Le Relais de l\'Entrecôte.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Louvre after-hours tour, sunset champagne on a Seine river boat.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro is fast, cheap and covers everything. RER B to CDG Airport.' }, { icon: 'Users', title: 'Ideal For', body: 'First-time European travellers, honeymooners, art lovers.' }] },
  { id: 12, country: 'France', region: 'Western Europe', flag: '🇫🇷', category: 'beach', name: 'French Riviera', tagline: 'Azure coast, yachts and sun-soaked glamour', hot: false, desc: 'Cannes, Nice, Monaco — the Côte d\'Azur has been luring royalty and celebrities for over a century. Crystal water, rosé, repeat.', img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1000&q=85', highlights: ['Nice Old Town', 'Monaco', 'Cannes Croisette'], insights: { season: 'May – Sep', duration: '5 – 7 Days', type: 'Coastal Glamour', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–June for warm weather without peak-summer crowds.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Socca in Nice\'s Cours Saleya market, bouillabaisse in Marseille.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Day trip to Monaco, perfume workshop in Grasse, private yacht charter.' }, { icon: 'Compass', title: 'Getting Around', body: 'Nice Côte d\'Azur Airport is the hub. Scenic coastal railway.' }, { icon: 'Users', title: 'Ideal For', body: 'Luxury leisure travellers, beach and culture combiners.' }] },
  { id: 13, country: 'Spain', region: 'Western Europe', flag: '🇪🇸', category: 'city', name: 'Barcelona', tagline: 'Gaudí, beaches and electric nightlife', hot: true, desc: 'Sagrada Família, Park Güell, Las Ramblas and Barceloneta beach — Barcelona packs an extraordinary amount of magic per square mile.', img: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=1000&q=85', highlights: ['Sagrada Família', 'Park Güell', 'Gothic Quarter'], insights: { season: 'Apr – Jun · Sep – Nov', duration: '4 – 6 Days', type: 'Architecture & Beach', pace: 'Vibrant' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–June and September–November: warm without crushing July–August heat.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Pan con tomate, patatas bravas at Bar Tomàs, paella at La Mar Salada.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Guided Gaudí architecture trail, flamenco in the Gothic Quarter.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro L2, L3, L4 cover all key areas. Aerobus from El Prat Airport.' }, { icon: 'Users', title: 'Ideal For', body: 'Architecture enthusiasts, beach lovers, foodies, couples.' }] },
  { id: 14, country: 'Spain', region: 'Western Europe', flag: '🇪🇸', category: 'city', name: 'Madrid', tagline: 'Art, tapas and royal grandeur', hot: false, desc: 'The Prado, the Reina Sofía, Retiro Park and a tapas culture that begins at midnight. Madrid lives life at full volume.', img: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1000&q=85', highlights: ['Prado Museum', 'Retiro Park', 'Plaza Mayor'], insights: { season: 'Mar – Jun · Sep – Nov', duration: '3 – 5 Days', type: 'Art & Gastronomy', pace: 'Energetic' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'March–June and September–November for pleasant temperatures.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Churros con chocolate at San Ginés, cocido madrileño at La Bola.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Golden Triangle of Art (Prado, Thyssen, Reina Sofía), Retiro Park.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro system is excellent and very affordable.' }, { icon: 'Users', title: 'Ideal For', body: 'Art lovers, foodies, night owls and culture seekers.' }] },
  { id: 15, country: 'Netherlands', region: 'Western Europe', flag: '🇳🇱', category: 'city', name: 'Amsterdam', tagline: 'Canals, cycling and golden age art', hot: true, desc: 'Golden age canal houses, Van Gogh and Rembrandt, Anne Frank House, and a cycling culture that puts the world to shame.', img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1000&q=85', highlights: ['Rijksmuseum', 'Anne Frank House', 'Canal Cruise'], insights: { season: 'Apr – May · Sep – Oct', duration: '3 – 4 Days', type: 'Art & Canal Culture', pace: 'Relaxed' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–May: tulip season at Keukenhof gardens.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Raw herring from a street stall, stroopwafel, Indonesian rijsttafel.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Rijksmuseum early morning tour, Anne Frank House.' }, { icon: 'Compass', title: 'Getting Around', body: 'Rent a bike — Amsterdam was built for cycling.' }, { icon: 'Users', title: 'Ideal For', body: 'Art lovers, history enthusiasts, cyclists.' }] },
  { id: 16, country: 'Greece', region: 'Central Europe', flag: '🇬🇷', category: 'beach', name: 'Santorini', tagline: 'Caldera views and infinite blue domes', hot: true, desc: 'White-washed Cycladic architecture perched above a volcanic caldera. Santorini\'s sunsets from Oia remain the world\'s most celebrated.', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1000&q=85', highlights: ['Oia Sunset Walk', 'Akrotiri Ruins', 'Caldera Boat Tour'], insights: { season: 'May – Sep', duration: '4 – 6 Days', type: 'Leisure & Romance', pace: 'Relaxed' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–June and September offer the sweet spot.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Fresh seafood at Selene, local Assyrtiko white wine.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private sailing catamaran at sunset, helicopter transfer from Athens.' }, { icon: 'Compass', title: 'Getting Around', body: 'Fly direct into Santorini Airport (JTR) or fast ferry from Athens.' }, { icon: 'Users', title: 'Ideal For', body: 'Honeymooners, anniversary couples and luxury leisure travellers.' }] },
  { id: 17, country: 'Greece', region: 'Central Europe', flag: '🇬🇷', category: 'city', name: 'Athens', tagline: 'Cradle of civilisation, olive oil and ouzo', hot: false, desc: 'The Acropolis at dusk, the Plaka neighbourhood\'s tavernas, world-class museums and a street food scene that rivals anything in Europe.', img: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1000&q=85', highlights: ['Acropolis & Parthenon', 'Archaeological Museum', 'Monastiraki'], insights: { season: 'Mar – Jun · Sep – Nov', duration: '3 – 4 Days', type: 'Ancient History', pace: 'Cultural' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'March–June and September–November for ideal sightseeing weather.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Souvlaki at Kostas in Syntagma, spanakopita from any bakery.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Acropolis at dawn, National Archaeological Museum, Plaka walk.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro Line 3 connects Athens Airport directly to city centre.' }, { icon: 'Users', title: 'Ideal For', body: 'History enthusiasts and island-hoppers using Athens as gateway.' }] },
  { id: 18, country: 'Germany', region: 'Central Europe', flag: '🇩🇪', category: 'city', name: 'Berlin', tagline: 'History, street art and electric nightlife', hot: true, desc: 'Checkpoint Charlie, the Brandenburg Gate, East Side Gallery and a nightlife scene that defined global club culture.', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1000&q=85', highlights: ['Brandenburg Gate', 'East Side Gallery', 'Museum Island'], insights: { season: 'Apr – Oct', duration: '4 – 5 Days', type: 'History & Contemporary Art', pace: 'Energetic' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–September for outdoor beer gardens and festival season.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Currywurst at Curry 36, döner kebab, Berliner Weisse beer.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'East Side Gallery, Pergamon Museum, Checkpoint Charlie history walk.' }, { icon: 'Compass', title: 'Getting Around', body: 'U-Bahn, S-Bahn, tram and bus network is exceptional.' }, { icon: 'Users', title: 'Ideal For', body: 'History enthusiasts, contemporary art lovers, night culture seekers.' }] },
  { id: 19, country: 'Austria', region: 'Central Europe', flag: '🇦🇹', category: 'city', name: 'Vienna', tagline: 'Mozart, Schnitzel and imperial grandeur', hot: false, desc: 'The Hofburg, the Vienna State Opera, Sachertorte at Café Central and the greatest classical music tradition in the world.', img: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1000&q=85', highlights: ['Schönbrunn Palace', 'Vienna State Opera', 'Kunsthistorisches Museum'], insights: { season: 'Apr – Oct', duration: '3 – 5 Days', type: 'Art & Classical Music', pace: 'Refined' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–May for blooming Stadtpark and opera season in full swing.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Wiener Schnitzel at Figlmüller, Sacher-Torte at Café Sacher.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Imperial Apartments at Hofburg, standing room at the State Opera.' }, { icon: 'Compass', title: 'Getting Around', body: 'Vienna\'s U-Bahn is one of Europe\'s finest.' }, { icon: 'Users', title: 'Ideal For', body: 'Classical music lovers, art collectors, history enthusiasts.' }] },
  { id: 20, country: 'Czech Republic', region: 'Central Europe', flag: '🇨🇿', category: 'city', name: 'Prague', tagline: 'Fairy-tale spires above the Vltava', hot: true, desc: 'Charles Bridge at dawn, the Astronomical Clock, Josefov\'s synagogues and craft beer culture that would impress any connoisseur.', img: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=1000&q=85', highlights: ['Prague Castle', 'Charles Bridge', 'Old Town Square'], insights: { season: 'Apr – Oct', duration: '3 – 4 Days', type: 'Medieval Architecture', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–May and September–October are ideal.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Svíčková at Lokál, chimney cake, Czech pilsner directly from the tank.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Prague Castle dawn tour, guided Jewish Quarter walk.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro, tram and bus system is excellent and very affordable.' }, { icon: 'Users', title: 'Ideal For', body: 'History lovers, architecture enthusiasts, couples.' }] },
  { id: 21, country: 'Portugal', region: 'Western Europe', flag: '🇵🇹', category: 'city', name: 'Lisbon', tagline: 'Fado, pastéis and seven hilly neighbourhoods', hot: true, desc: 'Trams rattling uphill, azulejo-tiled facades, custard tarts from Belém and the soulful sound of fado drifting through Alfama.', img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1000&q=85', highlights: ['Belém Tower', 'Alfama District', 'Sintra Day Trip'], insights: { season: 'Mar – Jun · Sep – Oct', duration: '4 – 5 Days', type: 'Culture & Fado', pace: 'Soulful' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'March–June: warm but not scorching.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Pastel de nata at Pastéis de Belém, bacalhau, piri-piri chicken.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Tram 28 through Alfama, fado evening in a tasca, Jerónimos Monastery.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro covers main districts. Iconic Tram 28 for Alfama.' }, { icon: 'Users', title: 'Ideal For', body: 'Culture lovers, food enthusiasts, romance seekers.' }] },
  { id: 22, country: 'Norway', region: 'Northern Europe', flag: '🇳🇴', category: 'mountain', name: 'Bergen & Fjords', tagline: 'Gateway to the world\'s greatest fjords', hot: true, desc: 'Bryggen Wharf, Flåm Railway, Geirangerfjord and the Northern Lights. Norway\'s fjord country is jaw-droppingly beautiful.', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1000&q=85', highlights: ['Geirangerfjord', 'Flåm Railway', 'Northern Lights'], insights: { season: 'Jun – Aug · Dec – Mar', duration: '6 – 9 Days', type: 'Nature & Scenery', pace: 'Exploratory' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'June–August for midnight sun, all fjord cruises running.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Fresh Bergen fish market salmon, reindeer carpaccio, cured Arctic char.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Overnight on a traditional fjord boat, kayaking under Geirangerfjord waterfalls.' }, { icon: 'Compass', title: 'Getting Around', body: 'Fly Bergen (BGO). Norway in a Nutshell combines ferry, train and bus.' }, { icon: 'Users', title: 'Ideal For', body: 'Nature enthusiasts, photographers, adventure couples.' }] },
  { id: 23, country: 'Sweden', region: 'Northern Europe', flag: '🇸🇪', category: 'city', name: 'Stockholm', tagline: 'Venice of the North, design capital', hot: false, desc: 'Spread across 14 islands, Stockholm blends Viking history with Scandi design perfection, world-class restaurants and archipelago wonder.', img: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1000&q=85', highlights: ['Gamla Stan', 'Vasa Museum', 'Stockholm Archipelago'], insights: { season: 'Jun – Aug · Dec', duration: '4 – 5 Days', type: 'Design & History', pace: 'Refined' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'June–August for long days, archipelago boat trips, and outdoor festivals.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Smörgåsbord at Operakällaren, Swedish meatballs, gravlax cured salmon.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Vasa Museum, Gamla Stan medieval island, archipelago island-hopping.' }, { icon: 'Compass', title: 'Getting Around', body: 'Excellent metro, tram and bus network.' }, { icon: 'Users', title: 'Ideal For', body: 'Design lovers, history enthusiasts, nature seekers.' }] },
  { id: 24, country: 'Hungary', region: 'Eastern Europe', flag: '🇭🇺', category: 'city', name: 'Budapest', tagline: 'Paris of the East, thermal baths paradise', hot: true, desc: 'The Parliament building reflected in the Danube, thermal baths in Belle Époque splendour, ruin bars in the Jewish Quarter.', img: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=1000&q=85', highlights: ['Parliament Building', 'Széchenyi Baths', 'Ruin Bar Crawl'], insights: { season: 'Apr – Jun · Sep – Oct', duration: '3 – 5 Days', type: 'History & Wellness', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–June: Budapest in spring bloom.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Goulash soup at Borkonyha, lángos at the Great Market Hall.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Sunset Danube cruise, private thermal bath at Gellért.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro M1 (oldest in continental Europe), M2 and M4 cover central areas.' }, { icon: 'Users', title: 'Ideal For', body: 'History lovers, spa enthusiasts, foodies and couples.' }] },
  { id: 25, country: 'Croatia', region: 'Eastern Europe', flag: '🇭🇷', category: 'beach', name: 'Dubrovnik', tagline: 'Pearl of the Adriatic, Game of Thrones', hot: true, desc: 'Walk the 2km city walls above the Adriatic, kayak sea caves, island-hop to Hvar. Dubrovnik is everything you dreamed Croatia would be.', img: 'https://images.unsplash.com/photo-1626699748984-47d6942751ca?w=1000&q=85', highlights: ['City Walls Walk', 'Lokrum Island', 'Hvar Day Trip'], insights: { season: 'May – Jun · Sep – Oct', duration: '4 – 6 Days', type: 'Coastal Culture', pace: 'Relaxed' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–June and September–October are perfect.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Black risotto, fresh oysters from the Pelješac peninsula.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Sunrise walk on city walls, Game of Thrones filming locations tour.' }, { icon: 'Compass', title: 'Getting Around', body: 'Dubrovnik Airport (DBV) is 20 mins by taxi.' }, { icon: 'Users', title: 'Ideal For', body: 'Beach and culture travellers, film enthusiasts, sailing groups.' }] },
  { id: 26, country: 'Poland', region: 'Eastern Europe', flag: '🇵🇱', category: 'city', name: 'Kraków', tagline: 'Medieval grandeur and Jewish heritage', hot: false, desc: 'Wawel Castle, Kazimierz Jewish Quarter, and one of Europe\'s most beautiful main squares. Poland\'s cultural crown jewel.', img: 'https://images.unsplash.com/photo-1562832135-14a35d25edef?w=1000&q=85', highlights: ['Wawel Castle', 'Main Market Square', 'Wieliczka Salt Mine'], insights: { season: 'Apr – Oct', duration: '3 – 4 Days', type: 'History & Heritage', pace: 'Reflective' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–October for pleasant weather and all outdoor attractions.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Pierogi at Pierogeria Starka, żurek (sour rye soup in a bread bowl).' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Wawel Royal Castle, Wieliczka Salt Mine UNESCO site.' }, { icon: 'Compass', title: 'Getting Around', body: 'Old Town is highly walkable. Trams connect all districts.' }, { icon: 'Users', title: 'Ideal For', body: 'History enthusiasts, Jewish heritage travellers, architecture lovers.' }] },
  { id: 27, country: 'Finland', region: 'Northern Europe', flag: '🇫🇮', category: 'adventure', name: 'Lapland', tagline: 'Santa, huskies and dancing auroras', hot: true, desc: 'Husky safaris, reindeer sleigh rides, glass igloos under the Northern Lights and the world\'s most magical winter experience.', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1000&q=85', highlights: ['Northern Lights', 'Husky Safari', 'Ice Hotel Stay'], insights: { season: 'Nov – Mar', duration: '4 – 7 Days', type: 'Arctic Adventure', pace: 'Magical' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'December–January for the best Northern Lights chances.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Sautéed reindeer with lingonberries, smoked rainbow trout.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Aurora borealis from a glass igloo, husky sled safari through snow-laden forest.' }, { icon: 'Compass', title: 'Getting Around', body: 'Fly to Rovaniemi, Kittilä or Ivalo from Helsinki.' }, { icon: 'Users', title: 'Ideal For', body: 'Families, adventure couples, photography enthusiasts.' }] },
  { id: 28, country: 'Denmark', region: 'Northern Europe', flag: '🇩🇰', category: 'city', name: 'Copenhagen', tagline: 'Noma, hygge and harbour magic', hot: false, desc: 'Nyhavn\'s coloured façades, Tivoli Gardens, the world\'s best restaurant scene and a cycling culture that defines sustainability.', img: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1000&q=85', highlights: ['Nyhavn Harbour', 'Tivoli Gardens', 'Louisiana Museum'], insights: { season: 'May – Sep', duration: '3 – 4 Days', type: 'Gastronomy & Design', pace: 'Hygge' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–September for the best weather and outdoor café culture.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Smørrebrød at Aamanns, Danish pastry from any bakery.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Tivoli Gardens, Nyhavn canal boat tour, cycling the entire city.' }, { icon: 'Compass', title: 'Getting Around', body: 'Copenhagen is the world\'s most bike-friendly city.' }, { icon: 'Users', title: 'Ideal For', body: 'Foodies, design lovers, sustainability enthusiasts.' }] },
  { id: 29, country: 'Slovenia', region: 'Eastern Europe', flag: '🇸🇮', category: 'mountain', name: 'Lake Bled', tagline: 'Fairy-tale island church in an alpine jewel', hot: true, desc: 'A medieval castle above a mirror lake with a tiny island church at its heart. Lake Bled belongs in a dream, not a travel itinerary.', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=85', highlights: ['Bled Island Church', 'Vintgar Gorge', 'Triglav National Park'], insights: { season: 'May – Sep', duration: '2 – 3 Days', type: 'Alpine Nature', pace: 'Peaceful' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–September for swimming, rowing and hiking.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Bled Cream Cake (kremna rezina) since 1953, fresh lake trout.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Traditional pletna boat to Bled Island, Bled Castle sunrise.' }, { icon: 'Compass', title: 'Getting Around', body: 'Fly to Ljubljana (45 mins drive) or direct buses from airport.' }, { icon: 'Users', title: 'Ideal For', body: 'Romantic couples, nature lovers, photographers.' }] },
  { id: 30, country: 'Romania', region: 'Eastern Europe', flag: '🇷🇴', category: 'adventure', name: 'Transylvania', tagline: 'Dracula\'s castles and Saxon villages', hot: false, desc: 'Bran Castle, medieval Sibiu, the Transfăgărășan highway and bear-watching in the Carpathians. Romania is Europe\'s wildest secret.', img: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=1000&q=85', highlights: ['Bran Castle', 'Sibiu Old Town', 'Transfăgărășan Drive'], insights: { season: 'May – Sep', duration: '5 – 7 Days', type: 'Gothic & Wilderness', pace: 'Adventurous' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–September for the Transfăgărășan highway to be open.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Ciorba de burtă, mici (grilled meat rolls), sarmale (stuffed cabbage).' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Bran Castle at dusk, guided bear watching, Transfăgărășan drive.' }, { icon: 'Compass', title: 'Getting Around', body: 'Self-drive is essential. Fly to Cluj-Napoca or Bucharest.' }, { icon: 'Users', title: 'Ideal For', body: 'Adventure travellers, off-the-beaten-path seekers.' }] },
]

const REGIONS = ['All Regions', 'Western Europe', 'Central Europe', 'Northern Europe', 'Eastern Europe']
const CATEGORIES = [
  { id: 'all', label: 'All Types', Icon: Globe },
  { id: 'city', label: 'City', Icon: Building2 },
  { id: 'beach', label: 'Beach', Icon: Waves },
  { id: 'mountain', label: 'Mountain', Icon: Mountain },
  { id: 'adventure', label: 'Adventure', Icon: Plane },
]
const COUNTRIES = ['All Countries', 'United Kingdom', 'Italy', 'Switzerland', 'France', 'Spain', 'Netherlands', 'Greece', 'Germany', 'Austria', 'Czech Republic', 'Portugal', 'Norway', 'Sweden', 'Hungary', 'Croatia', 'Poland', 'Finland', 'Denmark', 'Slovenia', 'Romania']

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
const HERO_IMG = DestinationHeroImg;

function Hero({ onSearch }) {
  const [query, setQuery] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '80vh',
      background: INK,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* ── Background Image ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${HERO_IMG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundRepeat: 'no-repeat',
        transform: loaded ? 'scale(1.06)' : 'scale(1.0)',
        transition: 'transform 14s ease',
        filter: 'brightness(0.88) saturate(1.1)',
      }} />

      {/* ── Overlays ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(125deg,rgba(8,6,2,.97) 0%,rgba(8,6,2,.78) 40%,rgba(8,6,2,.22) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(8,6,2,1) 0%,rgba(8,6,2,.55) 15%,transparent 45%)' }} />
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg,transparent,${G} 20%,${G2} 80%,transparent)` }} />

      {/* ── Content ── */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(6rem,14vh,9rem) clamp(1.5rem,6vw,6rem) 4rem'
      }}>
        <div style={{
          maxWidth: 820,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'none' : 'translateY(32px)',
          transition: 'opacity 1.1s ease .1s, transform 1.1s ease .1s'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg,${G},${G2})` }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: G }}>
              Premium Travel Collection
            </span>
          </div>
          <h1 style={{
            fontFamily: "Georgia,'Times New Roman',serif",
            fontSize: 'clamp(3.2rem,9vw,6.8rem)',
            fontWeight: 400,
            lineHeight: .9,
            letterSpacing: '-0.03em',
            color: '#fff',
            marginBottom: 32
          }}>
            Discover<br />
            <em style={{ fontStyle: 'italic', color: G }}>Your Journey</em>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
            <MapPin size={11} style={{ color: G2 }} />
            <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.38)' }}>
              Worldwide Destinations
            </span>
          </div>
          <p style={{
            color: 'rgba(255,255,255,.38)',
            fontSize: 'clamp(.875rem,1.5vw,1rem)',
            lineHeight: 1.95,
            maxWidth: '46ch',
            marginBottom: 44
          }}>
            Explore handpicked destinations across the world — from iconic cities to hidden gems. Your perfect journey starts here.
          </p>
        </div>
      </div>
    </section>
  );
}
/* ═══════════════════════════════════════════════════════
   INTRO SECTION — Left image, Right content
═══════════════════════════════════════════════════════ */
function IntroSection() {
  const [ref, inView] = useInView(0.06)

  const stats = [
    { number: '30+', label: 'Destinations' },
    { number: '500+', label: 'Happy Travellers' },
    { number: '10+', label: 'Years Experience' },
    { number: '98%', label: 'Satisfaction Rate' },
  ]

  return (
     <section ref={ref} style={{ background: PARCH, padding: 'clamp(4rem,8vw,6.5rem) 0', borderTop: `1px solid ${BR}` }}>
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: '0 clamp(1rem,5vw,5rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
        gap: 'clamp(2.5rem,6vw,5rem)',
        alignItems: 'center',
      }}>
 
        {/* ── LEFT: Image panel ── */}
        <div
          style={{
            position: 'relative',
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateX(-36px)',
            transition: 'opacity .9s ease, transform .9s ease',
          }}
        >
 
        <div style={{
  position: 'relative',
  zIndex: 1,
  borderRadius: 2,
  overflow: 'hidden',
  height: 'clamp(420px, 55vw, 650px)',
  background: PARCH,  // ✅ match page background so any gap is invisible
}}>
<img
  src={DestinationImg}
  alt="Chalo Holiday — explore the world"
  loading="lazy"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'contain',     // ✅ shows full image without cropping
    objectPosition: 'center',
    display: 'block',
    // No transform — no zoom, no blur, no cutoff
  }}
/>
 
         
          </div>
        </div>
 
        {/* ── RIGHT: Content panel ── */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateX(36px)',
          transition: 'opacity .9s ease .15s, transform .9s ease .15s',
        }}>
 
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1, background: G }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: G, fontFamily: 'sans-serif' }}>About Our Collection</span>
          </div>
 
          {/* Heading */}
          <h2 style={{
            fontFamily: "Georgia,'Times New Roman',serif",
            fontSize: 'clamp(1.9rem,3.8vw,3rem)',
            fontWeight: 400,
            color: INK,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            marginBottom: 24,
          }}>
            Where every journey<br />
            becomes a <em style={{ color: G }}>cherished story.</em>
          </h2>
 
          {/* Thin gold rule */}
          <div style={{ width: 64, height: 2, background: `linear-gradient(90deg,${G},${G2})`, marginBottom: 24, borderRadius: 1 }} />
 
          {/* Body paragraphs */}
          <p style={{ fontSize: 15, lineHeight: 1.9, color: SL, fontFamily: 'sans-serif', fontWeight: 300, marginBottom: 16 }}>
            At <strong style={{ fontWeight: 600, color: INK }}>Chalo Holidays</strong>, we believe that travel is more than a destination — it is a transformative experience. Our curated collection of European escapes spans 20 countries, handpicked by our expert consultants who have walked every cobblestone, tasted every local dish and watched every sunset we recommend.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: SL2, fontFamily: 'sans-serif', fontWeight: 300, marginBottom: 36 }}>
            From the fjords of Norway to the sun-drenched Amalfi Coast, from fairy-tale Prague to the eternal streets of Rome — we craft bespoke itineraries tailored precisely to your pace, your passions and your budget.
          </p>
 
          {/* Stats row */}
     
          {/* CTA buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <a
              href="#destinations"
              onClick={e => { e.preventDefault(); document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: `linear-gradient(135deg,${R},#991b1b)`,
                color: '#fff',
                fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em',
                padding: '14px 28px',
                borderRadius: 2,
                fontFamily: 'sans-serif',
                textDecoration: 'none',
                textTransform: 'uppercase',
                boxShadow: `0 8px 28px -6px ${R}44`,
              }}
            >
              Explore All Destinations <ArrowUpRight size={14} />
            </a>
           
          </div>
        </div>
 
      </div>
    </section>
  )
}
 

/* ═══════════════════════════════════════════════════════
   TOP DESTINATIONS CAROUSEL
═══════════════════════════════════════════════════════ */
const VISIBLE_COUNT = 6

function TopDestinationsCarousel({ onFilter }) {
  const [ref, inView] = useInView(0.05)
  const [paused, setPaused] = useState(false)

  const carouselDests = ALL_DESTINATIONS.filter(d => d.hot)
  // Duplicate for seamless loop
  const doubled = [...carouselDests, ...carouselDests]

  return (
    <section ref={ref} style={{ background: '#ffffff', padding: 'clamp(3.5rem,7vw,5.5rem) 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1rem,5vw,5rem)' }}>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 48,
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(20px)',
          transition: 'opacity .7s, transform .7s'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: G }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: G, fontFamily: 'sans-serif' }}>
              Handpicked for You
            </span>
            <div style={{ width: 28, height: 1, background: G }} />
          </div>
          <h2 style={{
            fontFamily: "Georgia,'Times New Roman',serif",
            fontSize: 'clamp(1.8rem,4vw,2.8rem)',
            fontWeight: 400,
            color: INK,
            letterSpacing: '-0.02em'
          }}>
            Top <em style={{ color: G }}>Destinations</em>
          </h2>
        </div>

        {/* Inject keyframes */}
        <style>{`
          @keyframes marqueeScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            gap: 28px;
            width: max-content;
            animation: marqueeScroll 28s linear infinite;
          }
          .marquee-track.paused {
            animation-play-state: paused;
          }
          .marquee-wrap {
            overflow: hidden;
            width: 100%;
          }
        `}</style>

        {/* Marquee */}
        <div
          className="marquee-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={`marquee-track${paused ? ' paused' : ''}`}>
            {doubled.map((dest, i) => (
              <TopDestItem
                key={`${dest.id}-${i}`}
                dest={dest}
                inView={inView}
                onClick={() => onFilter && onFilter(dest.region)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function TopDestItem({ dest, inView, onClick }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        width: 150,
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <div style={{
        width: 130,
        height: 130,
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${hov ? G : '#e8e8e8'}`,
        transition: 'border-color .3s, transform .3s, box-shadow .3s',
        transform: hov ? 'scale(1.06)' : 'scale(1)',
        boxShadow: hov ? `0 8px 28px ${G}33` : '0 2px 10px rgba(0,0,0,0.08)',
        flexShrink: 0,
      }}>
        <img
          src={dest.img}
          alt={dest.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            transform: hov ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform .5s ease',
          }}
        />
      </div>

      <p style={{
        fontFamily: "Georgia,'Times New Roman',serif",
        fontSize: '0.95rem',
        fontWeight: 400,
        color: hov ? G : INK,
        marginTop: 14,
        marginBottom: 4,
        textAlign: 'center',
        transition: 'color .3s',
        letterSpacing: '-0.01em',
      }}>
        {dest.name}
      </p>

     
    </div>
  )
}
/* ═══════════════════════════════════════════════════════
   ACCORDION ITEM
═══════════════════════════════════════════════════════ */
function AccordionItem({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null)
  const [height, setHeight] = useState(0)
  const IconComp = ICON_MAP[item.icon] || Sun
  useEffect(() => {
    if (bodyRef.current) setHeight(isOpen ? bodyRef.current.scrollHeight : 0)
  }, [isOpen])
  return (
    <div style={{ borderBottom: `1px solid ${BR}` }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '11px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: isOpen ? G : G3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s' }}>
            <IconComp size={11} color={isOpen ? '#fff' : G} />
          </div>
          <span style={{ fontFamily: 'sans-serif', fontSize: 11, fontWeight: 600, color: isOpen ? G : SL, letterSpacing: '0.04em', transition: 'color 0.3s' }}>{item.title}</span>
        </div>
        <ChevronDown size={12} color={isOpen ? G : SL2} style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
      </button>
      <div style={{ height, overflow: 'hidden', transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
        <div ref={bodyRef} style={{ paddingBottom: 12, paddingLeft: 33 }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: SL2, lineHeight: 1.85, fontWeight: 300 }}>{item.body}</p>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   DESTINATION CARD
═══════════════════════════════════════════════════════ */
function DestCard({ dest, index, inView }) {
  const [hov, setHov] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [openAcc, setOpenAcc] = useState(null)
  const delay = `${(index % 6) * 70}ms`

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: CARD,
        borderTop: `2px solid ${hov ? G : BR2}`,
        borderLeft: `1px solid ${BR}`,
        borderRight: `1px solid ${BR}`,
        borderBottom: `1px solid ${BR}`,
        overflow: 'hidden',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(44px)',
        transition: `opacity .7s ease ${delay}, transform .7s ease ${delay}, border-top-color .3s, box-shadow .3s`,
        boxShadow: hov ? `0 24px 64px -16px rgba(184,134,11,.18), 0 4px 16px -4px rgba(0,0,0,.08)` : `0 2px 16px -4px rgba(92,79,58,.07)`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', flexShrink: 0, height: 'clamp(220px,28vw,340px)' }}>
        <img src={dest.img} alt={dest.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov ? 'scale(1.07)' : 'scale(1.01)', transition: 'transform 1.1s cubic-bezier(.4,0,.2,1)', filter: `brightness(${hov ? '0.72' : '0.82'}) saturate(1.08)` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(8,6,2,.72) 0%,rgba(8,6,2,.18) 50%,transparent 80%)' }} />
        <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(8,6,2,.70)', backdropFilter: 'blur(10px)', borderRadius: 20, padding: '4px 11px 4px 8px', border: '1px solid rgba(255,255,255,.12)' }}>
          <span style={{ fontSize: 14 }}>{dest.flag}</span>
          <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,.82)', fontFamily: 'sans-serif', letterSpacing: '0.1em' }}>{dest.country}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 14, right: 14 }}>
          <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', fontFamily: 'sans-serif' }}>{dest.region}</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'clamp(18px,3vw,26px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: G, fontFamily: 'sans-serif' }}>{CATEGORIES.find(c => c.id === dest.category)?.label || dest.category}</span>
          <span style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: '0.12em', color: SL2, fontFamily: 'sans-serif' }}>{dest.insights.pace}</span>
        </div>
        <h3 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.4rem,2.5vw,1.75rem)', fontWeight: 400, color: INK, lineHeight: 1.08, marginBottom: 6, letterSpacing: '-0.015em' }}>{dest.name}</h3>
        <p style={{ fontSize: 9.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: SL2, fontFamily: 'sans-serif', marginBottom: 16 }}>{dest.tagline}</p>
        <div style={{ height: 1, background: `linear-gradient(90deg,${G}80,${BR},transparent)`, marginBottom: 16 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[{ label: 'Season', val: dest.insights.season }, { label: 'Duration', val: dest.insights.duration }, { label: 'Type', val: dest.insights.type }, { label: 'Pace', val: dest.insights.pace }].map(ins => (
            <div key={ins.label} style={{ background: G3, border: `1px solid ${G}28`, padding: '7px 10px', borderRadius: 2 }}>
              <span style={{ display: 'block', fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.2em', color: G, fontFamily: 'sans-serif', marginBottom: 3 }}>{ins.label}</span>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: SL, fontFamily: 'sans-serif', lineHeight: 1.2 }}>{ins.val}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12.5, lineHeight: 1.85, color: SL2, fontWeight: 300, fontFamily: 'sans-serif', marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{dest.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
          {dest.highlights.map(h => (
            <span key={h} style={{ fontSize: 9, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: 'rgba(184,134,11,.09)', color: G, border: `1px solid ${G}30`, fontFamily: 'sans-serif' }}>{h}</span>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid ${expanded ? G + '55' : BR}`, borderRadius: 2, overflow: 'hidden', marginBottom: 0, transition: 'border-color .3s' }}>
          <button onClick={() => { setExpanded(e => !e); if (!expanded) setOpenAcc(null) }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: expanded ? G3 : '#fff', border: 'none', cursor: 'pointer', transition: 'background .3s', borderBottom: expanded ? `1px solid ${G}22` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: expanded ? G : BR2, transition: 'background .3s' }} />
              <span style={{ fontFamily: 'sans-serif', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: expanded ? G : SL2 }}>{expanded ? 'Less Info' : 'Know More'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 9, color: SL2, fontFamily: 'sans-serif' }}>{expanded ? 'Collapse' : `${dest.accordion.length} topics`}</span>
              <ChevronDown size={12} color={expanded ? G : SL2} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .35s' }} />
            </div>
          </button>
          <div style={{ maxHeight: expanded ? 1000 : 0, overflow: 'hidden', transition: 'max-height .5s cubic-bezier(.4,0,.2,1)' }}>
            <div style={{ padding: '4px 14px 12px' }}>
              {dest.accordion.map((item, i) => (
                <AccordionItem key={i} item={item} isOpen={openAcc === i} onToggle={() => setOpenAcc(p => p === i ? null : i)} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 18, paddingTop: 16, borderTop: `1px solid ${BR}` }}>
          <a href="#inquiry" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: `linear-gradient(135deg,${R},#991b1b)`, color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', padding: '13px 16px', borderRadius: 2, fontFamily: 'sans-serif', textDecoration: 'none', textTransform: 'uppercase', boxShadow: hov ? `0 8px 24px -6px ${R}55` : 'none', transition: 'box-shadow .3s' }}>
            Enquire Now <ArrowUpRight size={13} />
          </a>
          <a href={`tel:+442030049978`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 2, background: G3, border: `1px solid ${G}40`, textDecoration: 'none', flexShrink: 0 }}>
            <Phone size={15} style={{ color: G }} />
          </a>
        </div>
      </div>
    </article>
  )
}

/* ═══════════════════════════════════════════════════════
   DESTINATIONS SECTION
═══════════════════════════════════════════════════════ */
function DestinationsSection({ initSearch, initRegion }) {
  const [ref, inView] = useInView(0.03)
  const [category, setCategory] = useState('all')
  const [region, setRegion] = useState(initRegion || 'All Regions')
  const [country, setCountry] = useState('All Countries')
  const [searchQ, setSearchQ] = useState(initSearch || '')
  const [sortBy, setSortBy] = useState('popular')
  const [page, setPage] = useState(1)
  const PER_PAGE = 9

  useEffect(() => { if (initRegion) setRegion(initRegion) }, [initRegion])
  useEffect(() => { if (initSearch !== undefined) setSearchQ(initSearch) }, [initSearch])

  const filtered = useMemo(() => {
    return ALL_DESTINATIONS.filter(d => {
      if (category !== 'all' && d.category !== category) return false
      if (region !== 'All Regions' && d.region !== region) return false
      if (country !== 'All Countries' && d.country !== country) return false
      if (searchQ && !`${d.name} ${d.country} ${d.region} ${d.tagline}`.toLowerCase().includes(searchQ.toLowerCase())) return false
      return true
    }).sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : (b.hot ? 1 : 0) - (a.hot ? 1 : 0))
  }, [category, region, country, searchQ, sortBy])

  const shown = filtered.slice(0, page * PER_PAGE)
  const hasMore = shown.length < filtered.length

  const activeFilters = [
    region !== 'All Regions' && region,
    country !== 'All Countries' && country,
    searchQ && `"${searchQ}"`,
    category !== 'all' && CATEGORIES.find(c => c.id === category)?.label,
  ].filter(Boolean)

  return (
    <section id="destinations" ref={ref} style={{ background: PARCH, padding: 'clamp(4rem,8vw,6rem) 0', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(184,134,11,.18) 1px,transparent 1px)`, backgroundSize: '32px 32px', pointerEvents: 'none', opacity: .45 }} />
      <div style={{ position: 'relative', maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1rem,5vw,5rem)' }}>
        <div style={{ marginBottom: 40, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'opacity .7s, transform .7s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 28, height: 1, background: G }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: G, fontFamily: 'sans-serif' }}>The Collection</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 32 }}>
            <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2rem,5vw,3.4rem)', fontWeight: 400, color: INK, letterSpacing: '-0.025em', lineHeight: 1 }}>
              Find your perfect <em style={{ color: G }}>escape.</em>
            </h2>
            <span style={{ fontSize: 13, color: SL2, fontFamily: 'sans-serif', paddingBottom: 4 }}>{filtered.length} destination{filtered.length !== 1 ? 's' : ''} found</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 200, maxWidth: 300 }}>
              <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: SL2, pointerEvents: 'none' }} />
              <input value={searchQ} onChange={e => { setSearchQ(e.target.value); setPage(1) }} placeholder="Search destinations…" style={{ width: '100%', background: '#fff', border: `1px solid ${searchQ ? G + '88' : BR2}`, borderRadius: 2, padding: '10px 32px 10px 36px', fontSize: 13, color: INK, fontFamily: 'sans-serif', boxSizing: 'border-box', outline: 'none', transition: 'border-color .3s' }} />
              {searchQ && <X size={11} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: SL2, cursor: 'pointer' }} onClick={() => setSearchQ('')} />}
            </div>
            <select value={region} onChange={e => { setRegion(e.target.value); setPage(1) }} style={{ flex: '1 1 160px', minWidth: 150, background: '#fff', border: `1px solid ${BR2}`, borderRadius: 2, padding: '10px 32px 10px 14px', fontSize: 13, color: SL, fontFamily: 'sans-serif', cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%239C8B78' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', outline: 'none' }}>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
            <select value={country} onChange={e => { setCountry(e.target.value); setPage(1) }} style={{ flex: '1 1 160px', minWidth: 150, background: '#fff', border: `1px solid ${BR2}`, borderRadius: 2, padding: '10px 32px 10px 14px', fontSize: 13, color: SL, fontFamily: 'sans-serif', cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%239C8B78' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', outline: 'none' }}>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ flex: '1 1 140px', minWidth: 140, background: '#fff', border: `1px solid ${BR2}`, borderRadius: 2, padding: '10px 32px 10px 14px', fontSize: 13, color: SL, fontFamily: 'sans-serif', cursor: 'pointer', marginLeft: 'auto', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%239C8B78' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', outline: 'none' }}>
              <option value="popular">Most Popular</option>
              <option value="name">A – Z</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {CATEGORIES.map(({ id, label, Icon }) => {
              const active = category === id
              return (
                <button key={id} onClick={() => { setCategory(id); setPage(1) }} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 16px', background: active ? G : '#fff', border: `1px solid ${active ? G : BR2}`, borderRadius: 2, color: active ? '#fff' : SL, fontSize: 11.5, fontWeight: active ? 700 : 400, fontFamily: 'sans-serif', cursor: 'pointer', boxShadow: active ? `0 4px 16px -4px ${G}55` : 'none', transition: 'all .25s' }}>
                  <Icon size={12} style={{ color: active ? 'rgba(255,255,255,.7)' : SL2 }} />
                  {label}
                </button>
              )
            })}
          </div>
          {activeFilters.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginTop: 10 }}>
              <span style={{ fontSize: 10.5, color: SL2, fontFamily: 'sans-serif' }}>Active:</span>
              {activeFilters.map(f => (
                <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 600, padding: '3px 10px', background: G3, color: G, border: `1px solid ${G}40`, borderRadius: 20, fontFamily: 'sans-serif' }}>
                  {f}
                  <X size={9} style={{ cursor: 'pointer' }} onClick={() => {
                    if (f === region) setRegion('All Regions')
                    else if (f === country) setCountry('All Countries')
                    else if (f.startsWith('"')) setSearchQ('')
                    else setCategory('all')
                  }} />
                </span>
              ))}
              <button onClick={() => { setCategory('all'); setRegion('All Regions'); setCountry('All Countries'); setSearchQ('') }} style={{ fontSize: 10.5, color: R, fontFamily: 'sans-serif', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Clear all</button>
            </div>
          )}
        </div>
        {shown.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,320px),1fr))', gap: 'clamp(16px,2.5vw,28px)', opacity: inView ? 1 : 0, transition: 'opacity .7s ease .15s' }}>
            {shown.map((dest, i) => <DestCard key={dest.id} dest={dest} index={i} inView={inView} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ fontFamily: "Georgia,serif", fontSize: '1.8rem', color: SL2, marginBottom: 10 }}>No destinations found.</p>
            <p style={{ fontSize: 13, color: SL2, fontFamily: 'sans-serif', marginBottom: 24 }}>Try adjusting your filters or search term.</p>
            <button onClick={() => { setCategory('all'); setRegion('All Regions'); setCountry('All Countries'); setSearchQ('') }} style={{ background: `linear-gradient(135deg,${R},#991b1b)`, color: '#fff', border: 'none', borderRadius: 2, padding: '13px 28px', fontSize: 11.5, fontWeight: 700, fontFamily: 'sans-serif', cursor: 'pointer', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Clear All Filters</button>
          </div>
        )}
        {hasMore && (
          <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
            <div style={{ height: 1, flex: 1, maxWidth: 100, background: `linear-gradient(90deg,transparent,${G}66)` }} />
            <button onClick={() => setPage(p => p + 1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: `linear-gradient(135deg,${R},#991b1b)`, color: '#fff', border: 'none', borderRadius: 2, padding: '14px 32px', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif', boxShadow: `0 12px 36px -8px ${R}55` }}>
              Load More Destinations <ChevronRight size={14} />
            </button>
            <div style={{ height: 1, flex: 1, maxWidth: 100, background: `linear-gradient(90deg,${G}66,transparent)` }} />
          </div>
        )}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   WHY SECTION
═══════════════════════════════════════════════════════ */
const WHY_ITEMS = [
  { icon: 'Camera', title: 'Expert-Verified Stays', body: 'Our consultants personally visit every destination we recommend — we inspect hotels, walk the routes, taste the restaurants.' },
  { icon: 'Compass', title: 'Bespoke Itineraries', body: 'No two journeys are the same. Every trip is crafted to your preferences, pace and budget — unlimited revisions.' },
  { icon: 'Users', title: '24/7 On-Ground Support', body: 'From the moment you depart to your return flight — we\'re one call away. Real people, real answers, always.' },
  { icon: 'Sun', title: 'Transparent Pricing', body: 'No hidden fees, no pressure tactics. You see exactly what you pay for — and we always match or beat market rates.' },
]

function WhySection() {
  const [ref, inView] = useInView(0.06)
  return (
    <section ref={ref} style={{ background: '#fff', padding: 'clamp(4rem,7vw,6rem) 0', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1rem,5vw,5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, opacity: inView ? 1 : 0, transition: 'opacity .7s, transform .7s', transform: inView ? 'none' : 'translateY(20px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{ width: 28, height: 1, background: G }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: G, fontFamily: 'sans-serif' }}>Why Chalo Holidays</span>
            <div style={{ width: 28, height: 1, background: G }} />
          </div>
          <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 400, color: INK, letterSpacing: '-0.02em' }}>
            Crafted with <em style={{ color: G }}>passion,</em> delivered with <em style={{ color: G }}>precision.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,240px),1fr))', gap: 24 }}>
          {WHY_ITEMS.map(({ icon, title, body }, i) => {
            const [hov, setHov] = useState(false)
            const I = ICON_MAP[icon] || Sun
            return (
              <div key={title} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ padding: '28px 24px', border: `1px solid ${hov ? G + '66' : BR}`, borderTop: `2px solid ${hov ? G : BR2}`, background: hov ? G3 : CARD, transition: 'all .3s', cursor: 'default', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transitionDelay: `${i * 80}ms` }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: hov ? `${G}22` : PARCH, border: `1px solid ${hov ? G + '55' : BR2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, transition: 'all .3s' }}>
                  <I size={18} style={{ color: hov ? G : SL2, strokeWidth: 1.5, transition: 'color .3s' }} />
                </div>
                <h3 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: '1rem', fontWeight: 400, color: INK, marginBottom: 10, letterSpacing: '-0.01em' }}>{title}</h3>
                <p style={{ fontSize: 12.5, lineHeight: 1.8, color: SL2, fontFamily: 'sans-serif', fontWeight: 300 }}>{body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════════ */
export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState('All Regions')

  const scrollToGrid = () => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
  const handleSearch = (q) => { setSearchQuery(q); scrollToGrid() }
  const handleRegionFilter = (region) => { setRegionFilter(region); scrollToGrid() }

  return (
    <div style={{ fontFamily: 'sans-serif', background: PARCH }}>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0 }
        input, select, button { outline:none }
        ::-webkit-scrollbar { width:6px; height:6px }
        ::-webkit-scrollbar-track { background:${PARCH} }
        ::-webkit-scrollbar-thumb { background:${G}; border-radius:3px }
        @media (max-width:900px) {
          .top-dest-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width:580px) {
          .top-dest-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dest-grid { grid-template-columns: 1fr !important }
        }
      `}</style>
      <Navbar />
      <Hero onSearch={handleSearch} />
      {/* ── INTRO SECTION — left image, right content ── */}
      <IntroSection />
      {/* ── TOP DESTINATIONS CAROUSEL ── */}
      <TopDestinationsCarousel onFilter={handleRegionFilter} />
      <WhySection />
      <DestinationsSection initSearch={searchQuery} initRegion={regionFilter} />
      <Footer />
    </div>
  )
}