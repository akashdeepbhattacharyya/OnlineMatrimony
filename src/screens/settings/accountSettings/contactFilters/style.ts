import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
  },
  bellIcon: {
    marginTop: 2,
  },
  content: {
    padding: 20,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sliderLabel: {
    color: '#fff',
    fontSize: 14,
  },
  markerStyle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#F85F5F',
  },
  selectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  selectLabel: {
    color: '#aaa',
    fontSize: 16,
  },
  selectRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectValue: {
    color: '#fff',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#F85F5F',
    borderRadius: 30,
    marginTop: 30,
    alignItems: 'center',
    paddingVertical: 14,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
