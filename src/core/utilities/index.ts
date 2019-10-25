export const constraints = {
    first_name: {
        presence: true,
        length: { maximum: 50 }
    },
    last_name: {
        presence: true,
        length: { maximum: 50 }
    },
    password: {
        presence: true,
        length: { minimum: 8, maximum: 20 }
    },
    email: {
        presence: true,
        email: true
    }
};
export const constraints2 = {
    password: {
        presence: true,
        length: { minimum: 8, maximum: 20 }
    },
    email: {
        presence: true,
        email: true
    }
};
export const constraints3 = {
    password: {
        presence: true,
        length: { minimum: 8, maximum: 20 }
    },
    newpassword: {
        presence: true,
        length: { minimum: 8, maximum: 20 }
    }
};
