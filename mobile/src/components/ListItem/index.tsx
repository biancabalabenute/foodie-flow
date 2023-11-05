import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import { Feather } from '@expo/vector-icons'

interface ItemProps {
    data: {
        id: string;
        product_id: string;
        name: string;
        ammount: string | number;
    };
    deleteItem: (item_id: string) => void;

}

export function ListItem({ data, deleteItem } : ItemProps) {

    function handleDeleteItem() {
        deleteItem(data.id);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.item}> {data.ammount} - {data.name} </Text>

            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name="trash-2" color="#ff3f4b" size={25} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 0.3,
    },
    item: {
        color: '#000',
        fontWeight: 'bold'
    }
})