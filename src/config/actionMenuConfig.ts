export interface ActionMenuConfigItem {
    icon: string;
    name: string;
    label: string;
    visible: boolean;
}

const actionMenuConfig: ActionMenuConfigItem[] = [
    {
        icon: "/assets/svg/animations.svg",
        name: "animations",
        label: "Animations",
        visible: true
    },
    {
        icon: "/assets/svg/skins.svg",
        name: "skins",
        label: "Skins",
        visible: true
    },
    {
        icon: "/assets/svg/debug.svg",
        name: "debug",
        label: "Debug",
        visible: true
    },
    {
        icon: "/assets/images/play-grey.png",
        name: "mixins",
        label: "Mixins",
        visible: false
    },
    {
        icon: "/assets/svg/timeline.svg",
        name: "timeline",
        label: "Timeline",
        visible: true
    },
    {
        icon: "/assets/svg/settings.svg",
        name: "settings",
        label: "Settings",
        visible: false
    }
];

export default actionMenuConfig;