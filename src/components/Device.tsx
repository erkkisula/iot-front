import React, { PureComponent } from "react";
import DeviceInfo from "../types/DeviceInfo";

interface DeviceState {
    basePower: number;
    currentPower: number;
    currentNoise: number;
    powerHigh: number;
    powerLow: number;
    dataLoaded: boolean;
}

interface DeviceProps {
    deviceInfo: DeviceInfo;
}

export default class Device extends PureComponent<DeviceProps, DeviceState> {
    timerID!: NodeJS.Timeout;
    constructor(props: any) {
        super(props);
        this.state = {
            basePower: 0,
            currentPower: 0,
            currentNoise: 0,
            powerHigh: 0,
            powerLow: 100,
            dataLoaded: false,
        };
    }

    createRandomCurrentPower = () => {
        let powerHigh = this.props.deviceInfo.devicePower * 1.5;
        return Math.floor(Math.random() * powerHigh) + this.state.powerLow;
    };

    changeCurrentPower = () => {
        const dir = Math.floor(Math.random() * 1000);
        const change = Math.random() * 6;

        let newPowerValue = this.state.currentPower;

        if (dir <= 500) {
            if (newPowerValue + change >= this.state.powerHigh) {
                newPowerValue -= change;
            } else {
                if (newPowerValue < this.state.basePower) {
                    let difference = this.state.basePower / newPowerValue;
                    newPowerValue += change * difference;
                } else {
                    newPowerValue += change;
                }
            }
        } else {
            if (newPowerValue - change <= this.state.powerHigh) {
                newPowerValue += change * 10;
            } else {
                if (newPowerValue < this.state.basePower) {
                    let difference = newPowerValue / this.state.basePower;
                    newPowerValue -= change * difference;
                } else {
                    newPowerValue -= change;
                }
            }
        }

        this.setState({
            currentPower: Math.floor(newPowerValue),
        });
    };

    changeCurrentNoise = () => {
        const dir = Math.floor(Math.random() * 1000);
        const change = Math.random() * 2 * (this.state.currentPower / this.state.basePower);
        let newNoiseValue = this.state.currentPower * 0.08;
        if (dir <= 500) {
            newNoiseValue += change;
        } else {
            newNoiseValue -= change;
        }

        this.setState({
            currentNoise: Math.round((newNoiseValue + Number.EPSILON) * 100) / 100,
        });
    };

    update = () => {
        if (this.state.dataLoaded) {
            this.changeCurrentPower();
            this.changeCurrentNoise();
        }
    };

    setData = () => {
        this.setState({
            basePower: this.props.deviceInfo.devicePower,
            currentPower: this.createRandomCurrentPower(),
            powerHigh: this.props.deviceInfo.devicePower * 1.5,
            dataLoaded: true,
        });
    };

    componentDidMount = () => {
        this.setData();
        this.timerID = setInterval(() => {
            this.update();
        }, 1000);
    };

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        return (
            <div className="device-body">
                <div className="device-info">
                    <h2 className="device-name">{this.props.deviceInfo.deviceName}</h2>
                    <div className="device-id">Seadme id: {this.props.deviceInfo.deviceId}</div>
                    <div className="device-noise">Müra: {this.state.currentNoise}dB</div>
                    <div className="device-power">Energia kasutus: {this.state.currentPower}W</div>
                </div>
            </div>
        );
    }
}
