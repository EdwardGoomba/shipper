import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Error from './ErrorMessage'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
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

class UpdateItem extends Component {
  state = {}

  handleChange = (event) => {
    const { name, type, value } = event.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: val,
    })
  }

  render() {
    const { id } = this.props
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variable={{ id }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>
          return (
            <Mutation
              mutation={UPDATE_ITEM_MUTATION}
              variables={this.state}
            >
              {(createItem, { loading, error }) => (
                <Form
                  onSubmit={async (event) => {
                    event.preventDefault()
                    const res = await createItem()
                    const { data: { createItem: { id } } } = res
                    Router.push({
                      pathname: '/item',
                      query: { id },
                    })
                  }}
                >
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
                        defaultValue={data.item.title}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        type="text"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        value={price}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                <textarea
                        id="description"
                        name="description"
                        placeholder="Enter A Description"
                        required
                        value={description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">
                      submit
              </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default UpdateItem
export { UPDATE_ITEM_MUTATION }
