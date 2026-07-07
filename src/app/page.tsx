'use client'

import { useState, useEffect, useCallback } from 'react'
import type { CouncilResponse } from '@/lib/types'

function LoadingSkeleton() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="text-center mb-12 mt-8">
        <div className="h-10 w-64 bg-white/5 rounded animate-pulse mx-auto mb-3" />
        <div className="h-5 w-96 bg-white/5 rounded animate-pulse mx-auto" />
      </header>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
              <div className="flex-1">
                <div className="h-4 w-32 bg-white/5 rounded animate-pulse mb-1" />
                <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
              <div className="h-3 w-5/6 bg-white/5 rounded animate-pulse" />
              <div className="h-3 w-4/6 bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ErrorViewProps {
  onRetry: () => void
}
function ErrorView({ onRetry }: ErrorViewProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">💀</div>
        <h2 className="text-2xl font-bold text-red-400 mb-3">Il Consiglio è in pausa</h2>
        <p className="text-gray-500 mb-6 leading-relaxed">
          I server non rispondono. Forse è un segno dell&apos;universo.
          O forse è solo che siamo su un hosting gratuito e abbiamo finito le chiamate API.
          Riprova, ma senza troppe aspettative.
        </p>
        <button onClick={onRetry} className="px-6 py-3 border border-white/10 rounded-lg text-gray-400 hover:text-terminal hover:border-terminal/30 transition-all duration-300 font-mono text-sm">
          › Riprova_<span className="animate-pulse">▌</span>
        </button>
      </div>
    </div>
  )
}

const colorMap: Record<string, string> = {
  'startup-bro': 'ember',
  'cosmic-rick': 'cosmic',
  'weather-dad': 'sky',
  'internet-id': 'teal',
  'dad-joker': 'chaos',
  'oracle': 'pulse',
}

export default function Home() {
  const [data, setData] = useState<CouncilResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [statusText, setStatusText] = useState('')

  const statusMessages = [
    'Contattando il vuoto cosmico...',
    'Svegliando i membri del consiglio...',
    'Elaborando l\'insignificanza della tua esistenza...',
    'Scansionando l\'universo per trovare qualcosa di cui lamentarsi...',
    'Chiedendo a HN di smetterla con le hot take...',
    'Verificando se a qualcuno importa... (spoiler: no)',
    'Consultando gli asteroidi di passaggio...',
    'Aspettando che Chuck Norris finisca di distruggere un server...',
  ]

  const fetchCouncil = useCallback(async () => {
    setLoading(true)
    setError(false)
    const msgInterval = setInterval(() => {
      setStatusText(statusMessages[Math.floor(Math.random() * statusMessages.length)])
    }, 1200)
    setStatusText(statusMessages[0])

    try {
      const res = await fetch('/api/council')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json: CouncilResponse = await res.json()
      setData(json)
    } catch {
      setError(true)
    } finally {
      clearInterval(msgInterval)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCouncil()
  }, [fetchCouncil])

  if (error) return <ErrorView onRetry={fetchCouncil} />

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="text-center mb-6 md:mb-10 mt-6 md:mt-10">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white text-glow mb-3">
          COUNCIL OF<br className="md:hidden" />
          <span className="text-terminal"> INDIFFERENCE</span>
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-mono max-w-xl mx-auto leading-relaxed">
          Sei entità tragicomiche analizzano il mondo così non devi farlo tu.
          Nessuna è ottimista. Sono tutte dannatamente divertenti.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] md:text-xs font-mono text-gray-600">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-terminal animate-pulse" />
          {loading ? (
            <span className="animate-pulse">{statusText}</span>
          ) : (
            <span>Consiglio riunito. Prendete appunti.</span>
          )}
        </div>
      </header>

      {loading ? <LoadingSkeleton /> : data && (
        <>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {data.members.map((member, i) => {
              const color = colorMap[member.member.id] ?? 'terminal'
              return (
                <div
                  key={member.member.id}
                  className="group border border-white/[0.05] rounded-xl p-4 md:p-5 bg-white/[0.015] hover:border-white/10 transition-all duration-500 card-glow"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-lg bg-white/[0.03] border border-white/5 flex-shrink-0`}
                      style={{ color: member.member.color }}>
                      {member.member.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm md:text-base text-white truncate"
                        style={{ color: member.member.color }}>
                        {member.member.name}
                      </h3>
                      <p className="text-[10px] md:text-xs text-gray-600 font-mono truncate">
                        {member.member.title} · {member.member.dataSource}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-mono">
                    {member.take}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/[0.03]">
                    <p className="text-[10px] text-gray-700 font-mono truncate">
                      § {member.rawInput}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mt-8 md:mt-10 mb-8">
            <button
              onClick={fetchCouncil}
              className="group px-6 md:px-8 py-3 md:py-4 border border-white/10 rounded-xl text-sm font-mono text-gray-500 hover:text-terminal hover:border-terminal/30 transition-all duration-500 bg-white/[0.01]"
            >
              <span className="group-hover:hidden">› Riunisci di nuovo il consiglio_</span>
              <span className="hidden group-hover:inline text-terminal">› NUOVA SESSIONE_</span>
            </button>
          </div>
        </>
      )}

      <footer className="text-center pb-6 text-[10px] md:text-xs font-mono text-gray-700">
        Council of Indifference · Nessun API key necessario · Solo dati pubblici e cattiveria gratuita
      </footer>
    </main>
  )
}
