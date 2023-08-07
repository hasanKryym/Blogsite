const localhost = 'http://localhost:5000/api/v1';
const cyclichost = 'https://blogsitee.cyclic.app/api/v1';

export const checkAuth = async (token) => {
  try {
    if (token) {
      const response = await fetch(`${cyclichost}/auth`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const parseRes = await response.json();

      if (parseRes === 'Not Authorize') {
        return false;
      } else if (parseRes === true) {
        return true;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.message);
  }
};

// module.exports = async (token) => {
//   try {
//     if (token) {
//       const response = await fetch(`${cyclichost}/auth`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const parseRes = await response.json();

//       if (parseRes === 'Not Authorize') {
//         return false;
//       } else if (parseRes === true) {
//         return true;
//       }
//     } else {
//       return false;
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// };
