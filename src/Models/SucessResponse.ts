export class SuccessResponse<Type> {
    wasSuccess: boolean;
    successMessage?:string;
    data: Type;

    constructor(data:Type, message:string) {
        this.wasSuccess = true;
        this.data = data;
        this.successMessage = message;
    }

}