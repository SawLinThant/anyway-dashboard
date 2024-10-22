import LoginCard from "../modules/account/login";


const Login = ({setIsLogin}) => {
    return(
        <div className="w-full h-full flex items-center justify-center">
            <LoginCard setIsLogin={setIsLogin}/>
        </div>
    )
}
export default Login;