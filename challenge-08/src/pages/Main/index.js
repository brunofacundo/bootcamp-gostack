import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';

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

export default function Main() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    const amount = useSelector(state =>
        state.cart.reduce((amountSum, product) => {
            amountSum[product.id] = product.amount;
            return amountSum;
        }, {})
    );

    useEffect(() => {
        async function getProducts() {
            const response = await api.get('/products');

            const data = response.data.map(product => ({
                ...product,
                priceFormatted: formatPrice(product.price)
            }));

            setProducts(data);
        }

        getProducts();
    }, []);

    function handleAddProduct(id) {
        dispatch(CartActions.addToCartRequest(id));
    }

    return (
        <Container>
            <FlatList
                horizontal
                data={products}
                extraData={amount}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <Product key={item.id}>
                        <ProductImage source={{ uri: item.image }} />
                        <ProductTitle>{item.title}</ProductTitle>
                        <ProductPrice>{item.priceFormatted}</ProductPrice>
                        <AddButton onPress={() => handleAddProduct(item.id)}>
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
