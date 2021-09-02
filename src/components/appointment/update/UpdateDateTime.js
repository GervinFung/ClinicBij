import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert, SafeAreaView } from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';
import {Picker} from '@react-native-picker/picker';

import {updateDateTimeOfAppointment} from '../../../logic/tempAppointmentList';
import {getAvailableDoctor} from '../../../logic/tempDoctorList';
import TouchableButton, {buttonStyleDict} from '../../reusable/TouchableButton';

const ChooseAppointmentView = ({setAppointmentDate, appointmentDate}) => {

    const calendarStyle = StyleSheet.create({
        calendarView: {
            backgroundColor: '#FFFFFF',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
        },
        reminderView: {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
            marginTop: 25,
        },
        reminder: {
            color: '#000080',
            fontSize: 14,
        },
    });

    const formMinDate = () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 3);
        return tomorrow;
    };

    const minDate = formMinDate();

    const processAppointmentDateToString = (dateChosen) => {
        const date = JSON.stringify(dateChosen).split('T')[0].replace('"', '');
        const splitted = date.split('-');
        setAppointmentDate(splitted.reverse().join('/'));
    };

    return (
        <View>
            <View style={calendarStyle.calendarView}>
                <View style={calendarStyle.reminderView}><Text style={calendarStyle.reminder}>Appointments must be made 3 days in advanced</Text></View>
                <CalendarPicker
                    minDate={minDate}
                    onDateChange={(dateChosen) => {
                        processAppointmentDateToString(dateChosen);
                    }}
                />
            </View>
            <View style={styles.chosenText}>
                <Text style={styles.inputTitle}><Text style={styles.chosenBold}>Date Chosen:</Text> {appointmentDate}</Text>
            </View>
        </View>
    );
};

const NumberPickerView = ({selectedTime, setSelectedTime, timeList}) => {

    const pickerStyle = StyleSheet.create({
        pickerView: {
            color: '#121212',
            height: 30,
            width: 100,
            borderColor: 'black',
            borderWidth: 1,
        },
    });

    return (
        <View>
            <Picker
                style={pickerStyle.pickerView}
                selectedValue={selectedTime}
                onValueChange={(itemValue) => {
                    setSelectedTime(itemValue);
                }}
            >
                {timeList.map((time, i) => {return <Picker.Item key={i + time} value={time} label={time} />;})}
            </Picker>
        </View>
    );
};

const TimePickerView = ({setAppointmentTime, appointmentTime}) => {

    const hours = ['9', '10', '11', '12', '1', '2', '3', '4', '5'];
    const minutes = ['00', '30'];

    const [selectedHour, setSelectedHour] = useState(hours[0]);
    const [selectedMinute, setSelectedMinute] = useState(minutes[0]);
    const [meridiem, setMeridiem] = useState('AM');

    const timePickerStyle = StyleSheet.create({
        spaceBetweenView: {
            marginBottom: 35,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        centerView: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: 17,
        },
        timeText: {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
        },
        timeBold: {
            fontWeight: 'bold',
        },
    });

    useEffect(() => {
        const hour = parseInt(selectedHour, 10);
        setMeridiem(hour >= 9 && hour <= 11 ? 'AM' : 'PM');
    }, [selectedHour]);

    useEffect(() => {
        // TODO - REQUIRE FIX, SO IT WONT DISPLAY DEFAULT TIME, SHOULD DISPLAY NONE WHEN USER DID NOT SELECT ANY TIME
        setAppointmentTime(`${selectedHour}:${selectedMinute} ${meridiem}`);
    }, [meridiem, selectedHour, selectedMinute, setAppointmentTime]);

    return (
        <View>
            <View style={timePickerStyle.centerView}>
                <Text style={timePickerStyle.title}>Pick a Time</Text>
            </View>
            <View style={timePickerStyle.spaceBetweenView}>
                <NumberPickerView
                    timeList={hours}
                    selectedTime={selectedHour}
                    setSelectedTime={setSelectedHour}
                />
                <NumberPickerView
                    timeList={minutes}
                    selectedTime={selectedMinute}
                    setSelectedTime={setSelectedMinute}
                />
                <View style={timePickerStyle.centerView}>
                    <Text style={timePickerStyle.title}>{meridiem}</Text>
                </View>
            </View>
            <View style={timePickerStyle.timeText}>
                <Text style={styles.inputTitle}>
                    <Text style={timePickerStyle.timeBold}>Time Chosen: </Text>
                    {appointmentTime}
                </Text>
            </View>
        </View>
    );
};

const UpdateDateTimeScreen = ({ route, navigation }) => {

    const { date, time, id } = route.params;
    const NONE = 'None';

    const [appointmentDate, setAppointmentDate] = useState(date);
    const [appointmentTime, setAppointmentTime] = useState(time);
    const [doctorList, setDoctorList] = useState([]);

    useEffect(() => {
        setDoctorList(getAvailableDoctor(appointmentDate, appointmentTime));
    }, [appointmentDate, appointmentTime]);

    const confirmUpdateDateTime =  () => {
        Alert.alert('Update Appointment Date/Time Confirmation', 'Are you sure new date/time is correct?\nYou can always change the information later should you need to', [{
                text: 'No', style: 'cancel',
            }, {
                text: 'Yes', onPress: () => {
                    updateDateTimeOfAppointment(undefined, id, appointmentDate, appointmentTime);
                    navigation.navigate('UpdateAppointmentScreen');
                },
            },
        ]);
    };

    const GetNoAvailableDoctorMessage = () => {
        if (doctorList.length === 0) {
            return (
                <View>
                    <Text style={styles.noAvailableDoctorText}>No available Doctor at {appointmentDate} {appointmentTime}</Text>
                </View>
            );
        }
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.generalView}>
                    <Image source={require('../../../../img/update/changeDateTime.jpg')} style={styles.image}/>
                </View>
                <View style={styles.generalView}>
                    <Text style={styles.purpose}>Update of appointment</Text>
                    <ChooseAppointmentView
                        setAppointmentDate={setAppointmentDate}
                        appointmentDate={appointmentDate}
                        NONE={NONE}
                    />
                    <TimePickerView
                        setAppointmentTime={setAppointmentTime}
                        appointmentTime={appointmentTime}
                        NONE={NONE}
                    />
                </View>
                <GetNoAvailableDoctorMessage/>
                <TouchableButton
                    onPress={confirmUpdateDateTime}
                    text="Update Appointment"
                    buttonStyle={buttonStyleDict.GREEN}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
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
    generalView: {
        width: '100%',
        backgroundColor: '#FEFEFE',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 25,
    },
    image: {
        width: 150,
        height: 150,
    },
    text: {
        textAlign: 'center',
    },
    inputTitle: {
        fontSize: 17,
    },
    chosenText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 17,
        marginBottom: 25,
    },
    chosenBold: {
        fontWeight: 'bold',
    },
    noAvailableDoctorText: {
        color: '#990000',
        fontSize: 14,
    },
    purpose: {
        color: '#000',
        fontSize: 20,
        paddingBottom: 10,
    },
});

export default UpdateDateTimeScreen;
