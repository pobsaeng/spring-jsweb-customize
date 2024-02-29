package com.app.ajax.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MapResponse {
    private Object result;
    private String errorMsg;
    private List<Errors> errors;

    public MapResponse(Object body) {
        this.result = body;
        this.errorMsg = null;
        this.errors = null;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Errors {
        private int code;
        private String message;
    }
}