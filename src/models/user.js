export default class User {
  constructor(
    userName,
    password,
    email,
    gender,
    address,
    fullName,
    phoneNumber,
    avatar
  ) {
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.gender = gender;
    this.address = address;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.avatar = avatar;
  }
}
