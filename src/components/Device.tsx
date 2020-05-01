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

    createRandomCurrentPower() {
        let powerHigh = this.props.deviceInfo.devicePower * 1.5;
        return Math.floor(Math.random() * powerHigh) + this.state.powerLow;
    }

    componentDidMount = () => {
        this.setState({
            basePower: this.props.deviceInfo.devicePower,
            currentPower: this.createRandomCurrentPower(),
            powerHigh: this.props.deviceInfo.devicePower * 1.5,
            dataLoaded: true,
        });
    };
    render() {
        setInterval(() => {
            console.log("Working");
        }, 1000);
        return (
            <div>
                <div>I am device</div>
            </div>
        );
    }
}
