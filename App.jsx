import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import CartSummary from './CartSummary';
import { CartProvider } from './CartContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="ProductList"
            component={ProductList}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
          />
          <Stack.Screen
            name="CartSummary"
            component={CartSummary}
           />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}