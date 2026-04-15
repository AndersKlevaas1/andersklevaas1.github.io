/*************************************************
 * 🎯 SPØRSMÅLSDATA (MED VANSKELIGHETSGRADER)
 *************************************************/

console.log("✅ script.js lastet!");

// Gjeldende vanskelighetsgrad
let currentDifficulty = "ez";
const BADGE_STORAGE_KEY = "code-island-badges";
const badgeIslands = [
  { key: "variable", label: "Variabel", img: "img/Badge1.png" },
  { key: "datatype", label: "Datatype", img: "img/Badge2.png" },
  { key: "object",   label: "Objekt",   img: "img/Badge3.png" },
  { key: "logic",    label: "Logikk",   img: "img/Badge4.png" },
  { key: "loop",     label: "Løkke",    img: "img/Badge5.png" },
  { key: "debug",    label: "Debug",    img: "img/Badge6.png" }
];
let players = loadPlayers();

const questions = {
  variable: {
    ez: [
      { question: "Hva er en variabel?", answers: ["En beholder for data", "En feilmelding i koden", "En plass på nettet"], correct: 0 },
      { question: "Hva skjer hvis du endrer verdien i en variabel?", answers: ["Den erstattes", "Begge lagres", "Den blir slettet"], correct: 0 },
      { question: "Må en variabel ha et navn?", answers: ["Ja", "Nei, automatisk", "Bare for tekst"], correct: 0 },
      { question: "Hva er poenget med variabler?", answers: ["Fleksibel kode", "Raskere kjøring", "Mindre minne"], correct: 0 },
      { question: "Hva kalles det når variabelen får en verdi?", answers: ["Tildeling", "Erklæring", "Konvertering"], correct: 0 },
      { question: "Kan en variabel inneholde både tall og tekst?", answers: ["Ja, alt", "Nei, tall kun", "Nei, tekst kun"], correct: 0 },
      { question: "Hvis `navn = 'Ole'`, hva inneholder den?", answers: ["'Ole'", "Nummer 1", "En liste"], correct: 0 },
      { question: "Kan du bruke samme variabel flere ganger?", answers: ["Ja", "Nei", "Kun når tom"], correct: 0 },
      { question: "Hva skjer hvis du bruker en variabel uten verdi?", answers: ["Undefined", "Ingenting", "Verdien 0"], correct: 0 },
      { question: "Hvorfor variabler når tallet brukes flere steder?", answers: ["Enklere å endre", "Bruker mindre minne", "Gir ingen fordel"], correct: 0 },
      { question: "Kan du kalle en variabel 'var'?", answers: ["Det er reservert", "Bare med hermetegn", "Ja, helt vanlig"], correct: 0 },
      { question: "Hva gjør variabelen lettere å forstå?", answers: ["Beskrivende navn", "Korte kryptiske navn", "Mange tall i navnet"], correct: 0 },
      { question: "Hvis `x = 5; x = x + 3`, hva er x?", answers: ["8", "5", "3"], correct: 0 },
      { question: "Kan du tilordne en variabel til en annen?", answers: ["Ja", "Nei", "Kun samme navn"], correct: 0 },
      { question: "Hva kalles en variabel som ikke endres?", answers: ["Konstant", "Funksjon", "Løkke"], correct: 0 },
      { question: "Er variabelnavn case-sensitiv?", answers: ["Ja", "Nei", "Kun tall"], correct: 0 },
      { question: "Hva betyr å deklarere en variabel?", answers: ["Erklære den", "Gi den verdi", "Bruke den"], correct: 0 },
      { question: "Kan variabelnavn ha mellomrom?", answers: ["Nei", "Ja", "Kun sist"], correct: 0 },
      { question: "Hvis `x = 10`, hva inneholder x?", answers: ["Tallet 10", "Teksten '10'", "Ingenting"], correct: 0 },
      { question: "Norske bokstaver i variabelnavn?", answers: ["Ikke anbefalt", "Helt vanlig", "Bare vokaler"], correct: 0 }
    ],
    med: [
      { question: "Hva blir verdien av x etter `let x = 5; x = x * 2; x += 3`?", answers: ["13", "15", "10"], correct: 0 },
      { question: "Hva er den viktigste forskjellen mellom `let` og `const`?", answers: ["const kan ikke endres etter tildeling", "let lever kun i det globale scopet", "const er en funksjon, let er variabel"], correct: 0 },
      { question: "Kan du redeklare en variabel som er deklarert med `let`?", answers: ["Nei", "Ja", "Bare to ganger"], correct: 0 },
      { question: "Hva er scope i JavaScript?", answers: ["Området der en variabel er tilgjengelig", "Et tall som angir størrelsen på minnet", "Standardverdien en variabel får ved start"], correct: 0 },
      { question: "Hva skrives ut når `var x = 1; { var x = 2; } console.log(x)` kjøres?", answers: ["2", "1", "Feil"], correct: 0 },
      { question: "Hvordan fungerer hoisting for `let` og `var`?", answers: ["Begge hoistes, men let er i Temporal Dead Zone", "Kun var hoistes, let blir helt ignorert", "Begge hoistes og initialiseres til undefined"], correct: 0 },
      { question: "Hva er en global variabel?", answers: ["En variabel tilgjengelig overalt i programmet", "En variabel som kun lever inne i en blokk", "En variabel som lagres utenfor nettleseren"], correct: 0 },
      { question: "Kan du bruke en variabel før den er deklarert?", answers: ["Det avhenger av var, let eller const", "Ja, dette fungerer alltid helt fint", "Nei, aldri under noen omstendigheter"], correct: 0 },
      { question: "Hva blir resultatet av `let x; x += 5`?", answers: ["NaN", "5", "0"], correct: 0 },
      { question: "Hvilke tegn bruker template literals i JavaScript?", answers: ["Backticks", "Enkelt-fnutt", "Dobbelt-fnutt"], correct: 0 },
      { question: "Hva blir verdien av b etter `let a = b = 5`?", answers: ["b blir en global variabel med verdi 5", "b beholder sin opprinnelige verdi uendret", "Koden gir umiddelbart en syntaks-feil"], correct: 0 }
    ],
    hard: [
      { question: "Hva er closures i JavaScript?", answers: ["Funksjoner som husker variabler fra omsluttende scope", "Funksjoner som lukkes automatisk etter at de er ferdig", "Objekter som fryses og ikke kan endres etter opprettelse"], correct: 0 },
      { question: "Når oppstår Temporal Dead Zone?", answers: ["Når let eller const brukes før de er deklarert", "Når en funksjon kalles før den er definert", "Når variabler med samme navn kolliderer i scope"], correct: 0 },
      { question: "Hva er variable shadowing?", answers: ["Når en ny variabel skjuler en variabel fra ytre scope", "Når variabler automatisk kopieres mellom funksjoner", "Når en variabel får flere verdier samtidig i minnet"], correct: 0 },
      { question: "Hva printes av `var x = 1; function f() { var x = 2; } f(); console.log(x)`?", answers: ["1", "2", "Feil"], correct: 0 },
      { question: "Hvordan påvirker strict mode håndteringen av variabler?", answers: ["Udeklarerte variabler gir en ReferenceError-feil", "All kode må skrives som en global funksjon", "Variabler kan ikke lenger være null eller tomme"], correct: 0 },
      { question: "Hva er en vanlig årsak til memory leak?", answers: ["Globale variabler som ikke blir ryddet opp", "For mange const-variabler i en funksjon", "Bruk av let-variabler utenfor løkke-blokker"], correct: 0 },
      { question: "Hva er hovedforskjellen mellom WeakMap og Map?", answers: ["WeakMap tillater kun objekt-nøkler og er ikke enumerabel", "WeakMap kan kun inneholde primitive verdier som nøkler", "WeakMap er en alfabetisk sortert versjon av en Map"], correct: 0 },
      { question: "Hva gjør Object.freeze() med et objekt?", answers: ["Gjør objektet immutable - kan ikke endres", "Sletter alle referanser til objektet fra minnet", "Konverterer objektet til en JSON-tekst automatisk"], correct: 0 },
      { question: "Hva blir x etter `let x = 5; x = x++;`?", answers: ["5", "6", "7"], correct: 0 }
    ]
  },

  datatype: {
    ez: [
      { question: "Hva er en datatype?", answers: ["Verdi-kategori", "Kode-kategori", "Feil-kategori"], correct: 0 },
      { question: "Hva er forskjellen mellom 5 og '5'?", answers: ["Tall vs tekst", "Ingen forskjell", "'5' er større"], correct: 0 },
      { question: "Hva er String?", answers: ["Tekst", "Tall", "Liste"], correct: 0 },
      { question: "Hva kalles sann/usann?", answers: ["Boolean", "True-False", "Logikk"], correct: 0 },
      { question: "`tall = '123'` - type?", answers: ["String", "Number", "Ukjent"], correct: 0 },
      { question: "Hva blir 5 + '5'?", answers: ["Sammenslåing", "Tallet 10", "En syntaks-feil"], correct: 0 },
      { question: "Hva er Array?", answers: ["Liste", "Tall", "Tekst"], correct: 0 },
      { question: "Hvordan sjekker man type?", answers: ["typeof", "getType()", "isType()"], correct: 0 },
      { question: "Hva er Number?", answers: ["Tall", "Hele tall", "Desimal"], correct: 0 },
      { question: "Å endre type heter?", answers: ["Konvertering", "Type-endring", "Type-bytte"], correct: 0 },
      { question: "Er null en type?", answers: ["Ja", "Nei", "Kun noen"], correct: 0 },
      { question: "parseInt('123.45') gir?", answers: ["123", "123.45", "Feil"], correct: 0 },
      { question: "Hva er undefined?", answers: ["Ingen verdi", "Tomt objekt", "En feil"], correct: 0 },
      { question: "Kan en String inneholde tall?", answers: ["Ja", "Nei", "Ett siffer"], correct: 0 },
      { question: "Hva er Object?", answers: ["Egenskaper", "Enkelt verdi", "En feiltype"], correct: 0 },
      { question: "`x = true` er type?", answers: ["Boolean", "String", "Number"], correct: 0 },
      { question: "Hva blir 'hello' + 'world'?", answers: ["'helloworld'", "Krasjer koden", "Returnerer 0"], correct: 0 },
      { question: "Hva er NaN?", answers: ["Ugyldig tall", "Et tomt tall", "Tomt objekt"], correct: 0 },
      { question: "Kan du gange en streng med et tall?", answers: ["Ja, resultatet varierer", "Nei, gir alltid feil", "Ja, gir alltid null"], correct: 0 },
      { question: "Hvorfor kjenne typer?", answers: ["Unngå feil", "Ikke viktig", "Bare pynt"], correct: 0 }
    ],
    med: [
      { question: "Hva blir resultatet av `typeof typeof 42`?", answers: ["'string'", "'number'", "42"], correct: 0 },
      { question: "Hva er Symbol-datatypen brukt til?", answers: ["Å opprette unike identifikatorer", "Å holde styr på typer i minnet", "En måte å lagre JSON-objekter"], correct: 0 },
      { question: "Når brukes BigInt datatype?", answers: ["For å håndtere veldig store hele tall", "For å representere svært små desimaler", "For å lagre binære tall i hex-format"], correct: 0 },
      { question: "Hva blir resultatet av `'123' == 123`?", answers: ["true, fordi == konverterer typer", "false, typene er helt forskjellige", "TypeError fordi JS ikke godtar dette"], correct: 0 },
      { question: "Hva blir resultatet av `'123' === 123`?", answers: ["false, === krever samme type og verdi", "true, JS konverterer typer automatisk", "TypeError grunnet ulike datatyper"], correct: 0 },
      { question: "Hva er forskjellen mellom Number.isNaN() og isNaN()?", answers: ["Number.isNaN() sjekker kun om verdien er NaN", "De er helt identiske og kan byttes ut fritt", "isNaN() konverterer verdien til tall først"], correct: 0 },
      { question: "Hva blir resultatet av `null === undefined`?", answers: ["false", "true", "error"], correct: 0 },
      { question: "Hva returnerer `typeof null`?", answers: ["'object' - en kjent bug i JavaScript", "'null' - returnerer alltid typen null", "TypeError - null kan ikke sjekkes"], correct: 0 },
      { question: "Hva blir resultatet av `Array.isArray([])`?", answers: ["true", "false", "error"], correct: 0 },
      { question: "Hva er implicit type coercion?", answers: ["Automatisk konvertering av typer i JS", "En manuell måte å skrive om datatyper", "En funksjon som bare finnes i TypeScript"], correct: 0 }
    ],
    hard: [
      { question: "Hva returnerer `typeof Symbol('x')`?", answers: ["'symbol'", "'object'", "error"], correct: 0 },
      { question: "Hva er verdien av Number.MAX_SAFE_INTEGER?", answers: ["2^53 - 1", "2^32 - 1", "2^64 - 1"], correct: 0 },
      { question: "Er `0.1 + 0.2 === 0.3` true eller false?", answers: ["false, pga IEEE 754 flyttall-aritmetikk", "true, JavaScript håndterer dette presist", "SyntaxError, kan ikke sammenligne slik"], correct: 0 },
      { question: "Hva kan Object.prototype.toString.call() brukes til?", answers: ["Å finne den eksakte typen av hvilken som helst verdi", "Å konvertere en verdi mellom ulike datatyper", "Å sjekke om to variabler har samme datatype"], correct: 0 },
      { question: "Hva betyr boxed primitives?", answers: ["Primitive verdier som pakkes inn som objekt-versjoner", "Tall som lagres i bokser for rask minnetilgang", "En type klassedefinisjon for store datamengder"], correct: 0 },
      { question: "Hva kjennetegner array-like objekter?", answers: ["De har length-property og numeriske indekser", "De har innebygde metoder som push og pop", "De er eksakte kopier av vanlige array-objekter"], correct: 0 }
    ]
  },

  object: {
    ez: [
      { question: "Hva er et objekt?", answers: ["Egenskaper og verdier", "Samme som en variabel", "Samme som en funksjon"], correct: 0 },
      { question: "Hva er `{ navn: 'Ole' }`?", answers: ["Et objekt", "En array", "En string"], correct: 0 },
      { question: "Hva er en key?", answers: ["En nøkkel", "En verdi", "En feil"], correct: 0 },
      { question: "Hvordan får man tilgang til en property?", answers: ["obj.prop", "obj->prop", "obj#prop"], correct: 0 },
      { question: "Kan et objekt ha funksjoner?", answers: ["Ja, kalt metoder", "Nei, aldri", "Kun enkle typer"], correct: 0 },
      { question: "Hva er fordelen med objekter?", answers: ["Organisert data", "Raskere kjøring", "Bruker mindre minne"], correct: 0 },
      { question: "Hvordan henter du ut en egenskap fra et objekt?", answers: ["Med punktum, f.eks. person.navn", "Med pil, f.eks. person->navn", "Med kolon, f.eks. person:navn"], correct: 0 },
      { question: "Kan man endre en egenskap?", answers: ["Ja", "Nei, låst", "Kun tall"], correct: 0 },
      { question: "Hva heter det når objekter ligger i objekter?", answers: ["Nesting", "Stacking", "Linking"], correct: 0 },
      { question: "Hva er en array av objekter?", answers: ["En liste med objekter", "Et objekt med lister", "En type funksjon"], correct: 0 },
      { question: "Hvordan legger du til en egenskap?", answers: ["obj.prop = verdi", "obj.add(prop)", "Det er umulig"], correct: 0 },
      { question: "Hva er JSON?", answers: ["Dataformat", "Objekt-type", "En liste"], correct: 0 },
      { question: "Kan et objekt ha null som verdi?", answers: ["Ja", "Nei, feil", "Kun tomt"], correct: 0 },
      { question: "Hvorfor modellere virkeligheten med objekter?", answers: ["Det blir enklere å forstå", "Det gjør koden raskere", "Det sparer mye minne"], correct: 0 },
      { question: "Hvordan itererer man over et objekt?", answers: ["for...in løkke", "Helt umulig", "Kun manuelt"], correct: 0 },
      { question: "En funksjon inne i et objekt heter?", answers: ["Metode", "Property", "Constructor"], correct: 0 },
      { question: "Hva er `start()` inne i et objekt?", answers: ["En metode", "En egenskap", "En variabel"], correct: 0 },
      { question: "Hvordan ser et tomt objekt ut?", answers: ["{}", "empty", "null"], correct: 0 },
      { question: "Kan objekter inneholde boolske verdier?", answers: ["Ja", "Kun tekst", "Kun tall"], correct: 0 },
      { question: "Hva er best med objekter?", answers: ["Lesbart", "Raskere", "Mindre"], correct: 0 }
    ],
    med: [
      { question: "Hva refererer `this` til når det brukes inne i en objektmetode?", answers: ["Til selve objektet", "Til window-objektet", "Til undefined"], correct: 0 },
      { question: "Hva returnerer Object.keys() fra et objekt?", answers: ["En array med alle nøklene i objektet", "En array med alle verdiene i objektet", "Et nytt objekt som er en eksakt kopi"], correct: 0 },
      { question: "Hvorfor Object.keys() fremfor for...in ved iterasjon?", answers: ["Object.keys() hopper over arvede properties", "for...in returnerer alltid tall i stedet", "De er helt identiske i alle situasjoner"], correct: 0 },
      { question: "Hva er prototypal inheritance i JavaScript?", answers: ["Objekter arver egenskaper via prototype-kjeden", "Klassisk klassebasert arv som i språket Java", "Arv som kun fungerer med moderne ES6-klasser"], correct: 0 },
      { question: "Hva gjør Object.create()?", answers: ["Lager et nytt objekt med spesifikk prototype", "Kopierer et eksisterende objekt byte for byte", "Konverterer et objekt til en klasse-instans"], correct: 0 },
      { question: "Hva er getter og setter i JavaScript?", answers: ["Metoder som kjører logikk ved property-tilgang", "Helt vanlige metoder på et objekt i JavaScript", "En funksjon som returnerer objektets nøkler"], correct: 0 },
      { question: "Hva er computed property names?", answers: ["Property-navn som beregnes dynamisk ved runtime", "Property-navn som alltid må være heltall-verdier", "En type funksjon som ligger inne i et objekt"], correct: 0 },
      { question: "Hva gjør Object.assign()?", answers: ["Kopierer properties fra ett objekt til et annet", "Sletter alle properties i et objekt permanent", "Endrer datatypen til hele objektet på en gang"], correct: 0 }
    ],
    hard: [
      { question: "Hva tillater Object.defineProperty() deg å gjøre?", answers: ["Definere properties med detaljert kontroll over attributter", "Legge til properties uten å overskrive eksisterende verdier", "Slette alle properties som ikke har blitt brukt på en stund"], correct: 0 },
      { question: "Hvilke attributter har property descriptors?", answers: ["value, writable, enumerable, configurable", "type, name, scope, accessibility, memory", "readable, writeable, deletable, renamable"], correct: 0 },
      { question: "Hva er Proxy-objekter i JavaScript?", answers: ["Objekter som fanger opp operasjoner på et mål-objekt", "En eksakt kopi av et objekt som kan modifiseres fritt", "En konstant versjon av et objekt som ikke kan endres"], correct: 0 },
      { question: "Hva brukes Reflect API til?", answers: ["Metaprogrammering - operasjoner på objekter", "Å sette breakpoints for debugging av kode", "Å kjøre automatiserte tester mot funksjoner"], correct: 0 },
      { question: "Hva betyr det at et objekt er frozen?", answers: ["Objektet kan ikke endres eller utvides mer", "Objektet er kun lesbart men kan fremdeles utvides", "Objektet er slettet og finnes ikke lenger i minnet"], correct: 0 }
    ]
  },

  logic: {
    ez: [
      { question: "Hva er logikk i kode?", answers: ["Regler for hva som skjer", "En type feilmelding-kode", "En måte å lagre data på"], correct: 0 },
      { question: "Hva gjør if?", answers: ["Kjør kode hvis noe er sant", "Gjentar kode i en løkke", "Lagrer data i en variabel"], correct: 0 },
      { question: "Hva er else?", answers: ["Kjør hvis if ikke er sant", "Lager en løkke i koden", "Oppretter en variabel"], correct: 0 },
      { question: "Hva er en betingelse?", answers: ["Noe som er sant eller usant", "En type funksjon i kode", "En liste med verdier"], correct: 0 },
      { question: "Kan kode kjøre bare noen ganger?", answers: ["Ja, med if", "Nei, alltid", "Kun i løkker"], correct: 0 },
      { question: "Hva betyr 'hvis' i kode?", answers: ["Sjekk om noe er sant", "Gjenta koden i løkke", "Stopp hele programmet"], correct: 0 },
      { question: "Er if nyttig?", answers: ["Ja, for valg", "Nei, aldri", "Kun for tall"], correct: 0 },
      { question: "Kan else brukes alene?", answers: ["Nei, trenger if", "Ja, fungerer fint", "Kun noen ganger"], correct: 0 },
      { question: "Hva skjer hvis betingelsen er usann?", answers: ["Else kjøres", "If kjøres", "Ingenting"], correct: 0 },
      { question: "Er logikk viktig i programmering?", answers: ["Ja", "Nei", "Kun for eksperter"], correct: 0 },
      { question: "Kan vi ha flere if-setninger?", answers: ["Ja", "Nei", "Kun én"], correct: 0 },
      { question: "Hva er et valg i kode?", answers: ["If eller else", "En type løkke", "En variabel"], correct: 0 },
      { question: "Er betingelser enkle?", answers: ["Ja", "Nei", "Kun komplekse"], correct: 0 },
      { question: "Kan kode ta beslutninger?", answers: ["Ja, med logikk", "Nei, aldri", "Kun mennesker"], correct: 0 },
      { question: "Hva gjør 'ellers'?", answers: ["Kjør alternativ kode", "Gjenta hele løkken", "Stopp programmet helt"], correct: 0 },
      { question: "Er if som et spørsmål?", answers: ["Ja", "Nei", "Kun svar"], correct: 0 },
      { question: "Kan logikk gjøre kode smartere?", answers: ["Ja", "Nei", "Kun tregere"], correct: 0 },
      { question: "Hva er grunnen til å bruke if?", answers: ["For å velge hva som skjer", "For å lagre data i minnet", "For å telle hvor mange ganger"], correct: 0 },
      { question: "Er else nødvendig?", answers: ["Nei, valgfritt", "Ja alltid", "Kun i løkker"], correct: 0 },
      { question: "Kan betingelser være enkle?", answers: ["Ja, som sant/usant", "Nei, aldri enkle", "Kun med tall"], correct: 0 }
    ],
    med: [
      { question: "Hva er switch statement brukt til?", answers: ["Å velge mellom alternativer basert på verdi", "Å gjenta samme kode flere ganger etter hverandre", "Å samle flere verdier i én array eller liste"], correct: 0 },
      { question: "Hva er syntaksen for ternary operator?", answers: ["condition ? valueIfTrue : valueIfFalse", "if (condition) { true } else { false }", "condition && valueIfTrue || valueIfFalse"], correct: 0 },
      { question: "Hva gjør && (AND) operatoren?", answers: ["Returnerer true bare hvis begge er sanne", "Returnerer true hvis minst én er sann", "Snur verdien fra sann til usann"], correct: 0 },
      { question: "Hva gjør || (OR) operatoren?", answers: ["Returnerer true hvis minst én er sann", "Returnerer true kun hvis begge er sanne", "Snur betingelsen fra sann til usann"], correct: 0 },
      { question: "Hva gjør ! (NOT) operatoren?", answers: ["Snur en betingelse (true blir false)", "Utfører AND på to verdier samtidig", "Utfører OR på to verdier samtidig"], correct: 0 },
      { question: "Hva sjekker `if (x > 5 && x < 10)`?", answers: ["At x er mellom 5 og 10 (eksklusive)", "At x er nøyaktig 5 eller eksakt 10", "At x er større enn 15 og mindre enn 20"], correct: 0 },
      { question: "Hva sjekker `if (x === 5 || y === 10)`?", answers: ["At minst én av dem er sann", "At begge må være sanne samtidig", "At ingen av dem er sanne"], correct: 0 },
      { question: "Hvilke verdier er falsy i JavaScript?", answers: ["0, '', null, undefined, NaN, false", "Kun null og undefined er falsy", "Alle tomme strenger og alle tall"], correct: 0 },
      { question: "Hva gjør `default` i en switch statement?", answers: ["Fungerer som fallback når ingen cases matcher", "Brukes alltid som den første casen i switch", "Brukes alltid som den siste casen i switch"], correct: 0 }
    ],
    hard: [
      { question: "Hva betyr short-circuit evaluation?", answers: ["Evaluering stopper når resultatet er avgjort", "Alle deler blir alltid evaluert fullstendig", "Operatorene sjekker typene før evaluering"], correct: 0 },
      { question: "Hva gjør nullish coalescing operatoren (??)?", answers: ["Returnerer høyresiden hvis venstre er null/undefined", "Returnerer høyresiden for alle falsy verdier som 0", "Fungerer akkurat som en vanlig OR-operator"], correct: 0 },
      { question: "Hva brukes optional chaining (?.) til?", answers: ["Trygg tilgang til props på objekter som kan være null", "Filtrering av elementer fra array basert på en test", "Laging av en dyp kopi av et objekt og all dets data"], correct: 0 },
      { question: "Hva sier De Morgan's Laws?", answers: ["!(a && b) === !a || !b og !(a || b) === !a && !b", "a && b er alltid lik a || b i all boolsk logikk", "Regler for hvordan matematiske uttrykk evalueres"], correct: 0 }
    ]
  },

  loop: {
    ez: [
      { question: "Hva er en løkke?", answers: ["Gjenta kode flere ganger", "En type spesiell variabel", "En type betingelse-setning"], correct: 0 },
      { question: "Hvorfor bruker vi løkker?", answers: ["For å unngå å skrive samme kode mange ganger", "For å lagre store mengder data på en effektiv måte", "For å stoppe programmet på et spesifikt tidspunkt"], correct: 0 },
      { question: "Hva gjør en for-løkke?", answers: ["Gjenta et visst antall ganger", "Gjenta mens noe er sant hele tiden", "Lagre informasjon til senere bruk"], correct: 0 },
      { question: "Hva gjør en while-løkke?", answers: ["Gjenta mens en betingelse er sann", "Gjenta nøyaktig et antall ganger", "Opprette en ny variabel i minnet"], correct: 0 },
      { question: "Kan løkker hjelpe med telling?", answers: ["Ja", "Nei", "Kun for tekst"], correct: 0 },
      { question: "Er løkker nyttige?", answers: ["Ja, for repetisjon", "Nei, aldri nyttige", "Kun for eksperter"], correct: 0 },
      { question: "Hva skjer hvis løkken stopper?", answers: ["Koden fortsetter videre etterpå", "Hele programmet stopper helt", "Løkken starter helt fra starten"], correct: 0 },
      { question: "Kan løkker brukes i spill?", answers: ["Ja", "Nei", "Kun i matte"], correct: 0 },
      { question: "Er løkker en del av programmering?", answers: ["Ja", "Nei", "Kun i avansert kode"], correct: 0 },
      { question: "Kan løkker gjøre kode kortere?", answers: ["Ja", "Nei", "Gjør lengre"], correct: 0 },
      { question: "Hva er en enkel løkke?", answers: ["Gjenta noen ganger", "En kodefeil i løkke", "En type betingelse"], correct: 0 },
      { question: "Brukes løkker ofte?", answers: ["Ja", "Nei", "Kun av og til"], correct: 0 },
      { question: "Kan løkker telle ned?", answers: ["Ja", "Nei", "Kun opp"], correct: 0 },
      { question: "Hva er fordel med løkker?", answers: ["Mindre arbeid", "Lager flere feil", "Tregere kjøring"], correct: 0 },
      { question: "Er løkker vanskelige?", answers: ["Nei", "Ja", "Kun for barn"], correct: 0 },
      { question: "Kan løkker brukes på lister?", answers: ["Ja", "Nei", "Kun på tall"], correct: 0 },
      { question: "Hva gjør 'gjenta' i løkker?", answers: ["Kjør kode på nytt", "Stopp programmet", "Start hele appen"], correct: 0 },
      { question: "Er løkker som en sykkel?", answers: ["Ja, runde etter runde", "Nei, det gir lite mening", "Kun for svært enkle spill"], correct: 0 },
      { question: "Kan løkker stoppe tidlig?", answers: ["Ja", "Nei", "Alltid ferdig"], correct: 0 },
      { question: "Er løkker grunnleggende?", answers: ["Ja", "Nei", "Kun avansert"], correct: 0 }
    ],
    med: [
      { question: "Hvordan skiller do...while seg fra while?", answers: ["Kjører kroppen minst én gang før sjekk", "Fungerer akkurat likt som vanlig while", "Fungerer akkurat likt som en for-løkke"], correct: 0 },
      { question: "Hva gjør break statement inne i en løkke?", answers: ["Avslutter løkken umiddelbart", "Hopper over ett steg og fortsetter", "Pauserer løkken midlertidig et øyeblikk"], correct: 0 },
      { question: "Hva gjør continue statement inne i en løkke?", answers: ["Hopper til neste iterasjon i løkken", "Avslutter løkken med én gang", "Pauserer løkken i noen sekunder"], correct: 0 },
      { question: "I `for (let i = 0; i < 5; i++)`, hva gjør i++?", answers: ["Øker verdien av i med 1 for hver runde", "Setter variabelen i til verdien 1 alltid", "Reduserer i med 1 for hver runde i løkken"], correct: 0 },
      { question: "Hva er nested loops?", answers: ["En løkke som ligger inne i en annen løkke", "To løkker som kjører parallelt samtidig", "Flere løkker som kjører etter hverandre i rekke"], correct: 0 },
      { question: "Hva brukes forEach() til?", answers: ["Å iterere gjennom hvert element i en array", "Å iterere gjennom hver bokstav i en streng", "Å iterere gjennom alle tall fra 0 til 100"], correct: 0 },
      { question: "Hva returnerer map()?", answers: ["En ny array med transformerte verdier", "Den opprinnelige arrayen modifisert direkte", "En boolean som sier om alle tester passerte"], correct: 0 },
      { question: "Hva returnerer filter()?", answers: ["En ny array med elementer som passerer testen", "Den opprinnelige arrayen modifisert direkte i minnet", "Et tall som representerer antall treffende elementer"], correct: 0 }
    ],
    hard: [
      { question: "Hva er generator functions?", answers: ["Funksjoner som kan pauseres og gjenopptas med yield", "Helt vanlige funksjoner uten noen spesielle egenskaper", "En type løkke som gir ut verdier i en sekvens"], correct: 0 },
      { question: "Hvor brukes yield keyword?", answers: ["I generator-funksjoner for å pause og returnere verdier", "I vanlige for- og while-løkker for rask iterasjon", "I klassedefinisjoner for å definere nye metoder"], correct: 0 },
      { question: "Hva gjør reduce() metode på en array?", answers: ["Samler array-elementer til én enkelt sluttverdi", "Fjerner elementer som ikke oppfyller en betingelse", "Sorterer array-elementer i stigende rekkefølge"], correct: 0 },
      { question: "Hvilken løkke er generelt raskest i JavaScript?", answers: ["Vanlig for-løkke", "forEach-metoden", "map-metoden"], correct: 0 },
      { question: "Hva er en infinite loop?", answers: ["En løkke som aldri ender og fryser programmet", "En svært effektiv løkke optimalisert for ytelse", "En veldig kort løkke som kun kjører én gang"], correct: 0 }
    ]
  },

  debug: {
    ez: [
      { question: "Hva er debugging?", answers: ["Finne og fikse feil i kode", "Skrive helt ny kode fra bunn", "Slette alle gamle kodelinjer"], correct: 0 },
      { question: "Hva er en bug?", answers: ["En feil i programmet", "En type variabel", "Et utviklerverktøy"], correct: 0 },
      { question: "Hvorfor fikser vi feil?", answers: ["For at koden skal fungere", "For å gjøre koden tregere", "For moro og rekreasjon"], correct: 0 },
      { question: "Kan kode ha feil?", answers: ["Ja", "Nei", "Kun av og til"], correct: 0 },
      { question: "Hva gjør vi når koden ikke fungerer?", answers: ["Se etter feil", "Skriv om alt", "Gi opp"], correct: 0 },
      { question: "Er debugging viktig?", answers: ["Ja", "Nei", "Kun for eksperter"], correct: 0 },
      { question: "Kan vi bruke console.log for å finne feil?", answers: ["Ja", "Nei", "Kun for tekst"], correct: 0 },
      { question: "Hva er en enkel feil?", answers: ["Fungerer ikke som forventet", "En type løkke som gjentar", "En variabel uten verdi"], correct: 0 },
      { question: "Hvorfor tester vi kode?", answers: ["For å finne feil tidlig", "For å gjøre koden lengre", "For å stoppe programmet"], correct: 0 },
      { question: "Kan feil være små?", answers: ["Ja", "Nei", "Kun store"], correct: 0 },
      { question: "Hva betyr 'fikse'?", answers: ["Gjør koden riktig", "Slett all kode", "Start helt på nytt"], correct: 0 },
      { question: "Er debugging vanskelig?", answers: ["Nei", "Ja", "Kun for barn"], correct: 0 },
      { question: "Kan vi lære av feil?", answers: ["Ja", "Nei", "Kun glemme"], correct: 0 },
      { question: "Hva er første steg ved feil?", answers: ["Les meldingen", "Slett all kode", "Kjør på nytt"], correct: 0 },
      { question: "Er feil normale?", answers: ["Ja", "Nei", "Kun for nybegynnere"], correct: 0 },
      { question: "Kan debugging ta tid?", answers: ["Ja", "Nei", "Alltid raskt"], correct: 0 },
      { question: "Hva gjør vi etter å ha funnet feilen?", answers: ["Fiks den", "Ignorer", "Flere feil"], correct: 0 },
      { question: "Er debugging en del av programmering?", answers: ["Ja", "Nei", "Kun i spill"], correct: 0 },
      { question: "Kan vi bruke verktøy for debugging?", answers: ["Ja", "Nei", "Kun manuelt"], correct: 0 },
      { question: "Hvorfor er debugging nyttig?", answers: ["Gjør kode bedre", "Gjør kode verre", "Gjør ingenting"], correct: 0 }
    ],
    med: [
      { question: "Hva er en syntax error?", answers: ["En feil i kode-syntaksen som hindrer parsing", "En logisk feil som oppstår når koden kjører", "En feil som bare skjer helt tilfeldig i programmet"], correct: 0 },
      { question: "Hva er en runtime error?", answers: ["En feil som oppstår når koden kjøres", "En feil som skjer mens du skriver koden", "En feil som kompilatoren finner først"], correct: 0 },
      { question: "Hva gjør debugger statement?", answers: ["Pauserer koden i debuggeren hvis den er åpen", "Printer en verdi til utviklerkonsollen umiddelbart", "Stopper hele programmet og avslutter kjøringen helt"], correct: 0 },
      { question: "Hva brukes Browser DevTools til?", answers: ["Debugging, inspeksjon og optimalisering av kode", "Å skrive helt ny kode direkte i nettleseren", "Å designe visuelle layouts for moderne nettsider"], correct: 0 },
      { question: "Hva er stack trace?", answers: ["Liste som viser hvor feilen oppstod og kallstien", "Liste over alle variabler som er aktive i minnet", "Liste over alle funksjoner som er definert i koden"], correct: 0 },
      { question: "Hva brukes console.error() til?", answers: ["Å vise feilmeldinger i konsollen", "Å vise generell debug-informasjon", "Å vise advarsler på gul bakgrunn"], correct: 0 },
      { question: "Hva er et breakpoint i debugging?", answers: ["Et stopp-punkt der debuggeren pauserer kjøringen", "Et linjeskift som lages automatisk i hver kodelinje", "En type feilmelding som skjer under kjøring av kode"], correct: 0 },
      { question: "Hva gjør console.table()?", answers: ["Viser data formatert som en tabell i konsollen", "Viser en enkel liste med verdier i konsollen", "Viser en graf med data plottet på x- og y-akse"], correct: 0 }
    ],
    hard: [
      { question: "Når oppstår memory leak?", answers: ["Når minne ikke frigjøres etter at objekter er ute av bruk", "Når datamaskinen ikke har nok RAM tilgjengelig for oppgaven", "Når en funksjon har for mange lokale variabler i minnet"], correct: 0 },
      { question: "Hva er profiling innen debugging?", answers: ["Å måle og analysere ytelsen til koden", "En type automatisk testing av funksjoner", "En teknikk for å finne syntaks-feil raskt"], correct: 0 },
      { question: "Hva brukes try...catch til?", answers: ["Å håndtere exceptions og kjøretidsfeil", "Å lagre data i en lokal database-fil", "Å opprette løkker som kjører automatisk"], correct: 0 },
      { question: "Når kjører finally block i try...catch?", answers: ["Alltid, uansett om try eller catch kjøres", "Bare hvis try-blokken kjører uten noen feil", "Bare hvis catch-blokken faktisk fanget en feil"], correct: 0 },
      { question: "Hva er en custom error i JavaScript?", answers: ["En egendefinert feilklasse som arver fra Error", "En av de innebygde standard-feilene i JavaScript", "En type advarsel som ikke stopper programmet"], correct: 0 },
      { question: "Kan man debugge event listeners?", answers: ["Ja, med breakpoints i event listener-callbacks", "Nei, event listeners kan ikke debugges i JS", "Kun ved å bruke console.log inne i callbacks"], correct: 0 }
    ]
  }
};

/*************************************************
 * 🎴 ARBEIDSBUNKER (INGEN GJENTAKELSE)
 *************************************************/

const decks = {};

function resetDecks() {
  for (let island in questions) {
    decks[island] = {
      ez: [...questions[island].ez],
      med: [...questions[island].med],
      hard: [...questions[island].hard]
    };
  }
}

resetDecks();

/*************************************************
 * 🔀 SHUFFLE FUNKSJON
 *************************************************/

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/*************************************************
 * 📊 VANSKELIGHETSGRAD SYSTEM
 *************************************************/

function setDifficulty(difficulty) {
  currentDifficulty = difficulty;

  const buttons = document.querySelectorAll(".difficulty-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  document.getElementById("questionBox").classList.add("hidden");
}

/*************************************************
 * 🎲 SJANSEKORT BANK
 *************************************************/

const chanceCards = [
  "Du løste en bug! Gå 1 steg fremover.",
  "Feil i koden! Gå 1 steg bakover.",
  "Du brukte beste praksis! Gå 2 steg fremover.",
  "Syntax error! Gå 2 steg bakover.",
  "Du lærte noe nytt! Kast terningen på nytt.",
  "Variabelen din inneholder null. Gå 1 steg bakover.",
  "Perfekt testresultat! Gå 2 steg fremover.",
  "Du glemte et semikolon. Gå 1 steg bakover.",
  "Koden din er optimalisert! Gå 3 steg fremover.",
  "Stack overflow! Gå 3 steg bakover.",
  "Du skrev ryddig kode! Gå 1 steg fremover.",
  "Endelig løste du algoritmen! Gå 3 steg fremover.",
  "Debuggingen tok lenger tid enn forventet. Stå over 1 runde.",
  "Du refaktorerte koden! Gå 2 steg fremover.",
  "Runtime error! Stå over 1 runde.",
  "Du implementerte en ny funksjon! Gå 1 steg fremover.",
  "Uendelig løkke! Gå 2 steg bakover.",
  "Alle tester grønn! Gå 2 steg fremover.",
  "Du leste dokumentasjonen! Gå 1 steg fremover.",
  "Memory leak! Gå 1 steg bakover.",
  "Du brukte riktig datatype! Gå 1 steg fremover.",
  "Regex-mønsteret fungerte! Kast terningen på nytt.",
  "Nettleseren krasjet. Stå over 1 runde.",
  "Klasser og arv mestret! Gå 2 steg fremover.",
  "JSON-feil! Gå 1 steg bakover.",
  "API-kallet returnerte success! Gå 3 steg fremover.",

  // 🔥 SABOTASJEKORT
  "SABOTASJE: Du pushet til main uten å teste! En motspiller (du velger) må gå 2 steg bakover.",
  "SABOTASJE: Merge conflict! Velg en motspiller som må stå over 1 runde.",
  "SABOTASJE: Du slettet en annens branch ved et uhell. En motspiller går 3 steg bakover.",
  "SABOTASJE: Du introduserte en bug i teamets kode. Alle andre spillere går 1 steg bakover.",
  "SABOTASJE: Force push! Velg en motspiller som mister sitt neste terningkast.",
  "SABOTASJE: Du kommenterte ut testene. En motspiller (du velger) går 2 steg bakover.",
  "SABOTASJE: DDOS-angrep! Spilleren til venstre for deg står over 1 runde.",
  "SABOTASJE: Du byttet om på variabelnavnene til en motspiller. Velg én som går 2 steg bakover.",
  "SABOTASJE: Produksjonsserveren er nede! Alle andre spillere stopper der de står (ingen bevegelse) neste runde.",
  "SABOTASJE: Du stjal kaffen til utvikleren ved siden av. Spilleren til høyre for deg går 1 steg bakover."
];

/*************************************************
 * 🏝️ VELG ØY
 *************************************************/

function chooseIsland(island) {
  if (decks[island][currentDifficulty].length === 0) {
    // Gjenfyll bunken hvis den er tom
    decks[island][currentDifficulty] = [...questions[island][currentDifficulty]];
  }

  const randomIndex = Math.floor(Math.random() * decks[island][currentDifficulty].length);
  const question = decks[island][currentDifficulty][randomIndex];
  decks[island][currentDifficulty].splice(randomIndex, 1);

  showQuestion(question);
}

/*************************************************
 * ❓ VIS SPØRSMÅL (MED RANDOM SVARREKKEFØLGE)
 *************************************************/

function showQuestion(question) {
  document.getElementById("questionBox").classList.remove("hidden");
  document.getElementById("questionText").innerText = question.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  const answers = question.answers.map((text, index) => ({
    text,
    originalIndex: index
  }));

  shuffleArray(answers);

  answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");

    button.onclick = function () {
      // Fjern gamle ikoner hvis man klikker flere ganger
      const oldIcon = button.querySelector(".feedback-icon");
      if (oldIcon) oldIcon.remove();

      const icon = document.createElement("span");
      icon.classList.add("feedback-icon");

      if (answer.originalIndex === question.correct) {
        icon.innerText = "✔";
        icon.classList.add("correct-icon");
      } else {
        icon.innerText = "✖";
        icon.classList.add("wrong-icon");
      }

      button.appendChild(icon);

      // Fjern ikonet etter 3 sek
      setTimeout(() => {
        icon.remove();
      }, 3000);
    };

    answersDiv.appendChild(button);
  });
}

/*************************************************
 * 🎲 TREKK SJANSEKORT
 *************************************************/

function drawChanceCard() {
  const randomIndex = Math.floor(Math.random() * chanceCards.length);
  const card = chanceCards[randomIndex];

  const box = document.getElementById("chanceCardBox");
  box.classList.remove("hidden");
  document.getElementById("chanceCardText").innerText = card;

  box.scrollIntoView({ behavior: "smooth", block: "center" });
}

/*************************************************
 * 🎲 LUKK SJANSEKORT
 *************************************************/

function closeChanceCard() {
  document.getElementById("chanceCardBox").classList.add("hidden");
}

/*************************************************
 * 🏅 BADGE-TRACKER
 *************************************************/

function createEmptyBadges() {
  const badges = {};

  badgeIslands.forEach(island => {
    badges[island.key] = false;
  });

  return badges;
}

function loadPlayers() {
  const savedPlayers = localStorage.getItem(BADGE_STORAGE_KEY);

  if (!savedPlayers) {
    return [];
  }

  try {
    const parsedPlayers = JSON.parse(savedPlayers);

    if (!Array.isArray(parsedPlayers)) {
      return [];
    }

    return parsedPlayers.map(player => ({
      id: player.id || crypto.randomUUID(),
      name: player.name || "Spiller",
      badges: {
        ...createEmptyBadges(),
        ...(player.badges || {})
      }
    }));
  } catch (error) {
    console.error("Kunne ikke lese lagrede badges:", error);
    return [];
  }
}

function savePlayers() {
  localStorage.setItem(BADGE_STORAGE_KEY, JSON.stringify(players));
}

function renderBadgeTracker() {
  const tableContainer = document.getElementById("badgeTrackerTable");

  if (!tableContainer) {
    return;
  }

  if (players.length === 0) {
    tableContainer.innerHTML = `
      <p class="empty-state">Ingen spillere enda. Legg til navnene deres, så kan dere huke av badges underveis i spillet.</p>
    `;
    return;
  }

  const headers = badgeIslands
    .map(island => `<th><div class="badge-th"><img src="${island.img}" alt="" class="badge-th-img" /><span>${island.label}</span></div></th>`)
    .join("");

  const rows = players
    .map(player => {
      const badgeCells = badgeIslands
        .map(island => `
          <td>
            <input
              class="badge-checkbox"
              type="checkbox"
              ${player.badges[island.key] ? "checked" : ""}
              onchange="toggleBadge('${player.id}', '${island.key}')"
              aria-label="${player.name} - ${island.label}"
            />
          </td>
        `)
        .join("");

      const totalBadges = badgeIslands.filter(island => player.badges[island.key]).length;

      return `
        <tr>
          <td class="player-name">${player.name}</td>
          ${badgeCells}
          <td class="badge-total">${totalBadges}/6</td>
          <td><button class="remove-player-btn" type="button" onclick="removePlayer('${player.id}')">Fjern</button></td>
        </tr>
      `;
    })
    .join("");

  tableContainer.innerHTML = `
    <table class="badge-table">
      <thead>
        <tr>
          <th>Spiller</th>
          ${headers}
          <th>Totalt</th>
          <th>Handling</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function addPlayer() {
  const input = document.getElementById("playerNameInput");

  if (!input) {
    return;
  }

  const name = input.value.trim();

  if (!name) {
    input.focus();
    return;
  }

  players.push({
    id: crypto.randomUUID(),
    name,
    badges: createEmptyBadges()
  });

  input.value = "";
  savePlayers();
  renderBadgeTracker();
  input.focus();
}

function removePlayer(playerId) {
  players = players.filter(player => player.id !== playerId);
  savePlayers();
  renderBadgeTracker();
}

function toggleBadge(playerId, islandKey) {
  players = players.map(player => {
    if (player.id !== playerId) {
      return player;
    }

    return {
      ...player,
      badges: {
        ...player.badges,
        [islandKey]: !player.badges[islandKey]
      }
    };
  });

  savePlayers();
  renderBadgeTracker();
}

function resetBadges() {
  players = players.map(player => ({
    ...player,
    badges: createEmptyBadges()
  }));

  savePlayers();
  renderBadgeTracker();
}

document.addEventListener("DOMContentLoaded", () => {
  renderBadgeTracker();

  const playerNameInput = document.getElementById("playerNameInput");

  if (playerNameInput) {
    playerNameInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        addPlayer();
      }
    });
  }
});
