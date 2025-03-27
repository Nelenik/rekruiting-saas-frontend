'use client'
import { cn } from '@/lib/utils';
import React, {
  createContext,
  useContext,
  useRef,
  ReactNode
} from 'react';

interface ScrollContextType {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: ReactNode, className: string }> = ({ children, className }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollContext.Provider value={{ scrollContainerRef }}>
      <div ref={scrollContainerRef} className={cn(className)}>
        {children}
      </div>
    </ScrollContext.Provider>
  );
};

export const useScrollContainer = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScrollContainer must be used within a ScrollProvider');
  }
  return context;
};