import Banner from "./Banner/Banner";
import CallUs from "./CallUs/CallUs";
import Category from "./Category/Category";
import ChefRecommend from "./ChefRecommend/ChefRecommend";
import ChefServices from "./ChefServices/ChefServices";
import PopularMenu from "./PopularMenu/PopularMenu";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <ChefServices></ChefServices>
            <PopularMenu></PopularMenu>
            <CallUs></CallUs>
            <ChefRecommend></ChefRecommend>
        </div>
    );
};

export default Home;