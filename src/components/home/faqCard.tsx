import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const faqs = [
  'Is This Site Safe To Use?',
  'How Do I Create An Account?',
  'Can I Register On Behalf Of Someone Else?',
  'How Do I Create A Good Profile?',
];

const FAQCard = () => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Frequently Ask Questions</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Dotted Line */}
      <View style={styles.dottedLine} />

      {/* FAQ List */}
      <FlatList
        data={faqs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.faqItem}>
            <Text style={styles.question}>{item}</Text>
            <Icon name="chevron-right" size={18} color="#fff" />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default FAQCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 90,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#F85F5F',
    fontSize: 14,
    fontWeight: '500',
  },
  dottedLine: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    marginVertical: 10,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  question: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#444',
    
  },
});
