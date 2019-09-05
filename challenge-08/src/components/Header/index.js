import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import { Container, Logo, BasketContainer, ItemCount } from './styles';

function Header({ navigation }) {
    const cartSize = useSelector(state => state.cart.length);

    return (
        <Container>
            <Logo />
            <BasketContainer onPress={() => navigation.navigate('Cart')}>
                <Icon name="shopping-basket" color="#FFF" size={24} />
                <ItemCount>{cartSize || 0}</ItemCount>
            </BasketContainer>
        </Container>
    );
}

export default Header;
