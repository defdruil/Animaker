import { Injectable } from '@angular/core';
import { AnimationData, Frame, HitArea, Animation, } from './models/AnimationData';

// Injection decorator
@Injectable({
  providedIn: 'root'
})
export class AnimationDataService {
  // Private properties
  public animationData: AnimationData;
  public isInitialized: boolean;

  // Default constructor : to keep for injection
  constructor() {
    this.animationData = new AnimationData();
    this.animationData.ID = 'DEFAULT_ANIMATION_DATA';
    this.isInitialized = false;
  }

  public initialize(imageName: string): void {
    this.animationData = {
      ID : imageName,
      spritesheet : imageName,
      frameWidth : 30,
      frameHeight : 30,
      startX : 0,
      startY : 0,
      spacing : 1,
      hitArea : {
        height : 30,
        width : 30,
        x : 0,
        y : 0
      },
      animations : new Array<Animation>(),
      defaultAnim: 'DEFAULT_DEFAULT_ANIM'
    };
    this.isInitialized = true;
  }

  // To call to add a new Animation
  public addAnimation(): void {
    this.animationData.animations.push({
      name : 'DEFAULT_ANIMATION_NAME',
      autoRun : true,
      loop : true,
      defaultInterval : 200,
      timeline : new Array<Frame>()
    });
  }

  public removeAnimation(animation: Animation): void {
    const index = this.animationData.animations.indexOf(animation);
    if (index  !== -1) {
      this.animationData.animations.slice(index, 1);
    }
  }

  public moveAnimationTo(index: number) {

  }

  /*
  ** Adds a new Timeline,
  ** Returns True and adds it if a Frame exists.
  ** Returns false and does nothing if not.
  */
  public addTimeline(animation: Animation): boolean {
      const index = this.animationData.animations.indexOf(animation);
      if (index !== -1) {
        this.animationData.animations[index].timeline.push({
          frame: 0,
          interval: 0
        });
      }
      return true;
  }

  public removeTimeline(animation: Animation, frame: Frame) {
    console.log(animation, frame);
    const indexAnimation = this.animationData.animations.indexOf(animation);
    if (indexAnimation !== -1) {
      const indexTimeline = this.animationData.animations[indexAnimation].timeline.indexOf(frame);
      if (indexTimeline !== -1) {
        this.animationData.animations[indexAnimation].timeline.splice(indexTimeline, 1);
      }
    }
  }

  // Returns the Json of the AnimationData
  public getJson(): string {
    return JSON.stringify(this.animationData, null, 2);
  }
}
