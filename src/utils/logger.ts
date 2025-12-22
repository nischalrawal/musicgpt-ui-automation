import winston from 'winston';
import path from 'path';

// Define your severity levels.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.ENVIRONMENT || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define different colors for each level.
// Colors make the log message more visible on the console.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// color based on serverity levels
winston.addColors(colors);

const format = winston.format.combine(
  // preferred format for the timestamps
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // colored logs
  winston.format.colorize({ all: true }),
  // Format of message
  winston.format.printf( (info) => { 
    return `${info.timestamp} ${info.level}: ${info.message}` ;
}),
);

const transports = [
  // 
  new winston.transports.Console(),
  
  // print only the error logs
  new winston.transports.File({
    filename: path.join(__dirname, '../../reports/logs/error.log'),
    level: 'error',
    format: winston.format.combine(
        winston.format.uncolorize(), // Clean logs for files (no color codes)
        winston.format.json() // JSON format is better for file parsing tools
    ) 
  }),
  
  // print logs of all severity levels
   new winston.transports.File({
    filename: path.join(__dirname, '../../reports/logs/all.log'),
    format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json() 
    )
  }),
];

// Create the logger instance that has to be exported
// and used to log messages.
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;