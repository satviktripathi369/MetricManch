import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Category from '../components/Category/Category';

const CategoryView = () => {
    const param = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        axios.get(`https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/${param.id}`)
            .then(res => {
                setItems(res.data.result);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setLoading(false);
            });

        window.scrollTo(0, 0);
    }, [param.id]);

    const renderItems = () => {
        if (!Array.isArray(items)) {
            console.error('Items is not an array:', items);
            return null;
        }

        return items.map(item => (
            <div key={item._id}>
                <p>Name: {item.name}</p>
                {/* Add a check for item.current_price */}
                <p>Price: {item.current_price && item.current_price.length > 0 ? item.current_price[item.current_price.length - 1] : 'Price not available'}</p>
                <img src={item.thumbnail} alt={item.name} />
            </div>
        ));
    };

    return (
        <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
            {loading ? (
                <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />
            ) : (
                <>
                    {param.id === 'men' && <Category name="Men's Fashion" items={items} category="men" />}
                    {param.id === 'kids' && <Category name="Kids Fashion" items={items} category="kids" />}
                    {param.id === 'Women' && <Category name="Women's Fashion" items={items} category="Women" />}
                    {param.id === 'Laptop' && <Category name="Laptop Fashion" items={items} category="Laptop" />}
                    {param.id === 'Sports' && <Category name="Sports Fashion" items={items} category="sports" />}
                    {param.id === 'kitchen' && <Category name="Kitchen Fashion" items={items} category="kitchen" />}
                    {param.id === 'Tech' && <Category name="Technology" items={items} category="tech" />}
                    {param.id === 'mobile' && <Category name="Mobile" items={items} category="mobile" />}
                </>
            )}
        </div>
    );
};

export default CategoryView;
