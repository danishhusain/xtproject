export enum ResponseStatus {
    NO_CONTENT = 204,
    CREATED = 201,
    OK = 200,
    UNAUTHORIZED = 401,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500,
}

export enum ApiMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
}
