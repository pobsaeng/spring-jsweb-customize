package com.app.ajax.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

@Service
public class ResourceService {
    @Autowired
    ResourceLoader resourceLoader;

    public String getHtmlFromFile(String name) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:templates/" + name);
        InputStream input = resource.getInputStream();

        StringBuilder sb = new StringBuilder();
        try (Reader reader = new BufferedReader(new InputStreamReader
                (input, Charset.forName(StandardCharsets.UTF_8.name())))) {
            int c;
            while ((c = reader.read()) != -1) {
                sb.append((char) c);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return sb.toString();
        }
        return sb.toString();
    }
}
