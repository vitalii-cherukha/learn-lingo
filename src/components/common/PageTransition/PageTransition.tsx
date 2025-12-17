import { motion } from "motion/react";
import type { Transition } from "motion/react";
import type { ReactNode } from "react";

// const pageVariants = {
//   initial: {
//     opacity: 0,

//     filter: "blur(12px)",
//   },
//   animate: {
//     opacity: 1,

//     filter: "blur(0px)",
//   },
//   exit: {
//     opacity: 0,

//     filter: "blur(12px)",
//   },
// };

const pageVariants = {
  initial: {
    opacity: 0,
    y: -60,
    filter: "blur(12px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -60,
    filter: "blur(12px)",
  },
};

const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
