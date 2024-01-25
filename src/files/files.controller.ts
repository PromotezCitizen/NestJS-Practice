import { Controller, Get, Header, Param, Post, Query, Req, Res, StreamableFile, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { createReadStream } from "fs";
import { join } from "path";
import { Response } from "express";
import { FileExistGuard } from "./guards/fileexist.guard";
import { NoQueryGuard } from "./guards/noquery.guard";

@Controller("files")
export class FilesController {

    @Get()
    mainPage(): string {
        return "Hello File Uploader!"
    }

    @Post("upload-single")
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

    @Post("upload-multi")
    @UseInterceptors(FilesInterceptor('file'))
    uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
        files.forEach(element => {
            console.log(element)
        });
    }

    @Get("download")
    @UseGuards(NoQueryGuard, FileExistGuard)
    downloadFile(@Req() req, @Res() res: Response) {
        const file = req.filenameRequest;
        const filepath = `./static/upload/${file}`;
        const fileShowName = 'download';

        res.download(filepath, fileShowName, (err) => {
            if(err) {
                res.status(500).send('File download failed');
            }
        })
    }

}