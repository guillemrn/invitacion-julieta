import { motion } from 'framer-motion';
import Header from './components/Header';
import VenueList from './components/VenueList';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import GiftRegistry from './components/GiftRegistry';
import BackgroundPattern from './components/BackgroundPattern';
import Footer from './components/Footer';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

function App() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-[#FDFBF7]">
            <Header />

            <main className="relative z-10 w-full">
                <BackgroundPattern />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="container mx-auto px-4 py-5 max-w-7xl relative z-20"
                >
                    <VenueList />
                    <Timeline />
                    {/* <Gallery /> */}
                    <GiftRegistry />
                    <RSVP />
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
