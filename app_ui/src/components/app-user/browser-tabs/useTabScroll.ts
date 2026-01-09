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
    
    // Add native wheel event listener with passive: false to allow preventDefault
    const tabsElement = tabsRef.current;
    const handleNativeWheel = (e: WheelEvent) => {
      if (tabsElement) {
        const { scrollWidth, clientWidth } = tabsElement;
        const hasHorizontalScroll = scrollWidth > clientWidth;
        
        if (hasHorizontalScroll) {
          e.preventDefault();
          e.stopPropagation();
          tabsElement.scrollLeft += e.deltaY;
          updateScrollButtons();
        }
      }
    };
    
    if (tabsElement) {
      tabsElement.addEventListener('wheel', handleNativeWheel, { passive: false });
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (tabsElement) {
        tabsElement.removeEventListener('wheel', handleNativeWheel);
      }
    };
  }, [tabs]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // This is now handled by native event listener above
    // Keeping this function for backward compatibility
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