import { motion } from 'framer-motion';
import Button from './ui/Button';
import SectionTitle from './ui/SectionTitle';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Gift, ShoppingBag } from 'lucide-react';

const GiftRegistry = () => {
    return (
        <section className="px-4 py-8 mb-20 relative z-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="bg-white rounded-3xl p-4 shadow-lg border border-white/50 relative max-w-2xl mx-auto"
            >
                {/* Stitched Inner Border */}
                <div className="border-2 border-dashed border-bluey-light rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden bg-white/50">

                    {/* Lottie Animation */}
                    <div className="w-40 h-40 mx-auto -mt-4 mb-2">
                        <DotLottieReact
                            src="/gift.lottie"
                            loop
                            autoplay
                        />
                    </div>

                    <SectionTitle className="mb-8">Mesa de Regalos</SectionTitle>

                    <p className="font-quicksand font-medium text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                        El mejor regalo es tu presencia. <br />
                        Pero si deseas tener un detalle:
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
                        <a href="#" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto px-6 py-3" variant="primary">
                                <span className="flex items-center gap-3 justify-center">
                                    <Gift size={20} />
                                    Liverpool
                                </span>
                            </Button>
                        </a>

                        <a href="https://www.amazon.com.mx/registries/gl/guest-view/V25TOKR9MG7Z?ref_=cm_sw_r_cp_ud_ggr-subnav-share_8CVWSNN8ZMKN7WPGGQD9" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto px-6 py-3" variant="orange">
                                <span className="flex items-center gap-3 justify-center">
                                    <ShoppingBag size={20} />
                                    Amazon
                                </span>
                            </Button>
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default GiftRegistry;
