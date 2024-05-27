import useMenu from './useMenu';

const useMenuFood = () => {
    const { menu } = useMenu()
    const desserts = menu.filter(item => item.category === "dessert")
    const soups = menu.filter(item => item.category === "soup")
    const salads = menu.filter(item => item.category === "salad")
    const pizzas = menu.filter(item => item.category === "pizza")
    const offered = menu.filter(item => item.category === "offered")
    const drinks = menu.filter(item => item.category === "drinks")


    return { desserts, soups, salads, pizzas, offered, drinks }

};

export default useMenuFood;