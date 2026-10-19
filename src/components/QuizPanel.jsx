import { useEffect } from 'react'
import { useMasteryQuiz } from '../hooks/useMasteryQuiz'

export function QuizPanel({ questions, initialSeed, bestKey, footerTag, completionLabel }) {
  const quiz = useMasteryQuiz({ questions, initialSeed, bestKey })

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.key === ' ' || event.key === 'Enter') && quiz.answered) {
        event.preventDefault()
        quiz.nextQuestion()
      }
      const optionIndex = Number(event.key) - 1
      if (!quiz.answered && optionIndex >= 0 && optionIndex < quiz.options.length) {
        quiz.answerQuestion(quiz.options[optionIndex])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <>
      <div className="game-column">
        <div className="session-head">
          <div><span className="session-kicker">CURRENT SESSION</span><strong>{quiz.score.known === 0 ? 'First pass' : `${quiz.score.known} of ${questions.length} mastered`}</strong></div>
          <div className="score-line"><span className="known-dot" />{quiz.score.known} known <span className="review-dot" />{quiz.score.review} review</div>
        </div>
        <div className="progress-track"><span style={{ width: `${quiz.progress}%` }} /></div>

        {quiz.current ? <article className={quiz.answered ? 'flashcard answered' : 'flashcard'}>
          <div className="card-top"><span>{quiz.current.label}</span><span>{String(quiz.score.known + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}</span></div>
          <div className="card-content">
            <span className="card-question">{quiz.current.prompt}</span>
            <h2 className={`clue-${quiz.current.clueSize || 'large'}`}>{quiz.current.clue}</h2>
            <div className="city-rule" />
            <div className="answer-area options-grid">{quiz.options.map((option, index) => <button key={option} type="button" className={quiz.selectedAnswer === option ? (option === quiz.current.answer ? 'option correct' : 'option wrong') : quiz.answered && option === quiz.current.answer ? 'option correct' : 'option'} onClick={() => quiz.answerQuestion(option)} disabled={quiz.answered}><i>{index + 1}</i>{option}<span>{quiz.selectedAnswer === option ? (option === quiz.current.answer ? '✓' : '×') : quiz.answered && option === quiz.current.answer ? '✓' : ''}</span></button>)}</div>
          </div>
          <div className="card-footer"><span className="airline-tag">{footerTag}</span></div>
        </article> : <article className="flashcard complete-card"><div className="card-content"><span className="card-question">Session complete</span><h2>{questions.length}/{questions.length}</h2><div className="city-rule" /><div className="answer-area"><strong>{completionLabel}</strong></div></div></article>}

        <div className="actions"><button type="button" className="action known next-action" disabled={Boolean(quiz.current) && !quiz.answered} onClick={quiz.current ? quiz.nextQuestion : quiz.reset}>{quiz.current ? (quiz.answered ? 'Next card' : 'Choose an answer') : 'Study again'} <span>→</span><kbd>SPACE</kbd></button></div>
        <div className="keyboard-hint"><span>1–4</span> choose answer <span>SPACE</span> next card</div>
      </div>

      <aside className="stats-panel"><div className="sidebar-label">Your rhythm</div><div className="stat-block"><strong>{quiz.streak}</strong><span>current streak</span></div><div className="stat-block"><strong>{quiz.best}</strong><span>best streak</span></div><div className="stat-divider" /><div className="small-stat"><span>Deck size</span><b>{questions.length}</b></div><div className="small-stat"><span>Remaining</span><b>{quiz.remaining}</b></div><div className="finish-mark">✦</div></aside>
    </>
  )
}
