import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { airportCoordinates } from './airportCoordinates'

const destinations = [
  { city: 'Los Angeles', code: 'LAX', region: 'America', airline: 'Singapore Airlines' },
  { city: 'Newark Liberty International Airport', code: 'EWR', region: 'America', airline: 'Singapore Airlines' },
  { city: 'John F. Kennedy International Airport', code: 'JFK', region: 'America', airline: 'Singapore Airlines' },
  { city: 'New York (metropolitan code)', code: 'NYC', region: 'America', airline: 'Singapore Airlines' },
  { city: 'San Francisco', code: 'SFO', region: 'America', airline: 'Singapore Airlines' },
  { city: 'Seattle', code: 'SEA', region: 'America', airline: 'Singapore Airlines' },
  { city: 'Beijing (metropolitan code)', code: 'BJS', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Beijing Capital International Airport', code: 'PEK', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Beijing Daxing International Airport', code: 'PKX', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Busan', code: 'PUS', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Chengdu', code: 'TFU', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Chongqing', code: 'CKG', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Fukuoka', code: 'FUK', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Guangzhou', code: 'CAN', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Guiyang', code: 'KWE', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Hangzhou', code: 'HGH', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Hong Kong', code: 'HKG', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Nagoya', code: 'NGO', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Osaka', code: 'KIX', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Seoul', code: 'ICN', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Shanghai', code: 'PVG', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Shenzhen', code: 'SZX', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Taipei', code: 'TPE', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Tokyo Haneda Airport', code: 'HND', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Narita International Airport', code: 'NRT', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Tokyo (metropolitan code)', code: 'TYO', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Xiamen', code: 'XMN', region: 'North Asia', airline: 'Singapore Airlines' },
  { city: 'Bandar Seri Begawan', code: 'BWN', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Bangkok', code: 'BKK', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Cebu', code: 'CEB', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Chiang Mai', code: 'CNX', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Da Nang', code: 'DAD', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Denpasar (Bali)', code: 'DPS', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Hanoi', code: 'HAN', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Ho Chi Minh City', code: 'SGN', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Jakarta', code: 'CGK', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Kuala Lumpur International Airport', code: 'KUL', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Sultan Abdul Aziz Shah Airport', code: 'SZB', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Manila', code: 'MNL', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Medan', code: 'KNO', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Penang', code: 'PEN', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Phnom Penh', code: 'KTI', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Phuket', code: 'HKT', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Siem Reap', code: 'SAI', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Singapore', code: 'SIN', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Surabaya', code: 'SUB', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Yangon', code: 'RGN', region: 'Southeast Asia', airline: 'Singapore Airlines' },
  { city: 'Amsterdam', code: 'AMS', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Barcelona', code: 'BCN', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Brussels', code: 'BRU', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Copenhagen', code: 'CPH', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Frankfurt', code: 'FRA', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Istanbul', code: 'IST', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'London Gatwick Airport', code: 'LGW', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'London Heathrow Airport', code: 'LHR', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'London (metropolitan code)', code: 'LON', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Madrid', code: 'MAD', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Manchester', code: 'MAN', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Milan', code: 'MXP', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Munich', code: 'MUC', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Paris', code: 'CDG', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Rome', code: 'FCO', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Zurich', code: 'ZRH', region: 'Europe', airline: 'Singapore Airlines' },
  { city: 'Ahmedabad', code: 'AMD', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Bengaluru', code: 'BLR', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Cape Town', code: 'CPT', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Chennai', code: 'MAA', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Colombo', code: 'CMB', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Delhi', code: 'DEL', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Dhaka', code: 'DAC', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Dubai', code: 'DXB', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Hyderabad', code: 'HYD', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Johannesburg', code: 'JNB', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Kathmandu', code: 'KTM', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Kochi', code: 'COK', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Kolkata', code: 'CCU', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Male', code: 'MLE', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Mumbai', code: 'BOM', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Riyadh', code: 'RUH', region: 'West Asia & Africa', airline: 'Singapore Airlines' },
  { city: 'Adelaide', code: 'ADL', region: 'Southwest Pacific', airline: 'Singapore Airlines' },
  { city: 'Auckland', code: 'AKL', region: 'Southwest Pacific', airline: 'Singapore Airlines' },
  { city: 'Brisbane', code: 'BNE', region: 'Southwest Pacific', airline: 'Singapore Airlines' },
  { city: 'Cairns', code: 'CNS', region: 'Southwest Pacific', airline: 'Singapore Airlines' },
  { city: 'Christchurch', code: 'CHC', region: 'Southwest Pacific', airline: 'Singapore Airlines' },
  { city: 'Darwin', code: 'DRW', region: 'Southwest Pacific', airline: 'Singapore Airlines' },
  { city: 'Melbourne', code: 'MEL', region: 'Southwest Pacific', airline: 'Singapore Airlines' },
  { city: 'Perth', code: 'PER', region: 'Southwest Pacific', airline: 'Singapore Airlines' },
  { city: 'Sydney Kingsford Smith Airport', code: 'SYD', region: 'Southwest Pacific', airline: 'Singapore Airlines' },
  { city: 'Western Sydney International Airport', code: 'WSI', region: 'Southwest Pacific', airline: 'Singapore Airlines' },
]

const sqDestinations = destinations.filter((destination) => destination.airline === 'Singapore Airlines')
const initialShuffleSeed = Date.now()

function distanceFromSingapore(code) {
  const coordinates = airportCoordinates[code]
  const singaporeCoordinates = airportCoordinates.SIN
  if (!coordinates) return null
  const toRadians = (degrees) => degrees * Math.PI / 180
  const latitudeDifference = toRadians(coordinates[0] - singaporeCoordinates[0])
  const longitudeDifference = toRadians(coordinates[1] - singaporeCoordinates[1])
  const startLatitude = toRadians(singaporeCoordinates[0])
  const endLatitude = toRadians(coordinates[0])
  const haversine = Math.sin(latitudeDifference / 2) ** 2
    + Math.cos(startLatitude) * Math.cos(endLatitude) * Math.sin(longitudeDifference / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
}

function formatDuration(hours) {
  const minutes = Math.round(hours * 12) * 5
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`
}

const regionStats = [...new Set(sqDestinations.map((destination) => destination.region))].map((region) => {
  const routes = sqDestinations
    .filter((destination) => destination.region === region && destination.code !== 'SIN')
    .map((destination) => ({ ...destination, distance: distanceFromSingapore(destination.code) }))
    .filter((destination) => destination.distance !== null)
    .sort((first, second) => first.distance - second.distance)
  const averageDistance = routes.reduce((total, route) => total + route.distance, 0) / routes.length
  return {
    region,
    minimum: routes[0],
    maximum: routes.at(-1),
    averageDistance,
    averageDuration: averageDistance / 850 + 2 / 3,
  }
})

function shuffle(items, seed) {
  const shuffled = [...items]
  let random = seed >>> 0
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    random = (random * 1664525 + 1013904223) >>> 0
    const target = random % (index + 1)
    ;[shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]]
  }
  return shuffled
}

function App() {
  const [filter, setFilter] = useState('All destinations')
  const [shuffleSeed, setShuffleSeed] = useState(initialShuffleSeed)
  const [questionQueue, setQuestionQueue] = useState(() => shuffle(sqDestinations, initialShuffleSeed).map((destination) => destination.code))
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)
  const [score, setScore] = useState({ known: 0, review: 0 })
  const [best, setBest] = useState(() => Number(localStorage.getItem('sq-best-streak') || 0))
  const [streak, setStreak] = useState(0)

  const regions = ['All destinations', ...new Set(sqDestinations.map((destination) => destination.region))]
  const deck = useMemo(() => filter === 'All destinations'
    ? sqDestinations
    : sqDestinations.filter((destination) => destination.region === filter), [filter])
  const card = sqDestinations.find((destination) => destination.code === questionQueue[0])
  const attempts = score.known + score.review
  const options = useMemo(() => {
    if (!card) return []
    const alternatives = sqDestinations.filter((destination) => destination.code !== card.code)
    const sameInitial = alternatives.filter((destination) => destination.code.startsWith(card.code[0]))
    const sameRegion = alternatives.filter((destination) => !sameInitial.includes(destination) && destination.region === card.region)
    const remaining = alternatives.filter((destination) => !sameInitial.includes(destination) && !sameRegion.includes(destination))
    const distractors = [
      ...shuffle(sameInitial, shuffleSeed + attempts * 101),
      ...shuffle(sameRegion, shuffleSeed + attempts * 211),
      ...shuffle(remaining, shuffleSeed + attempts * 307),
    ].slice(0, 3)
    return shuffle([card, ...distractors], shuffleSeed ^ ((attempts + 1) * 7919))
  }, [attempts, card, shuffleSeed])
  const progress = Math.min(100, (score.known / deck.length) * 100)

  function answerCard(option) {
    if (answered) return
    const isCorrect = option.code === card.code
    const result = isCorrect ? 'known' : 'review'
    const nextStreak = isCorrect ? streak + 1 : 0
    setScore((current) => ({ ...current, [result]: current[result] + 1 }))
    setStreak(nextStreak)
    if (nextStreak > best) {
      setBest(nextStreak)
      localStorage.setItem('sq-best-streak', String(nextStreak))
    }
    setSelectedAnswer(option.code)
    setLastAnswerCorrect(isCorrect)
    setAnswered(true)
  }

  function nextCard() {
    const nextSeed = (shuffleSeed * 1664525 + 1013904223) >>> 0
    setQuestionQueue((currentQueue) => {
      const [currentCode, ...remainingQuestions] = currentQueue
      if (lastAnswerCorrect) return remainingQuestions
      const insertionIndex = remainingQuestions.length === 0 ? 0 : 1 + nextSeed % remainingQuestions.length
      const nextQueue = [...remainingQuestions]
      nextQueue.splice(insertionIndex, 0, currentCode)
      return nextQueue
    })
    setShuffleSeed(nextSeed)
    setSelectedAnswer(null)
    setAnswered(false)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.key === ' ' || event.key === 'Enter') && answered) {
        event.preventDefault()
        nextCard()
      }
      const optionIndex = Number(event.key) - 1
      if (!answered && optionIndex >= 0 && optionIndex < options.length) answerCard(options[optionIndex])
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  function changeFilter(nextFilter) {
    const nextSeed = (shuffleSeed * 1664525 + 1013904223) >>> 0
    const nextDeck = nextFilter === 'All destinations'
      ? sqDestinations
      : sqDestinations.filter((destination) => destination.region === nextFilter)
    setFilter(nextFilter)
    setShuffleSeed(nextSeed)
    setQuestionQueue(shuffle(nextDeck, nextSeed).map((destination) => destination.code))
    setScore({ known: 0, review: 0 })
    setStreak(0)
    setSelectedAnswer(null)
    setAnswered(false)
  }

  function resetSession() {
    const nextSeed = (shuffleSeed * 1664525 + 1013904223) >>> 0
    setScore({ known: 0, review: 0 })
    setStreak(0)
    setShuffleSeed(nextSeed)
    setQuestionQueue(shuffle(deck, nextSeed).map((destination) => destination.code))
    setSelectedAnswer(null)
    setAnswered(false)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">SQ</span><span>Route memory</span></div>
        <div className="topbar-right"><span className="live-dot" /> Study deck <span className="divider" /><button className="reset-button" type="button" onClick={resetSession}>Reset session</button></div>
      </header>

      <section className="intro">
        <div className="eyebrow"><span>01</span> WHERE WE FLY</div>
        <h1>Make the route<br /><em>stick.</em></h1>
        <p>Build your destination memory one airport code at a time.</p>
        <a className="source-link" href="https://www.singaporeair.com/en_UK/sg/plan-travel/destinations/where-we-fly/" target="_blank" rel="noreferrer">Source: Singapore Airlines destination list <span>↗</span></a>
      </section>

      <section className="study-layout">
        <aside className="sidebar">
          <div className="sidebar-label">Choose a region</div>
          <div className="filter-list">
            {regions.map((region) => <button key={region} className={filter === region ? 'filter active' : 'filter'} type="button" onClick={() => changeFilter(region)}><span>{region === 'All destinations' ? '✦' : '○'}</span>{region}<b>{region === 'All destinations' ? sqDestinations.length : sqDestinations.filter((destination) => destination.region === region).length}</b></button>)}
          </div>
          <div className="memory-note"><span>✳</span><div><strong>Memory tip</strong><p>Say each code aloud. Sound turns a route into a landmark.</p></div></div>
        </aside>

        <div className="game-column">
          <div className="session-head"><div><span className="session-kicker">CURRENT SESSION</span><strong>{score.known === 0 ? 'First pass' : `${score.known} of ${deck.length} mastered`}</strong></div><div className="score-line"><span className="known-dot" />{score.known} known <span className="review-dot" />{score.review} review</div></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>

          {card ? <article className={answered ? 'flashcard answered' : 'flashcard'}>
            <div className="card-top"><span>Destination recall</span><span>{String(score.known + 1).padStart(2, '0')} / {String(deck.length).padStart(2, '0')}</span></div>
            <div className="card-content">
              <span className="card-question">Which destination uses this airport code?</span>
              <h2>{card.code}</h2>
              <div className="city-rule" />
              <div className="answer-area options-grid">{options.map((option) => <button key={option.code} type="button" className={selectedAnswer === option.code ? (option.code === card.code ? 'option correct' : 'option wrong') : answered && option.code === card.code ? 'option correct' : 'option'} onClick={() => answerCard(option)} disabled={answered}>{option.city}<span>{selectedAnswer === option.code ? (option.code === card.code ? '✓' : '×') : answered && option.code === card.code ? '✓' : ''}</span></button>)}</div>
            </div>
            <div className="card-footer"><span className="airline-tag">SQ direct</span></div>
          </article> : <article className="flashcard complete-card"><div className="card-content"><span className="card-question">Session complete</span><h2>{deck.length}/{deck.length}</h2><div className="city-rule" /><div className="answer-area"><strong>All destinations mastered</strong></div></div></article>}

          <div className="actions"><button type="button" className="action known next-action" disabled={Boolean(card) && !answered} onClick={card ? nextCard : resetSession}>{card ? (answered ? 'Next card' : 'Choose an answer') : 'Study again'} <span>→</span><kbd>SPACE</kbd></button></div>
          <div className="keyboard-hint"><span>1–4</span> choose answer <span>SPACE</span> next card</div>
        </div>

        <aside className="stats-panel"><div className="sidebar-label">Your rhythm</div><div className="stat-block"><strong>{streak}</strong><span>current streak</span></div><div className="stat-block"><strong>{best}</strong><span>best streak</span></div><div className="stat-divider" /><div className="small-stat"><span>Deck size</span><b>{deck.length}</b></div><div className="small-stat"><span>Mastered</span><b>{score.known}</b></div><div className="finish-mark">✦</div></aside>
      </section>

      <section className="route-stats">
        <div className="route-stats-head">
          <div><span className="eyebrow"><span>02</span> SQ ROUTES FROM SINGAPORE</span><h2>SQ regional flight range</h2></div>
          <p>Singapore Airlines destinations only; Scoot and partner airlines are excluded. Distance uses great-circle routes from Changi. Time is estimated at 850 km/h plus 40 minutes.</p>
        </div>
        <div className="stats-table-wrap">
          <table className="route-table">
            <thead><tr><th>Region</th><th>Minimum route</th><th>Maximum route</th><th>Average distance</th><th>Average time</th></tr></thead>
            <tbody>{regionStats.map((stats) => <tr key={stats.region}><td>{stats.region}</td><td><strong>{stats.minimum.code}</strong><span>{stats.minimum.city}</span><small>{Math.round(stats.minimum.distance).toLocaleString()} km · {formatDuration(stats.minimum.distance / 850 + 2 / 3)}</small></td><td><strong>{stats.maximum.code}</strong><span>{stats.maximum.city}</span><small>{Math.round(stats.maximum.distance).toLocaleString()} km · {formatDuration(stats.maximum.distance / 850 + 2 / 3)}</small></td><td>{Math.round(stats.averageDistance).toLocaleString()} km</td><td>{formatDuration(stats.averageDuration)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <footer className="footer"><span>DESTINATION MEMORY / 2026</span><span>Singapore Airlines destination data</span></footer>
    </main>
  )
}

export default App
