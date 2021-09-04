import React, {useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Drawer, Colors } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {getUser, getAuth, hasCurrentUser} from './components/util/UserUtil';
import logoutProfile from './components/reusable/SignOutAlert';

const ProfileIcon = () => {

    const [user, setUser] = useState(getUser());

    useEffect(() => getAuth().onAuthStateChanged(() => {
        if (hasCurrentUser()) {
            setUser(getUser());
        }
    }), [user]);

    const profileStyle = StyleSheet.create({
        title: {
            fontSize: 16,
            marginTop: 3,
            fontWeight: 'bold',
        },
        userInfoSection: {
          paddingLeft: 20,
        },
        avatar: {
            flexDirection:'row',
            marginTop: 15,
        },
        accountInfo: {
            marginLeft:15,
            flexDirection:'column',
        },
        caption: {
            fontSize: 14,
            lineHeight: 14,
            flexDirection: 'row',
        },
    });

    return (
        <View style={profileStyle.userInfoSection}>
            <View style={profileStyle.avatar}>
                <Avatar.Image
                    style={{ backgroundColor: Colors.white }}
                    source={require('../img/drawerContent/lightMode.jpg')}
                    size={50}
                />
                <View style={profileStyle.accountInfo}>
                    <Title style={styles.title}>{user.fullName}</Title>
                    <Caption style={styles.caption}>{user.email}</Caption>
                </View>
            </View>
        </View>
    );
};

const DrawerNavItem = ({onPress, iconName, label}) => {
    return (
        <DrawerItem
            icon={({color, size}) => (
                <MaterialCommunityIcons
                    name={iconName}
                    color={color}
                    size={size}
                />
            )}
            label={label}
            onPress={onPress}
        />
    );
};

const DrawerContent = (props) => {

    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <ProfileIcon/>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerNavItem
                            iconName="home-outline"
                            label="Home"
                            onPress={() => props.navigation.navigate('Home')}
                        />
                        <DrawerNavItem
                            iconName="account-outline"
                            label="Profile"
                            onPress={() => props.navigation.navigate('Profile')}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Help">
                        <DrawerNavItem
                            iconName="help"
                            label="Help"
                            onPress={() => props.navigation.navigate('Help')}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerNavItem
                    iconName="exit-to-app"
                    label="Sign Out"
                    onPress = {() => logoutProfile()}
                />
            </Drawer.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
});

export default DrawerContent;
