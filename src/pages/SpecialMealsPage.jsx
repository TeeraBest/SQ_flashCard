import { useMemo, useState } from 'react'
import { QuizPanel } from '../components/QuizPanel'
import { specialMealFacts, specialMeals, specialMealSource } from '../data/specialMeals'
import { advanceSeed, applicationSeed } from '../lib/quiz'

const categories = ['All meals', 'Baby, Infant & Child', 'Religious', 'Vegetarian', 'Dietary', 'Booking & safety']

function createMealQuestions(meals) {
  return meals.flatMap((meal) => {
    const alternatives = specialMeals.filter((item) => item.code !== meal.code)
    const sameCategory = alternatives.filter((item) => item.category === meal.category)
    const otherCategories = alternatives.filter((item) => item.category !== meal.category)
    const sameInitial = alternatives.filter((item) => item.code.startsWith(meal.code[0]))
    const detailQuestions = meal.studyDetails.map((detail, index) => ({
      id: `${meal.code}-detail-${index + 1}`, category: meal.category,
      label: meal.studyDetails.length > 1 ? `Meal detail ${index + 1} of ${meal.studyDetails.length}` : 'Meal detail',
      prompt: 'Which special meal matches every detail shown?', clue: detail, clueSize: 'small', answer: meal.name,
      choiceGroups: [sameCategory.map((item) => item.name), otherCategories.map((item) => item.name)],
    }))
    return [
      {
        id: `${meal.code}-name`, category: meal.category, label: 'Code to full name',
        prompt: 'Which special meal uses this code?', clue: meal.code, answer: meal.name,
        choiceGroups: [sameInitial.map((item) => item.name), sameCategory.map((item) => item.name), otherCategories.map((item) => item.name)],
      },
      {
        id: `${meal.code}-code`, category: meal.category, label: 'Full name to code',
        prompt: 'What is the short code for this special meal?', clue: meal.name, clueSize: 'medium', answer: meal.code,
        choiceGroups: [sameCategory.map((item) => item.code), sameInitial.map((item) => item.code), otherCategories.map((item) => item.code)],
      },
      ...detailQuestions,
    ]
  })
}

const mealQuestions = createMealQuestions(specialMeals)
const factQuestions = specialMealFacts.map((fact) => ({
  ...fact,
  category: 'Booking & safety',
  label: 'Booking & safety',
  clue: fact.prompt,
  clueSize: 'small',
  prompt: 'Choose the correct Singapore Airlines policy detail.',
  choiceGroups: [fact.choices],
}))

export function SpecialMealsPage() {
  const [filter, setFilter] = useState('All meals')
  const [seed, setSeed] = useState(applicationSeed + 47)
  const questions = useMemo(() => {
    if (filter === 'All meals') return [...mealQuestions, ...factQuestions]
    if (filter === 'Booking & safety') return factQuestions
    return mealQuestions.filter((question) => question.category === filter)
  }, [filter])

  function changeFilter(nextFilter) {
    setFilter(nextFilter)
    setSeed((currentSeed) => advanceSeed(currentSeed))
  }

  function categoryCount(category) {
    if (category === 'All meals') return mealQuestions.length + factQuestions.length
    if (category === 'Booking & safety') return factQuestions.length
    return mealQuestions.filter((question) => question.category === category).length
  }

  return (
    <>
      <section className="intro meals-intro">
        <div className="eyebrow"><span>02</span> SPECIAL MEALS</div>
        <h1>Know every meal.<br /><em>By code.</em></h1>
        <p>Recall full names, short codes, ingredients, restrictions, and booking rules.</p>
        <a className="source-link" href={specialMealSource} target="_blank" rel="noreferrer">Source: Singapore Airlines special meals <span>↗</span></a>
      </section>

      <section className="study-layout">
        <aside className="sidebar">
          <div className="sidebar-label">Choose a category</div>
          <div className="filter-list">{categories.map((category) => <button key={category} className={filter === category ? 'filter active' : 'filter'} type="button" onClick={() => changeFilter(category)}><span>{category === 'All meals' ? '✦' : '○'}</span>{category}<b>{categoryCount(category)}</b></button>)}</div>
          <div className="memory-note"><span>✳</span><div><strong>Memory tip</strong><p>Read the code as letters, then name one defining restriction.</p></div></div>
        </aside>
        <QuizPanel key={`${filter}-${seed}`} questions={questions} initialSeed={seed} bestKey="sq-meals-best-streak" footerTag={filter === 'All meals' ? 'SQ special meals' : filter} completionLabel="All meal questions mastered" />
      </section>

      <section className="meal-index">
        <div className="route-stats-head"><div><span className="eyebrow"><span>03</span> STUDY INDEX</span><h2>24 special meals</h2></div><p>Every meal tests code, full name, and complete restrictions. Complex meals split availability, preparation, and allergy caveats into focused questions so no exam detail is lost.</p></div>
        <div className="meal-groups">{categories.slice(1, -1).map((category) => <section key={category}><h3>{category}</h3><div>{specialMeals.filter((meal) => meal.category === category).map((meal) => <span key={meal.code}><b>{meal.code}</b>{meal.name}</span>)}</div></section>)}</div>
      </section>
    </>
  )
}
