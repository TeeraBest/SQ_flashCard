import { useMemo, useState } from 'react'
import { advanceSeed, createQuizOptions, shuffle } from '../lib/quiz'

export function useMasteryQuiz({ questions, initialSeed, bestKey }) {
  const [seed, setSeed] = useState(initialSeed)
  const [queue, setQueue] = useState(() => shuffle(questions, initialSeed).map((question) => question.id))
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)
  const [score, setScore] = useState({ known: 0, review: 0 })
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem(bestKey) || 0))

  const current = questions.find((question) => question.id === queue[0])
  const options = useMemo(
    () => current ? createQuizOptions(current, seed, 0) : [],
    [current, seed],
  )

  function answerQuestion(answer) {
    if (answered || !current) return
    const isCorrect = answer === current.answer
    const result = isCorrect ? 'known' : 'review'
    const nextStreak = isCorrect ? streak + 1 : 0
    setScore((currentScore) => ({ ...currentScore, [result]: currentScore[result] + 1 }))
    setStreak(nextStreak)
    if (nextStreak > best) {
      setBest(nextStreak)
      localStorage.setItem(bestKey, String(nextStreak))
    }
    setSelectedAnswer(answer)
    setLastAnswerCorrect(isCorrect)
    setAnswered(true)
  }

  function nextQuestion() {
    const nextSeed = advanceSeed(seed)
    setQueue((currentQueue) => {
      const [currentId, ...remaining] = currentQueue
      if (lastAnswerCorrect) return remaining
      const insertionIndex = remaining.length === 0 ? 0 : 1 + nextSeed % remaining.length
      const nextQueue = [...remaining]
      nextQueue.splice(insertionIndex, 0, currentId)
      return nextQueue
    })
    setSeed(nextSeed)
    setSelectedAnswer(null)
    setAnswered(false)
  }

  function reset() {
    const nextSeed = advanceSeed(seed)
    setSeed(nextSeed)
    setQueue(shuffle(questions, nextSeed).map((question) => question.id))
    setScore({ known: 0, review: 0 })
    setStreak(0)
    setSelectedAnswer(null)
    setAnswered(false)
  }

  return {
    current,
    options,
    selectedAnswer,
    answered,
    score,
    streak,
    best,
    remaining: queue.length,
    progress: questions.length ? score.known / questions.length * 100 : 0,
    answerQuestion,
    nextQuestion,
    reset,
  }
}
