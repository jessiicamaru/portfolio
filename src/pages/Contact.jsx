import React, { useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import SpotlightCard from '../component/SpotlightCard/SpotlightCard';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [showContact, setShowContact] = useState(false);

    const handleSeeContact = () => {
        setShowContact(true);
    };

    return (
        <DefaultLayout>
            <div className="w-full min-h-screen flex items-center">
                <div className="w-full h-[calc(100vh-60px)] max-sm:h-auto max-w-4xl flex items-center justify-center mx-auto py-16 px-4">
                    <AnimatePresence mode="wait">
                        {!showContact ? (
                            <div className="min-w-80 max-w-[500px] relative">
                                <motion.div
                                    key="spotlight"
                                    initial={{ x: 0, opacity: 1 }}
                                    exit={{ x: '-100%', opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.6)">
                                        <div className="text-white">
                                            <img
                                                src="https://img.icons8.com/?size=100&id=60003&format=png&color=ffffff"
                                                alt=""
                                                className="w-8 h-8 mb-2"
                                            />
                                            <div className="font-bold text-lg">Contact me now</div>
                                            <div className="">Ready to collaborate? Reach out today!</div>
                                        </div>

                                        <button
                                            onClick={handleSeeContact}
                                            className="px-4 py-3 mt-3 rounded-full bg-gradient-to-t from-[#111] to-[#545454] text-white text-md font-bold cursor-pointer"
                                        >
                                            See contact
                                        </button>
                                    </SpotlightCard>
                                </motion.div>
                            </div>
                        ) : (
                            // Nội dung mới (thông tin liên hệ) với glass effect
                            <motion.div
                                key="contact-info"
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative p-6 rounded-lg shadow-md w-full min-h-96 hover:shadow-lg hover:scale-[1.001] max-[768px]:w-full max-[768px]:mx-2"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(2px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                }}
                            >
                                <h2 className="text-2xl font-bold w-full text-center">My Contact Information</h2>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="flex flex-row justify-center gap-6 mt-8 max-[768px]:flex-wrap max-[768px]:px-2"
                                >
                                    <div className="">
                                        <div className="w-[300px] flex">
                                            <div className="w-1/5 font-bold">
                                                <div>Name:</div>
                                                <div>Phone:</div>
                                                <div>Email:</div>
                                            </div>
                                            <div className="w-4/5">
                                                <div className="w-full flex justify-between">
                                                    <div className="hover:underline cursor-pointer">Hoàng Công Dũng</div>
                                                    <img
                                                        src="https://img.icons8.com/?size=100&id=667idArLy8ci&format=png&color=000000"
                                                        alt=""
                                                        className="w-6 p-1"
                                                    />
                                                </div>
                                                <div className="w-full flex justify-between">
                                                    <div className="hover:underline cursor-pointer">+84 812 050 247</div>
                                                    <img
                                                        src="https://img.icons8.com/?size=100&id=9730&format=png&color=000000"
                                                        alt=""
                                                        className="w-6 p-1"
                                                    />
                                                </div>
                                                <div className="w-full flex justify-between">
                                                    <div className="hover:underline cursor-pointer">dandrew2407@gmail.com</div>
                                                    <img
                                                        src="https://img.icons8.com/?size=100&id=86875&format=png&color=000000"
                                                        alt=""
                                                        className="w-6 p-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="w-[300px] flex">
                                            <div className="w-1/3 font-bold">
                                                <div>Facebook:</div>
                                                <div>Instagram:</div>
                                                <div>Github:</div>
                                                <div>Linkedin:</div>
                                            </div>
                                            <div className="w-2/3">
                                                <div className="w-full flex justify-between">
                                                    <a
                                                        target="_blank"
                                                        className="hover:underline cursor-pointer"
                                                        href="https://www.facebook.com/dunghoang24/"
                                                    >
                                                        Dũng Hoàng
                                                    </a>
                                                    <img
                                                        src="https://img.icons8.com/?size=100&id=118466&format=png&color=000000"
                                                        alt=""
                                                        className="w-6 p-1"
                                                    />
                                                </div>

                                                <div className="w-full flex justify-between">
                                                    <a
                                                        target="_blank"
                                                        className="hover:underline cursor-pointer"
                                                        href="https://www.instagram.com/_gnudzxje.24/"
                                                    >
                                                        _gnudzxje.24
                                                    </a>
                                                    <img
                                                        src="https://img.icons8.com/?size=100&id=59813&format=png&color=000000"
                                                        alt=""
                                                        className="w-6 p-1"
                                                    />
                                                </div>

                                                <div className="w-full flex justify-between">
                                                    <a
                                                        target="_blank"
                                                        className="hover:underline cursor-pointer"
                                                        href="https://github.com/jessiicamaru"
                                                    >
                                                        jessiicamaru
                                                    </a>
                                                    <img
                                                        src="https://img.icons8.com/?size=100&id=8808&format=png&color=000000"
                                                        alt=""
                                                        className="w-6 p-1"
                                                    />
                                                </div>

                                                <div className="w-full flex justify-between">
                                                    <a
                                                        target="_blank"
                                                        className="hover:underline cursor-pointer"
                                                        href="https://www.linkedin.com/in/dunghoang24/"
                                                    >
                                                        Dũng Hoàng
                                                    </a>
                                                    <img
                                                        src="https://img.icons8.com/?size=100&id=667idArLy8ci&format=png&color=000000"
                                                        alt=""
                                                        className="w-6 p-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Contact;
