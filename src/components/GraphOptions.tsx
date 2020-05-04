import React from "react";

interface GraphOptionsProps {
    handleClick: Function;
    activeItem: number;
    data: string[];
}

export default function GraphOptions(props: GraphOptionsProps) {
    return (
        <div className="graph-options-body">
            <div className="graph-options-container">
                {props.data.map((text, i: number) => (
                    <GraphOption
                        key={i}
                        text={text}
                        active={i === props.activeItem}
                        handleClick={() => props.handleClick(i)}
                    />
                ))}
            </div>
        </div>
    );
}

interface GraphOptionProps {
    handleClick: any;
    text: string;
    active: boolean;
}

const GraphOption = (props: GraphOptionProps) => {
    return (
        <div
            className={props.active ? "graph-option active" : "graph-option"}
            onClick={props.handleClick}
        >
            {props.text}
        </div>
    );
};
