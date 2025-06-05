import React, { useState, useEffect, memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import DefaultLayout from '../layout/DefaultLayout';
import ProjectItem from '../component/ProjectItem/ProjectItem';
import { ApolloProvider } from '@apollo/client';
import client from '../utils/ApolloClient.js';
import ContributionsGraph from '../component/ContributionsGraph/ContributionsGraph';
import ReactLoading from 'react-loading';
const Project = () => {
    const neededProjects = [
        {
            projectName: 'android-coffee-app',
            replaceName: 'Android coffee app',
        },
        {
            projectName: 'java-api-coffee-shop',
            replaceName: 'Java Spring Boot coffee app',
        },
        {
            projectName: 'finalWeb-UI',
            replaceName: 'Booked train ticket website',
        },
        {
            projectName: 'finalWeb-BE',
            replaceName: 'Booked train ticket server',
        },
    ];

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectsData = async () => {
            const token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
            if (!token) {
                setError('GitHub token is not set. Please add REACT_APP_GITHUB_TOKEN to .env.');
                setLoading(false);
                return;
            }

            try {
                const projectPromises = neededProjects.map(async (neededProject) => {
                    const repoUrl = `https://api.github.com/repos/jessiicamaru/${neededProject.projectName}`;
                    const languagesUrl = `https://api.github.com/repos/jessiicamaru/${neededProject.projectName}/languages`;

                    const [repoResponse, languagesResponse] = await Promise.all([
                        fetch(repoUrl, {
                            headers: {
                                Authorization: `token ${token}`,
                            },
                        }),
                        fetch(languagesUrl, {
                            headers: {
                                Authorization: `token ${token}`,
                            },
                        }),
                    ]);

                    if (!repoResponse.ok || !languagesResponse.ok) {
                        throw new Error(`Failed to fetch data for ${neededProject.projectName}: ${repoResponse.status} ${languagesResponse.status}`);
                    }

                    const repoData = await repoResponse.json();
                    const languagesData = await languagesResponse.json();

                    const totalBytes = Object.values(languagesData).reduce((sum, value) => sum + value, 0);
                    const languagePercentages = {};
                    for (const [lang, bytes] of Object.entries(languagesData)) {
                        languagePercentages[lang] = ((bytes / totalBytes) * 100).toFixed(2);
                    }

                    return {
                        name: neededProject.replaceName,
                        description: repoData.description || 'No description provided.',
                        language: repoData.language || 'Unknown',
                        stars: repoData.stargazers_count || 0,
                        updatedAt: repoData.updated_at ? new Date(repoData.updated_at).toLocaleDateString() : 'Unknown',
                        html_url: repoData.html_url || '#',
                        languages: languagesData,
                        languagePercentages,
                    };
                });

                const projectsData = await Promise.all(projectPromises);
                setProjects(projectsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProjectsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading)
        return (
            <DefaultLayout>
                <div className="w-full h-screen flex items-center justify-center">
                    <ReactLoading type="spin" color="#000" height={100} width={100} />
                </div>
            </DefaultLayout>
        );
    if (error)
        return (
            <DefaultLayout>
                <div className="w-full h-screen relative">
                    <div className="w-ful h-full flex flex-col flex-wrap items-center justify-center">
                        <div>
                            <div className="w-full text-9xl text-center">
                                <div className="text-2xl mb-8">Oops! Something went wrong, try another page.</div>
                                <h1 className="font-bold">Error</h1>
                                <h1 className="!text-5xl uppercase">${error}</h1>
                            </div>
                        </div>
                        <div className="py-4 px-6 w-52 text-center bg-black text-white text-lg mt-10 rounded-4xl hover:cursor-pointer hover:opacity-80">
                            <a href="/" className="absolute top-0 left-0 bottom-0 right-0"></a>
                            Back to Home
                        </div>
                    </div>

                    <div className="absolute inset-0 z-[-20] opacity-10 pointer-events-none">
                        <Waves className="absolute top-0 left-0 w-full h-full overflow-hidden" />
                    </div>
                </div>
            </DefaultLayout>
        );

    return (
        <DefaultLayout>
            <div className="w-full mt-8">
                <div className="w-full min-h-screen py-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold text-center mb-8"
                    >
                        My Projects
                    </motion.h2>
                    <div className="flex items-center flex-wrap justify-center px-2">
                        {projects.map((project, index) => {
                            return (
                                <div className="w-1/2 max-md:w-full " key={project + index}>
                                    <ProjectItem key={index} project={project} />
                                </div>
                            );
                        })}
                    </div>

                    <div className="overflow-hidden flex items-center flex-wrap justify-center mt-4 max-[768px]:px-3">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-lg text-4xl font-bold text-center mb-8 max-[768px]:w-full max-[768px]:overflow-hidden"
                        >
                            <ApolloProvider client={client}>
                                <ContributionsGraph />
                            </ApolloProvider>
                        </motion.div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default memo(Project);
