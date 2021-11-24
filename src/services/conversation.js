import {Router} from "express"

const route = Router()

route.post("/", (req,res,next) =>{
    const io = req.io
    // console.log("io",io)
    const {members, title} = req.body
    const conversation = {
        title
    }
    const membersSockets = []
    for ( const socket of io.sockets.sockets){
        const [socketId, socketObject] = Object.values(socket)
        // console.log({socketId, socketObject})
        if(members.icnludes(socketObject.user.id)){
            membersSockets.push(socketObject)
        }
    }
    membersSockets.forEach(socket => {
        socket.join(conversation.title)
    })
    // const {partecipants} = req.body
    // const conversation = await new Conversation({partecipants}).save()
    // res.send(conversation)
    res.send("ok")
})

export default route