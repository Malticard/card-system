
export interface UserModel {
    _id: string;
    name: string;
    email: string;
    picture: string;
    password: string;
    type: number;
    __v: number;
}


// Converts JSON strings to/from your types
export class AuthenticatedUserModelConvert {
    public static toAuthenticatedUserModel(json: string): UserModel {
        return JSON.parse(json);
    }

    public static authenticatedUserModelToJson(value: UserModel): string {
        return JSON.stringify(value);
    }
}
