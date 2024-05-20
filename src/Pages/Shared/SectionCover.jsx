

const SectionCover = ({ title, img }) => {
    return (
        <div className=' relative mb-28  '>
            <img className='h-[600px] w-full object-cover' src={img} alt="" />
            <div className='py-24 px-20 text-center right-1/2 translate-x-1/2 w-2/3 text-white absolute top-1/2 bg-black/60 -translate-y-1/2'>
                <h1 className='font-cinzle text-4xl font-medium'>{title}</h1>
                <p className='text-sm mt-2 2xl:text-base'>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>
    );
};

export default SectionCover;