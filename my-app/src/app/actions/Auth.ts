"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";



const SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET_KEY!,
);
export async function LoginAuthAction(password: string, email: string){
    
    if(password === "" || email === ""){
        return { success: false, message: "Please fill inputs required first !", token: null }
    }

    const StoreCookie = await cookies();
    const token = await new SignJWT({ password, email })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(SECRET);

    StoreCookie.set("user-access-token", token, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60
    })

    return { success: true, message: "Account created successfully.", token: token };
}


export async function SignUpAuthAction(email: string, password: string, confirmpassword: string){
    
    if(email === "" && password === "" && confirmpassword === ""){
        return { success: false, message: "Please fill all required inputs first !" }
    }

    const token = await LoginAuthAction(password, email);
    const store = await cookies();
    const { payload } = await jwtVerify(token.token, SECRET);
}