import React, {Component} from 'react';

import CheckoutSmmary from '../../components/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    render() {
        return (
            <div>
                <CheckoutSmmary ingredients={this.state.ingredients}/>
            </div>
        )
    }
}

export default Checkout;