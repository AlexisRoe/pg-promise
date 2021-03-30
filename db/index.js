const pgp = require('pg-promise')({});
const { TRIES, TIMETOWAIT, LISTENER } = process.env.RECONNECT;

const db = pgp(process.env.CONFIG);

/**
 * connection listener created by the authors of pg-promise
 * source: https://github.com/vitaly-t/pg-promise/wiki/Robust-Listeners, 31.03.2021
 * modified to use env variables, specified in .env.json (with env-cmd)
 */

let connection;

function onNotification(data) {
    console.log('Received Payload:', data.payload);
}

function setListeners(client) {
    client.on('notification', onNotification);
    return connection.none('LISTEN $1~', 'my-channel').catch((error) => {
        console.error(error);
    });
}

function removeListeners(client) {
    client.removeListener('notification', onNotification);
}

function onConnectionLost(err, e) {
    console.log('Connectivity Problem:', err);
    connection = null;
    removeListeners(e.client);
    reconnect(TRIES, TIMETOWAIT)
        .then(() => {
            console.log('Successfully Reconnected');
        })
        .catch(() => {
            console.error('Connection Lost Permanently');
            process.exit();
        });
}

function reconnect(delay, maxAttempts) {
    delay = delay > 0 ? parseInt(delay) : 0;
    maxAttempts = maxAttempts > 0 ? parseInt(maxAttempts) : 1;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.connect({ direct: true, onLost: onConnectionLost })
                .then((obj) => {
                    connection = obj;
                    resolve(obj);
                    return setListeners(obj.client);
                })
                .catch((error) => {
                    console.error('Error Connecting:', error);
                    if (--maxAttempts) {
                        reconnect(delay, maxAttempts).then(resolve).catch(reject);
                    } else {
                        reject(error);
                    }
                });
        }, delay);
    });
}

function sendNotifications() {
    setInterval(() => {
        if (connection) {
            connection
                .none('NOTIFY $1~, $2', ['my-channel', 'my payload string'])
                .catch((error) => {
                    console.log('Failed to Notify:', error);
                });
        }
    }, LISTENER);
}

reconnect()
    .then((obj) => {
        console.log('Successful Initial Connection');
        sendNotifications();
    })
    .catch((error) => {
        console.error('Failed Initial Connection:', error);
    });

/**
 * end connection listener
 */

module.exports = db;
