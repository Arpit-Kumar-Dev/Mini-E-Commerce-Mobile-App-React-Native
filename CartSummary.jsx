import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react-native';
import { useCart } from './CartContext';

const CartSummary = ({ navigation }) => {
  const { cartItems, removeItem, increaseQty, decreaseQty } = useCart();

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity, 0);
  }, [cartItems]);

  const placeOrder = () => {
    Alert.alert(
      'Success',
      'Your order has been placed.'
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <Text style={styles.price}>
          ${item.price.toFixed(2)}
        </Text>

        <View style={styles.qtyContainer}>
          <Pressable
            style={styles.qtyButton}
            onPress={() =>
              decreaseQty(item.id)
            }
          >
            <Text style={styles.qtyText}>
              -
            </Text>
          </Pressable>

          <Text style={styles.quantity}>
            {item.quantity}
          </Text>

          <Pressable
            style={styles.qtyButton}
            onPress={() =>
              increaseQty(item.id)
            }
          >
            <Text style={styles.qtyText}>
              +
            </Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={() =>
          removeItem(item.id)
        }
      >
        <Trash2 size={24} color="#EF4444" />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.heading}>
          Cart Summary
        </Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 180,
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Your cart is empty.
          </Text>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View>
            <Text style={styles.totalLabel}>
              Total Price
            </Text>

            <Text style={styles.total}>
              ${totalPrice.toFixed(2)}
            </Text>
          </View>

          <Pressable
            style={styles.orderButton}
            onPress={placeOrder}
          >
            <ShoppingBag size={22} color="#fff" />

            <Text
              style={styles.orderText}
            >
              Place Order
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
  },

  card: {
    backgroundColor: '#0F172A',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  image: {
    width: 80,
    height: 80,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  price: {
    color: '#EF4444',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 10,
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  qtyButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  quantity: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
  },

  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#0F172A',
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  totalLabel: {
    color: '#94A3B8',
    fontSize: 14,
  },

  total: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 6,
  },

  orderButton: {
    marginTop: 20,
    backgroundColor: '#EF4444',
    height: 58,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  orderText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },

  empty: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
  },
});