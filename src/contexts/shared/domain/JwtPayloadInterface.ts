export interface IJwtPayload
{
    customerId?: number,
    psychicId?: number,
    userId?: number,
    username: string,
    entityType: string,
    iat: number,
    exp: number
}