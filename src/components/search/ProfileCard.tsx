import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

export default function ProfileCard({
    user,
    index,
    isSelected,
    onSelect
}: {
    user: any,
    index: number,
    isSelected: boolean,
    onSelect: () => void
}) {
    console.log(user);
    return (
        <TouchableOpacity style={[styles.card, isSelected && styles.highlightCard]} onPress={onSelect}>
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                marginVertical: 10,
                marginLeft: 10
            }}>
                <Image source={user.photo} style={styles.image} resizeMode='cover' />
                <View style={styles.details}>
                    <Text style={styles.name}>{user.fullName}</Text>
                    <Text style={styles.info}>{`${user.age} Yrs Old, Height - ${user.height}`}</Text>
                    <Text style={styles.info}>{user.religionLabel}</Text>
                    <Text style={styles.info}>{user.location}</Text>
                    <View style={styles.verified}>
                        <Text style={styles.verifiedText}>Verified</Text>
                        <Feather name="check-circle" size={16} color="red" style={{ marginLeft: 5 }} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#000',
        borderRadius: 20,
        marginVertical: 10,
        alignItems: 'center',
        position: 'relative',
        marginHorizontal: 20
    },
    highlightCard: {
        borderColor: '#1E90FF',
        borderWidth: 2,
    },
    image: {
        width: 170,
        height: 180,
        borderRadius: 20,
    },
    details: {
        marginLeft: 10,
        flex: 1,
    },
    name: {
        color: '#fff',
        fontWeight: 700,
        fontFamily: 'Roboto',
        fontSize: 20,
        marginBottom: 20,
    },
    info: {
        color: '#ccc',
        fontWeight: 500,
        fontFamily: 'Roboto',
        fontSize: 20,
        marginTop: 2,
    },
    verified: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    verifiedText: {
        color: '#fff',
        fontWeight: 500,
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    tagContainer: {
        position: 'absolute',
        top: -10,
        left: 80,
        flexDirection: 'row',
        backgroundColor: '#1E90FF',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    tagText: {
        color: '#fff',
        marginHorizontal: 4,
        fontSize: 12,
    },
})