import React from 'react';
import { TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { COLORS } from './theme';
import styles from './SearchBar.styles';

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <Search size={22} color={COLORS.textMuted} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}