import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center gap-2.5 my-12">
        <div className="w-10 h-0.5 bg-pink-dark rounded-sm"></div>
        <h2 className="font-fredoka text-bluey-dark text-3xl font-bold flex items-center gap-2">
            {children}
        </h2>
        <div className="w-10 h-0.5 bg-pink-dark rounded-sm"></div>
    </div>
);

const VenueCard = ({ title, location, image, link, delay = 0 }: { title: string, location: string, image: string, link: string, delay?: number }) => (
    <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        whileHover={{ y: -5 }}
        transition={{ delay, type: "spring" }}
        className="bg-white rounded-3xl p-4 shadow-lg border border-white/50 relative h-full"
    >
        <div className="border-2 border-dashed border-bluey-light rounded-2xl p-5 h-full flex flex-col items-center text-center">
            <h3 className="text-bluey-dark font-bold text-xl mb-1 text-shadow-sm">{title}</h3>
            <p className="text-sm text-gray-500 mb-4">{location}</p>

            <div className="w-full h-[140px] bg-gray-100 rounded-xl mb-4 border border-gray-100 overflow-hidden relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="mt-auto">
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <Button variant="orange" className="px-5 py-2 text-sm cursor-pointer">
                        Ver ubicación
                    </Button>
                </a>
            </div>
        </div>
    </motion.div>
);

const VenueList = () => {
    return (
        <section className="px-4 mb-24 mt-16 relative">
            <SectionTitle>Lugar del evento</SectionTitle>

            <div className="relative max-w-md mx-auto mt-12">
                {/* Bluey - Left Decoration */}
                <motion.img
                    src="characters/Bluey.png"
                    alt="Bluey"
                    initial={{ scale: 0, opacity: 0, x: -20 }}
                    whileInView={{ scale: 1, opacity: 1, x: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        scale: { duration: 0.5, type: "spring" },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -left-16 -bottom-8 w-32 md:w-48 md:-left-55 md:bottom-0 z-10 hidden sm:block"
                />
                {/* Mobile: Smaller & Cornered */}
                <motion.img
                    src="characters/Bluey.png"
                    alt="Bluey"
                    className="absolute -left-6 -bottom-6 w-24 sm:hidden z-20 pointer-events-none"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Bingo - Right Decoration */}
                <motion.img
                    src="characters/bingo.png"
                    alt="Bingo"
                    initial={{ scale: 0, opacity: 0, x: 20 }}
                    whileInView={{ scale: 1, opacity: 1, x: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        scale: { duration: 0.5, type: "spring", delay: 0.2 },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                    }}
                    className="absolute -right-16 -bottom-8 w-28 md:w-44 md:-right-50 md:bottom-0 z-10 hidden sm:block"
                />
                {/* Mobile: Smaller & Cornered */}
                <motion.img
                    src="characters/bingo.png"
                    alt="Bingo"
                    className="absolute -right-6 -bottom-6 w-20 sm:hidden z-20 pointer-events-none"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />

                {/* Central Card */}
                <div className="relative z-0">
                    <VenueCard
                        title="¡Los esperamos en casa!"
                        location='La casa de Julieta se llena de alegría para celebrar su primer año.'
                        image="/bg-salon.png"
                        link="https://maps.app.goo.gl/Rp1kvsXvQ8N31r3W6"
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
};

export default VenueList;
