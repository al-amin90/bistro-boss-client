import { Link } from "react-router-dom";
import MenuItem from "../../Shared/MenuItem";
import SectionCover from "../../Shared/SectionCover";


const MenuCategory = ({ items, title, img }) => {


    return (
        <div className="mb-12">
            {title && <SectionCover title={title} img={img}></SectionCover>}

            <div className='grid grid-cols-2 mt-16 gap-6 w-[90%] my-28 md:w-[80%] mx-auto '>
                {
                    items?.map(item => <MenuItem
                        item={item}
                        key={item._id}></MenuItem>)
                }
            </div>

            {title && <Link to={`/order/${title}`} className='flex items-center justify-center mt-16'>
                <button className='uppercase bg-transparent border-x-0 text-black border-t-0 border-b-2 border-black btn'>ORDER YOUR FAVOURITE FOOD</button>
            </Link>}

        </div>
    );
};

export default MenuCategory;