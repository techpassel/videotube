const validateLogin = (values) => {
    let errors = {};
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid';
    } else {
        if(errors.email) delete errors.email
    }
    
    if(!values.password) {
        errors.password = 'Password is required'
    } else if(values.password.length < 6){
        errors.password = 'Password must contain atlest 6 digits'
    } else {
        if(errors.password) delete errors.password
    }
    return errors;
}

export default validateLogin;