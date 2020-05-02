import React, { PureComponent } from "react";
import Device from "../components/Device";
import data from "../mocks/mockData";
import Sidebar from "../components/Sidebar";
import DeviceInfo from "../types/DeviceInfo";

interface HomePageState {
    devices: DeviceInfo[];
    activeDevice: number;
}

export default class HomePage extends PureComponent<{}, HomePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            devices: [
                { deviceId: "1", deviceName: "DEV001", devicePower: 160 },
                { deviceId: "1", deviceName: "DEV001", devicePower: 160 },
            ],
            activeDevice: 0,
        };
    }

    changeActiveItem = (index: number) => {
        this.setState({
            activeDevice: index,
        });
    };

    render() {
        return (
            <div className="homepage-body">
                <Sidebar
                    data={this.state.devices}
                    activeItem={this.state.activeDevice}
                    itemOnClick={this.changeActiveItem}
                />
                <div className="homepage-device-container">
                    <Device deviceInfo={data} />
                </div>
            </div>
        );
    }
}
