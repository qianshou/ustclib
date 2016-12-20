# ustclib
模拟登陆图书馆程序



# 模拟登陆过程说明

分别使用php语言和node.js语言进行了实现，模拟登陆的主要过程如下：



1. 获取目标登陆页验证码，并存储对应cookie。
2. 用户进入模拟登陆页面，输入用户名、密码以及验证码。
3. 将用户输入的表单内容和已存储的cookie值，向登陆验证页面发送请求。
4. 对第3步请求的返回数据判断HTTP状态码或关键字，进而判断是否登陆成功。
5. 登陆成功之后，再向用户详情页（登陆后才可查看）发送已存储的cookie值，获得详情数据。



# php程序运行

cd到php项目目录，然后执行

```shell
php -S localhost:8050
```

然后访问http://localhost:8050即可。



# Node.js程序运行

cd到node.js项目目录，然后执行

```
npm install && node index.js
```

然后访问http://localhost:3000即可。

