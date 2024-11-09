

const createUser = async (req, res) => {
    res.send('Hello New User');
}

const loginUser = async (req, res) => {
    res.send('Hello Login User');
}


module.exports = {
    createUser,
    loginUser
}