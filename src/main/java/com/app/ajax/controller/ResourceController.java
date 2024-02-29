package com.app.ajax.controller;

import com.app.ajax.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;

@RestController
public class ResourceController {
    @Autowired
    private ResourceService resourceService;

    @GetMapping("/pages/{name}")
    public String getHtmlPage(@PathVariable String name) throws IOException {
        return resourceService.getHtmlFromFile(name);
    }
}
