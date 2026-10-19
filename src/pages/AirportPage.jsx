import { useMemo, useState } from 'react'
import { QuizPanel } from '../components/QuizPanel'
import { airportCoordinates } from '../data/airportCoordinates'
import { airportDestinations, airportSource } from '../data/airports'
import { advanceSeed, applicationSeed } from '../lib/quiz'

const regions = ['All destinations', ...new Set(airportDestinations.map((destination) => destination.region))]

function createAirportQuestions(destinations) {
  return destinations.map((destination) => {
    const alternatives = airportDestinations.filter((item) => item.code !== destination.code)
    const sameInitial = alternatives.filter((item) => item.code.startsWith(destination.code[0])).map((item) => item.city)
    const sameRegion = alternatives.filter((item) => !item.code.startsWith(destination.code[0]) && item.region === destination.region).map((item) => item.city)
    const remaining = alternatives.filter((item) => !item.code.startsWith(destination.code[0]) && item.region !== destination.region).map((item) => item.city)
    return {
      id: destination.code,
      label: 'Destination recall',
      prompt: 'Which destination uses this airport code?',
      clue: destination.code,
      answer: destination.city,
      choiceGroups: [sameInitial, sameRegion, remaining],
    }
  })
}

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

const regionStats = regions.slice(1).map((region) => {
  const routes = airportDestinations
    .filter((destination) => destination.region === region && destination.code !== 'SIN')
    .map((destination) => ({ ...destination, distance: distanceFromSingapore(destination.code) }))
    .filter((destination) => destination.distance !== null)
    .sort((first, second) => first.distance - second.distance)
  const averageDistance = routes.reduce((total, route) => total + route.distance, 0) / routes.length
  return { region, minimum: routes[0], maximum: routes.at(-1), averageDistance, averageDuration: averageDistance / 850 + 2 / 3 }
})

export function AirportPage() {
  const [filter, setFilter] = useState('All destinations')
  const [seed, setSeed] = useState(applicationSeed)
  const deck = useMemo(() => filter === 'All destinations'
    ? airportDestinations
    : airportDestinations.filter((destination) => destination.region === filter), [filter])
  const questions = useMemo(() => createAirportQuestions(deck), [deck])

  function changeFilter(nextFilter) {
    setFilter(nextFilter)
    setSeed((currentSeed) => advanceSeed(currentSeed))
  }

  return (
    <>
      <section className="intro">
        <div className="eyebrow"><span>01</span> WHERE WE FLY</div>
        <h1>Make the route<br /><em>stick.</em></h1>
        <p>Build your destination memory one airport code at a time.</p>
        <a className="source-link" href={airportSource} target="_blank" rel="noreferrer">Source: Singapore Airlines destination list <span>↗</span></a>
      </section>

      <section className="study-layout">
        <aside className="sidebar">
          <div className="sidebar-label">Choose a region</div>
          <div className="filter-list">{regions.map((region) => <button key={region} className={filter === region ? 'filter active' : 'filter'} type="button" onClick={() => changeFilter(region)}><span>{region === 'All destinations' ? '✦' : '○'}</span>{region}<b>{region === 'All destinations' ? airportDestinations.length : airportDestinations.filter((destination) => destination.region === region).length}</b></button>)}</div>
          <div className="memory-note"><span>✳</span><div><strong>Memory tip</strong><p>Say each code aloud. Sound turns a route into a landmark.</p></div></div>
        </aside>
        <QuizPanel key={`${filter}-${seed}`} questions={questions} initialSeed={seed} bestKey="sq-airport-best-streak" footerTag="SQ direct" completionLabel="All destinations mastered" />
      </section>

      <section className="route-stats">
        <div className="route-stats-head"><div><span className="eyebrow"><span>02</span> SQ ROUTES FROM SINGAPORE</span><h2>SQ regional flight range</h2></div><p>Singapore Airlines destinations only; Scoot and partner airlines are excluded. Distance uses great-circle routes from Changi. Time is estimated at 850 km/h plus 40 minutes.</p></div>
        <div className="stats-table-wrap"><table className="route-table"><thead><tr><th>Region</th><th>Minimum route</th><th>Maximum route</th><th>Average distance</th><th>Average time</th></tr></thead><tbody>{regionStats.map((stats) => <tr key={stats.region}><td>{stats.region}</td><td><strong>{stats.minimum.code}</strong><span>{stats.minimum.city}</span><small>{Math.round(stats.minimum.distance).toLocaleString()} km · {formatDuration(stats.minimum.distance / 850 + 2 / 3)}</small></td><td><strong>{stats.maximum.code}</strong><span>{stats.maximum.city}</span><small>{Math.round(stats.maximum.distance).toLocaleString()} km · {formatDuration(stats.maximum.distance / 850 + 2 / 3)}</small></td><td>{Math.round(stats.averageDistance).toLocaleString()} km</td><td>{formatDuration(stats.averageDuration)}</td></tr>)}</tbody></table></div>
      </section>
    </>
  )
}
