import React from 'react';
import StatisticsLine from './StatisticLine'


const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    if (total > 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <table >
                    <tbody>
                        <StatisticsLine text="Good" value={good} />
                        <StatisticsLine text="Neutral" value={neutral} />
                        <StatisticsLine text="Bad" value={bad} />
                        <StatisticsLine text="All" value={total} />
                        <StatisticsLine text="Average" value={(good + 0 * neutral - 1 * bad) / total} />
                        <StatisticsLine text="Positive" value={`${good / total * 100} %`} />
                    </tbody>
                </table>

            </div>
        );
    }
    return (
        <div>No feedback was given</div>
    )
};

export default Statistics;