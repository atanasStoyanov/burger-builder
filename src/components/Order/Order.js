import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for (const ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return <span className={classes.Ingredients} key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>;
    });

    return (

        <div className={classes.Order}>
            {ingredientOutput}
            <p>Price: <strong>USD {Number(props.price).toFixed(2)}</strong></p>

        </div>
    )
};

export default order;