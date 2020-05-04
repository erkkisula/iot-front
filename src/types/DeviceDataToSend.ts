export default interface DeviceDataToSend {
    deviceId: string;
    noise: number;
    power: number;
    deviceTemp: number;
    airTemp: number;
    name: string;
    comment: string;
    timestamp: Date;
}
