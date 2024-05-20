import { Helmet } from 'react-helmet-async';
import banner from '../../../assets/menu/banner3.jpg'
import PageCover from '../../Shared/PageCover';
import MenuCategory from '../MenuCategory/MenuCategory';
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import SectionCover from '../../Shared/SectionCover';
import pizzBg from '../../../assets/menu/pizza-bg.jpg'
import dessertsBg from '../../../assets/menu/dessert-bg.jpeg'
import saladsBg from '../../../assets/menu/salad-bg.jpg'
import soupsBg from '../../../assets/menu/soup-bg.jpg'

const Menu = () => {
    const { menu } = useMenu()
    const desserts = menu.filter(item => item.category === "dessert")
    const soups = menu.filter(item => item.category === "soup")
    const salads = menu.filter(item => item.category === "salad")
    const pizzas = menu.filter(item => item.category === "pizza")
    const offered = menu.filter(item => item.category === "offered")


    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <PageCover
                img={banner}
                title={"our menu"}
            ></PageCover>

            {/* offered section */}
            <div className='mt-28'>
                <SectionTitle
                    color="black"
                    heading="TODAY'S OFFER"
                    subHeading="Don't miss "
                ></SectionTitle>
                <MenuCategory items={offered}></MenuCategory>

            </div>

            {/* desserts section */}
            <MenuCategory title={"desserts"} items={desserts} img={dessertsBg}></MenuCategory>

            {/*  pizzas section*/}
            <MenuCategory title={"Pizza"} img={pizzBg} items={pizzas}></MenuCategory>

            {/* salads section */}
            <MenuCategory title={"salads"} items={salads} img={saladsBg}></MenuCategory>

            {/* soups section */}
            <MenuCategory title={"soups"} items={soups} img={soupsBg}></MenuCategory>
        </div>
    );
};

export default Menu;