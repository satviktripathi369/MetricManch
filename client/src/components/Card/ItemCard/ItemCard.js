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

    // Splitting product name and selecting first four words
    const splitName = props.item.name.split(" ").slice(0, 4).join(" ");
    const truncatedName = props.item.name.split(" ").length > 5 ? splitName + "..." : props.item.name;

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
                            {truncatedName}
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
