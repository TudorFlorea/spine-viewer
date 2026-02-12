/**
 * Spine runtime version enumeration
 */
export enum SPINE_VERSION {
    VER37 = '3.7',
    VER38 = '3.8',
    VER40 = '4.0',
    VER41 = '4.1',
    UNKNOWN = 'unknown'
}

/**
 * Detects the Spine runtime version from a version string
 * @param version - Version string from spine data (e.g., "3.8.99", "4.1.23")
 * @returns The detected SPINE_VERSION enum value
 */
export function detectSpineVersion(version: string | undefined): SPINE_VERSION {
    if (!version) {
        console.warn('Spine version not provided, defaulting to 3.8');
        return SPINE_VERSION.UNKNOWN;
    }

    // Extract major.minor version (e.g., "3.8.99" -> "3.8")
    const versionParts = version.split('.');
    if (versionParts.length < 2) {
        console.warn(`Invalid spine version format: ${version}, defaulting to 3.8`);
        return SPINE_VERSION.UNKNOWN;
    }

    const majorMinor = `${versionParts[0]}.${versionParts[1]}`;

    switch (majorMinor) {
        case '3.7':
            return SPINE_VERSION.VER37;
        case '3.8':
            return SPINE_VERSION.VER38;
        case '4.0':
            return SPINE_VERSION.VER40;
        case '4.1':
            return SPINE_VERSION.VER41;
        default:
            console.warn(`Unsupported spine version: ${version}, defaulting to 3.8`);
            return SPINE_VERSION.UNKNOWN;
    }
}
