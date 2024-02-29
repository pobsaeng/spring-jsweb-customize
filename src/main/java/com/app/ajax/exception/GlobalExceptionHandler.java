package com.app.ajax.exception;

import com.app.ajax.model.MapResponse;
import com.app.ajax.model.response.ErrorField;
import com.app.ajax.model.response.WrapperResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<ErrorField> errorFields = new ArrayList<>();
        errorFields.add(new ErrorField(ex.getMessage()));
        return buildResponseEntity(errorFields, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<ErrorField> errorFields = new ArrayList<>();
        errorFields.add(new ErrorField(ex.getMessage()));
        return buildResponseEntity(errorFields, HttpStatus.HTTP_VERSION_NOT_SUPPORTED);
    }

    @ExceptionHandler(NotFoundException.class)
    private ResponseEntity<Object> handleNotFoundException(NotFoundException ex) {
        List<ErrorField> errorFields = new ArrayList<>();
        errorFields.add(new ErrorField(ex.getMessage()));
        return buildResponseEntity(errorFields, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RuntimeException.class)
    private ResponseEntity<Object> handleRuntimeException(RuntimeException ex) {
        List<ErrorField> errorFields = new ArrayList<>();
        errorFields.add(new ErrorField(ex.getMessage()));
        return buildResponseEntity(errorFields, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Object> buildResponseEntity(List<ErrorField> errors, HttpStatus httpStatus) {
        return new ResponseEntity<>(new WrapperResponse(errors), httpStatus);
    }
}