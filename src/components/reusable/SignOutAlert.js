import { Alert } from 'react-native';
import {signOutCurrentUser} from '../util/UserUtil';

const logoutProfile = () => {
    Alert.alert(
        'Log Out Confirmation', 'Are you sure you want to logout', [{
                text: 'Cancel', style: 'cancel',
            }, {
                text: 'OK', onPress: () => signOutCurrentUser(),
            },
        ]
    );
};

export default logoutProfile;
