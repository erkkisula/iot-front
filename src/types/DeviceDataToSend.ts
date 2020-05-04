export default interface DeviceDataReadings {
    deviceId: string;
    noise: number;
    power: number;
    deviceTemp: number;
    airTemp: number;
    name: string;
    comment: string;
    timestamp: Date;
}
