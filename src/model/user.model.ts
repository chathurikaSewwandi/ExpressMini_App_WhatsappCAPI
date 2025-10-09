import mongoose from "mongoose";

export enum UserType {
    CUSTOMER = 'customer',
    ADMIN = 'admin'
}
export  interface IUser{

    _id?: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    type: UserType;
    createdAt?: Date;
    updatedAt?: Date;
}
export const UserSchema =  new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: { type: String, required: true,unique: true },
        password: { type: String, required: true },
        phoneNumber: {type: String, required: true },
        type: {type: String, enum: Object.values(UserType),required: true },
    },
    { timestamps: true,
        autoIndex: true
    }
);

export const User = mongoose.model<IUser>('User', UserSchema);