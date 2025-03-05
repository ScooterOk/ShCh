import { heavensake } from '@/configs/works';
import WorksPageCredits from '@/features/Works/Credits/WorksPageCredits';
import WorksPageHero from '@/features/Works/Hero/WorksPageHero';
import React from 'react';

const Heavensake = () => {
  return (
    <div>
      <WorksPageHero {...heavensake.hero} />
      <h1>Hello Heavensake!</h1>
      <WorksPageCredits credits={heavensake.credits} />
    </div>
  );
};

export default Heavensake;
