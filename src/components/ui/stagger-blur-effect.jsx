import { motion } from "framer-motion";

/**
 * StaggerBlurEffect
 * Animates each character of its children string with a staggered
 * blur → sharp + fade-in effect.
 *
 * Props:
 *  - children    : string to animate per-character
 *  - delay       : initial delay before animation starts (seconds)
 *  - stagger     : delay between each character (seconds)
 *  - color       : text color (used when isGradient is false)
 *  - isGradient  : if true, applies gradientStyle to the wrapper span
 *  - gradientStyle : CSS style object for gradient text (e.g. background-clip)
 */
export function StaggerBlurEffect({
    children,
    delay = 0,
    stagger = 0.04,
    color,
    isGradient = false,
    gradientStyle = {},
}) {
    const text = typeof children === "string" ? children : String(children ?? "");

    const charVariants = {
        hidden: { opacity: 0, filter: "blur(8px)" },
        visible: (i) => ({
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: delay + i * stagger,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // When gradient mode is on, we wrap everything in a single span that
    // carries the gradient styles so the gradient spans the full word.
    if (isGradient) {
        return (
            <motion.span
                style={{ display: "inline-block", ...gradientStyle }}
                initial="hidden"
                animate="visible"
            >
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        variants={charVariants}
                        style={{ display: "inline-block" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.span>
        );
    }

    return (
        <motion.span
            style={{ display: "inline", color }}
            initial="hidden"
            animate="visible"
        >
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={charVariants}
                    style={{ display: "inline-block" }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
}
