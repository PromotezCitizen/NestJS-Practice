import { BadRequestException, CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";

import * as fs from 'fs';
import { join } from "path";

@Injectable()
export class FileExistGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const filename = req.query.file;
        const filepath = './static/upload';

        try {
            const files = await fs.promises.readdir(filepath);
            const fileExists = files.some( file => file.startsWith(filename) );
            const filteredFiles = files.filter( (fileName) => 
                fileName.startsWith(filename)
            );

            if (!fileExists) {
                throw new BadRequestException('Error reading file');
            }

            req.filenameRequest = filteredFiles;
            return true;
        } catch (err) {
            throw new NotFoundException('Error reading directory');
        }
    }
    
}