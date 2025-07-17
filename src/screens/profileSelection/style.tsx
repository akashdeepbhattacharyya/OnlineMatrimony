import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 60
    },
    logo: {
        fontFamily: 'Oswald-Bold',
        fontSize: 48,
        color: '#fff',
        textAlign: 'center',
        transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
        marginBottom: 10,
    },
    tagline: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginTop: 15,
        transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
    },
    textWrapper: {
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        color: '#fff',
    },
    optionsContainer: {
        width: 370,
        height: 270,
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    brideContainer: {
        position: 'absolute',
        left: 40,
        bottom: 30,
    },
    brideCircle: {
        width: 148,
        height: 148,
        borderBottomLeftRadius: 100,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    groomContainer: {
        position: 'absolute',
        right: 15,
        bottom: 0,
    },
    groomCircle: {
        width: 148,
        height: 148,
        borderBottomRightRadius: 100,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    icon: {
        width: 76,
        height: 96,
    },
    active: {
        width: 11,
        height: 11,
        borderRadius: 100,
    },
    brideLabel: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        fontWeight: '400',
        display: 'flex',
    },
    groomLabel: {
        position: 'absolute',
        bottom: -20,
        fontSize: 14,
        color: '#fff',
    },
    dotedLine: {
        position: 'relative',
        marginTop: -8,
        marginLeft: 'auto',
        marginRight: 'auto',
        right: 5
    },
    activeColor: {
        backgroundColor: '#F85F5F',
    },
    deActiveColor: {
        backgroundColor: '#4F4F4F',
    }
})