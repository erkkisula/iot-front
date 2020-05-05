import DeviceInfo from "../types/DeviceInfo";
import { getRandomNumberToNearestFifty } from "../util";

export function createNewRandomDevice() {
    let localData = localStorage.getItem("devices");
    let newDevice: DeviceInfo = { deviceId: "", deviceName: "", devicePower: 0 };
    if (localData === null) {
        newDevice = {
            deviceId: "1",
            deviceName: "DEV001",
            devicePower: getRandomNumberToNearestFifty(),
        };
    } else {
        localData = JSON.parse(localData);
        if (localData !== null) {
            newDevice = {
                deviceId: (localData.length + 1).toString(),
                deviceName: createDeviceName(localData.length + 1),
                devicePower: getRandomNumberToNearestFifty(),
            };
        }
    }

    return newDevice;
}

export function createDeviceName(length: number) {
    let i = 3 - length.toString().length;
    return "DEV" + "0".repeat(i) + length.toString();
}
