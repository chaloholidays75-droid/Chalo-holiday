'use client'
import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import {
  MapPin, ArrowUpRight, ChevronDown, Search, X,
  ChevronRight, Globe, Waves, Mountain, Building2, Plane,
  Sun, Utensils, Camera, Compass, Users, ArrowRight,
  Phone, Star, ChevronLeft, Calendar, Clock
} from "lucide-react"
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import DestinationHeroImg from '../assets/destination/destination-page.jpg'
import DestinationImg from '../assets/destination/destination-page.webp'
// IMPORT DESTINATION IMAGES
import AmalfiCoastImg from '../assets/destination/Amalfi Coast-img.avif'
import AmsterdamImg from '../assets/destination/Amsterdam-img.jpg'
import AthensImg from '../assets/destination/Athens-img.jpg'
import BarcelonaImg from '../assets/destination/barcelonaimg.avif'
import BergenFjordsImg from '../assets/destination/Bergen & Fjords-img.jpg'
import BerlinImg from '../assets/destination/berlin.jpg'
import BudapestImg from '../assets/destination/Budapest-img.avif'
import CopenhagenImg from '../assets/destination/Copenhagen-img.avif'
import DublinImg from '../assets/destination/Dublin-img.avif'
import DubrovnikImg from '../assets/destination/Dubrovnik-img.avif'
import EdinburghImg from '../assets/destination/Edinburgh-img.jpg'
import FlorenceImg from '../assets/destination/Florence-img.avif'
import FrenchRivieraImg from '../assets/destination/French Riviera-img.avif'
import GreeceImg from '../assets/destination/greece-img.webp'
import InterlakenImg from '../assets/destination/Interlaken-img.avif'
import InterlakeniImg from '../assets/destination/Interlakeni-img.jpg'
import KrakowImg from '../assets/destination/Kraków-img.avif'
import LakeBledImg from '../assets/destination/Lake Bled-img.avif'
import LaplandImg from '../assets/destination/Lapland-img.webp'
import LisbonImg from '../assets/destination/Lisbon-img.avif'
import LondonImg from '../assets/destination/london-img.jpeg'
import MadridImg from '../assets/destination/Madrid-img.avif'
import OsloImg from '../assets/destination/oslo-norway.jpg'
import ParisFranceImg from '../assets/destination/paris-france.webp'
import ParisImg from '../assets/destination/paris-img.webp'
import PragueImg from '../assets/destination/Prague-img.avif'
import RomeImg from '../assets/destination/Rome-img.webp'
import ScottishHighlandsImg from '../assets/destination/Scottish Highlands-img.jpg'
import SpainImg from '../assets/destination/spain-img.avif'
import SpainImg2 from '../assets/destination/spain-img.jpg'
import StockholmImg from '../assets/destination/Stockholm-img.jpg'
import TransylvaniaImg from '../assets/destination/Transylvania-img.avif'
import VeniceImg from '../assets/destination/Venice-img.avif'
import ViennaImg from '../assets/destination/Vienna-img.avif'
import WarsawImg from '../assets/destination/Warsaw.avif'
import ZermattImg from '../assets/destination/Zermatt-img.avif'
import SantoriniImg from '../assets/destination/greece-img.webp'
const RED    = '#D91B1B'
const RED2   = '#B01515'
const G      = '#F5A800'
const G2     = '#C8880A'
const G3     = '#FAEEDA'
const INK    = '#2D2D2D'
const PARCH  = '#FAFAF5'
const CARD   = '#FFFFFF'
const SL     = '#4A4A4A'
const SL2    = '#8A8A8A'
const BR     = '#E8E8E4'
const BR2    = '#D4D4CC'

const ICON_MAP = { Sun, Utensils, Camera, Compass, Users }

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

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return width
}

const ALL_DESTINATIONS = [
  { id: 1, country: 'United Kingdom', region: 'Western Europe', flag: '🇬🇧', category: 'city', name: 'London', tagline: 'Royal heritage meets modern edge', hot: true, desc: 'Buckingham Palace, the Thames, world-class museums, Michelin stars and electric nightlife — London never runs out of surprises.', img: LondonImg , highlights: ['Buckingham Palace', 'West End Shows', 'Borough Market'], insights: { season: 'Apr – Jun · Sep – Oct', duration: '5 – 7 Days', type: 'Culture & History', pace: 'Energetic' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–June for blooming parks and mild weather. September–October for arts season.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Afternoon tea at Claridge\'s, Scotch egg at Fortnum & Mason, modern British tasting menu at The Ledbury.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Tower of London tour, West End show with backstage access, Thames sunset dinner cruise.' }, { icon: 'Compass', title: 'Getting Around', body: 'The Tube is your best friend — use Oyster or contactless. Heathrow Express to Paddington in 15 mins.' }, { icon: 'Users', title: 'Ideal For', body: 'First-time European travellers, theatre lovers, shoppers and royal heritage enthusiasts.' }] },
  { id: 2, country: 'United Kingdom', region: 'Western Europe', flag: '🇬🇧', category: 'city', name: 'Edinburgh', tagline: 'Castle on volcanic rock, whisky in hand', hot: false, desc: 'Scotland\'s dramatic capital — a medieval Old Town, an imposing castle, and the annual Fringe Festival that transforms the city.', img: EdinburghImg, highlights: ['Edinburgh Castle', 'Royal Mile', 'Scotch Whisky Trail'], insights: { season: 'May – Sep', duration: '3 – 4 Days', type: 'Heritage & Culture', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'August is Edinburgh Festival Fringe — the world\'s largest arts festival.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Haggis at The Witchery, Cullen Skink at The Shore in Leith.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Dawn walk on Arthur\'s Seat for panoramic views, private castle ghost tour.' }, { icon: 'Compass', title: 'Getting Around', body: 'Edinburgh Old Town and New Town are highly walkable.' }, { icon: 'Users', title: 'Ideal For', body: 'History enthusiasts, whisky lovers, arts and festival seekers.' }] },
  { id: 3, country: 'United Kingdom', region: 'Western Europe', flag: '🇬🇧', category: 'mountain', name: 'Scottish Highlands', tagline: 'Untamed wilderness and ancient lochs', hot: true, desc: 'Misty glens, brooding mountains, shimmering lochs and Hogwarts-esque viaducts. The Highlands are pure raw Scotland.', img: ScottishHighlandsImg, highlights: ['Loch Ness', 'Glencoe Valley', 'Glenfinnan Viaduct'], insights: { season: 'May – Sep', duration: '4 – 6 Days', type: 'Nature & Wilderness', pace: 'Exploratory' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–September for the best weather and long daylight hours.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Fresh venison and Highland beef, smoked salmon from a lochside smokehouse.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Jacobite Steam Train (Hogwarts Express), Loch Ness boat cruise, Glen Coe sunset hike.' }, { icon: 'Compass', title: 'Getting Around', body: 'Self-drive is essential — hire a car in Inverness or Edinburgh.' }, { icon: 'Users', title: 'Ideal For', body: 'Nature lovers, photographers, adventure seekers.' }] },
  { id: 4, country: 'United Kingdom', region: 'Western Europe', flag: '🇬🇧', category: 'city', name: 'Dublin', tagline: 'Pubs, history and Celtic warmth', hot: false, desc: 'Temple Bar\'s lively pubs, Trinity College\'s Book of Kells, and the warmest welcomes you\'ll find anywhere in Europe.', img: DublinImg, highlights: ['St Patrick\'s Cathedral', 'Guinness Storehouse', 'Cliffs of Moher'], insights: { season: 'Apr – Oct', duration: '3 – 4 Days', type: 'City & Coastal', pace: 'Lively' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–October for milder weather and all attractions open.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Irish stew at The Old Storehouse, Guinness at the source.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Book of Kells at Trinity College, Cliffs of Moher on the Wild Atlantic Way.' }, { icon: 'Compass', title: 'Getting Around', body: 'Dublin city centre is walkable. DART rail for coastal suburbs.' }, { icon: 'Users', title: 'Ideal For', body: 'History lovers, pub culture enthusiasts, families.' }] },
  { id: 5, country: 'Italy', region: 'Central Europe', flag: '🇮🇹', category: 'city', name: 'Rome', tagline: 'Eternal city, infinite layers of history', hot: true, desc: 'Colosseum, Vatican City, Trevi Fountain — and the world\'s finest gelato. Rome is 3,000 years of civilisation in one city.', img: RomeImg, highlights: ['Colosseum', 'Vatican Museums', 'Trastevere Walk'], insights: { season: 'Mar – Jun · Sep – Oct', duration: '5 – 7 Days', type: 'Cultural Immersion', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'Spring (March–June) offers mild weather and fewer crowds.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Carbonara at Roscioli, supplì at Supplì Roma, Aperol Spritz in Campo de\' Fiori.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Colosseum arena floor at dawn, Vatican after-hours tour.' }, { icon: 'Compass', title: 'Getting Around', body: 'Rome rewards walkers. Use taxis for longer trips.' }, { icon: 'Users', title: 'Ideal For', body: 'Culture seekers, history enthusiasts, honeymooners.' }] },
  { id: 6, country: 'Italy', region: 'Central Europe', flag: '🇮🇹', category: 'beach', name: 'Amalfi Coast', tagline: 'La dolce vita on dramatic limestone cliffs', hot: true, desc: 'Pastel villages cascade down cliffs into turquoise Tyrrhenian waters. Positano, Ravello, Capri — pure southern Italian magic.', img: AmalfiCoastImg, highlights: ['Positano', 'Capri Day Trip', 'Ravello Gardens'], insights: { season: 'May – Oct', duration: '5 – 8 Days', type: 'Coastal Luxury', pace: 'Indulgent' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–June is perfect: warm seas, flowers in bloom, roads manageable.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Fresh scialatielli alle vongole, limoncello from Sfusato lemons.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private boat hire along the coastline, Blue Grotto at Capri by kayak.' }, { icon: 'Compass', title: 'Getting Around', body: 'Ferry between towns is the sanest option in high season.' }, { icon: 'Users', title: 'Ideal For', body: 'Romantics, luxury seekers, food lovers.' }] },
  { id: 7, country: 'Italy', region: 'Central Europe', flag: '🇮🇹', category: 'city', name: 'Venice', tagline: 'Floating city of canals and golden domes', hot: false, desc: 'No cars, no roads — just 177 canals, 400 bridges and a labyrinth of calli leading to Piazza San Marco and beyond.', img: VeniceImg, highlights: ['Grand Canal', 'St Mark\'s Basilica', 'Murano Glass'], insights: { season: 'Mar – May · Oct – Nov', duration: '3 – 4 Days', type: 'Romance & Art', pace: 'Slow' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'March–May and October–November avoid peak summer crowds.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Cicchetti at bacaro bars in Cannaregio, fresh bigoli in salsa.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Dawn gondola ride on empty canals, private glassblowing on Murano.' }, { icon: 'Compass', title: 'Getting Around', body: 'Vaporetto (water bus) is the main public transport.' }, { icon: 'Users', title: 'Ideal For', body: 'Romantics, art lovers, photographers.' }] },
  { id: 8, country: 'Italy', region: 'Central Europe', flag: '🇮🇹', category: 'city', name: 'Florence', tagline: 'Renaissance perfection at every corner', hot: false, desc: 'Michelangelo\'s David, the Uffizi Gallery, Brunelleschi\'s dome. Florence is where art, architecture and Chianti unite.', img: FlorenceImg, highlights: ['Uffizi Gallery', 'Duomo Cathedral', 'Ponte Vecchio'], insights: { season: 'Apr – Jun · Sep – Oct', duration: '3 – 4 Days', type: 'Art & Renaissance', pace: 'Cultural' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–June and September–October offer ideal weather.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Bistecca alla Fiorentina at Buca Mario, ribollita at Trattoria Mario.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Uffizi Gallery early-morning tour, Michelangelo\'s David.' }, { icon: 'Compass', title: 'Getting Around', body: 'Florence historic centre is entirely walkable.' }, { icon: 'Users', title: 'Ideal For', body: 'Art and architecture lovers, food and wine enthusiasts.' }] },
  { id: 9, country: 'Switzerland', region: 'Central Europe', flag: '🇨🇭', category: 'mountain', name: 'Interlaken', tagline: 'Alpine adventure between two glacial lakes', hot: true, desc: 'Flanked by Lake Thun and Lake Brienz, Interlaken is the gateway to the Bernese Oberland — Europe\'s most spectacular mountain arena.', img: InterlakenImg, highlights: ['Jungfrau Top of Europe', 'Paragliding', 'Lauterbrunnen Valley'], insights: { season: 'Jun – Sep · Dec – Mar', duration: '3 – 5 Days', type: 'Adventure & Nature', pace: 'Active' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'Summer (June–September) for hiking, paragliding and lake swimming.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Swiss cheese fondue at Chäsi Hofstetten in Grindelwald.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Sunrise at Jungfraujoch "Top of Europe" (3,454m), tandem paraglide.' }, { icon: 'Compass', title: 'Getting Around', body: 'Swiss Travel Pass covers trains, buses and most mountain railways.' }, { icon: 'Users', title: 'Ideal For', body: 'Adventure enthusiasts, families with teenagers, ski groups.' }] },
  { id: 10, country: 'Switzerland', region: 'Central Europe', flag: '🇨🇭', category: 'mountain', name: 'Zermatt', tagline: 'Beneath the iconic Matterhorn', hot: false, desc: 'Car-free alpine village, ski runs for all levels, and the most photographed peak in the Alps. Pure Swiss luxury.', img: ZermattImg, highlights: ['Matterhorn Views', 'Glacier Paradise', 'Gornergrat Railway'], insights: { season: 'Dec – Apr · Jul – Sep', duration: '3 – 5 Days', type: 'Luxury Alpine', pace: 'Relaxed' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'December–April for world-class skiing with Matterhorn views.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Käseschnitte at a mountain hut, raclette by the fire.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Gornergrat cogwheel railway sunrise, Glacier Paradise at 3,883m.' }, { icon: 'Compass', title: 'Getting Around', body: 'No private cars — arrive by train from Visp or Täsch.' }, { icon: 'Users', title: 'Ideal For', body: 'Luxury ski travellers, alpine wellness seekers, photographers.' }] },
  { id: 11, country: 'France', region: 'Western Europe', flag: '🇫🇷', category: 'city', name: 'Paris', tagline: 'City of light, love and haute cuisine', hot: true, desc: 'Eiffel Tower at golden hour, the Louvre\'s endless halls, Seine-side strolls and café culture that invented the phrase joie de vivre.', img: ParisImg, highlights: ['Eiffel Tower', 'Louvre Museum', 'Versailles Day Trip'], insights: { season: 'Apr – Jun · Sep – Oct', duration: '5 – 7 Days', type: 'Art & Romance', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–June: Paris in bloom. September–October: golden light on Haussmann boulevards.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Croissant from Du Pain et des Idées, steak frites at Le Relais de l\'Entrecôte.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Louvre after-hours tour, sunset champagne on a Seine river boat.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro is fast, cheap and covers everything. RER B to CDG Airport.' }, { icon: 'Users', title: 'Ideal For', body: 'First-time European travellers, honeymooners, art lovers.' }] },
  { id: 12, country: 'France', region: 'Western Europe', flag: '🇫🇷', category: 'beach', name: 'French Riviera', tagline: 'Azure coast, yachts and sun-soaked glamour', hot: false, desc: 'Cannes, Nice, Monaco — the Côte d\'Azur has been luring royalty and celebrities for over a century. Crystal water, rosé, repeat.', img: FrenchRivieraImg, highlights: ['Nice Old Town', 'Monaco', 'Cannes Croisette'], insights: { season: 'May – Sep', duration: '5 – 7 Days', type: 'Coastal Glamour', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–June for warm weather without peak-summer crowds.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Socca in Nice\'s Cours Saleya market, bouillabaisse in Marseille.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Day trip to Monaco, perfume workshop in Grasse, private yacht charter.' }, { icon: 'Compass', title: 'Getting Around', body: 'Nice Côte d\'Azur Airport is the hub. Scenic coastal railway.' }, { icon: 'Users', title: 'Ideal For', body: 'Luxury leisure travellers, beach and culture combiners.' }] },
  { id: 13, country: 'Spain', region: 'Western Europe', flag: '🇪🇸', category: 'city', name: 'Barcelona', tagline: 'Gaudí, beaches and electric nightlife', hot: true, desc: 'Sagrada Família, Park Güell, Las Ramblas and Barceloneta beach — Barcelona packs an extraordinary amount of magic per square mile.', img: BarcelonaImg, highlights: ['Sagrada Família', 'Park Güell', 'Gothic Quarter'], insights: { season: 'Apr – Jun · Sep – Nov', duration: '4 – 6 Days', type: 'Architecture & Beach', pace: 'Vibrant' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–June and September–November: warm without crushing July–August heat.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Pan con tomate, patatas bravas at Bar Tomàs, paella at La Mar Salada.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Guided Gaudí architecture trail, flamenco in the Gothic Quarter.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro L2, L3, L4 cover all key areas. Aerobus from El Prat Airport.' }, { icon: 'Users', title: 'Ideal For', body: 'Architecture enthusiasts, beach lovers, foodies, couples.' }] },
  { id: 14, country: 'Spain', region: 'Western Europe', flag: '🇪🇸', category: 'city', name: 'Madrid', tagline: 'Art, tapas and royal grandeur', hot: false, desc: 'The Prado, the Reina Sofía, Retiro Park and a tapas culture that begins at midnight. Madrid lives life at full volume.', img: MadridImg, highlights: ['Prado Museum', 'Retiro Park', 'Plaza Mayor'], insights: { season: 'Mar – Jun · Sep – Nov', duration: '3 – 5 Days', type: 'Art & Gastronomy', pace: 'Energetic' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'March–June and September–November for pleasant temperatures.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Churros con chocolate at San Ginés, cocido madrileño at La Bola.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Golden Triangle of Art (Prado, Thyssen, Reina Sofía), Retiro Park.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro system is excellent and very affordable.' }, { icon: 'Users', title: 'Ideal For', body: 'Art lovers, foodies, night owls and culture seekers.' }] },
  { id: 15, country: 'Netherlands', region: 'Western Europe', flag: '🇳🇱', category: 'city', name: 'Amsterdam', tagline: 'Canals, cycling and golden age art', hot: true, desc: 'Golden age canal houses, Van Gogh and Rembrandt, Anne Frank House, and a cycling culture that puts the world to shame.', img: AmsterdamImg, highlights: ['Rijksmuseum', 'Anne Frank House', 'Canal Cruise'], insights: { season: 'Apr – May · Sep – Oct', duration: '3 – 4 Days', type: 'Art & Canal Culture', pace: 'Relaxed' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–May: tulip season at Keukenhof gardens.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Raw herring from a street stall, stroopwafel, Indonesian rijsttafel.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Rijksmuseum early morning tour, Anne Frank House.' }, { icon: 'Compass', title: 'Getting Around', body: 'Rent a bike — Amsterdam was built for cycling.' }, { icon: 'Users', title: 'Ideal For', body: 'Art lovers, history enthusiasts, cyclists.' }] },
  { id: 16, country: 'Greece', region: 'Central Europe', flag: '🇬🇷', category: 'beach', name: 'Santorini', tagline: 'Caldera views and infinite blue domes', hot: true, desc: 'White-washed Cycladic architecture perched above a volcanic caldera. Santorini\'s sunsets from Oia remain the world\'s most celebrated.', img: SantoriniImg, highlights: ['Oia Sunset Walk', 'Akrotiri Ruins', 'Caldera Boat Tour'], insights: { season: 'May – Sep', duration: '4 – 6 Days', type: 'Leisure & Romance', pace: 'Relaxed' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–June and September offer the sweet spot.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Fresh seafood at Selene, local Assyrtiko white wine.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private sailing catamaran at sunset, helicopter transfer from Athens.' }, { icon: 'Compass', title: 'Getting Around', body: 'Fly direct into Santorini Airport (JTR) or fast ferry from Athens.' }, { icon: 'Users', title: 'Ideal For', body: 'Honeymooners, anniversary couples and luxury leisure travellers.' }] },
  { id: 17, country: 'Greece', region: 'Central Europe', flag: '🇬🇷', category: 'city', name: 'Athens', tagline: 'Cradle of civilisation, olive oil and ouzo', hot: false, desc: 'The Acropolis at dusk, the Plaka neighbourhood\'s tavernas, world-class museums and a street food scene that rivals anything in Europe.', img: AthensImg, highlights: ['Acropolis & Parthenon', 'Archaeological Museum', 'Monastiraki'], insights: { season: 'Mar – Jun · Sep – Nov', duration: '3 – 4 Days', type: 'Ancient History', pace: 'Cultural' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'March–June and September–November for ideal sightseeing weather.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Souvlaki at Kostas in Syntagma, spanakopita from any bakery.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Acropolis at dawn, National Archaeological Museum, Plaka walk.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro Line 3 connects Athens Airport directly to city centre.' }, { icon: 'Users', title: 'Ideal For', body: 'History enthusiasts and island-hoppers using Athens as gateway.' }] },
  { id: 18, country: 'Germany', region: 'Central Europe', flag: '🇩🇪', category: 'city', name: 'Berlin', tagline: 'History, street art and electric nightlife', hot: true, desc: 'Checkpoint Charlie, the Brandenburg Gate, East Side Gallery and a nightlife scene that defined global club culture.', img: BerlinImg, highlights: ['Brandenburg Gate', 'East Side Gallery', 'Museum Island'], insights: { season: 'Apr – Oct', duration: '4 – 5 Days', type: 'History & Contemporary Art', pace: 'Energetic' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–September for outdoor beer gardens and festival season.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Currywurst at Curry 36, döner kebab, Berliner Weisse beer.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'East Side Gallery, Pergamon Museum, Checkpoint Charlie history walk.' }, { icon: 'Compass', title: 'Getting Around', body: 'U-Bahn, S-Bahn, tram and bus network is exceptional.' }, { icon: 'Users', title: 'Ideal For', body: 'History enthusiasts, contemporary art lovers, night culture seekers.' }] },
  { id: 19, country: 'Austria', region: 'Central Europe', flag: '🇦🇹', category: 'city', name: 'Vienna', tagline: 'Mozart, Schnitzel and imperial grandeur', hot: false, desc: 'The Hofburg, the Vienna State Opera, Sachertorte at Café Central and the greatest classical music tradition in the world.', img: ViennaImg, highlights: ['Schönbrunn Palace', 'Vienna State Opera', 'Kunsthistorisches Museum'], insights: { season: 'Apr – Oct', duration: '3 – 5 Days', type: 'Art & Classical Music', pace: 'Refined' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–May for blooming Stadtpark and opera season in full swing.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Wiener Schnitzel at Figlmüller, Sacher-Torte at Café Sacher.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Imperial Apartments at Hofburg, standing room at the State Opera.' }, { icon: 'Compass', title: 'Getting Around', body: 'Vienna\'s U-Bahn is one of Europe\'s finest.' }, { icon: 'Users', title: 'Ideal For', body: 'Classical music lovers, art collectors, history enthusiasts.' }] },
  { id: 20, country: 'Czech Republic', region: 'Central Europe', flag: '🇨🇿', category: 'city', name: 'Prague', tagline: 'Fairy-tale spires above the Vltava', hot: true, desc: 'Charles Bridge at dawn, the Astronomical Clock, Josefov\'s synagogues and craft beer culture that would impress any connoisseur.', img: PragueImg, highlights: ['Prague Castle', 'Charles Bridge', 'Old Town Square'], insights: { season: 'Apr – Oct', duration: '3 – 4 Days', type: 'Medieval Architecture', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–May and September–October are ideal.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Svíčková at Lokál, chimney cake, Czech pilsner directly from the tank.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Prague Castle dawn tour, guided Jewish Quarter walk.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro, tram and bus system is excellent and very affordable.' }, { icon: 'Users', title: 'Ideal For', body: 'History lovers, architecture enthusiasts, couples.' }] },
  { id: 21, country: 'Portugal', region: 'Western Europe', flag: '🇵🇹', category: 'city', name: 'Lisbon', tagline: 'Fado, pastéis and seven hilly neighbourhoods', hot: true, desc: 'Trams rattling uphill, azulejo-tiled facades, custard tarts from Belém and the soulful sound of fado drifting through Alfama.', img: LisbonImg, highlights: ['Belém Tower', 'Alfama District', 'Sintra Day Trip'], insights: { season: 'Mar – Jun · Sep – Oct', duration: '4 – 5 Days', type: 'Culture & Fado', pace: 'Soulful' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'March–June: warm but not scorching.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Pastel de nata at Pastéis de Belém, bacalhau, piri-piri chicken.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Tram 28 through Alfama, fado evening in a tasca, Jerónimos Monastery.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro covers main districts. Iconic Tram 28 for Alfama.' }, { icon: 'Users', title: 'Ideal For', body: 'Culture lovers, food enthusiasts, romance seekers.' }] },
  { id: 22, country: 'Norway', region: 'Northern Europe', flag: '🇳🇴', category: 'mountain', name: 'Bergen & Fjords', tagline: 'Gateway to the world\'s greatest fjords', hot: true, desc: 'Bryggen Wharf, Flåm Railway, Geirangerfjord and the Northern Lights. Norway\'s fjord country is jaw-droppingly beautiful.', img: BergenFjordsImg, highlights: ['Geirangerfjord', 'Flåm Railway', 'Northern Lights'], insights: { season: 'Jun – Aug · Dec – Mar', duration: '6 – 9 Days', type: 'Nature & Scenery', pace: 'Exploratory' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'June–August for midnight sun, all fjord cruises running.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Fresh Bergen fish market salmon, reindeer carpaccio, cured Arctic char.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Overnight on a traditional fjord boat, kayaking under Geirangerfjord waterfalls.' }, { icon: 'Compass', title: 'Getting Around', body: 'Fly Bergen (BGO). Norway in a Nutshell combines ferry, train and bus.' }, { icon: 'Users', title: 'Ideal For', body: 'Nature enthusiasts, photographers, adventure couples.' }] },
  { id: 23, country: 'Sweden', region: 'Northern Europe', flag: '🇸🇪', category: 'city', name: 'Stockholm', tagline: 'Venice of the North, design capital', hot: false, desc: 'Spread across 14 islands, Stockholm blends Viking history with Scandi design perfection, world-class restaurants and archipelago wonder.', img: 'StockholmImg', highlights: ['Gamla Stan', 'Vasa Museum', 'Stockholm Archipelago'], insights: { season: 'Jun – Aug · Dec', duration: '4 – 5 Days', type: 'Design & History', pace: 'Refined' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'June–August for long days, archipelago boat trips, and outdoor festivals.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Smörgåsbord at Operakällaren, Swedish meatballs, gravlax cured salmon.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Vasa Museum, Gamla Stan medieval island, archipelago island-hopping.' }, { icon: 'Compass', title: 'Getting Around', body: 'Excellent metro, tram and bus network.' }, { icon: 'Users', title: 'Ideal For', body: 'Design lovers, history enthusiasts, nature seekers.' }] },
  { id: 24, country: 'Hungary', region: 'Eastern Europe', flag: '🇭🇺', category: 'city', name: 'Budapest', tagline: 'Paris of the East, thermal baths paradise', hot: true, desc: 'The Parliament building reflected in the Danube, thermal baths in Belle Époque splendour, ruin bars in the Jewish Quarter.', img: BudapestImg, highlights: ['Parliament Building', 'Széchenyi Baths', 'Ruin Bar Crawl'], insights: { season: 'Apr – Jun · Sep – Oct', duration: '3 – 5 Days', type: 'History & Wellness', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–June: Budapest in spring bloom.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Goulash soup at Borkonyha, lángos at the Great Market Hall.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Sunset Danube cruise, private thermal bath at Gellért.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro M1 (oldest in continental Europe), M2 and M4 cover central areas.' }, { icon: 'Users', title: 'Ideal For', body: 'History lovers, spa enthusiasts, foodies and couples.' }] },
  { id: 25, country: 'Croatia', region: 'Eastern Europe', flag: '🇭🇷', category: 'beach', name: 'Dubrovnik', tagline: 'Pearl of the Adriatic, Game of Thrones', hot: true, desc: 'Walk the 2km city walls above the Adriatic, kayak sea caves, island-hop to Hvar. Dubrovnik is everything you dreamed Croatia would be.', img: DubrovnikImg, highlights: ['City Walls Walk', 'Lokrum Island', 'Hvar Day Trip'], insights: { season: 'May – Jun · Sep – Oct', duration: '4 – 6 Days', type: 'Coastal Culture', pace: 'Relaxed' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–June and September–October are perfect.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Black risotto, fresh oysters from the Pelješac peninsula.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Sunrise walk on city walls, Game of Thrones filming locations tour.' }, { icon: 'Compass', title: 'Getting Around', body: 'Dubrovnik Airport (DBV) is 20 mins by taxi.' }, { icon: 'Users', title: 'Ideal For', body: 'Beach and culture travellers, film enthusiasts, sailing groups.' }] },
  { id: 26, country: 'Poland', region: 'Eastern Europe', flag: '🇵🇱', category: 'city', name: 'Kraków', tagline: 'Medieval grandeur and Jewish heritage', hot: false, desc: 'Wawel Castle, Kazimierz Jewish Quarter, and one of Europe\'s most beautiful main squares. Poland\'s cultural crown jewel.', img: KrakowImg, highlights: ['Wawel Castle', 'Main Market Square', 'Wieliczka Salt Mine'], insights: { season: 'Apr – Oct', duration: '3 – 4 Days', type: 'History & Heritage', pace: 'Reflective' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–October for pleasant weather and all outdoor attractions.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Pierogi at Pierogeria Starka, żurek (sour rye soup in a bread bowl).' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Wawel Royal Castle, Wieliczka Salt Mine UNESCO site.' }, { icon: 'Compass', title: 'Getting Around', body: 'Old Town is highly walkable. Trams connect all districts.' }, { icon: 'Users', title: 'Ideal For', body: 'History enthusiasts, Jewish heritage travellers, architecture lovers.' }] },
  { id: 27, country: 'Finland', region: 'Northern Europe', flag: '🇫🇮', category: 'adventure', name: 'Lapland', tagline: 'Santa, huskies and dancing auroras', hot: true, desc: 'Husky safaris, reindeer sleigh rides, glass igloos under the Northern Lights and the world\'s most magical winter experience.', img: LaplandImg, highlights: ['Northern Lights', 'Husky Safari', 'Ice Hotel Stay'], insights: { season: 'Nov – Mar', duration: '4 – 7 Days', type: 'Arctic Adventure', pace: 'Magical' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'December–January for the best Northern Lights chances.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Sautéed reindeer with lingonberries, smoked rainbow trout.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Aurora borealis from a glass igloo, husky sled safari through snow-laden forest.' }, { icon: 'Compass', title: 'Getting Around', body: 'Fly to Rovaniemi, Kittilä or Ivalo from Helsinki.' }, { icon: 'Users', title: 'Ideal For', body: 'Families, adventure couples, photography enthusiasts.' }] },
  { id: 28, country: 'Denmark', region: 'Northern Europe', flag: '🇩🇰', category: 'city', name: 'Copenhagen', tagline: 'Noma, hygge and harbour magic', hot: false, desc: 'Nyhavn\'s coloured façades, Tivoli Gardens, the world\'s best restaurant scene and a cycling culture that defines sustainability.', img: CopenhagenImg, highlights: ['Nyhavn Harbour', 'Tivoli Gardens', 'Louisiana Museum'], insights: { season: 'May – Sep', duration: '3 – 4 Days', type: 'Gastronomy & Design', pace: 'Hygge' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–September for the best weather and outdoor café culture.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Smørrebrød at Aamanns, Danish pastry from any bakery.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Tivoli Gardens, Nyhavn canal boat tour, cycling the entire city.' }, { icon: 'Compass', title: 'Getting Around', body: 'Copenhagen is the world\'s most bike-friendly city.' }, { icon: 'Users', title: 'Ideal For', body: 'Foodies, design lovers, sustainability enthusiasts.' }] },
  { id: 29, country: 'Slovenia', region: 'Eastern Europe', flag: '🇸🇮', category: 'mountain', name: 'Lake Bled', tagline: 'Fairy-tale island church in an alpine jewel', hot: true, desc: 'A medieval castle above a mirror lake with a tiny island church at its heart. Lake Bled belongs in a dream, not a travel itinerary.', img: LakeBledImg, highlights: ['Bled Island Church', 'Vintgar Gorge', 'Triglav National Park'], insights: { season: 'May – Sep', duration: '2 – 3 Days', type: 'Alpine Nature', pace: 'Peaceful' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–September for swimming, rowing and hiking.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Bled Cream Cake (kremna rezina) since 1953, fresh lake trout.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Traditional pletna boat to Bled Island, Bled Castle sunrise.' }, { icon: 'Compass', title: 'Getting Around', body: 'Fly to Ljubljana (45 mins drive) or direct buses from airport.' }, { icon: 'Users', title: 'Ideal For', body: 'Romantic couples, nature lovers, photographers.' }] },
  { id: 30, country: 'Romania', region: 'Eastern Europe', flag: '🇷🇴', category: 'adventure', name: 'Transylvania', tagline: 'Dracula\'s castles and Saxon villages', hot: false, desc: 'Bran Castle, medieval Sibiu, the Transfăgărășan highway and bear-watching in the Carpathians. Romania is Europe\'s wildest secret.', img: TransylvaniaImg, highlights: ['Bran Castle', 'Sibiu Old Town', 'Transfăgărășan Drive'], insights: { season: 'May – Sep', duration: '5 – 7 Days', type: 'Gothic & Wilderness', pace: 'Adventurous' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–September for the Transfăgărășan highway to be open.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Ciorba de burtă, mici (grilled meat rolls), sarmale (stuffed cabbage).' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Bran Castle at dusk, guided bear watching, Transfăgărășan drive.' }, { icon: 'Compass', title: 'Getting Around', body: 'Self-drive is essential. Fly to Cluj-Napoca or Bucharest.' }, { icon: 'Users', title: 'Ideal For', body: 'Adventure travellers, off-the-beaten-path seekers.' }] },
  { id: 31, country: 'Italy', region: 'Southern Europe', flag: '🇮🇹', category: 'city', name: 'Rome', tagline: 'Eternal city, infinite layers of history', hot: true, desc: 'Colosseum, Vatican City, Trevi Fountain — and the world\'s finest gelato. Rome is 3,000 years of civilisation in one city.', img: RomeImg, highlights: ['Colosseum', 'Vatican Museums', 'Trastevere Walk'], insights: { season: 'Mar – Jun · Sep – Oct', duration: '5 – 7 Days', type: 'Cultural Immersion', pace: 'Leisurely' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'Spring (March–June) offers mild weather and fewer crowds.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Carbonara at Roscioli, supplì at Supplì Roma, Aperol Spritz in Campo de\' Fiori.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private Colosseum arena floor at dawn, Vatican after-hours tour.' }, { icon: 'Compass', title: 'Getting Around', body: 'Rome rewards walkers. Use taxis for longer trips.' }, { icon: 'Users', title: 'Ideal For', body: 'Culture seekers, history enthusiasts, honeymooners.' }] },
  { id: 32, country: 'Italy', region: 'Southern Europe', flag: '🇮🇹', category: 'beach', name: 'Amalfi Coast', tagline: 'La dolce vita on dramatic limestone cliffs', hot: true, desc: 'Pastel villages cascade down cliffs into turquoise Tyrrhenian waters. Positano, Ravello, Capri — pure southern Italian magic.', img: AmalfiCoastImg, highlights: ['Positano', 'Capri Day Trip', 'Ravello Gardens'], insights: { season: 'May – Oct', duration: '5 – 8 Days', type: 'Coastal Luxury', pace: 'Indulgent' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–June is perfect: warm seas, flowers in bloom, roads manageable.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Fresh scialatielli alle vongole, limoncello from Sfusato lemons.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private boat hire along the coastline, Blue Grotto at Capri by kayak.' }, { icon: 'Compass', title: 'Getting Around', body: 'Ferry between towns is the sanest option in high season.' }, { icon: 'Users', title: 'Ideal For', body: 'Romantics, luxury seekers, food lovers.' }] },
  { id: 33, country: 'Spain', region: 'Southern Europe', flag: '🇪🇸', category: 'city', name: 'Barcelona', tagline: 'Gaudí, beaches and electric nightlife', hot: true, desc: 'Sagrada Família, Park Güell, Las Ramblas and Barceloneta beach — Barcelona packs an extraordinary amount of magic per square mile.', img: BarcelonaImg, highlights: ['Sagrada Família', 'Park Güell', 'Gothic Quarter'], insights: { season: 'Apr – Jun · Sep – Nov', duration: '4 – 6 Days', type: 'Architecture & Beach', pace: 'Vibrant' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'April–June and September–November: warm without crushing July–August heat.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Pan con tomate, patatas bravas at Bar Tomàs, paella at La Mar Salada.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Guided Gaudí architecture trail, flamenco in the Gothic Quarter.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro L2, L3, L4 cover all key areas. Aerobus from El Prat Airport.' }, { icon: 'Users', title: 'Ideal For', body: 'Architecture enthusiasts, beach lovers, foodies, couples.' }] },
  { id: 34, country: 'Spain', region: 'Southern Europe', flag: '🇪🇸', category: 'city', name: 'Madrid', tagline: 'Art, tapas and royal grandeur', hot: false, desc: 'The Prado, the Reina Sofía, Retiro Park and a tapas culture that begins at midnight. Madrid lives life at full volume.', img: MadridImg, highlights: ['Prado Museum', 'Retiro Park', 'Plaza Mayor'], insights: { season: 'Mar – Jun · Sep – Nov', duration: '3 – 5 Days', type: 'Art & Gastronomy', pace: 'Energetic' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'March–June and September–November for pleasant temperatures.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Churros con chocolate at San Ginés, cocido madrileño at La Bola.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Golden Triangle of Art (Prado, Thyssen, Reina Sofía), Retiro Park.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro system is excellent and very affordable.' }, { icon: 'Users', title: 'Ideal For', body: 'Art lovers, foodies, night owls and culture seekers.' }] },
  { id: 35, country: 'Portugal', region: 'Southern Europe', flag: '🇵🇹', category: 'city', name: 'Lisbon', tagline: 'Fado, pastéis and seven hilly neighbourhoods', hot: true, desc: 'Trams rattling uphill, azulejo-tiled facades, custard tarts from Belém and the soulful sound of fado drifting through Alfama.', img: LisbonImg, highlights: ['Belém Tower', 'Alfama District', 'Sintra Day Trip'], insights: { season: 'Mar – Jun · Sep – Oct', duration: '4 – 5 Days', type: 'Culture & Fado', pace: 'Soulful' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'March–June: warm but not scorching.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Pastel de nata at Pastéis de Belém, bacalhau, piri-piri chicken.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Tram 28 through Alfama, fado evening in a tasca, Jerónimos Monastery.' }, { icon: 'Compass', title: 'Getting Around', body: 'Metro covers main districts. Iconic Tram 28 for Alfama.' }, { icon: 'Users', title: 'Ideal For', body: 'Culture lovers, food enthusiasts, romance seekers.' }] },
  { id: 36, country: 'Greece', region: 'Southern Europe', flag: '🇬🇷', category: 'beach', name: 'Santorini', tagline: 'Caldera views and infinite blue domes', hot: true, desc: 'White-washed Cycladic architecture perched above a volcanic caldera. Santorini\'s sunsets from Oia remain the world\'s most celebrated.', img: SantoriniImg, highlights: ['Oia Sunset Walk', 'Akrotiri Ruins', 'Caldera Boat Tour'], insights: { season: 'May – Sep', duration: '4 – 6 Days', type: 'Leisure & Romance', pace: 'Relaxed' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–June and September offer the sweet spot.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Fresh seafood at Selene, local Assyrtiko white wine.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Private sailing catamaran at sunset, helicopter transfer from Athens.' }, { icon: 'Compass', title: 'Getting Around', body: 'Fly direct into Santorini Airport (JTR) or fast ferry from Athens.' }, { icon: 'Users', title: 'Ideal For', body: 'Honeymooners, anniversary couples and luxury leisure travellers.' }] },
  { id: 37, country: 'Croatia', region: 'Southern Europe', flag: '🇭🇷', category: 'beach', name: 'Dubrovnik', tagline: 'Pearl of the Adriatic, Game of Thrones', hot: true, desc: 'Walk the 2km city walls above the Adriatic, kayak sea caves, island-hop to Hvar. Dubrovnik is everything you dreamed Croatia would be.', img: DubrovnikImg, highlights: ['City Walls Walk', 'Lokrum Island', 'Hvar Day Trip'], insights: { season: 'May – Jun · Sep – Oct', duration: '4 – 6 Days', type: 'Coastal Culture', pace: 'Relaxed' }, accordion: [{ icon: 'Sun', title: 'Best Time to Visit', body: 'May–June and September–October are perfect.' }, { icon: 'Utensils', title: 'Culinary Highlights', body: 'Black risotto, fresh oysters from the Pelješac peninsula.' }, { icon: 'Camera', title: 'Signature Experiences', body: 'Sunrise walk on city walls, Game of Thrones filming locations tour.' }, { icon: 'Compass', title: 'Getting Around', body: 'Dubrovnik Airport (DBV) is 20 mins by taxi.' }, { icon: 'Users', title: 'Ideal For', body: 'Beach and culture travellers, film enthusiasts, sailing groups.' }] },
]

const CATEGORIES = [
  { id: 'all', label: 'All Types', Icon: Globe },
  { id: 'city', label: 'City', Icon: Building2 },
  { id: 'beach', label: 'Beach', Icon: Waves },
  { id: 'mountain', label: 'Mountain', Icon: Mountain },
  { id: 'adventure', label: 'Adventure', Icon: Plane },
]

const REGION_META = {
  'Western Europe':  { label: 'Western Europe',  headline: 'Western Europe',  sub: 'Classic destinations brimming with art, history and culinary excellence.', body: 'In Western Europe you can truly travel across centuries in a single day — stroll Roman ruins at dawn and sip Michelin-starred cuisine by evening. From misty Scottish Highlands to sun-drenched Algarve, the region rewards every kind of traveller.', footer: 'Western Europe has an immense amount to offer. Discover your own chapter — the most important question is, where\'s your heart set on visiting first?', countries: ['United Kingdom', 'France', 'Netherlands', 'Germany', 'Switzerland', 'Austria'] },
  'Central Europe':  { label: 'Central Europe',  headline: 'Central Europe',  sub: 'Alpine grandeur, Renaissance cities and timeless heritage.', body: 'Central Europe spans fairy-tale Prague to the Swiss Alps, from Vienna\'s imperial splendour to Berlin\'s electric streets. History, adventure and luxury co-exist in breathtaking proximity.', footer: 'Central Europe rewards the curious traveller at every turn. The only hard part is choosing where to start.', countries: ['Germany', 'Austria', 'Poland', 'Czech Republic', 'Hungary', 'Slovenia', 'Switzerland'] },
  'Northern Europe': { label: 'Northern Europe', headline: 'Northern Europe', sub: 'Fjords, auroras, design capitals and the midnight sun.', body: 'Northern Europe stretches from Copenhagen\'s Nyhavn canals to the dancing Northern Lights of Finnish Lapland. Scandi design philosophy meets raw natural wonder — the light alone is worth the journey.', footer: 'Northern Europe has a quiet magic that stays with you long after you return home. The aurora won\'t wait forever.', countries: ['United Kingdom', 'Sweden', 'Denmark', 'Norway', 'Finland'] },
  'Eastern Europe':  { label: 'Eastern Europe',  headline: 'Eastern Europe',  sub: 'Medieval grandeur, thermal baths and Europe\'s wildest secret.', body: 'Eastern Europe is where you find Budapest\'s Belle Époque thermal baths, Dubrovnik\'s Adriatic city walls, the fairy-tale mirror lake of Bled and Transylvania\'s Gothic castles — all at a fraction of the cost of western counterparts.', footer: 'Eastern Europe remains one of the continent\'s most underrated treasures. Discover your hidden gem before the rest of the world catches on.', countries: ['Romania', 'Poland', 'Hungary', 'Slovenia', 'Croatia'] },
  'Southern Europe': { label: 'Southern Europe', headline: 'Southern Europe', sub: 'Sun-soaked coastlines, ancient ruins and Mediterranean soul.', body: 'Southern Europe is the beating heart of Western civilisation — where ancient Rome, Moorish Andalucía, Greek mythology and Adriatic beaches converge. Olive groves, vine-clad hillsides and turquoise coves await at every turn.', footer: 'Southern Europe is a feast for every sense. From the Alhambra to the Acropolis, from the Amalfi cliffs to the streets of Lisbon — your Mediterranean story starts here.', countries: ['Italy', 'Spain', 'Portugal', 'Greece', 'Croatia'] },
}
 

const CAT_COLORS = {
  city:      { bg: '#EEF2FF', text: '#4338CA', dot: '#818CF8', label: 'City' },
  beach:     { bg: '#ECFEFF', text: '#0E7490', dot: '#22D3EE', label: 'Beach' },
  mountain:  { bg: '#F0FDF4', text: '#15803D', dot: '#4ADE80', label: 'Mountain' },
  adventure: { bg: '#FFF7ED', text: '#C2410C', dot: '#FB923C', label: 'Adventure' },
}

const HERO_IMG = DestinationHeroImg

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 80) }, [])

  return (
    <section style={{ position: 'relative', minHeight: '80vh', background: INK, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: 'cover', backgroundPosition: 'center 30%', backgroundRepeat: 'no-repeat', transform: loaded ? 'scale(1.06)' : 'scale(1.0)', transition: 'transform 14s ease', filter: 'brightness(0.88) saturate(1.1)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(125deg,rgba(8,6,2,.97) 0%,rgba(8,6,2,.78) 40%,rgba(8,6,2,.22) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(8,6,2,1) 0%,rgba(8,6,2,.55) 15%,transparent 45%)' }} />
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg,transparent,${G} 20%,${G2} 80%,transparent)` }} />
      <div style={{ position: 'relative', zIndex: 3, flex: 1, display: 'flex', alignItems: 'center', padding: 'clamp(6rem,14vh,9rem) clamp(1.5rem,6vw,6rem) 4rem' }}>
        <div style={{ maxWidth: 820, opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(32px)', transition: 'opacity 1.1s ease .1s, transform 1.1s ease .1s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{ width: 40, height: 1.5, background: `linear-gradient(90deg,${G},${G2})`, borderRadius: 2 }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: G, fontFamily: 'sans-serif' }}>Premium Travel Collection</span>
          </div>
          <h1 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(3.2rem,9vw,6.8rem)', fontWeight: 400, lineHeight: .9, letterSpacing: '-0.03em', color: '#fff', marginBottom: 32 }}>
            Discover<br /><em style={{ fontStyle: 'italic', color: G }}>Your Journey</em>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
            <MapPin size={11} style={{ color: G2 }} />
            <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.38)', fontFamily: 'sans-serif' }}>Worldwide Destinations</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,.38)', fontSize: 'clamp(.875rem,1.5vw,1rem)', lineHeight: 1.95, maxWidth: '46ch', marginBottom: 44, fontFamily: 'sans-serif' }}>
            Explore handpicked destinations across the world — from iconic cities to hidden gems. Your perfect journey starts here.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   INTRO SECTION
═══════════════════════════════════════════════════════ */
function IntroSection() {
  const [ref, inView] = useInView(0.06)
  const w = useWindowWidth()
  const isMobile = w < 768

  return (
    <section ref={ref} style={{ background: PARCH, padding: 'clamp(4rem,8vw,6.5rem) 0', borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1rem,5vw,5rem)', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: 'clamp(2.5rem,6vw,5rem)', alignItems: 'center' }}>
        <div style={{ position: 'relative', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-36px)', transition: 'opacity .9s ease, transform .9s ease' }}>
          <div style={{ position: 'relative', zIndex: 1, borderRadius: 2, overflow: 'hidden', height: isMobile ? '280px' : 'clamp(420px, 55vw, 650px)', background: PARCH }}>
            <img src={DestinationImg} alt="Chalo Holiday — explore the world" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
          </div>
        </div>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(36px)', transition: 'opacity .9s ease .15s, transform .9s ease .15s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(90deg,${G},${G2})`, borderRadius: 2 }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: G, fontFamily: 'sans-serif' }}>About Our Collection</span>
          </div>
          <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.9rem,3.8vw,3rem)', fontWeight: 400, color: INK, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 24 }}>
            Where every journey<br />becomes a <em style={{ color: G }}>cherished story.</em>
          </h2>
          <div style={{ width: 64, height: 2, background: `linear-gradient(90deg,${G},${G2})`, marginBottom: 24, borderRadius: 1 }} />
          <p style={{ fontSize: 15, lineHeight: 1.9, color: SL, fontFamily: 'sans-serif', fontWeight: 300, marginBottom: 16 }}>
            At <strong style={{ fontWeight: 600, color: INK }}>Chalo Holidays</strong>, we believe that travel is more than a destination — it is a transformative experience. Our curated collection of European escapes spans 20 countries, handpicked by our expert consultants.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: SL2, fontFamily: 'sans-serif', fontWeight: 300, marginBottom: 36 }}>
            From the fjords of Norway to the sun-drenched Amalfi Coast, from fairy-tale Prague to the eternal streets of Rome — we craft bespoke itineraries tailored precisely to your pace, your passions and your budget.
          </p>
          <a href="#destinations" onClick={e => { e.preventDefault(); document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', padding: '14px 28px', borderRadius: 3, fontFamily: 'sans-serif', textDecoration: 'none', textTransform: 'uppercase', boxShadow: `0 8px 28px -6px ${RED}44` }}>
            Explore All Destinations <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   TOP DESTINATIONS CAROUSEL
═══════════════════════════════════════════════════════ */
function TopDestinationsCarousel({ onFilter }) {
  const [ref, inView] = useInView(0.05)
  const [paused, setPaused] = useState(false)
  const carouselDests = ALL_DESTINATIONS.filter(d => d.hot)
  const doubled = [...carouselDests, ...carouselDests]

  return (
    <section ref={ref} style={{ background: '#ffffff', padding: 'clamp(3.5rem,7vw,5.5rem) 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(1rem,5vw,5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity .7s, transform .7s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(90deg,transparent,${G})`, borderRadius: 2 }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: G, fontFamily: 'sans-serif' }}>Handpicked for You</span>
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(90deg,${G},transparent)`, borderRadius: 2 }} />
          </div>
          <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 400, color: INK, letterSpacing: '-0.02em' }}>
            Top <em style={{ color: G }}>Destinations</em>
          </h2>
        </div>
        <style>{`
          @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-track { display: flex; gap: 28px; width: max-content; animation: marqueeScroll 28s linear infinite; }
          .marquee-track.paused { animation-play-state: paused; }
          .marquee-wrap { overflow: hidden; width: 100%; }
        `}</style>
        <div className="marquee-wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className={`marquee-track${paused ? ' paused' : ''}`}>
            {doubled.map((dest, i) => <TopDestItem key={`${dest.id}-${i}`} dest={dest} inView={inView} onClick={() => onFilter && onFilter(dest.region)} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function TopDestItem({ dest, inView, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flexShrink: 0, width: 150, opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease' }}>
      <div style={{ width: 130, height: 130, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${hov ? G : '#e8e8e8'}`, transition: 'border-color .3s, transform .3s, box-shadow .3s', transform: hov ? 'scale(1.06)' : 'scale(1)', boxShadow: hov ? `0 8px 28px ${G}33` : '0 2px 10px rgba(0,0,0,0.08)', flexShrink: 0 }}>
        <img src={dest.img} alt={dest.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transform: hov ? 'scale(1.08)' : 'scale(1)', transition: 'transform .5s ease' }} />
      </div>
      <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: '0.95rem', fontWeight: 400, color: hov ? G : INK, marginTop: 14, marginBottom: 4, textAlign: 'center', transition: 'color .3s', letterSpacing: '-0.01em' }}>{dest.name}</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   MODAL
═══════════════════════════════════════════════════════ */
function CountryFilter({ countries, selected, onChange }) {
  return (
    <div>
      <p
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: SL2,
          marginBottom: 14,
          fontFamily: 'sans-serif',
        }}
      >
        Filter by country
      </p>
 
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {/* "All Countries" pill */}
        <button
          onClick={() => onChange(null)}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: `1.5px solid ${selected === null ? INK : BR2}`,
            background: selected === null ? INK : '#fff',
            color: selected === null ? '#fff' : SL,
            fontSize: 12,
            fontWeight: selected === null ? 700 : 400,
            fontFamily: 'sans-serif',
            cursor: 'pointer',
            transition: 'all .22s',
            textAlign: 'left',
            boxShadow: selected === null ? '0 4px 14px -4px rgba(45,45,45,.35)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Globe size={13} color={selected === null ? '#fff' : SL2} />
          All Countries
        </button>
 
        {countries.map((country) => {
          const isActive = selected === country
          const flagMap = {
            'United Kingdom': '🇬🇧',
            France: '🇫🇷',
            Netherlands: '🇳🇱',
            Germany: '🇩🇪',
            Switzerland: '🇨🇭',
            Austria: '🇦🇹',
            Poland: '🇵🇱',
            'Czech Republic': '🇨🇿',
            Hungary: '🇭🇺',
            Slovenia: '🇸🇮',
            Croatia: '🇭🇷',
            Romania: '🇷🇴',
            Sweden: '🇸🇪',
            Denmark: '🇩🇰',
            Norway: '🇳🇴',
            Finland: '🇫🇮',
            Italy: '🇮🇹',
            Spain: '🇪🇸',
            Portugal: '🇵🇹',
            Greece: '🇬🇷',
          }
          return (
            <button
              key={country}
              onClick={() => onChange(country)}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: `1.5px solid ${isActive ? INK : BR2}`,
                background: isActive ? INK : '#fff',
                color: isActive ? '#fff' : SL,
                fontSize: 12,
                fontWeight: isActive ? 700 : 400,
                fontFamily: 'sans-serif',
                cursor: 'pointer',
                transition: 'all .22s',
                textAlign: 'left',
                boxShadow: isActive ? '0 4px 14px -4px rgba(45,45,45,.35)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 14, lineHeight: 1 }}>
                {flagMap[country] || '🌍'}
              </span>
              {country}
            </button>
          )
        })}
      </div>
 
      <p
        style={{
          fontSize: 9.5,
          color: SL2,
          fontStyle: 'italic',
          marginTop: 8,
          fontFamily: 'sans-serif',
        }}
      >
        *Select one country at a time
      </p>
    </div>
  )
}
 
/* ═══════════════════════════════════════════════════════
   MOBILE COUNTRY CHIPS
   Horizontal scrollable chips shown on tablet/mobile
   instead of the sidebar.
═══════════════════════════════════════════════════════ */
function MobileCountryChips({ countries, selected, onChange }) {
  const flagMap = {
    'United Kingdom': '🇬🇧', France: '🇫🇷', Netherlands: '🇳🇱',
    Germany: '🇩🇪', Switzerland: '🇨🇭', Austria: '🇦🇹',
    Poland: '🇵🇱', 'Czech Republic': '🇨🇿', Hungary: '🇭🇺',
    Slovenia: '🇸🇮', Croatia: '🇭🇷', Romania: '🇷🇴',
    Sweden: '🇸🇪', Denmark: '🇩🇰', Norway: '🇳🇴',
    Finland: '🇫🇮', Italy: '🇮🇹', Spain: '🇪🇸',
    Portugal: '🇵🇹', Greece: '🇬🇷',
  }
 
  const chipStyle = (active) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 14px',
    borderRadius: 20,
    border: `1.5px solid ${active ? INK : BR2}`,
    background: active ? INK : '#fff',
    color: active ? '#fff' : SL,
    fontSize: 12,
    fontWeight: active ? 700 : 400,
    fontFamily: 'sans-serif',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all .22s',
    flexShrink: 0,
  })
 
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 4,
        marginBottom: 16,
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <button style={chipStyle(selected === null)} onClick={() => onChange(null)}>
        <Globe size={12} color={selected === null ? '#fff' : SL2} />
        All
      </button>
      {countries.map((country) => (
        <button
          key={country}
          style={chipStyle(selected === country)}
          onClick={() => onChange(country)}
        >
          <span style={{ fontSize: 14, lineHeight: 1 }}>{flagMap[country] || '🌍'}</span>
          {country}
        </button>
      ))}
    </div>
  )
}
 
/* ═══════════════════════════════════════════════════════
   MODAL  (unchanged — kept for completeness)
═══════════════════════════════════════════════════════ */
function DestinationModal({ dest, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const [openIdx, setOpenIdx] = useState(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const cat = CAT_COLORS[dest.category] || CAT_COLORS.city
  const w = useWindowWidth()
  const isMobile = w < 640
 
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])
 
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
 
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10,8,5,0.82)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '10px' : '20px',
        animation: 'modalFadeIn 0.3s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FEFCF8', borderRadius: isMobile ? 16 : 24,
          width: '100%', maxWidth: 900, maxHeight: '90vh',
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6)',
          animation: 'modalSlideUp 0.35s cubic-bezier(0.22,1,0.36,1)',
          position: 'relative',
        }}
      >
        {/* Hero Image */}
        <div style={{ position: 'relative', height: isMobile ? 220 : 340, flexShrink: 0, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,#C8A96E22,#8B691422)`, opacity: imgLoaded ? 0 : 1, transition: 'opacity 0.6s' }} />
          <img src={dest.img} alt={dest.name} onLoad={() => setImgLoaded(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(10,8,5,0.75) 0%, rgba(10,8,5,0.3) 45%, transparent 70%)' }} />
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(10,8,5,0.55)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', backdropFilter: 'blur(4px)' }}>
            <X size={18} />
          </button>
          {hasPrev && <button onClick={onPrev} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(10,8,5,0.55)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}><ChevronLeft size={18} /></button>}
          {hasNext && <button onClick={onNext} style={{ position: 'absolute', right: 64, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(10,8,5,0.55)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}><ChevronRight size={18} /></button>}
          <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
            <span style={{ background: cat.bg, color: cat.text, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: cat.dot }} />{cat.label}
            </span>
            {dest.hot && <span style={{ background: `linear-gradient(135deg,${G},${G2})`, color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 20 }}>★ Popular</span>}
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '16px 20px 18px' : '20px 28px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 16 }}>{dest.flag}</span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>{dest.country}</span>
            </div>
            <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: isMobile ? '1.6rem' : '2.2rem', fontWeight: 400, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>{dest.name}</h2>
            <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 14, fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>{dest.tagline}</p>
          </div>
        </div>
        {/* Scrollable Content */}
        <div style={{ overflowY: 'auto', flex: 1, padding: isMobile ? '20px 16px 24px' : '28px 28px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 28 }}>
            <div>
              <p style={{ fontFamily: 'sans-serif', fontSize: 14, lineHeight: 1.9, color: SL, fontWeight: 300, marginBottom: 24 }}>{dest.desc}</p>
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: SL2, marginBottom: 10, fontFamily: 'sans-serif' }}>Highlights</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {dest.highlights.map((h) => (
                    <span key={h} style={{ fontSize: 11, fontFamily: 'sans-serif', fontWeight: 500, color: SL, background: PARCH, border: `1px solid ${BR2}`, borderRadius: 20, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <MapPin size={9} color={G2} />{h}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                {dest.accordion.map((item, idx) => {
                  const IconComp = ICON_MAP[item.icon] || Sun
                  const isOpen = openIdx === idx
                  return (
                    <div key={idx} style={{ borderBottom: `1px solid ${BR}` }}>
                      <button onClick={() => setOpenIdx(isOpen ? null : idx)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 26, height: 26, borderRadius: '50%', background: isOpen ? G : G3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s' }}>
                            <IconComp size={12} color={isOpen ? '#fff' : G} />
                          </div>
                          <span style={{ fontFamily: 'sans-serif', fontSize: 11.5, fontWeight: 600, color: isOpen ? G2 : SL, letterSpacing: '0.04em', transition: 'color 0.3s' }}>{item.title}</span>
                        </div>
                        <ChevronDown size={13} color={isOpen ? G : SL2} style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                      </button>
                      {isOpen && (
                        <div style={{ paddingBottom: 14, paddingLeft: 36 }}>
                          <p style={{ fontFamily: 'sans-serif', fontSize: 12.5, color: SL2, lineHeight: 1.85, fontWeight: 300 }}>{item.body}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <div style={{ background: G3, borderRadius: 16, border: `1px solid ${G}22`, padding: '20px', marginBottom: 20 }}>
                <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: SL2, marginBottom: 16, fontFamily: 'sans-serif' }}>Journey Overview</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[
                    { Icon: Calendar, label: 'Best Season', val: dest.insights.season },
                    { Icon: Clock,    label: 'Duration',    val: dest.insights.duration },
                    { Icon: Compass,  label: 'Experience',  val: dest.insights.type },
                    { Icon: Globe,    label: 'Pace',        val: dest.insights.pace },
                  ].map(({ Icon, label, val }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 9, background: '#fff', border: `1px solid ${BR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={13} color={G2} />
                      </div>
                      <div>
                        <p style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: SL2, fontFamily: 'sans-serif', marginBottom: 2 }}>{label}</p>
                        <p style={{ fontSize: 11.5, fontWeight: 600, color: INK, fontFamily: 'sans-serif', lineHeight: 1.3 }}>{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#fff', border: `1px solid ${BR}`, borderRadius: 14, padding: '16px 18px', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  {[1,2,3,4,5].map((s) => <Star key={s} size={14} color={G} fill={G} />)}
                  <span style={{ fontSize: 12, fontWeight: 700, color: G, fontFamily: 'sans-serif', marginLeft: 4 }}>Exceptional</span>
                </div>
                <p style={{ fontSize: 11.5, color: SL2, fontFamily: 'sans-serif', lineHeight: 1.7, fontStyle: 'italic' }}>"A bespoke, once-in-a-lifetime experience curated for the discerning traveller."</p>
              </div>
              <a href="#inquiry" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', padding: '15px 20px', borderRadius: 10, fontFamily: 'sans-serif', textDecoration: 'none', textTransform: 'uppercase', boxShadow: `0 8px 28px -6px ${RED}55` }}>
                Plan My {dest.name} Journey <ArrowRight size={14} />
              </a>
              <p style={{ textAlign: 'center', fontSize: 10.5, color: SL2, fontFamily: 'sans-serif', marginTop: 10 }}>Complimentary consultation · No obligation</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modalFadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes modalSlideUp { from { opacity:0; transform:translateY(32px) scale(0.97); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  )
}
 
/* ═══════════════════════════════════════════════════════
   DEST CARD  (unchanged)
═══════════════════════════════════════════════════════ */
function DestCard({ dest, onClick }) {
  const [hov, setHov] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const cat = CAT_COLORS[dest.category] || CAT_COLORS.city
 
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: CARD, borderRadius: 16, overflow: 'hidden',
        border: `1px solid ${hov ? G + '66' : BR}`,
        boxShadow: hov ? '0 24px 56px -10px rgba(0,0,0,.22)' : '0 2px 16px -4px rgba(0,0,0,.10)',
        transform: hov ? 'translateY(-6px)' : 'none',
        transition: 'box-shadow .35s ease, transform .35s ease, border-color .3s ease',
        cursor: 'pointer', display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative', height: 380, overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${G3},${BR})`, opacity: imgLoaded ? 0 : 1, transition: 'opacity .5s' }} />
        <img
          src={dest.img} alt={dest.name} loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov ? 'scale(1.06)' : 'scale(1)', transition: 'transform 1.1s ease' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(10,8,5,.6) 0%,rgba(10,8,5,.08) 50%,transparent 80%)' }} />
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span style={{ background: cat.bg, color: cat.text, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 5, boxShadow: '0 2px 8px rgba(0,0,0,.12)', fontFamily: 'sans-serif' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: cat.dot }} />{cat.label}
          </span>
        </div>
        {dest.hot && (
          <div style={{ position: 'absolute', top: 12, right: 12, background: `linear-gradient(135deg,${G},${G2})`, color: '#fff', fontSize: 8.5, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20, fontFamily: 'sans-serif', boxShadow: `0 2px 10px ${G}55` }}>
            ★ Popular
          </div>
        )}
        {hov && (
          <div style={{ position: 'absolute', inset: 0, background: `${G}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s' }}>
            <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 30, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: G2, fontFamily: 'sans-serif', letterSpacing: '0.06em' }}>VIEW DETAILS</span>
              <ArrowRight size={12} color={G2} />
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 16px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
            <span style={{ fontSize: 12 }}>{dest.flag}</span>
            <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,.55)', fontFamily: 'sans-serif', letterSpacing: '0.12em' }}>{dest.country.toUpperCase()}</span>
          </div>
          <h3 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: '1.3rem', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{dest.name}</h3>
        </div>
      </div>
    </div>
  )
}
 
/* ═══════════════════════════════════════════════════════
   REGION DROPDOWN  (unchanged)
═══════════════════════════════════════════════════════ */
function RegionDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const regions = ['Western Europe', 'Central Europe', 'Northern Europe', 'Eastern Europe', 'Southern Europe']
 
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
 
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `1.5px solid ${open ? G : BR2}`, borderRadius: 8, padding: '9px 16px', fontSize: 13.5, fontWeight: 600, color: SL, fontFamily: 'sans-serif', cursor: 'pointer', transition: 'border-color .25s', boxShadow: open ? `0 4px 20px -4px ${G}44` : 'none' }}
      >
        <MapPin size={13} color={G} />{value}
        <ChevronDown size={13} color={SL2} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }} />
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 100, background: '#fff', borderRadius: 10, border: `1px solid ${BR}`, boxShadow: '0 16px 48px -8px rgba(0,0,0,.18)', minWidth: 200, overflow: 'hidden' }}>
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => { onChange(r); setOpen(false) }}
              style={{ width: '100%', textAlign: 'left', padding: '11px 18px', border: 'none', background: r === value ? G3 : '#fff', cursor: 'pointer', fontSize: 13, color: r === value ? G2 : SL, fontWeight: r === value ? 700 : 400, fontFamily: 'sans-serif', transition: 'background .2s', borderLeft: r === value ? `3px solid ${G}` : '3px solid transparent' }}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
 
/* ═══════════════════════════════════════════════════════
   DESTINATIONS SECTION  ← main export / replacement
   Key change: "Select experience type" → CountryFilter
═══════════════════════════════════════════════════════ */
function DestinationsSection() {
  const [region, setRegion]           = useState('Western Europe')
  const [country, setCountry]         = useState(null)   // ← replaces expType
  const [visibleCount, setVisibleCount] = useState(6)
  const [modalDest, setModalDest]     = useState(null)
  const [fade, setFade]               = useState(true)
  const prevRegion                    = useRef(region)
 
  const w        = useWindowWidth()
  const isMobile = w < 640
  const isTablet = w < 1024
 
  // When region changes: fade out, reset country + pagination, then fade back in
  useEffect(() => {
    if (prevRegion.current !== region) {
      setFade(false)
      setVisibleCount(6)
      setCountry(null)
      const t = setTimeout(() => { setFade(true); prevRegion.current = region }, 260)
      return () => clearTimeout(t)
    }
  }, [region])
 
  // When country filter changes: reset pagination + animate
  const handleCountryChange = useCallback((c) => {
    setFade(false)
    setVisibleCount(6)
    setCountry(c)
    setTimeout(() => setFade(true), 180)
  }, [])
 
  // Derive filtered list: first by region, then by country (if selected)
  const filtered = useMemo(
    () =>
      ALL_DESTINATIONS
        .filter((d) => d.region === region)
        .filter((d) => !country || d.country === country),
    [region, country]
  )
  const shown = filtered.slice(0, visibleCount)
 
  // Modal navigation
  const openModal  = useCallback((dest) => setModalDest(dest), [])
  const closeModal = useCallback(() => setModalDest(null), [])
  const modalIdx   = modalDest ? filtered.findIndex((d) => d.id === modalDest.id) : -1
  const goPrev     = useCallback(() => { if (modalIdx > 0) setModalDest(filtered[modalIdx - 1]) }, [modalIdx, filtered])
  const goNext     = useCallback(() => { if (modalIdx < filtered.length - 1) setModalDest(filtered[modalIdx + 1]) }, [modalIdx, filtered])
 
  const meta        = REGION_META[region]
  const cardCols    = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
  const regionCountries = meta.countries   // from REGION_META
 
  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
        .dest-card-enter { animation: fadeUp .45s ease forwards; }
      `}</style>
 
      <section id="destinations" style={{ background: PARCH, padding: 'clamp(3rem,6vw,5rem) 0', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 clamp(1rem,4vw,3.5rem)' }}>
 
          {/* ── TOP ROW ─────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
            <div>
              <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 400, color: INK, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 8, opacity: fade ? 1 : 0, transition: 'opacity .3s' }}>
                {country ? `${country}` : meta.headline}
              </h2>
              <p style={{ fontSize: 13, color: SL2, maxWidth: 340, lineHeight: 1.7, opacity: fade ? 1 : 0, transition: 'opacity .3s .05s' }}>
                {country
                  ? `Showing destinations in ${country}`
                  : meta.sub}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <RegionDropdown value={region} onChange={setRegion} />
            </div>
          </div>
 
          {/* ── MOBILE: horizontal country chips ────────── */}
          {isTablet && (
            <MobileCountryChips
              countries={regionCountries}
              selected={country}
              onChange={handleCountryChange}
            />
          )}
 
          {/* ── MAIN LAYOUT ─────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '220px 1fr', gap: isTablet ? 0 : 32, alignItems: 'start' }}>
 
            {/* LEFT SIDEBAR (desktop only) */}
            {!isTablet && (
              <div style={{ opacity: fade ? 1 : 0, transition: 'opacity .4s .05s' }}>
                {/* Region description */}
                <p style={{ fontSize: 13.5, lineHeight: 1.9, color: SL, fontWeight: 300, marginBottom: 28 }}>{meta.body}</p>
 
                {/* ↓ COUNTRY FILTER replaces old "Select experience type" */}
                <CountryFilter
                  countries={regionCountries}
                  selected={country}
                  onChange={handleCountryChange}
                />
 
                {/* Footer callout box */}
                <div style={{ background: G3, border: `1px solid ${G}30`, borderRadius: 12, padding: '18px 16px', marginTop: 24, opacity: fade ? 1 : 0, transition: 'opacity .4s .1s' }}>
                  <div style={{ width: 28, height: 2, background: `linear-gradient(90deg,${G},${G2})`, borderRadius: 2, marginBottom: 10 }} />
                  <p style={{ fontSize: 12, lineHeight: 1.85, color: SL, fontWeight: 300 }}>{meta.footer}</p>
                </div>
 
                <a href="#inquiry" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', padding: '14px 20px', borderRadius: 8, fontFamily: 'sans-serif', textDecoration: 'none', textTransform: 'uppercase', boxShadow: `0 8px 28px -6px ${RED}44` }}>
                  Plan My Journey <ArrowRight size={13} />
                </a>
              </div>
            )}
 
            {/* CARD GRID */}
            <div>
              {/* Mobile stats bar */}
              {isTablet && (
                <div style={{ display: 'flex', gap: 20, marginBottom: 20, padding: '14px 16px', background: '#fff', borderRadius: 12, border: `1px solid ${BR}`, opacity: fade ? 1 : 0, transition: 'opacity .4s' }}>
                  {[
                    { n: filtered.length, label: 'Destinations' },
                    { n: '100%',          label: 'Bespoke'      },
                    { n: '24/7',          label: 'Support'      },
                  ].map(({ n, label }) => (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontFamily: "Georgia,serif", fontSize: '1.3rem', fontWeight: 400, color: G }}>{n}</span>
                      <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: SL2 }}>{label}</span>
                    </div>
                  ))}
                </div>
              )}
 
              {shown.length > 0 ? (
                <div
                  style={{ display: 'grid', gridTemplateColumns: cardCols, gap: isMobile ? 12 : 16, opacity: fade ? 1 : 0, transition: 'opacity .35s' }}
                >
                  {shown.map((dest, i) => (
                    <div key={dest.id} className="dest-card-enter" style={{ animationDelay: `${i * 55}ms` }}>
                      <DestCard dest={dest} onClick={() => openModal(dest)} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <p style={{ fontFamily: "Georgia,serif", fontSize: '1.3rem', color: SL2, marginBottom: 8 }}>
                    No destinations found.
                  </p>
                  <p style={{ fontSize: 12, color: SL2 }}>Try a different country or region.</p>
                </div>
              )}
 
              {/* Load more */}
              {visibleCount < filtered.length && (
                <div style={{ textAlign: 'center', marginTop: 28 }}>
                  <button
                    onClick={() => setVisibleCount((c) => c + 6)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 30, border: `1.5px solid ${BR2}`, background: '#fff', fontSize: 12, fontWeight: 600, color: SL, fontFamily: 'sans-serif', cursor: 'pointer', transition: 'all .25s', letterSpacing: '0.08em' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = BR2; e.currentTarget.style.color = SL }}
                  >
                    View more <ArrowRight size={13} />
                  </button>
                </div>
              )}
 
              {/* Mobile CTA */}
              {isTablet && (
                <a href="#inquiry" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 28, background: `linear-gradient(135deg,${RED},${RED2})`, color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', padding: '14px 20px', borderRadius: 8, fontFamily: 'sans-serif', textDecoration: 'none', textTransform: 'uppercase', boxShadow: `0 8px 28px -6px ${RED}44` }}>
                  Plan My Journey <ArrowRight size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
 
      {modalDest && (
        <DestinationModal
          dest={modalDest}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={modalIdx > 0}
          hasNext={modalIdx < filtered.length - 1}
        />
      )}
    </>
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
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(90deg,transparent,${G})`, borderRadius: 2 }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: G, fontFamily: 'sans-serif' }}>Why Chalo Holidays</span>
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(90deg,${G},transparent)`, borderRadius: 2 }} />
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
              <div key={title} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ padding: '28px 24px', border: `1px solid ${hov ? G + '66' : BR}`, borderTop: `2px solid ${hov ? G : BR2}`, background: hov ? G3 : CARD, transition: 'all .3s', cursor: 'default', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transitionDelay: `${i * 80}ms` }}>
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

  return (
    <div style={{ fontFamily: 'sans-serif', background: PARCH }}>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0 }
        input, select, button { outline:none }
        ::-webkit-scrollbar { width:6px; height:6px }
        ::-webkit-scrollbar-track { background:${PARCH} }
        ::-webkit-scrollbar-thumb { background:${G}; border-radius:3px }
      `}</style>
      <Navbar />
      <Hero />
      <IntroSection />
      <TopDestinationsCarousel onFilter={() => {}} />
      <WhySection />
      <DestinationsSection />
      <Footer />
    </div>
  )
}