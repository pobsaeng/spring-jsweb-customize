package com.app.ajax.controller;

import com.app.ajax.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {
    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public String multipleFileUpload(@RequestParam(name = "files", required = false) MultipartFile[] files) {
        return fileService.uploadFile(files);
    }
}
