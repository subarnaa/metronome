const note = document.getElementById("note")
const button = document.getElementById("start-btn")
const slider = document.getElementById("slider")
const bpm = document.getElementById("bpm")
const metronomeSound = new Audio()
let timer = null

notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#','Ab','Bb','Db','Eb','Gb']

const stopMetronome = () => {
  metronomeSound.pause()
  metronomeSound.currentTime = 0
}

const startStopHandler = () => {
  if (button.innerText === "Start") {
    start()
    button.innerText = "Stop"
  } else {
    clearInterval(timer)
    stopMetronome()
    button.innerText = "Start"
  }
}

const start = (time = 1500) => {
  timer = setInterval(() => {
    const random = Math.floor(Math.random() * notes.length)
    note.innerHTML = notes[random]
    metronomeSound.play()
  }, time)
}

button.addEventListener('click', startStopHandler)

slider.addEventListener('change', () => {
  const val = slider.value
  if (button.innerText === 'Start') {
    button.innerText = 'Stop'
  }
  clearInterval(timer)
  start(val)
  bpm.innerText = Math.floor(((1000/val)*60)) + ' BPM'
})

document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    startStopHandler()
  }
})

document.onload = (() => {
  bpm.innerText = Math.floor(((1000/slider.value)*60)) + ' BPM'
  metronomeSound.src = './assets/files/tap.wav'
  metronomeSound.preload = 'auto'
})()
