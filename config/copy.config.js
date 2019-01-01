module.exports = {
    copyPahoMqtt: {
        src: [
            '{{SRC}}/estufa_mqtt.js',
            '{{SRC}}/paho-mqtt-min.js',
            '{{SRC}}/paho-mqtt.js'
        ],
        dest: '{{WWW}}/build/'
    }
}