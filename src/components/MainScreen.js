import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';

const adminImg = require('../../img/admin.jpg');
const userImg = require('../../img/user.jpg');

const UserTypeLoginView = (props) => {

    const userTypeStyle = StyleSheet.create({
        parentButton: {
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return (
        <View>
            <View style={styles.generalView}>
                <TouchableOpacity onPress={props.onPress}>
                    <Image style={styles.image} source={props.image}/>
                </TouchableOpacity>
            </View>
            <View style={userTypeStyle.parentButton}>
                <TouchableOpacity
                    style={props.buttonStyle}
                    onPress={props.onPress}
                >
                    <Text style={props.textStyle}>{props.userType.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const MainScreen = ({ route, navigation }) => {

    const { admin, user } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.generalView}><Text style={styles.title}>Welcome to MySejahtera</Text></View>
            <View style={[styles.generalView]}>
                <UserTypeLoginView
                    onPress={() => navigation.navigate('LoginScreen', {
                        userType: 'admin',
                    })}
                    image={adminImg}
                    buttonStyle={styles.adminButton}
                    textStyle={styles.adminText}
                    userType={admin}
                />
                <UserTypeLoginView
                    onPress={() => navigation.navigate('LoginScreen', {
                        userType: 'user',
                    })}
                    image={userImg}
                    buttonStyle={styles.userButton}
                    textStyle={styles.userText}
                    userType={user}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    generalView: {
        paddingTop: 10,
        paddingBottom: 20,
        width: '100%',
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
    userButton: {
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
    userText: {
        color: '#FFFFFFE3',
        fontSize: 17,
    },
    adminButton: {
        //iOS
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        //iOS
        //android
        elevation: 2,
        //android
        backgroundColor: '#FFF',
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
    adminText: {
        backgroundColor: 'transparent',
        color: '#059862',
        fontSize: 17,
    },
});

export default MainScreen;
