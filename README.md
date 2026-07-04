# 🛍️ ShopApp — React Native E-Commerce Demo

A sleek, dark-themed React Native shopping app built with the [Fake Store API](https://fakestoreapi.com). Browse products, search in real time, view detailed product pages, and manage a shopping cart.

---

## ✨ Features

- **Product Catalog** — Fetches live product data from the Fake Store API, displayed in a responsive 2-column grid with staggered fade/scale-in animations.
- **Live Search** — Debounced search bar filters products by title or category as you type.
- **Pull to Refresh** — Swipe down on the product list to refetch the catalog.
- **Product Details** — Full product view with image, price, category, star rating, and description.
- **Global Cart** — Add-to-cart, quantity adjustment, and item removal, powered by React Context so cart state is shared across every screen.
- **Cart Badge** — Live item count badge on the cart icon in the header.
- **Loading & Error States** — Graceful loading spinners and retry-able error screens for network failures.
- **Icon System** — Vector icons via `lucide-react-native` (SVG-based, no native font linking required).
- **Styling** — Styled with React Native's built-in `StyleSheet.create` API, with shared color/layout tokens centralized in `theme.js`.

---

## 🧱 Tech Stack

| Category            | Library                                                                 |
|---------------------|--------------------------------------------------------------------------|
| Framework            | [React Native](https://reactnative.dev) (Community CLI, no Expo)         |
| Navigation           | [`@react-navigation/native`](https://reactnavigation.org) + native-stack |
| Styling              | React Native `StyleSheet.create`                                         |
| State Management     | React Context API (`CartContext`)                                        |
| Icons                | [`lucide-react-native`](https://lucide.dev)                              |
| Gradients            | `react-native-linear-gradient`                                           |
| Safe Areas           | `react-native-safe-area-context`                                         |
| Data Source          | [Fake Store API](https://fakestoreapi.com)                               |
| Language             | JavaScript (JSX)                                                          |

---

## 📁 Project Structure

```
.
├── App.jsx                  # Root component — navigation stack + CartProvider
├── CartContext.js           # Global cart state (add/remove/qty via Context API)
├── ProductList.jsx          # Home screen — grid, search, pull-to-refresh, cart badge
├── ProductList.styles.js    # Styles for ProductList
├── ProductCard.jsx          # Animated product card used in the grid
├── ProductCard.styles.js    # Styles for ProductCard
├── ProductDetails.jsx       # Single product screen — fetch by id, add to cart
├── CartSummary.jsx          # Cart screen — line items, quantity controls, checkout
├── SearchBar.jsx            # Debounced search input with icon
├── SearchBar.styles.js      # Styles for SearchBar
├── StateView.jsx            # Reusable full-screen loading/error state
├── StateView.styles.js      # Styles for StateView
├── useProducts.js           # Hook: fetch/refresh/retry product list + status machine
├── useDebouncedValue.js     # Generic debounce hook (used by search)
├── productsApi.js           # Fetch wrapper for the Fake Store API
├── theme.js                 # Shared color, layout, and animation constants
└── app.json                 # App name/display name
```

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure your environment is set up per the [React Native environment guide](https://reactnative.dev/docs/set-up-your-environment).

- Node.js ≥ 18
- Ruby + CocoaPods (iOS only)
- Android Studio / Xcode

### 2. Install dependencies

```sh
npm install
```

### 3. iOS only — install CocoaPods

```sh
cd ios && bundle install && bundle exec pod install && cd ..
```

### 4. Start Metro

```sh
npm start
```

### 5. Run the app

**Android**
```sh
npm run android
```

**iOS**
```sh
npm run ios
```

---

## 🎨 Styling

This project uses React Native's built-in `StyleSheet.create` API. Each major component has a co-located `*.styles.js` file (e.g. `ProductCard.styles.js`) so styles stay organized without bloating the component file.

Shared design tokens live in `theme.js`:

- **`COLORS`** — the app's dark color palette (background, accent red, text tones, etc.)
- **`LAYOUT`** — shared sizing values (card radius, search bar height, image height, etc.)
- **`ANIMATION`** — timing values used by `ProductCard`'s stagger/fade-in animation
- **`SEARCH_DEBOUNCE_MS`** — debounce delay for the search bar

Import these tokens into any `*.styles.js` file instead of hardcoding values, so the whole app stays visually consistent and easy to re-theme.

---

## 🛒 Cart State

Cart state lives in `CartContext.js` and is provided at the root of the app in `App.jsx`:

```jsx
<CartProvider>
  <NavigationContainer>...</NavigationContainer>
</CartProvider>
```

Any screen can read/update the cart via the `useCart()` hook:

```jsx
const { cartItems, addToCart, removeItem, increaseQty, decreaseQty, clearCart } = useCart();
```

- Adding a product already in the cart increments its quantity instead of duplicating it.
- Quantity can never drop below 1 via the UI controls (use `removeItem` to fully remove an item).

---

## 🔌 API

All product data comes from the public [Fake Store API](https://fakestoreapi.com):

| Endpoint | Used in |
|---|---|
| `GET /products` | `productsApi.js` → `useProducts.js` → `ProductList.jsx` |
| `GET /products/:id` | `ProductDetails.jsx` |

No API key or authentication is required.

---

## 🧭 Navigation

Three screens are registered in a native stack navigator (`App.jsx`), with headers hidden in favor of custom in-screen headers:

```
ProductList  →  ProductDetails  →  CartSummary
     ↑______________________________|
     (cart icon in header navigates directly to CartSummary)
```

---

## 🧩 Known Limitations / Notes

- `placeOrder` in `CartSummary.jsx` currently just shows a success alert — there's no real checkout/payment flow or order persistence.
- Cart state is in-memory only (Context, not persisted) — it resets on app reload. Consider `AsyncStorage` or a persistence library if you need the cart to survive restarts.
- No automated tests are currently included.

---

## 📄 License

This project is for learning/demo purposes and uses the free Fake Store API for sample product data.