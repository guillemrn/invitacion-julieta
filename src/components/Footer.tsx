
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-[#FEF3C7]/30 py-12 mt-20">
            <div className="container mx-auto px-4 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="font-quicksand text-bluey-dark/60 text-base md:text-lg font-medium tracking-wide flex items-center justify-center gap-2"
                >
                    Hecho con <Heart size={20} className="text-bluey-orange-dark fill-bluey-orange-dark" /> por la familia de Julieta
                </motion.p>
            </div>
        </footer>
    );
};

export default Footer;
