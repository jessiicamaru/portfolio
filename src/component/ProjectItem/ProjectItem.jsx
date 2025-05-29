import React from 'react';
import { motion } from 'framer-motion';

const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Kotlin: '#A97BFF',
    default: '#cccccc',
};

const ProjectItem = ({ project }) => {
    const { name, description, language, stars, updatedAt, html_url, languagePercentages = {} } = project;

    const languageColor = languageColors[language] || languageColors.default;

    const sortedLanguages = Object.entries(languagePercentages)
        .sort(([, a], [, b]) => b - a)
        .map(([lang, percentage]) => ({ lang, percentage }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md mx-2 my-2 p-6 hover:shadow-lg transition-shadow duration-300"
        >
            <div className="flex flex-col space-y-2">
                <a href={html_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <h3 className="text-xl font-semibold text-blue-600 hover:underline">{name}</h3>
                </a>
                <p className="text-gray-600 text-sm">{description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: languageColor }} />
                        <span>{language}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 fill-current text-yellow-500" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L10.08 5.58H16L11.64 9.34L13.72 14.92L8 11.66L2.28 14.92L4.36 9.34L0 5.58H5.92L8 0Z" />
                        </svg>
                        <span>{stars}</span>
                    </div>
                    <div>Updated: {updatedAt}</div>
                </div>
                {Object.keys(languagePercentages).length > 0 && (
                    <div className="mt-2">
                        <h4 className="text-sm font-medium mb-2">Languages:</h4>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            {sortedLanguages.map(({ lang, percentage }, index) => (
                                <div
                                    key={index}
                                    className="h-full float-left relative"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: languageColors[lang] || languageColors.default,
                                    }}
                                />
                            ))}
                        </div>
                        <div className="mt-2 text-xs text-gray-600 flex justify-between">
                            {sortedLanguages.map(({ lang, percentage }, index) => (
                                <span key={index} className="flex items-center">
                                    <span
                                        className="w-2 h-2 rounded-full mr-1"
                                        style={{ backgroundColor: languageColors[lang] || languageColors.default }}
                                    />
                                    {lang} {percentage}%
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectItem;
