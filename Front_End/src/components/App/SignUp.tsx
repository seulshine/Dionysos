import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux';
import { register } from '../../../stores/register/actions/register';
import { registerService } from '../../../stores/register/services/register';


import K from 'react-kakao-login';
const KakaoLogin: any = K;

import GoogleLogin from 'react-google-login';




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  check: {
    marginLeft : '38%',
    margin: theme.spacing(3, 0, 2),
  },
  font : {
    color : 'black'
  }
}),
);



interface IProps {
  isRegisterPending: boolean;
  isRegisterSuccess: boolean;
  registerError: string;
  register?(nickname : string, email: string, password: string): void;
  dispatch: Function;
}

interface IState {
  nickname : string;
  email: string;
  password: string;
}




function SignUp() {
  const classes = useStyles();

  //  const [state, setState] = useState(nickname : state.RegistUser.nickname, );
  const [state, setState] = useState( {nickname : '', email : '', password : '', provider : '', id : ''});
  let alarm : string = '';
  // const [props, setProps] = useState({
  //   isRegisterPending: false,
  //   isRegisterSuccess: false,
  //   registerError: "not Yet",
  //   register?(nickname : string, email: string, password: string),
  //   dispatch: Function

  // });


  const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
     
    e.preventDefault();
    let { nickname, email, password } = state;

    console.log("hey");
    await registerService.register(nickname, email, password);

    console.log()
  
  }


    // Google Login
    const responseGoogle = async (res : any) =>
    {
        console.log("success")
        console.log(res);
        console.log(res.w3.ofa);
        console.log(res.googleId);
        setState({
            email : '',
            password : '',
            id: res.googleId,
            nickname : res.w3.ofa,
            provider: 'GOOGLE'
        })

        await registerService.SNSRegister(state.nickname, state.id, state.provider);
     
    }
    // Kakao Login
    const responseKakao = async (res : any) => {
        console.log(res);
        console.log(res.profile.id);
        console.log(res.profile.properties.nickname);
        setState({
            email : '',
            password : '',
            id: res.profile.id,
            nickname : res.profile.properties.nickname,
            provider: 'KAKAO'
        })


        await registerService.SNSRegister(state.nickname, state.id, state.provider);
 
    }

 
    // Login Fail
    const responseFail = (err : any) => {
        console.log("hey");
        console.log(err);
        console.error(err);
    }
    


  const emailCheck = async () => {
    let { email } = state;
    
    let flag = await registerService.emailCheck(email);

    if(!flag) { //중복된 이메일일 때
      alarm ='중복된 이메일입니다';
    } else { // 처음 가입하는 이메일
      alarm = '사용할 수 있는 이메일입니다';
    }

    console.log(alarm);
    console.log(flag);
  
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="nickname"
              name="nickname"
              autoComplete="nickname"
              autoFocus
              onChange={e => setState({ nickname: e.target.value, email : state.email, password : state.password, id : '', provider : ''})} 
              value={state.nickname}
            />
         
           
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={e => setState({ nickname: state.nickname, email : e.target.value, password : state.password , id : '', provider : ''})} 
              value={state.email}
            />
            <Button 
              variant="outlined"
              color="primary"
              className={classes.check}
              onClick={emailCheck}
            >
              Email 중복 체크
            </Button>
        
            <TextField
                  variant="outlined"
                  required
                  fullWidth
                  className={classes.font}
                  name="비밀번호"
                  label="비밀번호"
                  type="password"
                  id="password"
                  // value={password}
                  // onChange={handlePassword}
                  onChange={e => setState({ nickname: state.nickname, email : state.email, password : e.target.value, id : '', provider : ''})} 
                  value={state.password}
                  placeholder="영어 대/소문자, 숫자, @ 조합 6~20자"
                autoComplete="current-password"
                />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
        <div>

        <GoogleLogin
                    clientId="605769507433-205lj47uj46v02ucrpvbgpck6n2mmed6.apps.googleusercontent.com"
                    render={(props) => <button className="login100-social-item bg1" onClick={props.onClick}><i className="fa fa-google"></i></button>}
                    buttonText="Google"
                    onSuccess={responseGoogle}
                    onFailure={responseFail}
                    cookiePolicy={'single_host_origin'}
                />
               
              <KakaoLogin
                    jsKey="d507ecdb10512afbd7bfbf2d5a9f788a"
                    render={(props : any) => <button className="login100-social-item bg2" onClick={props.onClick}><i className="fa fa-kakao"></i></button>}
                    onSuccess={responseKakao}
                    onFailure={responseFail}
                    throughTalk={true} // If true, Open Kakao Talk instead of new browser tab
                    getProfile={true}
                />

        </div>
      </Grid>
    </Grid>
  );

  
}


// const mapStateToProps = (state : IProps ) => {
//   return {
//   isRegisterPending: state.isRegisterPending,
//   isRegisterSuccess: state.isRegisterSuccess,
//   registerError: state.registerError
//   };
// }
// store 안의 state 값을 props 로 연결해줍니다.
const mapStateToProps = (state : any) => {
  console.log(state);
  return {
    isRegisterPending: state.registerReducer.isRegisterPending,
    isRegisterSuccess: state.registerReducer.isRegisterSuccess,
    registerError: state.registerReducer.isRegisterError
  }
}

/* 
  액션 생성자를 사용하여 액션을 생성하고,
  해당 액션을 dispatch 하는 함수를 만들은 후, 이를 props 로 연결해줍니다.
*/




// const mapDispatchToProps = (dispatch : IProps ) => {
//   return {
//   isRegisterPending: dispatch.isRegisterPending,
//   isRegisterSuccess: dispatch.isRegisterSuccess,
//   registerError: dispatch.registerError
//   };
// }


export default connect(mapStateToProps)(SignUp);

// export default connect(
//   (state) => ({
//     email : state.RegisterUser.email,
    
//   }), 
//   (dispatch) => ({
//     increment: () => dispatch(counterActions.increment()),
//     decrement: () => dispatch(counterActions.decrement())
//   })
// )(CounterContainer);