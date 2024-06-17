export class UserDto {
  id!: number;
  firstName!: string;
  lastName!: string;
  username!: string;
  email!: string;
  role!: string;
}

export class GetUserDto {
  users!: UserDto[];
  firstName!: string;
  lastName!: string;
}

export {};
