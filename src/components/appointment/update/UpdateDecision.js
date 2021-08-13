import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';

const AppointmentTypeView = (props) => {

    const appointmentStyle = StyleSheet.create({
        button: {
            borderRadius: 20,
            marginBottom: 20,
            width: 150,
            elevation: 5,
            backgroundColor:'#FEFEFE',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
            alignItems: 'center',
            padding: 20,
        },
        imageTextView: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        image: {
            width: 95,
            height: 95,
        },
        text: {
            textAlign: 'center',
        },
    });

    return (
        <TouchableOpacity style={appointmentStyle.button} underlayColor={'#F4B65F'} onPress={props.onPress}>
            <View style={appointmentStyle.imageTextView}>
                <Image source={props.image} style={appointmentStyle.image}/>
                <Text style={appointmentStyle.text}>{props.type}</Text>
            </View>
        </TouchableOpacity>
    );
};


const UpdateDecisionScreen = ({ route, navigation }) => {

    const { appointment } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.generalView}><Text style={styles.title}>Welcome</Text></View>
            <View style={styles.generalView}><Text style={styles.subTitle}>Which part would you like to do update?</Text></View>
            <View style={styles.menuContainer}>
                <AppointmentTypeView
                    image={require('../../../../img/doctor/doctor1.jpg')}
                    type="Update Doctor"
                    onPress={() => {
                        navigation.navigate('UpdateDoctorScreen', {
                            doctor: appointment.doctor,
                            id: appointment.id,
                        });
                    }}
                />
                <AppointmentTypeView
                    image={require('../../../../img/update/changeDoctor.jpg')}
                    type="Update Purpose"
                    onPress={() => {
                        navigation.navigate('UpdatePurposeScreen', {
                            purpose: appointment.purpose,
                            id: appointment.id,
                        });
                    }}
                />
                <AppointmentTypeView
                    image={require('../../../../img/update/changeDateTime.jpg')}
                    type="Update Date/Time"
                    onPress={() => {
                        navigation.navigate('UpdateDateTimeScreen', {
                            date: appointment.date,
                            time: appointment.time,
                            id: appointment.id,
                        });
                    }}
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

export default UpdateDecisionScreen;
