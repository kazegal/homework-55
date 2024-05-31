import React, {MouseEventHandler} from 'react';

interface IProps {
    resetAll:MouseEventHandler;
}

const ResetButton:React.FC<IProps> = ({resetAll}) => {
    return (
        <button onClick={resetAll} className='reset-btn'>Reset All</button>
    );
};

export default ResetButton;