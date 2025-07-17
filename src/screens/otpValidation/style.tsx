import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
        transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginVertical: 20
    },
    inputIcon: {
        marginLeft: 25,
        paddingRight: 10,
    },
    input: {
        backgroundColor: '#fff',
        color: '#000000',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        width: 56,
        height: 56,
        textAlign: 'center',
        borderRadius: 100,
    },
    otpVerification: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
    },
    otpVerificationText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
    otpButtonText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
    },
    otpButton: {
        backgroundColor: '#F74D4D',
        borderRadius: 50,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
        height: 70
    },
    timerText: {
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
    signupLink: {
        color: '#e74c3c',
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        textAlign: 'center',
        marginLeft: 10
    },
    disabledResend: {
        color: '#422424',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 10
    },
    resendText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        marginRight: 10
    }
})