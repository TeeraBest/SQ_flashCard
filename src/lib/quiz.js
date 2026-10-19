export const applicationSeed = Date.now()

export function advanceSeed(seed) {
  return (seed * 1664525 + 1013904223) >>> 0
}

export function shuffle(items, seed) {
  const shuffled = [...items]
  let random = seed >>> 0
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    random = advanceSeed(random)
    const target = random % (index + 1)
    ;[shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]]
  }
  return shuffled
}

export function createQuizOptions(question, seed, attempt) {
  const distractors = []
  question.choiceGroups.forEach((group, groupIndex) => {
    const groupSeed = seed + attempt * 101 + groupIndex * 307
    shuffle(group, groupSeed).forEach((choice) => {
      if (choice !== question.answer && !distractors.includes(choice)) distractors.push(choice)
    })
  })
  return shuffle([question.answer, ...distractors.slice(0, 3)], seed ^ ((attempt + 1) * 7919))
}
