import { Helmet } from 'react-helmet-async';
import banner from '../../../assets/menu/banner3.jpg'
import PageCover from '../../Shared/PageCover';
import MenuCategory from '../MenuCategory/MenuCategory';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import pizzBg from '../../../assets/menu/pizza-bg.jpg'
import dessertsBg from '../../../assets/menu/dessert-bg.jpeg'
import saladsBg from '../../../assets/menu/salad-bg.jpg'
import soupsBg from '../../../assets/menu/soup-bg.jpg'
import useMenuFood from '../../../Hooks/useMenuFood';
import UseHelmet from '../../../components/UseHelmet/UseHelmet';

const Menu = () => {
    const { desserts, soups, salads, pizzas, offered } = useMenuFood()


    return (
        <div>
            <UseHelmet name={"Menu"}></UseHelmet>

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