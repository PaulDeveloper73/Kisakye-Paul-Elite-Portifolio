
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import type { Testimonial } from '../types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Update visible items count based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleItems(3);
      else if (window.innerWidth >= 768) setVisibleItems(2);
      else setVisibleItems(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // For infinite looping, we bracket the original list with clones
  // Clone the last few items to the front, and the first few items to the back
  const extendedTestimonials = [
    ...testimonials.slice(-visibleItems),
    ...testimonials,
    ...testimonials.slice(0, visibleItems),
  ];

  // Set the initial index to point to the start of the original testimonials
  useEffect(() => {
    setCurrentIndex(visibleItems);
  }, [visibleItems]);

  const handleNext = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Jump logic to create a seamless infinite loop effect
  useEffect(() => {
    const totalOriginal = testimonials.length;
    
    // Scrolled past the end: jump back to start of original list
    if (currentIndex >= totalOriginal + visibleItems) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(visibleItems);
      }, 700);
      return () => clearTimeout(timer);
    }
    
    // Scrolled before the beginning: jump to end of original list
    if (currentIndex <= 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalOriginal);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, testimonials.length, visibleItems]);

  // Re-enable transitions after a jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Auto-play interval management
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(handleNext, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, handleNext]);

  const totalPages = Math.ceil(testimonials.length / visibleItems);
  const activePage = Math.floor(((currentIndex - visibleItems) % testimonials.length + testimonials.length) % testimonials.length / visibleItems);

  // Correct Translation Calculation:
  // Each item in the flex container has a width of (100 / extendedTestimonials.length)%
  // To move by 1 item, we translate by that percentage.
  const translatePercentage = currentIndex * (100 / extendedTestimonials.length);

  return (
    <div 
      className="relative w-full mx-auto group/carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Testimonials Carousel"
    >
      <div className="overflow-hidden px-1 md:px-0">
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]' : ''}`}
          style={{ 
            transform: `translateX(-${translatePercentage}%)`,
            width: `${(extendedTestimonials.length / visibleItems) * 100}%`
          }}
        >
          {extendedTestimonials.map((t, idx) => (
            <div 
              key={`${t.id}-${idx}`} 
              className="px-3"
              style={{ width: `${100 / extendedTestimonials.length}%` }}
            >
              <div className="h-full glass p-8 md:p-10 rounded-[2.5rem] border-accent/10 shadow-lg hover:border-accent/40 hover:shadow-accent-lg hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group/card relative overflow-hidden bg-bg1/40">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover/card:scale-125 group-hover/card:rotate-12 transition-transform duration-700 pointer-events-none">
                  <Quote className="w-24 h-24 md:w-28 md:h-28 text-accent" />
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex gap-1 text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl font-medium text-ink/70 dark:text-ink/80 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-5 mt-10 pt-8 border-t border-accent/10 relative z-10">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-accent blur-md opacity-20 rounded-full" />
                    <img 
                      src={t.avatar} 
                      alt={t.name} 
                      className="w-14 h-14 rounded-full border-2 border-accent/30 relative z-10 object-cover shadow-sm transition-transform duration-500 group-hover/card:scale-110" 
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-black text-xl text-ink tracking-tight truncate group-hover/card:text-accent transition-colors">
                      {t.name}
                    </h4>
                    <p className="text-[10px] font-black text-accent/60 uppercase tracking-widest leading-none mt-1.5 truncate">
                      {t.role} @ {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-16 -right-16 justify-between pointer-events-none">
        <button 
          onClick={handlePrev}
          className="w-14 h-14 rounded-full glass border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all shadow-xl active:scale-90 pointer-events-auto opacity-0 group-hover/carousel:opacity-100 hover:shadow-accent"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button 
          onClick={handleNext}
          className="w-14 h-14 rounded-full glass border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all shadow-xl active:scale-90 pointer-events-auto opacity-0 group-hover/carousel:opacity-100 hover:shadow-accent"
          aria-label="Next Testimonial"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-4 mt-14">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * visibleItems + visibleItems)}
            className={`transition-all duration-500 rounded-full ${
              activePage === index 
                ? 'w-12 h-2.5 bg-accent shadow-accent' 
                : 'w-2.5 h-2.5 bg-accent/20 hover:bg-accent/50'
            }`}
            aria-label={`Go to slide group ${index + 1}`}
            aria-current={activePage === index}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
