import React, { useState, useCallback, useMemo } from 'react';
import { Heart, Sparkles, Trophy, RotateCcw, ChevronLeft, ChevronRight, Users, Globe, Plane, Compass, Sun, Waves, Mountain, Star, Crown, Anchor, Camera, Coffee, Wine, Bird, Fish, Tent, Hotel, Map, Gem, Leaf, Music, Utensils, Shell, Flame, Moon, CloudSun, TreePine, Binoculars, Ship, Umbrella, Flower2 } from 'lucide-react';

// DESTINATIONS with scoring profiles across 10 dimensions
const DESTINATIONS = {
  safariZanzibar: {
    name: "Safari + Zanzibar",
    tagline: "Big Five meets spice island paradise",
    description: "4 nights Singita Grumeti + 4 nights Kilindi Zanzibar. Migration season wildlife followed by private pavilion overwater luxury.",
    budget: "$45,000",
    scores: { wildlife: 10, romance: 9, adventure: 9, exclusivity: 9, diving: 7, travelEase: 5, culture: 8, luxury: 10, uniqueness: 9, relaxation: 8 },
    gradient: "linear-gradient(135deg, #B8860B 0%, #8B4513 50%, #2F4F4F 100%)"
  },
  galapagosLand: {
    name: "Galápagos Land-Based",
    tagline: "Evolution's laboratory, grounded luxury",
    description: "8 nights Pikaia Lodge. Daily island hopping, giant tortoises, blue-footed boobies, volcanic landscapes.",
    budget: "$32,000",
    scores: { wildlife: 10, romance: 7, adventure: 8, exclusivity: 7, diving: 8, travelEase: 6, culture: 6, luxury: 8, uniqueness: 10, relaxation: 6 },
    gradient: "linear-gradient(135deg, #2E8B57 0%, #006400 50%, #1a1a2e 100%)"
  },
  galapagosYacht: {
    name: "Galápagos Yacht",
    tagline: "Ultimate expedition, floating sanctuary",
    description: "7 nights Ecoventura Theory yacht. 16-guest max, naturalist guides, snorkeling with sea lions.",
    budget: "$38,000",
    scores: { wildlife: 10, romance: 8, adventure: 9, exclusivity: 9, diving: 9, travelEase: 5, culture: 5, luxury: 9, uniqueness: 10, relaxation: 7 },
    gradient: "linear-gradient(135deg, #4169E1 0%, #000080 50%, #0a0a1a 100%)"
  },
  rajaAmpat: {
    name: "Raja Ampat",
    tagline: "Planet's richest reefs, total seclusion",
    description: "10 nights Misool Resort. 75% of all coral species, manta cleaning stations, overwater bungalows.",
    budget: "$28,000",
    scores: { wildlife: 9, romance: 9, adventure: 8, exclusivity: 10, diving: 10, travelEase: 3, culture: 6, luxury: 8, uniqueness: 10, relaxation: 9 },
    gradient: "linear-gradient(135deg, #00CED1 0%, #008B8B 50%, #0d1b2a 100%)"
  },
  theBrando: {
    name: "The Brando",
    tagline: "Marlon's private island, ultimate eco-luxury",
    description: "7 nights Tetiaroa atoll. 35 villas, private beaches, Polynesian spa, all-inclusive excellence.",
    budget: "$48,000",
    scores: { wildlife: 6, romance: 10, adventure: 5, exclusivity: 10, diving: 7, travelEase: 7, culture: 7, luxury: 10, uniqueness: 9, relaxation: 10 },
    gradient: "linear-gradient(135deg, #DDA0DD 0%, #8B008B 50%, #1a0a1a 100%)"
  },
  laucala: {
    name: "Laucala Island",
    tagline: "Billionaire's playground, Fiji perfection",
    description: "7 nights Red Bull heir's private island. 25 residences, golf, diving, horseback, farm-to-table.",
    budget: "$52,000",
    scores: { wildlife: 5, romance: 10, adventure: 7, exclusivity: 10, diving: 8, travelEase: 5, culture: 6, luxury: 10, uniqueness: 9, relaxation: 10 },
    gradient: "linear-gradient(135deg, #FFD700 0%, #B8860B 50%, #1a1506 100%)"
  },
  japan: {
    name: "Japan Luxury Circuit",
    tagline: "Ancient meets futuristic, culinary heights",
    description: "10 nights: Aman Tokyo, Hoshinoya Kyoto, Benesse House Naoshima. Cherry blossoms, kaiseki, art islands.",
    budget: "$42,000",
    scores: { wildlife: 3, romance: 8, adventure: 6, exclusivity: 7, diving: 2, travelEase: 9, culture: 10, luxury: 9, uniqueness: 8, relaxation: 7 },
    gradient: "linear-gradient(135deg, #DC143C 0%, #8B0000 50%, #1a0a0a 100%)"
  },
  maldives: {
    name: "Maldives Ultra-Luxury",
    tagline: "Overwater perfection, infinite blue",
    description: "8 nights Soneva Fushi or Cheval Blanc. Private water villas, underwater restaurants, dolphin cruises.",
    budget: "$45,000",
    scores: { wildlife: 6, romance: 10, adventure: 4, exclusivity: 9, diving: 9, travelEase: 6, culture: 3, luxury: 10, uniqueness: 7, relaxation: 10 },
    gradient: "linear-gradient(135deg, #40E0D0 0%, #008080 50%, #0a1a1a 100%)"
  },
  patagonia: {
    name: "Patagonia Adventure",
    tagline: "End of the world, dramatic landscapes",
    description: "8 nights: Awasi Patagonia + Tierra Chiloé. Glaciers, Torres del Paine, private guides, gaucho culture.",
    budget: "$35,000",
    scores: { wildlife: 7, romance: 8, adventure: 10, exclusivity: 8, diving: 1, travelEase: 5, culture: 7, luxury: 9, uniqueness: 9, relaxation: 5 },
    gradient: "linear-gradient(135deg, #87CEEB 0%, #4682B4 50%, #1a2a3a 100%)"
  },
  morocco: {
    name: "Morocco Royal",
    tagline: "Desert magic, medina mystique",
    description: "9 nights: Royal Mansour Marrakech + Sahara glamping. Riads, souks, Atlas Mountains, starlit dunes.",
    budget: "$28,000",
    scores: { wildlife: 4, romance: 9, adventure: 7, exclusivity: 8, diving: 0, travelEase: 7, culture: 10, luxury: 9, uniqueness: 8, relaxation: 7 },
    gradient: "linear-gradient(135deg, #CD853F 0%, #8B4513 50%, #1a1008 100%)"
  },
  newZealand: {
    name: "New Zealand Ultimate",
    tagline: "Adventure capital, Middle-earth magic",
    description: "12 nights: Huka Lodge, Matakauri, helicopter wine tours. Fiords, glaciers, Māori culture, adventure sports.",
    budget: "$48,000",
    scores: { wildlife: 6, romance: 8, adventure: 10, exclusivity: 7, diving: 5, travelEase: 6, culture: 8, luxury: 9, uniqueness: 8, relaxation: 6 },
    gradient: "linear-gradient(135deg, #228B22 0%, #006400 50%, #0a1a0a 100%)"
  }
};

// 55 THIS OR THAT scenarios
const SCENARIOS = [
  { id: 1, optionA: { text: "Lions roaring at sunset", icon: "Binoculars", weights: { wildlife: 2, adventure: 1 } }, optionB: { text: "Champagne on a private beach", icon: "Wine", weights: { romance: 2, relaxation: 1 } } },
  { id: 2, optionA: { text: "Whale shark swimming alongside", icon: "Fish", weights: { wildlife: 2, diving: 1 } }, optionB: { text: "Couples massage over the water", icon: "Flower2", weights: { romance: 2, luxury: 1 } } },
  { id: 3, optionA: { text: "Giant tortoise encounters", icon: "Shell", weights: { wildlife: 2, uniqueness: 1 } }, optionB: { text: "Candle-lit dinner under stars", icon: "Moon", weights: { romance: 2, exclusivity: 1 } } },
  { id: 4, optionA: { text: "Blue-footed booby dance", icon: "Bird", weights: { wildlife: 2, uniqueness: 1 } }, optionB: { text: "Rose petals on the bed", icon: "Heart", weights: { romance: 2, luxury: 1 } } },
  { id: 5, optionA: { text: "Manta ray night dive", icon: "Fish", weights: { wildlife: 2, diving: 2 } }, optionB: { text: "Private plunge pool sunsets", icon: "Sun", weights: { romance: 2, relaxation: 1 } } },
  { id: 6, optionA: { text: "Glacier helicopter landing", icon: "Mountain", weights: { adventure: 2, uniqueness: 1 } }, optionB: { text: "Infinity pool all day", icon: "Waves", weights: { relaxation: 2, luxury: 1 } } },
  { id: 7, optionA: { text: "Kayaking through sea caves", icon: "Anchor", weights: { adventure: 2, wildlife: 1 } }, optionB: { text: "Beachside cabana napping", icon: "Umbrella", weights: { relaxation: 2, romance: 1 } } },
  { id: 8, optionA: { text: "Zip-lining through rainforest", icon: "TreePine", weights: { adventure: 2, wildlife: 1 } }, optionB: { text: "Floating breakfast in villa", icon: "Coffee", weights: { relaxation: 2, luxury: 1 } } },
  { id: 9, optionA: { text: "Volcano crater rim hiking", icon: "Flame", weights: { adventure: 2, uniqueness: 1 } }, optionB: { text: "Spa day, full treatment", icon: "Sparkles", weights: { relaxation: 2, luxury: 1 } } },
  { id: 10, optionA: { text: "Night jungle trek", icon: "Moon", weights: { adventure: 2, wildlife: 1 } }, optionB: { text: "Stargazing from hot tub", icon: "Star", weights: { relaxation: 2, romance: 1 } } },
  { id: 11, optionA: { text: "Butler service everything", icon: "Crown", weights: { luxury: 2, exclusivity: 1 } }, optionB: { text: "Local family home dinner", icon: "Utensils", weights: { culture: 2, uniqueness: 1 } } },
  { id: 12, optionA: { text: "Private jet transfers", icon: "Plane", weights: { luxury: 2, travelEase: 1 } }, optionB: { text: "Rickety boat to hidden cove", icon: "Ship", weights: { adventure: 2, uniqueness: 1 } } },
  { id: 13, optionA: { text: "Michelin-starred tasting menu", icon: "Gem", weights: { luxury: 2, culture: 1 } }, optionB: { text: "Street food crawl", icon: "Utensils", weights: { culture: 2, adventure: 1 } } },
  { id: 14, optionA: { text: "Thread count obsession", icon: "Hotel", weights: { luxury: 2, relaxation: 1 } }, optionB: { text: "Glamping under actual stars", icon: "Tent", weights: { adventure: 2, uniqueness: 1 } } },
  { id: 15, optionA: { text: "Hermès amenities", icon: "Sparkles", weights: { luxury: 2, exclusivity: 1 } }, optionB: { text: "Handmade local crafts", icon: "Leaf", weights: { culture: 2, uniqueness: 1 } } },
  { id: 16, optionA: { text: "Coral reef exploration", icon: "Fish", weights: { diving: 2, wildlife: 1 } }, optionB: { text: "Mountain summit sunrise", icon: "Mountain", weights: { adventure: 2, uniqueness: 1 } } },
  { id: 17, optionA: { text: "Underwater photography", icon: "Camera", weights: { diving: 2, wildlife: 1 } }, optionB: { text: "Wildlife safari drive", icon: "Binoculars", weights: { wildlife: 2, adventure: 1 } } },
  { id: 18, optionA: { text: "Night snorkeling bioluminescence", icon: "Sparkles", weights: { diving: 2, uniqueness: 1 } }, optionB: { text: "Desert dune stargazing", icon: "Star", weights: { uniqueness: 2, romance: 1 } } },
  { id: 19, optionA: { text: "Swimming with sea lions", icon: "Waves", weights: { diving: 2, wildlife: 2 } }, optionB: { text: "Horseback through vineyards", icon: "Leaf", weights: { culture: 1, romance: 1, adventure: 1 } } },
  { id: 20, optionA: { text: "Freediving training", icon: "Anchor", weights: { diving: 2, adventure: 1 } }, optionB: { text: "Hot air balloon ride", icon: "CloudSun", weights: { adventure: 2, romance: 1 } } },
  { id: 21, optionA: { text: "Ancient temple exploration", icon: "Map", weights: { culture: 2, uniqueness: 1 } }, optionB: { text: "Pristine untouched wilderness", icon: "TreePine", weights: { wildlife: 2, uniqueness: 1 } } },
  { id: 22, optionA: { text: "Traditional tea ceremony", icon: "Coffee", weights: { culture: 2, luxury: 1 } }, optionB: { text: "Waterfall swimming hole", icon: "Waves", weights: { adventure: 2, relaxation: 1 } } },
  { id: 23, optionA: { text: "Art museum private tour", icon: "Gem", weights: { culture: 2, exclusivity: 1 } }, optionB: { text: "Birdwatching at dawn", icon: "Bird", weights: { wildlife: 2, relaxation: 1 } } },
  { id: 24, optionA: { text: "Cooking class with chef", icon: "Utensils", weights: { culture: 2, luxury: 1 } }, optionB: { text: "Jungle canopy walk", icon: "Leaf", weights: { adventure: 2, wildlife: 1 } } },
  { id: 25, optionA: { text: "Live traditional music", icon: "Music", weights: { culture: 2, romance: 1 } }, optionB: { text: "Waterfall rappelling", icon: "Mountain", weights: { adventure: 2, uniqueness: 1 } } },
  { id: 26, optionA: { text: "Entire island to yourselves", icon: "Globe", weights: { exclusivity: 2, romance: 1 } }, optionB: { text: "Lively resort atmosphere", icon: "Users", weights: { relaxation: 1, travelEase: 1 } } },
  { id: 27, optionA: { text: "No other guests in sight", icon: "Compass", weights: { exclusivity: 2, relaxation: 1 } }, optionB: { text: "Making travel friends", icon: "Heart", weights: { culture: 1, adventure: 1 } } },
  { id: 28, optionA: { text: "Private guide, just us", icon: "Map", weights: { exclusivity: 2, luxury: 1 } }, optionB: { text: "Small group expedition", icon: "Ship", weights: { adventure: 1, wildlife: 1 } } },
  { id: 29, optionA: { text: "Hidden, unlisted property", icon: "Star", weights: { exclusivity: 2, uniqueness: 1 } }, optionB: { text: "Iconic landmark hotel", icon: "Hotel", weights: { luxury: 1, culture: 1 } } },
  { id: 30, optionA: { text: "Zero social media coverage", icon: "Moon", weights: { exclusivity: 2, relaxation: 1 } }, optionB: { text: "Insta-worthy everything", icon: "Camera", weights: { luxury: 1, uniqueness: 1 } } },
  { id: 31, optionA: { text: "Direct flight, easy transfer", icon: "Plane", weights: { travelEase: 2, relaxation: 1 } }, optionB: { text: "36-hour journey to paradise", icon: "Compass", weights: { exclusivity: 2, uniqueness: 1 } } },
  { id: 32, optionA: { text: "Efficient, well-organized", icon: "Map", weights: { travelEase: 2, luxury: 1 } }, optionB: { text: "Deliberately unplugged", icon: "Leaf", weights: { relaxation: 2, exclusivity: 1 } } },
  { id: 33, optionA: { text: "5-star infrastructure", icon: "Hotel", weights: { travelEase: 2, luxury: 1 } }, optionB: { text: "Frontier exploration", icon: "Tent", weights: { adventure: 2, uniqueness: 1 } } },
  { id: 34, optionA: { text: "Reliable WiFi everywhere", icon: "Globe", weights: { travelEase: 2 } }, optionB: { text: "Digital detox forced", icon: "Sun", weights: { relaxation: 2, romance: 1 } } },
  { id: 35, optionA: { text: "English spoken everywhere", icon: "Users", weights: { travelEase: 2 } }, optionB: { text: "Language barrier adventure", icon: "Compass", weights: { culture: 2, adventure: 1 } } },
  { id: 36, optionA: { text: "Once-in-a-lifetime experience", icon: "Star", weights: { uniqueness: 2, adventure: 1 } }, optionB: { text: "Timeless romantic classic", icon: "Heart", weights: { romance: 2, relaxation: 1 } } },
  { id: 37, optionA: { text: "Nobody's heard of it", icon: "Gem", weights: { uniqueness: 2, exclusivity: 1 } }, optionB: { text: "Dream destination checked", icon: "Trophy", weights: { luxury: 1, romance: 1 } } },
  { id: 38, optionA: { text: "Weird and wonderful", icon: "Sparkles", weights: { uniqueness: 2, adventure: 1 } }, optionB: { text: "Proven perfection", icon: "Crown", weights: { luxury: 2, relaxation: 1 } } },
  { id: 39, optionA: { text: "Tell stories forever", icon: "Camera", weights: { uniqueness: 2, adventure: 1 } }, optionB: { text: "Pure peaceful memory", icon: "Heart", weights: { romance: 2, relaxation: 1 } } },
  { id: 40, optionA: { text: "Bucket list destroyer", icon: "Trophy", weights: { uniqueness: 2, adventure: 1 } }, optionB: { text: "Return every anniversary", icon: "Heart", weights: { romance: 2, relaxation: 1 } } },
  { id: 41, optionA: { text: "African bush dinner", icon: "Flame", weights: { wildlife: 1, romance: 1, uniqueness: 1 } }, optionB: { text: "Overwater villa breakfast", icon: "Sun", weights: { luxury: 1, romance: 1, relaxation: 1 } } },
  { id: 42, optionA: { text: "Penguin colony visit", icon: "Bird", weights: { wildlife: 2, uniqueness: 1 } }, optionB: { text: "Polynesian spa ritual", icon: "Flower2", weights: { culture: 1, luxury: 1, relaxation: 1 } } },
  { id: 43, optionA: { text: "Rainforest canopy lodge", icon: "TreePine", weights: { wildlife: 1, adventure: 1, uniqueness: 1 } }, optionB: { text: "Beachfront villa luxury", icon: "Umbrella", weights: { luxury: 1, romance: 1, relaxation: 1 } } },
  { id: 44, optionA: { text: "Night safari spotlights", icon: "Moon", weights: { wildlife: 2, adventure: 1 } }, optionB: { text: "Sunset yacht cruise", icon: "Ship", weights: { romance: 2, luxury: 1 } } },
  { id: 45, optionA: { text: "Conservation volunteering", icon: "Leaf", weights: { wildlife: 1, culture: 1, uniqueness: 1 } }, optionB: { text: "Pure indulgent escape", icon: "Crown", weights: { luxury: 2, relaxation: 1 } } },
  { id: 46, optionA: { text: "Seaplane arrival", icon: "Plane", weights: { luxury: 1, uniqueness: 1, travelEase: 1 } }, optionB: { text: "Overland adventure drive", icon: "Compass", weights: { adventure: 2, culture: 1 } } },
  { id: 47, optionA: { text: "Geisha district walk", icon: "Map", weights: { culture: 2, uniqueness: 1 } }, optionB: { text: "Barrier reef snorkel", icon: "Fish", weights: { diving: 2, wildlife: 1 } } },
  { id: 48, optionA: { text: "Souk treasure hunting", icon: "Gem", weights: { culture: 2, adventure: 1 } }, optionB: { text: "Private island picnic", icon: "Umbrella", weights: { exclusivity: 2, romance: 1 } } },
  { id: 49, optionA: { text: "Northern lights chase", icon: "Sparkles", weights: { uniqueness: 2, adventure: 1 } }, optionB: { text: "Tropical guaranteed sun", icon: "Sun", weights: { relaxation: 2, travelEase: 1 } } },
  { id: 50, optionA: { text: "Active every single day", icon: "Flame", weights: { adventure: 2, wildlife: 1 } }, optionB: { text: "Schedule? What schedule?", icon: "Coffee", weights: { relaxation: 2, romance: 1 } } },
  { id: 51, optionA: { text: "Dramatic landscapes", icon: "Mountain", weights: { adventure: 1, uniqueness: 1, wildlife: 1 } }, optionB: { text: "Turquoise water paradise", icon: "Waves", weights: { diving: 1, relaxation: 1, romance: 1 } } },
  { id: 52, optionA: { text: "Rare endemic species", icon: "Bird", weights: { wildlife: 2, uniqueness: 1 } }, optionB: { text: "Iconic luxury brand", icon: "Crown", weights: { luxury: 2, exclusivity: 1 } } },
  { id: 53, optionA: { text: "February migration timing", icon: "Binoculars", weights: { wildlife: 2, uniqueness: 1 } }, optionB: { text: "February perfect weather", icon: "Sun", weights: { relaxation: 1, travelEase: 1, romance: 1 } } },
  { id: 54, optionA: { text: "Multi-destination journey", icon: "Map", weights: { adventure: 1, culture: 1, uniqueness: 1 } }, optionB: { text: "One place, fully immersed", icon: "Heart", weights: { relaxation: 2, romance: 1 } } },
  { id: 55, optionA: { text: "Photography-focused trip", icon: "Camera", weights: { wildlife: 1, adventure: 1, uniqueness: 1 } }, optionB: { text: "Being present, no phones", icon: "Heart", weights: { romance: 2, relaxation: 1 } } },
];

const ICONS = { Binoculars, Wine, Fish, Flower2, Shell, Moon, Bird, Heart, Sun, Mountain, Waves, Umbrella, TreePine, Coffee, Flame, Star, Crown, Utensils, Gem, Leaf, Music, Hotel, Tent, Camera, Plane, Ship, Anchor, Map, Compass, Globe, CloudSun, Sparkles, Users, Trophy };

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function HoneymoonChoiceGame() {
  const [gameState, setGameState] = useState('intro');
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scenarios, setScenarios] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({ wildlife: 0, romance: 0, adventure: 0, exclusivity: 0, diving: 0, travelEase: 0, culture: 0, luxury: 0, uniqueness: 0, relaxation: 0 });
  const [partnerScores, setPartnerScores] = useState({ wildlife: 0, romance: 0, adventure: 0, exclusivity: 0, diving: 0, travelEase: 0, culture: 0, luxury: 0, uniqueness: 0, relaxation: 0 });
  const [history, setHistory] = useState([]);
  const [partnerHistory, setPartnerHistory] = useState([]);
  const [animating, setAnimating] = useState(null);
  const [isPartnerMode, setIsPartnerMode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const startGame = (partnerMode = false) => {
    setIsPartnerMode(partnerMode);
    setCurrentPlayer(1);
    setScenarios(shuffleArray(SCENARIOS));
    setCurrentIndex(0);
    setScores({ wildlife: 0, romance: 0, adventure: 0, exclusivity: 0, diving: 0, travelEase: 0, culture: 0, luxury: 0, uniqueness: 0, relaxation: 0 });
    setPartnerScores({ wildlife: 0, romance: 0, adventure: 0, exclusivity: 0, diving: 0, travelEase: 0, culture: 0, luxury: 0, uniqueness: 0, relaxation: 0 });
    setHistory([]);
    setPartnerHistory([]);
    setGameState('playing');
  };

  const handleChoice = useCallback((choice) => {
    if (animating) return;
    const scenario = scenarios[currentIndex];
    const option = choice === 'A' ? scenario.optionA : scenario.optionB;
    setAnimating(choice);
    setTimeout(() => {
      const currentScores = currentPlayer === 1 ? scores : partnerScores;
      const setCurrentScores = currentPlayer === 1 ? setScores : setPartnerScores;
      const currentHistory = currentPlayer === 1 ? history : partnerHistory;
      const setCurrentHistory = currentPlayer === 1 ? setHistory : setPartnerHistory;
      const newScores = { ...currentScores };
      Object.entries(option.weights).forEach(([key, value]) => {
        newScores[key] = (newScores[key] || 0) + value;
      });
      setCurrentScores(newScores);
      setCurrentHistory([...currentHistory, { scenarioId: scenario.id, choice, index: currentIndex }]);
      setAnimating(null);
      setCurrentIndex(prev => prev + 1);
    }, 300);
  }, [animating, scenarios, currentIndex, scores, partnerScores, history, partnerHistory, currentPlayer]);

  const handleUndo = () => {
    const currentHistory = currentPlayer === 1 ? history : partnerHistory;
    if (currentHistory.length === 0) return;
    const setCurrentHistory = currentPlayer === 1 ? setHistory : setPartnerHistory;
    const currentScores = currentPlayer === 1 ? scores : partnerScores;
    const setCurrentScores = currentPlayer === 1 ? setScores : setPartnerScores;
    const lastChoice = currentHistory[currentHistory.length - 1];
    const scenario = scenarios[lastChoice.index];
    const option = lastChoice.choice === 'A' ? scenario.optionA : scenario.optionB;
    const newScores = { ...currentScores };
    Object.entries(option.weights).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) - value;
    });
    setCurrentScores(newScores);
    setCurrentHistory(currentHistory.slice(0, -1));
    setCurrentIndex(lastChoice.index);
  };

  const switchToPartner = () => {
    setCurrentPlayer(2);
    setCurrentIndex(0);
  };

  const calculateResults = useMemo(() => {
    const finalScores = isPartnerMode 
      ? Object.keys(scores).reduce((acc, key) => { acc[key] = scores[key] + partnerScores[key]; return acc; }, {})
      : scores;
    const rankings = Object.entries(DESTINATIONS).map(([key, dest]) => {
      let totalScore = 0, maxPossible = 0;
      Object.entries(dest.scores).forEach(([dim, destScore]) => {
        const weight = Math.abs(finalScores[dim] || 0);
        totalScore += destScore * weight;
        maxPossible += 10 * weight;
      });
      const percentage = maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0;
      return { key, ...dest, totalScore, percentage };
    });
    return rankings.sort((a, b) => b.percentage - a.percentage);
  }, [scores, partnerScores, isPartnerMode]);

  const partnerAlignment = useMemo(() => {
    if (!isPartnerMode) return null;
    const aligned = [], divergent = [];
    Object.keys(scores).forEach(dim => {
      const diff = Math.abs(scores[dim] - partnerScores[dim]);
      const avg = (Math.abs(scores[dim]) + Math.abs(partnerScores[dim])) / 2;
      if (avg > 0) {
        if (diff <= avg * 0.3) aligned.push(dim);
        else if (diff > avg * 0.6) divergent.push(dim);
      }
    });
    return { aligned, divergent };
  }, [scores, partnerScores, isPartnerMode]);

  const currentScenario = scenarios[currentIndex];
  const progress = Math.min((currentIndex / scenarios.length) * 100, 100);
  const roundsPlayed = currentPlayer === 1 ? history.length : partnerHistory.length;
  const renderIcon = (iconName, className) => { const Icon = ICONS[iconName]; return Icon ? <Icon className={className} /> : null; };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap');`}</style>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
      </div>

      {gameState === 'intro' && (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-400 blur-2xl opacity-20 animate-pulse" />
              <Heart className="w-20 h-20 mx-auto text-amber-400 relative" strokeWidth={1} />
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-wide mb-4 bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 bg-clip-text text-transparent">Honeymoon</h1>
            <p className="text-2xl md:text-3xl text-slate-400 font-light tracking-widest mb-2">THIS OR THAT</p>
            <p className="text-slate-500 text-lg mb-12 font-light">55 choices to find your perfect destination</p>
            <div className="space-y-4">
              <button onClick={() => startGame(false)} className="w-full max-w-sm mx-auto block px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl text-slate-950 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/25">
                <Compass className="inline-block w-5 h-5 mr-2 -mt-1" />Solo Discovery
              </button>
              <button onClick={() => startGame(true)} className="w-full max-w-sm mx-auto block px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-amber-500/50 rounded-xl text-slate-200 font-medium text-lg transition-all duration-300 hover:scale-105">
                <Users className="inline-block w-5 h-5 mr-2 -mt-1" />Partner Mode
              </button>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 text-center text-slate-500 text-sm">
              <div><Globe className="w-6 h-6 mx-auto mb-2 text-slate-600" /><p>11 Destinations</p></div>
              <div><Sparkles className="w-6 h-6 mx-auto mb-2 text-slate-600" /><p>10 Dimensions</p></div>
              <div><Trophy className="w-6 h-6 mx-auto mb-2 text-slate-600" /><p>$50k Budget</p></div>
            </div>
          </div>
        </div>
      )}

      {gameState === 'playing' && currentScenario && (
        <div className="relative min-h-screen flex flex-col p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {isPartnerMode && <span className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-sm">Partner {currentPlayer}</span>}
              <span className="text-slate-500 text-sm">Round {roundsPlayed + 1}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleUndo} disabled={roundsPlayed === 0} className="p-2 text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Undo"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => setCurrentIndex(prev => prev + 1)} className="p-2 text-slate-500 hover:text-white transition-colors" title="Skip"><ChevronRight className="w-5 h-5" /></button>
              <button onClick={() => setShowInfo(!showInfo)} className="p-2 text-slate-500 hover:text-white transition-colors"><Sparkles className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="h-1 bg-slate-800 rounded-full mb-8 overflow-hidden"><div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto w-full">
            <button onClick={() => handleChoice('A')} disabled={animating} className={`relative flex-1 w-full md:w-auto min-h-[180px] md:min-h-[320px] p-8 rounded-3xl border-2 transition-all duration-300 group ${animating === 'A' ? 'scale-95 opacity-50 border-amber-400' : 'border-slate-700 hover:border-amber-400/50 hover:scale-[1.02]'} bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-amber-500/10`}>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">{renderIcon(currentScenario.optionA.icon, "w-8 h-8 text-amber-400")}</div>
                <p className="text-xl md:text-2xl font-light text-center text-slate-100 group-hover:text-white transition-colors">{currentScenario.optionA.text}</p>
              </div>
            </button>
            <div className="text-slate-600 text-sm font-light tracking-widest py-2 md:py-0">OR</div>
            <button onClick={() => handleChoice('B')} disabled={animating} className={`relative flex-1 w-full md:w-auto min-h-[180px] md:min-h-[320px] p-8 rounded-3xl border-2 transition-all duration-300 group ${animating === 'B' ? 'scale-95 opacity-50 border-rose-400' : 'border-slate-700 hover:border-rose-400/50 hover:scale-[1.02]'} bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-rose-500/10`}>
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">{renderIcon(currentScenario.optionB.icon, "w-8 h-8 text-rose-400")}</div>
                <p className="text-xl md:text-2xl font-light text-center text-slate-100 group-hover:text-white transition-colors">{currentScenario.optionB.text}</p>
              </div>
            </button>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            {isPartnerMode && currentPlayer === 1 && roundsPlayed >= 15 && <button onClick={switchToPartner} className="px-6 py-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-xl transition-colors">Switch to Partner 2 →</button>}
            {((isPartnerMode && currentPlayer === 2) || !isPartnerMode) && roundsPlayed >= 15 && <button onClick={() => setGameState('results')} className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-semibold transition-all hover:scale-105"><Trophy className="inline-block w-4 h-4 mr-2 -mt-0.5" />See Results</button>}
          </div>
          {showInfo && (
            <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6 z-50" onClick={() => setShowInfo(false)}>
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-light mb-4 text-amber-400">Your Preferences</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(currentPlayer === 1 ? scores : partnerScores).sort((a, b) => b[1] - a[1]).map(([key, value]) => (
                    <div key={key} className="flex justify-between"><span className="text-slate-400 capitalize">{key}</span><span className={value > 0 ? 'text-emerald-400' : value < 0 ? 'text-rose-400' : 'text-slate-500'}>{value > 0 ? '+' : ''}{value}</span></div>
                  ))}
                </div>
                <button onClick={() => setShowInfo(false)} className="mt-6 w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">Close</button>
              </div>
            </div>
          )}
        </div>
      )}

      {gameState === 'playing' && !currentScenario && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <Sparkles className="w-16 h-16 text-amber-400 mb-6" />
          <h2 className="text-3xl font-light mb-4">All scenarios complete!</h2>
          <p className="text-slate-400 mb-8">You've answered all 55 questions</p>
          <button onClick={() => setGameState('results')} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl font-semibold hover:scale-105 transition-transform"><Trophy className="inline-block w-5 h-5 mr-2 -mt-0.5" />Reveal Your Match</button>
        </div>
      )}

      {gameState === 'results' && (
        <div className="relative min-h-screen p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-amber-400" />
              <h1 className="text-4xl md:text-5xl font-light mb-2 bg-gradient-to-r from-amber-200 to-rose-200 bg-clip-text text-transparent">Your Perfect Match</h1>
              <p className="text-slate-500">Based on {history.length + partnerHistory.length} choices</p>
            </div>
            {isPartnerMode && partnerAlignment && (
              <div className="mb-10 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                <h3 className="text-lg font-light text-amber-400 mb-4">Partner Alignment</h3>
                {partnerAlignment.aligned.length > 0 && <p className="text-slate-300 mb-2"><span className="text-emerald-400">✓ Aligned on:</span> {partnerAlignment.aligned.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')}</p>}
                {partnerAlignment.divergent.length > 0 && <p className="text-slate-300"><span className="text-rose-400">△ Discuss:</span> {partnerAlignment.divergent.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')}</p>}
              </div>
            )}
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {calculateResults.slice(0, 3).map((dest, idx) => (
                <div key={dest.key} className={`relative p-6 rounded-2xl border-2 transition-all duration-500 ${idx === 0 ? 'md:order-2 bg-gradient-to-br from-amber-500/20 to-slate-900 border-amber-500/50 md:scale-105 md:-mt-4' : idx === 1 ? 'md:order-1 bg-slate-900/50 border-slate-700' : 'md:order-3 bg-slate-900/50 border-slate-700'}`}>
                  <div className={`text-4xl font-light mb-2 ${idx === 0 ? 'text-amber-400' : 'text-slate-500'}`}>#{idx + 1}</div>
                  <h3 className="text-xl font-light mb-1">{dest.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{dest.tagline}</p>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-1000" style={{ width: `${dest.percentage}%`, background: dest.gradient }} /></div>
                  <p className="text-right text-sm text-slate-400 mt-2">{Math.round(dest.percentage)}% match</p>
                  <p className="text-amber-400/70 text-sm mt-1">{dest.budget}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-light text-slate-300 mb-4">All Destinations</h3>
              <div className="space-y-3">
                {calculateResults.map((dest, idx) => (
                  <div key={dest.key} className="flex items-center gap-4">
                    <span className="w-8 text-slate-500 text-sm">#{idx + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1"><span className="text-slate-200">{dest.name}</span><span className="text-slate-500 text-sm">{Math.round(dest.percentage)}%</span></div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${dest.percentage}%`, background: dest.gradient }} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-slate-900">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0" style={{ background: calculateResults[0].gradient }}><Globe className="w-10 h-10 text-white" /></div>
                <div><h2 className="text-2xl md:text-3xl font-light mb-2">{calculateResults[0].name}</h2><p className="text-slate-400 mb-4">{calculateResults[0].description}</p><p className="text-amber-400 text-lg">{calculateResults[0].budget}</p></div>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button onClick={() => setGameState('intro')} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-2"><RotateCcw className="w-4 h-4" />Play Again</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
