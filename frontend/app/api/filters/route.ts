import { type NextRequest, NextResponse } from "next/server"

// This would normally be loaded from a database or external file
// For this example, we'll include the data directly
const filtersData = [
  { Animal: "Antelope", "Filter Name": "Savanna Glow", "Filter Description": "Adds a golden sunset background with a shimmering effect on the antelope's horns." },
  { Animal: "Badger", "Filter Name": "Underground Explorer", "Filter Description": "Adds a dirt and tunnel background with a miner's helmet on the badger." },
  { Animal: "Bat", "Filter Name": "Night Flyer", "Filter Description": "Adds a moonlit sky with glowing eyes and a subtle flapping wing animation." },
  { Animal: "Bear", "Filter Name": "Forest Guardian", "Filter Description": "Adds a lush forest background with a crown of leaves on the bear's head." },
  { Animal: "Bee", "Filter Name": "Honey Drip", "Filter Description": "Adds a honeycomb background with dripping honey effect and tiny flowers around the bee." },
  { Animal: "Beetle", "Filter Name": "Metallic Shine", "Filter Description": "Adds a metallic texture to the beetle's shell with a rainbow reflection." },
  { Animal: "Bison", "Filter Name": "Prairie Storm", "Filter Description": "Adds a stormy prairie background with lightning effects around the bison." },
  { Animal: "Boar", "Filter Name": "Muddy Adventurer", "Filter Description": "Adds a muddy terrain background with splashes of mud on the boar." },
  { Animal: "Butterfly", "Filter Name": "Rainbow Wings", "Filter Description": "Adds a colorful, gradient effect to the butterfly's wings with sparkling particles." },
  { Animal: "Cat", "Filter Name": "Mystical Feline", "Filter Description": "Adds a magical, starry background with glowing eyes and a crescent moon crown." },
  { Animal: "Caterpillar", "Filter Name": "Cocoon Glow", "Filter Description": "Adds a glowing cocoon background with a trail of sparkling dust." },
  { Animal: "Chimpanzee", "Filter Name": "Jungle King", "Filter Description": "Adds a dense jungle background with a crown of vines and flowers." },
  { Animal: "Cockroach", "Filter Name": "Urban Survivor", "Filter Description": "Adds a cityscape background with a gritty, urban texture." },
  { Animal: "Cow", "Filter Name": "Meadow Grazer", "Filter Description": "Adds a sunny meadow background with flowers and a grazing effect." },
  { Animal: "Coyote", "Filter Name": "Desert Howl", "Filter Description": "Adds a desert background with a glowing moon and a howling animation." },
  { Animal: "Crab", "Filter Name": "Beach Party", "Filter Description": "Adds a beach background with sunglasses and a tiny surfboard." },
  { Animal: "Crow", "Filter Name": "Gothic Night", "Filter Description": "Adds a dark, gothic castle background with glowing red eyes." },
  { Animal: "Deer", "Filter Name": "Enchanted Forest", "Filter Description": "Adds a magical forest background with glowing antlers." },
  { Animal: "Dog", "Filter Name": "Loyal Companion", "Filter Description": "Adds a cozy living room background with a bone-shaped name tag." },
  { Animal: "Dolphin", "Filter Name": "Ocean Wave", "Filter Description": "Adds an underwater scene with bubbles and a wave animation." },
  { Animal: "Donkey", "Filter Name": "Countryside Wanderer", "Filter Description": "Adds a countryside background with a straw hat and a cart." },
  { Animal: "Dragonfly", "Filter Name": "Fairy Dust", "Filter Description": "Adds a magical, sparkling background with a trail of fairy dust." },
  { Animal: "Duck", "Filter Name": "Pond Ripples", "Filter Description": "Adds a pond background with ripples and lily pads." },
  { Animal: "Eagle", "Filter Name": "Sky Sovereign", "Filter Description": "Adds a mountain peak background with a soaring animation." },
  { Animal: "Elephant", "Filter Name": "Jungle Giant", "Filter Description": "Adds a jungle background with a waterfall and glowing tusks." },
  { Animal: "Flamingo", "Filter Name": "Tropical Sunset", "Filter Description": "Adds a tropical beach background with a pink sunset." },
  { Animal: "Fly", "Filter Name": "Buzzing Frenzy", "Filter Description": "Adds a chaotic, swarming background with a buzzing sound effect." },
  { Animal: "Fox", "Filter Name": "Arctic Glow", "Filter Description": "Adds a snowy background with glowing blue eyes and a frost effect." },
  { Animal: "Goat", "Filter Name": "Mountain Climber", "Filter Description": "Adds a rocky mountain background with a climbing animation." },
  { Animal: "Goldfish", "Filter Name": "Aquarium Bubbles", "Filter Description": "Adds an aquarium background with bubbles and colorful pebbles." },
  { Animal: "Goose", "Filter Name": "Lake Serenity", "Filter Description": "Adds a calm lake background with a reflection effect." },
  { Animal: "Gorilla", "Filter Name": "Jungle Power", "Filter Description": "Adds a jungle background with a chest-thumping animation." },
  { Animal: "Grasshopper", "Filter Name": "Field Jumper", "Filter Description": "Adds a grassy field background with a jumping animation." },
  { Animal: "Hamster", "Filter Name": "Wheel Runner", "Filter Description": "Adds a hamster wheel background with a running animation." },
  { Animal: "Hare", "Filter Name": "Moonlit Meadow", "Filter Description": "Adds a moonlit meadow background with a glowing aura." },
  { Animal: "Hedgehog", "Filter Name": "Autumn Leaves", "Filter Description": "Adds an autumn forest background with falling leaves." },
  { Animal: "Hippopotamus", "Filter Name": "River Guardian", "Filter Description": "Adds a river background with a splashing water effect." },
  { Animal: "Hornbill", "Filter Name": "Rainforest Canopy", "Filter Description": "Adds a rainforest background with a canopy of leaves." },
  { Animal: "Horse", "Filter Name": "Galloping Plains", "Filter Description": "Adds a grassy plain background with a galloping animation." },
  { Animal: "Hummingbird", "Filter Name": "Flower Nectar", "Filter Description": "Adds a garden background with blooming flowers and a hovering animation." },
  { Animal: "Hyena", "Filter Name": "Savanna Laugh", "Filter Description": "Adds a savanna background with a laughing animation." },
  { Animal: "Jellyfish", "Filter Name": "Deep Sea Glow", "Filter Description": "Adds a deep-sea background with a bioluminescent glow." },
  { Animal: "Kangaroo", "Filter Name": "Outback Hopper", "Filter Description": "Adds an Australian outback background with a hopping animation." },
  { Animal: "Koala", "Filter Name": "Eucalyptus Dream", "Filter Description": "Adds a eucalyptus forest background with a sleepy animation." },
  { Animal: "Ladybugs", "Filter Name": "Garden Party", "Filter Description": "Adds a garden background with multiple ladybugs and flowers." },
  { Animal: "Leopard", "Filter Name": "Jungle Stalker", "Filter Description": "Adds a jungle background with a stalking animation." },
  { Animal: "Lion", "Filter Name": "Savanna King", "Filter Description": "Adds a savanna background with a roaring animation." },
  { Animal: "Lizard", "Filter Name": "Desert Heat", "Filter Description": "Adds a desert background with a heatwave effect." },
  { Animal: "Lobster", "Filter Name": "Ocean Floor", "Filter Description": "Adds an ocean floor background with coral and bubbles." },
  { Animal: "Mosquito", "Filter Name": "Swarm Alert", "Filter Description": "Adds a chaotic, swarming background with a buzzing sound effect." },
  { Animal: "Moth", "Filter Name": "Moonlight Glow", "Filter Description": "Adds a moonlit background with a glowing effect." },
  { Animal: "Mouse", "Filter Name": "Cheese Lover", "Filter Description": "Adds a cheese background with a nibbling animation." },
  { Animal: "Octopus", "Filter Name": "Deep Sea Tentacles", "Filter Description": "Adds a deep-sea background with moving tentacles." },
  { Animal: "Okapi", "Filter Name": "Forest Mystery", "Filter Description": "Adds a dense forest background with a mysterious aura." },
  { Animal: "Orangutan", "Filter Name": "Rainforest Swing", "Filter Description": "Adds a rainforest background with a swinging animation." },
  { Animal: "Otter", "Filter Name": "River Play", "Filter Description": "Adds a river background with a playful animation." },
  { Animal: "Owl", "Filter Name": "Night Watch", "Filter Description": "Adds a moonlit forest background with glowing eyes." },
  { Animal: "Ox", "Filter Name": "Plow Puller", "Filter Description": "Adds a farmland background with a plowing animation." },
  { Animal: "Oyster", "Filter Name": "Pearl Glow", "Filter Description": "Adds an underwater background with a glowing pearl." },
  { Animal: "Panda", "Filter Name": "Bamboo Forest", "Filter Description": "Adds a bamboo forest background with a munching animation." },
  { Animal: "Parrot", "Filter Name": "Tropical Chatter", "Filter Description": "Adds a tropical jungle background with a talking animation." },
  { Animal: "Pelecaniformes", "Filter Name": "Ocean Dive", "Filter Description": "Adds an ocean background with a diving animation." },
  { Animal: "Penguin", "Filter Name": "Ice Slide", "Filter Description": "Adds an icy background with a sliding animation." },
  { Animal: "Pig", "Filter Name": "Muddy Fun", "Filter Description": "Adds a muddy farm background with a rolling animation." },
  { Animal: "Pigeon", "Filter Name": "City Flyer", "Filter Description": "Adds a cityscape background with a flying animation." },
  { Animal: "Porcupine", "Filter Name": "Forest Defender", "Filter Description": "Adds a forest background with quills that glow." },
  { Animal: "Possum", "Filter Name": "Night Crawler", "Filter Description": "Adds a dark forest background with glowing eyes." },
  { Animal: "Raccoon", "Filter Name": "Trash Bandit", "Filter Description": "Adds a city dump background with a sneaky animation." },
  { Animal: "Rat", "Filter Name": "Sewer Scout", "Filter Description": "Adds a sewer background with a scuttling animation." },
  { Animal: "Reindeer", "Filter Name": "Snowy Trek", "Filter Description": "Adds a snowy forest background with a glowing nose." },
  { Animal: "Rhinoceros", "Filter Name": "Savanna Charge", "Filter Description": "Adds a savanna background with a charging animation." },
  { Animal: "Sandpiper", "Filter Name": "Beach Runner", "Filter Description": "Adds a beach background with a running animation." },
  { Animal: "Seahorse", "Filter Name": "Coral Dance", "Filter Description": "Adds a coral reef background with a dancing animation." },
  { Animal: "Seal", "Filter Name": "Ice Floe Rest", "Filter Description": "Adds an icy background with a resting animation." },
  { Animal: "Shark", "Filter Name": "Ocean Predator", "Filter Description": "Adds an ocean background with a circling animation." },
  { Animal: "Sheep", "Filter Name": "Meadow Fluff", "Filter Description": "Adds a meadow background with a fluffy cloud effect." },
  { Animal: "Snake", "Filter Name": "Desert Slither", "Filter Description": "Adds a desert background with a slithering animation." },
  { Animal: "Sparrow", "Filter Name": "City Chirp", "Filter Description": "Adds a cityscape background with a chirping animation." },
  { Animal: "Squid", "Filter Name": "Deep Sea Ink", "Filter Description": "Adds a deep-sea background with an ink cloud effect." },
  { Animal: "Squirrel", "Filter Name": "Nut Collector", "Filter Description": "Adds a forest background with a nut-gathering animation." },
  { Animal: "Starfish", "Filter Name": "Ocean Floor Glow", "Filter Description": "Adds an ocean floor background with a glowing effect." },
  { Animal: "Swan", "Filter Name": "Lake Elegance", "Filter Description": "Adds a serene lake background with a graceful swimming animation." },
  { Animal: "Tiger", "Filter Name": "Jungle Roar", "Filter Description": "Adds a jungle background with a roaring animation." },
  { Animal: "Turkey", "Filter Name": "Farmyard Strut", "Filter Description": "Adds a farm background with a strutting animation." },
  { Animal: "Turtle", "Filter Name": "Ocean Wanderer", "Filter Description": "Adds an ocean background with a slow swimming animation." },
  { Animal: "Whale", "Filter Name": "Ocean Giant", "Filter Description": "Adds an ocean background with a breaching animation." },
  { Animal: "Wolf", "Filter Name": "Moonlit Howl", "Filter Description": "Adds a snowy forest background with a howling animation." },
  { Animal: "Wombat", "Filter Name": "Burrow Digger", "Filter Description": "Adds a grassy background with a digging animation." },
  { Animal: "Woodpecker", "Filter Name": "Tree Tapper", "Filter Description": "Adds a forest background with a pecking animation." },
  { Animal: "Zebra", "Filter Name": "Savanna Stripes", "Filter Description": "Adds a savanna background with a glowing stripe effect." }
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const animal = searchParams.get("animal")?.toLowerCase()

  if (!animal) {
    return NextResponse.json({ error: "Animal parameter is required" }, { status: 400 })
  }

  const filter = filtersData.find((f) => f.Animal.toLowerCase() === animal)

  if (!filter) {
    return NextResponse.json({ error: "Filter not found for this animal" }, { status: 404 })
  }

  return NextResponse.json({
    name: filter["Filter Name"],
    description: filter["Filter Description"],
  })
}

