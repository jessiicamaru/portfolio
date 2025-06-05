import React, { useState, useEffect } from 'react';
import Waves from '../component/Waves/Waves';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

const DefaultLayout = ({ children }) => {
    const location = useLocation();

    const [itemKey] = useState(() => {
        if (location.pathname.includes('/about')) return 2;
        if (location.pathname.includes('/project')) return 3;
        if (location.pathname.includes('/contact')) return 4;
        return 1;
    });

    const [isScrolled, setIsScrolled] = useState(false);
    const [dropMenu, setDropMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="w-full relative">
                <div
                    className={clsx('w-full px-[calc((100%-1200px)/2)]  max-[600px]:!px-0 z-50 sticky top-0 left-0 transition-colors duration-300', {
                        'bg-white': isScrolled,
                        'bg-transparent': !isScrolled,
                    })}
                >
                    <div className="w-full flex pt-[10px] pb-[2px] z-10 items-center max-sm:justify-between max-sm:relative">
                        <div className="px-4 py-2 cursor-pointer font-bold text-2xl">
                            <a href="/">dzxje.</a>
                        </div>
                        <div
                            className="w-9 mr-2 max-sm:block hidden cursor-pointer"
                            onClick={() => {
                                setDropMenu(!dropMenu);
                            }}
                        >
                            <img src="https://img.icons8.com/?size=100&id=8800&format=png&color=000000" alt="" className="px-2" />
                        </div>

                        <ul
                            className={clsx(
                                'inline-block max-[600px]:flex max-sm:absolute max-sm:top-[100%] max-sm:flex-col max-sm:right-0 max-sm:px-4 pb-4',
                                {
                                    'max-sm:bg-white': isScrolled,
                                    'max-sm:bg-transparent': !isScrolled,
                                    'max-sm:hidden': !dropMenu,
                                }
                            )}
                        >
                            <li
                                className={clsx(
                                    'max-sm:w-full max-sm:text-center inline-block max-[600px]:px-2 max-[600px]:w-1/4 h-full px-4 py-2 cursor-pointer font-[500] border-b-[2px] border-b-transparent relative hover:border-b-[black] border-solid ',
                                    {
                                        '!border-b-[black]': itemKey === 1,
                                    }
                                )}
                            >
                                <a href="/" className="absolute top-0 left-0 bottom-0 right-0"></a>
                                Home
                            </li>
                            <li
                                className={clsx(
                                    'max-sm:w-full max-sm:text-center inline-block max-[600px]:w-1/4 max-[600px]:px-2 px-4 py-2 cursor-pointer font-[500] border-b-[2px] border-b-transparent hover:border-b-[black] border-solid relative',
                                    {
                                        '!border-b-[black]': itemKey === 2,
                                    }
                                )}
                            >
                                <a href="/about" className="absolute top-0 left-0 bottom-0 right-0"></a>
                                About
                            </li>
                            <li
                                className={clsx(
                                    'max-sm:w-full max-sm:text-center inline-block max-[600px]:w-1/4 max-[600px]:px-2 px-4 py-2 cursor-pointer font-[500] border-b-[2px] border-b-transparent hover:border-b-[black] border-solid relative',
                                    {
                                        '!border-b-[black]': itemKey === 3,
                                    }
                                )}
                            >
                                <a href="/project" className="absolute top-0 left-0 bottom-0 right-0"></a>
                                Project
                            </li>
                            <li
                                className={clsx(
                                    'max-sm:w-full max-sm:text-center inline-block max-[600px]:w-1/4 max-[600px]:px-2 px-4 py-2 cursor-pointer font-[500] border-b-[2px] border-b-transparent hover:border-b-[black] border-solid relative',
                                    {
                                        '!border-b-[black]': itemKey === 4,
                                    }
                                )}
                            >
                                <a href="/contact" className="absolute top-0 left-0 bottom-0 right-0"></a>
                                Contact
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full px-[calc((100%-1200px)/2)] max-[600px]:!px-0 overflow-hidden mt-[-60px] relative z-10">{children}</div>

                <div className="absolute inset-0 z-[-20] opacity-10 pointer-events-none">
                    <Waves className="absolute top-0 left-0 w-full h-full overflow-hidden" />
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
