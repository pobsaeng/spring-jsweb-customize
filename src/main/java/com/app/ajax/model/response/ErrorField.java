package com.app.ajax.model.response;

import lombok.Data;

@Data
public class ErrorField {
    private String name;
    private String message;

    public ErrorField(String message) {
        this.message = message;
    }
}