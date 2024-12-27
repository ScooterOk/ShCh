import React, { useContext, useEffect, useRef, useState } from 'react';

import styles from './VideoPlayerModal.module.scss';
import gsap from 'gsap';

import { IconClose, IconPause, IconPlay } from '../icons';
import SoundButton from '../SoundButton/SoundButton';
import { mainContext } from '@/providers/MainProvider';

const position = {
  x: 0,
  y: 0,
};

let isPlayed;

const VideoPlayerModal = ({ show, onClose, initMousePosition }) => {
  const { setIsMuted } = useContext(mainContext);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [isPlay, setIsPlay] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: position.x,
    y: position.y,
  });
  const modalRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    const music = document.querySelector('#background-song');
    if (show) {
      position.x = initMousePosition.x;
      position.y = initMousePosition.y;
      setMousePosition(initMousePosition);
      setIsMuted(true);
      videoRef.current.currentTime = 0;
      gsap.to(modalRef.current, {
        visibility: 'visible',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0px 100%)',
        duration: 0.75,
        ease: 'power4.inOut',
        onComplete: () => {
          isPlayed = !music.paused;
          videoRef.current.play();
          setIsPlay(true);
          setIsMuted(true);
        },
      });
    } else {
      videoRef.current.pause();
      setIsPlay(false);
      gsap
        .timeline({
          onComplete: () => {
            if (isPlayed) setIsMuted(false);
          },
        })
        .to(modalRef.current, {
          clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)',
          duration: 0.75,
          ease: 'power4.inOut',
        })
        .set(modalRef.current, { visibility: 'hidden' });
    }
  }, [setIsMuted, show, initMousePosition]);

  useEffect(() => {
    const video = videoRef.current;
    let animationFrameId;

    const updateTimer = () => {
      if (video) {
        const time = video.currentTime;
        const minutes = Math.floor(time / 60)
          .toString()
          .padStart(2, '0');
        const seconds = Math.floor(time % 60)
          .toString()
          .padStart(2, '0');
        const milliseconds = Math.floor((time % 1) * 100)
          .toString()
          .padStart(2, '0');
        setCurrentTime(`${minutes}:${seconds}:${milliseconds}`);
        animationFrameId = requestAnimationFrame(updateTimer);
      }
    };

    if (video) {
      video.addEventListener('play', () => {
        animationFrameId = requestAnimationFrame(updateTimer);
      });

      video.addEventListener('pause', () => {
        cancelAnimationFrame(animationFrameId);
      });

      video.addEventListener('ended', () => {
        cancelAnimationFrame(animationFrameId);
      });
    }

    return () => {
      cancelAnimationFrame(animationFrameId); // Очищуємо анімацію при розмонтаженні
      if (video) {
        video.removeEventListener('play', updateTimer);
        video.removeEventListener('pause', updateTimer);
        video.removeEventListener('ended', updateTimer);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    gsap.to(position, {
      x: e.clientX,
      y: e.clientY,
      duration: 1,
      ease: 'power3.out',
      onUpdate: () => {
        setMousePosition({
          x: position.x,
          y: position.y,
        });
      },
    });
  };

  const handleClickPlay = () => {
    if (isPlay) videoRef.current.pause();
    if (!isPlay) videoRef.current.play();
    setIsPlay(!isPlay);
  };

  const handleClickSound = () => {
    gsap.to(videoRef.current, {
      volume: isMute ? 1 : 0,
      duration: 1,
    });
    setIsMute(!isMute);
  };

  return (
    <div
      className={styles.modal}
      ref={modalRef}
      style={{
        '--mouse-x': `${mousePosition.x}`,
        '--mouse-y': `${mousePosition.y}`,
      }}
    >
      <button className={styles.modal__close} onClick={onClose}>
        <IconClose />
      </button>
      <video
        ref={videoRef}
        className={styles.video}
        preload="auto"
        loop
        onMouseMove={handleMouseMove}
        onClick={handleClickPlay}
      >
        <source src="/video/showreel_churilov.mp4" type="video/mp4" />
      </video>
      <div className={styles.controls}>
        <button className={styles.controls__action} onClick={handleClickPlay}>
          {isPlay ? <IconPause /> : <IconPlay />}
        </button>
        <SoundButton active={!isMute} handleClick={handleClickSound} />
        <div className={styles.controls__timer}>{currentTime}</div>
      </div>
      <span className={styles.modal__cursor}>{isPlay ? 'Pause' : 'Play'}</span>
    </div>
  );
};

export default VideoPlayerModal;
