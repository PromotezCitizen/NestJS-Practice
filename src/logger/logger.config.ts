import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const loggerLevel = 'silly';

const loggerFormatter = winston.format.combine(
  winston.format.timestamp(),
  nestWinstonModuleUtilities.format.nestLike('MyApp', {
    prettyPrint: true,
  }),
)

const loggerSetting = {
  level: loggerLevel,
  format: loggerFormatter,
}

export const loggerConfig = {
  transports: [
    new winston.transports.Console(
      loggerSetting
    ),
    new DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      // maxFiles: '14d',
      ...loggerSetting
    }),
  ],
}
