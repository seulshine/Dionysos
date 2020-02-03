package com.ssafy.wine.advice;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ssafy.wine.advice.exception.CAuthenticationEntryPointException;
import com.ssafy.wine.advice.exception.CEmailSigninFailedException;
import com.ssafy.wine.advice.exception.CUserNotFoundException;
import com.ssafy.wine.handler.CommonResult;
import com.ssafy.wine.service.ResponseService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {

	private final ResponseService responseService;

	private final MessageSource messageSource;

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	protected CommonResult defaultException(HttpServletRequest request, Exception e) {
		// 예외 처리의 메시지를 MessageSource에서 가져오도록 수정
		return responseService.getFailResult(Integer.valueOf(getMessage("unKnown.code")), getMessage("unKnown.msg"));
	}

	@ExceptionHandler(CUserNotFoundException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	protected CommonResult userNotFoundException(HttpServletRequest request, CUserNotFoundException e) {
		// 예외 처리의 메시지를 MessageSource에서 가져오도록 수정
		return responseService.getFailResult(Integer.valueOf(getMessage("userNotFound.code")),
				getMessage("userNotFound.msg"));
	}

	@ExceptionHandler(CEmailSigninFailedException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	protected CommonResult emailSigninFailed(HttpServletRequest request, CEmailSigninFailedException e) {
		return responseService.getFailResult(Integer.valueOf(getMessage("emailSigninFailed.code")),
				getMessage("emailSigninFailed.msg"));
	}

	@ExceptionHandler(CAuthenticationEntryPointException.class)
	public CommonResult authenticationEntryPointException(HttpServletRequest request,
			CAuthenticationEntryPointException e) {
		return responseService.getFailResult(Integer.valueOf(getMessage("entryPointException.code")),
				getMessage("entryPointException.msg"));
	}

	// code정보에 해당하는 메시지를 조회합니다.
	private String getMessage(String code) {
		return getMessage(code, null);
	}

	// code정보, 추가 argument로 현재 locale에 맞는 메시지를 조회합니다.
	private String getMessage(String code, Object[] args) {
		return messageSource.getMessage(code, args, LocaleContextHolder.getLocale());
	}
}