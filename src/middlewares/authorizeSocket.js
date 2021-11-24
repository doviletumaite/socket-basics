const users = [
    {id: 1, name: "dovi", password: "123"},
    {id: 2, name: "bob", password: "123"},
    {id: 3, name: "gino", password: "123"},
]

const authorizeUser = (token) => {
    console.log(token)
    const base64DecodedToken = Buffer.from(token, "base64").toString()
    console.log("base64DecodedToken",base64DecodedToken)
    const [method, base64EncodedBasicToken] = base64DecodedToken.split(" ")
    const [name, password] = base64EncodedBasicToken.split(":")
    const user = users.find(user=> user.name === name & user.password === password)
    console.log("user",user)
    if(user){
        return user
    } else {
        throw new Error ("user not found")
    }
}

const authorizeSocket = (socket, next) => {
    console.log("socket",socket)
    const user = authorizeUser(socket.handshake.headers.authorization)
    socket.user = user 
  next();
};
export default authorizeSocket;
