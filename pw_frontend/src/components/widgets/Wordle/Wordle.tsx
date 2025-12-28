import { useCallback, useEffect, useRef, useState } from 'react';
import useTheme from '../../../hooks/useTheme';
import './Wordle.scss';

const WORDS = [
  'WATER', 'YOUTH', 'ZEBRA', 'BEACH', 'CHAIR', 'DANCE', 'EAGLE', 'FOCUS', 'GRACE', 'HAPPY', 'IVORY', 'JOKER', 'LEMON', 'MUSIC', 'NURSE', 'OLIVE', 'PEACE', 'QUEEN', 'RADIO', 'SMILE',
  'TABLE', 'URBAN', 'VITAL', 'WHEAT', 'XENON', 'YACHT', 'ZONAL', 'NEURO', 'CODER', 'BUILD', 'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'ARSON', 'AFTER',
  'ASKEW', 'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ABBOT', 'ALIGN', 'ALIKE', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY',
  'APART', 'ALLOY', 'APPLE', 'APTLY', 'ALLAY', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ARROW', 'ASIDE', 'ASSET', 'AVOID', 'AWAKE', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BEGAN',
  'BEGIN', 'BEING', 'BARGE', 'BASTE', 'BELOW', 'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLADE', 'BLAME', 'BLEAK', 'BLANK', 'BRINK', 'BLAST', 'BLIND', 'BLOCK', 'BLOOD', 'BLOOM', 'BLOWN', 'BLUES', 'BOARD', 'BOAST', 'BOBBY',
  'BONUS', 'BOOST', 'BOOTH', 'BOUND', 'BATHE', 'BRAIN', 'BRAND', 'BRASS', 'BRAVE', 'BREAD', 'BREAK', 'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BRUSH', 'BUDDY', 'BUNCH', 'BURST',
  'CABLE', 'CALIF', 'CALLS', 'CAMEL', 'CAMEO', 'CLOUT', 'CANAL', 'CANDY', 'CANON', 'CARGO', 'CAROT', 'CAROL', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP',
  'CHECK', 'CHESS', 'CHEST', 'CRUSH', 'CHIEF', 'CHILD', 'CHINA', 'CHIPS', 'CHORD', 'CIVIL', 'CLEAT', 'CLAIM', 'CLASH', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD', 'CLUBS',
  'COACH', 'COAST', 'CODES', 'COINS', 'COLOR', 'COMIC', 'CONDO', 'CORAL', 'CORPS', 'COSTS', 'COULD', 'COUNT', 'COURT', 'COVER', 'CREEK', 'CRANK', 'CRACK', 'CRABS', 'CREPE', 'CRATE', 'CRAFT', 'CRANE', 'CRASH', 'CRAZY', 'CREAM',
  'CRIME', 'CROPS', 'CROWD', 'CROWN', 'CRISP', 'CRUDE', 'CURVE', 'CYCLE', 'DAILY', 'DATED', 'DONUT', 'DEALT', 'DEATH', 'DEBIT', 'DEBUG', 'DELAY', 'DELTA', 'DENSE', 'DEPTH', 'DERRY', 'DIARY',
  'DIGIT', 'DIRTY', 'DISCO', 'DUNES', 'DENIM', 'DITCH', 'DIVER', 'DIZZY', 'DODGE', 'DOING', 'DONOR', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAIN', 'DRAMA', 'DRANK', 'DRAWN', 'DREAM', 'DRESS', 'DRILL', 'DRINK',
  'DRIVE', 'DROVE', 'DRUNK', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'EIGHT', 'ELATE', 'ELBOW', 'ENEMA', 'EMITS', 'ELDER', 'ELECT', 'ELITE', 'EMAIL', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY',
  'EQUAL', 'ERROR', 'EQUIP', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FANCY', 'FARMS', 'FATAL', 'FAULT', 'FEARS', 'FENCE', 'FERRY', 'FIELD', 'FIERY', 'FIFTH', 'FIFTY',
  'FIGHT', 'FINAL', 'FINDS', 'FINES', 'FIRED', 'FIRES', 'FIRMS', 'FIRST', 'FIXED', 'FLAGS', 'FLAME', 'FLASH', 'FLEET', 'FLESH', 'FLOAT', 'FLOOD', 'FLOOR', 'FLORA', 'FLUID', 'FOLKS',
  'FONTS', 'FORCE', 'FORMS', 'FINCH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FROST', 'FRUIT', 'FULLY', 'FUNNY', 'GAMES', 'GATES', 'GAUGE', 'GENRE',
  'GHOST', 'GIANT', 'GIFTS', 'GIRLS', 'GIVEN', 'GIVES', 'GLASS', 'GLOBE', 'GRILL', 'GLORY', 'GOALS', 'GODLY', 'GOING', 'GOODS', 'GRADE', 'GRAIN', 'GRAND', 'GRANT', 'GRASS', 'GRAVE', 'GREAT',
  'GREEN', 'GREET', 'GRIEF', 'GROSS', 'GROUP', 'GROWN', 'GROWS', 'GROUT', 'GUARD', 'GUESS', 'GUILD', 'GUEST', 'GUIDE', 'GUILT', 'HABIT', 'HANDS', 'HARSH', 'HASTE', 'HATCH', 'HATED', 'HATES', 'HAVEN',
  'HAVOC', 'HEADS', 'HEARD', 'HEART', 'HEATH', 'HEAVY', 'HEDGE', 'HEELS', 'HEIRS', 'HELIX', 'HELLO', 'HENCE', 'HERBS', 'HIDES', 'HILLS', 'HINTS', 'HIRED', 'HIRES', 'HITCH', 'HOLDS', 'HOLES',
  'HOMES', 'HONEY', 'HONOR', 'HOPED', 'HOPES', 'HORNS', 'HORSE', 'HUNCH', 'HOSTS', 'HOTEL', 'HOURS', 'HOUSE', 'HOVER', 'HUMAN', 'HUMOR', 'HURRY', 'HURTS', 'ICONS', 'IDEAL', 'IDEAS', 'IMAGE',
  'IMPLY', 'INBOX', 'INCUR', 'INDEX', 'INDIA', 'INNER', 'INPUT', 'INTRO', 'ISSUE', 'ITEMS', 'JACKS', 'JAPAN', 'JEANS', 'JELLY', 'JEWEL', 'JOINS', 'JOINT', 'JOKES', 'JONES', 'JUDGE',
  'JUICE', 'JUMPS', 'KEEPS', 'KICKS', 'KILLS', 'KINDS', 'KINGS', 'KNEES', 'KNIFE', 'KNOCK', 'KUDOS', 'KRAUT', 'KNOWN', 'KNOWS', 'LABEL', 'LACKS', 'LAKES', 'LAMPS', 'LANDS', 'LARGE', 'LASER', 'LATER',
  'LAUGH', 'LAYER', 'LEADS', 'LEAKS', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LIGHT', 'LIKED', 'LIKES', 'LIMBS', 'LIMIT', 'LINED', 'LINES', 'LINKS', 'LIONS', 'LISTS',
  'LIVED', 'LIVER', 'LIVES', 'LOANS', 'LOCAL', 'LOCKS', 'LODGE', 'LOGIC', 'LOOSE', 'LORDS', 'LOSES', 'LOVED', 'LOVER', 'LOVES', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MACHO', 'MACRO',
  'MADAM', 'MAGIC', 'MAJOR', 'MAKER', 'MAKES', 'MALES', 'MALLS', 'MAMMA', 'MANOR', 'MAPLE', 'MARCH', 'MARKS', 'MARRY', 'MARSH', 'MASKS', 'MATCH', 'MATES', 'MATHS', 'MATTE', 'MAYBE',
  'MAYOR', 'MEALS', 'MEANS', 'MEANT', 'MEATS', 'MEDAL', 'MEDIA', 'MEETS', 'MELON', 'MUNCH', 'MELTS', 'MEMOS', 'MERCY', 'MERGE', 'MUTES', 'MULES', 'MERIT', 'MERRY', 'MESSY', 'METAL', 'METER', 'METRO', 'MICRO',
  'MIDST', 'MIGHT', 'MILES', 'MILKY', 'MILLS', 'MINDS', 'MINES', 'MINOR', 'MINUS', 'MIXED', 'MIXES', 'MODAL', 'MODEL', 'MODEM', 'MODES', 'MONEY', 'MONTH', 'MOODS', 'MOONS', 'MORAL',
  'MORPH', 'MOSES', 'MOTEL', 'MOTIF', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED', 'MOVES', 'MOVIE', 'MUTED', 'NAKED', 'NAMED', 'NAMES', 'NASTY', 'NATAL', 'NAVAL', 'NEEDS', 'NERVE',
  'NEVER', 'NEWLY', 'NEXUS', 'NICER', 'NIGHT', 'NINES', 'NINTH', 'NOBLE', 'NODES', 'NOISE', 'NOISY', 'NOMAD', 'NOOSE', 'NORTH', 'NOSES', 'NOTCH', 'NOTED', 'NOTES', 'NOVEL', 'NUDGE',
  'NYLON', 'OASIS', 'OCCUR', 'OCEAN', 'OCTAL', 'ODDLY', 'ODORS', 'OFFER', 'OFTEN', 'OILED', 'OLDER', 'OMEGA', 'ONION', 'ONSET', 'OPENS', 'OPERA', 'OPTED', 'OPTIC', 'ORBIT', 'ORDER',
  'ORGAN', 'OTHER', 'OUGHT', 'OUNCE', 'OUTER', 'OVALS', 'OVARY', 'OVENS', 'OVERS', 'OWNED', 'OWNER', 'OXIDE', 'OZONE', 'PACED', 'PACES', 'PACKS', 'PAGES', 'PAINS', 'PAINT', 'PAIRS',
  'PALMS', 'PANEL', 'PANIC', 'PANTS', 'PAPAL', 'PAPER', 'PARKS', 'PARTS', 'PARTY', 'PASTA', 'PASTE', 'PATCH', 'PATHS', 'PATIO', 'PATSY', 'PAUSE', 'PEACH', 'PEAKS', 'PEARL', 'PEARS',
  'PEDAL', 'PENAL', 'PENCE', 'PENNY', 'PERCH', 'PERIL', 'PERKS', 'PERKY', 'PESKY', 'PESTS', 'PESTO', 'PETAL', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PICKS', 'PIECE', 'PIERS', 'PIGGY',
  'PILED', 'PILES', 'PILLS', 'PILOT', 'PINCH', 'PINES', 'PINKY', 'PINTS', 'PIPES', 'PITCH', 'PIVOT', 'PIXEL', 'PLACE', 'PLAIN', 'PLANE', 'PLAID', 'PLANK', 'PLANS', 'PLANT', 'PLATE',
  'PLAYS', 'PLEAD', 'PLEAS', 'PLOTS', 'PLUCK', 'PLUGS', 'PLUMP', 'PLUSH', 'POEMS', 'POETS', 'POINT', 'POISE', 'POKER', 'POLAR', 'POLES', 'POLIO', 'POLIS', 'POLLS', 'PONDS', 'POOLS',
  'PORCH', 'PORES', 'PORTS', 'POSED', 'POSES', 'POSIT', 'POSTS', 'POTTY', 'POUCH', 'POUND', 'POURS', 'POWER', 'PRANK', 'PRAYS', 'PREPS', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT',
  'PRIOR', 'PRISM', 'PRIVY', 'PRIZE', 'PROBE', 'PRODS', 'PROMO', 'PRONE', 'PROOF', 'PROPS', 'PROSE', 'PROUD', 'PROVE', 'PROWL', 'PROXY', 'PRUDE', 'PRUNE', 'PSALM', 'PSYCH', 'PULSE',
  'PUMPS', 'PUNCH', 'PUNKS', 'PUNKY', 'PUNTS', 'PUPIL', 'PUPPY', 'PURGE', 'PURSE', 'PUSHY', 'PUTTY', 'PYLON', 'QUACK', 'QUAIL', 'QUAKE', 'QUALM', 'QUARK', 'QUART', 'QUASH', 'QUASI',
  'QUEER', 'QUERY', 'QUEST', 'QUEUE', 'QUICK', 'QUIET', 'QUILL', 'QUILT', 'QUIRK', 'QUITE', 'QUITS', 'QUOTA', 'QUOTE', 'RACED', 'RACER', 'RACES', 'RACKS', 'RADAR', 'RADIX', 'RAFTS',
  'RAGED', 'RAGES', 'RAIDS', 'RAILS', 'RAINS', 'RAINY', 'RAISE', 'RAKED', 'RAKES', 'RALLY', 'RAMPS', 'RANCH', 'RANDY', 'RANGE', 'RABID', 'RANKS', 'RAPID', 'RATED', 'RATES', 'RATIO',
  'RAZOR', 'REACH', 'REACT', 'READS', 'READY', 'REALM', 'REBEL', 'REBUS', 'REBUT', 'RECAP', 'RECUR', 'REDUX', 'REEDS', 'REEFS', 'REELS', 'REFER', 'RELAX', 'RELAY', 'REMIX', 'RELIC', 'REMIT',
  'RENAL', 'RENTS', 'REPAY', 'REPEL', 'REPLY', 'RESET', 'RESIN', 'RESTS', 'RETRY', 'REUSE', 'REVEL', 'RIDER', 'RIDES', 'RIDGE', 'RIFLE', 'RIGID', 'RIGOR', 'RINGS', 'RINSE', 'RIOTS',
  'RIPEN', 'RISEN', 'RISES', 'RISKS', 'RISKY', 'RITES', 'RIVAL', 'RIVER', 'ROADS', 'ROAST', 'ROBES', 'ROBIN', 'ROBOT', 'ROCKS', 'ROCKY', 'RODEO', 'ROGUE', 'ROLES', 'ROLLS', 'ROMAN',
  'ROOMS', 'ROOTS', 'ROPED', 'ROPES', 'ROSES', 'ROUGH', 'ROUND', 'ROUSE', 'ROUTE', 'ROVER', 'ROYAL', 'RUBIN', 'RUDDY', 'RUDER', 'RUGGY', 'RUINS', 'RULED', 'RULER', 'RULES', 'RUMOR',
  'RUNES', 'RUNGS', 'RUNNY', 'RURAL', 'RUSTY', 'SADLY', 'SAFER', 'SAFES', 'SAGES', 'SAILS', 'SAINT', 'SAKES', 'SALES', 'SALON', 'SALSA', 'SALTY', 'SALVE', 'SALVO', 'SANDY', 'SANER',
  'SAPPY', 'SARGE', 'SASSY', 'SATIN', 'SATYR', 'SAUCE', 'SAUCY', 'SAUNA', 'SAVED', 'SAVER', 'SAVES', 'SAVOR', 'SAVVY', 'SAWED', 'SAXON', 'SCALE', 'SCALP', 'SCANS', 'SCANT', 'SCARE',
  'SCARF', 'SCARS', 'SCARY', 'SCENE', 'SCENT', 'SCHMO', 'SCHWA', 'SCOFF', 'SCOLD', 'SCOOP', 'SCOOT', 'SCOPE', 'SCORE', 'SCORN', 'SCOUR', 'SCOUT', 'SCOWL', 'SCRAP', 'SCREE', 'SCREW',
  'SCRUB', 'SCUBA', 'SCUFF', 'SCULK', 'SCULL', 'SCULP', 'SCUMM', 'SCURF', 'SCUTT', 'SEALS', 'SEAMS', 'SEARS', 'SEATS', 'SEBUM', 'SEDAN', 'SEDER', 'SEDGE', 'SEEDS', 'SEEKS', 'SEEMS',
  'SEEPS', 'SEERS', 'SEGUE', 'SEIZE', 'SELFS', 'SELLS', 'SEMEN', 'SENDS', 'SENSE', 'SENTE', 'SENTI', 'SEPAL', 'SEPIA', 'SEPTA', 'SERFS', 'SERGE', 'SERIF', 'SERUM', 'SERVE', 'SETUP',
  'SEVEN', 'SEVER', 'SEWED', 'SEWER', 'SEXED', 'SEXES', 'SHACK', 'SHADE', 'SHADY', 'SHAFT', 'SHAGS', 'SHAKE', 'SHAKY', 'SHALE', 'SHALL', 'SHALT', 'SHAME', 'SHAMS', 'SHANK', 'SHAPE',
  'SHARD', 'SHARE', 'SHARK', 'SHARP', 'SHAVE', 'SHAWL', 'SHAWN', 'SHAWS', 'SHEAF', 'SHEAR', 'SHEEN', 'SHEEP', 'SHEER', 'SHEET', 'SHEIK', 'SHELF', 'SHELL', 'SHIED', 'SHIES', 'SHIFT',
  'SHILL', 'SHIMS', 'SHINE', 'SHINS', 'SHINY', 'SHIPS', 'SHIRE', 'SHIRK', 'SHIRT', 'SHITS', 'SHIVA', 'SHIVE', 'SHIVS', 'SHOAL', 'SHOCK', 'SHOED', 'SHOES', 'SHONE', 'SHOOK', 'SHOOT',
  'SHOPS', 'SHORE', 'SHORN', 'SHORT', 'SHOTS', 'SHOUT', 'SHOVE', 'SHOWN', 'SHOWS', 'SHOWY', 'SHRED', 'SHREW', 'SHRUB', 'SHRUG', 'SHUCK', 'SHUNS', 'SHUNT', 'SHUSH', 'SHUTS', 'SHYER',
  'SHYLY', 'SIBYL', 'SIDED', 'SIDES', 'SIDLE', 'SIEGE', 'SIEVE', 'SIFTS', 'SIGHS', 'SIGHT', 'SIGMA', 'SIGNS', 'SILKS', 'SILKY', 'SILLS', 'SILLY', 'SILOS', 'SILTS', 'SILTY', 'SINCE',
  'SINES', 'SINEW', 'SINGE', 'SINGS', 'SINKS', 'SINUS', 'SIRED', 'SIREN', 'SIRES', 'SISAL', 'SISSY', 'SITED', 'SITES', 'SITUP', 'SITUS', 'SIXES', 'SIXTH', 'SIXTY', 'SIZED', 'SIZES',
  'SKATE', 'SKEET', 'SKEIN', 'SKEWS', 'SKIDS', 'SKIED', 'SKIER', 'SKIES', 'SKIFF', 'SKILL', 'SKIMP', 'SKIMS', 'SKINS', 'SKIPS', 'SKIRT', 'SKITS', 'SKULK', 'SKULL', 'SKUNK', 'SKYED',
  'SLABS', 'SLACK', 'SLAGS', 'SLAIN', 'SLAKE', 'SLAMS', 'SLANG', 'SLANT', 'SLAPS', 'SLASH', 'SLATE', 'SLATS', 'SLAVE', 'SLAVS', 'SLAWS', 'SLAYS', 'SLEEK', 'SLEEP', 'SLEET', 'SLEPT',
  'SLICE', 'SLICK', 'SLIDE', 'SLIER', 'SLILY', 'SLIME', 'SLIMS', 'SLIMY', 'SLING', 'SLINK', 'SLIPS', 'SLITS', 'SLOBS', 'SLOGS', 'SLOOP', 'SLOPE', 'SLOPS', 'SLOSH', 'SLOTH', 'SLOTS',
  'SLOWS', 'SLUED', 'SLUES', 'SLUGS', 'SLUMP', 'SLUMS', 'SLUNG', 'SLUNK', 'SLURP', 'SLURS', 'SLUSH', 'SLUTS', 'SLYER', 'SLYLY', 'SMACK', 'SMALL', 'SMART', 'SMASH', 'SMEAR', 'SMELL',
  'SMELT', 'SMIRK', 'SMITE', 'SMITH', 'SMOCK', 'SMOGS', 'SMOKE', 'SMOKY', 'SMOTE', 'SMUTS', 'SNACK', 'SNAGS', 'SNAIL', 'SNAKE', 'SNAKY', 'SNAPS', 'SNARE', 'SNARL', 'SNEAD', 'SNEAK',
  'SNEER', 'SNICK', 'SNIDE', 'SNIFF', 'SNIPE', 'SNIPS', 'SNITS', 'SNOBS', 'SNOOK', 'SNOOP', 'SNOOT', 'SNORE', 'SNORT', 'SNOTS', 'SNOUT', 'SNOWS', 'SNOWY', 'SNUBS', 'SNUCK', 'SNUFF',
  'SNUGS', 'SOAKS', 'SOAPS', 'SOAPY', 'SOARS', 'SOBER', 'SOCKS', 'SODAS', 'SOFAS', 'SOFTY', 'SOGGY', 'SOILS', 'SOLAR', 'SOLED', 'SOLES', 'SOLID', 'SOLOS', 'SOLUM', 'SOLUS', 'SOLVE',
  'SOMAS', 'SONAR', 'SONGS', 'SONIC', 'SONLY', 'SONNY', 'SOOTS', 'SOOTY', 'SOPHS', 'SOPHY', 'SOPPY', 'SORER', 'SORES', 'SORRY', 'SORTS', 'SOULS', 'SOUND', 'SOUPS', 'SOUPY', 'SOURS',
  'SOUSE', 'SOUTH', 'SOWED', 'SOWER', 'SOYAS', 'SPACE', 'SPADE', 'SPAKE', 'SPANK', 'SPANS', 'SPARE', 'SPARK', 'SPARS', 'SPASM', 'SPATE', 'SPATS', 'SPAWN', 'SPAYS', 'SPEAK', 'SPEAR',
  'SPECK', 'SPEED', 'SPELL', 'SPELT', 'SPEND', 'SPENT', 'SPERM', 'SPEWS', 'SPICE', 'SPICY', 'SPIED', 'SPIEL', 'SPIES', 'SPIKE', 'SPIKY', 'SPILL', 'SPILT', 'SPINE', 'SPINS', 'SPINY',
  'SPIRE', 'SPIRT', 'SPITE', 'SPITS', 'SPITZ', 'SPLAT', 'SPLAY', 'SPLIT', 'SPOIL', 'SPOKE', 'SPOOF', 'SPOOK', 'SPOOL', 'SPOON', 'SPOOR', 'SPORE', 'SPORT', 'SPOTS', 'SPOUT', 'SPRAG',
  'SPRAT', 'SPRAY', 'SPREE', 'SPRIG', 'SPRIT', 'SPRUE', 'SPUDS', 'SPUME', 'SPUMY', 'SPUNK', 'SPURN', 'SPURS', 'SPURT', 'SPUTA', 'SQUAD', 'SQUAT', 'SQUAW', 'SQUIB', 'SQUID', 'STABS',
  'STACK', 'STAFF', 'STAGE', 'STAGS', 'STAID', 'STAIN', 'STAIR', 'STAKE', 'STALE', 'STALK', 'STALL', 'STAMP', 'STAND', 'STANK', 'STARE', 'STARK', 'STARS', 'START', 'STASH', 'STATE',
  'STAVE', 'STAYS', 'STEAD', 'STEAK', 'STEAL', 'STEAM', 'STEED', 'STEEL', 'STEEP', 'STEER', 'STEMS', 'STENO', 'STEPS', 'STERN', 'STEWS', 'STICK', 'STIFF', 'STILE', 'STILL', 'STILT',
  'STING', 'STINK', 'STINT', 'STIRS', 'STOAT', 'STOCK', 'STOIC', 'STOKE', 'STOLE', 'STOMP', 'STONE', 'STONY', 'STOOD', 'STOOL', 'STOOP', 'STOPS', 'STORE', 'STORK', 'STORM', 'STORY',
  'STOUT', 'STOVE', 'STOWS', 'STRAP', 'STRAW', 'STRAY', 'STREW', 'STRIP', 'STROP', 'STROW', 'STROY', 'STRUM', 'STRUT', 'STUBS', 'STUCK', 'STUDS', 'STUDY', 'STUFF', 'STUMP', 'STUNG',
  'STUNK', 'STUNS', 'STUNT', 'STUPA', 'STUPE', 'STYED', 'STYES', 'STYLE', 'STYLI', 'STYMY', 'SUAVE', 'SUCKS', 'SUCRE', 'SUDOR', 'SUDSY', 'SUEDE', 'SUGAR', 'SUING', 'SUITE', 'SUITS',
  'SULKS', 'SULKY', 'SULLY', 'SULPH', 'SUMAC', 'SUMPS', 'SUNNY', 'SUNUP', 'SUPER', 'SURER', 'SURFS', 'SURGE', 'SURLY', 'SURRA', 'SUSHI', 'SWABS', 'SWAGE', 'SWAGS', 'SWAIL', 'SWAIN',
  'SWALE', 'SWAMI', 'SWAMP', 'SWANK', 'SWANS', 'SWAPS', 'SWARD', 'SWARE', 'SWARF', 'SWARM', 'SWART', 'SWASH', 'SWATH', 'SWATS', 'SWAYS', 'SWEAR', 'SWEAT', 'SWEDE', 'SWEEP', 'SWEET',
  'SWELL', 'SWEPT', 'SWIFT', 'SWILL', 'SWIMS', 'SWINE', 'SWING', 'SWINK', 'SWIPE', 'SWIRL', 'SWISH', 'SWISS', 'SWITH', 'SWIVE', 'SWIZZ', 'SWOON', 'SWOOP', 'SWOPS', 'SWORD', 'SWORE',
  'SWORN', 'SWOTS', 'SWOUN', 'SWUNG', 'SYLPH', 'SYNCH', 'SYNCS', 'SYNOD', 'SYNTH', 'SYRUP', 'TABBY', 'TABOO', 'TACIT', 'TACKS', 'TACKY', 'TACOS', 'TAFFY', 'TAILS', 'TAINT', 'TAKEN',
  'TAKER', 'TAKES', 'TALCS', 'TALES', 'TALKS', 'TALLY', 'TALON', 'TALUS', 'TAMED', 'TAMER', 'TAMES', 'TAMPS', 'TANGO', 'TANGS', 'TANGY', 'TANKS', 'TANSY', 'TAPAS', 'TAPED', 'TAPER',
  'TAPES', 'TAPIR', 'TAPIS', 'TARDO', 'TARDY', 'TARED', 'TARES', 'TARNS', 'TAROS', 'TAROT', 'TARPS', 'TARRY', 'TARSI', 'TARTS', 'TARTY', 'TASKS', 'TASTE', 'TASTY', 'TATAR', 'TATER',
  'TATTY', 'TAUNT', 'TAUPE', 'TAWNY', 'TAXED', 'TAXER', 'TAXES', 'TAXIS', 'TAXOL', 'TAXON', 'TEACH', 'TEAMS', 'TEARS', 'TEASE', 'TEATS', 'TECHS', 'TEDDY', 'TEEMS', 'TEENS', 'TEENY',
  'TEETH', 'TELEX', 'TELLS', 'TEMPI', 'TEMPO', 'TEMPS', 'TEMPT', 'TENCH', 'TENDS', 'TENET', 'TENON', 'TENOR', 'TENSE', 'TENTH', 'TENTS', 'TEPEE', 'TEPID', 'TERCE', 'TERMS', 'TERNE',
  'TERNS', 'TERRA', 'TERRY', 'TERSE', 'TESTS', 'TESTY', 'TETRA', 'TEXAS', 'TEXTS', 'THACK', 'THANE', 'THANK', 'THAWS', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THETA', 'THICK',
  'THIEF', 'THIGH', 'THILL', 'THINE', 'THING', 'THINK', 'THINS', 'THIOL', 'THIRD', 'THIRL', 'THOLE', 'THONG', 'THORN', 'THORO', 'THORP', 'THOSE', 'THOUS', 'THREE', 'THREW', 'THRID',
  'THROB', 'THROE', 'THROW', 'THRUM', 'THRUS', 'THUDS', 'THUGS', 'THUMB', 'THUMP', 'THUNK', 'THURM', 'THYME', 'TIARA', 'TIBIA', 'TICAL', 'TICKS', 'TIDAL', 'TIDED', 'TIDES', 'TIERS',
  'TIFFS', 'TIGER', 'TIGHT', 'TIGON', 'TIKES', 'TILDE', 'TILED', 'TILER', 'TILES', 'TILLS', 'TILTH', 'TILTS', 'TIMED', 'TIMER', 'TIMES', 'TIMID', 'TINCT', 'TINES', 'TINGE', 'TINGS',
  'TINKS', 'TINNY', 'TINTS', 'TIPIS', 'TIPPY', 'TIPSY', 'TIRED', 'TIRES', 'TIROS', 'TITAN', 'TITHE', 'TITLE', 'TITRE', 'TITTY', 'TIZZY', 'TOADS', 'TOADY', 'TOAST', 'TODAY', 'TODDY',
  'TOFFS', 'TOFFY', 'TOFUS', 'TOGAS', 'TOGUE', 'TOILS', 'TOKAY', 'TOKED', 'TOKEN', 'TOKER', 'TOKES', 'TOLAN', 'TOLAR', 'TOLAS', 'TOLED', 'TOLES', 'TOLLS', 'TOLTS', 'TOLUS', 'TOMAN',
  'TOMAS', 'TOMBE', 'TOMBS', 'TOMES', 'TOMMY', 'TONAL', 'TONED', 'TONER', 'TONES', 'TONGA', 'TONGS', 'TONIC', 'TONNE', 'TONUS', 'TOOLS', 'TOONS', 'TOOTH', 'TOOTS', 'TOPAZ', 'TOPED',
  'TOPEE', 'TOPER', 'TOPES', 'TOPIC', 'TOPOI', 'TOPOS', 'TOQUE', 'TORAH', 'TORAS', 'TORCH', 'TORCS', 'TORES', 'TORIC', 'TORII', 'TOROS', 'TOROT', 'TORRS', 'TORSE', 'TORSI', 'TORSO',
  'TORTE', 'TORTS', 'TORUS', 'TOTAL', 'TOTED', 'TOTEM', 'TOTER', 'TOTES', 'TOTTY', 'TOUCH', 'TOUGH', 'TOURS', 'TOUSE', 'TOUTS', 'TOWED', 'TOWEL', 'TOWER', 'TOWIE', 'TOWNS', 'TOWNY',
  'TOWSE', 'TOWSY', 'TOXIC', 'TOXIN', 'TOYED', 'TOYER', 'TOYON', 'TOYOS', 'TRACE', 'TRACK', 'TRACT', 'TRADE', 'TRAGI', 'TRAIL', 'TRAIN', 'TRAIT', 'TRAMP', 'TRAMS', 'TRANK', 'TRANS',
  'TRAPS', 'TRASH', 'TRASS', 'TRATS', 'TRAVE', 'TRAWL', 'TRAYS', 'TREAD', 'TREAT', 'TREED', 'TREEN', 'TREES', 'TREKS', 'TREND', 'TRESS', 'TREST', 'TRETS', 'TREWS', 'TREYS', 'TRIAD',
  'TRIAL', 'TRIBE', 'TRICE', 'TRICK', 'TRIED', 'TRIER', 'TRIES', 'TRIGO', 'TRIGS', 'TRILL', 'TRIMS', 'TRINE', 'TRIOL', 'TRIOS', 'TRIPE', 'TRIPS', 'TRITE', 'TROAK', 'TROAT', 'TRODE',
  'TROGS', 'TROIS', 'TROKE', 'TROLL', 'TROMP', 'TRONA', 'TRONE', 'TRONK', 'TRONS', 'TROOP', 'TROOZ', 'TROPE', 'TROTH', 'TROTS', 'TROUT', 'TROVE', 'TROWS', 'TROYS', 'TRUCE', 'TRUCK',
  'TRUED', 'TRUER', 'TRUES', 'TRUGO', 'TRUGS', 'TRULL', 'TRULY', 'TRUMP', 'TRUNK', 'TRUSS', 'TRUST', 'TRUTH', 'TRYST', 'TSADE', 'TSADI', 'TSARS', 'TSKED', 'TSUBA', 'TSUBO', 'TUANS',
  'TUBAE', 'TUBAL', 'TUBAS', 'TUBBY', 'TUBED', 'TUBER', 'TUBES', 'TUCKS', 'TUFAS', 'TUFFS', 'TUFTS', 'TUILE', 'TULIP', 'TULLE', 'TULSI', 'TUMID', 'TUMMY', 'TUMOR', 'TUMPS', 'TUNAS',
  'TUNED', 'TUNER', 'TUNES', 'TUNIC', 'TUNNY', 'TUPIK', 'TUQUE', 'TURBO', 'TURDS', 'TURFS', 'TURFY', 'TURKS', 'TURNS', 'TURPS', 'TURRS', 'TUSHY', 'TUSKS', 'TUSKY', 'TUTEE', 'TUTOR',
  'TUTTI', 'TUTTY', 'TUTUS', 'TUXES', 'TUYER', 'TWAIN', 'TWANG', 'TWANK', 'TWATS', 'TWAYS', 'TWEED', 'TWEEN', 'TWEER', 'TWEET', 'TWERP', 'TWICE', 'TWIER', 'TWIGS', 'TWILL', 'TWILT',
  'TWINE', 'TWINK', 'TWINS', 'TWINY', 'TWIRL', 'TWIRP', 'TWIST', 'TWITS', 'TWIXT', 'TWOER', 'TWYER', 'TYING', 'TYKES', 'TYLER', 'TYNES', 'TYPAL', 'TYPED', 'TYPES', 'TYPEY', 'TYPIC',
  'TYPOS', 'TYPPS', 'TYRED', 'TYRES', 'TYROS', 'TYTHE', 'TZARS', 'UDDER', 'UHLAN', 'UKASE', 'ULAMA', 'ULANS', 'ULCER', 'ULEMA', 'ULNAD', 'ULNAE', 'ULNAR', 'ULNAS', 'ULPAN', 'ULTRA',
  'ULVAS', 'UMBEL', 'UMBER', 'UMBOS', 'UMBRA', 'UMIAC', 'UMIAK', 'UMIAQ', 'UMMAH', 'UMMAS', 'UMPED', 'UMPHS', 'UMPIE', 'UMPTY', 'UNAIS', 'UNAPT', 'UNARM', 'UNARY', 'UNAUS', 'UNBAN',
  'UNBAR', 'UNBED', 'UNBID', 'UNBOX', 'UNCAP', 'UNCIA', 'UNCLE', 'UNCOS', 'UNCUS', 'UNCUT', 'UNDEE', 'UNDER', 'UNDID', 'UNDUE', 'UMAMI', 'UNDUG', 'UNFED', 'UNFIT', 'UNFIX', 'UNHAT',
  'UNHIP', 'UNICA', 'UNIFY', 'UNION', 'UNITE', 'UNITS', 'UNITY', 'UNJAM', 'UNLAY', 'UNLED', 'UNLET', 'UNLIT', 'UNMET', 'UNMEW', 'UNMIX', 'UNPAY', 'UNPEG', 'UNPEN', 'UNPIN', 'UNRIG',
  'UNRIP', 'UNSAW', 'UNSAY', 'UNSEE', 'UNSET', 'UNSEW', 'UNSEX', 'UNSOD', 'UNTAX', 'UNTIE', 'UNTIL', 'UNTIN', 'UNWED', 'UNWET', 'UNWIT', 'UNWON', 'UNZIP', 'UPBOW', 'UPBYE', 'UPDOS',
  'UPDRY', 'UPEND', 'UPJET', 'UPLAY', 'UPLED', 'UPLIT', 'UPPED', 'UPPER', 'UPRUN', 'UPSET', 'UPSEY', 'UPTAK', 'UPTER', 'UPTIE', 'URAEI', 'URARE', 'URARI', 'URASE', 'URATE', 'URBIA',
  'URDEE', 'UREAL', 'UREAS', 'UREDO', 'UREIC', 'URGED', 'URGER', 'URGES', 'URIAL', 'URINE', 'URPED', 'URSID', 'URSON', 'URTIC', 'URUBU', 'URVAS', 'USAGE', 'USERS', 'USHER', 'USING',
  'USNEA', 'USQUE', 'USUAL', 'USURP', 'USURY', 'UTERI', 'UTERO', 'UTILE', 'UTTER', 'UVULA', 'VACUA', 'VADED', 'VADES', 'VAGAL', 'VAGUE', 'VAGUS', 'VAILS', 'VAIRS', 'VAKIL', 'VALES',
  'VALET', 'VALID', 'VALOR', 'VALSE', 'VALUE', 'VALVE', 'VAMPS', 'VANDA', 'VANED', 'VANES', 'VANGS', 'VAPID', 'VAPOR', 'VARAS', 'VARIA', 'VARIX', 'VARNA', 'VARUS', 'VARVE', 'VASAL',
  'VASES', 'VASTS', 'VASTY', 'VATIC', 'VATUS', 'VAULT', 'VAUNT', 'VEALS', 'VEALY', 'VEENA', 'VEEPS', 'VEERS', 'VEERY', 'VEGAN', 'VEILS', 'VEINS', 'VEINY', 'VELAR', 'VELDS', 'VELDT',
  'VELUM', 'VENAE', 'VENAL', 'VENDS', 'VENGE', 'VENIN', 'VENOM', 'VENTS', 'VENUE', 'VENUS', 'VERBS', 'VERGE', 'VERSE', 'VERSO', 'VERST', 'VERTS', 'VERTU', 'VERVE', 'VESPA', 'VESTA',
  'VESTS', 'VETCH', 'VEXED', 'VEXER', 'VEXES', 'VEXIL', 'VIALS', 'VIAND', 'VIBES', 'VICAR', 'VICED', 'VICES', 'VICHY', 'VIDEO', 'VIERS', 'VIEWS', 'VIGIL', 'VIGOR', 'VILER', 'VILLA',
  'VILLI', 'VILLS', 'VIMEN', 'VIMES', 'VINAL', 'VINAS', 'VINCA', 'VINED', 'VINER', 'VINES', 'VINIC', 'VINOS', 'VINYL', 'VIOLA', 'VIPER', 'VIRAL', 'VIREO', 'VIRES', 'VIRGA', 'VIRGO',
  'VIRID', 'VIRLS', 'VIRTU', 'VIRUS', 'VISAS', 'VISED', 'VISES', 'VISIT', 'VISOR', 'VISTA', 'VITAE', 'VITAS', 'VITEX', 'VITRO', 'VITTA', 'VIVAS', 'VIVAT', 'VIVID', 'VIVOS', 'VIXEN',
  'VIZIR', 'VIZOR', 'VOCAB', 'VOCAL', 'VOCES', 'VODKA', 'VOGIE', 'VOGUE', 'VOICE', 'VOIDS', 'VOILA', 'VOILE', 'VOLAR', 'VOLES', 'VOLET', 'VOLKS', 'VOLTA', 'VOLTE', 'VOLTI', 'VOLTS',
  'VOLVA', 'VOLVE', 'VOMER', 'VOMIT', 'VOTED', 'VOTER', 'VOTES', 'VOUCH', 'VOUGE', 'VOULU', 'VOWED', 'VOWEL', 'VOWER', 'VOXEL', 'VROOM', 'VROWS', 'VUGGS', 'VUGGY', 'VUGHS', 'VUGHY',
  'VULGO', 'VULVA', 'VUTTY', 'VYING', 'WACKO', 'WACKS', 'WACKY', 'WADED', 'WADER', 'WADES', 'WADIS', 'WAFER', 'WAFTS', 'WAGED', 'WAGER', 'WAGES', 'WAGON', 'WAHOO', 'WAIFS', 'WAILS',
  'WAINS', 'WAIRS', 'WAIST', 'WAITS', 'WAIVE', 'WAKED', 'WAKEN', 'WAKER', 'WAKES', 'WALED', 'WALER', 'WALES', 'WALKS', 'WALLA', 'WALLS', 'WALLY', 'WALTZ', 'WAMED', 'WAMUS', 'WANDS',
  'WANED', 'WANES', 'WANEY', 'WANGS', 'WANKS', 'WANKY', 'WANLY', 'WANNA', 'WANTS', 'WARDS', 'WARED', 'WARES', 'WARKS', 'WARMS', 'WARNS', 'WARPS', 'WARTS', 'WARTY', 'WASPS', 'WASTE',
  'WASTS', 'WATAP', 'WATCH', 'WATTS', 'WAUFF', 'WAUGH', 'WAUKS', 'WAULS', 'WAURS', 'WAVED', 'WAVER', 'WAVES', 'WAVEY', 'WAWLS', 'WAXED', 'WAXEN', 'WAXER', 'WAXES', 'WAXIE', 'WAZIR',
  'WAZOO', 'WEALD', 'WEALS', 'WEANS', 'WEARS', 'WEARY', 'WEAVE', 'WEBBY', 'WEBER', 'WECHT', 'WEDEL', 'WEDGE', 'WEDGY', 'WEEDS', 'WEEDY', 'WEEKS', 'WEEPS', 'WEEPY', 'WEEST', 'WEEZE',
  'WEFTS', 'WEIGH', 'WEILS', 'WEIRD', 'WEIRS', 'WEISE', 'WEISM', 'WEIZE', 'WEKAS', 'WELCH', 'WELDS', 'WELLS', 'WELSH', 'WELTS', 'WEMBS', 'WENCH', 'WENDS', 'WENGE', 'WENNY', 'WENTS',
  'WEROS', 'WERSH', 'WESTS', 'WETAS', 'WETLY', 'WEXED', 'WEXES', 'WHACK', 'WHALE', 'WHALM', 'WHALP', 'WHAMS', 'WHANG', 'WHAPS', 'WHARE', 'WHARF', 'WHARL', 'WHARO', 'WHARP', 'WHART',
  'WHASE', 'WHATS', 'WHAUK', 'WHAUP', 'WHAUR', 'WHEAL', 'WHEAR', 'WHEEL', 'WHEEN', 'WHEEP', 'WHEER', 'WHEFT', 'WHELK', 'WHELM', 'WHELP', 'WHENS', 'WHERE', 'WHETS', 'WHEWS', 'WHEYS',
  'WHICH', 'WHIDS', 'WHIFF', 'WHIFT', 'WHIGS', 'WHILE', 'WHILK', 'WHIMS', 'WHINE', 'WHINS', 'WHINY', 'WHIPS', 'WHIPT', 'WHIRL', 'WHIRR', 'WHIRS', 'WHISH', 'WHISK', 'WHISS', 'WHIST',
  'WHITE', 'WHITS', 'WHITY', 'WHIZZ', 'WHOLE', 'WHOMP', 'WHOOF', 'WHOOP', 'WHOOT', 'WHOPS', 'WHORE', 'WHORL', 'WHORT', 'WHOSE', 'WHOSO', 'WHUFF', 'WHUMP', 'WHUPS', 'WHUSH', 'WHYDA',
  'WICCA', 'WICKS', 'WICKY', 'WIDDY', 'WIDEN', 'WIDER', 'WIDES', 'WIDOW', 'WIDTH', 'WIELD', 'WIELS', 'WIFED', 'WIFES', 'WIFEY', 'WIFIE', 'WIFTY', 'WIGAN', 'WIGGY', 'WIGHT', 'WIGLE',
  'WIKIS', 'WILCO', 'WILDS', 'WILED', 'WILES', 'WILGA', 'WILIS', 'WILJA', 'WILLS', 'WILLY', 'WILTS', 'WIMPS', 'WIMPY', 'WINCE', 'WINCH', 'WINDS', 'WINDY', 'WINED', 'WINES', 'WINEY',
  'WINGE', 'WINGS', 'WINGY', 'WINKS', 'WINOS', 'WINZE', 'WIPED', 'WIPER', 'WIPES', 'WIRED', 'WIRER', 'WIRES', 'WIRRA', 'WIRRI', 'WISED', 'WISER', 'WISES', 'WISHA', 'WISHT', 'WISPS',
  'WISPY', 'WISSE', 'WISTA', 'WISTS', 'WITAN', 'WITCH', 'WITED', 'WITES', 'WITHE', 'WITHY', 'WITTY', 'WIVED', 'WIVER', 'WIVES', 'WIZEN', 'WIZES', 'WOADS', 'WOALD', 'WOCKS', 'WODGE',
  'WOFUL', 'WOGAN', 'WOHLS', 'WOKAS', 'WOKEN', 'WOKER', 'WOKES', 'WOLDS', 'WOLFS', 'WOLLY', 'WOLVE', 'WOMAN', 'WOMBS', 'WOMBY', 'WOMEN', 'WOMYN', 'WONGA', 'WONGS', 'WONKS', 'WONKY',
  'WONTS', 'WOODS', 'WOODY', 'WOOED', 'WOOER', 'WOOFS', 'WOOFT', 'WOOFY', 'WOOLD', 'WOOLS', 'WOOLY', 'WOOPS', 'WOOSE', 'WOOSH', 'WOOTZ', 'WOOZY', 'WORDS', 'WORDY', 'WORKS', 'WORLD',
  'WORMS', 'WORMY', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WORTS', 'WOULD', 'WOUND', 'WOVEN', 'WOWED', 'WOWEE', 'WOWSE', 'WRACK', 'WRANG', 'WRAPS', 'WRAPT', 'WRAST', 'WRATE', 'WRATH',
  'WREAK', 'WREAT', 'WRECK', 'WRENS', 'WREST', 'WRICK', 'WRIDE', 'WRIED', 'WRIER', 'WRIES', 'WRING', 'WRIST', 'WRITE', 'WRITS', 'WROKE', 'WRONG', 'WROTE', 'WROTH', 'WROWN', 'WRUNG',
  'WRYER', 'WRYLY', 'WUDDY', 'WUDUS', 'WULLS', 'WURST', 'WUSES', 'WUSHY', 'WUSSY', 'WUXIA', 'WYLED', 'WYLES', 'WYNDS', 'WYNNS', 'WYTED', 'WYTES', 'XEBEC', 'XENIA', 'XENIC', 'XERIC',
  'XEROX', 'XERUS', 'XOANA', 'XRAYS', 'XULAN', 'XYLAN', 'XYLEM', 'XYLIC', 'XYLOL', 'XYLYL', 'XYSTI', 'XYSTS', 'YABBY', 'YACCA', 'YACKA', 'YACKS', 'YAFFS', 'YAGER', 'YAGES', 'YAGIS',
  'YAHOO', 'YAIRD', 'YAKKA', 'YAKOW', 'YALES', 'YAMEN', 'YAMUN', 'YANGS', 'YANKS', 'YAPOK', 'YAPON', 'YAPPS', 'YAPPY', 'YARAK', 'YARCO', 'YARDS', 'YARER', 'YARFA', 'YARKS', 'YARNS',
  'YARRS', 'YARTA', 'YARTO', 'YATES', 'YAUDS', 'YAULD', 'YAUPS', 'YAWED', 'YAWLS', 'YAWNS', 'YAWNY', 'YAWPS', 'YBORE', 'YCLAD', 'YCLED', 'YCOND', 'YDRAD', 'YEADS', 'YEAHS', 'YEALM',
  'YEANS', 'YEARD', 'YEARL', 'YEARN', 'YEARS', 'YEAST', 'YECCH', 'YECHS', 'YECHY', 'YEEDS', 'YEESH', 'YEGGS', 'YELKS', 'YELLS', 'YELPS', 'YELTS', 'YENTA', 'YENTE', 'YERBA', 'YERDS',
  'YERKS', 'YESES', 'YESKS', 'YESTY', 'YETIS', 'YETTS', 'YEUKS', 'YEUKY', 'YEVEN', 'YEVES', 'YEWEN', 'YEXED', 'YEXES', 'YFERE', 'YIELD', 'YIKED', 'YIKES', 'YILLS', 'YINCE', 'YIPES',
  'YIPPY', 'YIRDS', 'YIRKS', 'YIRRS', 'YIRTH', 'YITES', 'YITIE', 'YLEMS', 'YLIKE', 'YLKES', 'YMOLT', 'YMPES', 'YOBBO', 'YOBBY', 'YOCCO', 'YOCKS', 'YODEL', 'YODHS', 'YODLE', 'YOGAS',
  'YOGEE', 'YOGHS', 'YOGIC', 'YOGIN', 'YOGIS', 'YOHES', 'YOICK', 'YOJAN', 'YOKED', 'YOKEL', 'YOKER', 'YOKES', 'YOKUL', 'YOLKS', 'YOLKY', 'YOMIM', 'YOMPS', 'YONIC', 'YONIS', 'YONKS',
  'YOOFS', 'YOOPS', 'YOOTS', 'YOPES', 'YOPPY', 'YORKS', 'YORPS', 'YOUKS', 'YOUNG', 'YOURN', 'YOURS', 'YOURT', 'YOUSE', 'YOWED', 'YOWES', 'YOWIE', 'YOWLS', 'YOWZA', 'YRAPT', 'YRENT',
  'YRIVD', 'YRNEH', 'YSHED', 'YSHES', 'YSOLO', 'YSTED', 'YSULT', 'YUANS', 'YUCAS', 'YUCCA', 'YUCCH', 'YUCHS', 'YUCKY', 'YUFTS', 'YUGAS', 'YUKED', 'YUKES', 'YUKKY', 'YUKOS', 'YULAN',
  'YULES', 'YUMMO', 'YUMMY', 'YUMPS', 'YUPON', 'YUPPY', 'YURTA', 'YURTS', 'YURUS', 'YUSES', 'YUSHY', 'YUSSY', 'YUTES', 'YUZUS', 'ZABRA', 'ZACKS', 'ZAIDA', 'ZAIDY', 'ZAIRE', 'ZAKAT',
  'ZAMAN', 'ZAMBO', 'ZAMIA', 'ZANJA', 'ZANTE', 'ZANZA', 'ZANZE', 'ZAPAS', 'ZAPPY', 'ZAPUS', 'ZARFS', 'ZARIS', 'ZATIS', 'ZAXES', 'ZAYIN', 'ZAZEN', 'ZEALS', 'ZEBEC', 'ZEBUS', 'ZEDAS',
  'ZEINS', 'ZELOS', 'ZELUS', 'ZEMNI', 'ZEMST', 'ZENDO', 'ZERDA', 'ZERKS', 'ZEROS', 'ZESTS', 'ZESTY', 'ZETAS', 'ZEXES', 'ZEZES', 'ZHOMO', 'ZIBET', 'ZIFFS', 'ZIGAN', 'ZILAS', 'ZILCH',
  'ZILLA', 'ZILLS', 'ZIMBI', 'ZIMBS', 'ZINCO', 'ZINCS', 'ZINCY', 'ZINEB', 'ZINES', 'ZINGS', 'ZINGY', 'ZINKE', 'ZINKY', 'ZIPOS', 'ZIPPY', 'ZIRAM', 'ZITIS', 'ZITTY', 'ZIZEL', 'ZIZIT',
  'ZLOTE', 'ZLOTY', 'ZOAEA', 'ZOBOS', 'ZOBUS', 'ZOCCO', 'ZOEAE', 'ZOEAL', 'ZOEAS', 'ZOISM', 'ZOIST', 'ZOMBI', 'ZONAE', 'ZONDA', 'ZONED', 'ZONER', 'ZONES', 'ZONIC', 'ZONKS', 'ZOOEA',
  'ZOOEY', 'ZOOID', 'ZOOIE', 'ZOOKS', 'ZOOMS', 'ZOONS', 'ZOOTY', 'ZOPPA', 'ZOPPO', 'ZORIL', 'ZORIS', 'ZORRO', 'ZOSES', 'ZOTOS', 'ZOUKS', 'ZOWEE', 'ZOWIE', 'ZULUS', 'ZUPAN', 'ZUPAS',
  'ZUPPS', 'ZURFS', 'ZWIEB', 'ZYGAL', 'ZYGON', 'ZYMES', 'ZYMIN', 'ZYMOL', 'ZYTHA'
].filter(word => word.length === 5);

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const STORAGE_KEY_STATS = 'pw:wordle:stats';

type LetterState = 'correct' | 'present' | 'absent' | 'empty';

type Guess = {
  word: string;
  states: LetterState[];
};

type Stats = {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
};

const getDailyWord = (date: Date): string => {
  const dateStr = date.toDateString();
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = ((seed << 5) - seed) + dateStr.charCodeAt(i);
    seed = seed & seed;
  }
  const index = Math.abs(seed) % WORDS.length;
  return WORDS[index];
};

const Wordle = () => {
  const { theme } = useTheme();
  const [targetWord, setTargetWord] = useState(() => {
    const stored = localStorage.getItem('pw:wordle:word');
    const storedDate = localStorage.getItem('pw:wordle:date');
    const today = new Date().toDateString();
    
    if (stored && storedDate === today) {
      return stored;
    }
    
    const word = getDailyWord(new Date());
    localStorage.setItem('pw:wordle:word', word);
    localStorage.setItem('pw:wordle:date', today);
    return word;
  });
  
  const [currentGuess, setCurrentGuess] = useState('');
  const [invalidWord, setInvalidWord] = useState(false);
  const [guesses, setGuesses] = useState<Guess[]>(() => {
    const storedGuesses = localStorage.getItem('pw:wordle:guesses');
    const storedDate = localStorage.getItem('pw:wordle:date');
    const today = new Date().toDateString();
    
    if (storedGuesses && storedDate === today) {
      try {
        return JSON.parse(storedGuesses);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>(() => {
    const storedState = localStorage.getItem('pw:wordle:state');
    const storedDate = localStorage.getItem('pw:wordle:date');
    const today = new Date().toDateString();
    
    if (storedState && storedDate === today) {
      return storedState as 'playing' | 'won' | 'lost';
    }
    return 'playing';
  });
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>({});
  const [showStats, setShowStats] = useState(false);
  const modalScrollRef = useRef<number>(0);
  const [stats, setStats] = useState<Stats>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_STATS);
    const lastPlayedDate = localStorage.getItem('pw:wordle:lastPlayedDate');
    const today = new Date().toDateString();
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (lastPlayedDate !== today && lastPlayedDate) {
          const lastState = localStorage.getItem('pw:wordle:state');
          if (lastState === 'lost') {
            parsed.currentStreak = 0;
          }
        }
        return parsed;
      } catch {
        return { gamesPlayed: 0, gamesWon: 0, currentStreak: 0, maxStreak: 0, guessDistribution: [0, 0, 0, 0, 0, 0] };
      }
    }
    return { gamesPlayed: 0, gamesWon: 0, currentStreak: 0, maxStreak: 0, guessDistribution: [0, 0, 0, 0, 0, 0] };
  });

  const checkGuess = useCallback((guess: string): LetterState[] => {
    const states: LetterState[] = Array(WORD_LENGTH).fill('absent');
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    const used = Array(WORD_LENGTH).fill(false);

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        states[i] = 'correct';
        used[i] = true;
      }
    }

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (states[i] === 'correct') continue;
      for (let j = 0; j < WORD_LENGTH; j++) {
        if (!used[j] && guessLetters[i] === targetLetters[j]) {
          states[i] = 'present';
          used[j] = true;
          break;
        }
      }
    }

    return states;
  }, [targetWord]);

  const updateLetterStates = useCallback((guess: string, states: LetterState[]) => {
    const newStates = { ...letterStates };
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const state = states[i];
      if (!newStates[letter] || (state === 'correct') || (state === 'present' && newStates[letter] === 'absent')) {
        newStates[letter] = state;
      }
    }
    setLetterStates(newStates);
  }, [letterStates]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) return;
    if (!WORDS.includes(currentGuess)) {
      setInvalidWord(true);
      setTimeout(() => setInvalidWord(false), 600);
      return;
    }

    const guessWord = currentGuess;
    const states = checkGuess(guessWord);
    const newGuess: Guess = { word: guessWord, states };
    const newGuesses = guesses.length + 1;
    
    setGuesses(prev => [...prev, newGuess]);
    setCurrentGuess('');
    updateLetterStates(guessWord, states);
    
    const today = new Date().toDateString();
    const lastPlayedDate = localStorage.getItem('pw:wordle:lastPlayedDate');
    
    const updatedGuesses = [...guesses, newGuess];
    localStorage.setItem('pw:wordle:guesses', JSON.stringify(updatedGuesses));
    
    if (guessWord === targetWord) {
      setTimeout(() => {
        setGameState('won');
        const wasNewDay = lastPlayedDate !== today;
        const newStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + (wasNewDay ? 1 : 0),
          gamesWon: stats.gamesWon + (wasNewDay ? 1 : 0),
          currentStreak: wasNewDay ? stats.currentStreak + 1 : stats.currentStreak,
          maxStreak: wasNewDay ? Math.max(stats.maxStreak, stats.currentStreak + 1) : stats.maxStreak,
          guessDistribution: wasNewDay ? stats.guessDistribution.map((count, idx) => 
            idx === newGuesses - 1 ? count + 1 : count
          ) : stats.guessDistribution,
        };
        setStats(newStats);
        localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(newStats));
        localStorage.setItem('pw:wordle:state', 'won');
        localStorage.setItem('pw:wordle:lastPlayedDate', today);
        setTimeout(() => setShowStats(true), 1500);
      }, WORD_LENGTH * 300 + 300);
    } else if (newGuesses >= MAX_GUESSES) {
      setTimeout(() => {
        setGameState('lost');
        const wasNewDay = lastPlayedDate !== today;
        const newStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + (wasNewDay ? 1 : 0),
          currentStreak: wasNewDay ? 0 : stats.currentStreak,
        };
        setStats(newStats);
        localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(newStats));
        localStorage.setItem('pw:wordle:state', 'lost');
        localStorage.setItem('pw:wordle:lastPlayedDate', today);
        setTimeout(() => setShowStats(true), 1500);
      }, WORD_LENGTH * 300 + 300);
    }
  }, [currentGuess, targetWord, guesses, checkGuess, updateLetterStates, stats]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameState !== 'playing') return;
    
    if (key === 'Enter') {
      submitGuess();
    } else if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.length === 1 && /[A-Za-z]/.test(key)) {
      setCurrentGuess(prev => {
        if (prev.length < WORD_LENGTH) {
          return prev + key.toUpperCase();
        }
        return prev;
      });
    }
  }, [gameState, submitGuess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        handleKeyPress('Enter');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        e.stopPropagation();
        handleKeyPress('Backspace');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, gameState]);

  useEffect(() => {
    const modalPanel = document.querySelector('.project-modal__panel') as HTMLElement;
    
    if (showStats && modalPanel) {
      modalScrollRef.current = modalPanel.scrollTop;
      const rect = modalPanel.getBoundingClientRect();
      modalPanel.style.position = 'fixed';
      modalPanel.style.top = `${rect.top}px`;
      modalPanel.style.left = `${rect.left}px`;
      modalPanel.style.width = `${rect.width}px`;
      modalPanel.style.maxHeight = `${rect.height}px`;
      modalPanel.style.overflow = 'hidden';
      modalPanel.style.pointerEvents = 'none';
      const wordleOverlay = document.querySelector('.wordle__overlay') as HTMLElement;
      if (wordleOverlay) {
        wordleOverlay.style.pointerEvents = 'auto';
      }
    } else if (modalPanel) {
      const wasFixed = modalPanel.style.position === 'fixed';
      modalPanel.style.position = '';
      modalPanel.style.top = '';
      modalPanel.style.left = '';
      modalPanel.style.width = '';
      modalPanel.style.maxHeight = '';
      modalPanel.style.overflow = '';
      modalPanel.style.pointerEvents = '';
      const wordleOverlay = document.querySelector('.wordle__overlay') as HTMLElement;
      if (wordleOverlay) {
        wordleOverlay.style.pointerEvents = '';
      }
      if (wasFixed && modalScrollRef.current >= 0) {
        requestAnimationFrame(() => {
          if (modalPanel) {
            modalPanel.scrollTop = modalScrollRef.current;
          }
        });
      }
    }
    
    return () => {
      if (modalPanel) {
        modalPanel.style.position = '';
        modalPanel.style.top = '';
        modalPanel.style.left = '';
        modalPanel.style.width = '';
        modalPanel.style.maxHeight = '';
        modalPanel.style.overflow = '';
        modalPanel.style.pointerEvents = '';
      }
      const wordleOverlay = document.querySelector('.wordle__overlay') as HTMLElement;
      if (wordleOverlay) {
        wordleOverlay.style.pointerEvents = '';
      }
    };
  }, [showStats]);

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
  ];

  const resetGame = useCallback(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('pw:wordle:date');
    
    if (storedDate !== today) {
      const word = getDailyWord(new Date());
      localStorage.setItem('pw:wordle:word', word);
      localStorage.setItem('pw:wordle:date', today);
      setTargetWord(word);
      localStorage.removeItem('pw:wordle:guesses');
      localStorage.removeItem('pw:wordle:state');
    }
    
    setCurrentGuess('');
    setGuesses([]);
    setGameState('playing');
    setLetterStates({});
    setShowStats(false);
  }, []);

  const resetStats = useCallback(() => {
    const newStats = { gamesPlayed: 0, gamesWon: 0, currentStreak: 0, maxStreak: 0, guessDistribution: [0, 0, 0, 0, 0, 0] };
    setStats(newStats);
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(newStats));
  }, []);

  const maxDistribution = Math.max(...stats.guessDistribution, 1);

  return (
    <div className={`wordle wordle--${theme}`}>
      <div className="wordle__header">
        <h1 className="wordle__title">WORDLE</h1>
        <div className="wordle__header-actions">
          <button className="wordle__btn wordle__btn--stats" onClick={() => setShowStats(true)} title="Statistics">
            <span className="material-symbols-outlined">bar_chart</span>
          </button>
          <button className="wordle__btn wordle__btn--reset" onClick={resetGame} title="New Game">
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </div>

      <div className={`wordle__board ${invalidWord ? 'wordle__board--shake' : ''}`}>
        {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
          const guess = guesses[rowIndex];
          const isCurrentRow = rowIndex === guesses.length;
          const isRevealed = guess !== undefined;
          
          return (
            <div key={rowIndex} className="wordle__row">
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                const letter = isCurrentRow 
                  ? currentGuess[colIndex] || ''
                  : guess?.word[colIndex] || '';
                const state = guess?.states[colIndex] || 'empty';
                
                return (
                  <div
                    key={colIndex}
                    className={`wordle__cell wordle__cell--${state} ${isRevealed ? 'wordle__cell--revealed' : ''}`}
                    style={isRevealed ? { animationDelay: `${colIndex * 300}ms` } : undefined}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="wordle__keyboard">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="wordle__keyboard-row">
            {row.map((key) => {
              const isSpecial = key === 'Enter' || key === 'Backspace';
              const letterState = letterStates[key] || 'empty';
              
              return (
                <button
                  key={key}
                  className={`wordle__key ${isSpecial ? 'wordle__key--special' : ''} wordle__key--${letterState}`}
                  onClick={() => handleKeyPress(key)}
                >
                  {key === 'Backspace' ? '⌫' : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {showStats && (
        <div className="wordle__overlay" onClick={() => setShowStats(false)}>
          <div className="wordle__stats-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wordle__stats-header">
              <h2 className="wordle__stats-title">Statistics</h2>
              <button className="wordle__stats-close" onClick={() => setShowStats(false)}>×</button>
            </div>
            
            <div className="wordle__stats-grid">
              <div className="wordle__stat-item">
                <div className="wordle__stat-value">{stats.gamesPlayed}</div>
                <div className="wordle__stat-label">Played</div>
              </div>
              <div className="wordle__stat-item">
                <div className="wordle__stat-value">{stats.gamesWon > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0}%</div>
                <div className="wordle__stat-label">Win %</div>
              </div>
              <div className="wordle__stat-item">
                <div className="wordle__stat-value">{stats.currentStreak}</div>
                <div className="wordle__stat-label">Current Streak</div>
              </div>
              <div className="wordle__stat-item">
                <div className="wordle__stat-value">{stats.maxStreak}</div>
                <div className="wordle__stat-label">Max Streak</div>
              </div>
            </div>

            <div className="wordle__distribution">
              <div className="wordle__distribution-title">Guess Distribution</div>
              {stats.guessDistribution.map((count, idx) => (
                <div key={idx} className="wordle__distribution-row">
                  <div className="wordle__distribution-label">{idx + 1}</div>
                  <div className="wordle__distribution-bar">
                    <div 
                      className="wordle__distribution-fill" 
                      style={{ width: `${(count / maxDistribution) * 100}%` }}
                    >
                      {count > 0 && <span className="wordle__distribution-count">{count}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="wordle__stats-actions">
              <button className="wordle__btn wordle__btn--reset-stats" onClick={resetStats}>
                Reset Stats
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'won' && !showStats && (
        <div className="wordle__result wordle__result--won">
          <div className="wordle__result-title">Splendid!</div>
          <div className="wordle__result-subtitle">You got it in {guesses.length} {guesses.length === 1 ? 'guess' : 'guesses'}!</div>
        </div>
      )}

      {gameState === 'lost' && !showStats && (
        <div className="wordle__result wordle__result--lost">
          <div className="wordle__result-title">Better luck next time!</div>
          <div className="wordle__result-subtitle">The word was: <strong>{targetWord}</strong></div>
        </div>
      )}
    </div>
  );
};

export default Wordle;
