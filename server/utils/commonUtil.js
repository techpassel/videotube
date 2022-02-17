const generateFileName = (req, file) => {
    const nameSplit = file.originalname.split('.')
    const extension = nameSplit.length > 1 ? nameSplit[nameSplit.length - 1] : 'txt';
    const fieldName = file.fieldname && file.fieldname != "file" && file.fieldname != "files" ? file.fieldname + '-' : '';
    return req.user.firstName.toLowerCase() + '-' + Date.now() + '-' + fieldName + Math.round(Math.random() * 1E9) + "." + extension;
}

export {
    generateFileName
}