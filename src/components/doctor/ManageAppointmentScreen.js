import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {getUser} from '../util/UserUtil';
import GridView from '../reusable/GridView';

const ManageAppointmentScreen = ({ navigation }) => {
    const user = getUser();

    const onPress = (destination) => navigation.navigate(destination);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.generalView}><Text style={styles.title}>Welcome {user.fullName}</Text></View>
            <View style={styles.generalView}><Text style={styles.subTitle}>What would you like to do today?</Text></View>
            <View style={styles.menuContainer}>
                <GridView
                    image={require('../../../img/CRUD/readAppointment.jpg')}
                    type="View Appointment"
                    onPress={() => onPress('ReadAppointmentScreen')}
                />
                <GridView
                    image={require('../../../img/CRUD/updateAppointment.jpg')}
                    type="Update Appointment"
                    onPress={() => onPress('UpdateAppointmentScreen')}
                />
                <GridView
                    image={require('../../../img/CRUD/deleteAppointment.jpg')}
                    type="Cancel Appointment"
                    onPress={() => onPress('DeleteAppointmentScreen')}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        width: '100%',
        flex: 1,
        backgroundColor: '#FEFEFE',
        alignItems: 'center',
        justifyContent: 'center',
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

export default ManageAppointmentScreen;
