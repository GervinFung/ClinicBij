import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import TouchableButton, {buttonStyleDict} from './reusable/TouchableButton';

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

    const { admin, user } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.generalView}><Text style={styles.title}>Welcome to MySejahtera</Text></View>
            <View style={[styles.generalView]}>
                <UserTypeLoginView
                    onPress={() => navigation.navigate('LoginScreen', {
                        userType: 'admin',
                    })}
                    image={require('../../img/admin.jpg')}
                    style={buttonStyleDict.WHITE}
                    userType={admin}
                />
                <UserTypeLoginView
                    onPress={() => navigation.navigate('LoginScreen', {
                        userType: 'user',
                    })}
                    image={require('../../img/user.jpg')}
                    style={buttonStyleDict.GREEN}
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
});

export default MainScreen;
