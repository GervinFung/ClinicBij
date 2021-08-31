import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, ScrollView, Alert } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {Picker} from '@react-native-picker/picker';

import {getAvailableDoctor} from '../../logic/tempDoctorList';
import {addToAppointmentList} from '../../logic/tempAppointmentList';
import TouchableButton, {buttonStyleDict} from '../reusable/TouchableButton';
import HorizontalLine from '../reusable/HorizontalLine';

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

const ChooseDoctorView = ({doctorList, setSelectedDoctor, selectedDoctor}) => {

    const doctorImageList = [require('../../../img/doctor/doctor1.jpg'), require('../../../img/doctor/doctor2.jpg'), require('../../../img/doctor/doctor3.jpg')];

    const [doctorImage, setDoctorImage] = useState(doctorImageList[0]);

    const pickerStyle = StyleSheet.create({
        pickerView: {
            color: '#121212',
            height: 30,
            width: 200,
            borderColor: 'black',
            borderWidth: 1,
        },
        doctorText: {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
        },
        doctorBold: {
            fontWeight: 'bold',
        },
    });

    const getDoctorImage = (itemValue) => {
        const index = doctorList.indexOf(itemValue);
        if (index >= 0 && index <= 2) {
            return doctorImageList[index];
        }
        throw new Error('Selected Doctor does not exist in list available');
    };

    return (
        <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Pick a Doctor</Text>
            <Image source={doctorImage} style={styles.image}/>
            <Picker
                style={pickerStyle.pickerView}
                selectedValue={selectedDoctor}
                onValueChange={(itemValue) => {
                    setSelectedDoctor(itemValue);
                    setDoctorImage(getDoctorImage(itemValue));
                }}
            >
                {doctorList.map((doctor, i) => {return <Picker.Item key={i + doctor} value={doctor} label={doctor} />;})}
            </Picker>
            <View style={styles.chosenText}>
                <Text style={styles.inputTitle}><Text style={styles.chosenBold}>Doctor Chosen:</Text>{selectedDoctor.replace('Doctor', '')}</Text>
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
                onValueChange={(itemValue) => setSelectedTime(itemValue)}
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

const CreateAppointmentScreen = ({ route, navigation }) => {

    const NONE = 'None';

    const [appointmentDate, setAppointmentDate] = useState(NONE);
    const [doctorList, setDoctorList] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('Doctor');
    const [appointmentTime, setAppointmentTime] = useState(NONE);
    const [purpose, setPurpose] = useState('');
    const [invalidMessage, setInvalidMessage] = useState([]);

    // const determineInputBoxColor = () => {
    //     return appointmentDate === null ? styles.inactiveInputBox : styles.activeInputBox;
    // };

    useEffect(() => {
        setDoctorList(getAvailableDoctor(appointmentDate, appointmentTime));
    }, [appointmentDate, appointmentTime]);

    const updateInvalidMessage = () => {
        const list = [];
        if (appointmentDate === NONE) {
            list.push('Please choose an appointment date');
        } if (appointmentTime === NONE) {
            list.push('Please choose an appointment time');
        } if (selectedDoctor === NONE) {
            list.push('Please choose a doctor');
        } if (purpose === '') {
            list.push('Please write your appointment purpose');
        }
        setInvalidMessage(list);
    };

    const getInvalidMessage = () => {
        if (invalidMessage.length !== 0) {
            return (
                <View>
                    <Text style={styles.inputInvalidText}>{invalidMessage.join('\n')}</Text>
                </View>
            );
        }
    };

    const confirmAppointmentAlert = () => {
        Alert.alert(
            'Add new Appointment Confirmation', 'Are you sure all information is correct?\nYou can always change the information later should you need to', [{
                    text: 'No', style: 'cancel',
                }, {
                    text: 'Yes', onPress: () => {
                        addToAppointmentList(undefined, selectedDoctor, appointmentDate, appointmentTime, purpose);
                        navigation.navigate('ReadAppointmentScreen');
                    },
                },
            ]
        );
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.imageTextView}>
                    <Image source={require('../../../img/CRUD/createAppointment.jpg')} style={styles.image}/>
                    <Text style={styles.text}>Create Appointment</Text>
                </View>
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
                <HorizontalLine/>
                <ChooseDoctorView
                    selectedDoctor={selectedDoctor}
                    setSelectedDoctor={setSelectedDoctor}
                    doctorList={doctorList}
                />
                <View style={styles.inputView}>
                    <Text style={styles.inputTitle}>Purpose</Text>
                    <TextInput
                        value={purpose}
                        style={styles.inputBox}
                        placeholder="Purpose of Appointment"
                        onChangeText={setPurpose}
                        keyboardType="ascii-capable"
                    />
                </View>
                {getInvalidMessage()}
                <TouchableButton
                    onPress={() => {
                        updateInvalidMessage();
                        if (invalidMessage.length === 0) {
                            confirmAppointmentAlert();
                        }
                    }}
                    text="Create"
                    buttonStyle={buttonStyleDict.GREEN}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#FEFEFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageTextView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        textAlign: 'center',
        fontSize: 17,
    },
    inputView: {
        marginTop: 25,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputTitle: {
        fontSize: 17,
    },
    inputBox: {
        // backgroundColor: '#121212',
        borderColor: '#121212',
        color: '#000',//'#FFFFFF99',
        width: '80%',
        borderWidth: 1,
        paddingBottom: 7,
        paddingTop: 7,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 15,
        margin: 5,
        fontSize: 15,
    },
    activeInputBox: {
        backgroundColor: '#FEFEFE',
    },
    inactiveInputBox: {
        backgroundColor: '#EEEEEE',
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
    inputInvalidText: {
        color: '#990000',
        fontSize: 14,
    },
});

export default CreateAppointmentScreen;
