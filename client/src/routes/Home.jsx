import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";


const Home = () => {
    const [featuredItems, setFeaturedItems] = useState()
    TabTitle("Home - Shema");

    useEffect(() => {
        axios.get("https://clever-batsheva-upes-4b6f0e1a.koyeb.app/category/fetch")
            .then(res => setFeaturedItems(res.data))
            .catch(err => console.log(err))

        window.scrollTo(0, 0)
    }, [])

    return (
        <Fragment>
            <Landing />
            <FeaturedCategories />
            {/* <FeaturedItems items={featuredItems} /> */}
        </Fragment>
    );
}

export default Home;