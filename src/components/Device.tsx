import React, { PureComponent } from "react";
import DeviceInfo from "../types/DeviceInfo";
import DeviceDataToSend from "../types/DeviceDataToSend";

interface DeviceState {
    device: DeviceInfo;
    currentPower: number;
    currentNoise: number;
    powerHigh: number;
    powerLow: number;
    dataLoaded: boolean;
}

interface DeviceProps {
    deviceInfo: DeviceInfo;
}

export default class Device extends PureComponent<DeviceProps, DeviceState> {
    timerID!: NodeJS.Timeout;
    inputDeviceTemp: React.RefObject<HTMLInputElement>;
    inputAirTemp: React.RefObject<HTMLInputElement>;
    inputName: React.RefObject<HTMLInputElement>;
    inputComment: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);
        this.state = {
            device: { deviceId: "", deviceName: "", devicePower: 0 },
            currentPower: 0,
            currentNoise: 0,
            powerHigh: 0,
            powerLow: 100,
            dataLoaded: false,
        };
        // Form refs
        this.inputDeviceTemp = React.createRef();
        this.inputAirTemp = React.createRef();
        this.inputName = React.createRef();
        this.inputComment = React.createRef();
    }

    createRandomCurrentPower = () => {
        let value =
            Math.floor(
                Math.random() *
                    (this.props.deviceInfo.devicePower * 1.5 -
                        this.props.deviceInfo.devicePower * 0.5)
            ) +
            this.props.deviceInfo.devicePower * 0.5;
        return value;
    };

    changeCurrentPower = () => {
        const dir = Math.floor(Math.random() * 1000);
        const change = Math.random() * 6;

        let newPowerValue = this.state.currentPower;

        if (dir <= 500) {
            // Go up
            if (newPowerValue + change >= this.state.powerHigh) {
                newPowerValue -= change;
            } else {
                if (newPowerValue < this.state.device.devicePower) {
                    let difference = this.state.device.devicePower / newPowerValue;
                    newPowerValue += change * difference;
                } else {
                    newPowerValue += change;
                }
            }
        } else {
            // Go down
            if (newPowerValue - change <= this.state.powerLow) {
                newPowerValue += change * 10;
            } else {
                if (newPowerValue < this.state.device.devicePower) {
                    let difference = newPowerValue / this.state.device.devicePower;
                    newPowerValue -= change * difference;
                } else {
                    newPowerValue -= change;
                }
            }
        }

        this.setState({
            currentPower: Math.floor(newPowerValue),
        });
    };

    changeCurrentNoise = () => {
        const dir = Math.floor(Math.random() * 1000);
        const change =
            Math.random() * 2 * (this.state.currentPower / this.state.device.devicePower);
        let newNoiseValue = this.state.currentPower * 0.08;
        if (dir <= 500) {
            newNoiseValue += change;
        } else {
            newNoiseValue -= change;
        }

        newNoiseValue = newNoiseValue / 4;

        this.setState({
            currentNoise: Math.round((newNoiseValue + Number.EPSILON) * 100) / 100,
        });
    };

    update = () => {
        if (this.state.dataLoaded) {
            this.changeCurrentPower();
            this.changeCurrentNoise();
        }
    };

    setData = () => {
        this.setState(
            {
                device: this.props.deviceInfo,
                currentPower: this.createRandomCurrentPower(),
                powerLow: this.props.deviceInfo.devicePower * 0.5,
                powerHigh: this.props.deviceInfo.devicePower * 1.5,
                dataLoaded: true,
            },
            () => {
                this.changeCurrentPower();
                this.changeCurrentNoise();
            }
        );
    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        if (
            this.inputName.current != null &&
            this.inputComment.current != null &&
            this.inputDeviceTemp.current != null &&
            this.inputAirTemp.current != null
        ) {
            const dataToSend: DeviceDataToSend = {
                deviceId: this.props.deviceInfo.deviceId,
                noise: this.state.currentNoise,
                power: this.state.currentPower,
                deviceTemp: Number(this.inputDeviceTemp.current.value),
                airTemp: Number(this.inputAirTemp.current.value),
                name: this.inputName.current.value,
                comment: this.inputComment.current.value,
            };

            console.log(dataToSend);
        }
    };

    componentDidMount = () => {
        this.setData();
        this.timerID = setInterval(() => {
            this.update();
        }, 1000);
    };

    componentDidUpdate = () => {
        if (this.props.deviceInfo.deviceId !== this.state.device.deviceId) {
            this.setData();
        }
    };

    componentWillUnmount = () => {
        clearInterval(this.timerID);
    };

    render() {
        return (
            <div className="device-body">
                <div className="device-info">
                    <h2 className="device-name">
                        {" "}
                        <span className="info-value">{this.state.device.deviceName}</span>{" "}
                    </h2>
                    <div className="device-id info-row">
                        Seadme id:
                        <span className="info-value">{this.state.device.deviceId}</span>
                    </div>
                    <div className="device-noise info-row">
                        Müra:
                        <span className="info-value">{this.state.currentNoise}dB</span>
                    </div>
                    <div className="device-power info-row">
                        Energia kasutus:
                        <span className="info-value">{this.state.currentPower}W</span>
                    </div>
                </div>
                <br />
                <div className="device-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <label htmlFor="form-device-temp">Seadme temperatuur: </label>
                            <input
                                type="text"
                                name="form-device-temp"
                                id="form-device-temp"
                                ref={this.inputDeviceTemp}
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="form-air-temp">Õhu temperatuur: </label>
                            <input
                                type="text"
                                name="form-air-temp"
                                id="form-air-temp"
                                ref={this.inputAirTemp}
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="form-name">Kontrollija nimi: </label>
                            <input
                                type="text"
                                name="form-name"
                                id="form-name"
                                ref={this.inputName}
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="form-comment">Kommentaarid: </label>
                            <input
                                type="text"
                                name="form-comment"
                                id="form-comment"
                                ref={this.inputComment}
                            />
                        </div>
                        <input type="submit" value="Salvesta" />
                    </form>
                </div>
            </div>
        );
    }
}
