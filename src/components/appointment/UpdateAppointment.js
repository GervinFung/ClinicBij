import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from 'react-native';
import {getPendingAppointmentList } from '../../logic/tempAppointmentList';
import {TouchableAppointmentView} from '../reusable/AppointmentView';

const UpdateAppointmentScreen = ({ route, navigation }) => {

    const appointmentList = getPendingAppointmentList();

    const GetFlatList = () => {
        if (appointmentList.length === 0) {
            return (
                <View style={styles.centerView}>
                    <Text style={styles.noAppointmentMessage}>No Pending Appointment(s)</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={appointmentList}
                renderItem={({ item: appointment, separators }) => (
                    <TouchableAppointmentView
                        index={appointment.id}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}
                        doctor={appointment.doctor}
                        purpose={appointment.purpose}
                        status={appointment.status}
                        date={appointment.date}
                        time={appointment.time}
                        onPress={() => {
                            navigation.navigate('UpdateDecisionScreen', {
                                appointment: appointment,
                            });
                        }}
                    />
                )}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageTextView}>
                <Image source={require('../../../img/CRUD/deleteAppointment.jpg')} style={styles.image}/>
                <Text style={styles.text}>Update Appointment</Text>
            </View>
            <GetFlatList/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 4,
        paddingBottom: 7,
        width: '100%',
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    imageTextView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 70,
        height: 70,
    },
    text: {
        fontSize: 16,
    },
    noAppointmentMessage: {
        fontSize: 25,
        textAlign: 'center',
    },
    centerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default UpdateAppointmentScreen;
