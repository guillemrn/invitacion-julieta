import React from 'react';
import { motion } from 'framer-motion';

const SpotifyPlayer: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full p-4 md:p-6"
        >
            <div className="max-w-2xl mx-auto space-y-4">
                <h3 className="text-xl md:text-2xl font-quicksand font-bold text-[#30598a] text-center">
                    ¡Dale play para entrar en el ambiente de la fiesta!
                </h3>

                <div className="w-full overflow-hidden rounded-[24px] shadow-lg">
                    <iframe
                        style={{ borderRadius: '24px' }}
                        src="https://open.spotify.com/embed/album/6WTHRiGPgH0ZsIROsUkkB5?utm_source=generator&autoplay=1"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Spotify Playlist"
                    ></iframe>
                </div>
            </div>
        </motion.div>
    );
};

export default SpotifyPlayer;
