import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import * as PIXI from 'pixi.js';
import { AnimationData } from '../models/AnimationData';
import { CanvaManagerService } from '../canva-manager.service';
import { AnimationDataService } from '../animation-data.service';

// Component decorator
@Component({
  selector: 'app-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.css']
})
export class MainCanvasComponent implements AfterViewInit {

  // Récupération du Canvas
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  // Récupération des InputFile
  @ViewChild('spriteSheetInput') spriteSheetInput: ElementRef<Input>;
  @ViewChild('jsonInput') jsonInput: ElementRef<Input>;

  // public properties
  public app: PIXI.Application;

  // JSON properties
  public json: string;
  public jsonFileName = 'Importez le Json...';
  public jsonFiles: File[] = new Array<File>();

  // SpriteSheet properties
  public spriteSheet: string;
  public spriteSheetFileName = 'Importez le SpriteSheet...';
  public spriteSheetFiles: File[] = new Array<File>();

  // Injection of services
  public constructor(
    public canvaManagerService: CanvaManagerService,
    public animationDataService: AnimationDataService
  ) {
  }

  // After canvas is initiated
  public ngAfterViewInit() {
    // Creating app from Canvas
    this.app = new PIXI.Application(975, 975, { view: this.canvas.nativeElement, backgroundColor: 0X000000 });
    this.app.view.id = 'canvas';
    this.canvaManagerService.setStage(this.app.stage);

    // Initialization
    this.animationDataService.animationData = new AnimationData();
  }

  // Update Json Object
  public UpdateJson(): void {
    this.json = this.animationDataService.getJson();
  }

  // Update the Canvas Object
  public updateCanvas(): void {
    this.canvaManagerService.update();
  }

  // Updates every visible end component
  public UpdateAll(): void {
    this.UpdateJson();
    this.updateCanvas();
  }

  // Function called when SpriteSheetInput changed is called
  public setSpriteSheetFile(): void {
    let file: File;
    // Loading the file
    this.spriteSheetFiles = this.spriteSheetInput.nativeElement['files'];
    file = this.spriteSheetFiles[0];

    // Reading the file
    this.animationDataService.animationData.spritesheet = this.getFileImageContent(file, function (event: any): any {
      this.canvaManagerService.setSpriteSheet(event.target.result);
      console.log(this.canvaManagerService.image);
    });
    this.spriteSheetFileName = this.animationDataService.animationData.spritesheet;
    this.animationDataService.initialize(this.spriteSheetFileName);
  }

  // Function called when JsonInput changed is called
  public setJsonFile(): void {
    let file: File;
    this.jsonFiles = this.jsonInput.nativeElement['files'];
    file = this.jsonFiles[0];
    this.jsonFileName = this.getFileTextContent(file, function (event: any): any {
      this.animationDataService.animationData = JSON.parse(event.target.result);
      this.UpdateAll();
    });
  }

  public getFileNameFromPath(file: File): string {
    return file.name.split('.')[0];
  }

  /*
  ** Reads the content of an Image file
  ** RETURN : the name of the File
  ** file : The File to read
  ** callback : the callback to call when the file has been read
  ** NOTE : event.target.result contains the file content
  */
  public getFileImageContent(file: File, callback: (event: any) => any): string {
    try {
      let fileReader: FileReader;
      fileReader = new FileReader();
      fileReader.onload = callback.bind(this);
      fileReader.readAsDataURL(file);
      return file.name;
    } catch (e) {
      console.log('no valid File');
    }
    return file.name ? file.name : this.spriteSheetFileName;
  }

  /*
** Reads the content of a Text file
** RETURN : the name of the File
** file : The File to read
** callback : the callback to call when the file has been read
** NOTE : event.target.result contains the file content
*/
  public getFileTextContent(file: File, callback: (event: any) => any): string {
    try {
      let fileReader: FileReader;
      fileReader = new FileReader();
      fileReader.onload = callback.bind(this);
      fileReader.readAsText(file);
    } catch (e) {
      console.log('no valid File');
    }
    return file.name ? file.name :  this.jsonFileName;
  }

  public isJsonLoaded(): boolean {
    return this.jsonFiles.length > 0;
  }

  public isSpriteSheetLoaded(): boolean {
    return this.spriteSheetFiles.length > 0;
  }

  public log(object: any) {
    console.log(object);
  }

  public click(object: any) {
    if (object.id === 'spriteSheetInput' || object.id === 'spriteSheetInputButton') {
      if (this.isSpriteSheetLoaded()) {
        if (confirm('Attention, un SpriteSheet est déjà chargé.\nÊtes-vous sûr de vouloir ouvrir un nouveau SpriteSheet ?')) {
          object.click();
        }
      } else {
        object.click();
      }
    }
    if (object.id === 'jsonInput' || object.id === 'jsonInputButton') {
      if (this.isJsonLoaded()) {
        if (confirm('Attention, un Json est déjà chargé.\nÊtes-vous sûr de vouloir ouvrir un nouveau Json ?')) {
          object.click();
        }
      } else {
        object.click();
      }
    }
  }

  // Testing for Canvas
  public testCanvas(): void {
    for (let i = 0; i < 10; i++) {
      const g = new PIXI.Graphics();
      g.beginFill(0xFF0000);
      g.drawRect(i * 100, i * 100, 100, 100);
      g.endFill();
      this.app.stage.addChild(g);
    }
  }
}
