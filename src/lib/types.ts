export interface CouncilMember {
  id: string
  name: string
  title: string
  color: string
  icon: string
  dataSource: string
}

export interface CouncilData {
  member: CouncilMember
  rawInput: string
  take: string
  timestamp: string
}

export interface CouncilResponse {
  members: CouncilData[]
  generatedAt: string
}

export interface HackerNewsItem {
  title: string
  score: number
  descendants: number
  url: string
  by: string
}

export interface NasaApod {
  title: string
  explanation: string
  url: string
  date: string
}

export interface NwsForecast {
  temperature: number
  shortForecast: string
  detailedForecast: string
}

export interface Location {
  lat: number
  lon: number
  city?: string
}

export interface ChuckJoke {
  value: string
}

export interface GitHubTrend {
  repo: string
  description: string
  language: string
  stars: number
  forks: number
}
