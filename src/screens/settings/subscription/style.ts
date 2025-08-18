import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
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
  bannerContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  bannerOverlay: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  discountCircle: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 40,
    marginBottom: 10,
    width: 60,
    alignItems: 'center',
  },
  discountText: {
    color: '#F15B6A',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerText: {
    alignItems: 'center',
    marginBottom: 20,
  },
  premiumText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  subText: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 4,
  },
  planCard: {
    backgroundColor: '#F15B6A',
    borderRadius: 16,
    padding: 20,
    width: width - 80,
    marginHorizontal: 10,
    marginBottom: 30,
  },
  planTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  priceText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  durationText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  featureText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 13,
  },
  startBtn: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  startBtnText: {
    color: '#F15B6A',
    fontWeight: 'bold',
  },
});
