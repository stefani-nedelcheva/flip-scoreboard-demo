const matchStates = [
  {
    league: 'Premier League',
    stadium: 'Etihad Stadium',
    status: '2nd half',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    homeScore: '02',
    awayScore: '01',
    clock: '52:18',
    note: "Haaland 18', Foden 42' | Salah 51'",
  },
  {
    league: 'Premier League',
    stadium: 'Etihad Stadium',
    status: '2nd half',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    homeScore: '02',
    awayScore: '02',
    clock: '63:44',
    note: "Haaland 18', Foden 42' | Salah 51', Diaz 63'",
  },
  {
    league: 'Premier League',
    stadium: 'Etihad Stadium',
    status: 'Full time',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    homeScore: '03',
    awayScore: '02',
    clock: '90:00',
    note: "Haaland 18', Foden 42', Silva 84' | Salah 51', Diaz 63'",
  },
]

function createDigit(character) {
  const card = document.createElement('div')
  card.className = 'flip-card'
  card.dataset.value = character

  card.innerHTML = `
    <div class="flip-card__top"><span class="flip-card__value">${character}</span></div>
    <div class="flip-card__bottom"><span class="flip-card__value">${character}</span></div>
    <div class="flip-card__next-top"><span class="flip-card__value">${character}</span></div>
    <div class="flip-card__next-bottom"><span class="flip-card__value">${character}</span></div>
  `

  return card
}

function buildDisplay(container, value) {
  container.innerHTML = ''
  value.split('').forEach((character) => {
    container.appendChild(createDigit(character))
  })
}

function updateDisplay(container, nextValue) {
  const digits = Array.from(container.children)
  const characters = nextValue.split('')

  digits.forEach((digit, index) => {
    const nextCharacter = characters[index]

    if (!nextCharacter || digit.dataset.value === nextCharacter) {
      return
    }

    digit.dataset.value = nextCharacter
    digit.classList.remove('is-flipping')

    const nextTop = digit.querySelector('.flip-card__next-top .flip-card__value')
    const nextBottom = digit.querySelector('.flip-card__next-bottom .flip-card__value')

    nextTop.textContent = nextCharacter
    nextBottom.textContent = nextCharacter

    requestAnimationFrame(() => {
      digit.classList.add('is-flipping')
    })

    digit.addEventListener(
      'animationend',
      () => {
        digit.querySelector('.flip-card__top .flip-card__value').textContent = nextCharacter
        digit.querySelector('.flip-card__bottom .flip-card__value').textContent = nextCharacter
        digit.classList.remove('is-flipping')
      },
      { once: true },
    )
  })
}

const homeScore = document.getElementById('homeScore')
const awayScore = document.getElementById('awayScore')
const clockMinutes = document.getElementById('clockMinutes')
const clockSeconds = document.getElementById('clockSeconds')

buildDisplay(homeScore, matchStates[0].homeScore)
buildDisplay(awayScore, matchStates[0].awayScore)
buildDisplay(clockMinutes, matchStates[0].clock.slice(0, 2))
buildDisplay(clockSeconds, matchStates[0].clock.slice(3, 5))

function renderState(state) {
  document.getElementById('leagueName').textContent = state.league
  document.getElementById('stadiumName').textContent = state.stadium
  document.getElementById('matchStatus').textContent = state.status
  document.getElementById('homeTeam').textContent = state.homeTeam
  document.getElementById('awayTeam').textContent = state.awayTeam
  document.getElementById('matchNote').textContent = state.note

  updateDisplay(homeScore, state.homeScore)
  updateDisplay(awayScore, state.awayScore)
  updateDisplay(clockMinutes, state.clock.slice(0, 2))
  updateDisplay(clockSeconds, state.clock.slice(3, 5))
}

renderState(matchStates[0])

let activeIndex = 0

window.setInterval(() => {
  activeIndex = (activeIndex + 1) % matchStates.length
  renderState(matchStates[activeIndex])
}, 2600)
