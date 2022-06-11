import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as Arrow } from './icons/arrow.svg';
import { ReactComponent as Play } from './icons/play.svg';
import { ReactComponent as Pause } from './icons/pause.svg';
import bel from './music/believer.mp3';
import rad from './music/redioactive.mp3';
import thu from './music/thunder.mp3';



import styles from './Player.module.scss';

const playList = [
  {
    src: bel
  },
  {
    src: rad,
  },
  {
    src: thu,
  }
];

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState('00:00');
  const [progress, setProgress] = useState(0);
  const [currentMusic, setCurrentMusic] = useState(0)
  const [isReady, setIsReady] = useState(false);

  const audioRef = useRef(new Audio(playList[currentMusic].src));
  const intervalRef = useRef();
  // const isReady = useRef(false);

  console.log('render')

  const { duration } = audioRef.current;

  const handlePrev = () => {
    if (currentMusic) {
      setCurrentMusic(currentMusic - 1);
    }
  }

  const handleNext = () => {
    if (currentMusic !== playList.length - 1) {
      setCurrentMusic(currentMusic + 1);
    }
  };

  useEffect(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    console.log('cure', playList[currentMusic].src)
    if (isReady) {
      audioRef.current.pause()
      audioRef.current = new Audio(playList[currentMusic].src);
      isPlaying && audioRef.current.play()
    }
  }, [currentMusic])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  return (
    <div className={styles.player}>
      <div className={styles.info_container}>
        <div className={styles.range_container}>
          <div className={styles.range} style={{ width: `${progress}%` }}>
          </div>
        </div>
        <div className={styles.time}>
          {time}
        </div>
      </div>
      <div className={styles.player_buttons}>
        <button className={styles.backward} onClick={handlePrev}>
          <Arrow />
        </button>
        <button className={styles.play} onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button className={styles.forward} onClick={handleNext}>
          <Arrow />
        </button>
      </div>
    </div>
  )
}

export default Player;