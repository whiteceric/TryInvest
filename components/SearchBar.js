import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
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
  setParentEnableScrolling,
  onSelect,
  onFocus,
  onDefocus,
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
      setParentEnableScrolling(false); // disable parent scrolling when dropdown is shown
      setDropdownItems(trie.get(newText));
    } else setDropdownActive(false);
  };

  const _onFocus = () => {
    let _text = text;
    if (text === defaultText) {
      setText("");
      _text = "";
    }
    onChangeText(_text);
    onFocus();
  };

  const _onDefocus = () => {
    if (text === "") {
      setText(defaultText);
    }
    onSelect(text);
    setDropdownActive(false);
    console.log("_defocus");
    onDefocus();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={dropdownItemStyle}
      onPress={() => {
        setDropdownActive(false);
        setText(item);
        onSelect(item);
        console.log("selecting " + item);
        onDefocus();
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
          selectTextOnFocus={true}
          onFocus={_onFocus}
          onSubmitEditing={_onDefocus}
          onChangeText={onChangeText}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          autoCompleteType="off"
        />
      </View>
      {dropdownActive && dropdownItems.length > 0 ? (
        <View
          style={dropdownContainerStyle}
          onStartShouldSetResponderCapture={() => {
            setParentEnableScrolling(false); // disable scrolling for the parent view
          }}
        >
          <FlatList
            data={dropdownItems}
            keyExtractor={(item, index) => {
              item + "" + index;
            }}
            renderItem={renderItem}
            onScrollEndDrag={() => {
              setParentEnableScrolling(true);
            }}
            onSelect={() => {
              console.log("focused");
            }}
          />
        </View>
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
  fullscreenStyle: {
    flex: 1,
  },
});
