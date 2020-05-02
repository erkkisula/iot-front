import React, { PureComponent } from "react";
import SidebarItem from "./SidebarItem";

interface SidebarState {
    activeItem: any;
    data: any;
}

export default class Sidebar extends PureComponent<{}, SidebarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeItem: 1,
            data: [{ text: "DEV001" }, { text: "DEV002" }, { text: "DEV003" }],
        };
    }

    changeActiveItem = (index: number) => {
        this.setState({
            activeItem: index,
        });
    };

    render() {
        return (
            <div className="sidebar-body">
                <div className="sidebar-title">
                    <span>Seadmed</span>
                </div>
                <div className="divider"></div>
                {this.state.data.map((item: { text: string }, i: number) => (
                    <SidebarItem
                        key={i}
                        text={item.text}
                        active={i === this.state.activeItem}
                        onClick={() => this.changeActiveItem(i)}
                    />
                ))}
            </div>
        );
    }
}
