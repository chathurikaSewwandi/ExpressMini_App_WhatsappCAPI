export interface webhookVerificationDto {

    mode: string;
    challenge: string;
    verify_token: string;

}

export interface webhookVerificationResponsDto{
    status: Boolean;
    challenge: string;
}