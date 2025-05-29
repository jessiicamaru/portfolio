import React, { memo, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import client from '../../utils/ApolloClient';
import ReactLoading from 'react-loading';

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
    // Tự động lấy ngày hiện tại và chuyển sang UTC, sử dụng useMemo để tránh tính toán lại
    const today = useMemo(() => new Date(), []); // Chỉ tính một lần khi component mount
    const utcToday = useMemo(() => new Date(today.toISOString().split('.')[0] + 'Z'), [today]);

    const fromDate = useMemo(() => {
        const from = new Date(utcToday);
        from.setDate(utcToday.getUTCDate() - 371); // 364 ngày trước
        return from;
    }, [utcToday]);

    // Tạo mảng tháng từ tháng này năm ngoái đến tháng hiện tại, sử dụng useMemo
    const months = useMemo(() => {
        const currentMonthIndex = utcToday.getUTCMonth(); // 4 (tháng 5, 0-based)
        const startMonthIndex = (currentMonthIndex + 1) % 12; // Tháng 5 năm ngoái (5)
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

    // Định dạng ngày theo chuẩn ISO 8601 UTC cho GraphQL
    const from = useMemo(() => fromDate.toISOString().split('.')[0] + 'Z', [fromDate]);
    const to = useMemo(() => utcToday.toISOString().split('.')[0] + 'Z', [utcToday]);

    const { loading, error, data } = useQuery(GET_CONTRIBUTIONS, {
        variables: {
            username: 'jessiicamaru',
            from,
            to,
        },
        client,
        fetchPolicy: 'cache-first', // Sử dụng cache để tránh request lặp
        // Thêm skip nếu không muốn chạy query ngay lập tức (tùy chọn)
        // skip: !username || !from || !to,
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
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg max-[768px]:px-2 max-[768px]:w-full">
            <div className="flex justify-between items-center mb-2">
                <div className="text-2xl">{totalContributions} contributions in the last year</div>
            </div>
            <div className="flex">
                <div className="flex flex-col mr-2 items-center justify-evenly">
                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, index) => (
                        <div key={`label-${index}`} className="text-xs text-gray-400 mt-1 ">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-53 gap-y-0.5" style={{ gridTemplateRows: 'repeat(7, 10px)' }}>
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
                                        className="bg-white"
                                        style={{
                                            gridColumn: weekIndex + 1,
                                            gridRow: dayIndex + 1,
                                            backgroundColor: '#fff',
                                        }}
                                        title={''}
                                    />
                                );
                            }

                            if (dayIndex == 6) {
                                return (
                                    <div
                                        key={`${weekIndex}-${dayIndex}`}
                                        className="w-2.5 h-2.5 rounded-sm col-start-auto mx-0.5 border-[0.5px] border-[#ccc]"
                                        style={{
                                            gridColumn: weekIndex,
                                            gridRow: dayIndex + 1,
                                            backgroundColor: color,
                                        }}
                                        title={`${dayData ? dayData.date : ''}: ${count} contributions`}
                                    />
                                );
                            }

                            return (
                                <div
                                    key={`${weekIndex}-${dayIndex}`}
                                    className="w-2.5 h-2.5 rounded-sm col-start-auto mx-0.5 border-[0.5px] border-[#ccc]"
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
            <div className="flex ml-4 justify-between text-xs text-gray-400 mt-2">
                {months.map((month, index) => (
                    <span key={index}>{month}</span>
                ))}
            </div>
        </div>
    );
};

export default memo(ContributionsGraph);
