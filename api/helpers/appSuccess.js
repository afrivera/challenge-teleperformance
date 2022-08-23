const  appSuccess =  ({
    res, code = 200, status = true, message, body
}) => {
    res.status( code ).json({
        code,
        status,
        message,
        body
    })
}

module.exports = {
    appSuccess
};
