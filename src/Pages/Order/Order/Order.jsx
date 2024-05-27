import { useState } from 'react';
import shopBG from '../../../assets/shop/banner2.jpg';
import PageCover from '../../Shared/PageCover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import useMenuFood from '../../../Hooks/useMenuFood';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import "./order.css"
import UseHelmet from '../../../components/UseHelmet/UseHelmet';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams()
    const initialIndex = categories.indexOf(category)

    const [tabIndex, setTabIndex] = useState(initialIndex)

    const { desserts, soups, salads, pizzas, drinks } = useMenuFood()

    return (
        <div>
            <UseHelmet name={"Order Food"}></UseHelmet>
            <PageCover title={"order Food"} img={shopBG}> </PageCover>

            <div className='w-[90%] my-28 md:w-[80%] mx-auto '>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <div className='flex items-center justify-center mb-12'>
                        <TabList className={`uppercase flex items-center gap-5 *:cursor-pointer`}>
                            <Tab>Salad</Tab>
                            <Tab>pizza</Tab>
                            <Tab>soups</Tab>
                            <Tab>desserts</Tab>
                            <Tab>drinks</Tab>
                        </TabList>
                    </div>

                    <TabPanel>
                        <OrderTab items={salads}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizzas}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soups}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={desserts}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinks}></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Order;