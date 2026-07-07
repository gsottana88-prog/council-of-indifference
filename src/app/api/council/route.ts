export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import type {
  CouncilMember, CouncilData, CouncilResponse,
  HackerNewsItem, NasaApod, NwsForecast, Location, GitHubTrend, ChuckJoke,
} from '@/lib/types'
import {
  startupBroTemplate, cosmicRickTemplate, weatherDadTemplate,
  internetIdTemplate, dadJokeTemplate, oracleTemplate,
} from '@/lib/templates'

const councilMembers: CouncilMember[] = [
  { id: 'startup-bro', name: '🔥 The Startup Bro', title: 'Hacker News Prophet', color: '#ff6b6b', icon: '⎈', dataSource: 'Hacker News' },
  { id: 'cosmic-rick', name: '🌌 Cosmic Rick', title: 'Interstellar Nihilist', color: '#6b5bff', icon: '✦', dataSource: 'NASA APOD' },
  { id: 'weather-dad', name: '🌦️ Weather Dad', title: 'Meteorological Cynic', color: '#45b7d1', icon: '☁', dataSource: 'National Weather Service' },
  { id: 'internet-id', name: '🐙 The Code Karen', title: 'GitHub Trendspotter', color: '#4ecdc4', icon: '⌘', dataSource: 'GitHub Trending' },
  { id: 'dad-joker', name: '😐 Dad Joker', title: 'Existential Comedian', color: '#ff9f43', icon: '⚡', dataSource: 'Chuck Norris Wisdom' },
  { id: 'oracle', name: '🔮 The Oracle', title: 'Cosmic Fortune Teller', color: '#ff6bb5', icon: '◎', dataSource: 'The Void' },
]

async function getLocation(): Promise<Location> {
  try {
    const res = await fetch('https://ipapi.co/json/', { next: { revalidate: 3600 } })
    if (!res.ok) return { lat: 40.7128, lon: -74.0060, city: 'New York' }
    const data = await res.json()
    return { lat: data.latitude ?? 40.7128, lon: data.longitude ?? -74.0060, city: data.city ?? 'Somewhere' }
  } catch {
    return { lat: 40.7128, lon: -74.0060, city: 'New York' }
  }
}

async function getHNTopStory(): Promise<CouncilData> {
  const member = councilMembers[0]
  try {
    const idsRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', { next: { revalidate: 300 } })
    const ids: number[] = await idsRes.json()
    const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[0]}.json`, { next: { revalidate: 300 } })
    const item: HackerNewsItem = await itemRes.json()
    return {
      member,
      rawInput: `"${item.title}" (${item.score} pts, ${item.descendants} comments)`,
      take: startupBroTemplate(item.title, item.score, item.descendants ?? 0),
      timestamp: new Date().toISOString(),
    }
  } catch (e) {
    return { member, rawInput: 'Failed to reach HN', take: `Even Hacker News isn't answering. Maybe that's for the best.`, timestamp: new Date().toISOString() }
  }
}

async function getNasaApod(): Promise<CouncilData> {
  const member = councilMembers[1]
  try {
    const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { next: { revalidate: 3600 } })
    const data: NasaApod = await res.json()
    return {
      member,
      rawInput: `"${data.title}"`,
      take: cosmicRickTemplate(data.title, data.explanation),
      timestamp: new Date().toISOString(),
    }
  } catch (e) {
    return { member, rawInput: 'NASA is busy', take: `NASA isn't answering. Maybe aliens cut the lines. Or maybe it's just Tuesday.`, timestamp: new Date().toISOString() }
  }
}

async function getWeather(location: Location): Promise<CouncilData> {
  const member = councilMembers[2]
  try {
    const pointRes = await fetch(`https://api.weather.gov/points/${location.lat},${location.lon}`, {
      headers: { 'User-Agent': 'CouncilOfIndifference/1.0 (council@example.com)' },
      next: { revalidate: 1800 },
    })
    const pointData = await pointRes.json()
    const forecastRes = await fetch(pointData.properties.forecast, {
      headers: { 'User-Agent': 'CouncilOfIndifference/1.0 (council@example.com)' },
      next: { revalidate: 1800 },
    })
    const forecastData = await forecastRes.json()
    const period = forecastData.properties.periods[0]
    const city = location.city ?? 'Unknown'
    return {
      member,
      rawInput: `${city}: ${period.temperature}°${period.temperatureUnit}, ${period.shortForecast}`,
      take: weatherDadTemplate(period.temperature, period.shortForecast, city),
      timestamp: new Date().toISOString(),
    }
  } catch (e) {
    return { member, rawInput: 'Weather service down', take: `Weather is unavailable. Like hope, lately.`, timestamp: new Date().toISOString() }
  }
}

async function getGitHubTrends(): Promise<CouncilData> {
  const member = councilMembers[3]
  try {
    const res = await fetch('https://api.gitterapp.com/repositories', { next: { revalidate: 3600 } })
    const repos: GitHubTrend[] = await res.json()
    const top = repos[0]
    return {
      member,
      rawInput: `${top.repo} — ${top.language}, ${top.stars} stars`,
      take: internetIdTemplate(top.repo, top.description, top.language, top.stars),
      timestamp: new Date().toISOString(),
    }
  } catch (e) {
    return { member, rawInput: 'GitHub is trending-less', take: `GitHub won't tell me what's trending. Maybe everyone's coding in silence today. As it should be.`, timestamp: new Date().toISOString() }
  }
}

async function getJoke(): Promise<CouncilData> {
  const member = councilMembers[4]
  try {
    const res = await fetch('https://api.chucknorris.io/jokes/random', { next: { revalidate: 60 } })
    const data: ChuckJoke = await res.json()
    return {
      member,
      rawInput: `"${data.value}"`,
      take: dadJokeTemplate(data.value),
      timestamp: new Date().toISOString(),
    }
  } catch (e) {
    return { member, rawInput: 'Chuck Norris broke the API', take: `Chuck Norris isn't answering. Probably punching the server. Respect.`, timestamp: new Date().toISOString() }
  }
}

function getOracle(): CouncilData {
  const member = councilMembers[5]
  return {
    member,
    rawInput: 'Consulting the void...',
    take: oracleTemplate(),
    timestamp: new Date().toISOString(),
  }
}

export async function GET() {
  const location = await getLocation()
  const results = await Promise.allSettled([
    getHNTopStory(),
    getNasaApod(),
    getWeather(location),
    getGitHubTrends(),
    getJoke(),
    Promise.resolve(getOracle()),
  ])

  const members: CouncilData[] = results.map((r) =>
    r.status === 'fulfilled' ? r.value : {
      member: councilMembers[results.indexOf(r)],
      rawInput: 'Unknown error',
      take: 'Even the universe has off days. Today is one of them. There, you found out.',
      timestamp: new Date().toISOString(),
    },
  )

  const response: CouncilResponse = {
    members,
    generatedAt: new Date().toISOString(),
  }

  return NextResponse.json(response, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}
