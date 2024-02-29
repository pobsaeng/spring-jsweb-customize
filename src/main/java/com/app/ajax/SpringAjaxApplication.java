package com.app.ajax;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.awt.*;
import java.net.URI;

@SpringBootApplication
public class SpringAjaxApplication implements CommandLineRunner {
    public static void main(String[] args) {
        SpringApplication.run(SpringAjaxApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {
        System.out.println("Open your browser and go to : http://localhost:8080");
    }
}
