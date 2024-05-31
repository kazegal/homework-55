import {useState} from 'react';
import {nanoid} from "nanoid";
import meatImage from './assets/meat.png';
import baconImage from './assets/bacon.png';
import cheeseImage from './assets/cheese.png';
import saladImage from './assets/salad.png';
import {BurgerType, Ingredient} from "./type";
import ResetButton from "./components/ResetButton/ResetButton";
import Burger from "./components/Burger/Burger";
import IngredientPart from "./components/IngredientPart/IngredientPart";
import './App.css';


const App = () => {

    const INGREDIENTS: Ingredient[] = [
        {id: nanoid(), name: 'Meat', price: 80, image: meatImage},
        {id: nanoid(), name: 'Bacon', price: 60, image: baconImage},
        {id: nanoid(), name: 'Cheese', price: 50, image: cheeseImage},
        {id: nanoid(), name: 'Salad', price: 10, image: saladImage},
    ];

    const [ingredients, setIngredients] = useState<BurgerType[]>([
        {name: 'Meat', count: 0},
        {name: 'Bacon', count: 0},
        {name: 'Cheese', count: 0},
        {name: 'Salad', count: 0},
    ]);

    const [totalPrice, setTotalPrice] = useState(30);


    const addOne = (name: string) => {
        const existingIngredient = ingredients.find(item => item.name === name);
        if (existingIngredient) {
            setIngredients(prevState => {
                return prevState.map(item => {
                    if (item.name === name) {
                        return {
                            ...item,
                            count: item.count + 1
                        };
                    }
                    return item;
                });
            });

            const existingIngredientPrice = INGREDIENTS.find(ingredient => ingredient.name === name)?.price;
            if (existingIngredientPrice) {
                setTotalPrice(prevState => prevState + existingIngredientPrice);
            }
        } else {
            const newIngredient = { name: name, count: 1 };
            setIngredients(prevState => [...prevState, newIngredient]);
            const newIngredientPrice = INGREDIENTS.find(ingredient => ingredient.name === name)?.price;
            if (newIngredientPrice) {
                setTotalPrice(prevState => prevState + newIngredientPrice);
            }
        }
    };

    const removeOne = (name: string) => {
        setIngredients(prevState => {
            return prevState.map(item => {
                if (name === item.name && item.count > 0) {
                    return {
                        ...item,
                        count: item.count - 1
                    }
                }
                return item;
            });
        });

        setTotalPrice(prevState => {
            if (prevState <= 30) {
                return prevState;
            }
            const foundIngredient = INGREDIENTS.find(ingredient => ingredient.name === name);
            if (foundIngredient) {
                const totalPrice = prevState - foundIngredient.price;
                return totalPrice >= 30 ? totalPrice : 30;
            }
            return prevState;
        });
    };

    const removeAll = (name: string) => {
        console.log("removeAll called for", name);
        setIngredients((prevState) => {
            let totalPriceChange = 0;
            prevState.forEach((item, index) => {
                if (item.name === name && item.count > 0) {
                    totalPriceChange -= INGREDIENTS[index].price * item.count;
                }
            });
            setTotalPrice(prevPrice => Math.max(prevPrice + totalPriceChange, 30));
            return prevState.map(item => ({ ...item, count: 0 }));
        });
    };

    const resetAll = () => {
        setIngredients((prevState) => {
            let totalPriceChange = 0;
            prevState.forEach((item, index) => {
                if (item.count > 0) {
                    totalPriceChange -= INGREDIENTS[index].price * item.count;
                }
            });

            setTotalPrice(prevPrice => Math.max(prevPrice + totalPriceChange, 30));

            return prevState.map(item => {
                return {
                    ...item,
                    count: 0
                };
            });
        });
    };

    const showIngredients = INGREDIENTS.map((ingredient, index) => {
        return (
            <IngredientPart name={ingredient.name}
                            image={ingredient.image}
                            count={ingredients[index].count}
                            price={ingredient.price}
                            key={ingredient.id}
                            addOne={addOne}
                            removeOne={removeOne}
                            removeAll={removeAll}
            />
        )
    });

    return (
        <div className="App">
            <div className='ingredients-wrap'>
                <h4 className='ingredients-title'>Ingredients</h4>
                {showIngredients}
                <ResetButton resetAll={resetAll}/>
            </div>

            <div className='burger-wrap'>
                <h4 className='burger-title'>Burger</h4>
                <Burger ingredients={ingredients} totalPrice={totalPrice}/>
            </div>
        </div>
    )
};

export default App;