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
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                    },
                ],
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
                <div className="statistics-graph">
                    {this.state.dataLoaded && <Line data={this.state.data} />}
                </div>
            </div>
        );
    }
}
