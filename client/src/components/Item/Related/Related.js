import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'; // Import Chart.js
import RelatedCard from '../../Card/RelatedCard/RelatedCard';
import './Related.css';

const Related = (props) => {
    const [menItems, setMenItems] = useState();
    const [womenItems, setWomenItems] = useState();
    const [kidsItems, setKidsItems] = useState();

    useEffect(() => {
        axios.get("https://shema-backend.vercel.app/api/items")
            .then(res => {
                setMenItems(res.data.filter((item) => item.category === "men"));
                setKidsItems(res.data.filter((item) => item.category === "kids"));
                setWomenItems(res.data.filter((item) => item.category === "women"));
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        // Create Chart
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: data,
        });
    }, []);

    return (
        <div className="related__products">
            {/* Chart */}
            <canvas id="myChart" style={{ height: '80vh' }} />

            <div className="related__header__container">
                <div className="related__header">
                    <h2>Recommended Products</h2>
                </div>
                <div className="related__header__line"></div>
            </div>
            <div className="related__card__container">
                <div className="related__product__card">
                    {menItems && props.category === "men" && menItems.map((item) => <RelatedCard key={item.id} item={item} />)}
                    {womenItems && props.category === "women" && womenItems.map((item) => <RelatedCard key={item.id} item={item} />)}
                    {kidsItems && props.category === "kids" && kidsItems.map((item) => <RelatedCard key={item.id} item={item} />)}
                </div>
            </div>
        </div>
    );
}

export default Related;

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const prices1 = [1299, 1299, 1399, 1399, 1499]; // Prices corresponding to each day for line 1
const prices2 = [999, 1099, 1299, 1599, 1899]; // Prices corresponding to each day for line 2

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Flipkart',
            data: prices1, // Use prices data instead of static data
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: 'Amazon',
            data: prices2, // Use prices data instead of static data
            fill: false,
            borderColor: 'rgb(192, 75, 75)',
            tension: 0.1
        }
    ]
};
