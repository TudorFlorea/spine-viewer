export interface ActionMenuConfigItem {
    icon: string;
    name: string;
    label: string;
    visible: boolean;
}

const actionMenuConfig: ActionMenuConfigItem[] = [
    {
        icon: "/assets/images/play-grey.png",
        name: "animations",
        label: "Animations",
        visible: true
    },
    {
        icon: "/assets/images/play-grey.png",
        name: "skins",
        label: "Skins",
        visible: true
    },
    {
        icon: "/assets/images/play-grey.png",
        name: "debug",
        label: "Debug",
        visible: true
    },
    {
        icon: "/assets/images/play-grey.png",
        name: "mixins",
        label: "Mixins",
        visible: true
    },
    {
        icon: "/assets/images/play-grey.png",
        name: "timeline",
        label: "Timeline",
        visible: true
    },
    {
        icon: "/assets/images/icon-settings.png",
        name: "settings",
        label: "Settings",
        visible: false
    }
];

export default actionMenuConfig;