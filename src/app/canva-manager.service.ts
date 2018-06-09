import { Injectable } from '@angular/core';
import { AnimationDataService } from './animation-data.service';
import { Texture } from 'pixi.js';

// Injection decorator
@Injectable({
  providedIn: 'root'
})
export class CanvaManagerService {
  // Private properties
  private ID: number;
  private stage: PIXI.Container;
  private spriteSheet: PIXI.Sprite = new PIXI.Sprite();

  // Public properties


  // Default constructor : to keep for injection
  public constructor(
    private _animDataService: AnimationDataService
  ) {
  }

  // Update
  public update(): void {

  }

  // Setter for stage initialisation
  public setStage(stage: PIXI.Container): void {
    this.stage = stage;
    this.stage.addChild(this.spriteSheet);
    this.ID = 1;
  }

  // Getter for stage
  public getStage(): PIXI.DisplayObject {
    return this.stage;
  }

  // Setter for Image
  public setSpriteSheet(image: string): void {
    this.spriteSheet.texture = PIXI.Texture.fromImage(image);
  }
}
