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
        transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
        marginBottom: 10,
    },
    disabledButton: {
        opacity: 0.6,
    },
    tagline: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginTop: 15,
        transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
    },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 50,
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 15,
        height: 70,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    inputIcon: {
        marginLeft: 25,
        paddingRight: 10,
    },
    input: {
        flex: 1,
        color: '#000000',
        paddingVertical: 10,
        fontSize: 16,
        paddingLeft: 30,
        fontFamily: 'Roboto-Regular',
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    checkboxWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 80,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    checkboxText: {
        color: '#fff',
        fontSize: 13,
        flexShrink: 1,
        fontFamily: 'Roboto-Regular',
        transform: [{ scaleX: 1.3 }, { scaleY: 1.4 }],
        paddingLeft: 20,
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
    divider: {
        height: 1,          // Set the height of the line
        width: '40%',       // Adjust width as needed
        backgroundColor: '#ccc', // Set the color of the line
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 20
    },
    socialButton: {
        borderRadius: 100,
    },
    socialIcon: {
        width: 85,
        height: 85,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        maxWidth: 335,
        gap: 30
    },
    signupText: {
        color: '#fff',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    },
    signupLink: {
        color: '#F74D4D',
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    },
    textWrapper: {
        flexDirection: 'row',  // Aligns the texts horizontally
        alignItems: 'center',
        marginVertical: 30,
        marginHorizontal: 40,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',  // Line color
        marginHorizontal: 10,
        width: '10%',     // Space between the line and the text
    },
    dashedDivider: {
        fontSize: 18,
        color: '#fff',  // Color of the text 'or'
        fontFamily: 'Roboto-Regular',
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    },
});