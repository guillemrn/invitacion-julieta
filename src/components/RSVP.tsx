import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { sendRSVP } from '../services/rsvpService';
import { Loader2, Check, Minus, Plus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const RSVP = () => {
    const [searchParams] = useSearchParams();
    // Default values if URL params are missing
    const guestName = searchParams.get('invitado') || '';
    const totalSpots = parseInt(searchParams.get('cupos') || '0', 10);

    const [confirmedSpots, setConfirmedSpots] = useState(1);
    const [status, setStatus] = useState<'idle' | 'mode-selection' | 'counting' | 'sending' | 'success' | 'error'>('idle');

    // If no params, fallback to simple view or hide specific logic? 
    // Requirement says: "Si no hay nombre... saludo genérico" (handled in Header). 
    // Here we'll default to manual input if no params, or just show a generic form.
    // Given the strict requirement for "Dynamic based on URL", let's assume valid URLs 
    // or handle the "no param" case gracefully.

    useEffect(() => {
        if (guestName && totalSpots > 0) {
            setStatus('mode-selection');
            setConfirmedSpots(totalSpots); // Default to max
        } else {
            // Fallback for direct access without params
            // For now, let's keep it simple or maybe redirect/show generic
            setStatus('mode-selection'); // Still show selection but maybe with defaults
        }
    }, [guestName, totalSpots]);

    const handleConfirmAll = () => {
        submitRSVP(totalSpots);
    };

    const handlePartial = () => {
        setStatus('counting');
        setConfirmedSpots(Math.max(1, totalSpots - 1)); // Default to one less
    };

    const increment = () => {
        if (confirmedSpots < totalSpots) setConfirmedSpots(prev => prev + 1);
    };

    const decrement = () => {
        if (confirmedSpots > 1) setConfirmedSpots(prev => prev - 1);
    };

    const submitRSVP = async (spots: number) => {
        setStatus('sending');
        try {
            await sendRSVP({
                nombre: guestName || 'Invitado',
                cupos_totales: totalSpots || 0,
                cupos_confirmados: spots,
                asistira: spots > 0
            });
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <footer id="rsvp" className="mt-16 bg-gradient-to-t from-white/80 to-transparent pt-10 px-5 rounded-t-[30px] pb-10">
            <div className="w-[150px] h-[150px] mx-auto mb-4 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/Heeler-Car-1.png')" }}></div>

            <h2 className="text-bluey-dark font-black text-4xl mb-4 text-center font-fredoka">
                Confirmar Asistencia
            </h2>

            <p className="text-xl text-gray-600 max-w-[600px] mx-auto mb-10 text-center leading-relaxed font-quicksand font-medium">
                {guestName ? (
                    <>
                        Hola <strong className="text-bluey-orange-dark">{guestName}</strong>, tienes{' '}
                        <strong className="text-bluey-dark text-2xl">{totalSpots}</strong> boletos reservados para tu grupo.
                    </>
                ) : (
                    "Por favor confirma tu asistencia para acompañarnos en este día especial."
                )}
            </p>

            <div className="max-w-[500px] mx-auto min-h-[200px] relative">
                <AnimatePresence mode='wait'>
                    {status === 'mode-selection' && (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="flex flex-col gap-6"
                        >
                            <Button
                                onClick={handleConfirmAll}
                                className="w-full px-8 py-6 text-lg md:text-2xl"
                                variant="primary"
                            >
                                <span className="flex items-center justify-center gap-3">
                                    <Check size={32} strokeWidth={4} />
                                    Confirmar los {totalSpots} lugares
                                </span>
                            </Button>

                            <Button
                                onClick={handlePartial}
                                variant="orange"
                                className="w-full px-6 py-5 text-md md:text-xl font-bold"
                            >
                                Solo asistiremos algunos
                            </Button>
                        </motion.div>
                    )}

                    {status === 'counting' && (
                        <motion.div
                            key="counting"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-bluey-cream text-center"
                        >
                            <h3 className="text-2xl text-bluey-dark font-bold mb-8 font-quicksand">
                                ¿Cuántas personas asistirán?
                            </h3>

                            <div className="flex items-center justify-center gap-8 mb-10">
                                <button
                                    onClick={decrement}
                                    disabled={confirmedSpots <= 1}
                                    className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-bluey-dark hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                >
                                    <Minus size={32} strokeWidth={3} />
                                </button>

                                <span className="text-6xl font-black text-bluey-orange-dark font-fredoka min-w-[80px]">
                                    {confirmedSpots}
                                </span>

                                <button
                                    onClick={increment}
                                    disabled={confirmedSpots >= totalSpots}
                                    className="w-16 h-16 rounded-full bg-bluey-light text-white flex items-center justify-center hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md cursor-pointer"
                                >
                                    <Plus size={32} strokeWidth={3} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={() => submitRSVP(confirmedSpots)}
                                    className="w-full px-8 py-4 text-xl"
                                    variant="primary"
                                >
                                    Confirmar {confirmedSpots} personas
                                </Button>

                                <button
                                    onClick={() => setStatus('mode-selection')}
                                    className="text-gray-400 font-bold hover:text-gray-600 underline decoration-2 underline-offset-4 py-2"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {status === 'sending' && (
                        <motion.div
                            key="sending"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-10"
                        >
                            <Loader2 size={64} className="text-bluey-light animate-spin mb-4" />
                            <p className="text-xl font-bold text-gray-500 font-quicksand">Enviando confirmación...</p>
                        </motion.div>
                    )}

                    {status === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center justify-center text-green-600 bg-green-50 rounded-3xl border-2 border-green-200 p-10 shadow-lg"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                <Check size={40} className="text-green-600 stroke-[3px]" />
                            </div>
                            <h3 className="font-black text-3xl font-fredoka mb-2">¡Confirmado!</h3>
                            <p className="font-bold text-lg font-quicksand opacity-80">
                                {confirmedSpots === 1 ? '1 lugar reservado.' : `${confirmedSpots} lugares reservados.`}
                            </p>
                            <p className="mt-2 text-sm text-center max-w-xs">
                                Nos vemos el 22 de Febrero.
                            </p>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div
                            key="error"
                            className="bg-red-50 p-6 rounded-2xl border-2 border-red-100 text-center"
                        >
                            <p className="text-red-500 font-bold text-lg mb-4">Hubo un problema al enviar.</p>
                            <button
                                onClick={() => setStatus('mode-selection')}
                                className="bg-white text-red-500 px-6 py-2 rounded-lg font-bold shadow-sm border border-red-200"
                            >
                                Intentar de nuevo
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </footer>
    );
};

export default RSVP;
