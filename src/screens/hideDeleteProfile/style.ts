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
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
  },
  section: {
    marginVertical: 10,
  },
  sectionLabel: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  actionText: {
    color: '#F85F5F',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 10,
    paddingRight: 20,
  },
  infoIcon: {
    marginTop: 2,
    marginRight: 6,
  },
  infoText: {
    color: '#aaa',
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 16,
    borderStyle: 'dotted',
    borderBottomColor: 'white',
    borderColor: '#444',
  },
});
