import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { sendRSVP } from '../services/rsvpService';
import { Loader2, Check, Minus, Plus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import SectionTitle from './ui/SectionTitle';

const RSVP = () => {
    const [searchParams] = useSearchParams();
    // Default values if URL params are missing
    const guestName = searchParams.get('invitado') || '';
    const totalSpots = parseInt(searchParams.get('cupos') || '0', 10);

    // Guard clause: Hide section if params are missing or invalid
    if (!guestName || totalSpots <= 0) return null;

    const [confirmedSpots, setConfirmedSpots] = useState(1);
    const [status, setStatus] = useState<'idle' | 'mode-selection' | 'counting' | 'success' | 'error'>('idle');
    const [isSending, setIsSending] = useState(false);
    const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);

    // If no params, fallback to simple view or hide specific logic? 
    // Requirement says: "Si no hay nombre... saludo genérico" (handled in Header). 
    // Here we'll default to manual input if no params, or just show a generic form.
    // Given the strict requirement for "Dynamic based on URL", let's assume valid URLs 
    // or handle the "no param" case gracefully.

    useEffect(() => {
        if (!guestName || totalSpots <= 0) return;

        // Check for existing confirmation
        const confirmed = localStorage.getItem(`rsvp_confirmed_${guestName}`);
        if (confirmed === 'true') {
            setStatus('success');
            setAlreadyConfirmed(true);
            return;
        }

        setStatus('mode-selection');
        setConfirmedSpots(totalSpots); // Default to max
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
        setIsSending(true);
        try {
            await sendRSVP({
                fecha: new Date().toLocaleString(),
                nombre: guestName || 'Invitado',
                cupos_totales: totalSpots || 0,
                cupos_confirmados: spots,
                estatus: true
            });

            // Persist success state
            localStorage.setItem(`rsvp_confirmed_${guestName}`, 'true');

            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <footer id="rsvp" className="mt-16 bg-gradient-to-t from-white/80 to-transparent pt-10 px-5 rounded-t-[30px] pb-10">
            <div className="w-[200px] h-[200px] mx-auto mb-4 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/Heeler-Car-1.png')" }}></div>

            <SectionTitle>Confirmar Asistencia</SectionTitle>

            <p className="text-xl text-gray-600 max-w-[600px] mx-auto mb-10 text-center leading-relaxed font-quicksand font-medium">
                {guestName ? (
                    <>
                        Hola <strong className="text-bluey-orange-dark">{guestName}</strong>, tienes{' '}
                        <strong className="text-bluey-dark text-2xl">{totalSpots}</strong> {totalSpots === 1 ? 'boleto reservado para ti.' : 'boletos reservados para tu grupo.'}
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
                                disabled={isSending}
                            >
                                <span className="flex items-center justify-center gap-3">
                                    {isSending ? (
                                        <Loader2 size={32} className="animate-spin" />
                                    ) : (
                                        <Check size={32} strokeWidth={4} />
                                    )}
                                    {isSending ? 'Enviando...' : (
                                        totalSpots === 1 ? 'Confirmar mi lugar' : `Confirmar los ${totalSpots} lugares`
                                    )}
                                </span>
                            </Button>

                            {totalSpots > 1 && (
                                <Button
                                    onClick={handlePartial}
                                    variant="orange"
                                    disabled={isSending}
                                    className="w-full px-6 py-5 text-md md:text-xl font-bold"
                                >
                                    Solo asistiremos algunos
                                </Button>
                            )}
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
                                    disabled={isSending}
                                    className="w-full px-8 py-4 text-xl"
                                    variant="orange"
                                >
                                    {isSending ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 size={24} className="animate-spin" />
                                            Enviando...
                                        </span>
                                    ) : (
                                        `Confirmar ${confirmedSpots} ${confirmedSpots === 1 ? 'persona' : 'personas'}`
                                    )}
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



                    {status === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative overflow-hidden flex flex-col items-center justify-center text-bluey-dark bg-white/40 rounded-3xl border-2 border-bluey-cream p-10 shadow-2xl min-h-[350px]"
                        >
                            {/* Capa de Fondo (La Animación) */}
                            <div className="absolute inset-0 z-0">
                                <DotLottieReact
                                    src="/Celebration.lottie"
                                    loop
                                    autoplay
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Capa de Contenido (El Texto) Overlay más transparente */}
                            <div className="relative z-10 p-4 rounded-2xl flex flex-col items-center max-w-[100%]">
                                <h3 className="font-black text-4xl font-fredoka mb-4 text-center">
                                    {alreadyConfirmed ? '¡Bienvenido de nuevo!' : '¡Confirmado!'}
                                </h3>

                                <p className="font-bold text-xl font-quicksand text-center leading-relaxed">
                                    {alreadyConfirmed ? (
                                        <>¡Qué alegría! Ya tenemos tu confirmación guardada.</>
                                    ) : (
                                        <>
                                            <span className="text-bluey-orange-dark">{guestName}</span>, hemos reservado <span className="text-bluey-orange-dark text-2xl">{confirmedSpots}</span> {confirmedSpots === 1 ? 'lugar' : 'lugares'} para ti.
                                        </>
                                    )}
                                </p>

                                <p className="mt-6 text-md text-center opacity-90 font-bold bg-white/50 px-4 py-1 rounded-full">
                                    ¡Nos vemos el 22 de Febrero para celebrar!
                                </p>
                            </div>
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
