import { useContext, useState } from 'react';
import './Detail.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { CartItemsContext } from '../../../Context/CartItemsContext';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Detail = (props) => {
    const [quantity, setQuantity] = useState(1);

    const cartItems = useContext(CartItemsContext);
    const wishItems = useContext(WishItemsContext);

    const handleQuantityIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleQuantityDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        cartItems.addItem(props.item, quantity);
    };

    const handleAddToWish = () => {
        wishItems.addItem(props.item);
    };

    const handleBuyNow = () => {
        window.location.href = props.link;
    };

    const handleBuyNowTwo = () => {
        window.location.href = props.query_az_url;
    };

    return (
        <div className="product__detail__container">
            <div className="product__detail">
                <div className="product__main__detail">
                    <div className="product__name__main">{props.name}</div>
                    <div className="product__price__detail">₹{props.price}</div>
                </div>
                <form onSubmit={handleAddToCart} className="product__form">
                    <div className="product__quantity__and__size">
                        <div className="product__quantity">
                            <IconButton onClick={handleQuantityIncrement}>
                                <AddCircleIcon />
                            </IconButton>
                            <div className="quantity__input">{quantity}</div>
                            <IconButton onClick={handleQuantityDecrement}>
                                <RemoveCircleIcon fontSize="medium" />
                            </IconButton>
                        </div>
                        <div className="add__wish">
                            <IconButton
                                variant="outlined"
                                size="large"
                                onClick={handleAddToWish}
                            >
                                <FavoriteBorderIcon />
                            </IconButton>
                        </div>
                    </div>
                    
                    <div className="collect__item__actions">
                        <div className="add__cart">
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={handleBuyNow}
                                sx={{ marginRight: '10px', backgroundColor: 'black', color: '#FFE26E' }}
                            >
                                Buy from Flipkart (₹{props.price})
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={handleBuyNowTwo}
                                sx={{ marginRight: '10px', backgroundColor: 'black', color: '#FFE26E' }}
                            >
                                Buy from Amazon (₹{props.current_price_az})
                            </Button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Detail;
