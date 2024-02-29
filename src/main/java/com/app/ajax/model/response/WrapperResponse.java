package com.app.ajax.model.response;

import lombok.Data;

import java.util.List;

@Data
public class WrapperResponse<T> {
    private boolean success;
    private T data;
    private List<ErrorField> errors;

    public WrapperResponse(T data) {
        this.success = true;
        this.data = data;
        this.errors = null;
    }

    public WrapperResponse(List<ErrorField> errors) {
        this.success = false;
        this.data = null;
        this.errors = errors;
    }
}