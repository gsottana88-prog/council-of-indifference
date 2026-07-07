const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export function startupBroTemplate(title: string, score: number, comments: number): string {
  return pick([
    `"${title}" — ${score} upvote${score !== 1 ? 's' : ''} and ${comments} comment${comments !== 1 ? 's' : ''}. The new tech gospel according to Hacker News. In 6 hours no one will remember it. Including the person who wrote it.`,
    `HN is at it again: "${title}" ${score} people thought "yes, this deserves my vote." The bar for human enthusiasm keeps getting lower.`,
    `"${title}". Nice. ${comments} people spent minutes of their lives arguing about it. They could have learned Japanese. They chose this.`,
    `${score} points for "${title}". The tech dopamine reward system is working at full capacity. ${comments} comments, ${Math.max(0, comments - 3)} of which are pedantic semantic corrections.`,
    `Breaking: "${title}". ${score} people on HN just discovered something they'll forget tomorrow. You included.`,
  ])
}

export function cosmicRickTemplate(title: string, explanation: string): string {
  const truncated = explanation.length > 180 ? explanation.slice(0, 177) + '...' : explanation
  return pick([
    `Today: "${title}". ${truncated} Translated: the universe keeps doing spectacular things while you worry about that 3pm meeting. Put it in perspective. Or don't. You're irrelevant either way.`,
    `"${title}". NASA photographed stuff millions of light-years away. You just spent 45 minutes deciding what to eat for lunch. We're in the same boat, but mine has a warp drive.`,
    `"${title}" — ${truncated} Great discovery, humans. Meanwhile 99.9999% of the observable universe doesn't even know you exist. And it's perfectly fine with that.`,
    `APOD today: "${title}". ${truncated} It's beautiful. It's fascinating. And it won't change a single thing about your day. Like everything else, really.`,
  ])
}

export function weatherDadTemplate(temp: number, forecast: string, city: string): string {
  return pick([
    `${city}: ${temp.toFixed(0)}°F, ${forecast.toLowerCase()}. Nice. But you'll still find something to complain about. You always do. It's your only constant.`,
    `In ${city} it's ${temp.toFixed(0)}°F with ${forecast.toLowerCase()}. Remember that time you said "what a beautiful day"? That was an exception, not the rule. Go back inside.`,
    `${forecast} in ${city}, ${temp.toFixed(0)}°F. Meteorologically speaking, it's an average day. Exactly like you.`,
    `${temp.toFixed(0)} degrees. ${forecast}. ${city}. There. Now you can go outside. Or not. The weather doesn't care.`,
  ])
}

export function internetIdTemplate(repo: string, description: string, language: string, stars: number): string {
  const desc = description || 'no description, like your social life'
  return pick([
    `GitHub is losing its mind over "${repo}". ${stars} stars. Language: ${language}. "${desc}". Another framework that will solve all the world's problems. Or create them. Same thing.`,
    `Wow, "${repo}" is blowing up on GitHub! ${stars} stars! "${desc}" ${language}. Beautiful. In 3 months no one will maintain it. But the hype was fun, right?`,
    `Trending on GitHub: "${repo}". ${stars} stars. ${language}. "${desc}". Are you excited? You shouldn't be. Even the author doesn't know if it'll be useful.`,
    `"${repo}": ${stars} stars, ${language}... "${desc}" Open source is beautiful: people working for free to solve problems they didn't know they had. The spirit of capitalism, nerd edition.`,
  ])
}

export function localPhilosopherTemplate(): string {
  return pick([
    'The universe is indifferent not because it hates you, but because "you" aren\'t really a thing it can register. You\'re a local fluctuation. A temporary typo in the cosmos.',
    'You spend 80 years trying to matter. The universe spends 14 billion years not noticing. One of you is winning, and it\'s not the one with a 401(k).',
    'Every time you feel important, remember: you\'re a bag of mostly water on a rock hurtling through a void so cold and vast it makes your problems look like dust. Comforting, right?',
    'You asked for wisdom. Here it is: nothing matters, everything is fine, and the only honest response to existence is a long, slow nod. There. Saved you therapy.',
    'The void doesn\'t answer prayers. It doesn\'t answer anything. It just void-s. That\'s the cosmic equivalent of a shrug. Take notes.',
    'Your deepest thoughts? Electrical impulses in a damp organ. Your grandest ambitions? Carbon trying to feel special. Sit down.',
  ])
}

export function oracleTemplate(): string {
  const fortunes = [
    'Today is a good day to start something. Or finish something. Or do nothing. Luck is on your side only if you believe you need it. And you don\'t need it.',
    'The stars say: "Relax, it can\'t get worse than yesterday." Spoiler: it can.',
    'The oracle has spoken: what you seek will find you, but probably at the wrong time and in an embarrassing context.',
    'The tarot reveals: your destiny is on a coffee break between "maybe" and "who knows." Enjoy the wait.',
    'Today your horoscope says: "Big changes on the horizon." But the horizon keeps moving. So... chill.',
  ]
  return pick(fortunes)
}
