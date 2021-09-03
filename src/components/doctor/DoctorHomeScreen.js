import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import {getUser} from '../util/UserUtil';

const DoctorHomeScreenView = (props) => {

    const appointmentStyle = StyleSheet.create({
        button: {
            borderRadius: 20,
            margin: 20,
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
            fontSize: 15,
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


const DoctorHomeScreen = ({ navigation }) => {
    const user = getUser();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.generalView}><Text style={styles.title}>Welcome {user.fullName}</Text></View>
            <View style={styles.generalView}><Text style={styles.subTitle}>What would you like to do today?</Text></View>
            <View style={styles.menuContainer}>
                <DoctorHomeScreenView
                    image={require('../../../img/doctor/offDay.jpg')}
                    type="Set Your Off Date"
                    onPress={() => {
                        navigation.navigate('SetOffDateScreen');
                    }}
                />
                <DoctorHomeScreenView
                    image={require('../../../img/doctor/readOffDate.jpg')}
                    type="View and Delete Off Days"
                    onPress={() => {
                        navigation.navigate('ReadAndDeleteOffDateScreen');
                    }}
                />
                <DoctorHomeScreenView
                    image={require('../../../img/CRUD/readAppointment.jpg')}
                    type="Manage Appointment"
                    onPress={() => {
                        navigation.navigate('ManageAppointmentScreen');
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

export default DoctorHomeScreen;
