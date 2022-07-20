import Alert from 'react-s-alert';

const alertConfigs = {
    position: 'top-right',
    effect: 'slide',
    beep: false,
    timeout: 4000
};

export function alertError(message) {
    Alert.error(message, alertConfigs);
}

export function alertSuccess(message) {
    Alert.success(message, alertConfigs)
}