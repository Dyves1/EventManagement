function isAdmin() {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');

    if (token) {
        try {
            // Decode the token (assuming it's a JWT token)
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            // Check if the decoded token indicates that the user is an admin
            return decodedToken.role === 'admin';
        } catch (error) {
            console.error('Error decoding token:', error);
            return false;
        }
    } else {
        // If token doesn't exist, user is not admin
        return false;
    }
}
export default isAdmin