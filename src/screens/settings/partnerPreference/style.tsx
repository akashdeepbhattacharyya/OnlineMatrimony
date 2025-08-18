import { StyleSheet } from "react-native";
import responsive from '../../../components/common/responsive';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    container: {
        marginHorizontal: 25,
        backgroundColor: '#000000',
        borderTopLeftRadius: responsive.width(20),
        borderBottomLeftRadius: responsive.width(20),
        borderTopRightRadius: responsive.width(20),
        borderBottomRightRadius: responsive.width(20),
        padding: responsive.padding(10),
    },
    sectionTitle: {
        color: '#fff',
        fontSize: responsive.fontSize(16),
        fontWeight: 'bold',
        marginTop: responsive.margin(20),
        marginBottom: responsive.margin(10),
    },
    sliderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: responsive.margin(5),
    },
    sliderText: {
        color: '#fff',
        fontSize: responsive.fontSize(14),
    },
    slider: {
        height: 25,
        width: 25,
        backgroundColor: '#F15B6A',
        borderWidth: 2,
        borderColor: '#ffffff',
        paddingLeft: 20,
        borderRadius: 12.5,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsive.margin(6),
    },
    checkbox: {
        width: responsive.width(22),
        height: responsive.width(22),
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
        marginRight: responsive.margin(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedBox: {
        backgroundColor: 'transparent',
        borderColor: '#F74D4D'
    },
    checkboxLabel: {
        color: '#fff',
        fontSize: responsive.fontSize(14),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: responsive.padding(12),
        borderBottomWidth: 0.5,
        borderBottomColor: '#444',
    },
    label: {
        color: '#aaa',
        fontSize: responsive.fontSize(14),
    },
    value: {
        color: '#fff',
        fontSize: responsive.fontSize(14),
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
