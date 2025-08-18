import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { matchesData } from '../../interface/home';


const matches: matchesData[] = [
  {
    id: '1',
    name: 'Palakshi G.',
    age: 32,
    religion: 'Hindu',
    caste: 'Kayastha',
    language: 'Bengali',
    location: 'Kolkata, WB',
    image: require('../../../assets/images/image.png'),
    highlight: true,
  },
  {
    id: '2',
    name: 'Nabanita R.',
    age: 32,
    religion: 'Hindu',
    caste: 'Kayastha',
    language: 'Bengali',
    location: 'Kolkata, WB',
    image: require('../../../assets/images/image2.png'),
    highlight: false,
  },
  {
    id: '3',
    name: 'Sneha D.',
    age: 32,
    religion: 'Hindu',
    caste: 'Kayastha',
    language: 'Bengali',
    location: 'Kolkata, WB',
    image: require('../../../assets/images/image.png'),
    highlight: false,
  },
];

const Matches = ({ matchType }: { matchType: string }) => {
  const renderItem = ({ item }: { item: matchesData }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>
          {item.age} Yrs, {item.language},
        </Text>
        <Text style={styles.details}>
          {item.religion}, {item.caste},
        </Text>
        <Text style={[styles.details, { marginBottom: 10 }]}>
          {item.location}
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            item.highlight ? styles.redButton : styles.outlinedButton,
          ]}
        >
          <Text style={styles.buttonText}>Contact Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{matchType}</Text>
        <TouchableOpacity ><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
      </View>
      <FlatList
        data={matches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Matches;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderStyle: 'dotted',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto',
  },
  seeAll: {
    color: '#F15B6A',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  listContainer: {
    paddingVertical: 5,

  },
  card: {
    backgroundColor: '#000',
    borderRadius: 25,
    marginRight: 15,
    width: 200,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  cardContent: {
    padding: 10,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Roboto-Medium',
  },
  details: {
    fontWeight: '400',
    fontFamily: 'Roboto-Regular-12',
    fontSize: 12,
    color: '#ccc',
  },
  button: {
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: '#ff4d4d',
  },
  outlinedButton: {
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
