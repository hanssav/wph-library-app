import { motion, AnimatePresence } from 'framer-motion';
import { useCartCount } from '@/hooks';
import { CART_PATH } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Handbag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

type ShoppingCartProps = {
  isLoggedIn: boolean;
  className?: string;
};

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isLoggedIn,
  className,
}) => {
  const navigate = useNavigate();
  const { count } = useCartCount();
  const [prevCount, setPrevCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (count > prevCount) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1500);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  return (
    <div
      className={cn(
        'relative flex-center cursor-pointer',
        !isLoggedIn && 'md:hidden',
        className
      )}
      onClick={() => navigate(CART_PATH)}
    >
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className='absolute inset-0 rounded-full bg-[#EE1D52]'
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
        className='absolute size-5 -right-2 md:-right-1 -translate-y-1/2 bg-[#EE1D52] rounded-full text-white text-[12px] aspect-square flex-center z-20'
      >
        {count}
      </motion.div>
      <motion.div
        animate={isAnimating ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Handbag className='size-6 md:size-8 relative z-10' />
      </motion.div>
    </div>
  );
};
