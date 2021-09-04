import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {Picker} from '@react-native-picker/picker';
import HorizontalLine from '../reusable/HorizontalLine';
import {addOffDayList, setChangedDefaultOffDay} from '../../logic/tempOffDayList';

const ChooseOffDayPeriodView = ({setStartDate, startDate, setEndDate, endDate, NONE}) => {

    const calendarStyle = StyleSheet.create({
        calendarView: {
            backgroundColor: '#FFFFFF',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
        },
        titleView: {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
            marginTop: 25,
        },
        title: {
            color: 'black',
            fontSize: 25,
        },
    });

    const formMinDate = () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 3);
        return tomorrow;
    };

    const minDate = formMinDate();

    const processDateToString = (dateChosen) => {
        const date = JSON.stringify(dateChosen).split('T')[0].replace('"', '');
        const splitted = date.split('-');
        return splitted.reverse().join('/');
    };

    const onDateChange = (date, type) => {
        //function to handle the date change
        if (type === 'START_DATE') {
            setStartDate(processDateToString(date));
        } else {
            setEndDate(date === null ? NONE : processDateToString(date));
        }
      };

    return (
        <View>
            <View style={calendarStyle.calendarView}>
                <View style={calendarStyle.titleView}><Text style={calendarStyle.title}>Add Specific Off Day</Text></View>
                <CalendarPicker
                    allowRangeSelection={true}
                    minDate={minDate}
                    onDateChange={onDateChange}
                />
            </View>
            <View style={styles.chosenText}>
                <Text style={styles.inputTitle}><Text style={styles.chosenBold}>Start Date:</Text> {startDate}</Text>
                <Text style={styles.inputTitle}><Text style={styles.chosenBold}>End Date:</Text> {endDate}</Text>
            </View>
        </View>
    );
};

const DefaultOffDayPickerView = ({setDefaultOffDay, defaultOffDay}) => {

    const days = ['Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
            marginTop: 30,
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

    return (
        <View>
            <View style={timePickerStyle.centerView}>
                <Text style={timePickerStyle.title}>Default Off Day</Text>
            </View>
            <View style={timePickerStyle.spaceBetweenView}>
                <NumberPickerView
                    dayList={days}
                    selectedDay={defaultOffDay}
                    setSelectedDay={setDefaultOffDay}
                />
            </View>
        </View>
    );
};

const NumberPickerView = ({selectedDay, setSelectedDay, dayList}) => {

    const pickerStyle = StyleSheet.create({
        pickerView: {
            color: '#121212',
            height: 30,
            width: 200,
            borderColor: 'black',
            borderWidth: 1,
        },
    });

    return (
        <View>
            <Picker
                style={pickerStyle.pickerView}
                selectedValue={selectedDay}
                onValueChange={(itemValue) => setSelectedDay(itemValue)}
            >
                {dayList.map((day, i) => {return <Picker.Item key={i + day} value={day} label={day} />;})}
            </Picker>
        </View>
    );
};

const SetOffDateScreen = ({ navigation }) => {

    const NONE = 'None';

    const [defaultOffDay, setDefaultOffDay] = useState(NONE);
    const [startDate, setStartDate] = useState(NONE);
    const [endDate, setEndDate] = useState(NONE);

    const confirmAddSpecificOffDay = () => {
        if (startDate === NONE || endDate === NONE){
            Alert.alert(
                'Error', 'Range of the specific off days\n not specified, please try again.', [{
                        text: 'Ok', style: 'cancel',
                    },
                ]
            );
        } else {
            Alert.alert('New Off Day Period created', '', [{
            }, {
                text: 'OK', onPress: () => {
                    setChangedDefaultOffDay(defaultOffDay);
                    addOffDayList('Bonab', startDate, endDate);
                    navigation.navigate('ReadAndDeleteOffDateScreen');
                },
            },
        ]);
        }

    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.imageTextView}>
                    <Image source={require('../../../img/doctor/setoffday.jpg')} style={styles.image}/>
                    <Text style={styles.text}>Set Doctor Off Day</Text>
                </View>
                <HorizontalLine/>
                <DefaultOffDayPickerView
                    setDefaultOffDay={setDefaultOffDay}
                    defaultOffDay={defaultOffDay}
                    NONE={NONE}
                />
                <ChooseOffDayPeriodView
                    setStartDate={setStartDate}
                    startDate={startDate}
                    setEndDate={setEndDate}
                    endDate={endDate}
                    NONE={NONE}
                />
                <HorizontalLine/>
                <View style={styles.addOffDayView}>
                    <TouchableOpacity
                        style={styles.addOffDayButton}
                        onPress={() => {
                            confirmAddSpecificOffDay();
                        }}
                    >
                        <Text style={styles.addOffDayText}>Add</Text>
                    </TouchableOpacity>
                </View>
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
    horizontalBorder: {
        borderBottomColor: '#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
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
    addOffDayView: {
        padding: 4,
        paddingBottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addOffDayButton: {
        backgroundColor: '#059862',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
    },
    addOffDayText: {
        color: '#FFFFFFE3',
        fontSize: 17,
    },
    inputInvalidText: {
        color: '#990000',
        fontSize: 14,
    },
});

export default SetOffDateScreen;
