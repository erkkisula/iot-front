import React, { PureComponent } from 'react';
import Device from '../components/Device';
import Sidebar from '../components/Sidebar';
import DeviceInfo from '../types/DeviceInfo';
import ComponentBar from '../components/ComponentBar';

interface HomePageState {
    devices: DeviceInfo[];
    activeDevice: number;
    activeTab: number;
}

export default class HomePage extends PureComponent<{}, HomePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            devices: [
                { deviceId: '1', deviceName: 'DEV001', devicePower: 1600 },
                { deviceId: '2', deviceName: 'DEV002', devicePower: 250 },
            ],
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

    render() {
        return (
            <div className="homepage-body">
                <Sidebar
                    data={this.state.devices}
                    activeItem={this.state.activeDevice}
                    itemOnClick={this.changeActiveItem}
                />
                <div className="homepage-device-container">
                    <ComponentBar
                        activeItem={this.state.activeTab}
                        handleClick={this.changeActiveTab}
                        data={['Seadme info', 'Statistika']}
                    />
                    {this.state.activeTab === 0 && (
                        <Device deviceInfo={this.state.devices[this.state.activeDevice]} />
                    )}
                </div>
            </div>
        );
    }
}
