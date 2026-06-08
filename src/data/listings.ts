import { Property, Agent } from "../types";

export const AGENTS: Agent[] = [
  {
    name: "Meraf Solomon",
    role: "Senior Acquisition Partner",
    phone: "+251 911 234 567",
    email: "meraf@jenbororealestate.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Yonas Biru",
    role: "Luxury Portfolio Specialist",
    phone: "+251 911 765 432",
    email: "yonas@jenbororealestate.com",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Hanna Alene",
    role: "Director of International Sales",
    phone: "+251 911 888 999",
    email: "hanna@jenbororealestate.com",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "The Obsidian Brutalist Villa",
    type: "Villa",
    price: 3850000, // in USD or ETB representation. Let's make it clear, e.g. "$3,850,000" or equivalent, luxury properties often list in USD equivalents
    location: "Old Airport, Addis Ababa",
    bedrooms: 5,
    bathrooms: 6,
    area: 720,
    image: "/images/luxury-estate-exterior.jpg",
    gallery: ["/images/interior-1.jpg", "/images/interior-2.jpg", "/images/interior-3.jpg"],
    description: "An architectural masterpiece expressing pure luxury-minimalism. Built using signature exposed obsidian-tinted concrete, this bespoke villa balances monolithic structural forms with sweeping glass facades. The living area merges seamlessly with a multi-level travertine terrace and an architectural infinity pool, bordered by curated absolute-minimal indigenous landscaping.",
    features: [
      "Signature Exposed Concrete",
      "Architectural Pool",
      "Underfloor Climatic Webting",
      "Smart Automations By Lutron",
      "Triple-height Gallery",
      "Staff Quarters & Professional Scullery"
    ],
    agent: AGENTS[0],
    yearBuilt: 2025,
    status: "For Sale",
    isFeatured: true
  },
  {
    id: "prop-2",
    title: "Bole Zenith Penthouse",
    type: "Penthouse",
    price: 1950000,
    location: "Kazanchis, Addis Ababa",
    bedrooms: 3,
    bathrooms: 3.5,
    area: 340,
    image: "/images/listing-ad-1.jpg",
    gallery: ["/images/interior-4.jpg", "/images/interior-5.jpg"],
    description: "Suspended above the capital's beating heart, this penthouse embodies high-contrast editorial elegance. Boasting endless floor-to-ceiling panoramic glass windows, every detail has been custom-crafted: from the monolithic white marble kitchen counter to the solid European smoked oak flooring. A private wrap-around terrace offers dramatic skyline perspectives.",
    features: [
      "Panoramic Skyline Perspectives",
      "Calacatta Monolithic Countertops",
      "Private Sky Deck",
      "Keyless Biometric Elevators",
      "Integrated Audio System",
      "Master Suite Spa Retreat"
    ],
    agent: AGENTS[1],
    yearBuilt: 2024,
    status: "For Sale",
    isFeatured: true
  },
  {
    id: "prop-3",
    title: "The Courtyard Townhome",
    type: "Townhome",
    price: 1250000,
    location: "Bole, Addis Ababa",
    bedrooms: 4,
    bathrooms: 4.5,
    area: 410,
    image: "/images/listing-ad-2.jpg",
    gallery: ["/images/interior-1.jpg", "/images/listing-ad-6.jpg"],
    description: "An oasis of absolute silence in Bole. Styled with premium natural cedarwood slats and structural black metal framework, this property centers on a private interior open-air courtyard with a tranquil water fountain. It features custom recessed warm architectural light plans that accent the structural beauty of its minimal geometry.",
    features: [
      "Private Serene Courtyard",
      "Modular Timber Louvers",
      "Recessed Warm Architectural Lighting",
      "Double Garage with EV Port",
      "Rooftop Meditation Terrace",
      "Fully Soundproofed Studio Room"
    ],
    agent: AGENTS[2],
    yearBuilt: 2025,
    status: "For Sale",
    isFeatured: true
  },
  {
    id: "prop-4",
    title: "Cormorant Hills Estate",
    type: "Villa",
    price: 4900000,
    location: "Entoto Hills, Addis Ababa",
    bedrooms: 6,
    bathrooms: 7,
    area: 910,
    image: "/images/listing-ad-3.jpg",
    gallery: ["/images/interior-2.jpg", "/images/interior-3.jpg"],
    description: "Perched majestically among the lush, aromatic eucalyptus groves of Entoto, this expansive estate represents unmatched privacy and high-altitude luxury. Features heavy locally-sourced stone masonry paired with raw hand-brushed zinc sheets and vast glass portals that overlook the shimmering city below.",
    features: [
      "Locality Stone Masonry",
      "Eucalyptus Forest Perimeter",
      "Professional Chef Suite kitchen",
      "Private Guard Tower",
      "Wellness Pavillion & Dynamic Sauna",
      "Multi-Car Collectors Garage"
    ],
    agent: AGENTS[0],
    yearBuilt: 2023,
    status: "For Sale",
    isFeatured: false
  },
  {
    id: "prop-5",
    title: "The Raw Linear Apartment",
    type: "Apartment",
    price: 22000, // Rent per month (ETB equivalent or USD, let's say USD values)
    location: "Megenagna, Addis Ababa",
    bedrooms: 2,
    bathrooms: 2,
    area: 165,
    image: "/images/listing-ad-4.jpg",
    gallery: ["/images/interior-4.jpg", "/images/interior-5.jpg"],
    description: "A highly curated linear loft designed for functional purists. Featuring exposed industrial concrete beams, sandblasted glass walls, and a monochromatic deep matte-black grid framing system. The open floor-plan accentuates natural morning rays, illuminating the custom concrete fixtures.",
    features: [
      "Raw Exposed Beams",
      "Bespoke Monochromatic Grid",
      "Minimalist Integrated Wardrobes",
      "Italian Designed Fixtures",
      "Dedicated Fibre Line",
      "High-Frequency Security Screening"
    ],
    agent: AGENTS[1],
    yearBuilt: 2024,
    status: "For Rent",
    isFeatured: false
  },
  {
    id: "prop-6",
    title: "The Symmetrical Pavilion",
    type: "Villa",
    price: 8500, // Rent per month
    location: "Old Airport, Addis Ababa",
    bedrooms: 3,
    bathrooms: 3.5,
    area: 280,
    image: "/images/listing-ad-5.jpg",
    gallery: ["/images/interior-1.jpg", "/images/interior-2.jpg"],
    description: "A stunning pavilion-style villa displaying absolute axial symmetry. Designed to facilitate fluid indoor-outdoor living, the wide horizontal glass sliding systems slide completely into the walls, creating a unified hall that looks out to a quiet reflecting pond.",
    features: [
      "Complete Pocket Sliding Systems",
      "Symmetric Axial Architecture",
      "Reflecting Pond with Koi Fish",
      "Integrated Security Network",
      "Under-stair Sculptural Atrium",
      "Organic Solar Shading Louvers"
    ],
    agent: AGENTS[2],
    yearBuilt: 2022,
    status: "For Rent",
    isFeatured: false
  }
];

