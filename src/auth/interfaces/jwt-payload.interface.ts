export interface JwtPayload {
  readonly sub: string,
  readonly first_name: string,
  readonly last_name?: string,
  readonly avatar?: string,
  readonly phone: string,
}
