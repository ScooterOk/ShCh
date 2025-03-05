import WorksPageHero from '@/features/Works/Hero/WorksPageHero';
import React from 'react';

const Heavensake = () => {
  return (
    <div>
      <WorksPageHero
        title={'HEAVENSAKE'}
        description={
          'HEAVENSAKE is a luxury sake brand that embodies a unique combination of Japanese tradition and French artistry, helmed by the acclaimed French cellar master Régis Camus. '
        }
        tags={['Brand Design']}
      />
      <h1>Hello Heavensake!</h1>
    </div>
  );
};

export default Heavensake;
