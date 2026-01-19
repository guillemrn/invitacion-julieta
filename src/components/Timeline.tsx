import { motion } from 'framer-motion';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center gap-4 my-12">
        <h2 className="font-fredoka text-bluey-dark text-3xl font-bold">
            {children}
        </h2>
    </div>
);

const TimelineItem = ({ time, title, delay }: { time: string, title: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex gap-6 items-start relative pl-8 pb-12 last:pb-0"
    >
        {/* Line */}
        <div className="absolute left-[10px] top-2 w-[6px] h-full bg-bluey-orange-light rounded-full -z-10 last:hidden"></div>

        {/* Marker */}
        <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-bluey-orange-light border-4 border-white shadow-sm flex-shrink-0"></div>

        <div className="flex flex-col">
            <span className="font-fredoka font-bold text-bluey-dark text-xl">{time}</span>
            <span className="font-quicksand font-medium text-gray-600 text-lg">{title}</span>
        </div>
    </motion.div>
);

const Timeline = () => {
    return (
        <section className="px-4 mb-24 max-w-2xl mx-auto">
            <SectionTitle>Itinerario</SectionTitle>

            <div className="ml-4 md:ml-0">
                <TimelineItem time="12:30 PM" title="Ceremonia Religiosa" delay={0.1} />
                <TimelineItem time="1:30 PM" title="Recepción en Jardín" delay={0.2} />
                <TimelineItem time="2:30 PM" title="Comida" delay={0.3} />
                <TimelineItem time="5:00 PM" title="Pastel y Piñata" delay={0.4} />
                <TimelineItem time="8:00 PM" title="Fin del evento" delay={0.5} />
            </div>
        </section>
    );
};

export default Timeline;
