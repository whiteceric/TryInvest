import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import { Colors } from "../assets/Colors";

import TrieSearch from "trie-search";

export const SearchBar = ({
  containerStyle,
  barStyle,
  textStyle,
  dropdownContainerStyle,
  dropdownItemStyle,
  dropdownItemText,
  onSelect,
  items, // should be an array of strings
  defaultText,
}) => {
  const [text, setText] = useState(defaultText);
  const [trie, setTrie] = useState(null);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);

  useEffect(() => {
    const _trie = new TrieSearch();
    items.forEach((item) => {
      _trie.map(item, item);
    });
    setTrie(_trie);
  }, []);

  const onChangeText = (newText) => {
    setText(newText.toUpperCase());
    if (newText.length >= 1) {
      setDropdownActive(true);
      setDropdownItems(trie.get(newText));
    } else setDropdownActive(false);
  };

  const onFocus = () => {
    if (text === defaultText) {
      setText("");
    }
  };

  const onDefocus = () => {
    if (text === "") {
      setText(defaultText);
    }
    onSelect(text);
    setDropdownActive(false);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={dropdownItemStyle}
      onPress={() => {
        setDropdownActive(false);
        setText(item);
        onSelect(item);
      }}
    >
      <Text style={dropdownItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={containerStyle}>
      <View style={barStyle}>
        <TextInput
          style={textStyle}
          value={text}
          onFocus={onFocus}
          onSubmitEditing={onDefocus}
          onChangeText={onChangeText}
        />
      </View>
      {dropdownActive && dropdownItems.length > 0 ? (
        <FlatList
          style={dropdownContainerStyle}
          data={dropdownItems}
          keyExtractor={(item, index) => {
            item + "" + index;
          }}
          renderItem={renderItem}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
  },
});
