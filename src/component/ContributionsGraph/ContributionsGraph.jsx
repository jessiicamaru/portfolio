import React, { memo, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import client from '../../utils/ApolloClient';
import ReactLoading from 'react-loading';
import styles from './style.module.css';

const GET_CONTRIBUTIONS = gql`
    query GetContributions($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                            date
                            contributionCount
                            color
                        }
                    }
                }
            }
        }
    }
`;

const ContributionsGraph = () => {
    const today = useMemo(() => new Date(), []);
    const utcToday = useMemo(() => new Date(today.toISOString().split('.')[0] + 'Z'), [today]);

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const indexDay = utcToday.getUTCDay();
    const dayOfWeek = dayNames[indexDay];
    console.log('Current day of the week:', {
        indexDay,
        dayOfWeek,
    });

    const fromDate = useMemo(() => {
        const from = new Date(utcToday);
        from.setDate(utcToday.getUTCDate() - 364 - (indexDay + 1));
        return from;
    }, [utcToday, indexDay]);

    const months = useMemo(() => {
        const currentMonthIndex = utcToday.getUTCMonth();
        const startMonthIndex = (currentMonthIndex + 1) % 12;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthsArray = [];
        for (let i = 0; i <= 12; i++) {
            const monthIndex = (startMonthIndex + i) % 12;
            monthsArray.push(monthNames[monthIndex]);
        }
        if (utcToday.getUTCMonth() !== (startMonthIndex - 1 + 12) % 12) {
            monthsArray.push(monthNames[currentMonthIndex]);
        }
        return monthsArray;
    }, [utcToday]);

    const from = useMemo(() => fromDate.toISOString().split('.')[0] + 'Z', [fromDate]);
    const to = useMemo(() => utcToday.toISOString().split('.')[0] + 'Z', [utcToday]);

    const { loading, error, data } = useQuery(GET_CONTRIBUTIONS, {
        variables: {
            username: 'jessiicamaru',
            from,
            to,
        },
        client,
        fetchPolicy: 'cache-first',
    });

    if (loading)
        return (
            <div className="w-full flex items-center justify-center mt-4">
                <ReactLoading type="spin" color="#000" height={100} width={100} />
            </div>
        );
    if (error) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;

    const { contributionCalendar } = data.user.contributionsCollection;
    const days = contributionCalendar.weeks.flatMap((week) => week.contributionDays);
    const totalContributions = contributionCalendar.totalContributions;

    console.log(data);

    const getColorLevel = (count) => {
        if (count === 0) return '#ebedf0';
        if (count <= 1) return '#2B4B2D';
        if (count <= 3) return '#3D6C40';
        if (count <= 5) return '#4F8C53';
        return '#61B665';
    };

    return (
        <div className="w-full max-sm:w-full overflow-hidden bg-white p-4  shadow-md hover:shadow-lg ">
            <div className={`${styles.graphContributionContainer} max-sm:overflow-x-scroll`}>
                <div className="flex max-sm:w-[776px] justify-between items-center mb-2">
                    <div className="text-2xl">{totalContributions} contributions in the last year</div>
                </div>
                <div className="flex max-sm:w-[776px]">
                    <div className="flex flex-col mr-2 items-center justify-evenly">
                        {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, index) => (
                            <div key={`label-${index}`} className="text-xs text-gray-400 mt-1">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div
                        className="flex-1 max-sm:w-[742px] grid grid-cols-53 gap-y-0.5 max-sm:overflow-x-auto"
                        style={{ gridTemplateRows: 'repeat(7, 10px)' }}
                    >
                        {Array.from({ length: 53 }, (_, weekIndex) =>
                            Array.from({ length: 7 }, (_, dayIndex) => {
                                const dayData = days.find((d) => {
                                    const date = new Date(d.date);
                                    const startDate = new Date(from);
                                    return date.getDay() === dayIndex && Math.floor((date - startDate) / (1000 * 60 * 60 * 24) / 7) === weekIndex;
                                });
                                const count = dayData ? dayData.contributionCount : 0;
                                const color = dayData ? dayData.color || getColorLevel(count) : getColorLevel(0);

                                if (!dayData) {
                                    return (
                                        <div
                                            key={`${weekIndex}-${dayIndex}`}
                                            className="min-w-[8px]"
                                            style={{
                                                gridColumn: weekIndex + 1,
                                                gridRow: dayIndex + 1,
                                                backgroundColor: '#fff',
                                            }}
                                            title=""
                                        />
                                    );
                                }

                                return (
                                    <div
                                        key={`${weekIndex}-${dayIndex}`}
                                        className="w-2.5 h-2.5 rounded-sm mx-0.5 border-[0.5px] border-[#ccc]"
                                        style={{
                                            gridColumn: weekIndex + 1,
                                            gridRow: dayIndex + 1,
                                            backgroundColor: color,
                                        }}
                                        title={`${dayData ? dayData.date : ''}: ${count} contributions`}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
                <div className="flex ml-4 justify-between text-xs text-gray-400 mt-2 max-sm:w-[776px]">
                    {months.map((month, index) => (
                        <span key={index}>{month}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(ContributionsGraph);
