
import React, { useState, useEffect, useRef } from 'react';

interface StatCounterProps {
  value: string;
  suffix: string;
  label: string;
  duration?: number;
  icon?: React.ReactNode;
}

const StatCounter: React.FC<StatCounterProps> = ({ value, suffix, label, duration = 2000, icon }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);
  
  // Parse numeric value
  const target = parseFloat(value);
  const isFloat = value.includes('.');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, target]);

  const startAnimation = () => {
    let startTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing: easeOutQuart
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      
      const currentCount = easedProgress * target;
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  };

  const displayValue = isFloat ? count.toFixed(1) : Math.floor(count);

  return (
    <div 
      ref={countRef} 
      className="text-center space-y-3 group"
      aria-label={`${label}: ${value}${suffix}`}
    >
      {icon && (
        <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-accent/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
      <div className="text-5xl md:text-7xl lg:text-8xl font-black text-accent tracking-tighter drop-shadow-sm font-sans tabular-nums">
        <span aria-hidden="true">{displayValue}{suffix}</span>
        <span className="sr-only">{value}{suffix}</span>
      </div>
      <div className="text-[11px] uppercase font-black text-ink/40 dark:text-ink/30 tracking-[0.25em] group-hover:text-accent transition-colors">
        {label}
      </div>
    </div>
  );
};

export default StatCounter;
