import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import {getUser} from '../util/UserUtil';

const AppointmentView = ({onPress, image, type}) => {

    const appointmentStyle = StyleSheet.create({
        button: {
            borderRadius: 20,
            marginBottom: 20,
            margin: 20,
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
        <TouchableOpacity style={appointmentStyle.button} underlayColor={'#F4B65F'} onPress={onPress}>
            <View style={appointmentStyle.imageTextView}>
                <Image source={image} style={appointmentStyle.image}/>
                <Text style={appointmentStyle.text}>{type} Appointment</Text>
            </View>
        </TouchableOpacity>
    );
};


const ManageAppointmentScreen = ({ navigation }) => {
    const user = getUser();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.generalView}><Text style={styles.title}>Welcome {user.fullName}</Text></View>
            <View style={styles.generalView}><Text style={styles.subTitle}>What would you like to do today?</Text></View>
            <View style={styles.menuContainer}>
                <AppointmentView
                    image={require('../../../img/CRUD/readAppointment.jpg')}
                    type="View"
                    onPress={() => {
                        navigation.navigate('ReadAppointmentScreen', {
                        });
                    }}
                />
                <AppointmentView
                    image={require('../../../img/CRUD/deleteAppointment.jpg')}
                    type="Cancel"
                    onPress={() => {
                        navigation.navigate('DeleteAppointmentScreen');
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

export default ManageAppointmentScreen;
