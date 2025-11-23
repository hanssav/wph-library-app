import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { type HeroSlidesType } from '../home.constants';

const HeroCarousel = ({ data }: { data: HeroSlidesType[] }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      className='w-full'
      opts={{ loop: true, align: 'start' }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data.map((slide) => (
          <CarouselItem key={slide.id} className='h-auto w-full'>
            <img
              src={slide.src}
              alt={slide.alt}
              className='w-full object-cover'
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className='flex-center gap-2 mt-4'>
        {data.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => api?.scrollTo(idx)}
            className={cn(
              'size-2.5 rounded-full transition-all',
              current === idx ? 'bg-primary-500' : 'bg-neutral-300'
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
};

export default HeroCarousel;
