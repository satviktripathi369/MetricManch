import { Link } from 'react-router-dom';
import './NavLinks.css'

const NavLinks = () => {
    return (
        <nav className="nav__bottom__container">
            <div className="bottom__container">
                <ul className="nav">
                    <li className='nav-link'><Link to="/">Home</Link></li>
                    <li className='nav-link'><Link to="/shop">Shop</Link> </li>
                    <li className='nav-link'><Link to="/category/men">Men</Link></li>
                    <li className='nav-link'><Link to="/category/Women">Women</Link></li>
                    <li className='nav-link'><Link to="/category/kids">Kids</Link></li>
                    <li className='nav-link'><Link to="/category/Books">Books</Link></li>
                    <li className='nav-link'><Link to="/category/Sports">Sports</Link></li>
                    <li className='nav-link'><Link to="/category/kitchen">Kitchen</Link></li>
                    <li className='nav-link'><Link to="/category/Tech">Technology</Link></li>

                </ul>
            </div>
        </nav>
    );
}

export default NavLinks;