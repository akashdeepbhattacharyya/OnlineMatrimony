import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 400,
        fontFamily: 'Roboto',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    settingsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        borderStyle: 'dotted',
    },
    settingsText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 400,
        fontFamily: 'Roboto',
        marginVertical: 15,
        flex: 1,
    },
    arrow: {
        color: '#666',
        fontSize: 20,
        fontWeight: '300',
    },
    searchSection: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        borderStyle: 'dotted',
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 400,
        fontFamily: 'Roboto',
        marginVertical: 15,
    },
    radioGroup: {
        flexDirection: 'column',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    radioContainer: {
        marginRight: 12,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#666',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        borderColor: '#ff4444',
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ff4444',
    },
    radioText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 400,
        fontFamily: 'Roboto',
    },
    languageSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        borderStyle: 'dotted',
    },
    languageRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    languageValue: {
        color: '#ff4444',
        fontSize: 20,
        fontWeight: 400,
        fontFamily: 'Roboto',
        marginRight: 8,
    },
    scrollContainer: {
        flexGrow: 1,
        marginVertical: 20,
    },
    termWrapper: {
        marginTop:80,
        marginBottom: 100
    },
    termText: {
        color: '#BABABA',
        fontSize: 20,
        fontWeight: 400,
        marginBottom: 15,
        textDecorationLine: 'underline'
    },
    copyRightText: {
        color: '#BABABA',
        fontSize: 20,
        fontWeight: 400,
        fontFamily: 'Roboto',
        marginBottom: 15,
    }
});