package com.app.ajax.util;

import com.app.ajax.model.response.WrapperResponse;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.util.List;

@ControllerAdvice
public class CustomResponseBodyAdvise implements ResponseBodyAdvice<Object> {
    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        String className = returnType.getContainingClass().toString();
//        String methodName = returnType.getMethod().toString();
        if (className.contains("ResourceController")) {
            return false;
        }
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
                                  Class<? extends HttpMessageConverter<?>> selectedConverterType,
                                  ServerHttpRequest request, ServerHttpResponse response) {

        if (returnType.getContainingClass().isAnnotationPresent(RestController.class)) {
            if (body instanceof List) {
                return new WrapperResponse<>((List<Object>) body);
            } else if (body instanceof Object) {
                return new WrapperResponse(body);
            }
        }
        return body;
    }
}