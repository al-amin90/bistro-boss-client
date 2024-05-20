import featuresImg from '../../../assets/home/featured.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Featured = () => {
    return (
        <div className='bg-no-repeat bg-cover bg-center bg-fixed ' style={{ backgroundImage: `url(${featuresImg})` }}>
            <div className='bg-black py-28 w-full h-full bg-opacity-60'>
                <SectionTitle
                    color="white"
                    heading={" Featured item"}
                    subHeading={"FROM OUR MENU"}
                ></SectionTitle>

                <div className='flex items-center w-[90%] md:w-[80%] mx-auto justify-center lg:gap-10 flex-col lg:flex-row'>
                    <div>
                        <img src={featuresImg} alt="" />
                    </div>
                    <div className='text-white'>
                        <p className='text-xl'>Aug 20,2029</p>
                        <p className='uppercase text-xl'>Where can i get some?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        <button className='uppercase mt-6 bg-transparent border-x-0 text-white border-t-0 border-b-2 border-white btn'>Read More</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Featured;