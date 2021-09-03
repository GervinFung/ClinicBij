import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {getFilteredAppointmentList, getOptionList, getAppointmentList} from '../../logic/tempAppointmentList';
import {UntouchableAppointmentView} from '../reusable/AppointmentView';
import {getCurrentUser} from '../util/UserUtil';

const ReadAppointmentScreen = ({ route, navigation }) => {

    const [appointmentType, setAppointmentType] = useState('All');
    const [appointmentList, setAppointmentList] = useState(getFilteredAppointmentList(appointmentType));

    useEffect(()=> {
        getAppointmentList(getCurrentUser().uid).then(data=> {
            setAppointmentList(data);
            console.log(data);
        });
        // setAppointmentList(data);
    }, []);

    useEffect(()=> {
        setAppointmentList(appointmentType);
    }, [appointmentType]);

    const GetFilterList = () => {
        return getOptionList().map((option, index) => {
            return <Picker.Item key={index + option} value={option} label={option} />;
        });
    };

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
                    >{GetFilterList()}</Picker>
                </View>
            </View>
            <FlatList
                data={appointmentList}
                renderItem={({ item: appointment, separators }) => (
                    <UntouchableAppointmentView
                        index={appointment.appointment_id}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}
                        doctor={appointment.username}
                        purpose={appointment.purpose}
                        status={appointment.status}
                        date={appointment.appointment_dateTime}
                        time={appointment.appointment_dateTime}
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
