// Structure of Json to export
export class AnimationData {
    ID: string;
    spritesheet: string;
    frameWidth: number;
    frameHeight: number;
    startX: number;
    startY: number;
    spacing: number;
    defaultAnim: string;
    hitArea: HitArea;
    animations: Animation[];
}

export class HitArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Animation {
    name: string;
    autoRun: true;
    loop: true;
    defaultInterval: number;
    timeline: Frame[];
}

export class Frame {
    frame: number;
    interval: number;
}
