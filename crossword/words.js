// word|clue|tag   tags: s science, g geography, f food, h history, m myth & arts, l words, n nature, o everyday, t technology, w Doctor Who
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
ANTONYM|Word opposite in meaning|l
HOMONYM|Same spelling or sound as another word, different meaning|l
ACRONYM|NASA or laser, for example|l
PUN|Joke that plays on a word’s double meaning|l
LIMERICK|Five-line comic verse|l
HAIKU|Three-line poem of 5, 7 and 5 syllables|l
METAPHOR|“Time is a thief”, say|l
SIMILE|Comparison using “like” or “as”|l
ALLITERATION|Repeated opening sounds, as in “silly snakes”|l
ONOMATOPOEIA|Word that sounds like what it names, such as “buzz”|l
SYLLABLE|One beat of a word|l
CONSONANT|Letter that isn’t a vowel|l
PREFIX|Added to the front of a word|l
SUFFIX|Added to the end of a word|l
ADJECTIVE|Describing word|l
ADVERB|Word that modifies a verb|l
PRONOUN|“She” or “they”|l
GRAMMAR|Rules of a language|l
DIALECT|Regional variety of a language|l
ACCENT|Way of pronouncing, or a mark above a letter|l
VOCABULARY|All the words you know|l
ETYMOLOGY|Study of where words come from|l
THESAURUS|Book of synonyms|l
DICTIONARY|Where definitions live|l
TRANSLATE|Convert into another language|l
PROVERB|Short saying of old wisdom|l
SLOGAN|Catchy advertising phrase|l
RHYME|Words that end alike|l
CRYPTIC|Crossword style full of wordplay|l
CIPHER|Secret code|l
TYPO|Slip of the finger on a keyboard|l
EUPHEMISM|Mild word for something blunt|l
OXYMORON|“Jumbo shrimp”, for instance|l
HYPHEN|Short dash joining words|l
COLON|Mark that often introduces a list|l
APOSTROPHE|Mark showing possession or a missing letter|l
SEMICOLON|Mark linking two related clauses|l
ELLIPSIS|Three dots showing omitted words|l
CLICHE|Overused phrase|l
JARGON|Specialist talk|l
SPOONERISM|Swapping sounds, as in “a well-boiled icicle”|l
ENIGMA|Puzzling mystery|l
CHARADES|Party game of acting out words|l
SCRABBLE|Tile game of making words|l
HANGMAN|Word-guessing game with a gallows|l
ALGORITHM|Step-by-step procedure for solving a problem|t
BROWSER|Program for visiting web pages|t
CURSOR|Blinking marker showing where typing appears|t
KERNEL|Core of an operating system|t
COMPILER|Translates source code into machine code|t
BINARY|Base-2 number system|t
PIXEL|Smallest dot on a screen|t
BYTE|Eight bits|t
BIT|Binary digit|t
ROUTER|Directs traffic between networks|t
MODEM|Links a computer to a phone or cable line|t
SERVER|Computer that answers requests|t
CLOUD|Remote servers that store your files|t
FIREWALL|Network gatekeeper blocking unwanted traffic|t
PASSWORD|Secret word for logging in|t
ENCRYPT|Scramble data so only keyholders can read it|t
CACHE|Fast store of recently used data|t
BUFFER|Temporary holding area for data in transit|t
SOFTWARE|Programs, as opposed to hardware|t
HARDWARE|The physical parts of a computer|t
KEYBOARD|Home of QWERTY|t
LAPTOP|Portable computer|t
SENSOR|Detects light, heat or motion|t
BATTERY|Phone’s power store|t
TOUCHSCREEN|Display you operate with your fingers|t
PROCESSOR|Chip that runs instructions|t
LINUX|Open-source kernel named after its creator Linus|t
PYTHON|Programming language named after a comedy troupe|t
ROBOT|Machine that automates tasks|t
DRONE|Unmanned flying machine|t
LASER|Beam of coherent light|t
CODE|What programmers write|t
DEBUG|Hunt down the errors in a program|t
LOOP|Code that repeats|t
VARIABLE|Named container for a value in a program|t
FUNCTION|Reusable block of code|t
DATABASE|Organised store of records|t
NETWORK|Linked computers|t
EMAIL|Digital letter|t
WEBSITE|Collection of pages at one address|t
EMOJI|Small picture used in messages|t
PODCAST|Downloadable audio show|t
WI-FI|Wireless networking|t
BLUETOOTH|Short-range wireless tech named after a Danish king|t
USB|Common port for plugging in peripherals|t
GIGABYTE|A billion bytes, roughly|t
SPREADSHEET|Grid of cells with formulas|t
SCREENSHOT|Picture of what’s on your display|t
PRINTER|Puts a document on paper|t
MOUSE|Pointing device, or small rodent|t
ABACUS|Ancient counting frame|t
TURING|Alan ___, codebreaker and computing pioneer|t
LOVELACE|Ada ___, early programmer|t
TARDIS|Time machine that’s bigger on the inside|w
DALEK|Rolling armoured menace who shouts “Exterminate!”|w
CYBERMAN|Metal-clad former human with emotions removed|w
SONTARAN|Clone warrior race at war with the Rutans|w
SILURIAN|Reptilian race woken from hibernation beneath Earth|w
SKARO|Home planet of the Daleks|w
GALLIFREY|Home planet of the Time Lords|w
MONDAS|Original home of the Cybermen|w
TRENZALORE|Planet where the Doctor’s grave was foretold|w
DAVROS|Creator of the Daleks|w
MASTER|The Doctor’s arch-enemy, a fellow Time Lord|w
MISSY|Female incarnation of the Master|w
RASSILON|Legendary founder of Time Lord society|w
OOD|Servile alien race with tentacled faces|w
ANGEL|Weeping ___, statue that moves when unseen|w
ADIPOSE|Cute white aliens made from human fat|w
SLITHEEN|Family of green aliens wearing human skin suits|w
UNIT|Military body that investigates alien threats|w
BRIGADIER|Lethbridge-Stewart’s rank|w
VORTEX|Time ___, the swirling path the TARDIS travels|w
CHAMELEON|___ circuit, stuck on a police box|w
SCARF|Very long knitted item worn by the Fourth Doctor|w
JELLY BABIES|Sweets the Fourth Doctor offers around|w
CELERY|Fifth Doctor’s lapel vegetable|w
BOWTIE|Eleventh Doctor insisted these are cool|w
SCREWDRIVER|Sonic tool the Doctor carries|w
DIMENSION|Time And Relative ___ In Space|w
WHOVIAN|Devoted fan of the show|w
ROSE|Companion Tyler, first of the revived series|w
DONNA|Companion Noble, a temp from Chiswick|w
MARTHA|Companion Jones, a medical student|w
RORY|Amy’s husband, known as the Last Centurion|w
CLARA|Companion Oswald, the Impossible Girl|w
HARTNELL|William ___, the first Doctor|w
TROUGHTON|Patrick ___, the second Doctor|w
PERTWEE|Jon ___, the third Doctor|w
BAKER|Tom ___, fourth Doctor and longest-serving actor in the role|w
DAVISON|Peter ___, the fifth Doctor|w
MCCOY|Sylvester ___, the seventh Doctor|w
MCGANN|Paul ___, the eighth Doctor|w
HURT|John ___, the War Doctor|w
ECCLESTON|Christopher ___, the ninth Doctor|w
TENNANT|David ___, the tenth Doctor|w
SMITH|Matt ___, the eleventh Doctor|w
CAPALDI|Peter ___, the twelfth Doctor|w
WHITTAKER|Jodie ___, first woman to play the Doctor|w
DAVIES|Russell T ___, who revived the show in 2005|w
MOFFAT|Steven ___, showrunner after Davies|w
CHIBNALL|Chris ___, showrunner during Whittaker’s era|w
CARDIFF|Welsh capital where the revived series is made|w
AMY|Companion Pond, the Girl Who Waited|w
AMELIA|Amy Pond’s full first name as a little girl|w
RIVER|Professor ___ Song, archaeologist and the Doctor’s wife|w
SARAH JANE|Journalist companion Smith, star of her own spin-off series|w
ADVENTURES|The Sarah Jane ___, children’s spin-off series|w
MEL|Computer programmer companion Bush|w
ACE|Teenage companion who made her own explosives|w
SUSAN|The first Doctor’s granddaughter|w
BARBARA|History teacher companion Wright|w
IAN|Science teacher companion Chesterton|w
MICKEY|Rose’s boyfriend Smith, who became a companion|w
JACKIE|Rose’s mother, Tyler|w
WILF|Donna’s grandfather, Mott|w
GRAHAM|Retired bus driver O’Brien, a companion in Whittaker’s era|w
RYAN|Companion Sinclair, Graham’s step-grandson|w
YASMIN|Police officer companion known as “Yaz”|w
BILL|Companion Potts, a canteen worker turned traveller|w
NARDOLE|Matt Lucas’s character, companion to the twelfth Doctor|w
STRAX|Sontaran nurse who serves Madame Vastra|w
VASTRA|Madame ___, Silurian detective in Victorian London|w
JACK|Captain Harkness, who can’t stay dead|w
HARKNESS|Captain Jack ___, leader of Torchwood|w
TORCHWOOD|Spin-off whose title is an anagram of “Doctor Who”|w
GWEN|Cooper, the police officer turned Torchwood agent|w
IANTO|Jones, Torchwood’s coffee-making agent|w
OWEN|Harper, Torchwood’s medical officer|w
TOSHIKO|___ Sato, Torchwood’s technology expert|w
RIFT|Crack in time and space that runs through Cardiff|w
MIRACLE|Torchwood series where nobody can die: ___ Day|w
BARROWMAN|John ___, who plays Captain Jack|w
MYLES|Eve ___, who plays Gwen Cooper|w
COAL HILL|School in the spin-off Class|w
ZYGON|Shapeshifting alien that copies humans|w
AUTON|Living plastic shop dummy|w
NESTENE|Consciousness that controls the Autons|w
YETI|Robotic abominable snowman servant|w
SILENCE|Aliens you forget as soon as you look away|w
JUDOON|Rhinoceros-headed galactic police|w
RACNOSS|Spider-like Empress who attacked a wedding|w
SYCORAX|Skull-masked alien warriors who invaded at Christmas|w
KRILLITANE|Bat-like creatures who infiltrated a school|w
PYROVILE|Fiery stone creatures beneath Pompeii|w
RUTAN|Shapeshifting jellyfish-like enemy of the Sontarans|w
SAXON|Harold ___, the Master’s alias as prime minister|w
VALEYARD|Sinister distillation of the Doctor’s dark side|w
OMEGA|Time Lord stellar engineer of legend|w
CITADEL|Capital city of Gallifrey|w
MIDNIGHT|Diamond planet where something knocks on the walls|w
TIME LORD|Gallifreyan with two hearts|w
REGENERATION|How a Time Lord renews their body|w
BAD WOLF|Phrase that scattered itself across time and space|w
EXTERMINATE|What Daleks shout when they attack|w
GERONIMO|Eleventh Doctor’s battle cry|w
ALLONSY|Tenth Doctor’s French-sounding exclamation|w
FANTASTIC|Ninth Doctor’s one-word catchphrase|w
SPOILERS|River Song’s catchphrase|w
STETSON|Eleventh Doctor’s cowboy hat|w
FEZ|Hat the eleventh Doctor insisted was cool|w
UMBRELLA|Seventh Doctor’s question-mark-handled accessory|w
BLINK|Acclaimed 2007 episode that introduced the Weeping Angels|w
BIG FINISH|Company producing officially licensed audio adventures|w
BBC|Network that broadcasts the show|w
SLADEN|Elisabeth ___, who played Sarah Jane Smith|w
PIPER|Billie ___, who played Rose|w
TATE|Catherine ___, who played Donna|w
AGYEMAN|Freema ___, who played Martha|w
GILLAN|Karen ___, who played Amy Pond|w
DARVILL|Arthur ___, who played Rory|w
COLEMAN|Jenna ___, who played Clara|w
MACKIE|Pearl ___, who played Bill|w
KINGSTON|Alex ___, who played River Song|w
GOMEZ|Michelle ___, who played Missy|w
SIMM|John ___, who played the Master|w
DELGADO|Roger ___, the first actor to play the Master|w
DHAWAN|Sacha ___, who played the Master in Spyfall|w
WALSH|Bradley ___, who played Graham|w
GILL|Mandip ___, who played Yaz|w
LUCAS|Matt ___, who played Nardole|w
CRIBBINS|Bernard ___, who played Wilf|w
GOLD|Murray ___, composer of the revived series’ music|w
GARDNER|Julie ___, executive producer in the Davies era|w
COLLINSON|Phil ___, producer of the 2005 series|w
GAIMAN|Neil ___, author who wrote The Doctor’s Wife|w
GATISS|Mark ___, writer and actor in the revival|w
MELODY POND|Amy and Rory's daughter, born on an asteroid|w
KARABRAXOS|An impenetrable bank|w
YANA|The professor at the end of the universe|w
ARCHANGEL|Hypnotic satellite network made by The Master|w
POPPY|Space baby and Belinda's daughter|w
GATWA|Ncuti ___, the fifteenth Doctor|w
RUBY|___ Sunday, companion found as a baby on Christmas|w
BIGENERATION|What happened when the Toymaker shot the fourteenth Doctor|w
RANI|Renegade Time Lady portrayed by Archie Panjabi|w
FLOOD|Incarnation of The Rani portrayed by Anita Dobson|w
DOUBT|Type of thought that broke Wish World|w
ASYLUM|Where The Doctor first meets Clara, surrounded by Daleks|w
SOUFFLE|What Clara makes in the Dalek Asylum, without milk|w
KOVARIAN|Woman who abduts Amy and raises River|w
TIME AGENT|Captain Jack Harkness' job before Torchwood|w
MATHESON|Rex ___, an FBI Agent who can't die after Miracle Day ends|w
DANES|Oswald ___, A Secondary antagonist in Miracle Day|w
FROBISHER|Permanent Secretary of the Home Office, Peter Capaldi|w
JUAREZ|Dr. Vera ___, A temporary Torchwood member in Miracle Day|w
HARRIS|Neil Patrick ___, who played the Toymaker|w
NOT THINGS|The ___, near perfect duplicants from outside the universe|w
RIGSY|Local knowledge, falsely accused of crime by Mayor Me|w
COLEMAN|Olivia ___, the main human form of Prisoner Zero|w
ATRAXI|The race of aliens looking for Prisoner Zero|w
DRUMMOND|Esther ___, An FBI analyst and temporary member of Torchwood in Miracle Day|w
JINX MONSOON|American actor who played Maestro, god of Music|w
ALAN CUMMING|Scottish actor who played Mr Ring-A-Ding|w
COLE|Tosin ___, who played Ryan|w
XTONIC|The type of star that soaked that planet Midnight in galvanic radiation|w
STET|The type of radiation that filled the couplings room on the Utopia rocket|w
K-NINE|Sarah Jane Smith's metal dog|w
ADIPOSE|Children made of fat, also a company|w
JAGRAFESS|Editor in chief of Satellite Five|w
TECTEUN|Adoptive parent to the Doctor and geneticist|w
CLAYTON|Ruth ___, the human identity of the Fugitive Doctor|w
CHAMELEON|___ Arch, a device used to rewrite Time Lord DNA to disguise them|w
SHALKA|Scream of the ___, an animated serial featuring Richard E. Grant as the 9th Doctor|w
ATKINSON|Rowan ___, The Ninth Doctor in The Curse of Fatal Death|w
GRANT|Richard E. ___, The Tenth Doctor in The Curse of Fatal Death|w
BROADBENT|Jim ___, The Eleventh Doctor in The Curse of Fatal Death|w
GRANT|Hugh ___, The Twelfth Doctor in The Curse of Fatal Death|w
LUMLEY|Joanna ___, The Thirteenth Doctor in The Curse of Fatal Death|w
SAN FRANCISCO|US City, setting for the 1996 Doctor Who movie|w
CLOM|The twin planet of Raxicoricofallapatorius|w
REDGRAVE|Jemma ___, who played Kate Lethbridge-Stewart|w
OSGOOD|UNIT Scientific Advisor under Kate Stewart in 2015|w
BLACK ARCHIVE|A vault for information and alien artefacts related to The Doctor|w
VINDICATOR|The tool used by the Fifteenth Doctor to get Belinda home|w
KASTERBOROUS|The star system Gallifrey is in|w
KARN|A Planet near Gallifrey holding a Sisterhood of non-Time Lord female Gallifreyans|w
GAME STATION|What Satellite Five became after the Jagrafess died|w
LYNDA|___ Moss, contestant on Big Brother aboard the Game Station|w
MONKS|A species of aliens who take over planets and control them as if they had always been in their history.|w
ASHILDR|A 9th century girl, played by Maisie Williams who can't die|w
ME|Ashildr in the 21st Century|w
ADAM|___ Mitchell, very temporary companion of the Ninth Doctor|w
VLINX|A cyborg that works at UNIT during 2023-2025|w
WASP|Shape taken by the half-Vespiform son of Lady Clemency Eddison|w
BOE|Face Of ___, potentially Captain Jack in the Year 5 billion|w
CAT|___kind, the species of Senator, formerly Novice, Hame|w
SPARROW|Sally ___, photographer and rare book and DVD store owner|w
ZERO|The alien prisoner that escaped through Amy's crack in the wall|w
EARTH|The Human Residence the Atraxi would incinerate if he did not vacate|w
LUKE|The name of Sarah Jane Smith's son|w
TESSELECTA|Time travelling robot filled with miniature people who punished criminals in history|w
MALDOVAR|Dorium ___|Blue man beheaded by the MONKS during the Battle of Demon's Run|w
RUNAWAY|The nickname The Doctor gave to Colnel Manton during the Battle of Demon's Run|w
RUN|Demon's ___, the asteroid where MELODY POND was born|w
RTD|Intitals of Doctor Who Showrunner (2005-2010, 2022-2026)|w
RETCON|A targeted amnesia drug|w
`;
