import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import RelatedCard from '../../Card/RelatedCard/RelatedCard';
import './Related.css';

const Related = (props) => {
    const [items, setItems] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        axios.get(`https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/men`)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setItems(res.data);
                } else {
                    setItems([]); // Set items to an empty array if response is not an array
                }
            })
            .catch(err => console.log(err));
    }, [props.category]);

    useEffect(() => {
        if (chartRef.current !== null) {
            // Destroy existing chart instance if it exists
            chartRef.current.destroy();
        }

        // Merge props.time and props.time_az without duplicates
        const mergedTime = [...new Set([...props.time, ...props.time_az])];

        // Sort merged time array based on "DD/MM/YYYY HH:MM" format
        mergedTime.sort((a, b) => {
            const [dayA, monthA, yearA, hourA, minuteA] = a.split(/\/|\s|:/);
            const [dayB, monthB, yearB, hourB, minuteB] = b.split(/\/|\s|:/);
            const dateA = new Date(yearA, monthA - 1, dayA, hourA, minuteA);
            const dateB = new Date(yearB, monthB - 1, dayB, hourB, minuteB);
            return dateA - dateB;
        });        // Create Chart
        console.log(mergedTime)
        const ctx = document.getElementById('myChart').getContext('2d');

        // Create new Chart instance
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: mergedTime, // Merged time array for x-axis
                datasets: [
                    {
                        label: 'Flipkart', // Label for Flipkart line
                        data: getChartData(props.time, props.current_price, mergedTime), // Data for Flipkart line
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)', // Flipkart line color
                        tension: 0.1
                    },
                    {
                        label: 'Amazon', // Label for Amazon line
                        data: getChartData(props.time_az, props.current_price_az, mergedTime), // Data for Amazon line
                        fill: false,
                        borderColor: 'rgb(192, 75, 75)', // Amazon line color
                        tension: 0.1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            callback: function(value, index, values) {
                                return '₹' + value;
                            }
                        }
                    }
                }
            }
        });

        // Save chart reference to be able to destroy it later
        chartRef.current = chart;

        return () => {
            // Cleanup chart instance when component unmounts
            if (chartRef.current !== null) {
                chartRef.current.destroy();
            }
        };
    }, [props.time, props.current_price, props.time_az, props.current_price_az]);

    // Function to generate data for the chart based on available data points
    // Function to generate data for the chart based on available data points
const getChartData = (timeArray, priceArray, mergedTimeArray) => {
    const data = [];
    for (let i = 0; i < mergedTimeArray.length; i++) {
        const currentTime = mergedTimeArray[i];
        const currentIndex = timeArray.indexOf(currentTime);
        if (currentIndex !== -1) {
            // Point exists, add its value to the data array
            data.push(priceArray[currentIndex]);
        } else {
            // Point is missing, check for previous and next points
            const previousIndex = i > 0 ? timeArray.indexOf(mergedTimeArray[i - 1]) : -1;
            const nextIndex = i < mergedTimeArray.length - 1 ? timeArray.indexOf(mergedTimeArray[i + 1]) : -1;
            if (previousIndex !== -1 && nextIndex !== -1) {
                // Both previous and next points exist, interpolate value
                const previousValue = priceArray[previousIndex];
                const nextValue = priceArray[nextIndex];
                const interpolatedValue = (previousValue + nextValue) / 2; // Interpolate value
                data.push(interpolatedValue);
            } else if (previousIndex !== -1) {
                // Only previous point exists, use its value
                data.push(priceArray[previousIndex]);
            } else if (nextIndex !== -1) {
                // Only next point exists, use its value
                data.push(priceArray[nextIndex]);
            } else {
                // No neighboring points exist, push null
                data.push(null);
            }
        }
    }
    return data;
};

    return (
        <div className="related__products">
            {/* Chart */}
            <canvas id="myChart" style={{ height: '80vh' }} />

            <div className="related__header__container">
                <div className="related__header">
                    {/* <h2>Recommended Products</h2> */}
                </div>
                {/* <div className="related__header__line"></div> */}
            </div>
            <div className="related__card__container">
                <div className="related__product__card">
                    {items.map((item) => <RelatedCard key={item.id} item={item} />)}
                </div>
            </div>
        </div>
    );
}

export default Related;
