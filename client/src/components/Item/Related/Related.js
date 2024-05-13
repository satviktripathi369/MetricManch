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

        // Create Chart
        const ctx = document.getElementById('myChart').getContext('2d');

        // Create new Chart instance
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: props.time,
                datasets: [
                    {
                        label: 'Flipkart',
                        data: props.current_price,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: 'Amazon',
                        data: props.current_price_az,
                        fill: false,
                        borderColor: 'rgb(192, 75, 75)',
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
    }, [props.time, props.current_price, props.current_price_az]);

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
