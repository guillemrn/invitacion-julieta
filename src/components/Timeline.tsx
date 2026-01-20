import { motion } from 'framer-motion';
import SectionTitle from './ui/SectionTitle';

interface ItineraryItem {
    time: string;
    description: string;
}

const ITINERARY: ItineraryItem[] = [
    { time: '1:00 PM', description: 'Llegada y Bienvenida' },
    { time: '2:00 PM', description: 'Comida y Snacks' },
    { time: '5:00 PM', description: 'Pastel y Piñata' },
    { time: '7:00 PM', description: 'Fin del evento' }
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Timeline = () => {
    return (
        <section className="px-4 py-20 max-w-2xl mx-auto relative overflow-hidden">
            <SectionTitle>Itinerario</SectionTitle>

            <div className="relative">
                {/* Vertical Dotted Line */}
                <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[4px] border-l-4 border-dashed border-bluey-cream/60 -translate-x-[2px] z-0"></div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="flex flex-col gap-12 relative z-10"
                >
                    {ITINERARY.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const bgColor = isEven ? 'bg-bluey-light' : 'bg-bluey-orange-light';
                        const borderColor = isEven ? 'border-bluey-dark' : 'border-bluey-orange-dark';

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Marker Dot on line */}
                                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-bluey-cream z-20"></div>

                                {/* Card Container */}
                                <div className="w-full md:w-[45%]">
                                    <div className={`
                                        ${bgColor} 
                                        ${borderColor} 
                                        border-2 border-b-[6px] 
                                        rounded-[2rem] 
                                        p-6 md:p-8 
                                        text-center 
                                        transform transition-transform hover:scale-[1.02]
                                    `}>
                                        <div className="font-fredoka font-black text-3xl md:text-4xl text-bluey-dark mb-2">
                                            {item.time}
                                        </div>
                                        <div className="font-quicksand font-bold text-lg md:text-xl text-bluey-dark/80">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>

                                {/* Spacer for the other side on desktop */}
                                <div className="hidden md:block md:w-[45%]"></div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Timeline;
