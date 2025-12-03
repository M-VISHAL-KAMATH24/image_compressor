import { motion } from 'framer-motion'

const shapes = [
  { type: 'circle', color: 'from-yellow-500 to-orange-900', size: 'w-32 h-32' },
  { type: 'square', color: 'from-orange-500 to-pink-900', size: 'w-24 h-24' },
  { type: 'triangle', color: 'from-pink-500 to-rose-900', size: 'w-20 h-20' },
  { type: 'circle', color: 'from-indigo-500 to-blue-900', size: 'w-28 h-28' },
  { type: 'square', color: 'from-emerald-500 to-teal-900', size: 'w-20 h-20' },
  { type: 'triangle', color: 'from-purple-500 to-violet-900', size: 'w-24 h-24' },
  { type: 'circle', color: 'from-lime-500 to-yellow-900', size: 'w-16 h-16' },
  { type: 'square', color: 'from-sky-500 to-cyan-900', size: 'w-28 h-28' },
  { type: 'triangle', color: 'from-amber-500 to-orange-900', size: 'w-18 h-18' },
  { type: 'circle', color: 'from-rose-500 to-pink-900', size: 'w-22 h-22' }
]

export default function BackgroundShapes() {
  return (
    <>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.size} bg-gradient-to-r ${shape.color} rounded-full opacity-20 blur-xl ${shape.type === 'square' ? 'rounded-xl' : ''}`}
          style={{
            clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
            left: `${10 + i * 8}%`,
            top: `${15 + i * 7}%`
          }}
          animate={{
            x: [0, 1000, -1000, 0],
            y: [0, 200, -200, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  )
}
