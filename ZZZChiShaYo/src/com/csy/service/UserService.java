package com.csy.service;

import com.csy.bean.User;


public interface UserService {
	
	/**
	 * ȡ���û���Ϣ
	 * 
	 * @author JLC
	 * @return User����
	 * @throws Exception
	 */
	public User getUserInfo(String username) throws Exception;

}
