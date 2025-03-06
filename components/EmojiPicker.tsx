import { Modal, Pressable, View, Text, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, onClose, children }: Props) {
    return (
        <View>
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modelContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose a Sticker</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22}/>
                    </Pressable>
                </View>
                {children}
            </View>
        </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modelContent: {
        height: "25%",
        width: "100%",
        backgroundColor: "#25292e",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        position: "absolute",
        bottom: 0,
    }, 
    titleContainer: {
        height: "16%",
        backgroundColor: "#464C55",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }, 
    title: {
        color: "#fff",
        fontSize: 16,
    },
});