import jwt from 'jsonwebtoken';
import { getCookie, getToken } from '../UTILS/cookies.js';

// checkIsLoggedIn.js
const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { 
      userId: decoded.userId,
      userRole: decoded.isAdmin 
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'You are not logged in please' });
  }
};

export default isAuthenticated;





// const checkIsLoggedIn = (req, res, next) => {
//   try {
//     const cookie = getCookie(req);
//     // CHECK IF COOKIE EXISTS
//     if (!cookie) {
//       return res
//         .status(401)
//         .send({ message: 'Please log in to perform this action' });
//     }
//     // GET TOKEN FROM COOKIE
//     const token = getToken(req);
//     // IF NOT TOKEN IS FOUND
//     if (!token) {
//       return res
//         .status(400)
//         .send({ message: 'Could not verify your authentication' });
//     }
//     // GET USER ID AND ROLE FROM TOKEN
//     const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

//     // RETURN USER ID AND ROLE
//     res.locals = { id, role };
//     // PROCEED IF USER IS ADMIN
//     next();
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// export default checkIsLoggedIn;


// exports.isAuthenticated = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userData = { 
//       userId: decoded.userId,
//       userRole: decoded.userRole 
//     };
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'You are not logged in please' });
//   }
// };


// const isAuthenticated = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userData = { 
//       userId: decoded.userId,
//       userRole: decoded.userRole 
//     };
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'You are not logged in please' });
//   }
// };


// // const isAdmin = (req, res, next) => {
// //   if (req.userData && req.userData.userRole === 'admin') { 
// //     next();
// //   } else {
// //     return res.status(403).json({ message: 'Unauthorized access' });
// //   }
// // };
// export default {isAuthenticated
//   // isAdmin
// }