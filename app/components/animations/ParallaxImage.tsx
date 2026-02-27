'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image, { ImageProps } from 'next/image';

interface ParallaxImageProps extends Omit<ImageProps, 'ref'> {
  containerClassName?: string;
  offset?: number;
}

export default function ParallaxImage({
  containerClassName = 'relative overflow-hidden h-full w-full',
  offset = 50,
  className,
  alt,
  src,
  ...props
}: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={containerClassName}>
      <motion.div style={{ y, height: '120%', width: '100%', position: 'absolute', top: '-10%', left: 0 }}>
        <Image
          src={src}
          alt={alt}
          className={`object-cover ${className || ''}`}
          fill
          {...props}
        />
      </motion.div>
    </div>
  );
}
