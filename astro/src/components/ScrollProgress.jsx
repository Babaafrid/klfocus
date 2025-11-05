import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      setWidth(progress);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div aria-hidden className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-[60]">
      <div className="h-full bg-gradient-to-r from-accent to-accent2 transition-[width] duration-150" style={{ width: `${width}%` }} />
    </div>
  );
}
