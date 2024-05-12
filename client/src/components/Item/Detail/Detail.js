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
    // const [size, setSize] = useState(props.item.size[0]);

    const cartItems = useContext(CartItemsContext);
    const wishItems = useContext(WishItemsContext);

    // const handleSizeChange = (event) => {
    //     setSize(event.target.value);
    // };

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
        // Add logic to route to props.link
        window.location.href = props.link;
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

                        <div className="product size">
                            <Box sx={{ minWidth: 100 }}>
                                <FormControl fullWidth size="small">
                                    {/* <InputLabel>Size</InputLabel>
                                    <Select
                                        value={size}
                                        label="Size"
                                        onChange={handleSizeChange}
                                    >
                                        {props.item.size.map((size) => (
                                            <MenuItem key={size} value={size}>{size}</MenuItem>
                                        ))}
                                    </Select> */}
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className="collect__item__actions">
                        <div className="add__cart__add__wish">
                            <div className="add__cart">
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#FFE26E',
                                            borderColor: '#FFE26E',
                                            borderWidth: '3px',
                                            color: 'black',
                                        },
                                        minWidth: 200,
                                        borderColor: 'black',
                                        backgroundColor: 'black',
                                        color: '#FFE26E',
                                        borderWidth: '3px',
                                    }}
                                    onClick={handleBuyNow} // Change onClick event to handleBuyNow
                                >
                                    Buy Now {/* Change button text to "Buy Now" */}
                                </Button>
                            </div>
                            <div className="add__wish">
                                <IconButton
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#FFE26E',
                                            borderColor: '#FFE26E',
                                            borderWidth: '3px',
                                            color: 'black',
                                        },
                                        borderColor: 'black',
                                        backgroundColor: 'black',
                                        color: '#FFE26E',
                                        borderWidth: '3px',
                                    }}
                                    onClick={handleAddToWish}
                                >
                                    <FavoriteBorderIcon sx={{ width: '22px', height: '22px' }} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Detail;
