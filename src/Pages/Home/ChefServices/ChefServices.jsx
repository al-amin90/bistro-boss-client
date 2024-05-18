import service from '../../../assets/home/chef-service.jpg';

const ChefServices = () => {
    return (
        <div className='w-[90%] relative -mt-10 mb-28 md:w-[80%] mx-auto '>
            <img className='h-[calc(100vh-200px)]' src={service} alt="" />
            <div className='p-16 text-center mx-24 text-black absolute top-1/2 bg-white -translate-y-1/2'>
                <h1 className='font-cinzle text-4xl font-medium'>Bistro Boss</h1>
                <p className='text-sm mt-2 2xl:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
            </div>
        </div>
    );
};

export default ChefServices;