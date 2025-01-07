import { useCallback, useEffect, useState } from "react";
import {  Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Particle = () => {
    const [particleColor, setParticleColor] = useState("#825B27");

        useEffect(() => {
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const updateColor = (e: MediaQueryListEvent | MediaQueryList) => {
                setParticleColor(e.matches ? "#737373" : "#825B27");
            };
            
            updateColor(darkModeMediaQuery);
            darkModeMediaQuery.addEventListener('change', updateColor);
            return () => darkModeMediaQuery.removeEventListener('change', updateColor);
        }, []);
    
        const particlesInit = useCallback(async (engine: Engine) => {
            await loadSlim(engine);
        }, []);
    
        return (
            <div className="absolute inset-0 z-10">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        fpsLimit: 30, // Reducido de 120
                        particles: {
                            number: {
                                value: 40, // Reducido de 80
                                density: {
                                    enable: true,
                                    area: 1000 // Aumentado de 800
                                }
                            },
                            color: {
                                value: ["#066A39"]
                            },
                            links: {
                                enable: true,
                                distance: 200,
                                color: particleColor,
                                opacity: 0.4,
                                width: 1
                            },
                            move: {
                                enable: true,
                                speed: 0.8, // Reducido de 1
                                direction: "none",
                                random: false,
                                straight: false,
                                outModes: {
                                    default: "bounce"
                                }
                            },
                            size: {
                                value: { min: 2, max: 4 }
                            },
                            opacity: {
                                value: 0.5
                            }
                        },
                        detectRetina: false, // Desactivado para mejor rendimiento
                        interactivity: {
                            events: {
                                onHover: {
                                    enable: true,
                                    mode: "grab",
                                    parallax: {
                                        enable: false // Desactivado para mejor rendimiento
                                    }
                                },
                                onClick: {
                                    enable: false // Desactivado para mejor rendimiento
                                }
                            }
                        }
                    }}
                />
            </div>
        );
    };

export default Particle;