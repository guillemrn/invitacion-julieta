import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Button from './ui/Button';

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        // Fecha objetivo: 22 de Febrero 2026, 1:00 PM
        const targetDate = new Date("February 22, 2026 13:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                setIsExpired(true);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    const TimeUnit = ({ value, label, colorClass }: { value: number, label: string, colorClass: string }) => (
        <div className={`w-[65px] h-[65px] sm:w-[85px] sm:h-[85px] rounded-full flex flex-col justify-center items-center text-white font-bold shadow-[inset_0_-3px_0_rgba(0,0,0,0.1)] ${colorClass}`}>
            <span className="text-xl sm:text-3xl leading-none font-fredoka">{value < 10 ? `0${value}` : value}</span>
            <span className="text-[0.6rem] sm:text-xs uppercase mt-1 font-quicksand">{label}</span>
        </div>
    );

    return (
        <motion.section
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className={`
                bg-white/90 backdrop-blur-md 
                rounded-[40px] shadow-2xl mx-auto 
                w-full md:max-w-[600px] relative mt-6
                overflow-hidden
                ${isExpired ? 'border-b-[6px] border-bluey-cream' : 'py-6 px-4 sm:px-8'}
            `}
        >
            {isExpired ? (
                <div className="relative p-8 md:p-12 overflow-hidden flex flex-col items-center">
                    {/* Festive Backdrop */}
                    <div className="absolute inset-0 z-0 opacity-40">
                        <DotLottieReact
                            src="/Celebration.lottie"
                            loop
                            autoplay
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <div className="relative z-10 text-center flex flex-col items-center">
                        <h3 className="font-fredoka font-black text-3xl md:text-5xl text-bluey-dark mb-4 leading-tight">
                            ¡Hoy es el gran día!
                        </h3>
                        <p className="font-quicksand font-bold text-lg md:text-2xl text-gray-500 mb-8 max-w-[400px]">
                            Julieta está cumpliendo su primer añito. ¡Acompáñanos a celebrar!
                        </p>

                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Jardin+Las+Nubes+Zapotlanejo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button variant="orange" className="w-full sm:px-12 py-5 text-xl">
                                Cómo llegar
                            </Button>
                        </a>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex justify-center gap-3 sm:gap-6 mb-3 flex-wrap">
                        <TimeUnit value={timeLeft.days} label="Días" colorClass="bg-bluey-dark" />
                        <TimeUnit value={timeLeft.hours} label="Horas" colorClass="bg-bluey-orange-dark" />
                        <TimeUnit value={timeLeft.minutes} label="Mins" colorClass="bg-bluey-light" />
                        <TimeUnit value={timeLeft.seconds} label="Segs" colorClass="bg-bluey-orange-light" />
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-xl font-fredoka font-bold text-gray-500">22 · Febrero · 2026</p>
                        <div className="text-sm font-quicksand font-medium text-gray-400 mt-1">Zapotlanejo, Jalisco</div>
                    </div>
                </>
            )}
        </motion.section>
    );
};

export default Countdown;
