package com.csy.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.csy.bean.User;
import com.csy.service.UserService;


@Controller
public class UserController {

	@Autowired
	private UserService userService;


	/***
	 * �û���½
	 * <p>
	 * ע�����ã�ֻ����POST�ύ���÷���
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public ModelAndView login(String username, String password) {
		// ��֤���ݹ����Ĳ����Ƿ���ȷ�����򷵻ص���½ҳ�档
		if (this.checkParams(new String[] { username, password })) {
			try {
				User u = userService.getUserInfo(username);
				if(u.getPassword().equals(password)){
					// ָ��Ҫ���ص�ҳ��Ϊsucc.jsp
					ModelAndView mav = new ModelAndView("succ");
					// ���������ظ�ҳ��
					mav.addObject("username", username);
					mav.addObject("password", password);
					System.out.println("username=" + username + " password=" + password);
					return mav;
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		return new ModelAndView("home");
	}

	/***
	 * ��֤�����Ƿ�Ϊ��
	 * 
	 * @param params
	 * @return
	 */
	private boolean checkParams(String[] params) {
		for (String param : params) {
			if (param == "" || param == null || param.isEmpty()) {
				return false;
			}
		}
		return true;
	}
}