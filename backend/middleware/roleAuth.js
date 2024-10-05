const roleAuth = (requiredRole) => (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== requiredRole) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Error checking role', error: err.message });
    }
};

module.exports = roleAuth;
