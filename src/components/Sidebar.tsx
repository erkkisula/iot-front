import React from "react";
import SidebarItem from "./SidebarItem";
import DeviceInfo from "../types/DeviceInfo";

interface SidebarProps {
    itemOnClick: any;
    data: DeviceInfo[];
    activeItem: number;
}
const Sidebar = (props: SidebarProps) => {
    return (
        <div className="sidebar-body">
            <div className="sidebar-title">
                <span>Seadmed</span>
            </div>
            <div className="divider"></div>
            {props.data.map((item, i: number) => (
                <SidebarItem
                    key={i}
                    text={item.deviceName}
                    active={i === props.activeItem}
                    onClick={() => props.itemOnClick(i)}
                />
            ))}
        </div>
    );
};

export default Sidebar;
