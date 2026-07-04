import React, { useMemo, useState, useCallback } from 'react';
import { FlatList, RefreshControl, StatusBar, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingCart } from 'lucide-react-native';

import useProducts, { STATUS } from './useProducts';
import useDebouncedValue from './useDebouncedValue';
import { useCart } from './CartContext';
import { COLORS, SEARCH_DEBOUNCE_MS } from './theme';

import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import StateView from './StateView';

import styles from './ProductList.styles';

export default function ProductList({ navigation }) {
  const { products, status, errorMessage, refreshing, refresh, retry } =
    useProducts();
  const { cartItems } = useCart();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return products;

    return products.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [products, debouncedSearch]);

  const handleOpenProduct = useCallback(
    (product) => {
      navigation.navigate('ProductDetails', { productId: product.id });
    },
    [navigation]
  );

  const handleOpenCart = useCallback(() => {
    navigation.navigate('CartSummary');
  }, [navigation]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <ProductCard item={item} index={index} onPress={handleOpenProduct} />
    ),
    [handleOpenProduct]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  if (status === STATUS.LOADING) {
    return <StateView loading message="Loading Products..." />;
  }

  if (status === STATUS.ERROR) {
    return <StateView message={errorMessage} onRetry={retry} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.heading}>Discover</Text>
          <Text style={styles.subHeading}>Find your favorite products</Text>
        </View>

        <Pressable style={styles.cartButton} onPress={handleOpenCart}>
          <ShoppingCart size={24} color={COLORS.textPrimary} />

          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartCount > 99 ? '99+' : cartCount}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search products..."
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={COLORS.accent}
          />
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found.</Text>
        }
        // Rows contain fixed-height cards; pair with getItemLayout if the
        // list ever needs windowing tuned for very large catalogs.
      />
    </SafeAreaView>
  );
}