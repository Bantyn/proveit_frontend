
// Engineered Motion Config
// "Not playful. Precision."

export const transitions = {
    default: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, // Apple-style easeOut
    slow: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    stagger: 0.1
};

export const variants = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: transitions.default
        }
    },
    slideUp: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1, y: 0,
            transition: transitions.default
        }
    },
    slideUpStagger: {
        hidden: { opacity: 0, y: 20 },
        visible: (i = 0) => ({
            opacity: 1, y: 0,
            transition: {
                ...transitions.default,
                delay: i * transitions.stagger
            }
        })
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1, scale: 1,
            transition: transitions.default
        }
    },
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    }
};
