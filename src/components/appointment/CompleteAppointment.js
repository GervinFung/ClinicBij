import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Alert } from 'react-native';
import {getPendingAppointmentList, donePendingTAppointmentList} from '../../logic/tempAppointmentList';
import {TouchableAppointmentView} from '../reusable/AppointmentView';
import {getUser} from '../util/UserUtil';
import {PATIENT} from '../../../App';

const CompleteAppointmentScreen = ({ route, navigation }) => {

    const [appointmentList, setAppointmentList] = useState(getPendingAppointmentList());

    const onPress = (id) => {
        Alert.alert(`Complete Appointment ${id} Confirmation`, 'This action cannot be undone', [{
                text: 'Cancel', style: 'cancel',
            }, {
                text: 'OK', onPress: () => {
                    setAppointmentList(donePendingTAppointmentList(id));
                    informDeleted();
                },
            },
        ]);
    };

    const informDeleted = (id) => {
        Alert.alert('Completed Appointment', 'Chosen Appointment Was Completed', [{
                text: 'Ok', onPress: () => {
                    const user = getUser();
                    navigation.navigate(user.userType.toLowerCase() === PATIENT ? 'HomeScreen' : 'DoctorHomeScreen');
                },
            },
        ]);
    };

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
                        onPress={() => onPress(appointment.id)}
                    />
                )}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageTextView}>
                <Image source={require('../../../img/CRUD/deleteAppointment.jpg')} style={styles.image}/>
                <Text style={styles.text}>Complete Appointment</Text>
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

export default CompleteAppointmentScreen;
