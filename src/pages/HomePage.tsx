import React, { PureComponent } from "react";
import Device from "../components/Device";
import data from "../mocks/mockData";

export default class HomePage extends PureComponent {
    render() {
        return <Device deviceInfo={data} />;
    }
}
