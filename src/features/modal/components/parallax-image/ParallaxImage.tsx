import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './ParallaxImage.module.css';

interface ParallaxImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  intensity?: number;
  className?: string;
}

interface RotateState {
  x: number;
  y: number;
}


const ParallaxImage: React.FC<ParallaxImageProps> = ({
    src,
    width = 300,
    height = 400,
    intensity = 8,
}) => {
    const [rotate, setRotate] = useState<RotateState>({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState<boolean>(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !isHovered) return;

            const rect = containerRef.current.getBoundingClientRect();
            
            // Вычисляем центр элемента
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Вычисляем позицию мыши относительно центра
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            // Нормализуем значения для поворота
            const rotateY = (mouseX / (rect.width / 2)) * intensity;
            const rotateX = -(mouseY / (rect.height / 2)) * intensity;
            
            setRotate({ x: rotateX, y: rotateY });

        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            setRotate({ x: 0, y: 0 });
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        const element = containerRef.current;

        if (element) {
            element.addEventListener('mousemove', handleMouseMove);
            element.addEventListener('mouseleave', handleMouseLeave);
            element.addEventListener('mouseenter', handleMouseEnter);
        }

        return () => {
            if (element) {
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('mouseleave', handleMouseLeave);
                element.removeEventListener('mouseenter', handleMouseEnter);
            }
        };
    }, [isHovered, intensity]);


    return (
        <div className={clsx(styles.parallaxContainer)}>
            <div 
                ref={containerRef}
                className={styles.parallaxCard}
                style={{
                width: width,
                height: height,
                }}
            >
                <div 
                    className={styles.parallaxInner}
                    style={{
                        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.05, 1.05, 1.05)`,
                        transition: isHovered ? 'none' : 'transform 0.5s ease',
                    }}
                >
                    <div className={styles.imageWrapper}>
                        <img 
                            ref={imageRef}
                            src={src}
                            className={styles.parallaxImage}
                            loading="lazy"
                        />
                        
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
};

export default ParallaxImage;