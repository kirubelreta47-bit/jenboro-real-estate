import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth followers using springs
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16); // offset for center
      cursorY.set(e.clientY - 16);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveMouse);
    
    // Add listeners for interactive elements
    const interactables = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block">
      {/* Orange Circle Follower */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          width: 32,
          height: 32,
          backgroundColor: isHovering ? 'transparent' : '#E87722',
          border: isHovering ? '2px solid #E87722' : '0px solid transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
        className="rounded-full"
      />

      {/* Small White Dot Center */}
      <div
        className="fixed w-1.5 h-1.5 bg-white rounded-full mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
