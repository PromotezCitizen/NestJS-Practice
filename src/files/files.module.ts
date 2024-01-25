import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilesController } from './files.controller';

import * as fs from 'fs';

@Module({
    controllers: [FilesController],
    imports: [
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                storage: diskStorage({
                    destination: (req, file, cb) => {
                        const dest = './static/upload'

                        if (!fs.existsSync(dest)) {
                            fs.mkdirSync(dest, {recursive: true})
                        }

                        cb(null, dest);
                    },
                    filename: (req, file, cb) => {
                        const randNum = Array(8)
                                .fill(null)
                                .map( () => Math.round(Math.random() * 16).toString(16) )
                                .join('');
                        cb(null, `${file.originalname}-${randNum}`)
                    }
                })
            })
        })
    ]
})
export class FilesModule {}
