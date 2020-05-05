import React, { PureComponent } from "react";
import Device from "../components/Device";
import Sidebar from "../components/Sidebar";
import DeviceInfo from "../types/DeviceInfo";
import ComponentBar from "../components/ComponentBar";
import Statistics from "../components/Statistics";
import { createNewRandomDevice } from "../services/deviceServices";

interface HomePageState {
    devices: DeviceInfo[];
    activeDevice: number;
    activeTab: number;
}

export default class HomePage extends PureComponent<{}, HomePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            devices: [],
            activeDevice: 0,
            activeTab: 0,
        };
    }

    changeActiveItem = (index: number) => {
        this.setState({
            activeDevice: index,
        });
    };

    changeActiveTab = (index: number) => {
        this.setState({
            activeTab: index,
        });
    };

    addNewRandomDevice = () => {
        let localData = localStorage.getItem("devices");
        if (localData === null) {
            const newDevices = [createNewRandomDevice()];
            this.setState(
                {
                    devices: newDevices,
                },
                () => localStorage.setItem("devices", JSON.stringify(newDevices))
            );
        } else {
            let newDevices: DeviceInfo[] = JSON.parse(localData);
            newDevices.push(createNewRandomDevice());
            this.setState(
                {
                    devices: newDevices,
                },
                () => localStorage.setItem("devices", JSON.stringify(newDevices))
            );
        }
    };

    getLocalData = () => {
        let localData = localStorage.getItem("devices");
        if (localData === null) {
            const newDevices = [
                { deviceId: "1", deviceName: "DEV001", devicePower: 1600 },
                { deviceId: "2", deviceName: "DEV002", devicePower: 250 },
            ];
            this.setState(
                {
                    devices: newDevices,
                },
                () => localStorage.setItem("devices", JSON.stringify(newDevices))
            );
        } else {
            this.setState({
                devices: JSON.parse(localData),
            });
        }
    };

    componentDidMount = () => {
        this.getLocalData();
    };

    render() {
        return (
            <div className="homepage-body">
                <Sidebar
                    data={this.state.devices}
                    activeItem={this.state.activeDevice}
                    itemOnClick={this.changeActiveItem}
                    createNewDevice={this.addNewRandomDevice}
                />
                <div className="homepage-device-container">
                    <ComponentBar
                        activeItem={this.state.activeTab}
                        handleClick={this.changeActiveTab}
                        data={["Seadme info", "Statistika"]}
                    />
                    {this.state.activeTab === 0 && this.state.devices.length !== 0 && (
                        <Device deviceInfo={this.state.devices[this.state.activeDevice]} />
                    )}

                    {this.state.activeTab === 1 && this.state.devices.length !== 0 && (
                        <Statistics device={this.state.devices[this.state.activeDevice]} />
                    )}
                </div>
            </div>
        );
    }
}
