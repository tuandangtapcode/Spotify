import { BiShuffle } from "react-icons/bi"
import { RiSkipBackFill, RiSkipForwardFill } from "react-icons/ri"
import { FiRepeat } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import { ButtonCicleStyled } from "src/components/ButtonCustom/ButtonCircle/styled"
import { CurrentMusicStyled, SliderStyled } from "./styled"
import { useEffect, useRef, useState } from "react"
import { convertSecondsToMinutesAndSeconds, convertSecondsToMinutesAndSecondsWithView } from "src/lib/stringUtils"
import globalSlice from "src/redux/globalSlice"
import ListIcons from "../ListIcons"

const CurrentMusic = () => {

  const global = useSelector(globalSelector)
  const [currentTime, setCurrentTime] = useState()
  const [currentSlider, setCurrentSlider] = useState()
  const [volume, setVolume] = useState(1)
  const dispatch = useDispatch()
  const audioRef = useRef()

  const handleNextPreviousSong = (type) => {
    const indexCurrentSong = global?.songs.findIndex(i => i?._id === global?.currentSong?._id)
    if (type === 'prev') {
      if (indexCurrentSong === 0) {
        audioRef.current.currentTime = 0
        if (!!localStorage.getItem('currentTime')) {
          localStorage.removeItem('currentTime')
        }
        if (!!localStorage.getItem('currentSlider')) {
          localStorage.removeItem('currentSlider')
        }
        dispatch(globalSlice.actions.setIsPlay(false))
      } else {
        localStorage.setItem('currentSong', JSON.stringify(global?.songs[indexCurrentSong - 1]))
        if (!!localStorage.getItem('currentTime')) {
          localStorage.removeItem('currentTime')
        }
        if (!!localStorage.getItem('currentSlider')) {
          localStorage.removeItem('currentSlider')
        }
        dispatch(globalSlice.actions.setCurrentSong(global?.songs[indexCurrentSong - 1]))
        dispatch(globalSlice.actions.setIsPlay(false))
      }
    } else {
      if (indexCurrentSong === (global?.songs.length - 1)) {
        localStorage.setItem('currentSong', JSON.stringify(global?.songs[0]))
        if (!!localStorage.getItem('currentTime')) {
          localStorage.removeItem('currentTime')
        }
        if (!!localStorage.getItem('currentSlider')) {
          localStorage.removeItem('currentSlider')
        }
        dispatch(globalSlice.actions.setCurrentSong(global?.songs[0]))
        dispatch(globalSlice.actions.setIsPlay(false))
      } else {
        localStorage.setItem('currentSong', JSON.stringify(global?.songs[indexCurrentSong + 1]))
        if (!!localStorage.getItem('currentTime')) {
          localStorage.removeItem('currentTime')
        }
        if (!!localStorage.getItem('currentSlider')) {
          localStorage.removeItem('currentSlider')
        }
        dispatch(globalSlice.actions.setCurrentSong(global?.songs[indexCurrentSong + 1]))
        dispatch(globalSlice.actions.setIsPlay(false))
      }
    }
  }

  useEffect(() => {
    if (!!localStorage.getItem('currentTime')) {
      const time = localStorage.getItem('currentTime')
      audioRef.current.currentTime = time
      setCurrentTime(localStorage.getItem('currentTime'))
    }
    if (!!localStorage.getItem('currentSlider')) {
      setCurrentSlider(localStorage.getItem('currentSlider'))
    }
  }, [])

  useEffect(() => {
    if (!!audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (global?.isPlay) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [global?.isPlay, global?.currentSong])


  return (
    <CurrentMusicStyled >
      {
        localStorage.getItem('currentSong') ?
          <div className="current-music d-flex align-items-center" style={{ width: '20%' }}>
            <div className="mr-12">
              <img style={{ width: '40px', height: '40px' }} src={global?.currentSong?.AvatarPath} alt="" />
            </div>
            <div>
              <p className="text">{global?.currentSong?.Title}</p>
              {/* <p>{global?.currentSong?.title}</p> */}
            </div>
          </div>
          :
          <div className="current-music justify-content-flex-start" style={{ width: '20%' }}></div>
      }
      <div className="control-music" style={{ width: '40%' }}>
        <div className="control d-flex-sb" style={{ maxWidth: '200px', margin: 'auto' }}>
          <div className="icon-random">
            <BiShuffle className={localStorage.getItem('currentSong') ? "text fs-23" : "text-gray fs-23"} />
          </div>
          <div className="icon-previous">
            <RiSkipBackFill
              className={localStorage.getItem('currentSong') ? "text fs-23" : "text-gray fs-23"}
              onClick={() => {
                if (!!localStorage.getItem('currentSong')) {
                  handleNextPreviousSong('prev')
                } else return
              }}
            />
          </div>
          <div className="icon-play">
            <ButtonCicleStyled
              className={localStorage.getItem('currentSong') ? 'smallCircle normal icon-play' : 'smallCircle grayBackgroundColor icon-play'}
              onClick={() => {
                if (localStorage.getItem('currentSong')) {
                  if (global?.isPlay) {
                    audioRef.current.pause()
                    dispatch(globalSlice.actions.setIsPlay(false))
                  } else {
                    audioRef.current.play()
                    dispatch(globalSlice.actions.setIsPlay(true))
                  }
                } else return
              }}
              icon={
                global?.isPlay ?
                  ListIcons.ICON_PAUSE
                  :
                  ListIcons.ICON_PLAY
              }
            />
          </div>
          <div className="icon-next">
            <RiSkipForwardFill
              className={localStorage.getItem('currentSong') ? "text fs-23" : "text-gray fs-23"}
              onClick={() => {
                if (!!localStorage.getItem('currentSong')) {
                  handleNextPreviousSong('next')
                } else return
              }}
            />
          </div>
          <div className="icon-repeat">
            <FiRepeat className={localStorage.getItem('currentSong') ? "text fs-21" : "text-gray fs-21"} />
          </div>
        </div>
        <audio
          volume={volume}
          onTimeUpdate={() => {
            const currentSlider = Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)
            if (currentSlider === 100) {
              dispatch(globalSlice.actions.setIsPlay(false))
            }
            localStorage.setItem('currentTime', audioRef.current.currentTime)
            localStorage.setItem('currentSlider', currentSlider)
            setCurrentSlider(currentSlider)
          }}
          ref={audioRef}
          src={global?.currentSong?.AudioPath}
          alt=""
        />
        <div className="progress-bar d-flex">
          {
            !!localStorage.getItem('currentSong') ?
              <div className="text mt-7 fs-13">
                {convertSecondsToMinutesAndSecondsWithView(
                  !!audioRef.current ?
                    audioRef.current.currentTime
                    :
                    currentTime)}
              </div>
              :
              <div className="text-gray mt-3">--:--</div>
          }
          <div style={{ flex: 1 }}>
            <SliderStyled
              min={0}
              max={100}
              value={currentSlider}
              onChange={e => {
                audioRef.current.currentTime = e / 100 * audioRef.current.duration
                localStorage.setItem('currentSlider', e)
                setCurrentSlider(e)
              }}
            />
          </div>
          {
            !!localStorage.getItem('currentSong') ?
              <div className="text mt-7 fs-13">
                {convertSecondsToMinutesAndSeconds(global?.currentSong?.Time)}
              </div>
              :
              <div className="text-gray mt-3">--:--</div>
          }
        </div>
      </div>
      <div className="sound-control d-flex-end" style={{ width: '20%' }}>
        {
          volume === 0 && ListIcons.ICON_VOLUME_MUTE
        }
        {
          volume === 1 && ListIcons.ICON_VOLUME_UP
        }
        {
          (volume > 0 && volume < 1) && ListIcons.ICON_VOLUME_DOWN
        }
        <SliderStyled
          style={{ width: '100px' }}
          step={0.1}
          min={0}
          max={1}
          value={!!localStorage.getItem('currentSong') ? volume : 0}
          onChange={e => {
            setVolume(e)
          }}
        />
      </div>
    </CurrentMusicStyled>
  )
}

export default CurrentMusic