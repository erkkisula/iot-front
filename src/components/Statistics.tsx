import React, { PureComponent } from "react";
import DeviceInfo from "../types/DeviceInfo";
import DeviceDataReadings from "../types/DeviceDataToSend";

interface StatisticsProps {
    device: DeviceInfo;
}

interface StatisticsState {
    device: DeviceInfo;
    dataLoaded: boolean;
    readings: DeviceDataReadings[];
}

export default class Statistics extends PureComponent<StatisticsProps, StatisticsState> {
    constructor(props: StatisticsProps) {
        super(props);
        this.state = {
            device: { deviceId: "", deviceName: "", devicePower: 0 },
            dataLoaded: false,
            readings: [],
        };
    }

    setData = () => {
        this.setState(
            {
                device: this.props.device,
                dataLoaded: true,
            },
            () => {
                this.getLocalData();
                console.log(this.state);
            }
        );
    };

    getLocalData = () => {
        let localData = localStorage.getItem("readings");
        if (localData !== null) {
            let deviceReadings: DeviceDataReadings[] = [];
            JSON.parse(localData).forEach((item: DeviceDataReadings) => {
                if (item.deviceId === this.state.device.deviceId) {
                    deviceReadings.push(item);
                }
            });
            this.setState({
                readings: deviceReadings,
            });
        }
    };

    componentDidMount() {
        this.setData();
    }

    render() {
        return (
            <div className="statistics-body">
                <h2 className="device-name">
                    {" "}
                    <span className="info-value">{this.state.device.deviceName}</span>{" "}
                </h2>
            </div>
        );
    }
}
