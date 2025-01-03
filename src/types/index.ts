export type User = {
    handle: string
    name: string
    email: string,
    description: string,
    image: string,
    links: string,
    _id: string,
}
export type RegisterForm = Pick<User, 'handle' | 'email' | 'name'> & {

    password: string
    password_confirmation: string
}

export type LoginForm = Pick<User, 'email'> & {
    password: string
}

export type UpdateForm = Pick<User, 'handle' | 'description'>

export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>

export type DevTreeUser = Pick<User, 'name' | 'handle' | 'description' | 'image' | 'links'>

export type DevTreeHandle = Pick<User, 'handle'>