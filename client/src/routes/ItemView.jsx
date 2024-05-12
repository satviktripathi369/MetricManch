import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Item from '../components/Item/Item';

const ProductView = () => {
    const param = useParams();
    const [item, setItem] = useState(null);
    const [category, setCategory] = useState(null); // State to store the category
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const categoryAPIs = [
            "https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/men",
            "https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/Women",
            "https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/kids",
            "https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/Laptop",
            "https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/Sports",
            "https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/kitchen",
            "https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/Tech"
        ];

        const fetchData = async () => {
            for (const categoryAPI of categoryAPIs) {
                try {
                    const response = await axios.get(`${categoryAPI}`);
                    const data = response.data;
                    console.log(data)
                    if (data && Array.isArray(data.result) && param && param.id) {
                        const foundItem = data.result.find(item => item._id === param.id);
                        if (foundItem) {
                            setItem(foundItem);
                            setCategory(data.category); // Extract category from the response
                            setLoading(false);
                            return;
                        }
                    }
                } catch (error) {
                    console.log(`Error fetching data from ${categoryAPI}`, error);
                }
            }

            // If item is not found in any category
            setLoading(false);
            // Handle error: Show a friendly error message to the user or take appropriate action
        };

        fetchData();
    }, [param.id]);
    

    return (
        <>
            <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
                {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />}
                {item && category && <Item 
                            name={item.name} 
                            thumbnail={item.thumbnail} 
                            current_price={item.current_price}
                            description={item.description}
                            time={item.time}
                            link={item.link}
                            category={category}
                            current_price_az={item.current_price_az}
                            time_az={item.time_az}
                            query_az_url={item.query_az_url}
                        />}
            </div>
        </>
    );
}

export default ProductView;
