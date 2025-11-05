import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function SectionCard({ title, children, img, delay = 0 }: { title: string; children: ReactNode; img?: string; delay?: number; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-2xl overflow-hidden bg-card border border-white/10 backdrop-blur p-6 shadow-lg hover:shadow-glow transition"
    >
      {img && (
        <div className="h-56 w-full overflow-hidden rounded-xl mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="text-white/80 leading-relaxed">{children}</div>
    </motion.div>
  );
}
