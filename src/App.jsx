import { useState } from 'react'
import './App.css'
import { AirportPage } from './pages/AirportPage'
import { SpecialMealsPage } from './pages/SpecialMealsPage'

const tabs = [
  { id: 'airport', label: 'Airport' },
  { id: 'specialMeals', label: 'Special Meals' },
]

function App() {
  const [activeTab, setActiveTab] = useState('airport')
  const [sessionVersion, setSessionVersion] = useState(0)

  function changeTab(tabId) {
    setActiveTab(tabId)
    setSessionVersion((version) => version + 1)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">SQ</span><span>Memory desk</span></div>
        <nav className="tab-nav" aria-label="Study topics">{tabs.map((tab) => <button key={tab.id} type="button" className={activeTab === tab.id ? 'tab-button active' : 'tab-button'} onClick={() => changeTab(tab.id)} aria-current={activeTab === tab.id ? 'page' : undefined}>{tab.label}</button>)}</nav>
        <div className="topbar-right"><span className="live-dot" /> Study deck <span className="divider" /><button className="reset-button" type="button" title="Reset session" onClick={() => setSessionVersion((version) => version + 1)}><span className="reset-icon" aria-hidden="true">↻</span><span className="reset-label">Reset session</span></button></div>
      </header>

      {activeTab === 'airport'
        ? <AirportPage key={`airport-${sessionVersion}`} />
        : <SpecialMealsPage key={`meals-${sessionVersion}`} />}

      <footer className="footer"><span>SQ MEMORY DESK / 2026</span><span>Singapore Airlines reference data</span></footer>
    </main>
  )
}

export default App
