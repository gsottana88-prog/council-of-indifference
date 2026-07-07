const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export function startupBroTemplate(title: string, score: number, comments: number): string {
  return pick([
    `"${title}" — ${score} upvote${score !== 1 ? 's' : ''} e ${comments} comment${comments !== 1 ? 'i' : 'o'}. Il nuovo Vangelo del tech secondo Hacker News. Tra 6 ore nessuno se lo ricorderà. Compreso chi l'ha scritto.`,
    `HN ci riprova: "${title}" ${score} persone hanno pensato "sì, questo merita il mio voto". La soglia dell'entusiasmo umano è sempre più bassa.`,
    `"${title}". Bella. ${comments} persone hanno speso minuti della loro vita discutendone. Avrebbero potuto imparare il giapponese. Hanno scelto questo.`,
    `${score} punti per "${title}". Il sistema di ricompensa dopaminica del tech funziona a pieno regime. ${comments} commenti, di cui ${Math.max(0, comments - 3)} sono pedanti correzioni semantiche.`,
    `Breaking: "${title}". ${score} persone su HN hanno appena scoperto qualcosa che dimenticheranno domani. Tu incluso.`,
  ])
}

export function cosmicRickTemplate(title: string, explanation: string): string {
  const truncated = explanation.length > 180 ? explanation.slice(0, 177) + '...' : explanation
  return pick([
    `Oggi: "${title}". ${truncated} Tradotto: l'universo continua a fare cose spettacolari mentre tu sei preoccupato per quella riunione delle 15:00. Mettila in prospettiva. O no. Tanto sei irrilevante.`,
    `"${title}". La NASA ha fotografato roba a milioni di anni luce. Tu hai appena speso 45 minuti a decidere cosa mangiare a pranzo. Siamo sulla stessa barca, ma la mia ha un motore a curvatura.`,
    `"${title}" — ${truncated} Bella scoperta, umani. Nel frattempo, il 99.9999% dell'universo osservabile non sa nemmeno che esistete. E sta benissimo così.`,
    `APOD di oggi: "${title}". ${truncated} È bellissimo. È affascinante. E non cambierà assolutamente nulla della tua giornata. Come ogni cosa, del resto.`,
  ])
}

export function weatherDadTemplate(temp: number, forecast: string, city: string): string {
  return pick([
    `${city}: ${temp}°C, ${forecast.toLowerCase()}. Bella roba. Ma troverai comunque qualcosa di cui lamentarti. Lo fai sempre. È la tua unica costante.`,
    `A ${city} ci sono ${temp}°C con ${forecast.toLowerCase()}. Ti ricordi quella volta che hai detto "che bella giornata"? È stata un'eccezione, non la regola. Torna dentro.`,
    `${forecast} a ${city}, ${temp}°C. Meteorologicamente parlando, è una giornata nella media. Esattamente come te.`,
    `${temp} gradi. ${forecast}. ${city}. Ecco. Ora puoi uscire di casa. O non uscire. Tanto il tempo se ne frega.`,
  ])
}

export function internetIdTemplate(repo: string, description: string, language: string, stars: number): string {
  const desc = description || 'nessuna descrizione, come la tua vita sociale'
  return pick([
    `GitHub va in brodo d'oro per "${repo}". ${stars} stelle. Linguaggio: ${language}. "${desc}". Un altro framework che risolverà tutti i problemi del mondo. O li creerà. Stessa cosa.`,
    `Wow, "${repo}" sta spopolando su GitHub! ${stars} stelle! "${desc}" ${language}. Bellissimo. Tra 3 mesi nessuno lo manterrà più. Ma il hype è stato divertente, no?`,
    `Trending su GitHub: "${repo}". ${stars} stelle. ${language}. "${desc}". Sei emozionato? Non dovresti. Neanche chi l'ha scritto sa se servirà a qualcosa.`,
    `"${repo}": ${stars} stelle, ${language}… "${desc}" L'open source è bellissimo: gente che lavora gratis per risolvere problemi che non sapeva di avere. Lo spirito del capitalismo, versione nerd.`,
  ])
}

export function dadJokeTemplate(joke: string): string {
  return pick([
    `Battuta: "${joke}" È terribile. Lo so. Ma l'ha detto l'universo, non io. Prenditela con lui.`,
    `"${joke}" Se stai ridendo, mi preoccupo per te. Se non stai ridendo, mi preoccupo comunque. Non si vince, con me.`,
    `${joke} Ecco. Una perla di saggezza casuale. Non chiedermi perché. Non cercare un senso. Goditela. O soffrisci. La scelta è tua (anche se è irrilevante).`,
    `Il consiglio del giorno: "${joke}" Certo, non l'hai chiesto. Ma te lo do lo stesso. Perché? Perché posso. Perché sei qui. Perché no.`,
  ])
}

export function oracleTemplate(): string {
  const fortunes = [
    'Oggi è un buon giorno per iniziare qualcosa. O per finire qualcosa. O per non fare nulla. La fortuna è dalla tua parte solo se credi di averne bisogno. E non ne hai bisogno.',
    'Le stelle dicono: "Tranquillo, tanto peggio di ieri non può andare." Spoiler: può.',
    'L\'oracolo ha parlato: ciò che cerchi ti troverà, ma probabilmente in un momento sbagliato e in un contesto imbarazzante.',
    'I tarocchi rivelano: il tuo destino è in una pausa caffè tra il "forse" e il "chissà". Goditi l\'attesa.',
    'Oggi il tuo oroscopo dice: "Grandi cambiamenti all\'orizzonte." Ma l\'orizzonte si sposta sempre. Quindi, calma.',
  ]
  return pick(fortunes)
}
