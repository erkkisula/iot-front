import React from 'react';

interface ComponentBarProps {
    handleClick: Function;
    activeItem: number;
    data: string[];
}

const ComponentBar = (props: ComponentBarProps) => {
    return (
        <div className="bar-body">
            <div className="bar-option-container">
                {props.data.map((text, i: number) => (
                    <ComponentBarItem
                        key={i}
                        text={text}
                        active={i === props.activeItem}
                        handleClick={() => props.handleClick(i)}
                    />
                ))}
            </div>
        </div>
    );
};

interface ComponentBarItemProps {
    handleClick: any;
    text: string;
    active: boolean;
}

const ComponentBarItem = (props: ComponentBarItemProps) => {
    return (
        <div
            className={props.active ? 'sidebar-item active' : 'sidebar-item'}
            onClick={props.handleClick}
        >
            {props.text}
        </div>
    );
};

export default ComponentBar;
