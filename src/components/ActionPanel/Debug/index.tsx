import React from "react";
import events from "../../../events";
import { useSpineViewerStore } from "../../../store";
import PanelCheckbox from "../PanelCheckbox";

const Debug = () => {

    const { debugOptions, setDebugOptions } = useSpineViewerStore(store => {
        return {
            debugOptions: store.debugOptions,
            setDebugOptions: store.setDebugOptions
        }
    });

    const handleDebugOptionChange = (prop: string) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.checked;

            const newDebugOptions = debugOptions.map(debugOption => {
                if (debugOption.prop === prop) {
                    debugOption.value = value;

                    return debugOption;
                };

                return debugOption;
            });

            setDebugOptions(newDebugOptions);
            events.dispatchers.debugOptionChange({
                value: value,
                option: prop
            })
        }
    }

    return (
        <div className="action-panel-content">
             <h2 className="action-panel-heading">Debug</h2>

            {debugOptions.map(option => {
                return (
                    <PanelCheckbox 
                        onChange={handleDebugOptionChange(option.prop)}
                        checked={option.value}
                        label={option.label}
                    />
                    // <div key={option.prop}>
                    //     <label>
                    //         {option.label}
                    //         <input onChange={handleDebugOptionChange(option.prop)} type="checkbox" checked={option.value} />
                    //     </label>
                    // </div>
                )
            })}
        </div>
    )
}

export default Debug;