import db from '../../models'

export const checkUsername = async (username: String): Promise<any> => {
    if (username === null || username === undefined) throw new Error('No Username was passed as ana argument')
    const user = await db.User.findOne({
        where: { username }
    })
    if (user) return user
    return false
}

export const checkEmail = async (email: string): Promise<any> => {
    console.log('checking for email', email)
    if (email === null || email === undefined) throw new Error('No email was passed as an argument')
    const userEmail = await db.User.findOne({
        where: { email }
    })
    if (userEmail) return userEmail
    return false
}

export const createUser = async (args: any): Promise<any> => {

    let user = await db.User.create({
        first_name: args.first_name,
        last_name: args.last_name,
        password: args.password,
        email: args.email
    })

    return user
}