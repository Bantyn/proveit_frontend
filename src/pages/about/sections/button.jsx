import React from "react";
import { motion } from "framer-motion";

export function Button({ children, className = "", onClick, variant = "default" }) {
    return (
        <button onClick={onClick} className={`inline-flex items-center justify-center cursor-pointer ${className}`}>
            {children}
        </button>
    );
}
