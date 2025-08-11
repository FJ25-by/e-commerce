const User = require('../models/user');

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).render('register', { error: 'Username sudah digunakan' });
        }

        const user = new User({ username, password, email });
        await user.save();

        req.session.user = user;
        req.session.userId = user._id;

        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).render('register', { error: 'Gagal mendaftar' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).render('login', { error: 'Data tidak ditemukan', message: null });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).render('login', { error: 'Username atau password salah', message: null });
        }

        req.session.user = user;
        req.session.userId = user._id;

        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).render('login', { error: 'Terjadi kesalahan saat login', message: null });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/auth/login?message=Berhasil logout');
    });
};
