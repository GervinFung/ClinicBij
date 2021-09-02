import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Linking } from 'react-native';
import GridView from './reusable/GridView';


const HelpScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.generalView}><Text style={styles.subTitle}>Need help?</Text></View>
                <View style={styles.generalView}><Text style={styles.subTitle}>Below are the available contact information</Text></View>
                <View style={styles.menuContainer}>
                    <GridView
                        image={require('../../img/help/whatsapp.jpg')}
                        type="Contact Number: 012-5533245"
                        onPress={() => Linking.openURL('https://wa.me/60125533245')}
                    />
                    <GridView
                        image={require('../../img/help/phone.jpg')}
                        type="Contact Number: 087-735123"
                        onPress={() =>  {
                            Linking.openURL('tel:${087735123}') 
                            console.log('please help add 087 to contact list');
                        }}
                    />
                    <GridView
                        image={require('../../img/help/email.jpg')}
                        type="Email: support@google.com"
                        onPress={() => Linking.openURL('mailto:support@google.com')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    generalView: {
        padding: 4,
        paddingBottom: 7,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        padding: 4,
        paddingBottom: 7,
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    title: {
        color: '#000',
        fontSize: 30,
        paddingBottom: 10,
    },
    subTitle: {
        color: '#2196F3',
        fontSize: 18,
        paddingBottom: 10,
    },
    menuContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});

export default HelpScreen;
