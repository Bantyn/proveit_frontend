import React, { useEffect, useRef } from 'react';
import CompanySidebar from './CompanySidebar';
import { useTheme } from '../../context/ThemeContext';
import { clsx } from 'clsx';
import { NeonOrbs } from '../ui/NeonOrbs';
import { StripeGradientShader } from '../ui/StripeGradientShader';

const CompanyLayout = ({ children }) => {
    const { theme } = useTheme();
    const containerRef = useRef(null);
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    // Track mouse for subtle ambient glow
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
            containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className={clsx(
                "min-h-screen font-sans selection:bg-primary/20 flex overflow-x-hidden relative transition-colors duration-1000",
                theme === 'light' ? "bg-[#F5F7FF] text-slate-900" : "bg-[#03030A] text-white"
            )}
        >
            {/* Ambient Background Architecture */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <StripeGradientShader className={theme === 'dark' ? "opacity-[0.18]" : "opacity-[0.06]"} />
                <div className={clsx("absolute inset-0", theme === 'dark' ? "opacity-75" : "opacity-50")}>
                    <NeonOrbs />
                </div>

                {theme === 'dark' && (
                    <>
                        <div className="absolute pointer-events-none" style={{ top: '-10%', left: '-5%', width: '70%', height: '70%', background: 'radial-gradient(ellipse at 30% 30%, rgba(129,140,248,0.20) 0%, rgba(192,132,252,0.10) 40%, transparent 70%)', filter: 'blur(60px)', animation: 'aurora-pulse 8s ease-in-out infinite' }} />
                        <div className="absolute pointer-events-none" style={{ bottom: '-15%', right: '-10%', width: '65%', height: '65%', background: 'radial-gradient(ellipse at 70% 70%, rgba(6,182,212,0.14) 0%, rgba(99,102,241,0.10) 40%, transparent 70%)', filter: 'blur(80px)', animation: 'aurora-pulse 10s ease-in-out infinite reverse' }} />
                        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
                    </>
                )}

                <div className="absolute inset-0 pointer-events-none z-10" style={{ opacity: theme === 'dark' ? 0.35 : 0.18, background: `radial-gradient(900px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--color-primary-rgb), ${theme === 'dark' ? '0.12' : '0.08'}), transparent 70%)` }} />
            </div>

            {/* Navigation */}
            <CompanySidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />

            {/* Main Content Area */}
            <main
                className={clsx(
                    "flex-1 relative min-w-0 pr-10 h-screen overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    sidebarCollapsed ? "pl-28" : "pl-80"
                )}
            >
                <div className="relative z-10 w-full h-full py-10">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default CompanyLayout;

