import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#00f2ff',
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
  section: {
    marginVertical: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#7000ff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: 2,
  },
  label: {
    fontSize: 10,
    color: '#888888',
  },
  value: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#333333',
    marginTop: 10,
  }
});

const ElementPDF = ({ element }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{element.name} ({element.symbol})</Text>
        <Text style={styles.subtitle}>Atomic Number: {element.number} | Category: {element.category}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Physical Properties</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Atomic Mass</Text>
          <Text style={styles.value}>{element.atomic_mass} u</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Density</Text>
          <Text style={styles.value}>{element.density || 'N/A'} g/cm³</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phase at STP</Text>
          <Text style={styles.value}>{element.phase}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Melting Point</Text>
          <Text style={styles.value}>{element.melt || 'N/A'} K</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Boiling Point</Text>
          <Text style={styles.value}>{element.boil || 'N/A'} K</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quantum Properties</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Electron Configuration</Text>
          <Text style={styles.value}>{element.electron_configuration_semantic}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Electronegativity</Text>
          <Text style={styles.value}>{element.electronegativity_pauling || 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.summary}>{element.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discovery</Text>
        <Text style={styles.summary}>Discovered by {element.discovered_by || 'Unknown'}. {element.named_by ? `Named by ${element.named_by}.` : ''}</Text>
      </View>
    </Page>
  </Document>
);

export default ElementPDF;
