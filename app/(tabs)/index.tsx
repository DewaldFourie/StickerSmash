import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { type ImageSource } from "expo-image";

import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

  
  // Function to pick an image from the device's gallery
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("No image selected");
    }
  }

  // Function to reset the app state to not show the app options
  const onReset = () => {
    setShowAppOptions(false);
  };

  // Function to add a sticker to the selected image
  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  }

  // Function to save the image to the device's gallery
  const onSaveImageAsync = async () => {
    // Save image logic here
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage}/>
      </View>
      { showAppOptions ? (
        <View style={styles.optionsContainer}> 
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
          </View>        
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
