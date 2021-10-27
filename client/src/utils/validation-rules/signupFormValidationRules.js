const validateSignup = (values) => {
    let errors = {};
    if(!values.firstName){
        errors.firstName = 'First name is required';
    } else {
        if(errors.firstName) delete errors.firstName;
    }   

    if(!values.lastName){
        errors.lastName = 'Last name is required';
    } else {
        if(errors.lastName) delete errors.lastName;
    }   

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

    if(!values.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required'
    } else if(values.password !== values.confirmPassword){
        errors.confirmPassword = 'Password and confirm password did not match'
    } else {
        if(errors.confirmPassword) delete errors.confirmPassword
    }

    return errors;
}

export default validateSignup;