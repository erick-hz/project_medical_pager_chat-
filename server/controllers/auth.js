const connect = require('getstream')
const bcrypt = require('bcryptjs');
const StreamChat = require('stream-chat')
const crypto = require('crypto');
const { log } = require('console');

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async () => {
    try {
        const { fullname, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);
        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })

    }
}
const login = async () => {
    try {
        const { username, password } = req.body;

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username });

        if (!users.length) return res.status(400).json({ message: 'User not found' })

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if (success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
        } 

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })


    }
}

module.exports = { login, signup }