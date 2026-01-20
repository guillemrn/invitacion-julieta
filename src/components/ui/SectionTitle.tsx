import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
}

const SectionTitle = ({ children, className = "" }: SectionTitleProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col items-center gap-2 mb-12 sm:mb-16 ${className}`}
        >
            <h2 className="font-fredoka text-bluey-dark text-4xl md:text-6xl font-black text-center leading-tight drop-shadow-sm">
                {children}
            </h2>
            <div className="w-24 h-1.5 bg-bluey-cream rounded-full"></div>
        </motion.div>
    );
};

export default SectionTitle;
