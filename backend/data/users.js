import bcrypt from 'bcryptjs';

const users = [
  {
    firstName: 'Sayyed Abrar',
    lastName: 'Akhtar',
    image:
      'https://media-exp1.licdn.com/dms/image/C4E03AQH30OiH5aUPNQ/profile-displayphoto-shrink_200_200/0/1611382833109?e=1620259200&v=beta&t=zt4sz5OqreGYbLDh2QQAnsD5NN5q1HK4JSIZsCAlacg',
    contact: '+977-9821117484',
    email: 'akhtars10@uni.coventry.ac.uk',
    username: 'sayyed_abrar',
    password: bcrypt.hashSync('sayyed-abrar', 10),
    isAdmin: true,
  },
  {
    firstName: 'Ashok',
    lastName: 'Yadav',
    image: '/uploads/no-image.png',
    contact: '+977-9845852979',
    email: 'ak@gmail.com',
    username: 'ak_ydv',
    password: bcrypt.hashSync('ashok-yadav', 10),
  },
  {
    firstName: 'Anil',
    lastName: 'Gajurel',
    image: '/uploads/no-image.png',
    contact: '1234567890',
    email: 'anil@gmail.com',
    username: 'anil_gajurel',
    password: bcrypt.hashSync('anil-gajurel', 10),
  },
];

export default users;
