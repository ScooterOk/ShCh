'use client';
import Loader from '@/components/Loader/Loader';
import { heavensake } from '@/configs/works';
import WorksPageCredits from '@/features/Works/Credits/WorksPageCredits';
import WorksPageHero from '@/features/Works/Hero/WorksPageHero';
import NextWork from '@/features/Works/NextWork/NextWork';
import { mainContext } from '@/providers/MainProvider';
import React, { useContext } from 'react';

const medialist = [
  '/video/HEAVENSAKE/bg_preview_heavenSAKE.mp4',
  '/models/next_work.gltf',
  '/video/audio_hover.mp3',
];

const Heavensake = () => {
  const { isLoaded } = useContext(mainContext);

  return (
    <main>
      <WorksPageHero {...heavensake.hero} />
      <h1>Hello Heavensake!</h1>
      <WorksPageCredits credits={heavensake.credits} />
      <NextWork />
      {!isLoaded && <Loader medialist={medialist} />}
    </main>
  );
};

export default Heavensake;
