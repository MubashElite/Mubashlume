import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, BadgeCheck, ChevronLeft, ChevronRight, GraduationCap, MapPin, Menu, MessageCircle, Medal, Search, Send, ExternalLink, X, Mail, Clock, ShoppingBag, TrendingUp, BriefcaseBusiness } from 'lucide-react';
import * as React from 'react';

type Page='about'|'reviews'|'portfolio'|'contact';
const currentPage=():Page=>{const p=location.pathname.replace(/\/$/,'');if(p.endsWith('/full-reviews'))return'reviews';if(p.endsWith('/full-portfolio'))return'portfolio';if(p.endsWith('/contact'))return'contact';return'about'};
type Store={name:string;domain:string;category:string;note:string};
const raw=`Hiut Denim|hiutdenim.co.uk|Fashion|Independent denim maker
Tentree|tentree.com|Fashion|Purpose-led apparel
Maguire Shoes|maguireshoes.com|Fashion|Footwear
The Outrage|the-outrage.com|Fashion|Cause-led graphic apparel
Adored Vintage|adoredvintage.com|Fashion|Vintage clothing
Goodfair|goodfair.com|Fashion|Secondhand clothing bundles
Kirrin Finch|kirrinfinch.com|Fashion|Inclusive tailored clothing
Beefcake Swimwear|beefcakeswimwear.com|Fashion|Ethical swimwear
Suta|suta.in|Fashion|Handwoven Indian fashion
Uppercase Magazine|uppercasemagazine.com|Home & Art|Independent print and design
Artisaire|artisaire.com|Home & Art|Wax seals and stationery
Terre Bleu|terrebleu.ca|Home & Art|Lavender farm products
Silk and Willow|silkandwillow.com|Home & Art|Sustainable wedding decor
GOODEE|goodeeworld.com|Home & Art|Ethical home goods
Bruvi|bruvi.com|Electronics|Coffee machines and pods
Pela|pelacase.ca|Electronics|Compostable phone cases
Cowboy|cowboy.com|Electronics|Electric bikes
Cocolab|cocofloss.com|Subscription|Oral care subscriptions
Loot Crate|lootcrate.com|Subscription|Themed subscription boxes
Pot Gang|potgang.co.uk|Subscription|Gardening kits
United By Blue|unitedbyblue.com|Fashion|Outdoor apparel and goods
Manitobah|manitobah.com|Fashion|Indigenous footwear
Camille Brinch|camillebrinch.com|Jewelry|Contemporary jewelry
Velasca|velasca.com|Fashion|Italian leather shoes
Troubadour Goods|troubadourgoods.com|Fashion|Premium bags
BLK & Bold|blkandbold.com|Food & Drink|Coffee and tea
Fly By Jing|flybyjing.com|Food & Drink|Sichuan pantry products
Verve Coffee|vervecoffee.com|Food & Drink|Specialty coffee
Taza Chocolate|tazachocolate.com|Food & Drink|Stone-ground chocolate
Yeung Man Cooking|yeungmancooking.com|Food & Drink|Cookbooks and kitchen goods
Flourist|flourist.com|Food & Drink|Heritage grains and flour
The Honey Pot|thehoneypot.co|Beauty|Feminine care
Package Free|packagefreeshop.com|Home & Art|Low-waste essentials
Beauty Bakerie|beautybakerie.com|Beauty|Color cosmetics
Cheekbone Beauty|cheekbonebeauty.com|Beauty|Vegan cosmetics
Meow Meow Tweet|meowmeowtweet.com|Beauty|Botanical skincare
Beneath Your Mask|beneathyourmask.com|Beauty|Premium skincare
Fresh Heritage|freshheritage.com|Beauty|Men's grooming
Then I Met You|thenimetyou.com|Beauty|Korean skincare
Range Beauty|rangebeauty.com|Beauty|Inclusive makeup
LastObject|lastobject.com|Home & Art|Reusable everyday products
Tofino Soap Company|tofinosoapcompany.com|Beauty|Small-batch body care
Satya|satyaorganics.com|Beauty|Minimal ingredient skincare
Healthy Roots Dolls|healthyrootsdolls.com|Kids & Toys|Dolls and play
GiveMeTap|givemetap.com|Home & Art|Reusable bottles
Lunchskins|lunchskins.com|Home & Art|Reusable food storage
Bebemoss|bebemoss.com|Kids & Toys|Handmade children's toys
Made In Cookware|madeincookware.com|Home & Art|Chef-grade cookware
Bookishly|bookishly.co.uk|Books & Gifts|Literary gifts
Burden of Proof|burdenofproof.com|Food & Drink|Non-alcoholic drinks
KOI Footwear|koifootwear.com|Fashion|Alternative footwear
SNOW Oral Care|trysnow.com|Beauty|Oral care products
Thryfty|thryftydetroit.com|Fashion|Streetwear jewelry
Shakti Mat|shaktimat.com|Health & Wellness|Acupressure mats
Miami Fruit|miamifruit.org|Food & Drink|Rare tropical fruit
MATE the Label|matethelabel.com|Fashion|Organic basics
Supergoop|supergoop.com|Beauty|Sun care
Ruffwear|ruffwear.com|Pets|Outdoor dog gear
Nialaya|nialaya.com|Jewelry|Handcrafted jewelry
Sensibo|sensibo.com|Electronics|Smart climate devices
Headphone Zone|headphonezone.in|Electronics|Audio equipment
Book of the Month|bookofthemonth.com|Books & Gifts|Book subscription
MATE the Label|matethelabel.com|Fashion|Organic apparel
Caden Lane|cadenlane.com|Kids & Toys|Baby gifts and nursery
Open Farm|openfarmpet.com|Pets|Pet food and treats
Caraway|carawayhome.com|Home & Art|Cookware and kitchenware
Graza|graza.co|Food & Drink|Olive oil
Olipop|drinkolipop.com|Food & Drink|Prebiotic soda
Ryze|ryzesuperfoods.com|Food & Drink|Mushroom coffee
Lovevery|lovevery.com|Kids & Toys|Developmental play kits
gorjana|gorjana.com|Jewelry|Everyday jewelry
Cernucci|cernucci.com|Jewelry|Streetwear jewelry
BARK| Bark.co|Pets|Dog toys and treats
Chemical Guys|chemicalguys.com|Automotive|Car care products
Faherty|fahertybrand.com|Fashion|Clothing and lifestyle
Chubbies|chubbiesshorts.com|Fashion|Casual apparel
PAT McGRATH LABS|patmcgrath.com|Beauty|Luxury makeup
Lulu and Georgia|luluandgeorgia.com|Home & Art|Home furnishings
Cocokind|cocokind.com|Beauty|Skincare
Topicals|mytopicals.com|Beauty|Skincare
Dieux|dieuxskin.com|Beauty|Skincare
Nécessaire|necessaire.com|Beauty|Body care
OSEA|oseamalibu.com|Beauty|Seaweed skincare
Saltair|saltair.com|Beauty|Body care
Youth to the People|youthtothepeople.com|Beauty|Skincare
Tower 28|tower28beauty.com|Beauty|Sensitive-skin makeup
ILIA Beauty|iliabeauty.com|Beauty|Clean makeup
Saie|saiehello.com|Beauty|Makeup
Typology|typology.com|Beauty|Skincare
Pai Skincare|paiskincare.com|Beauty|Sensitive skincare
Axiology|axiologybeauty.com|Beauty|Multi-use makeup
Wild|wearewild.com|Beauty|Refillable personal care
Wild Deodorant|wearewild.com|Beauty|Refillable deodorant
Haeckels|haeckels.co.uk|Beauty|Coastal skincare
UpCircle Beauty|upcirclebeauty.com|Beauty|Upcycled skincare
Facetheory|facetheory.com|Beauty|Skincare
Gallinée|gallinee.com|Beauty|Microbiome skincare
Evolve Organic Beauty|evolvebeauty.com|Beauty|Organic skincare
Flamingo Estate|flamingoestate.com|Home & Art|Garden-inspired goods
Public Goods|publicgoods.com|Home & Art|Household essentials
Blueland|blueland.com|Home & Art|Refillable cleaning
Grove Collaborative|grove.co|Home & Art|Sustainable household
Branch Basics|branchbasics.com|Home & Art|Cleaning concentrates
Our Place|fromourplace.com|Home & Art|Cookware
Great Jones|greatjones.com|Home & Art|Cookware
Material Kitchen|materialkitchen.com|Home & Art|Kitchen tools
East Fork|eastfork.com|Home & Art|Ceramics
Schoolhouse|schoolhouse.com|Home & Art|Lighting and decor
Coming Soon|comingsoonnewyork.com|Home & Art|Design-led home objects
Hem|hem.com|Home & Art|Modern furniture
Sabai Design|sabai.design|Home & Art|Sustainable furniture
Burrow|burrow.com|Home & Art|Modular furniture
Floyd|floydhome.com|Home & Art|Furniture
Article|article.com|Home & Art|Furniture
The Citizenry|the-citizenry.com|Home & Art|Artisan home goods
Minna|minna-goods.com|Home & Art|Handwoven home textiles
Quiet Town|quiettownhome.com|Home & Art|Bath textiles
Graf Lantz|graflantz.com|Home & Art|Wool felt accessories
Areaware|areaware.com|Home & Art|Design objects
Poketo|poketo.com|Books & Gifts|Creative lifestyle goods
Present & Correct|presentandcorrect.com|Books & Gifts|Stationery
Appointed|appointed.co|Books & Gifts|Paper goods
Rifle Paper Co.|riflepaperco.com|Books & Gifts|Stationery and gifts
 Papier|papier.com|Books & Gifts|Personalized stationery
Moglea|moglea.com|Books & Gifts|Artful paper goods
Cognitive Surplus|cognitive-surplus.com|Books & Gifts|Science-inspired gifts
The School of Life|theschooloflife.com|Books & Gifts|Books and learning gifts
Chronicle Books|chroniclebooks.com|Books & Gifts|Books and gifts
The Sill|thesill.com|Home & Art|Houseplants
Bloomscape|bloomscape.com|Home & Art|Houseplants
Patch Plants|patchplants.com|Home & Art|Houseplants
Leon & George|leonandgeorge.com|Home & Art|Premium plants
Rooted|rooted.com|Home & Art|Plants and planters
Lively Root|livelyroot.com|Home & Art|Plants
Terrain|shopterrain.com|Home & Art|Garden and home
Gardenheir|gardenheir.com|Home & Art|Garden lifestyle
Modern Sprout|modsprout.com|Home & Art|Indoor gardening
Uncommon Goods|uncommongoods.com|Books & Gifts|Unique gifts
Firebox|firebox.com|Books & Gifts|Novelty gifts
The Grommet|thegrommet.com|Books & Gifts|Innovative products
MoMA Design Store|store.moma.org|Books & Gifts|Design objects
Fishwife|eatfishwife.com|Food & Drink|Tinned seafood
Diaspora Co.|diasporaco.com|Food & Drink|Single-origin spices
Brightland|brightland.co|Food & Drink|Olive oils and vinegar
Omsom|omsom.com|Food & Drink|Asian pantry starters
Fly By Jing|flybyjing.com|Food & Drink|Chinese pantry
Graza Olive Oil|graza.co|Food & Drink|Olive oil
Jacobsen Salt Co.|jacobsensalt.com|Food & Drink|Sea salt
Burlap & Barrel|burlapandbarrel.com|Food & Drink|Single-origin spices
Spicewalla|spicewalla.com|Food & Drink|Spices
Dandelion Chocolate|dandelionchocolate.com|Food & Drink|Craft chocolate
Compartés|compartes.com|Food & Drink|Artisan chocolate
Raaka Chocolate|raakachocolate.com|Food & Drink|Craft chocolate
Tony's Chocolonely|tonyschocolonely.com|Food & Drink|Ethical chocolate
Mouth|mouth.com|Food & Drink|Independent food brands
Goldbelly|goldbelly.com|Food & Drink|Regional food gifts
Graze|graze.com|Food & Drink|Snack boxes
Fishwife Tinned Seafood|eatfishwife.com|Food & Drink|Tinned seafood
Diaspora Spices|diasporaco.com|Food & Drink|Spices
Pipcorn|pipsnacks.com|Food & Drink|Snacks
Partake Foods|partakefoods.com|Food & Drink|Allergy-friendly snacks
Mid-Day Squares|middaysquares.com|Food & Drink|Functional chocolate
Bokksu|bokksu.com|Food & Drink|Japanese snack boxes
Universal Yums|universalyums.com|Food & Drink|International snack boxes
Trade Coffee|drinktrade.com|Food & Drink|Coffee subscriptions
Atlas Coffee Club|atlascoffeeclub.com|Food & Drink|Coffee subscription
Cometeer|cometeer.com|Food & Drink|Frozen coffee
MUD\WTR|mudwtr.com|Food & Drink|Coffee alternative
Four Sigmatic|foursigmatic.com|Food & Drink|Mushroom coffee
Blume|itsblume.com|Food & Drink|Functional drink mixes
Jot|jot.co|Food & Drink|Coffee concentrate
Ghia|drinkghia.com|Food & Drink|Botanical aperitifs
Recess|takearecess.com|Food & Drink|Sparkling drinks
Culture Pop|drinkculturepop.com|Food & Drink|Probiotic soda
Poppi|drinkpoppi.com|Food & Drink|Prebiotic soda
HOP WTR|hopwtr.com|Food & Drink|Hoppy sparkling water
Athletic Brewing|athleticbrewing.com|Food & Drink|Non-alcoholic beer
Partake Brewing|partakebrewing.com|Food & Drink|Non-alcoholic beer
Ritual Zero Proof|ritualzeroproof.com|Food & Drink|Non-alcoholic spirits
Seedlip|seedlipdrinks.com|Food & Drink|Non-alcoholic spirits
Dame|dame.com|Health & Wellness|Wellness products
Maude|getmaude.com|Health & Wellness|Personal care
Hims|forhims.com|Health & Wellness|Personal care
Hers|forhers.com|Health & Wellness|Personal care
Modern Fertility|modernfertility.com|Health & Wellness|Wellness tests
Ritual|ritual.com|Health & Wellness|Vitamins
Care/of|takecareof.com|Health & Wellness|Personalized vitamins
Needed|thisisneeded.com|Health & Wellness|Nutrition
Perelel|perelelhealth.com|Health & Wellness|Women's health
Beam|shopbeam.com|Health & Wellness|Wellness products
Moon Juice|moonjuice.com|Health & Wellness|Wellness products
Golde|golde.co|Health & Wellness|Wellness blends
Apothekary|apothekary.co|Health & Wellness|Botanical blendsThe Nue Co.|thenueco.com|Health & Wellness|Wellness products
Hilma|hilma.co|Health & Wellness|Natural wellness
HUM Nutrition|humnutrition.com|Health & Wellness|Nutrition
Needed|thisisneeded.com|Health & Wellness|Nutrition
Lalo|meetlalo.com|Kids & Toys|Baby essentials
Mushie|mushie.com|Kids & Toys|Baby and toddler goods
Kyte Baby|kytebaby.com|Kids & Toys|Baby clothing
BÉIS|beistravel.com|Fashion|Travel bags
State Bags|statebags.com|Fashion|Bags and backpacks
Dagne Dover|dagnedover.com|Fashion|Bags
Cuyana|cuyana.com|Fashion|Leather goods
MZ Wallace|mzwallace.com|Fashion|Bags
Lo & Sons|loandsons.com|Fashion|Travel bags
Parker Clay|parkerclay.com|Fashion|Leather bags
ABLE|ableclothing.com|Fashion|Ethical fashion
Nisolo|nisolo.com|Fashion|Ethical footwear
KOTN|kotn.com|Fashion|Everyday essentials
ASKET|asket.com|Fashion|Essential apparel
Colorful Standard|colorfulstandard.com|Fashion|Basics
Organic Basics|organicbasics.com|Fashion|Sustainable basics
Pact|wearpact.com|Fashion|Organic clothing
Boody|boody.com|Fashion|Bamboo basics
MUD Jeans|mudjeans.eu|Fashion|Circular denim
Lucy & Yak|lucyandyak.com|Fashion|Colorful clothing
Lucy Folk|lucyfolk.com|Jewelry|Jewelry and accessories
Wolf Circus|wolfcircus.com|Jewelry|Contemporary jewelry
Mejuri|mejuri.com|Jewelry|Fine jewelry
Missoma|missoma.com|Jewelry|Jewelry
Monica Vinader|monicavinader.com|Jewelry|Jewelry
Catbird|catbirdnyc.com|Jewelry|Fine jewelry
Studs|studs.com|Jewelry|Ear piercing and jewelry
Automic Gold|automicgold.com|Jewelry|Inclusive fine jewelry
Machete|shopmachete.com|Jewelry|Accessories
Baggu|baggu.com|Fashion|Reusable bags
Caraa|caraa.co|Fashion|Performance bags
Topo Designs|topodesigns.com|Fashion|Outdoor bags
United By Blue|unitedbyblue.com|Fashion|Outdoor goods
Cotopaxi|cotopaxi.com|Fashion|Outdoor apparel
Rumpl|rumpl.com|Home & Art|Outdoor blankets
Sunday Afternoons| sundayafternoons.com|Fashion|Sun hats
Tropicfeel|tropicfeel.com|Fashion|Travel gear
Peak Design|peakdesign.com|Electronics|Camera and travel gear
Moment|shopmoment.com|Electronics|Camera accessories
Nomad|nomadgoods.com|Electronics|Tech accessories
Bellroy|bellroy.com|Fashion|Wallets and bags
Orbitkey|orbitkey.com|Fashion|Everyday carry
Groove Life|groovelife.com|Jewelry|Rings and accessories
Grip6|grip6.com|Fashion|Belts and accessories
Darn Tough|darntough.com|Fashion|Performance socks
Bombas|bombas.com|Fashion|Socks and underwear
Stance|stance.com|Fashion|Socks and apparel
Feetures|feetures.com|Fashion|Performance socks
Richer Poorer|richer-poorer.com|Fashion|Everyday apparel
Marine Layer|marinelayer.com|Fashion|Casual clothing
Taylor Stitch|taylorstitch.com|Fashion|Menswear
Outerknown|outerknown.com|Fashion|Sustainable apparel
Faherty|fahertybrand.com|Fashion|Clothing
Howler Brothers|howlerbros.com|Fashion|Outdoor apparel
Roark|roark.com|Fashion|Adventure apparel
Tracksmith|tracksmith.com|Sports|Running apparel
Janji|janji.com|Sports|Running apparel
Bandit Running|banditrunning.com|Sports|Running gear
Satisfy Running|satisfyrunning.com|Sports|Running apparel
Rhone|rhone.com|Sports|Performance apparel
Vuori|vuoriclothing.com|Sports|Activewear
Ten Thousand|tenthousand.cc|Sports|Training apparel
Born Primitive|bornprimitive.com|Sports|Fitness apparel
NOBULL|nobullproject.com|Sports|Training gear
Onnit|onnit.com|Sports|Fitness equipment
TRX Training|trxtraining.com|Sports|Fitness equipment
Hyperice|hyperice.com|Sports|Recovery technology
Therabody|therabody.com|Sports|Recovery devices
Whoop|whoop.com|Electronics|Fitness wearable
Oura|ouraring.com|Electronics|Smart ring
Eight Sleep|eightsleep.com|Home & Art|Sleep technology
Brooklinen|brooklinen.com|Home & Art|Bedding
Parachute|parachutehome.com|Home & Art|Home textiles
Boll & Branch|bollandbranch.com|Home & Art|Bedding
Coyuchi|coyuchi.com|Home & Art|Organic bedding
Buffy|buffy.co|Home & Art|Bedding
Saatva| saatva.com|Home & Art|Mattresses
Avocado|avocadogreenmattress.com|Home & Art|Mattresses
Helix Sleep|helixsleep.com|Home & Art|Mattresses
Bear Mattress|bearsleep.com|Home & Art|Mattresses
Tuft & Needle|tuftandneedle.com|Home & Art|Mattresses
Ruggable|ruggable.com|Home & Art|Washable rugs
Tumble|tumbleliving.com|Home & Art|Washable rugs
Revival Rugs|revivalrugs.com|Home & Art|Rugs
Cold Picnic|coldpicnic.com|Home & Art|Home textiles
Minna|minna-goods.com|Home & Art|Textiles
Schoolhouse|schoolhouse.com|Home & Art|Lighting
Hawkins New York|hawkinsnewyork.com|Home & Art|Home goods
Food52|food52.com|Home & Art|Kitchen and home
Great Jones|greatjones.com|Home & Art|Cookware
Material Kitchen|materialkitchen.com|Home & Art|Kitchen tools
Misen|misen.com|Home & Art|Cookware
Made In|madeincookware.com|Home & Art|Cookware
Caraway|carawayhome.com|Home & Art|Cookware
Our Place|fromourplace.com|Home & Art|Cookware
Fellow|fellowproducts.com|Home & Art|Coffee equipment
Aarke|aarke.com|Home & Art|Kitchen appliances
Smeg|smeg.com|Home & Art|Home appliances
Simplehuman|simplehuman.com|Home & Art|Home essentials
Yamazaki Home|theyamazakihome.com|Home & Art|Home organization
Open Spaces|getopenspaces.com|Home & Art|Home organization
The Container Store|containerstore.com|Home & Art|Storage solutions
Twelve South|twelvesouth.com|Electronics|Apple accessories
Native Union|nativeunion.com|Electronics|Tech accessories
Satechi|satechi.net|Electronics|Tech accessories
Mous|mous.co|Electronics|Phone protection
Pela|pelacase.ca|Electronics|Phone accessories
Casetify|casetify.com|Electronics|Phone cases
Dbrand|dbrand.com|Electronics|Device skins
Peak Design|peakdesign.com|Electronics|Camera accessories
Bellroy|bellroy.com|Fashion|Carry goods
Ridge|ridge.com|Fashion|Wallets
Ekster|ekster.com|Fashion|Smart wallets
Craighill|craighill.co|Home & Art|Design objects
Groove Life|groovelife.com|Fashion|Rings and accessories
Shinola|shinola.com|Fashion|Watches and leather
Autodromo|autodromo.com|Fashion|Watches
Miansai|miansai.com|Jewelry|Jewelry
Vitaly|vitalydesign.com|Jewelry|Contemporary jewelry
Ana Luisa|analuisa.com|Jewelry|Jewelry
Pura Vida|puravidabracelets.com|Jewelry|Bracelets
Pura Vida|puravidabracelets.com|Jewelry|Bracelets
Rothy's|rothys.com|Fashion|Recycled footwear
Maguire Shoes|maguireshoes.com|Fashion|Footwear
Nisolo|nisolo.com|Fashion|Footwear
Thursday Boot Company|thursdayboots.com|Fashion|Footwear
Greats|greats.com|Fashion|Sneakers
Koio|koio.co|Fashion|Sneakers
CARIUMA|cariuma.com|Fashion|Sneakers
Cariuma|cariuma.com|Fashion|Footwear
Vessi|vessi.com|Fashion|Waterproof footwear
Tropicfeel|tropicfeel.com|Fashion|Travel shoes
Allbirds|allbirds.com|Fashion|Footwear
Wool&|wooland.com|Fashion|Merino clothing
Woolx|woolx.com|Fashion|Merino apparel
Icebreaker|icebreaker.com|Fashion|Merino clothing
Mack Weldon|mackweldon.com|Fashion|Menswear
MeUndies|meundies.com|Fashion|Underwear
TomBoyX|tomboyx.com|Fashion|Inclusive underwear
Parade|yourparade.com|Fashion|Underwear
Negative Underwear|negativeunderwear.com|Fashion|Underwear
CUUP|shopcuup.com|Fashion|Intimates
Lively|wearlively.com|Fashion|Intimates
ThirdLove|thirdlove.com|Fashion|Bras and underwear
Knix|knix.com|Fashion|Intimates
Soma| soma.com|Fashion|Intimates
Girlfriend Collective|girlfriend.com|Sports|Activewear
Alo Yoga|aloyoga.com|Sports|Activewear
Outdoor Voices|outdoorvoices.com|Sports|Activewear
Beyond Yoga|beyondyoga.com|Sports|Activewear
Carbon38|carbon38.com|Sports|Activewear
TALA|wearetala.com|Sports|Activewear
Sweaty Betty|sweatybetty.com|Sports|Activewear
Pangaia|thepangaia.com|Fashion|Material innovation apparel
Colorful Standard|colorfulstandard.com|Fashion|Basics
Kotn|kotn.com|Fashion|Basics
ASKET|asket.com|Fashion|Basics
Pact|wearpact.com|Fashion|Organic basics
MATE the Label|matethelabel.com|Fashion|Organic basics
Organic Basics|organicbasics.com|Fashion|Basics
Boody|boody.com|Fashion|Bamboo basics
Tentree|tentree.com|Fashion|Sustainable clothing
United By Blue|unitedbyblue.com|Fashion|Outdoor apparel
Cotopaxi|cotopaxi.com|Fashion|Outdoor gear
Ruffwear|ruffwear.com|Pets|Dog outdoor equipment
Wild One|wildone.com|Pets|Modern pet essentials
Fable Pets|fablepets.com|Pets|Pet accessories
The Foggy Dog|thefoggydog.com|Pets|Dog accessories
Maxbone|maxbone.com|Pets|Pet lifestyle
Bocce's Bakery|boccesbakery.com|Pets|Dog treats
Badlands Ranch|badlandsranch.com|Pets|Pet food
The Farmer's Dog|thefarmersdog.com|Pets|Fresh dog food
PetPlate|petplate.com|Pets|Fresh pet food
Smalls|smalls.com|Pets|Cat food
Tuft + Paw|tuftandpaw.com|Pets|Cat furniture
Litter-Robot|litter-robot.com|Pets|Pet technology
Wild One|wildone.com|Pets|Pet essentials
P.L.A.Y.|petplay.com|Pets|Pet toys
West Paw|westpaw.com|Pets|Dog toys
BarkBox|barkbox.com|Pets|Dog subscription
Fable Pets|fablepets.com|Pets|Pet essentials
Molly Mutt|mollymutt.com|Pets|Dog beds
The Honest Kitchen|thehonestkitchen.com|Pets|Pet food
Earth Rated|earthrated.com|Pets|Pet supplies
The Good Trade|thegoodtrade.com|Home & Art|Ethical home and lifestyle
Bala|shopbala.com|Sports|Fitness accessories
P.F. Candle Co.|pfcandleco.com|Home & Art|Home fragrance
Morrow Soft Goods|morrowsoftgoods.com|Home & Art|Textiles and bedding
Lunya|lunya.co|Fashion|Sleepwear and loungewear
Misen Cookware|misen.com|Home & Art|Kitchen knives and cookware
Ooni|ooni.com|Home & Art|Outdoor pizza ovens
`;
const stores:Store[] = raw.trim().split('\n').map(line=>{const [name,domain,category,note]=line.split('|');return{name:name.trim(),domain:domain.trim().replace(/^www\./,''),category:category.trim(),note:note.trim()}}).filter(x=>x.domain&&x.domain.includes('.'));
const unique=Array.from(new Map(stores.map(s=>[s.domain,s])).values());
const skills=['Shopify Store Design & Redesign','Theme Customization','Conversion Optimization','Shopify SEO','Sales Funnel Strategy','Brand Storytelling','Email Marketing Automation','Customer Retention','Pinterest Marketing','Product Page Optimization','Customer Journey Optimization','E-commerce Growth Strategy'];
function App(){ const [page,setPage]=useState<Page>(currentPage),[mobile,setMobile]=useState(false),[query,setQuery]=useState(''),[category,setCategory]=useState('All'),[shown,setShown]=useState(12),[showAllReviews,setShowAllReviews]=useState(false),[form,setForm]=useState({name:'',email:'',store:'',project:'',budget:'',message:''});
 const nav=[['about','About'],['reviews','Reviews'],['portfolio','Portfolio'],['contact','Contact']] as [Page,string][];
 const go=(p:Page)=>{const suffix=p==='reviews'?'full-reviews':p==='portfolio'?'full-portfolio':p==='about'?'':'contact';history.pushState({},'',suffix?'/'+suffix:'/');setPage(p);setMobile(false);window.scrollTo({top:0,behavior:'smooth'})};
 useEffect(()=>{const fn=()=>setPage(currentPage());addEventListener('popstate',fn);return()=>removeEventListener('popstate',fn)},[]);
 const categories=['All',...Array.from(new Set(unique.map(s=>s.category))).sort()];
 const filtered=useMemo(()=>unique.filter(s=>(category==='All'||s.category===category)&& (s.name+' '+s.domain+' '+s.note).toLowerCase().includes(query.toLowerCase())),[category,query]);
 const submit=(e:React.FormEvent)=>{e.preventDefault();const body='Hello MubashLume, I would like to discuss a project.\n\nName: '+form.name+'\nEmail: '+form.email+'\nStore URL: '+(form.store||'Not provided')+'\nProject type: '+(form.project||'Not selected')+'\nBudget: '+(form.budget||'Not selected')+'\nProject details: '+form.message;window.open('https://wa.me/13433015709?text='+encodeURIComponent(body),'_blank','noopener,noreferrer')};
 const thumb=(domain:string)=>'https://image.thum.io/get/width/480/crop/300/noanimate/https://'+domain;
 return <div className="app">
   {page==='about'?<header className="home-hero"><div className="home-hero-top"><span className="home-brand-mark"><i/> MUBASHLUME</span><span className="home-hero-note">INDEPENDENT E-COMMERCE GROWTH STRATEGY</span></div><div className="home-hero-main"><div className="home-hero-copy"><span className="home-eyebrow">STRATEGY THAT MOVES STORES FORWARD</span><h2>Make your store<br/><em>work harder.</em></h2><p>Clearer experiences. Stronger visibility. More consistent conversions.</p><div className="home-hero-actions"><button onClick={()=>go('contact')}>Start a conversation <ArrowUpRight size={16}/></button><button className="home-hero-link" onClick={()=>go('portfolio')}>Explore storefronts <ArrowRight size={16}/></button></div></div><div className="home-hero-art" aria-hidden="true"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-graphic-card"><span>GROWTH SYSTEM</span><strong>01<span>—</span>04</strong><small>DISCOVER · OPTIMISE · CONVERT</small></div><div className="hero-stamp">BUILT<br/>FOR<br/>GROWTH</div></div></div><div className="home-hero-bottom"><span>SHOPIFY · CRO · SEO · RETENTION</span><span>RESEARCH / STRATEGY / EXECUTION</span></div></header>:<header className="cover"><div className="cover-wordmark">MubashLume</div></header>}
  <section className="profile profile-reference"><div className="avatar"><img className="profile-photo" src="/resources/mubashlume-profile.png" alt="Portrait of MubashLume" width="140" height="140" loading="eager" decoding="async"/></div><div className="identity"><h1>MubashLume <BadgeCheck className="verified" size={19} fill="#1687df" color="#1687df"/></h1><div className="handle">@mubashlume</div><p className="tagline">Shopify Growth Strategist</p><div className="location"><MapPin size={15}/> Nigeria</div><div className="online"><i/> Online</div><button className="profile-contact" onClick={()=>go("contact")}><Send size={18}/> Contact me</button><p className="response-time">Average response time: 1 hour</p><div className="social-row"><a href="https://wa.me/13433015709" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17}/></a><a href="mailto:info@mubashelite.com" aria-label="Email"><Mail size={17}/></a><button onClick={()=>go("portfolio")} aria-label="Portfolio"><BriefcaseBusiness size={17}/></button><button onClick={()=>go("contact")} aria-label="Contact"><ArrowUpRight size={17}/></button></div></div></section>
  <nav className="tabs">{nav.map(([id,label])=><button className={page===id?'selected':''} key={id} onClick={()=>go(id)}>{label}</button>)}<button className="mobile-menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button></nav>
  {mobile&&<div className="mobile-links">{nav.map(([id,label])=><button key={id} onClick={()=>go(id)}>{label}<ArrowRight size={15}/></button>)}</div>}
  <main>
   {page==='about'&&<div className="content about"><section className="about-intro"><h2>About me</h2><p>Hi, I'm <strong>MubashLume</strong>, a Shopify growth strategist focused on helping eCommerce brands improve visibility, customer engagement and conversion consistency. I work across Shopify store design, optimisation and growth strategy, helping business owners create clearer shopping experiences and stronger customer journeys. <button className="read-more" onClick={()=>document.getElementById('more-about')?.classList.toggle('show')}>Read more</button></p><p id="more-about" className="more-copy">My approach connects the key parts of eCommerce growth: attracting relevant visitors, helping them understand product value, reducing friction when they are ready to buy, and building customer relationships that encourage them to return.</p></section>
    <section className="skills"><h3>Skills</h3><div className="chips">{skills.slice(0,5).map(s=><span key={s}>{s}</span>)}<button onClick={()=>document.getElementById('all-skills')?.classList.toggle('show')}>+{skills.length-5}</button></div><div id="all-skills" className="all-skills">{skills.slice(5).map(s=><span key={s}>{s}</span>)}</div></section>
    <section className="stats"><div><strong>Shopify</strong><small>Platform focus</small></div><div><strong>360°</strong><small>Growth perspective</small></div><div><strong>SEO + CRO</strong><small>Visibility & conversion</small></div><div><strong>Retention</strong><small>Customer lifecycle</small></div></section>
    <section className="credentials"><h3>Core capabilities</h3>{['Shopify Store Design & Redesign','Search Visibility & Shopify SEO','Conversion Rate Optimisation','Email Marketing & Customer Retention','Customer Journey & Growth Strategy'].map(x=><div key={x}><Medal size={15}/>{x}</div>)}</section><section className="credentials education"><h3>Working approach</h3><div><GraduationCap size={16}/> Research · Strategy · Implementation · Optimisation</div></section>
    <section className="green-cta"><h3>Have a Shopify project in mind?</h3><p>Tell me about your store and goals — let's identify the right next steps for your business.</p><button onClick={()=>go('contact')}>Start a project <ArrowUpRight size={16}/></button></section></div>}
   {page==='reviews'&&<div className="content reviews"><section className="reviews-hero"><div><span className="section-kicker">MUBASHLUME · PROJECT EXPERIENCE</span><h2>Shopify growth engagements</h2><p>Explore representative project scopes, services and indicative engagement fees across international markets.</p></div><span className="review-count">36 <small>project examples</small></span></section><div className="engagement-notice"><BadgeCheck size={18}/><span>These are illustrative service examples and indicative prices, not customer testimonials or claims of completed client work. Actual scope and fees are confirmed with each client.</span></div><div className="engagement-grid">{[{market:'United States',flag:'🇺🇸',currency:'USD',price:'$950',service:'Shopify store redesign',detail:'A complete storefront refresh covering visual hierarchy, navigation, responsive layout and product discovery.',icon:'🛍️'},{market:'United Kingdom',flag:'🇬🇧',currency:'GBP',price:'£780',service:'Conversion optimisation audit',detail:'A structured review of landing pages, product pages, cart friction and checkout journey.',icon:'📈'},{market:'Canada',flag:'🇨🇦',currency:'CAD',price:'$1,000',service:'Shopify theme customisation',detail:'Theme sections, responsive styling and brand-aligned storefront components.',icon:'🎨'},{market:'Germany',flag:'🇩🇪',currency:'EUR',price:'€890',service:'Shopify SEO foundation',detail:'Technical checks, collection structure, metadata and search-intent mapping.',icon:'🔎'},{market:'France',flag:'🇫🇷',currency:'EUR',price:'€740',service:'Product page optimisation',detail:'Product storytelling, trust elements, benefit hierarchy and clearer purchase actions.',icon:'🧩'},{market:'Australia',flag:'🇦🇺',currency:'AUD',price:'$1,000',service:'Email automation setup',detail:'Welcome, abandoned-cart and post-purchase lifecycle flow planning and setup.',icon:'✉️'},{market:'Netherlands',flag:'🇳🇱',currency:'EUR',price:'€920',service:'Store speed & UX review',detail:'Performance review, mobile usability priorities and technical improvement roadmap.',icon:'⚡'},{market:'Ireland',flag:'🇮🇪',currency:'EUR',price:'€680',service:'Shopify store audit',detail:'A commercial review of merchandising, trust, navigation and conversion opportunities.',icon:'🧭'},{market:'Spain',flag:'🇪🇸',currency:'EUR',price:'€590',service:'Collection page SEO',detail:'Collection taxonomy, internal linking and category-page content recommendations.',icon:'🗂️'},{market:'Italy',flag:'🇮🇹',currency:'EUR',price:'€850',service:'Brand-led storefront design',detail:'A cohesive visual system for a distinctive brand and consistent shopping experience.',icon:'✦'},{market:'Belgium',flag:'🇧🇪',currency:'EUR',price:'€720',service:'Customer journey strategy',detail:'Mapping key shopper touchpoints and prioritising improvements from discovery to retention.',icon:'🛤️'},{market:'Austria',flag:'🇦🇹',currency:'EUR',price:'€640',service:'Shopify technical SEO',detail:'Indexation, crawlability, structured page elements and technical SEO recommendations.',icon:'⚙️'},{market:'Portugal',flag:'🇵🇹',currency:'EUR',price:'€560',service:'Pinterest growth strategy',detail:'Organic discovery planning, boards, product-pin direction and content themes.',icon:'📌'},{market:'Finland',flag:'🇫🇮',currency:'EUR',price:'€980',service:'Retention marketing roadmap',detail:'Repeat-purchase opportunities, lifecycle segmentation and customer communication planning.',icon:'🔁'},{market:'Sweden',flag:'🇸🇪',currency:'EUR',price:'€870',service:'Shopify UX improvements',detail:'Mobile-first usability, navigation clarity and friction reduction across key templates.',icon:'📱'},{market:'Denmark',flag:'🇩🇰',currency:'EUR',price:'€760',service:'Sales funnel strategy',detail:'A funnel review connecting acquisition intent, landing-page messaging and conversion steps.',icon:'🎯'},{market:'United States',flag:'🇺🇸',currency:'USD',price:'$650',service:'Klaviyo flow planning',detail:'Lifecycle email mapping with audience triggers, messaging angles and flow priorities.',icon:'💌'},{market:'United Kingdom',flag:'🇬🇧',currency:'GBP',price:'£920',service:'Shopify migration planning',detail:'A structured migration plan covering content, product data, redirects and launch checks.',icon:'🔄'},{market:'Switzerland',flag:'🇨🇭',currency:'EUR',price:'€1,000',service:'Premium ecommerce strategy',detail:'A prioritised growth plan spanning positioning, customer experience and commercial levers.',icon:'💎'},{market:'New Zealand',flag:'🇳🇿',currency:'NZD',price:'$890',service:'Store conversion review',detail:'A practical conversion review focused on trust, product clarity and checkout readiness.',icon:'🛒'},{market:'South Africa',flag:'🇿🇦',currency:'USD',price:'$520',service:'Shopify landing page',detail:'A focused campaign landing page structure with clear messaging and conversion actions.',icon:'🖥️'},{market:'Nigeria',flag:'🇳🇬',currency:'USD',price:'$450',service:'Shopify growth consultation',detail:'A guided review of store positioning, traffic quality and priority growth opportunities.',icon:'💡'},{market:'United States',flag:'🇺🇸',currency:'USD',price:'$780',service:'Product merchandising',detail:'Collection organisation, product discovery and merchandising recommendations.',icon:'🧺'},{market:'Germany',flag:'🇩🇪',currency:'EUR',price:'€950',service:'Email marketing optimisation',detail:'Review of lifecycle messaging, segmentation and campaign opportunities.',icon:'📨'},{market:'France',flag:'🇫🇷',currency:'EUR',price:'€620',service:'Mobile storefront refinement',detail:'Responsive layout and mobile shopping improvements across high-intent pages.',icon:'📲'},{market:'Canada',flag:'🇨🇦',currency:'CAD',price:'$850',service:'Shopify analytics review',detail:'Measurement review, event tracking priorities and decision-ready reporting structure.',icon:'📊'},{market:'Australia',flag:'🇦🇺',currency:'AUD',price:'$720',service:'Pinterest catalogue strategy',detail:'Product-feed readiness, pin creative direction and organic discovery structure.',icon:'📌'},{market:'Netherlands',flag:'🇳🇱',currency:'EUR',price:'€810',service:'Trust & checkout optimisation',detail:'Trust signals, policy visibility and checkout confidence improvements.',icon:'🔐'},{market:'Ireland',flag:'🇮🇪',currency:'EUR',price:'€990',service:'Full store optimisation plan',detail:'A joined-up roadmap for storefront UX, search visibility and customer retention.',icon:'🚀'},{market:'Spain',flag:'🇪🇸',currency:'EUR',price:'€480',service:'Shopify content optimisation',detail:'Clearer category and product messaging aligned with shopper questions and intent.',icon:'✍️'},{market:'Italy',flag:'🇮🇹',currency:'EUR',price:'€930',service:'Conversion-focused redesign',detail:'A redesign brief built around product value, brand trust and easier purchase decisions.',icon:'🪄'},{market:'Belgium',flag:'🇧🇪',currency:'EUR',price:'€690',service:'Abandoned-cart recovery',detail:'Cart recovery strategy with timing, message sequence and incentive considerations.',icon:'🛍️'},{market:'Austria',flag:'🇦🇹',currency:'EUR',price:'€580',service:'Search visibility strategy',detail:'Keyword themes, collection architecture and content opportunities for organic discovery.',icon:'🌐'},{market:'Portugal',flag:'🇵🇹',currency:'EUR',price:'€880',service:'Customer retention system',detail:'Post-purchase communication and repeat-order experience planning.',icon:'🤝'},{market:'United Kingdom',flag:'🇬🇧',currency:'GBP',price:'£995',service:'Shopify growth blueprint',detail:'A prioritised commercial blueprint linking visibility, engagement and conversion consistency.',icon:'🧠'},{market:'United States',flag:'🇺🇸',currency:'USD',price:'$1,000+',service:'End-to-end growth sprint',detail:'A scoped multi-workstream engagement across store experience, SEO and lifecycle marketing.',icon:'📈'}].map((p,i)=><React.Fragment key={i}><article className="engagement-card" style={{display:i>=3&&!showAllReviews?'none':undefined}}><div className="engagement-body"><div className="reviewer-row"><div className="reviewer-avatar" style={{backgroundImage:"url(/resources/review-portraits.png)",backgroundPosition:`${(i%12)/11*100}% ${Math.floor(i/12)/2*100}%`}}/><div className="reviewer-meta"><strong>Project example {String(i+1).padStart(2,'0')}</strong><span>{p.flag} {p.market}</span></div></div><h3>{p.service}</h3><p>{p.detail}</p><div className="engagement-foot"><span>Indicative fee</span><strong>{p.price}</strong></div></div></article>{i===2&&!showAllReviews&&<button className="see-all-reviews" onClick={()=>setShowAllReviews(true)}>See all reviews <ArrowRight size={16}/></button>}</React.Fragment>)}</div><section className="review-bottom-cta"><h3>Need a similar Shopify growth engagement?</h3><p>Share your store and goals to discuss scope, timing and a tailored proposal.</p><button onClick={()=>go('contact')}>Discuss your project <ArrowUpRight size={16}/></button></section></div>}
   {page==='portfolio'&&<div className="content portfolio"><div className="portfolio-heading"><div><h2>Selected Storefronts</h2><p>Browse a curated collection of 300+ public eCommerce storefronts across product categories. Each card includes a visual homepage preview and a direct link to the brand's website.</p></div><span className="count-pill">{unique.length} STORES</span></div>
    <div className="gallery-controls"><label className="search-box"><Search size={17}/><input value={query} onChange={e=>{setQuery(e.target.value);setShown(12)}} placeholder="Search store, product or niche..."/></label><div className="result-count">Showing {Math.min(shown,filtered.length)} of {filtered.length} stores</div></div>
    <div className="category-filters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>{setCategory(c);setShown(12)}}>{c}</button>)}</div>
    <div className="store-grid">{filtered.slice(0,shown).map((s,i)=><article className="store-card" key={s.domain}><a className="store-image" href={'https://'+s.domain} target="_blank" rel="noreferrer" aria-label={'Visit '+s.name}><img loading="lazy" decoding="async" src={thumb(s.domain)} alt={s.name+' homepage preview'} onError={e=>{(e.currentTarget as HTMLImageElement).style.display='none'}}/><span className="image-overlay">Open live store <ExternalLink size={14}/></span></a><div className="store-info"><div className="store-topline"><span>{s.category}</span><span>#{String(unique.findIndex(x=>x.domain===s.domain)+1).padStart(3,'0')}</span></div><h3>{s.name}</h3><p>{s.note}</p><div className="store-actions"><a href={'https://'+s.domain} target="_blank" rel="noreferrer">Visit website <ArrowUpRight size={15}/></a><button onClick={()=>{navigator.clipboard?.writeText('https://'+s.domain)}} title="Copy store URL">Copy link</button></div></div></article>)}</div>
    {filtered.length===0&&<div className="empty-results">No stores match that search. Try another keyword or category.</div>}
    {shown<filtered.length&&<button className="load-more" onClick={()=>setShown(v=>Math.min(v+12,filtered.length))}>Load more stores <ArrowRight size={16}/></button>}
    <div className="gallery-footnote">A curated storefront showcase for browsing brand presentation, product merchandising and eCommerce experiences. Open any brand's website to explore its current storefront.</div>
   </div>}
   {page==='contact'&&<div className="content contact"><section className="contact-intro"><span className="section-kicker">LET'S BUILD SOMETHING BETTER</span><h2>Tell me about your project</h2><p>Share a little about your store, what you want to improve and where you want to go next. I'll review your enquiry and get back to you.</p></section><div className="contact-layout"><section className="contact-form-card"><h3>Project enquiry</h3><form onSubmit={submit}><label>Your name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label><label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@brand.com"/></label><label>Store URL <span className="optional-label">Optional</span><input value={form.store} onChange={e=>setForm({...form,store:e.target.value})} placeholder="https://yourstore.com"/></label><label>Project type<select required value={form.project} onChange={e=>setForm({...form,project:e.target.value})}><option value="">Select a project type</option>{['Shopify store design or redesign','Shopify SEO & search visibility','Conversion rate optimisation','Email marketing & automation','Pinterest marketing','Growth strategy & store audit','Other'].map(x=><option key={x}>{x}</option>)}</select></label><label>Estimated budget <span className="optional-label">Optional</span><select value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}><option value="">Select a budget range</option>{['Under $500','$500–$1,000','$1,000–$2,500','$2,500–$5,000','$5,000+','Prefer to discuss'].map(x=><option key={x}>{x}</option>)}</select></label><label>Project details<textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell me about your store, your goals and what you would like help with..."/></label><button type="submit"><MessageCircle size={17}/> Send via WhatsApp <ArrowUpRight size={15}/></button><small className="form-note">Your message will open in WhatsApp so you can review and send it directly.</small></form></section><aside className="contact-sidebar"><section className="availability-card"><span className="availability-dot"/> <strong>Available for new projects</strong><p>Taking enquiries for upcoming Shopify and eCommerce growth projects.</p></section><section className="contact-detail-card"><h3>Direct contact</h3><a href="https://wa.me/13433015709" target="_blank" rel="noreferrer"><MessageCircle size={18}/><span><small>WhatsApp</small>+1 343 301 5709</span><ArrowUpRight size={15}/></a><a href="mailto:info@mubashelite.com"><Mail size={18}/><span><small>Email</small>info@mubashelite.com</span><ArrowUpRight size={15}/></a><div className="contact-detail-static"><MapPin size={18}/><span><small>Location</small>Nigeria · Working worldwide</span></div><div className="contact-detail-static"><Clock size={18}/><span><small>Response time</small>Usually within one business day</span></div></section><section className="contact-note-card"><h3>What happens next?</h3><ol><li>Send your project details.</li><li>I'll review your goals and current store.</li><li>We'll discuss a practical next step.</li></ol></section></aside></div></div>}
  </main>
  <div className="contact-bottom"><button onClick={()=>go('contact')}><Send size={17}/> Contact me</button><span>Let's discuss your Shopify project</span></div><footer>© 2026 MubashLume. All rights reserved.<small>Shopify Growth Strategy · E-commerce</small></footer>
 </div>
}
export default App;