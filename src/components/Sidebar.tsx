import React from "react";
import SidebarItem from "./SidebarItem";
import DeviceInfo from "../types/DeviceInfo";

interface SidebarProps {
    itemOnClick: Function;
    data: DeviceInfo[];
    activeItem: number;
}
const Sidebar = (props: SidebarProps) => {
    return (
        <div className="sidebar-body">
            <div className="sidebar-title">
                <span>Seadmed</span>
            </div>
            <div className="sidebar-items">
                <div className="divider"></div>
                {props.data.map((item, i: number) => (
                    <SidebarItem
                        key={i}
                        text={item.deviceName}
                        active={i === props.activeItem}
                        onClick={() => props.itemOnClick(i)}
                    />
                ))}
                <div className="divider-line"></div>
                <SidebarItem
                    text={"Lisa seade"}
                    active={false}
                    onClick={() => console.log("New device")}
                />
            </div>
        </div>
    );
};

export default Sidebar;
