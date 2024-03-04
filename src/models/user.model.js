import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    fullname: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },

    refreshToken: {
        type: String
    }
}, 
{
    timestamps: true
}
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    //next() //problem is that it will change the password each time
    // so what we want is that this could should run ONLY if we set or change the password
} )

userSchema.methods.isPasswordCorrect = async function (password) {
    //bcrypt can also check passwords if they are correct or not
    return await bcrypt.compare(password, this.password)
}

// we can also use methods to generate access token and refresh token
userSchema.methods.generateAccessToken = async function () {
    // you can add as many values as you want for the payload
    // jwt takes: payload, access token, 
    jwt.sign(
        {
            _id: this._id,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//refresh token is generated similarly, but it has less info in the payload part
export const User = mongoose.model("User", userSchema)