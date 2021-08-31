import React from 'react';
import { StyleSheet, View } from 'react-native';

const HorizontalLine = () => <View style={styles.horizontalBorder}/>;

const styles = StyleSheet.create({
    horizontalBorder: {
        borderBottomColor: '#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
    },
});

export default HorizontalLine;
