import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CHARACTERS = [
    '/characters/Bandit.png',
    '/characters/Bluey.png',
    '/characters/Brandy.png',
    '/characters/Chat-Large.png',
    '/characters/Chilli.png',
    '/characters/Coco.png',
    '/characters/Honey.png',
    '/characters/InDY.png',
    '/characters/Janet-Hero.png',
    '/characters/Judo.png',
    '/characters/MACKENZIE-1.png',
    '/characters/Missy-1.png',
    '/characters/Muffin-1.png',
    '/characters/RITA-FIX.png',
    '/characters/Rusty-1.png',
    '/characters/Socks-1.png',
    '/characters/Trixie.png',
    '/characters/Unicorse.png',
    '/characters/Untitled-1.png',
    '/characters/Winton.png',
    '/characters/bingo.png',
    '/characters/pattern1.png',
    '/characters/pattern2.png',
    '/characters/pattern3.png',
    '/characters/pattern4.png',
    '/characters/pattern5.png',
    '/characters/pattern6.png',
    '/characters/pattern7.png',
    '/characters/pattern8.png',

];

interface Position {
    id: number;
    src: string;
    top: number;
    left: number;
    rotate: number;
}

const NUM_CHARACTERS = 100;
const SIZE = 60; // Base size in px
const MIN_DISTANCE = 8; // Minimum percentage distance between center of items

const BackgroundPattern = () => {
    const [items, setItems] = useState<Position[]>([]);

    useEffect(() => {
        const generated: Position[] = [];
        const maxTries = window.innerWidth < 768 ? 20 : 100;

        for (let i = 0; i < NUM_CHARACTERS; i++) {
            let tries = 0;
            let found = false;

            while (tries < maxTries && !found) {
                const top = 5 + Math.random() * 100; // Stay away from extreme edges
                const left = 5 + Math.random() * 100;

                // Collision check
                const collision = generated.some(existing => {
                    const dTop = Math.abs(existing.top - top);
                    const dLeft = Math.abs(existing.left - left);
                    // Use a simple box-based or distance-based check
                    // Since height of container is much larger than width, overlap in % is tricky.
                    // However, we'll use a conservative % buffer.
                    return dTop < MIN_DISTANCE && dLeft < MIN_DISTANCE;
                });

                if (!collision) {
                    generated.push({
                        id: i,
                        src: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
                        top,
                        left,
                        rotate: (Math.random() * 40) - 20 // -20deg to 20deg
                    });
                    found = true;
                }
                tries++;
            }
        }
        setItems(generated);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {items.map((item) => (
                <motion.img
                    key={item.id}
                    src={item.src}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="absolute contrast-125 mix-blend-multiply pointer-events-none"
                    style={{
                        top: `${item.top}%`,
                        left: `${item.left}%`,
                        width: `${SIZE}px`,
                        transform: `rotate(${item.rotate}deg)`,
                        // Use translate(-50%, -50%) to center and avoid offset overlap issues
                        translate: '-50% -50%'
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundPattern;
