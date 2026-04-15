-- Seed questions — kjør ETTER 001_ranked_migration.sql
-- Sletter eksisterende spørsmål (inkludert Java/JavaScript/Algorithms testdata)
BEGIN;

TRUNCATE questions RESTART IDENTITY CASCADE;

-- ============================================================
-- VARIABLE
-- ============================================================
INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('variable','ez','Hva er en variabel?','["En beholder for data","En feilmelding i koden","En plass på nettet"]',0),
('variable','ez','Hva skjer hvis du endrer verdien i en variabel?','["Den erstattes","Begge lagres","Den blir slettet"]',0),
('variable','ez','Må en variabel ha et navn?','["Ja","Nei, automatisk","Bare for tekst"]',0),
('variable','ez','Hva er poenget med variabler?','["Fleksibel kode","Raskere kjøring","Mindre minne"]',0),
('variable','ez','Hva kalles det når variabelen får en verdi?','["Tildeling","Erklæring","Konvertering"]',0),
('variable','ez','Kan en variabel inneholde både tall og tekst?','["Ja, alt","Nei, tall kun","Nei, tekst kun"]',0),
('variable','ez','Hvis navn = ''Ole'', hva inneholder den?','["''Ole''","Nummer 1","En liste"]',0),
('variable','ez','Kan du bruke samme variabel flere ganger?','["Ja","Nei","Kun når tom"]',0),
('variable','ez','Hva skjer hvis du bruker en variabel uten verdi?','["Undefined","Ingenting","Verdien 0"]',0),
('variable','ez','Hvorfor variabler når tallet brukes flere steder?','["Enklere å endre","Bruker mindre minne","Gir ingen fordel"]',0),
('variable','ez','Kan du kalle en variabel ''var''?','["Det er reservert","Bare med hermetegn","Ja, helt vanlig"]',0),
('variable','ez','Hva gjør variabelen lettere å forstå?','["Beskrivende navn","Korte kryptiske navn","Mange tall i navnet"]',0),
('variable','ez','Hvis x = 5; x = x + 3, hva er x?','["8","5","3"]',0),
('variable','ez','Kan du tilordne en variabel til en annen?','["Ja","Nei","Kun samme navn"]',0),
('variable','ez','Hva kalles en variabel som ikke endres?','["Konstant","Funksjon","Løkke"]',0),
('variable','ez','Er variabelnavn case-sensitiv?','["Ja","Nei","Kun tall"]',0),
('variable','ez','Hva betyr å deklarere en variabel?','["Erklære den","Gi den verdi","Bruke den"]',0),
('variable','ez','Kan variabelnavn ha mellomrom?','["Nei","Ja","Kun sist"]',0),
('variable','ez','Hvis x = 10, hva inneholder x?','["Tallet 10","Teksten ''10''","Ingenting"]',0),
('variable','ez','Norske bokstaver i variabelnavn?','["Ikke anbefalt","Helt vanlig","Bare vokaler"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('variable','med','Hva blir verdien av x etter let x = 5; x = x * 2; x += 3?','["13","15","10"]',0),
('variable','med','Hva er den viktigste forskjellen mellom let og const?','["const kan ikke endres etter tildeling","let lever kun i det globale scopet","const er en funksjon, let er variabel"]',0),
('variable','med','Kan du redeklare en variabel som er deklarert med let?','["Nei","Ja","Bare to ganger"]',0),
('variable','med','Hva er scope i JavaScript?','["Området der en variabel er tilgjengelig","Et tall som angir størrelsen på minnet","Standardverdien en variabel får ved start"]',0),
('variable','med','Hva skrives ut når var x = 1; { var x = 2; } console.log(x) kjøres?','["2","1","Feil"]',0),
('variable','med','Hvordan fungerer hoisting for let og var?','["Begge hoistes, men let er i Temporal Dead Zone","Kun var hoistes, let blir helt ignorert","Begge hoistes og initialiseres til undefined"]',0),
('variable','med','Hva er en global variabel?','["En variabel tilgjengelig overalt i programmet","En variabel som kun lever inne i en blokk","En variabel som lagres utenfor nettleseren"]',0),
('variable','med','Kan du bruke en variabel før den er deklarert?','["Det avhenger av var, let eller const","Ja, dette fungerer alltid helt fint","Nei, aldri under noen omstendigheter"]',0),
('variable','med','Hva blir resultatet av let x; x += 5?','["NaN","5","0"]',0),
('variable','med','Hvilke tegn bruker template literals i JavaScript?','["Backticks","Enkelt-fnutt","Dobbelt-fnutt"]',0),
('variable','med','Hva blir verdien av b etter let a = b = 5?','["b blir en global variabel med verdi 5","b beholder sin opprinnelige verdi uendret","Koden gir umiddelbart en syntaks-feil"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('variable','hard','Hva er closures i JavaScript?','["Funksjoner som husker variabler fra omsluttende scope","Funksjoner som lukkes automatisk etter at de er ferdig","Objekter som fryses og ikke kan endres etter opprettelse"]',0),
('variable','hard','Når oppstår Temporal Dead Zone?','["Når let eller const brukes før de er deklarert","Når en funksjon kalles før den er definert","Når variabler med samme navn kolliderer i scope"]',0),
('variable','hard','Hva er variable shadowing?','["Når en ny variabel skjuler en variabel fra ytre scope","Når variabler automatisk kopieres mellom funksjoner","Når en variabel får flere verdier samtidig i minnet"]',0),
('variable','hard','Hva printes av var x = 1; function f() { var x = 2; } f(); console.log(x)?','["1","2","Feil"]',0),
('variable','hard','Hvordan påvirker strict mode håndteringen av variabler?','["Udeklarerte variabler gir en ReferenceError-feil","All kode må skrives som en global funksjon","Variabler kan ikke lenger være null eller tomme"]',0),
('variable','hard','Hva er en vanlig årsak til memory leak?','["Globale variabler som ikke blir ryddet opp","For mange const-variabler i en funksjon","Bruk av let-variabler utenfor løkke-blokker"]',0),
('variable','hard','Hva er hovedforskjellen mellom WeakMap og Map?','["WeakMap tillater kun objekt-nøkler og er ikke enumerabel","WeakMap kan kun inneholde primitive verdier som nøkler","WeakMap er en alfabetisk sortert versjon av en Map"]',0),
('variable','hard','Hva gjør Object.freeze() med et objekt?','["Gjør objektet immutable - kan ikke endres","Sletter alle referanser til objektet fra minnet","Konverterer objektet til en JSON-tekst automatisk"]',0),
('variable','hard','Hva blir x etter let x = 5; x = x++;?','["5","6","7"]',0);

-- ============================================================
-- DATATYPE
-- ============================================================
INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('datatype','ez','Hva er en datatype?','["Verdi-kategori","Kode-kategori","Feil-kategori"]',0),
('datatype','ez','Hva er forskjellen mellom 5 og ''5''?','["Tall vs tekst","Ingen forskjell","''5'' er større"]',0),
('datatype','ez','Hva er String?','["Tekst","Tall","Liste"]',0),
('datatype','ez','Hva kalles sann/usann?','["Boolean","True-False","Logikk"]',0),
('datatype','ez','tall = ''123'' - type?','["String","Number","Ukjent"]',0),
('datatype','ez','Hva blir 5 + ''5''?','["Sammenslåing","Tallet 10","En syntaks-feil"]',0),
('datatype','ez','Hva er Array?','["Liste","Tall","Tekst"]',0),
('datatype','ez','Hvordan sjekker man type?','["typeof","getType()","isType()"]',0),
('datatype','ez','Hva er Number?','["Tall","Hele tall","Desimal"]',0),
('datatype','ez','Å endre type heter?','["Konvertering","Type-endring","Type-bytte"]',0),
('datatype','ez','Er null en type?','["Ja","Nei","Kun noen"]',0),
('datatype','ez','parseInt(''123.45'') gir?','["123","123.45","Feil"]',0),
('datatype','ez','Hva er undefined?','["Ingen verdi","Tomt objekt","En feil"]',0),
('datatype','ez','Kan en String inneholde tall?','["Ja","Nei","Ett siffer"]',0),
('datatype','ez','Hva er Object?','["Egenskaper","Enkelt verdi","En feiltype"]',0),
('datatype','ez','x = true er type?','["Boolean","String","Number"]',0),
('datatype','ez','Hva blir ''hello'' + ''world''?','["''helloworld''","Krasjer koden","Returnerer 0"]',0),
('datatype','ez','Hva er NaN?','["Ugyldig tall","Et tomt tall","Tomt objekt"]',0),
('datatype','ez','Kan du gange en streng med et tall?','["Ja, resultatet varierer","Nei, gir alltid feil","Ja, gir alltid null"]',0),
('datatype','ez','Hvorfor kjenne typer?','["Unngå feil","Ikke viktig","Bare pynt"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('datatype','med','Hva blir resultatet av typeof typeof 42?','["''string''","''number''","42"]',0),
('datatype','med','Hva er Symbol-datatypen brukt til?','["Å opprette unike identifikatorer","Å holde styr på typer i minnet","En måte å lagre JSON-objekter"]',0),
('datatype','med','Når brukes BigInt datatype?','["For å håndtere veldig store hele tall","For å representere svært små desimaler","For å lagre binære tall i hex-format"]',0),
('datatype','med','Hva blir resultatet av ''123'' == 123?','["true, fordi == konverterer typer","false, typene er helt forskjellige","TypeError fordi JS ikke godtar dette"]',0),
('datatype','med','Hva blir resultatet av ''123'' === 123?','["false, === krever samme type og verdi","true, JS konverterer typer automatisk","TypeError grunnet ulike datatyper"]',0),
('datatype','med','Hva er forskjellen mellom Number.isNaN() og isNaN()?','["Number.isNaN() sjekker kun om verdien er NaN","De er helt identiske og kan byttes ut fritt","isNaN() konverterer verdien til tall først"]',0),
('datatype','med','Hva blir resultatet av null === undefined?','["false","true","error"]',0),
('datatype','med','Hva returnerer typeof null?','["''object'' - en kjent bug i JavaScript","''null'' - returnerer alltid typen null","TypeError - null kan ikke sjekkes"]',0),
('datatype','med','Hva blir resultatet av Array.isArray([])?','["true","false","error"]',0),
('datatype','med','Hva er implicit type coercion?','["Automatisk konvertering av typer i JS","En manuell måte å skrive om datatyper","En funksjon som bare finnes i TypeScript"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('datatype','hard','Hva returnerer typeof Symbol(''x'')?','["''symbol''","''object''","error"]',0),
('datatype','hard','Hva er verdien av Number.MAX_SAFE_INTEGER?','["2^53 - 1","2^32 - 1","2^64 - 1"]',0),
('datatype','hard','Er 0.1 + 0.2 === 0.3 true eller false?','["false, pga IEEE 754 flyttall-aritmetikk","true, JavaScript håndterer dette presist","SyntaxError, kan ikke sammenligne slik"]',0),
('datatype','hard','Hva kan Object.prototype.toString.call() brukes til?','["Å finne den eksakte typen av hvilken som helst verdi","Å konvertere en verdi mellom ulike datatyper","Å sjekke om to variabler har samme datatype"]',0),
('datatype','hard','Hva betyr boxed primitives?','["Primitive verdier som pakkes inn som objekt-versjoner","Tall som lagres i bokser for rask minnetilgang","En type klassedefinisjon for store datamengder"]',0),
('datatype','hard','Hva kjennetegner array-like objekter?','["De har length-property og numeriske indekser","De har innebygde metoder som push og pop","De er eksakte kopier av vanlige array-objekter"]',0);

-- ============================================================
-- OBJECT
-- ============================================================
INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('object','ez','Hva er et objekt?','["Egenskaper og verdier","Samme som en variabel","Samme som en funksjon"]',0),
('object','ez','Hva er { navn: ''Ole'' }?','["Et objekt","En array","En string"]',0),
('object','ez','Hva er en key?','["En nøkkel","En verdi","En feil"]',0),
('object','ez','Hvordan får man tilgang til en property?','["obj.prop","obj->prop","obj#prop"]',0),
('object','ez','Kan et objekt ha funksjoner?','["Ja, kalt metoder","Nei, aldri","Kun enkle typer"]',0),
('object','ez','Hva er fordelen med objekter?','["Organisert data","Raskere kjøring","Bruker mindre minne"]',0),
('object','ez','Hvordan henter du ut en egenskap fra et objekt?','["Med punktum, f.eks. person.navn","Med pil, f.eks. person->navn","Med kolon, f.eks. person:navn"]',0),
('object','ez','Kan man endre en egenskap?','["Ja","Nei, låst","Kun tall"]',0),
('object','ez','Hva heter det når objekter ligger i objekter?','["Nesting","Stacking","Linking"]',0),
('object','ez','Hva er en array av objekter?','["En liste med objekter","Et objekt med lister","En type funksjon"]',0),
('object','ez','Hvordan legger du til en egenskap?','["obj.prop = verdi","obj.add(prop)","Det er umulig"]',0),
('object','ez','Hva er JSON?','["Dataformat","Objekt-type","En liste"]',0),
('object','ez','Kan et objekt ha null som verdi?','["Ja","Nei, feil","Kun tomt"]',0),
('object','ez','Hvorfor modellere virkeligheten med objekter?','["Det blir enklere å forstå","Det gjør koden raskere","Det sparer mye minne"]',0),
('object','ez','Hvordan itererer man over et objekt?','["for...in løkke","Helt umulig","Kun manuelt"]',0),
('object','ez','En funksjon inne i et objekt heter?','["Metode","Property","Constructor"]',0),
('object','ez','Hva er start() inne i et objekt?','["En metode","En egenskap","En variabel"]',0),
('object','ez','Hvordan ser et tomt objekt ut?','["{}","empty","null"]',0),
('object','ez','Kan objekter inneholde boolske verdier?','["Ja","Kun tekst","Kun tall"]',0),
('object','ez','Hva er best med objekter?','["Lesbart","Raskere","Mindre"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('object','med','Hva refererer this til når det brukes inne i en objektmetode?','["Til selve objektet","Til window-objektet","Til undefined"]',0),
('object','med','Hva returnerer Object.keys() fra et objekt?','["En array med alle nøklene i objektet","En array med alle verdiene i objektet","Et nytt objekt som er en eksakt kopi"]',0),
('object','med','Hvorfor Object.keys() fremfor for...in ved iterasjon?','["Object.keys() hopper over arvede properties","for...in returnerer alltid tall i stedet","De er helt identiske i alle situasjoner"]',0),
('object','med','Hva er prototypal inheritance i JavaScript?','["Objekter arver egenskaper via prototype-kjeden","Klassisk klassebasert arv som i språket Java","Arv som kun fungerer med moderne ES6-klasser"]',0),
('object','med','Hva gjør Object.create()?','["Lager et nytt objekt med spesifikk prototype","Kopierer et eksisterende objekt byte for byte","Konverterer et objekt til en klasse-instans"]',0),
('object','med','Hva er getter og setter i JavaScript?','["Metoder som kjører logikk ved property-tilgang","Helt vanlige metoder på et objekt i JavaScript","En funksjon som returnerer objektets nøkler"]',0),
('object','med','Hva er computed property names?','["Property-navn som beregnes dynamisk ved runtime","Property-navn som alltid må være heltall-verdier","En type funksjon som ligger inne i et objekt"]',0),
('object','med','Hva gjør Object.assign()?','["Kopierer properties fra ett objekt til et annet","Sletter alle properties i et objekt permanent","Endrer datatypen til hele objektet på en gang"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('object','hard','Hva tillater Object.defineProperty() deg å gjøre?','["Definere properties med detaljert kontroll over attributter","Legge til properties uten å overskrive eksisterende verdier","Slette alle properties som ikke har blitt brukt på en stund"]',0),
('object','hard','Hvilke attributter har property descriptors?','["value, writable, enumerable, configurable","type, name, scope, accessibility, memory","readable, writeable, deletable, renamable"]',0),
('object','hard','Hva er Proxy-objekter i JavaScript?','["Objekter som fanger opp operasjoner på et mål-objekt","En eksakt kopi av et objekt som kan modifiseres fritt","En konstant versjon av et objekt som ikke kan endres"]',0),
('object','hard','Hva brukes Reflect API til?','["Metaprogrammering - operasjoner på objekter","Å sette breakpoints for debugging av kode","Å kjøre automatiserte tester mot funksjoner"]',0),
('object','hard','Hva betyr det at et objekt er frozen?','["Objektet kan ikke endres eller utvides mer","Objektet er kun lesbart men kan fremdeles utvides","Objektet er slettet og finnes ikke lenger i minnet"]',0);

-- ============================================================
-- LOGIC
-- ============================================================
INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('logic','ez','Hva er logikk i kode?','["Regler for hva som skjer","En type feilmelding-kode","En måte å lagre data på"]',0),
('logic','ez','Hva gjør if?','["Kjør kode hvis noe er sant","Gjentar kode i en løkke","Lagrer data i en variabel"]',0),
('logic','ez','Hva er else?','["Kjør hvis if ikke er sant","Lager en løkke i koden","Oppretter en variabel"]',0),
('logic','ez','Hva er en betingelse?','["Noe som er sant eller usant","En type funksjon i kode","En liste med verdier"]',0),
('logic','ez','Kan kode kjøre bare noen ganger?','["Ja, med if","Nei, alltid","Kun i løkker"]',0),
('logic','ez','Hva betyr ''hvis'' i kode?','["Sjekk om noe er sant","Gjenta koden i løkke","Stopp hele programmet"]',0),
('logic','ez','Er if nyttig?','["Ja, for valg","Nei, aldri","Kun for tall"]',0),
('logic','ez','Kan else brukes alene?','["Nei, trenger if","Ja, fungerer fint","Kun noen ganger"]',0),
('logic','ez','Hva skjer hvis betingelsen er usann?','["Else kjøres","If kjøres","Ingenting"]',0),
('logic','ez','Er logikk viktig i programmering?','["Ja","Nei","Kun for eksperter"]',0),
('logic','ez','Kan vi ha flere if-setninger?','["Ja","Nei","Kun én"]',0),
('logic','ez','Hva er et valg i kode?','["If eller else","En type løkke","En variabel"]',0),
('logic','ez','Er betingelser enkle?','["Ja","Nei","Kun komplekse"]',0),
('logic','ez','Kan kode ta beslutninger?','["Ja, med logikk","Nei, aldri","Kun mennesker"]',0),
('logic','ez','Hva gjør ''ellers''?','["Kjør alternativ kode","Gjenta hele løkken","Stopp programmet helt"]',0),
('logic','ez','Er if som et spørsmål?','["Ja","Nei","Kun svar"]',0),
('logic','ez','Kan logikk gjøre kode smartere?','["Ja","Nei","Kun tregere"]',0),
('logic','ez','Hva er grunnen til å bruke if?','["For å velge hva som skjer","For å lagre data i minnet","For å telle hvor mange ganger"]',0),
('logic','ez','Er else nødvendig?','["Nei, valgfritt","Ja alltid","Kun i løkker"]',0),
('logic','ez','Kan betingelser være enkle?','["Ja, som sant/usant","Nei, aldri enkle","Kun med tall"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('logic','med','Hva er switch statement brukt til?','["Å velge mellom alternativer basert på verdi","Å gjenta samme kode flere ganger etter hverandre","Å samle flere verdier i én array eller liste"]',0),
('logic','med','Hva er syntaksen for ternary operator?','["condition ? valueIfTrue : valueIfFalse","if (condition) { true } else { false }","condition && valueIfTrue || valueIfFalse"]',0),
('logic','med','Hva gjør && (AND) operatoren?','["Returnerer true bare hvis begge er sanne","Returnerer true hvis minst én er sann","Snur verdien fra sann til usann"]',0),
('logic','med','Hva gjør || (OR) operatoren?','["Returnerer true hvis minst én er sann","Returnerer true kun hvis begge er sanne","Snur betingelsen fra sann til usann"]',0),
('logic','med','Hva gjør ! (NOT) operatoren?','["Snur en betingelse (true blir false)","Utfører AND på to verdier samtidig","Utfører OR på to verdier samtidig"]',0),
('logic','med','Hva sjekker if (x > 5 && x < 10)?','["At x er mellom 5 og 10 (eksklusive)","At x er nøyaktig 5 eller eksakt 10","At x er større enn 15 og mindre enn 20"]',0),
('logic','med','Hva sjekker if (x === 5 || y === 10)?','["At minst én av dem er sann","At begge må være sanne samtidig","At ingen av dem er sanne"]',0),
('logic','med','Hvilke verdier er falsy i JavaScript?','["0, '''', null, undefined, NaN, false","Kun null og undefined er falsy","Alle tomme strenger og alle tall"]',0),
('logic','med','Hva gjør default i en switch statement?','["Fungerer som fallback når ingen cases matcher","Brukes alltid som den første casen i switch","Brukes alltid som den siste casen i switch"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('logic','hard','Hva betyr short-circuit evaluation?','["Evaluering stopper når resultatet er avgjort","Alle deler blir alltid evaluert fullstendig","Operatorene sjekker typene før evaluering"]',0),
('logic','hard','Hva gjør nullish coalescing operatoren (??)?','["Returnerer høyresiden hvis venstre er null/undefined","Returnerer høyresiden for alle falsy verdier som 0","Fungerer akkurat som en vanlig OR-operator"]',0),
('logic','hard','Hva brukes optional chaining (?.) til?','["Trygg tilgang til props på objekter som kan være null","Filtrering av elementer fra array basert på en test","Laging av en dyp kopi av et objekt og all dets data"]',0),
('logic','hard','Hva sier De Morgan''s Laws?','["!(a && b) === !a || !b og !(a || b) === !a && !b","a && b er alltid lik a || b i all boolsk logikk","Regler for hvordan matematiske uttrykk evalueres"]',0);

-- ============================================================
-- LOOP
-- ============================================================
INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('loop','ez','Hva er en løkke?','["Gjenta kode flere ganger","En type spesiell variabel","En type betingelse-setning"]',0),
('loop','ez','Hvorfor bruker vi løkker?','["For å unngå å skrive samme kode mange ganger","For å lagre store mengder data på en effektiv måte","For å stoppe programmet på et spesifikt tidspunkt"]',0),
('loop','ez','Hva gjør en for-løkke?','["Gjenta et visst antall ganger","Gjenta mens noe er sant hele tiden","Lagre informasjon til senere bruk"]',0),
('loop','ez','Hva gjør en while-løkke?','["Gjenta mens en betingelse er sann","Gjenta nøyaktig et antall ganger","Opprette en ny variabel i minnet"]',0),
('loop','ez','Kan løkker hjelpe med telling?','["Ja","Nei","Kun for tekst"]',0),
('loop','ez','Er løkker nyttige?','["Ja, for repetisjon","Nei, aldri nyttige","Kun for eksperter"]',0),
('loop','ez','Hva skjer hvis løkken stopper?','["Koden fortsetter videre etterpå","Hele programmet stopper helt","Løkken starter helt fra starten"]',0),
('loop','ez','Kan løkker brukes i spill?','["Ja","Nei","Kun i matte"]',0),
('loop','ez','Er løkker en del av programmering?','["Ja","Nei","Kun i avansert kode"]',0),
('loop','ez','Kan løkker gjøre kode kortere?','["Ja","Nei","Gjør lengre"]',0),
('loop','ez','Hva er en enkel løkke?','["Gjenta noen ganger","En kodefeil i løkke","En type betingelse"]',0),
('loop','ez','Brukes løkker ofte?','["Ja","Nei","Kun av og til"]',0),
('loop','ez','Kan løkker telle ned?','["Ja","Nei","Kun opp"]',0),
('loop','ez','Hva er fordel med løkker?','["Mindre arbeid","Lager flere feil","Tregere kjøring"]',0),
('loop','ez','Er løkker vanskelige?','["Nei","Ja","Kun for barn"]',0),
('loop','ez','Kan løkker brukes på lister?','["Ja","Nei","Kun på tall"]',0),
('loop','ez','Hva gjør ''gjenta'' i løkker?','["Kjør kode på nytt","Stopp programmet","Start hele appen"]',0),
('loop','ez','Er løkker som en sykkel?','["Ja, runde etter runde","Nei, det gir lite mening","Kun for svært enkle spill"]',0),
('loop','ez','Kan løkker stoppe tidlig?','["Ja","Nei","Alltid ferdig"]',0),
('loop','ez','Er løkker grunnleggende?','["Ja","Nei","Kun avansert"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('loop','med','Hvordan skiller do...while seg fra while?','["Kjører kroppen minst én gang før sjekk","Fungerer akkurat likt som vanlig while","Fungerer akkurat likt som en for-løkke"]',0),
('loop','med','Hva gjør break statement inne i en løkke?','["Avslutter løkken umiddelbart","Hopper over ett steg og fortsetter","Pauserer løkken midlertidig et øyeblikk"]',0),
('loop','med','Hva gjør continue statement inne i en løkke?','["Hopper til neste iterasjon i løkken","Avslutter løkken med én gang","Pauserer løkken i noen sekunder"]',0),
('loop','med','I for (let i = 0; i < 5; i++), hva gjør i++?','["Øker verdien av i med 1 for hver runde","Setter variabelen i til verdien 1 alltid","Reduserer i med 1 for hver runde i løkken"]',0),
('loop','med','Hva er nested loops?','["En løkke som ligger inne i en annen løkke","To løkker som kjører parallelt samtidig","Flere løkker som kjører etter hverandre i rekke"]',0),
('loop','med','Hva brukes forEach() til?','["Å iterere gjennom hvert element i en array","Å iterere gjennom hver bokstav i en streng","Å iterere gjennom alle tall fra 0 til 100"]',0),
('loop','med','Hva returnerer map()?','["En ny array med transformerte verdier","Den opprinnelige arrayen modifisert direkte","En boolean som sier om alle tester passerte"]',0),
('loop','med','Hva returnerer filter()?','["En ny array med elementer som passerer testen","Den opprinnelige arrayen modifisert direkte i minnet","Et tall som representerer antall treffende elementer"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('loop','hard','Hva er generator functions?','["Funksjoner som kan pauseres og gjenopptas med yield","Helt vanlige funksjoner uten noen spesielle egenskaper","En type løkke som gir ut verdier i en sekvens"]',0),
('loop','hard','Hvor brukes yield keyword?','["I generator-funksjoner for å pause og returnere verdier","I vanlige for- og while-løkker for rask iterasjon","I klassedefinisjoner for å definere nye metoder"]',0),
('loop','hard','Hva gjør reduce() metode på en array?','["Samler array-elementer til én enkelt sluttverdi","Fjerner elementer som ikke oppfyller en betingelse","Sorterer array-elementer i stigende rekkefølge"]',0),
('loop','hard','Hvilken løkke er generelt raskest i JavaScript?','["Vanlig for-løkke","forEach-metoden","map-metoden"]',0),
('loop','hard','Hva er en infinite loop?','["En løkke som aldri ender og fryser programmet","En svært effektiv løkke optimalisert for ytelse","En veldig kort løkke som kun kjører én gang"]',0);

-- ============================================================
-- DEBUG
-- ============================================================
INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('debug','ez','Hva er debugging?','["Finne og fikse feil i kode","Skrive helt ny kode fra bunn","Slette alle gamle kodelinjer"]',0),
('debug','ez','Hva er en bug?','["En feil i programmet","En type variabel","Et utviklerverktøy"]',0),
('debug','ez','Hvorfor fikser vi feil?','["For at koden skal fungere","For å gjøre koden tregere","For moro og rekreasjon"]',0),
('debug','ez','Kan kode ha feil?','["Ja","Nei","Kun av og til"]',0),
('debug','ez','Hva gjør vi når koden ikke fungerer?','["Se etter feil","Skriv om alt","Gi opp"]',0),
('debug','ez','Er debugging viktig?','["Ja","Nei","Kun for eksperter"]',0),
('debug','ez','Kan vi bruke console.log for å finne feil?','["Ja","Nei","Kun for tekst"]',0),
('debug','ez','Hva er en enkel feil?','["Fungerer ikke som forventet","En type løkke som gjentar","En variabel uten verdi"]',0),
('debug','ez','Hvorfor tester vi kode?','["For å finne feil tidlig","For å gjøre koden lengre","For å stoppe programmet"]',0),
('debug','ez','Kan feil være små?','["Ja","Nei","Kun store"]',0),
('debug','ez','Hva betyr ''fikse''?','["Gjør koden riktig","Slett all kode","Start helt på nytt"]',0),
('debug','ez','Er debugging vanskelig?','["Nei","Ja","Kun for barn"]',0),
('debug','ez','Kan vi lære av feil?','["Ja","Nei","Kun glemme"]',0),
('debug','ez','Hva er første steg ved feil?','["Les meldingen","Slett all kode","Kjør på nytt"]',0),
('debug','ez','Er feil normale?','["Ja","Nei","Kun for nybegynnere"]',0),
('debug','ez','Kan debugging ta tid?','["Ja","Nei","Alltid raskt"]',0),
('debug','ez','Hva gjør vi etter å ha funnet feilen?','["Fiks den","Ignorer","Flere feil"]',0),
('debug','ez','Er debugging en del av programmering?','["Ja","Nei","Kun i spill"]',0),
('debug','ez','Kan vi bruke verktøy for debugging?','["Ja","Nei","Kun manuelt"]',0),
('debug','ez','Hvorfor er debugging nyttig?','["Gjør kode bedre","Gjør kode verre","Gjør ingenting"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('debug','med','Hva er en syntax error?','["En feil i kode-syntaksen som hindrer parsing","En logisk feil som oppstår når koden kjører","En feil som bare skjer helt tilfeldig i programmet"]',0),
('debug','med','Hva er en runtime error?','["En feil som oppstår når koden kjøres","En feil som skjer mens du skriver koden","En feil som kompilatoren finner først"]',0),
('debug','med','Hva gjør debugger statement?','["Pauserer koden i debuggeren hvis den er åpen","Printer en verdi til utviklerkonsollen umiddelbart","Stopper hele programmet og avslutter kjøringen helt"]',0),
('debug','med','Hva brukes Browser DevTools til?','["Debugging, inspeksjon og optimalisering av kode","Å skrive helt ny kode direkte i nettleseren","Å designe visuelle layouts for moderne nettsider"]',0),
('debug','med','Hva er stack trace?','["Liste som viser hvor feilen oppstod og kallstien","Liste over alle variabler som er aktive i minnet","Liste over alle funksjoner som er definert i koden"]',0),
('debug','med','Hva brukes console.error() til?','["Å vise feilmeldinger i konsollen","Å vise generell debug-informasjon","Å vise advarsler på gul bakgrunn"]',0),
('debug','med','Hva er et breakpoint i debugging?','["Et stopp-punkt der debuggeren pauserer kjøringen","Et linjeskift som lages automatisk i hver kodelinje","En type feilmelding som skjer under kjøring av kode"]',0),
('debug','med','Hva gjør console.table()?','["Viser data formatert som en tabell i konsollen","Viser en enkel liste med verdier i konsollen","Viser en graf med data plottet på x- og y-akse"]',0);

INSERT INTO questions (island, difficulty, question_text, options, correct) VALUES
('debug','hard','Når oppstår memory leak?','["Når minne ikke frigjøres etter at objekter er ute av bruk","Når datamaskinen ikke har nok RAM tilgjengelig for oppgaven","Når en funksjon har for mange lokale variabler i minnet"]',0),
('debug','hard','Hva er profiling innen debugging?','["Å måle og analysere ytelsen til koden","En type automatisk testing av funksjoner","En teknikk for å finne syntaks-feil raskt"]',0),
('debug','hard','Hva brukes try...catch til?','["Å håndtere exceptions og kjøretidsfeil","Å lagre data i en lokal database-fil","Å opprette løkker som kjører automatisk"]',0),
('debug','hard','Når kjører finally block i try...catch?','["Alltid, uansett om try eller catch kjøres","Bare hvis try-blokken kjører uten noen feil","Bare hvis catch-blokken faktisk fanget en feil"]',0),
('debug','hard','Hva er en custom error i JavaScript?','["En egendefinert feilklasse som arver fra Error","En av de innebygde standard-feilene i JavaScript","En type advarsel som ikke stopper programmet"]',0),
('debug','hard','Kan man debugge event listeners?','["Ja, med breakpoints i event listener-callbacks","Nei, event listeners kan ikke debugges i JS","Kun ved å bruke console.log inne i callbacks"]',0);

COMMIT;
