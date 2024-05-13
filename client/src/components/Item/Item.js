import React from 'react';
import ItemCarousel from './Carousel/ItemCarousel';
import Description from './Description/Description';
import Detail from './Detail/Detail';
import './Item.css';
import Related from './Related/Related';

const Item = ({ name, thumbnail, current_price, description, time, link, category, current_price_az, time_az, query_az_url, az_thumbnail}) => {
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
                <ItemCarousel thumbnail={thumbnail} az_thumbnail={az_thumbnail}/>
                <Detail name={name} price={current_price[current_price.length - 1]} current_price_az={current_price_az[current_price_az.length - 1]} link={link} query_az_url={query_az_url} />
            </div>
            <div className="item__description__container">
                <Description 
                    description={description} 
                    price={current_price[current_price.length - 1]}
                />
            </div>
            <div className="related__items__container">
                <Related category={category} current_price={current_price} time={time} current_price_az={current_price_az} time_az={time_az} />
            </div>
        </div>
    );
}

export default Item;
