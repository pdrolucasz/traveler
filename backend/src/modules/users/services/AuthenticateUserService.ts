import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import { injectable, inject } from 'tsyringe'

import User from '../infra/typeorm/entities/User'

import IUsersRepository from '../repositories/IUsersRepository'

import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface Request {
    email: string
    password: string
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({
        email,
        password
    }: Request): Promise<{ user: User, token: string }> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new Error('Incorrect email/password combination')
        }

        const passwordMethod = await this.hashProvider.compareHash(
            password,
            user.password
        )

        if (!passwordMethod) {
            throw new Error('Incorrect email/password combination');
        }

        const { expiresIn, secret } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserService
