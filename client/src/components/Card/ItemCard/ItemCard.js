import './ItemCard.css';
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { Scale } from 'chart.js';

const ItemCard = (props) => {
    const cartItemsContext = useContext(CartItemsContext);
    const wishItemsContext = useContext(WishItemsContext);

    const handleAddToWishList = () => {
        wishItemsContext.addItem(props.item);
    };

    const handleAddToCart = () => {
        cartItemsContext.addItem(props.item, 1);
    };

    return (
        <div className="product__card__card">
            <div className="product__card">
                <div className="product__image" style={{ cursor: 'pointer'}}>
                    <img src={props.item.thumbnail} alt="item" className="product__img" />
                </div>
                <div className="product__card__detail">
                    <div className="product__name">
                        <Link
                            to={{
                                pathname: `/item/${props.item._id}`,
                                state: {
                                    thumbnail: props.item.thumbnail,
                                    name: props.item.name,
                                    price: props.item.current_price[props.item.current_price.length - 1]
                                }
                            }}
                        >
                            {props.item.name}
                        </Link>
                    </div>
                    <div className="product__price">
                        <span>₹{props.item.current_price[props.item.current_price.length - 1]}</span>
                    </div>
                    <div className="product__card__action">
                        <IconButton onClick={handleAddToWishList} sx={{ borderRadius: '20px', width: '40px', height: '40px', }}>
                            <FavoriteBorderIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
                        </IconButton>
                        <IconButton onClick={handleAddToCart} sx={{ borderRadius: '20px', width: '40px', height: '40px' }}>
                            <AddShoppingCartIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
                        </IconButton >
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
