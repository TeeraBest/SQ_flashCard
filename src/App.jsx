import { useEffect, useMemo, useState } from 'react'
import './App.css'

const destinations = [
  { city: 'Los Angeles', code: 'LAX', region: 'America', airline: 'Singapore Airlines' },
  { city: 'New York', code: 'EWR, JFK, NYC', region: 'America', airline: 'Singapore Airlines' },
  { city: 'San Francisco', code: 'SFO', region: 'America', airline: 'Singapore Airlines' },
  { city: 'Seattle', code: 'SEA', region: 'America', airline: 'Singapore Airlines' },
  { city: 'Beijing', code: 'BJS, PEK, PKX', region: 'North Asia', airline: 'Singapore Airlines' },
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
  { city: 'Tokyo', code: 'HND, NRT, TYO', region: 'North Asia', airline: 'Singapore Airlines' },
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
  { city: 'Kuala Lumpur', code: 'KUL, SZB', region: 'Southeast Asia', airline: 'Singapore Airlines' },
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
  { city: 'London', code: 'LGW, LHR, LON', region: 'Europe', airline: 'Singapore Airlines' },
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
  { city: 'Sydney', code: 'SYD, WSI', region: 'Southwest Pacific', airline: 'Singapore Airlines' },
]

const sqDestinations = destinations.filter((destination) => destination.airline === 'Singapore Airlines')

function App() {
  const [filter, setFilter] = useState('All destinations')
  const [cardIndex, setCardIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState({ known: 0, review: 0 })
  const [best, setBest] = useState(() => Number(localStorage.getItem('sq-best-streak') || 0))
  const [streak, setStreak] = useState(0)

  const regions = ['All destinations', ...new Set(sqDestinations.map((destination) => destination.region))]
  const deck = useMemo(() => filter === 'All destinations'
    ? sqDestinations
    : sqDestinations.filter((destination) => destination.region === filter), [filter])
  const card = deck[cardIndex % deck.length]
  const options = useMemo(() => {
    const distractors = deck.filter((destination) => destination.city !== card.city)
    const start = cardIndex % distractors.length
    return [card, ...Array.from({ length: 3 }, (_, index) => distractors[(start + index * 7) % distractors.length])]
      .sort((first, second) => first.city.localeCompare(second.city))
  }, [card, cardIndex, deck])
  const completed = score.known + score.review
  const progress = Math.min(100, (completed / 10) * 100)

  function answerCard(option) {
    if (answered) return
    const isCorrect = option.city === card.city
    const result = isCorrect ? 'known' : 'review'
    const nextStreak = isCorrect ? streak + 1 : 0
    setScore((current) => ({ ...current, [result]: current[result] + 1 }))
    setStreak(nextStreak)
    if (nextStreak > best) {
      setBest(nextStreak)
      localStorage.setItem('sq-best-streak', String(nextStreak))
    }
    setSelectedAnswer(option.city)
    setAnswered(true)
  }

  function nextCard() {
    setSelectedAnswer(null)
    setAnswered(false)
    setCardIndex((index) => index + 1)
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
    setFilter(nextFilter)
    setCardIndex(0)
    setSelectedAnswer(null)
    setAnswered(false)
  }

  function resetSession() {
    setScore({ known: 0, review: 0 })
    setStreak(0)
    setCardIndex(0)
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
          <div className="session-head"><div><span className="session-kicker">CURRENT SESSION</span><strong>{completed === 0 ? 'First pass' : `${completed} cards reviewed`}</strong></div><div className="score-line"><span className="known-dot" />{score.known} known <span className="review-dot" />{score.review} review</div></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>

          <article className={answered ? 'flashcard answered' : 'flashcard'}>
            <div className="card-top"><span>Destination recall</span><span>{String((cardIndex % 10) + 1).padStart(2, '0')} / 10</span></div>
            <div className="card-content">
              <span className="card-question">Which destination uses this airport code?</span>
              <h2>{card.code}</h2>
              <div className="city-rule" />
              <div className="answer-area options-grid">{options.map((option) => <button key={option.city} type="button" className={selectedAnswer === option.city ? (option.city === card.city ? 'option correct' : 'option wrong') : answered && option.city === card.city ? 'option correct' : 'option'} onClick={() => answerCard(option)} disabled={answered}>{option.city}<span>{selectedAnswer === option.city ? (option.city === card.city ? '✓' : '×') : answered && option.city === card.city ? '✓' : ''}</span></button>)}</div>
            </div>
            <div className="card-footer"><span className="airline-tag">SQ direct</span></div>
          </article>

          <div className="actions"><button type="button" className="action known next-action" disabled={!answered} onClick={nextCard}>{answered ? 'Next card' : 'Choose an answer'} <span>→</span><kbd>SPACE</kbd></button></div>
          <div className="keyboard-hint"><span>1–4</span> choose answer <span>SPACE</span> next card</div>
        </div>

        <aside className="stats-panel"><div className="sidebar-label">Your rhythm</div><div className="stat-block"><strong>{streak}</strong><span>current streak</span></div><div className="stat-block"><strong>{best}</strong><span>best streak</span></div><div className="stat-divider" /><div className="small-stat"><span>Deck size</span><b>{deck.length}</b></div><div className="small-stat"><span>Mastered</span><b>{score.known}</b></div><div className="finish-mark">✦</div></aside>
      </section>

      <footer className="footer"><span>DESTINATION MEMORY / 2026</span><span>Singapore Airlines destination data</span></footer>
    </main>
  )
}

export default App
