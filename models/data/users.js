let users = [
  {
    name: "Piyu",
    lastName: "Costa",
    role: "admin",
    photo:
      "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/07/26153138/MG_56961.jpg",
    age: 25,
    email: "piyu@gmail.com",
    password: "quierodormir",
    code: "739TX5R7",
    verified: true,
    logged: true,
  },
  {
    name: "Juan",
    lastName: "Franco",
    role: "admin",
    photo:
      "https://assets.afcdn.com/story/20141210/556486_w631h628cx315cy312.jpg",
    age: 25,
    email: "juan@gmail.com",
    password: "quecrack",
    code: "739TX5R7",
    verified: true,
    logged: true,
  },
  {
    name: "Paco",
    lastName: "Amoroso",
    role: "user",
    photo:
      "https://www.losandes.com.ar/resizer/LUkKUQCzMEfWjl4wBkarBByYu1U=/1023x1039/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/7BMKEOUD2FGURNBFUSJISVTTMI.jpg",
    age: 25,
    email: "paco@gmail.com",
    password: "amoroso",
    code: "739TX5R7",
    verified: true,
    logged: true,
  },
  {
    name: "Mauro",
    lastName: "Lombardo",
    role: "user",
    photo:
      "https://www.clarin.com/img/2022/05/19/duki-el-primer-artista-de___LVGEhW9hu_2000x1500__1.jpg",
    age: 25,
    email: "mauro@gmail.com",
    password: "duki",
    code: "739TX5R7",
    verified: true,
    logged: true,
  },
];

require("dotenv").config();
require("../../config/database");
const User = require("../User");

users.forEach((elemento) => {
  User.create({
    name: elemento.name,
    lastName: elemento.lastName,
    role: elemento.role,
    photo: elemento.photo,
    age: elemento.age,
    email: elemento.email,
    password: elemento.password,
    code: elemento.code,
    verified: elemento.verified,
    logged: elemento.logged,
  });
});
