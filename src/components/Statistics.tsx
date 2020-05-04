import React, { PureComponent } from "react";
import DeviceInfo from "../types/DeviceInfo";
import DeviceDataReadings from "../types/DeviceDataToSend";
import { Line } from "react-chartjs-2";
import GraphOptions from "./GraphOptions";

interface StatisticsProps {
    device: DeviceInfo;
}

interface StatisticsState {
    device: DeviceInfo;
    dataLoaded: boolean;
    activeTab: number;
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
            activeTab: 0,
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
                    this.updateChartData();
                }
            );
        }
    };

    updateChartData = () => {
        if (this.state.readings.length !== 0) {
            let chartLabels: any = [];
            let chartData: any = [];

            switch (this.state.activeTab) {
                case 0:
                    this.state.readings.forEach((item: DeviceDataReadings) => {
                        chartLabels.push(item.timestamp.toString());
                        chartData.push(item.power);
                    });
                    this.setChartData(chartLabels, chartData, "Energia(W)");
                    break;
                case 1:
                    this.state.readings.forEach((item: DeviceDataReadings) => {
                        chartLabels.push(item.timestamp.toString());
                        chartData.push(item.noise);
                    });
                    this.setChartData(chartLabels, chartData, "Heli(dB)");
                    break;
                case 2:
                    let chartData2: any = [];
                    this.state.readings.forEach((item: DeviceDataReadings) => {
                        chartLabels.push(item.timestamp.toString());
                        chartData.push(item.deviceTemp);
                        chartData2.push(item.airTemp);
                    });
                    this.setChartDualDatasets(
                        chartLabels,
                        chartData,
                        "Seadme temp(C)",
                        chartData2,
                        "Õhu temp(C)"
                    );
                    break;
                default:
                    break;
            }
        } else {
            this.setChartEmpty();
        }
    };

    setChartEmpty = () => {
        this.setState({
            data: {
                labels: [],
                datasets: [],
            },
        });
    };

    setChartData = (chartlabels: any, dataset: any, datasetlabel: string) => {
        this.setState({
            data: {
                labels: chartlabels,
                datasets: [
                    {
                        label: datasetlabel,
                        borderColor: "red",
                        data: dataset,
                    },
                ],
            },
        });
    };

    setChartDualDatasets = (
        chartlabels: any,
        dataset1: any,
        datasetlabel1: string,
        dataset2: any,
        datasetlabel2: any
    ) => {
        this.setState({
            data: {
                labels: chartlabels,
                datasets: [
                    {
                        label: datasetlabel1,
                        borderColor: "red",
                        data: dataset1,
                    },
                    {
                        label: datasetlabel2,
                        borderColor: "blue",
                        data: dataset2,
                    },
                ],
            },
        });
    };

    handleChartTabChange = (index: number) => {
        this.setState(
            {
                activeTab: index,
            },
            () => {
                this.updateChartData();
            }
        );
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
                <GraphOptions
                    activeItem={this.state.activeTab}
                    handleClick={this.handleChartTabChange}
                    data={["Energia", "Heli", "Temperatuur"]}
                />
            </div>
        );
    }
}
