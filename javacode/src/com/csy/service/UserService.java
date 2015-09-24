package com.csy.service;

import com.csy.bean.User;


public interface UserService {
	
	/**
	 * 取得用户信息
	 * 
	 * @author JLC
	 * @return User对象
	 * @throws Exception
	 */
	public User getUserInfo(String username) throws Exception;

}
