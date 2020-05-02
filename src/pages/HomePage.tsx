import React, { PureComponent } from "react";
import Device from "../components/Device";
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
                { deviceId: "1", deviceName: "DEV001", devicePower: 1600 },
                { deviceId: "2", deviceName: "DEV002", devicePower: 250 },
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
                    <Device deviceInfo={this.state.devices[this.state.activeDevice]} />
                </div>
            </div>
        );
    }
}
