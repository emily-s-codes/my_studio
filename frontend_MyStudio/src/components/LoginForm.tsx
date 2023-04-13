import { useState } from "react";

const LoginForm = () => {
    const [userExists, setUserExists] = useState(false)
    return (<section>
        <h2>{userExists ? "log in here" : 'create your account'}</h2>
        <section className="inputs">
            {!userExists && <input type="text" placeholder='first' />}
            {!userExists && <input type="text" placeholder='last' />}
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="submit" value={userExists ? "login" : 'register'} />
        </section>
        <h3 onClick={() => setUserExists(prev => !prev)}>{userExists ? "Click here to register a new account" : 'Already have an account? Click to Log In'}</h3>
    </section>);
}

export default LoginForm;