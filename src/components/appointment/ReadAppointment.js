import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableHighlight, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {isDoneStatus, isPendingStatus, isCancelledStatus, getFilteredAppointmentList, getOptionList} from '../../logic/tempAppointmentList';

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
        <TouchableHighlight
            key={props.index}
            style={appointmentStyles.containerView}
            onShowUnderlay={props.onShowUnderlay}
            onHideUnderlay={props.onHideUnderlay}
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
        </TouchableHighlight>
    );
};

const ReadAppointmentScreen = ({ route, navigation }) => {

    // const { user } = route.params;

    const [appointmentType, setAppointmentType] = useState('All');
    const [appointmentList, setAppointmentList] = useState(getFilteredAppointmentList(appointmentType));

    const getFilterList = () => {
        return getOptionList().map((option, index) => {
            return <Picker.Item key={index + option} value={option} label={option} />;
        });
    };

    useEffect(() => {
        setAppointmentList(getFilteredAppointmentList(appointmentType));
    }, [appointmentType]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageTextView}>
                <Image source={require('../../../img/CRUD/readAppointment.jpg')} style={styles.image}/>
                <Text style={styles.text}>View Appointment</Text>
            </View>
            <View style={[styles.imageTextView, styles.centerBetweenView]}>
                <View><Text style={styles.text}>Search</Text></View>
                <View>
                    <Picker
                        selectedValue={appointmentType}
                        onValueChange={setAppointmentType}
                        style={styles.pickerView}
                    >{getFilterList()}
                    </Picker>
                </View>
            </View>
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
                    />
                )}
            />
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
    },
    title: {
        color: '#000',
        fontSize: 30,
        paddingBottom: 10,
    },
    imageTextView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 70,
        height: 70,
    },
    pickerView: {
        color: '#121212',
        height: 30,
        width: 150,
        borderColor: 'black',
        borderWidth: 1,
    },
    centerBetweenView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 15,
    },
    text: {
        fontSize: 16,
    },
});

export default ReadAppointmentScreen;
