using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Dime
{
    public class MyHub : Hub
    {
        #region Data Members

        static List<UserDetail> ConnectedUsers = new List<UserDetail>();
        static List<MessageDetail> CurrentMessage = new List<MessageDetail>();
        static List<UsersNotify> UsuariosNoti = new List<UsersNotify>();


        #endregion
        public void sendMessagePublic(string userName, string message)
        {
            AddMessageinCache(userName, message);
            var NoNotif = CurrentMessage.FirstOrDefault(x => x.Message == message);
            Clients.All.addMessage(NoNotif.Id, userName, message);
        }
        public void notificacion(string Nombre_Imagen, string Ruta_Imagen, string Id_Notificado, string Descripcion_Imagen)
        {
            Clients.All.broadcastMessage(Nombre_Imagen, Ruta_Imagen, Id_Notificado, Descripcion_Imagen);
        }
        public void Connect()
        {
            for (int i = 1; i <= CurrentMessage.LongCount(); i++)
            {
                var UsuarioDeNotif = UsuariosNoti.FirstOrDefault(x => x.Id_Notify == i );
                //var MenNoNotif = CurrentMessage.FirstOrDefault(x => x.Id == UsuarioDeNotif.Id);
            }
            // send to caller
            Clients.All.onConnected(CurrentMessage); 
        }
        public void UsurioNotify(int IdNotify, string userName)
        {
            //var NoNotif = CurrentMessage.FirstOrDefault(x => x.Message == message);
            AddMessageinCache2(IdNotify, userName);
        }

        public void SendPrivateMessage(string fromUserId, string toUserId, string message)
        {
            //string fromUserId = Context.ConnectionId;
            var toUser = ConnectedUsers.FirstOrDefault(x => x.ConnectionId == toUserId);
            var fromUser = ConnectedUsers.FirstOrDefault(x => x.ConnectionId == fromUserId);

            if (toUser != null && fromUser != null)
            {
                // send to 
                Clients.Client(toUserId).sendPrivateMessage(fromUserId, fromUser.UserName, message, fromUserId);

                // send to caller user
                Clients.Caller.sendPrivateMessage(toUserId, fromUser.UserName, message, fromUserId);
            }

        }
        private void AddMessageinCache(string userName, string message)
        {
            var id = 1;
            CurrentMessage.Add(new MessageDetail { Id = id++, UserName = userName, Message = message });

            if (CurrentMessage.Count > 100)
                CurrentMessage.RemoveAt(0);
            
        }
        private void AddMessageinCache2(int id2, string userName)
        {
            var id = 1;
            UsuariosNoti.Add(new UsersNotify { Id = id++, Id_Notify = id2, UserNotif =  ""});

            if (UsuariosNoti.Count > 100)
                UsuariosNoti.RemoveAt(0);

        }
    }
}