import React from 'react';

interface IProps {
    name: string;
    image: string;
    count: number;
    price: number;
    key: string;
    addOne: (name: string) => void;
    removeOne: (name: string) => void;
    removeAll: (name: string) => void;
}

const IngredientPart: React.FC<IProps> = props => {
    return (
        <div className='ingredients-choose'>
            <img className='ingredients-img'
                 src={props.image} alt={props.name}
            />
            <p className='ingredients-info'>{props.name}({props.price}сом)</p>
            <button onClick={() => props.addOne(props.name)} className='add-btn'>+</button>
            <span className='count'>x{props.count}</span>
            <button onClick={() => props.removeOne(props.name)} className='remove-btn'>-</button>
            <button onClick={() => props.removeAll(props.name)} className='del-btn'></button>
        </div>
    );
};

export default IngredientPart;