import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CartActions from '../../store/modules/cart/actions';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import {
    Container,
    Product,
    ProductImage,
    ProductTitle,
    ProductPrice,
    AddButton,
    ProductAmount,
    ProductAmountText,
    AddButtonText
} from './styles';

class Main extends Component {
    state = {
        products: []
    };

    async componentDidMount() {
        const response = await api.get('/products');

        const products = response.data.map(product => ({
            ...product,
            priceFormatted: formatPrice(product.price)
        }));

        this.setState({ products });
    }

    handleAddProduct = id => {
        const { addToCartRequest } = this.props;

        addToCartRequest(id);
    };

    render() {
        const { products } = this.state;
        const { amount } = this.props;

        return (
            <Container>
                <FlatList
                    horizontal
                    data={products}
                    extraData={this.props}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Product key={item.id}>
                            <ProductImage source={{ uri: item.image }} />
                            <ProductTitle>{item.title}</ProductTitle>
                            <ProductPrice>{item.priceFormatted}</ProductPrice>
                            <AddButton onPress={() => this.handleAddProduct(item.id)}>
                                <ProductAmount>
                                    <Icon name="add-shopping-cart" color="#FFF" size={20} />
                                    <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
                                </ProductAmount>
                                <AddButtonText>ADICIONAR</AddButtonText>
                            </AddButton>
                        </Product>
                    )}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    amount: state.cart.reduce((amount, product) => {
        amount[product.id] = product.amount;
        return amount;
    }, {})
});

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
