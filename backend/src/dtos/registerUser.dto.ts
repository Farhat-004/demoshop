export class RegisterDto {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}
