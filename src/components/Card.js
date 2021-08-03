import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ module }) => {

    return (
        <div>
            <div className="card m-10 card-cont">
                {module.name}
            </div>
        </div>
    );
}

export default Card;