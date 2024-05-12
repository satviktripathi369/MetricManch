import React from 'react';
import ItemCarousel from './Carousel/ItemCarousel';
import Description from './Description/Description';
import Detail from './Detail/Detail';
import './Item.css';
import Related from './Related/Related';

const Item = ({ name, thumbnail, current_price, description, time, link, category}) => {
    // Log the name, thumbnail, and current_price
    console.log("Name:", name);
    console.log("Thumbnail:", thumbnail);
    console.log("Current Price:", current_price);
    console.log("Description:", description);
    console.log("Time:", time);
    console.log("Link:", link);
    console.log("Category:", category);

    if (!name || !thumbnail || !current_price) {
        // Handle the case when any of name, thumbnail, or current_price is undefined
        return <div>Error: Name, thumbnail, or current_price is undefined</div>;
    }

    return (
        <div className="item__container">
            <div className="detail__and__carousel__container">
                <ItemCarousel thumbnail={thumbnail} />
                <Detail name={name} price={current_price[current_price.length - 1]} link={link} />
            </div>
            <div className="item__description__container">
                <Description 
                    description={description} 
                    price={current_price[current_price.length - 1]}
                />
            </div>
            <div className="related__items__container">
                <Related category={category} current_price={current_price} time={time}/>
            </div>
        </div>
    );
}

export default Item;
