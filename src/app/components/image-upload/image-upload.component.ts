import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserImageModel } from '../../domain/user-image.model';
import { ImageService } from '../../services/image.service';
import { ImageSnippet } from '../../domain/image-snippet.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedFile: any;

  constructor(private imgService: ImageService) { }

  ngOnInit() {
  }
  imageSrc: string;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  //constructor(private http: HttpClient) { }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.selectedFile = new ImageSnippet(file, event.target.result);

        this.imageSrc = reader.result as string;

        this.myForm.patchValue({
          fileSource: reader.result.toString()
        });

      };

    }
  }

  submit() {
    console.log(this.myForm.value);
    let postImage = new UserImageModel();
    //postImage.fileName = this.myForm.value.file;
    //postImage.binaryData = this.myForm.value.fileSource;

    this.imgService.saveImage(this.selectedFile)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
        this.imgService.setReloadFlag(true);
      },
        error => {
          let errorMsg: string;
          //if (error.error instanceof ErrorEvent) {
          //  errorMsg = `שגיאה בשמירת תמונה: ${error.error.message}`;
          //} else {
          //  errorMsg = this.getServerErrorMessage(error);
          //}
          alert(error.error)
        });
  }
  //private getServerErrorMessage(error: HttpErrorResponse): string {
  //  switch (error.status) {
  //    case 404: {
  //      return `Not Found: ${error.message}`;
  //    }
  //    case 403: {
  //      return `Access Denied: ${error.message}`;
  //    }
  //    case 500: {
  //      return `Internal Server Error: ${error.message}`;
  //    }
  //    default: {
  //      return `Unknown Server Error: ${error.message}`;
  //    }

  //  }
  //}
}
