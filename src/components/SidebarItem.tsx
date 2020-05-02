import React from "react";

interface SidebarItemProps {
    text: string;
    active: boolean;
    onClick: any;
}

export default function SidebarItem(props: SidebarItemProps) {
    return (
        <div
            className={props.active ? "sidebar-item active" : "sidebar-item"}
            onClick={props.onClick}
        >
            <div className="sidebar-item-name">{props.text}</div>
        </div>
    );
}
