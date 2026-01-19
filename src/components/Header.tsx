
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { useSearchParams } from 'react-router-dom';
import Countdown from './Countdown';

const Header = () => {
    const [searchParams] = useSearchParams();
    const guestName = searchParams.get('invitado') || searchParams.get('guest');
    return (
        <header className="relative z-30 w-screen h-screen flex flex-col items-center justify-center bg-[url('/casa-bluey.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
            {/* Darker overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            <div className="relative z-10 flex flex-col items-center px-4 w-full h-full justify-center">
                {/* Casa Bluey Hero - Full Viewport */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                    className="text-center flex flex-col items-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10
                        }}
                        className="mb-4"
                    >
                        <h1 className="font-fredoka text-5xl md:text-8xl text-white drop-shadow-2xl leading-tight text-center">
                            ¡Nuestra pequeña <br className="md:hidden" />
                            <span className="font-black text-6xl md:text-9xl">Julieta</span>
                            <br className="md:hidden" /> cumple <span className="font-black text-6xl md:text-9xl">1</span>!
                        </h1>
                    </motion.div>

                    <h2 className="text-xl md:text-3xl text-white font-bold mb-8 drop-shadow-lg font-quicksand max-w-3xl leading-snug">
                        {guestName ? (
                            <>
                                ¡<span className="font-black">{guestName}</span>, acompáñanos a celebrar un año lleno de juegos, magia y mucha diversión!
                            </>
                        ) : (
                            "Acompáñanos a celebrar un año lleno de juegos, magia y mucha diversión"
                        )}
                    </h2>

                    <a href="#rsvp" className="mb-10 w-full px-6 md:w-auto block mt-8">
                        <Button className="w-full md:w-auto px-8 py-4 text-xl">Confirma tu asistencia</Button>
                    </a>

                    {/* Countdown Integrated in Hero */}
                    <div className="w-full px-4 md:px-0 md:w-auto">
                        <Countdown />
                    </div>
                </motion.div>
            </div>
        </header>
    );
};

export default Header;
