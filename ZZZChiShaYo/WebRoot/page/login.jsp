<i><%@page language="java" import="java.util.*" pageEncoding="gbk"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
System.out.println(basePath);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<title>Insert title here</title>
<link href="./">
</head>
<body>
	<form action="login.do" method="post">
		username:<input type="text" name="username">
		<p>
			password:<input type="password" name="password">
		</p><p>
			<input type="submit" value="submit">
	</p></form>
</body>
</html></i>