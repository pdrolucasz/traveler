import { inject, injectable } from 'tsyringe'

import User from '../infra/typeorm/entities/User'

import IUsersRepository from '../repositories/IUsersRepository'

import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import ICreateUserDTO from '../dtos/ICreateUserDTO'

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email)

        if(checkUserExists) {
            throw new Error('Email address already used.')
        }

        const hashedPassword = await this.hashProvider.generateHash(password)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        })

        return user
    }
}

export default CreateUserService