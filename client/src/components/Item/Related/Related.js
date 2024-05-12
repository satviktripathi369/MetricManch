import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'; // Import Chart.js
import RelatedCard from '../../Card/RelatedCard/RelatedCard';
import './Related.css';

const Related = (props) => {
    const [items, setItems] = useState([]);

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
        // Create Chart
        const ctx = document.getElementById('myChart').getContext('2d');

        // Clear existing chart canvas
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        // Create new Chart instance
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: props.time,
                datasets: [
                    {
                        label: 'Flipkart',
                        data: props.current_price, // Use current_price data instead of static data
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: 'Amazon',
                        data: prices2, // Use current_price data instead of static data
                        fill: false,
                        borderColor: 'rgb(192, 75, 75)',
                        tension: 0.1
                    }
                ]
            },
        });
    }, [props.time, props.current_price]);

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

const prices2 = [1899, 1899, 1899, 1899, 2000, 2000, 2000, 2099, 2100, 2099, 2000, 1999]; // Prices corresponding to each day for line 2
