import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { CloudOff, ArrowLeft, Star, ShoppingCart } from 'lucide-react-native';
import { useCart } from './CartContext';

const ProductDetails = ({ route, navigation }) => {
  const { productId } = route.params;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch product.');
      }

      const data = await response.json();
      setProduct(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Success', `${product.title} added to cart.`);
    navigation.navigate('CartSummary');
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#EF4444" />
        <Text style={styles.message}>Loading Product...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <CloudOff size={70} color="#64748B" />

        <Text style={styles.message}>{error}</Text>

        <Pressable
          style={styles.retryButton}
          onPress={fetchProduct}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#020617"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>

        <LinearGradient
          colors={[
            'rgba(30,41,59,0.95)',
            'rgba(15,23,42,0.90)',
          ]}
          style={styles.card}
        >
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.category}>
            {product.category}
          </Text>

          <Text style={styles.title}>
            {product.title}
          </Text>

          <Text style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>

          {product.rating && (
            <View style={styles.ratingContainer}>
              <Star size={18} color="#FACC15" fill="#FACC15" />

              <Text style={styles.ratingText}>
                {product.rating.rate} (
                {product.rating.count} reviews)
              </Text>
            </View>
          )}

          <Text style={styles.descriptionTitle}>
            Description
          </Text>

          <Text style={styles.description}>
            {product.description}
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.addToCartButton,
              {
                opacity: pressed ? 0.8 : 1,
                transform: [
                  {
                    scale: pressed ? 0.98 : 1,
                  },
                ],
              },
            ]}
            onPress={handleAddToCart}
          >
            <ShoppingCart size={24} color="#FFFFFF" />

            <Text style={styles.addToCartText}>
              Add to Cart
            </Text>
          </Pressable>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },

  center: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  message: {
    marginTop: 20,
    color: '#CBD5E1',
    fontSize: 16,
    textAlign: 'center',
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },

  card: {
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 30,
  },

  image: {
    width: '100%',
    height: 300,
    marginBottom: 30,
  },

  category: {
    fontSize: 14,
    color: '#94A3B8',
    textTransform: 'capitalize',
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 34,
  },

  price: {
    fontSize: 32,
    fontWeight: '800',
    color: '#EF4444',
    marginTop: 20,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  ratingText: {
    color: '#CBD5E1',
    fontSize: 15,
    marginLeft: 8,
  },

  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 30,
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#CBD5E1',
  },

  addToCartButton: {
    marginTop: 35,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  addToCartText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  retryButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 20,
  },

  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});