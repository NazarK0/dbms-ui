/**
 * Custom hook for managing tab scrolling
 */

import { useRef, useEffect, useState } from 'react';
import { calculateScrollState } from './utils';
import type { Tab } from './types';

export function useTabScroll(tabs: Tab[]) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      const scrollState = calculateScrollState(scrollLeft, scrollWidth, clientWidth);
      setCanScrollLeft(scrollState.canScrollLeft);
      setCanScrollRight(scrollState.canScrollRight);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tabs]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (tabsRef.current) {
      e.preventDefault();
      tabsRef.current.scrollLeft += e.deltaY;
      updateScrollButtons();
    }
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
      setTimeout(updateScrollButtons, 100);
    }
  };

  return {
    tabsRef,
    canScrollLeft,
    canScrollRight,
    handleWheel,
    scrollTabs,
    updateScrollButtons,
  };
}
