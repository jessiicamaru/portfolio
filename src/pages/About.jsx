import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import RotatingText from '../component/RotatingText/RotatingText';
import Lanyard from '../component/Lanyard/Lanyard';
import DefaultLayout from '../layout/DefaultLayout';

const About = () => {
    return (
        <DefaultLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full"
            >
                <div className="w-full h-screen max-sm:h-auto py-16 px-4">
                    <div className="w-full absolute left-0 top-0">
                        <Lanyard position={[0, 0, 15]} />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="w-full flex items-end justify-start flex-wrap h-[500px] z-[-2]"
                    >
                        <p className="w-lg text-justify">
                            I’m Dung H.C - Jessii, a second-year software engineering student with a passion for building innovative and user-friendly
                            applications. I specialize in frontend development using React and Tailwind CSS, while also exploring backend technologies
                            like Java Spring Boot and Node.js. My goal is to become a versatile full-stack developer, creating impactful solutions
                            that combine design and functionality.
                            <br />
                            <br />
                            <p className="w-full">
                                Interested in collaborating or learning more? <br />
                                Feel free to contact me or check out my projects!
                            </p>
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="w-full z-10"
                        >
                            <div className="hover:underline">
                                <a href="/project">
                                    Go see projects <img className="w-4 inline-block" src="/enter.png" alt="" />
                                </a>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="hover:underline mt-3"
                            >
                                <a href="/contact">
                                    Contact with me <img className="w-4 inline-block" src="/enter.png" alt="" />
                                </a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </DefaultLayout>
    );
};

export default About;
