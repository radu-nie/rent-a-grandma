// Import only what we need from express
import { Router, Request, Response } from 'express';

// Assign router to the express.Router() instance
const fileRouter: Router = Router();
const fs = require('fs');
const walk = require('walk');
const jwt = require('jsonwebtoken');
const config = require('config');
//const userRouter = express.Router();


/** Get all documents in storage folder */
fileRouter.get('/getDocuments', (req, res, next) => {

    readFiles('storage', (data: any) => {
        console.log('All documents read!');
        res.json(data);

        // res.writeHead(404, {
        //     'Content-Type': 'text/html'
        // });
        // return res.end("404 Not Found" + err);
    })
})
/** Reads filename sent as query string ?filename= */
fileRouter.get('/read', (req, res, next) => {
    fs.readFile(('storage/' + req.query.filename + '.html' || 'demofile.html'), function (err: Error, data: any) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            return res.end("404 Not Found");
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        return res.end();
    });
});

/** Writes file with static content and query string ?filename= */
fileRouter.get('/write', (req, res, next) => {
    fs.appendFile(('storage/' + req.query.filename + '.html' || 'newFile.html'), `<html><head></head><body><img src="https://www.forbes.ro/wp-content/uploads/2017/05/Softelligence_Engineering_11-525x350.jpg"></body></html>`, function (err: Error) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            return res.end("404 Not Found");
        }
        console.log('Saved!');
        res.json({
            statusMessage: 'File ' + req.query.filename + ' Saved'
        });
    });
});

/** Deletes file using querystring ?=filename */
fileRouter.get('/delete', (req, res, next) => {
    fs.unlink(('storage/' + req.query.filename + '.html'), function (err: Error) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            return res.end("404 Not Found");
        }
        console.log('File deleted!');
        res.json({
            statusMessage: 'File ' + req.query.filename + ' Deleted'
        })
    });
})

/** function helper for reading all files in directory */
function readFiles(path: any, onFileContent: any) {
    let files: any = [];

    // Walker options
    var walker = walk.walk(path, { followLinks: true });

    walker.on('file', function (root: any, stat: any, next: any) {
        // Add this file to the list of files


        files.push(stat.name);
        next();
    });

    walker.on('directory', function (root: any, stat: any, next: any) {
        // Add this file to the list of files

        files.push(stat.name);
        next();
    });

    walker.on('end', function () {
        console.log(files);
        onFileContent(files);
    });

    // return new Promise(function (resolve, reject) {
    //     fs.readdir(path, function (error, result) {
    //       if (error) {
    //         reject(error);
    //       } else {
    //         resolve(result);
    //       }
    //     });
    //   });

    // fs.readdir(dirname, function (err, filenames) {
    //     var files = [];
    //     if (err) {
    //         onError(err);
    //         return;
    //     }
    //     if(filenames.length == 0) {
    //         onError("No Files")
    //         return
    //     }
    //     filenames.forEach(function (filename) {
    //         fs.readFile(dirname + filename, 'utf-8', function (err, content) {
    //             if (err) {
    //                 onError(err);
    //                 return;
    //             }
    //             files.push({filename, content})
    //         });
    //     });

    //     onFileContent(files);
    // });
}

export { fileRouter };