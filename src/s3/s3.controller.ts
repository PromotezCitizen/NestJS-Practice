import { BadRequestException, Controller, Get, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { S3Service } from './s3.service';
import { SkipAuth } from 'src/common/auth.metadata';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

@Controller('s3')
export class S3Controller {
  private readonly s3: AWS.S3;
  private readonly bucketName: string;

  constructor(private readonly s3Service: S3Service) {
    // AWS.config.update({
    //   region: process.env.AWS_REGION,
    //   credentials: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY,
    //     secretAccessKey: process.env.AWS_SECRET_KEY,
    //   },
    // });
    this.bucketName = process.env.S3_BUCKET;
    this.s3 = new AWS.S3({            
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_ACCESS_SECRET
      }
    });
  }

  @SkipAuth()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const key = `${Date.now().toString()}_${file.originalname}`;
    console.log(file);
    if (!file.buffer) {
      throw new Error('File Content is empty');
    }
    try {
      const s3Object = await this.s3.putObject({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        // ACL: 'public-read',
        ContentType: file.mimetype,
      }).promise();
      return s3Object;
    } catch (err) {
      throw new BadRequestException(`File upload failed: ${err}`);
    }
  }

  @SkipAuth() // 토큰 인증을 스킵함
  @Get()
  async downloadFile(@Query('file') fileKey: string, @Res() res) {
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
    };
    const file = await this.s3.getObject(params).promise();

    if (file) {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${fileKey.split('-')[1]}"`);
      res.send(file.Body);
    } else {
      res.status(404).send('File Not Found');
    }
  }
}
