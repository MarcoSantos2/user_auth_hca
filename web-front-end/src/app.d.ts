/**
 * Google Credential Response.
 */
interface CredentialResponse {
    /**
     * the ID token as a base64-encoded JSON Web Token (JWT) string.
     */
    credential: string;

    /**
     * This field sets how the credential is selected.
     */
    select_by: string;
}
