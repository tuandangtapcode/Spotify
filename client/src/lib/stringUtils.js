
export const getRegexEmail = () => {
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  return re
}

export const getRegexPassowrd = () => {
  const re = /^[A-Z][a-zA-Z0-9]{5,}$/
  return re
}

export const formatNumber = (number) => {
  var formattedNumber = number.toLocaleString('en-US').replace(/,/g, '.')
  return formattedNumber
}

export const convertSecondsToMinutesAndSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSeconds).padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}

export const convertSecondsToMinutesAndSecondsWithView = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds - minutes * 60)
  const currentTime = buildTimeFormat(minutes) + ':' + buildTimeFormat(remainingSeconds)

  return currentTime
}

const buildTimeFormat = (time) => {
  const symbol = '0'
  const length = 2
  return (new Array(length + 1).join(symbol) + time).slice(-length)
}
