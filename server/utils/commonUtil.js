const generateFileName = (req, file) => {
    const nameSplit = file.originalname.split(".")
    const extension = nameSplit[nameSplit.length - 1];
    return req.user.firstName + "-" + req.user._id.toString().slice(-6) + "-" + file.fieldname + '-' + Date.now() + Math.round(Math.random() * 1E9) + "." + extension;
}

export {
    generateFileName
}