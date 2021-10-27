import { useState } from 'react';

const useForm = (callback, validate) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setIsSubmitting(true);
        let err = validate(values);
        setErrors(err);
        if (Object.keys(err).length === 0) {
            callback();
        }
    };

    const handleChange = (event) => {
        event.persist();
        let val = {...values, [event.target.name]: event.target.value}
        setValues(val);
        if (isSubmitting) setErrors(validate(val));
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit
    }
};

export default useForm;