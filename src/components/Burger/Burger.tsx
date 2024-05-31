import React from 'react';
import {nanoid} from "nanoid";
import {BurgerType,} from "../../type";

interface IProps {
    ingredients: BurgerType[];
    totalPrice: number;
}

const Burger: React.FC<IProps> = ({ingredients, totalPrice}) => {
    return (
        <div className="Burger">
            <div className="BreadTop">
                <div className="Seeds1"></div>
                <div className="Seeds2"></div>
            </div>
            {ingredients.map(item => {
                const div: React.ReactNode[] = [];
                for (let i = 0; i < item.count; i++) {
                    div.push(<div className={item.name} key={nanoid()}></div>);
                }
                return div;
            })}
            <div className="BreadBottom"></div>
            <p>Total Price:</p>
            <p>{totalPrice} сом</p>
        </div>
    );
};

export default Burger;