import { StyleSheet } from "react-native";
import responsive from "../../components/common/responsive";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2B2B'
    },
    banner: {
        width: '100%',
        height: responsive.height(234),
        justifyContent: 'center',
        opacity: 0.9,
        marginBottom: 10
    },
    textContainer: {
        marginLeft: responsive.width(50),
        marginBottom: responsive.height(40)
    },
    logo: {
        fontSize: responsive.fontSize(52),
        color: '#fff',
        fontFamily: 'Oswald-Bold',
    },
    tagline: {
        fontSize: responsive.fontSize(17),
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        color: '#fff',
    },
    subtext: {
        fontSize: responsive.fontSize(18),
        color: '#fff',
        marginTop: responsive.margin(10),
        fontWeight: '600',
        fontFamily: 'Roboto-SemiBold',
    },
    scrollContainer: {
        flexGrow: 1,
    }
})