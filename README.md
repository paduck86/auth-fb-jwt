# auth-fb-jwt
authenticate facebook access-token and exchange for jwt token.



[2015.12.20]
Nodejs 페이스북 SSO 로그인 인증 구현

[로직]
 1) 클라이언트에서 페이스북 access-token 을 받는다.

 2) 서버로 로그인한다.
    <선택1> 
    - 내용 : 서버로 email 을 넘겨주면, passport-custom 으로 인증. (email 을 사용자의 키값으로 함.)
    - method : POST
    - url : http://host-domain/auth/login
    - parameter : req.body.email
    
    <선택2>
    - 내용 : 서버로 access-token 을 넘겨주면, passport-facebook-token 으로 인증.
             단, clientID 를 client와 맞춰주어야 함. ( 아직 테스트 못함.. )
    - method : POST
    - url : http://host-domain/auth/facebooklogin
    - parameter : req.body.access_token

    <선택3>
    - 내용 : 서버로 access-token 을 넘겨주면, 
             'http://graph.facebook.com/me?access_token=<ACCESS_TOKEN>' 에서 인증.
    - method : POST
    - url : http://host-domain/auth/facebooklogin2
    - parameter : req.body.access_token

3) passport 인증 후, jwt 토큰을 발급한다. ( <선택3> passport 제외 )
    - 내용 : /api/* endpoint 에서 jwt 인증 체크함.
    Example)
    - method : GET
    - url : http://host-domain/api/users
    - parameter : req.headers['x-access-token']   


* POSTMAN share api url
https://www.getpostman.com/collections/75c077cf73d0b017136f
