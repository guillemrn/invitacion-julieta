import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Fecha objetivo: 22 de Febrero 2026, 1:00 PM
        const targetDate = new Date("February 22, 2026 13:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const TimeUnit = ({ value, label, colorClass }: { value: number, label: string, colorClass: string }) => (
        <div className={`w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full flex flex-col justify-center items-center text-white font-bold shadow-[inset_0_-3px_0_rgba(0,0,0,0.1)] ${colorClass}`}>
            <span className="text-xl sm:text-3xl leading-none font-fredoka">{value < 10 ? `0${value}` : value}</span>
            <span className="text-[0.6rem] sm:text-xs uppercase mt-1 font-quicksand">{label}</span>
        </div>
    );

    return (
        <motion.section
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="bg-white/90 backdrop-blur-md rounded-[40px] py-6 px-8 shadow-2xl mx-auto max-w-[600px] relative mt-6"
        >
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
        </motion.section>
    );
};

export default Countdown;
