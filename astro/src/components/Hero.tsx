import { motion } from 'framer-motion';

import Particles from './Particles';

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 -z-10 bg-gradient-radial"></div>
      <Particles />
      <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full blur-3xl bg-accent/20" />
      <div className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full blur-3xl bg-accent2/20" />

      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tight"
        >
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2">FOCUS</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 md:mt-6 text-white/80 max-w-2xl mx-auto text-lg"
        >
          A vibrant community that fosters innovation and excellence in the CSE Department at KL University.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 flex gap-4 justify-center"
        >
          <a href="/klfocus/about" className="px-6 py-3 rounded-full bg-gradient-to-r from-accent to-accent2 text-black font-semibold shadow-glow">Learn More</a>
          <a href="/klfocus/contact" className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition">Get in Touch</a>
        </motion.div>
      </div>
    </section>
  );
}
