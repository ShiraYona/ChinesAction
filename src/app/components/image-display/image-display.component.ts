import { Component, OnInit } from '@angular/core';
import { UserImageModel } from '../../domain/user-image.model';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnInit {

  imageSrc: string;
  imageList: UserImageModel[];
  isLoaded: boolean = false;
  selectedIndex: number;
  constructor(private imageSrv: ImageService) { }

  ngOnInit() {
    this.loadUserImagesList();
    this.imageSrv.reloadFlag$.subscribe(res => {
      if (res)
        this.loadUserImagesList();
    })
  }

  loadUserImagesList() {
    this.imageSrv.getImagesForUser().subscribe((res: UserImageModel[]) => {
      this.imageList = res;
      if (this.imageList.length > 0) {
        this.createImgPath(0);
        this.imageSrv.setReloadFlag(false);
        this.isLoaded = true;
      }
    });
  }

  createImgPath(selectedIndex: number) {
    this.selectedIndex = selectedIndex;
    this.imageSrc = this.imageList[selectedIndex].imageFullPath;
  }

}
