// word|clue|tag   tags: s science, g geography, f food, h history, m myth & arts, l words, n nature, o everyday
const WORDS=`
OXYGEN|Element 8, needed for breathing and burning|s
PHOTON|Quantum of light|s
GRAVITY|Force that keeps the Moon in orbit|s
ENZYME|Biological catalyst, usually a protein|s
NEURON|Nerve cell|s
ATOM|Smallest unit of an element|s
MOLECULE|Two or more atoms bonded together|s
ECLIPSE|Moon blocking the Sun, perhaps|s
GALAXY|Milky Way, for one|s
PLANET|Mars or Venus|s
COMET|Icy visitor with a glowing tail|s
ORBIT|Path around a star|s
PRISM|It splits white light into a spectrum|s
MAGNET|Iron is drawn to it|s
ENERGY|Joules measure it|s
PROTON|Positive particle in a nucleus|s
ELECTRON|Negative particle circling a nucleus|s
CARBON|Diamond and graphite are forms of it|s
HELIUM|Second element, lighter than air|s
NITROGEN|Most of the air you breathe|s
GENOME|Complete set of an organism’s DNA|s
VIRUS|Pathogen needing a host cell to replicate|s
AURORA|Northern lights|s
TIDE|Moon-driven sea movement|s
MOON|Earth’s satellite|s
STAR|Sun, for instance|s
MARS|Red planet|s
VENUS|Hottest planet|s
SATURN|Ringed giant|s
FOSSIL|Ancient remains preserved in rock|n
GLACIER|Slow river of ice|n
VOLCANO|Mountain that vents magma|n
CORAL|Reef builder|n
RAIN|Falls from clouds|n
STORM|Thunder’s companion|n
EAGLE|Bird of prey|n
WHALE|Largest mammal|n
ELEPHANT|Largest land animal|n
GIRAFFE|Tallest animal|n
PENGUIN|Flightless Antarctic bird|n
DOLPHIN|Intelligent marine mammal|n
OCTOPUS|Eight-armed mollusc|n
TIGER|Striped big cat|n
LEMUR|Madagascar primate|n
KOALA|Eucalyptus eater|n
OWL|Nocturnal hunter|n
BEE|Honey maker|n
ANT|Colony worker|n
FERN|Frond plant|n
MOSS|Soft green carpet on rocks|n
PINE|Cone-bearing evergreen|n
LOTUS|Sacred water flower|n
CACTUS|Spiny desert plant|n
TIMBER|Wood for building|n
TUNDRA|Treeless Arctic plain|g
DESERT|Sahara or Gobi|g
SAVANNA|Grassland dotted with trees|g
OCEAN|Pacific or Atlantic|g
RIVER|Nile or Amazon|g
ISLAND|Land surrounded by water|g
ISLE|Small island, poetically|g
PENINSULA|Land almost surrounded by water|g
CANYON|Deep gorge cut by a river|g
DELTA|Fan-shaped river mouth|g
EQUATOR|Zero degrees latitude|g
MERIDIAN|Line of longitude|g
ARCHIPELAGO|Chain of islands|g
ICELAND|Land of geysers and sagas|g
KENYA|East African country with Nairobi|g
PERU|Home of Machu Picchu|g
NEPAL|Himalayan country with Kathmandu|g
EGYPT|Land of the pyramids|g
BRAZIL|Largest country in South America|g
CANADA|Country with ten provinces|g
INDIA|Country of the Ganges|g
JAPAN|Island nation with Tokyo|g
MOROCCO|North African nation with Marrakech|g
ANDES|South American mountain chain|g
ALPS|Mont Blanc’s range|g
SAHARA|Largest hot desert|g
BORNEO|Third-largest island, shared by three nations|g
MADAGASCAR|Island home of lemurs|g
BREAD|Baked staple|f
CHEESE|Brie or cheddar|f
PASTA|Penne or fusilli|f
SUSHI|Vinegared rice with fish|f
CURRY|Spiced dish with sauce|f
PEPPER|Black or chili|f
GARLIC|Pungent bulb said to ward off vampires|f
GINGER|Spicy root used in tea|f
SAFFRON|Costliest spice by weight|f
VANILLA|Orchid-derived flavouring|f
CHOCOLATE|Made from cacao|f
HONEY|Bees’ product|f
YOGURT|Cultured milk|f
NOODLE|Ramen strand|f
RICE|Paddy crop|f
TOMATO|Botanically a fruit, culinarily a vegetable|f
OLIVE|Source of a Mediterranean oil|f
MANGO|Tropical stone fruit|f
LEMON|Sour citrus|f
COCONUT|Palm fruit with milk inside|f
TEA|Camellia brew|f
COFFEE|Bean brew|f
SPICE|Cumin or clove|f
PYRAMID|Giza structure|h
ROMAN|Latin speaker of old|h
VIKING|Norse seafarer|h
PHARAOH|Ancient Egyptian ruler|h
EMPIRE|Realm with an emperor|h
CASTLE|Medieval fortress|h
KNIGHT|Armoured horseman, or chess piece|h
SAMURAI|Feudal Japanese warrior|h
COLOSSEUM|Rome’s great amphitheatre|h
ATLANTIS|Mythical sunken island|m
ZEUS|Greek king of the gods|m
ODIN|Norse All-father|m
THOR|Thunder god with a hammer|m
ANUBIS|Jackal-headed Egyptian god|m
DRAGON|Fire-breather of legend|m
PHOENIX|Bird reborn from ashes|m
UNICORN|One-horned legend|m
TITAN|Giant of Greek myth|m
ODYSSEY|Long wandering journey, or Homer’s epic|m
SONNET|Fourteen-line poem|m
OPERA|Sung drama|m
PIANO|Instrument with 88 keys|m
VIOLIN|Strings played with a bow|m
DRUM|Percussion instrument|m
FLUTE|Woodwind blown across a hole|m
CANVAS|Painter’s surface|m
SCULPTURE|Carved or modelled art|m
MURAL|Wall painting|m
SYNONYM|Word with the same meaning|l
ALPHABET|A to Z|l
VOWEL|A, E, I, O or U|l
VERB|Action word|l
NOUN|Person, place or thing|l
IDIOM|Phrase not meant literally|l
RIDDLE|Puzzling question|l
ANAGRAM|“Listen” rearranged to “silent”|l
PALINDROME|Reads the same both ways|l
COMPASS|Needle that points north|o
MAP|Cartographer’s creation|o
CLOCK|Keeps time|o
BRIDGE|Spans a gap|o
TUNNEL|Passage through a hill|o
LANTERN|Portable light|o
ANCHOR|Holds a ship in place|o
SAIL|Wind catcher|o
ENGINE|Powers a car|o
ROCKET|Spacecraft launcher|o
SATELLITE|Orbiting artificial moon|o
TELESCOPE|Star gazer’s tool|o
MICROSCOPE|Magnifies the tiny|o
LIBRARY|Home of borrowed books|o
CHESS|Game of kings|o
PUZZLE|Brain teaser|o
MARATHON|26.2 miles|o
OLYMPICS|Games held every four years|o
ARCH|Curved span|o
`;
