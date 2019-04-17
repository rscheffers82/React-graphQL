import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

/* Improvement:
 *  - Disable the submit button until the file is uploaded
      currently the user can submit while the file is still being uploaded.
      The API will catch this and display an error, but the UX can be improved here.
*/

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
        title: '',
        description: '',
        image: undefined,
        largeImage: '',
        price: undefined,
    }

    handleChange = e => {
        const {name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: value });
    }

    uploadFile = async e => {
        console.log();
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sickfits');

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/Smartimg/image/upload',
            {
                method: 'POST',
                body: data,
            }
        );
        const file = await res.json();
        console.log(file);

        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        })
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
                        {this.state.image && <img src={this.state.image} alt="Upload preview" />}
                            <label htmlFor="file">
                            File
                            <input
                                type="file"
                                id="file"
                                name="file"
                                placeholder="Upload an image"
                                required
                                onChange={this.uploadFile}
                            />
                            </label>

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
                                value={this.state.price || ''}
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