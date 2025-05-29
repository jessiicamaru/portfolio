import React from 'react';
import RotatingText from '../component/RotatingText/RotatingText';
import Lanyard from '../component/Lanyard/Lanyard';
import DefaultLayout from '../layout/DefaultLayout';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Home = () => {
    const personalSkills = [
        {
            title: 'html',
            link: 'https://img.icons8.com/?size=100&id=20909&format=png&color=000000',
        },
        {
            title: 'js',
            link: 'https://img.icons8.com/?size=100&id=108784&format=png&color=000000',
        },
        {
            title: 'css',
            link: 'https://img.icons8.com/?size=100&id=21278&format=png&color=000000',
        },
        {
            title: 'tailwind',
            link: 'https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=000000',
        },
        {
            title: 'typescript',
            link: 'https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000',
        },
        {
            title: 'reactjs',
            link: 'https://img.icons8.com/?size=100&id=123603&format=png&color=000000',
        },
        {
            title: 'nodejs',
            link: 'https://img.icons8.com/?size=100&id=54087&format=png&color=000000',
        },
        {
            title: 'jwt',
            link: 'https://img.icons8.com/?size=100&id=rHpveptSuwDz&format=png&color=000000',
        },
        {
            title: 'mysql',
            link: 'https://img.icons8.com/?size=100&id=UFXRpPFebwa2&format=png&color=000000',
        },
        {
            title: 'springboot',
            link: 'https://img.icons8.com/?size=100&id=90519&format=png&color=000000',
        },
        {
            title: 'android',
            link: 'https://img.icons8.com/?size=100&id=17836&format=png&color=000000',
        },
        {
            title: 'redux',
            link: 'https://img.icons8.com/?size=100&id=jD-fJzVguBmw&format=png&color=000000',
        },
        {
            title: 'git',
            link: 'https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=000000',
        },
    ];

    const othersSkills = [
        {
            title: 'ps',
            link: 'https://img.icons8.com/?size=100&id=13677&format=png&color=000000',
        },
        {
            title: 'pr',
            link: 'https://img.icons8.com/?size=100&id=e57Y1CnsOasB&format=png&color=000000',
        },
        {
            title: 'ae',
            link: 'https://img.icons8.com/?size=100&id=108781&format=png&color=000000',
        },
    ];

    return (
        <DefaultLayout>
            <div className="w-full">
                <div className="w-full h-[calc(100vh-60px)] py-16 px-4">
                    <div className="w-full absolute left-0 top-0">
                        <Lanyard position={[0, 0, 15]} />
                    </div>
                    <div className="w-full flex items-center justify-center flex-wrap h-[500px] z-[-2]">
                        <div className="flex w-full max-[768px]:flex-wrap">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="w-2/5 font-[500] max-[768px]:w-full"
                            >
                                <span className="w-full text-3xl">
                                    Hello, I’m
                                    <br /> Dung H.C - Jessii
                                </span>
                                <RotatingText texts={['Frontend', 'Backend', 'Fullstack']} loop={true} mainClassName="mt-12 text-7xl" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="w-3/5 text-2xl text-start pt-28 font-[300] max-[768px]:w-full"
                            >
                                I’m Dung H.C - Jessii, a second-year software engineering student with a passion for building innovative and
                                user-friendly applications.
                            </motion.div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <img src="https://img.icons8.com/?size=100&id=164&format=png&color=000000" alt="Scroll Down" />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="w-full h-[calc(100vh-180px)] max-[600px]:w-full  max-[600px]:!px-0 py-16 flex items-center justify-center"
                >
                    <div>
                        <div className="w-full text-4xl text-center font-semibold">Personal skills</div>
                        <div className="w-full flex items-center justify-center">
                            <div className="w-2xl h-52 flex flex-wrap items-center justify-center max-[768px]:w-full">
                                {personalSkills.map((item) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }}
                                        key={item.title}
                                        className="w-15 h-15 max-w-1/5 bg-white p-2 rounded-full shadow-2xl border-[1px] border-[#555] border-solid mx-3"
                                    >
                                        <img src={item.link} alt={item.title} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full mt-8 text-3xl text-center font-semibold">Others skills</div>
                        <div className="w-full flex items-center justify-center">
                            <div className="w-2xl max-[600px]:w-full mt-8 flex flex-wrap items-center justify-center">
                                {othersSkills.map((item) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }}
                                        key={item.title}
                                        className="w-15 h-15 bg-white p-2 rounded-full shadow-2xl border-[1px] border-[#555] border-solid mx-3"
                                    >
                                        <img src={item.link} alt={item.title} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="w-full h-[calc(100vh-120px)] py-16 flex items-center justify-center"
                >
                    <div>
                        <div className="w-full text-4xl text-center font-semibold">Achievements</div>
                        <div>
                            <div className="w-full text-2xl my-8 text-center">Second prize of Best Web Design - BWD competition</div>
                            <div className="w-full flex justify-center max-[900px]:flex-wrap max-[900px]:gap-3">
                                <motion.img
                                    src="/second_prize.jpg"
                                    alt="Second Prize"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="max-w-md mx-3 rounded-lg shadow-lg"
                                />
                                <motion.img
                                    src="/all_student.jpg"
                                    alt="Second Prize"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="max-w-md mx-3 rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </DefaultLayout>
    );
};

export default Home;
