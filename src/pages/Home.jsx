import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Banner from '../components/Banner';
import ContactUs from '../components/ContactUs';
import FaqSection from '../components/FaqSection';
import JobByCategory from '../components/JobByCategory';

const Home = () => {
    const { scrollYProgress } = useScroll();
    const springScaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div className="max-w-screen-2xl mx-auto">
            {/* Progress bar using Framer Motion */}
            <motion.div
                className="progress-bar"
                style={{
                    scaleX: springScaleX,
                    transformOrigin: '0%',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '10px',
                    background: 'red',
                    zIndex: 999,
                }}
            />

            {/* Content sections */}
            <Banner />
            <JobByCategory />
            <FaqSection />
            <ContactUs />
        </div>
    );
};

export default Home;
