import { Parallax } from "react-parallax";


const PageCover = ({ img, title }) => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={-200}
            className="object-center object-cover"
        >
            <div className='h-[700px] flex items-center justify-center'>
                <div className="  w-full">
                    <div className='py-28 text-center mx-auto w-2/3 font-cinzle text-white bg-black/60'>
                        <h1 className=' text-6xl uppercase font-semibold'>{title}</h1>
                        <p className='text-sm mt-3 2xl:text-base'>would you like to try a new dish? </p>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default PageCover;