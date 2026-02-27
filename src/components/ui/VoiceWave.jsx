import React from 'react';
import { motion } from 'framer-motion';

const VoiceWave = ({ isPlaying }) => {
    return (
        <div className="flex items-center justify-center gap-1 h-12">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1.5 bg-blue-500 rounded-full"
                    animate={{
                        height: isPlaying ? [10, 30, 15, 40, 10] : 10,
                        opacity: isPlaying ? 1 : 0.5,
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.1,
                        ease: "easeInOut",
                    }}
                    style={{ height: 10 }}
                />
            ))}
        </div>
    );
};

export default VoiceWave;
