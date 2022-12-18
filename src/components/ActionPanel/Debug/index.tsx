import React from "react";
import events from "../../../events";
import { useSpineViewerStore } from "../../../store";
import ActionPanelContent from "../common/ActionPanelContent";
import PanelCheckbox from "../common/PanelCheckbox";

interface DebugProps {
    title: string;
}

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
        <ActionPanelContent title="Debug" >
            {debugOptions.map(option => {
                return (
                    <PanelCheckbox
                        key={option.prop}
                        onChange={handleDebugOptionChange(option.prop)}
                        checked={option.value}
                        label={option.label}
                    />
                )
            })}
        </ActionPanelContent>
    )
}

export default Debug;