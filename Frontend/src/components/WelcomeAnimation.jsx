
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WelcomeAnimation = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-green-900 text-white z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to Eventify
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeAnimation;
