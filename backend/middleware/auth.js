const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')

module.exports = (context) => {
    context = { ...headers}
    const authHeader = context.req.headers.authorization;

    if(authHeader){
        //Bearer ...
        const token = authHeader.split('Bearer')[1];
        if(token){
            // revisar try catch
            try{
                // verificar que el token es válido, check
                const user = jwt.verify(token, 'UNSAFE_STRING');
                // si no es correcto tirar 401
                // jti = obtener jti de la variable token
                // session = Session.find_by(userId: user.id, jti: jti)
                // si sesion existe, está logueado
                // sino tirar 401. a pesar de que el token es válido, la sesión no existe (se está usando un token robado)
                return user;
            }catch(err){
                throw new AuthenticationError('Invalod/Expired token');
            }
        }
        throw new Error("Authentication token must be 'Bearer [token]");
    }
    throw new Error('Authorization header must be provided');
}