package com.app.ajax.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.app.ajax.util.Constant.FILE_FOLDER;

@Log4j2
@Service
public class FileService {
    public String uploadFile(MultipartFile[] files) {
        if (files == null) {
            log.error("Not found files for uploading");
            throw new RuntimeException("Not found files for uploading");
        }
        String fileNames = Arrays.stream(files).map(MultipartFile::getOriginalFilename).collect(Collectors.joining(","));
        log.info("[uploadfile] file names : [{}]", fileNames);

        String folderNme = FILE_FOLDER;
        final Path root = Paths.get(folderNme);
        try {
            if (Files.notExists(root)) {
                Files.createDirectory(root);
                log.info("Folder {} has been created", folderNme);
            }

        } catch (IOException e) {
            e.printStackTrace();
            log.error("Could not initialize folder for " + folderNme);
            throw new RuntimeException("Could not initialize folder for " + folderNme);
        }

        try {
            verifyFileUpload(files);
            //Copy files to folder
            for (MultipartFile file : files) {
                Files.copy(file.getInputStream(), root.resolve(file.getOriginalFilename()));
            }

            return "File uploaded successfully. List all file names [" + fileNames + "]";

        } catch (Exception e) {
            e.printStackTrace();
            log.error("Upload file error : " + e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    private void verifyFileUpload(MultipartFile[] files) {
        var existingFiles = getExistingFilenames(files);
        if (existingFiles.size() > 0) {
            String strList = existingFiles.stream().collect(Collectors.joining(","));
            throw new RuntimeException("File `" + strList + "` have already in the server");
        }
    }

    private List<String> getExistingFilenames(MultipartFile[] files) {
        List<String> existFilenames = new ArrayList<>();

        var AllFilenames = getFilenameByFilter(FILE_FOLDER, null);
        for (int i = 0; i < files.length; i++) {
            String originFilename = files[i].getOriginalFilename();

            for (String allFilename : AllFilenames) {
                if (allFilename.equalsIgnoreCase(originFilename)) {
                    existFilenames.add(allFilename);
                }
            }
        }

        return existFilenames;
    }

    private List<String> getFilenameByFilter(String fileStorage, String extensionName) {
        File file = new File(fileStorage);
        if (!file.exists()) {
            log.info("Not found file folder {}", fileStorage);
        }

        File[] files = file.listFiles();
        if (files == null) {
            log.info("Not found files on folder {}", fileStorage);
            throw new RuntimeException("Not found files on folder " + fileStorage);
        }

        List<String> fileList = new ArrayList();
        for (int i = 0; i < files.length; i++) {
            if (files[i].isFile()) {
                String fileName = files[i].getName();
                int dot = fileName.lastIndexOf(".");

                if (extensionName == null || extensionName.isEmpty()) {
                    String tableName = files[i].getAbsoluteFile().getName();
                    fileList.add(tableName);
                } else {
                    String extension = fileName.substring(dot);
                    if (extensionName.equalsIgnoreCase(extension)) {
                        String tableName = files[i].getAbsoluteFile().getName();
                        fileList.add(tableName);
                    }
                }

            }
        }

        return fileList;
    }
}
