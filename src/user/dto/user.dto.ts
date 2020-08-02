export interface UserDto {
  readonly id: string;
  readonly firstName: string;
  readonly lastName?: string;
  readonly avatar?: string;
  readonly phone: string;
}
