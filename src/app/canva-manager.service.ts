import { Injectable } from '@angular/core';
import { AnimationDataService } from './animation-data.service';

// Injection decorator
@Injectable({
  providedIn: 'root'
})
export class CanvaManagerService {
  // Private properties
  private ID: number;
  private stage: PIXI.DisplayObject;

  // Public properties


  // Default constructor : to keep for injection
  public constructor(
    private _animDataService: AnimationDataService
  ) {
  }

  // Setter for stage initialisation
  public setStage(stage: PIXI.DisplayObject): void {
    this.stage = stage;
    this.ID = 1;
  }

  // Getter for stage
  public getStage(): PIXI.DisplayObject {
    return this.stage;
  }

  // Update
  public update(): void {

  }
}
