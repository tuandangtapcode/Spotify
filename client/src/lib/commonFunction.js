import globalSlice from "src/redux/globalSlice"

export const setLocalStorage = (name, value) => {
  return localStorage.setItem(name, value)
}

export const getLocalStorage = (name) => {
  return localStorage.getItem(name)
}

export const removeLocalStorage = (name) => {
  return localStorage.removeItem(name)
}

export const handleSetCurrentMusic = (
  UserID,
  record,
  dispatch,
  navigate
) => {
  if (UserID) {
    setLocalStorage('currentSong', JSON.stringify(record))
    if (!!getLocalStorage('currentTime')) {
      removeLocalStorage('currentTime')
    }
    if (!!getLocalStorage('currentSlider')) {
      removeLocalStorage('currentSlider')
    }
    dispatch(globalSlice.actions.setCurrentSong(record))
    dispatch(globalSlice.actions.setIsPlay(true))
  } else {
    navigate('/login')
  }
}