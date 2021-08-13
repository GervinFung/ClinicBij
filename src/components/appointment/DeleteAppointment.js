import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';

import {isDoneStatus, isPendingStatus, isCancelledStatus, getPendingAppointmentList, removeFromPendingAppointmentList} from '../../logic/tempAppointmentList';

const DONE = require('../../../img/appointmentStatus/done.jpg');
const CANCELLED = require('../../../img/appointmentStatus/cancelled.jpg');
const PENDING = require('../../../img/appointmentStatus/pending.jpg');

const AppointmentView = (props) => {

    const appointmentStyles = StyleSheet.create({
        containerView: {
            width: '100%',
            padding: 10,
        },
        spaceBetweenView: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        importantText: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        text: {
            fontSize: 17,
        },
        statusText: {
            fontStyle: 'italic',
        },
        image: {
            width: 50,
            height: 50,
        },
        centerView: {
            justifyContent: 'center',
        },
    });

    const getStatusImage = () => {
        if (isDoneStatus(props.status)) {
            return DONE;
        } else if (isCancelledStatus(props.status)) {
            return CANCELLED;
        } else if (isPendingStatus(props.status)) {
            return PENDING;
        }
        throw new Error('Status should be either DONE, CANCELLED or PENDING');
    };

    return (
        <TouchableOpacity
            key={props.index}
            style={appointmentStyles.containerView}
            onShowUnderlay={props.onShowUnderlay}
            onHideUnderlay={props.onHideUnderlay}
            onPress={props.onPress}
        >
            <View>
                <View style={appointmentStyles.spaceBetweenView}>
                    <View><Text style={appointmentStyles.importantText}>Appointment {props.index}</Text></View>
                    <View><Text style={appointmentStyles.importantText}>{props.date}</Text></View>
                </View>
                <View style={appointmentStyles.spaceBetweenView}>
                    <View style={appointmentStyles.centerView}>
                        <Text style={appointmentStyles.text}>{props.doctor}</Text>
                        <Text style={appointmentStyles.text}>{props.purpose}</Text>
                        <Text style={appointmentStyles.text}>{props.time}</Text>
                        <Text style={appointmentStyles.text}>Status: <Text style={appointmentStyles.statusText}>{props.status.toUpperCase()}</Text></Text>
                    </View>
                    <View style={appointmentStyles.centerView}>
                        <Image source={getStatusImage()} style={appointmentStyles.image}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const DeleteAppointmentScreen = ({ route, navigation }) => {

    // const { user } = route.params;

    const [appointmentList, setAppointmentList] = useState(getPendingAppointmentList());

    const onPress = (id) => {
        Alert.alert(
            `Cancel Appointment ${id} Confirmation`, 'This action cannot be undone', [{
                    text: 'Cancel', style: 'cancel',
                }, {
                    text: 'OK', onPress: () => setAppointmentList(removeFromPendingAppointmentList(id)),
                },
            ]
        );
    };

    const getFlatList = () => {
        if (appointmentList.length === 0) {
            return <View style={styles.centerView}>
                <Text style={styles.noAppointmentMessage}>No Pending Appointment(s)</Text>
            </View>;
        }
        return (
            <FlatList
                data={appointmentList}
                renderItem={({ item: appointment, separators }) => (
                    <AppointmentView
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
                <Text style={styles.text}>Cancel Appointment</Text>
            </View>
            {getFlatList()}
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

export default DeleteAppointmentScreen;
