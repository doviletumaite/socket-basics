import * as sendMessageEvent from "./sendMessage.js";

const conversations = [
  {
    id: "tech",
  title: "Tech",
  partecipants: [1, 2],
},
{
  id: "mongo",
  title: "Mongo",
  partecipants: [],
},
]
const onConnection = (io, socket) => {
  console.log("socket is connected :] with id " + socket.id);
//  here i'm gonna do things when the user connected 
//  client join channel/conversation/room and we listen
// const myConversation = await Conversation.find({participants: socket.user_id})
// myConversation.forEach(conversation=>{
//    socket.join(conversation._id)
// }) 
const myConversation =  conversations.filter(conversation => conversation.partecipants.includes(socket.user.id))
console.log("myConversation",myConversation)
myConversation.forEach(conversation=>{
  console.log(conversation)
   socket.join(conversation.id)})
socket.on(sendMessageEvent.name,(payload) => sendMessageEvent.handler(socket,payload))

};

export default onConnection;
