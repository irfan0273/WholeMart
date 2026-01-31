import jwt from 'jsonwebtoken';

const auth = async (request, response, next) => {
    try {
        const token = request.cookies.accesstoken || request.headers?.authorization?.split(" ")[1];

        if (!token) {
            return response.status(401).json({
                message: "Provide token",
                error: true,
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        console.log('Decoded token:', decoded); // Should contain { id: "...", iat, exp }

        if (!decoded?.id) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            });
        }

        request.userId = decoded.id; // ✅ Only store the user ID
        next();

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export default auth;
