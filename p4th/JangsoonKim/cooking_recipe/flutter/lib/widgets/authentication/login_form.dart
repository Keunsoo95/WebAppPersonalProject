import 'package:demo/screens/signup_screen.dart';
import 'package:demo/screens/home_screen.dart';
import 'package:demo/widgets/authentication/background.dart';
import 'package:demo/widgets/authentication/rounded_id_field.dart';
import 'package:demo/widgets/authentication/rounded_password_field.dart';
import 'package:demo/widgets/authentication/sns_icon.dart';
import 'package:demo/widgets/authentication/social_login_divider.dart';
import 'package:flutter/material.dart';

import '../../utilities/spring_api.dart';
import '../../widgets/rounded_button.dart';

class LoginForm extends StatefulWidget {


  LoginForm({Key? key}) : super(key: key);

  @override
  State<LoginForm> createState() => LoginFormState();
}

class LoginFormState extends State<LoginForm> {
  String email = '';
  String nickname = '';
  String password = '';

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Background(
        child: Form(
          key: _formKey,
          child: ListView(
            children: [Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
            const Text(
              "로그인",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
            ),
            Image.asset(
              "assets/images/signin/signin_screen3.png",
              height: size.height * 0.3,
            ),
            SizedBox(
              height: size.height * 0.03,
            ),
            RoundedIdField(
              hinText: "이메일 아이디",
              onChanged: (value) {},
            ),
            RoundedPasswordField(
              onChanged: (value) {},
              hinText: "비밀번호",
            ),
            SizedBox(height: size.height * 0.03,),
            RoundedButton(
              text: "로그인",
              onPressed: () {
                if  (_formKey.currentState!.validate()){
                  SpringApi().login(UserLoginRequest(email, password));
                  UserLoginResponse? response;
                  print(response?.success);

                  if(response?.success == true){

                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (context){
                      return HomeScreen();
                    })
                  );}
                  else{
                    print("로그인실패");
                  }
                }
              },
              color: Colors.orange,
              textColor: Colors.white,
            ),
            SizedBox(
              height: size.height * 0.03,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const Text(
                  "아직 회원이 아니신가요 ? ",
                  style: TextStyle(color: Colors.black54),
                ),
                GestureDetector(
                  onTap: () {
                    Navigator.push(context, MaterialPageRoute(builder: (context) {
                      return SignupScreen();
                    }));
                  },
                  child: const Text(
                    "이메일 회원가입",
                    style:
                        TextStyle(color: Colors.black, fontWeight: FontWeight.w600),
                  ),
                )
              ],
            ),
            SocialLoginDivider(),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                SnsIcon(
                  iconSrc: "assets/icons/sns/naver_login_btn1.png",
                  press: () {},
                ),
                SnsIcon(
                  iconSrc: "assets/icons/sns/apple_login_btn1.png",
                  press: () {},
                )
              ],
            ),
      ],
    ),]
          ),
        ));
  }
}




