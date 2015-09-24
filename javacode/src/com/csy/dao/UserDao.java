package com.csy.dao;

import com.csy.bean.User;

public interface UserDao {

	 /**
	  *  根据用户账号信息取得用户
	  *  @author WG
	  *  @return
	  */
	 public User getUser(String username);
	 
	
}
