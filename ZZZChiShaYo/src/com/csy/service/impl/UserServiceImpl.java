package com.csy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csy.bean.User;
import com.csy.dao.UserDao;
import com.csy.service.UserService;



@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public User getUserInfo(String username) throws Exception {
		return userDao.getUser(username);
	}


}
