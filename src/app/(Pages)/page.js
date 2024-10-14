'use client';
import { useContext } from 'react';
import styles from './page.module.scss';

import Loader from '@/components/Loader/Loader';
import { mainContext } from '@/providers/MainProvider';
import Hero from '@/pages/(Homepage)/Hero/Hero';
import FocusOn from '@/pages/(Homepage)/FocusOn/FocusOn';
// import FocusOn from '@/pages/(Homepage)/FocusOn/FocusOn';

export default function Home() {
  const { isLoaded, setIsLoaded, setNoScroll } = useContext(mainContext);

  return (
    <main className={styles.main}>
      <Hero isLoaded={isLoaded} />
      <FocusOn />
      {!isLoaded && (
        <Loader setIsLoaded={setIsLoaded} setNoScroll={setNoScroll} />
      )}
    </main>
  );
}
