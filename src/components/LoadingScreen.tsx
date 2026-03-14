"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 40);
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#080808]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="mb-2 text-5xl font-black tracking-tight">
              RS<span className="text-[#DC2626]">.</span>
            </div>
            <div className="mb-8 text-xs uppercase tracking-[0.4em] text-white/20">
              Creative Editor
            </div>
            <div className="relative mx-auto h-px w-48 overflow-hidden bg-white/10">
              <motion.div
                className="absolute left-0 top-0 h-full bg-[#DC2626]"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-3 text-xs tabular-nums text-white/20">{count}%</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
