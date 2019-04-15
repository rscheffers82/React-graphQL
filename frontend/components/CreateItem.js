import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        title: 'Cool shoes',
        description: 'Some really awesome wanderers',
        image: 'shoes.jpg',
        largeImage: 'large-shoes.jpg',
        price: 2499,
    }

    handleChange = e => {
        const {name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <Mutation
                mutation={CREATE_ITEM_MUTATION}
                variables={this.state}
            >
                {/* (mutationFunction, payload) => {} */}
                {(createItem, { loading, error }) => (
                    <Form onSubmit={async e => {
                        e.preventDefault();
                        // call the mutation
                        const res = await createItem();
                        // route user to single item page.
                        Router.push({
                            pathname: '/item',
                            query: { id: res.data.createItem.id }
                        });
                    }}>
                        <Error error={error} />
                        <fieldset
                            disabled={loading}
                            aria-busy={loading}
                        >
                            <label htmlFor="title">
                            Title
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Title"
                                required
                                onChange={this.handleChange}
                                value={this.state.title}
                            />
                            </label>
        
                            <label htmlFor="price">
                            price
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="price"
                                required
                                onChange={this.handleChange}
                                value={this.state.price}
                            />
                            </label>
        
                            <label htmlFor="description">
                            Description
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter A Description"
                                required
                                onChange={this.handleChange}
                                value={this.state.description}
                            />
                            </label>
        
                            <button type="submit">Submit</button>
        
                        </fieldset>
                    </Form>                    
                )}
            </Mutation>
        )
    }
}

export default CreateItem;

export {
    CREATE_ITEM_MUTATION
}