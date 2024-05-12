import { useEffect, useState } from 'react';
import { TabTitle } from '../../utils/General';
import axios from "axios";
import ShopCategory from './Container/ShopCategory';
import './Shop.css';
import ReactLoading from 'react-loading';

const Shop = () => {
    TabTitle("Shop - SHEMA");
    
    const [menItems, setMenItems] = useState([]);
    const [womenItems, setWomenItems] = useState([]);
    const [kidsItems, setKidsItems] = useState([]);
    const [techItems, setTechItems] = useState([]);
    const [booksItems, setBooksItems] = useState([]);
    const [sportsItems, setSportsItems] = useState([]);
    const [kitchenItems, setKitchenItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const menResponse = await axios.get("https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/men");
                setMenItems(menResponse.data.result.slice(0, 8));

                const womenResponse = await axios.get("https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/Women");
                setWomenItems(womenResponse.data.result.slice(0, 8));

                const kidsResponse = await axios.get("https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/kids");
                setKidsItems(kidsResponse.data.result.slice(0, 8));

                const booksResponse = await axios.get("https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/Books");
                setBooksItems(booksResponse.data.result.slice(0, 8));

                const sportsResponse = await axios.get("https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/Sports");
                setSportsItems(sportsResponse.data.result.slice(0, 8));

                const kitchenResponse = await axios.get("https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/kitchen");
                setKitchenItems(kitchenResponse.data.result.slice(0, 8));

                const techResponse = await axios.get("https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch/Tech");
                setTechItems(techResponse.data.result.slice(0, 8));

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="shop__contianer">
            {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='container h-100 w-10 justify-self-center align-self-center m-auto' />}
            {menItems.length > 0 && <ShopCategory name="Men" key="men" items={menItems} />}
            {womenItems.length > 0 && <ShopCategory name="Women" key="women" items={womenItems} />}
            {kidsItems.length > 0 && <ShopCategory name="Kids" key="kids" items={kidsItems} />}
            {techItems.length > 0 && <ShopCategory name="Tech" key="tech" items={techItems} />}
            {booksItems.length > 0 && <ShopCategory name="Books" key="books" items={booksItems} />}
            {sportsItems.length > 0 && <ShopCategory name="Sports" key="sports" items={sportsItems} />}
            {kitchenItems.length > 0 && <ShopCategory name="Kitchen" key="kitchen" items={kitchenItems} />}
        </div>
    );
}

export default Shop;
