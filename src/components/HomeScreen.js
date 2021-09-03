import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import {getUser} from './util/UserUtil';
import GridView from './reusable/GridView';

const HomeScreen = ({ navigation }) => {

    const [user, setUser] = useState('');

    useEffect(()=> {
        (async () => {
            const data = await getUser();
            setUser(data);
        })();
    }, []);

    const onPress = (destination) => navigation.navigate(destination);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.generalView}><Text style={styles.title}>Welcome {user.username}</Text></View>
                <View style={styles.generalView}><Text style={styles.subTitle}>What would you like to do today?</Text></View>
                <View style={styles.menuContainer}>
                    <GridView
                        image={require('../../img/CRUD/createAppointment.jpg')}
                        type="Create Appointment"
                        onPress={() => onPress('CreateAppointmentScreen')}
                    />
                    <GridView
                        image={require('../../img/CRUD/readAppointment.jpg')}
                        type="View Appointment"
                        onPress={() => onPress('ReadAppointmentScreen')}
                    />
                    <GridView
                        image={require('../../img/CRUD/updateAppointment.jpg')}
                        type="Update Appointment"
                        onPress={() => onPress('UpdateAppointmentScreen')}
                    />
                    <GridView
                        image={require('../../img/CRUD/deleteAppointment.jpg')}
                        type="Cancel Appointment"
                        onPress={() => onPress('DeleteAppointmentScreen')}
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

export default HomeScreen;
