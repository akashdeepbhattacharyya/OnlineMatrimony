import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 120,
        marginHorizontal: 20
    },
    logo: {
        fontFamily: 'Oswald-Bold',
        fontSize: 48,
        color: '#fff',
        textAlign: 'center',
        transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }],
        marginBottom: 10,
    },
    tagline: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginTop: 15,
        paddingHorizontal: 5,
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    otpButton: {
        backgroundColor: '#F74D4D',
        borderRadius: 50,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
        height: 70,
    },
    otpButtonText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
    },
})