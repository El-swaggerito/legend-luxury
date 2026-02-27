'use client';

import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface StaggerContainerProps {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  viewport?: { once: boolean; margin: string };
  as?: 'div' | 'ul' | 'ol' | 'section';
}

export default function StaggerContainer({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = '',
  viewport = { once: true, margin: '-50px' },
  as = 'div'
}: StaggerContainerProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: viewport.once, margin: viewport.margin as any });
  const controls = useAnimation();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const Component = motion[as] as any;

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={className}
    >
      {children}
    </Component>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.25, 0.25, 0.75],
    }
  },
};

export function StaggerItem({ children, className = '', as = 'div' }: { children: React.ReactNode, className?: string, as?: 'div' | 'li' }) {
  const Component = motion[as] as any;
  return (
    <Component variants={staggerItem} className={className}>
      {children}
    </Component>
  );
}
