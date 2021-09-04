import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import TouchableButton, {buttonStyleDict} from './reusable/TouchableButton';
import { DOCTOR, PATIENT } from '../../App';

const UserTypeLoginView = ({onPress, image, userType, style}) => {

    const userTypeStyle = StyleSheet.create({
        parentButton: {
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return (
        <View>
            <View style={styles.generalView}>
                <TouchableOpacity onPress={onPress}>
                    <Image style={styles.image} source={image}/>
                </TouchableOpacity>
            </View>
            <TouchableButton
                viewStyle={userTypeStyle.parentButton}
                onPress={onPress}
                text={userType}
                buttonStyle={style}
            />
        </View>
    );
};

const MainScreen = ({ route, navigation }) => {

    const { doctor, patient } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.generalView}><Text style={styles.title}>Welcome to MySejahtera</Text></View>
                <View style={[styles.generalView]}>
                    <UserTypeLoginView
                        onPress={() => navigation.navigate('LoginScreen', {
                            userType: DOCTOR,
                        })}
                        image={require('../../img/doctor.jpg')}
                        style={buttonStyleDict.WHITE}
                        userType={doctor}
                    />
                    <UserTypeLoginView
                        onPress={() => navigation.navigate('LoginScreen', {
                            userType: PATIENT,
                        })}
                        image={require('../../img/patient.jpg')}
                        style={buttonStyleDict.GREEN}
                        userType={patient}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    generalView: {
        paddingTop: 10,
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    title: {
        color: '#2196F3',
        fontSize: 30,
        paddingBottom: 10,
    },
    image: {
        width: 165,
        height: 165,
        resizeMode: 'contain',
    },
});

export default MainScreen;
