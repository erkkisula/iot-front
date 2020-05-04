import React, { PureComponent } from "react";
import DeviceInfo from "../types/DeviceInfo";
import DeviceDataReadings from "../types/DeviceDataToSend";
import { Line } from "react-chartjs-2";

interface StatisticsProps {
    device: DeviceInfo;
}

interface StatisticsState {
    device: DeviceInfo;
    dataLoaded: boolean;
    readings: DeviceDataReadings[];
    data: any;
}

export default class Statistics extends PureComponent<StatisticsProps, StatisticsState> {
    data: any;
    constructor(props: StatisticsProps) {
        super(props);
        this.state = {
            device: { deviceId: "", deviceName: "", devicePower: 0 },
            dataLoaded: false,
            readings: [],
            data: {
                labels: [],
                datasets: [],
            },
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
            this.setState(
                {
                    readings: deviceReadings,
                },
                () => {
                    this.setChartData();
                }
            );
        }
    };

    setChartData = () => {
        if (this.state.readings.length !== 0) {
            let labelReadings: any = [];
            let powerReadings: any = [];
            this.state.readings.forEach((item: DeviceDataReadings) => {
                labelReadings.push(item.timestamp.toString());
                powerReadings.push(item.power);
            });

            console.log(labelReadings);
            console.log(powerReadings);

            this.setState({
                data: {
                    labels: labelReadings,
                    datasets: [
                        {
                            label: "Energia kasutus",
                            borderColor: "red",
                            data: powerReadings,
                        },
                    ],
                },
            });
        } else {
            this.setState({
                data: {
                    labels: [],
                    datasets: [],
                },
            });
        }
    };

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate() {
        if (this.props.device.deviceId !== this.state.device.deviceId) {
            this.setData();
        }
    }

    render() {
        return (
            <div className="statistics-body">
                <h2 className="device-name">
                    {" "}
                    <span className="info-value">{this.state.device.deviceName}</span>{" "}
                </h2>
                <div className="statistics-graph">
                    {this.state.dataLoaded && <Line data={this.state.data} />}
                </div>
            </div>
        );
    }
}
