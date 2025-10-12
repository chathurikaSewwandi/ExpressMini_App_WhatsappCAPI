export interface LoginDto {
    email : string;
    password: string;
}
export interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
}