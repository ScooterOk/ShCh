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

let params = {
  color: '#f52b2b',
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
  const [color, setColor] = useState(params.color);
  const modalRef = useRef();
  const videoRef = useRef();
  const cursorPauseRef = useRef();
  const cursorPlayRef = useRef();

  useEffect(() => {
    const music = document.querySelector('#background-song');
    if (show) {
      position.x = initMousePosition.x;
      position.y = initMousePosition.y;
      setMousePosition(initMousePosition);
      setIsMuted(true);
      setIsPlay(true);
      videoRef.current.currentTime = 0;
      gsap.to(modalRef.current, {
        visibility: 'visible',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0px 100%)',
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => {
          isPlayed = !music.paused;
          videoRef.current.play();
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
    const currentTargets = isPlay
      ? cursorPauseRef.current.querySelectorAll('span')
      : cursorPlayRef.current.querySelectorAll('span');
    const nextTargets = !isPlay
      ? cursorPauseRef.current.querySelectorAll('span')
      : cursorPlayRef.current.querySelectorAll('span');

    gsap
      .timeline()
      .to(currentTargets, {
        duration: 0.1,
        opacity: 0,
        stagger: {
          amount: 0.25,
          grid: 'auto',
          from: 'random',
        },
        overwrite: true,
      })
      .add(() => setIsPlay(!isPlay))
      .fromTo(
        nextTargets,
        {
          opacity: 0,
        },
        {
          duration: 0.1,
          opacity: 1,
          stagger: {
            amount: 0.25,
            grid: 'auto',
            from: 'random',
          },
          overwrite: true,
        }
      );
  };

  const handleClickSound = () => {
    gsap.to(videoRef.current, {
      volume: isMute ? 1 : 0,
      duration: 1,
    });
    setIsMute(!isMute);
  };

  const handleSoundHover = (e) => {
    handleCursorOnHover(e);
    if (e.type === 'mouseenter') {
      gsap.to(params, {
        color: '#000000',
        duration: 0.75,
        ease: 'power4.Out',
        onUpdate: () => {
          setColor(params.color);
        },
      });
    } else {
      gsap.to(params, {
        color: '#f52b2b',
        duration: 1,
        ease: 'power4.inOut',
        onUpdate: () => {
          setColor(params.color);
        },
      });
    }
  };

  const handleCursorOnHover = (e) => {
    const currentTargets = isPlay
      ? cursorPauseRef.current.querySelectorAll('span')
      : cursorPlayRef.current.querySelectorAll('span');
    if (e.type === 'mouseenter') {
      gsap.to(currentTargets, {
        duration: 0.1,
        opacity: 0,
        stagger: {
          amount: 0.25,
          grid: 'auto',
          from: 'random',
        },
        overwrite: true,
      });
    } else {
      gsap.to(currentTargets, {
        duration: 0.1,
        opacity: 1,
        stagger: {
          amount: 0.3,
          grid: 'auto',
          from: 'random',
        },
        overwrite: true,
      });
    }
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
      <button
        className={styles.modal__close}
        onClick={onClose}
        onMouseEnter={handleCursorOnHover}
        onMouseLeave={handleCursorOnHover}
      >
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
        <button
          className={styles.controls__action}
          onClick={handleClickPlay}
          onMouseEnter={handleCursorOnHover}
          onMouseLeave={handleCursorOnHover}
        >
          {isPlay ? <IconPause /> : <IconPlay />}
        </button>
        <div className={styles.controls__sound}>
          <SoundButton
            active={!isMute}
            color={color}
            handleClick={handleClickSound}
            handleHover={handleSoundHover}
          />
        </div>
        <div className={styles.controls__timer}>{currentTime}</div>
      </div>
      <div className={styles.modal__cursor}>
        <div
          ref={cursorPauseRef}
          className={styles.modal__cursor_inner}
          style={{ display: isPlay ? 'block' : 'none' }}
        >
          {Array.from('Pause').map((l, i) => (
            <span key={`name-${l}-${i}-${l}`}>{l}</span>
          ))}
        </div>
        <div
          ref={cursorPlayRef}
          className={styles.modal__cursor_inner}
          style={{ display: !isPlay ? 'block' : 'none' }}
        >
          {Array.from('Play').map((l, i) => (
            <span key={`name-${l}-${i}-${l}`}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
