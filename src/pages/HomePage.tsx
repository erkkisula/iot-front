import React, { PureComponent } from "react";
import Device from "../components/Device";
import data from "../mocks/mockData";
import Sidebar from "../components/Sidebar";

export default class HomePage extends PureComponent {
    render() {
        return (
            <div className="homepage-body">
                <Sidebar />
                <div className="homepage-device-container">
                    <Device deviceInfo={data} />
                </div>
            </div>
        );
    }
}
