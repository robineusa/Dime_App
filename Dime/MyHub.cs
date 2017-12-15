using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Dime.Helpers;
using Telmexla.Servicios.DIME.Entity;

namespace Dime
{
    public class MyHub : Hub
    {
        #region Data Members

        static List<UserDetail> ConnectedUsers = new List<UserDetail>();
        static List<MessageDetail> CurrentMessage = new List<MessageDetail>();
        static List<UsersNotify> UsuariosNoti = new List<UsersNotify>();
        static List<MessageDetail> ListTemporal = new List<MessageDetail>();

        #endregion
        WSD.SignalRServiceClient signalRService;
        public MyHub()
        {
            signalRService = new WSD.SignalRServiceClient();
            signalRService.ClientCredentials.Authenticate();
        }
        public void sendMessagePublic(string userName, string message, string fecha)
        {
            AddMessageinCache(userName, message, fecha);
            var NoNotif = CurrentMessage.LastOrDefault(x => x.Message == message && x.UserName == userName);
            Clients.All.addMessage(NoNotif.Id, userName, message);

        }
        public void notificacion(string Nombre_Imagen, string Ruta_Imagen, string Id_Notificado, string Descripcion_Imagen)
        {
            Clients.All.broadcastMessage(Nombre_Imagen, Ruta_Imagen, Id_Notificado, Descripcion_Imagen);
        }
        public void Connect(string User)
        {
            if (User != "Buen Servicio")
            {
                if (CurrentMessage.LongCount() != 0)
                {
                    for (int i = 0; i < CurrentMessage.LongCount(); i++)
                    {
                        var UsuarioDeNotif = UsuariosNoti.Any(x => x.Id_Notify == i+1 && x.UserNotif == User);
                        if (UsuarioDeNotif == false)
                        {
                            var MenNoNotif = CurrentMessage.FirstOrDefault(x => x.Id == i+1);
                            var Validacion = ListTemporal.Exists(x => x.Id == i+1);
                            if (Validacion == false)
                                ListTemporal.Add(new MessageDetail { Id = MenNoNotif.Id, Message = MenNoNotif.Message, UserName = MenNoNotif.UserName, Fecha_Entrega = MenNoNotif.Fecha_Entrega});

                        }
                    }
                }
            }
            // send to caller
            if (ListTemporal.LongCount() != 0)
            {
                Clients.Caller.onConnected(ListTemporal);
                ListTemporal.Clear();
            }
            Clients.Caller.connectEver(CurrentMessage);

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
        public void AddMessageinCache(string userName, string message, string fecha)
        {
            var id = CurrentMessage.Count+1;
            CurrentMessage.Add(new MessageDetail { Id = id, UserName = userName, Message = message, Fecha_Entrega = fecha });

            if (CurrentMessage.Count > 100)
                CurrentMessage.RemoveAt(0);

        }
        public void AddMessageinCache2(int id2, string userName)
        {
            var id = UsuariosNoti.Count + 1;
            var Validacion2 = UsuariosNoti.Exists(x => x.Id_Notify == id2 && x.UserNotif == userName);

            if (Validacion2 == false)
            {
                UsuariosNoti.Add(new UsersNotify { Id = id, Id_Notify = id2, UserNotif = userName });
                if (UsuariosNoti.Count > 100)
                    UsuariosNoti.RemoveAt(0);
            }
        }
        public void todosMensajes()
        {
            Clients.All.todosMsm(CurrentMessage);
        }
        public void NotificacionComercial(string TipoNotificacion, string ContenidoAlerta, string Usuario)
        {
            NotificacionSignalR model = new NotificacionSignalR();
            model.TipoNotificacion = TipoNotificacion;
            model.ContenidoAlerta = ContenidoAlerta;
            model.UsuarioNotifica = Usuario;

            //signalRService.InsertarNotificacionSignalR(model);
            
            Clients.All.enviaCliente();
        }
        public void ConsultaNotificacion(string Usuario)
        {
            var result = signalRService.ListaNoNotificados(Convert.ToDecimal(Usuario));
            List<NotificacionSignalR> ListaOfertaComercial = new List<NotificacionSignalR>();
            
            foreach (var item in result)
            {
                if (item.TipoNotificacion == "Notificacion Oferta Comercial")
                {
                    ListaOfertaComercial.Add(item);
                }
            }
            Clients.Caller.notificaUsuarios(ListaOfertaComercial);
        }
        public void GuardaNotificadoOfertaComercial(string OfertasComerciales, string Usuario)
        {
            string[] Ofertas = { };
            if (OfertasComerciales != null)
                Ofertas = OfertasComerciales.Split('-');
            List<string> listaOfertasComerciales = Ofertas.OfType<string>().ToList();
            UsuariosNotificadosSignalR model = new UsuariosNotificadosSignalR();
            model.UsuarioNotificado = Convert.ToDecimal(Usuario);

            signalRService.InsertarUsuarioNotificadoSignalR(listaOfertasComerciales, model);

            Clients.Caller.FinNotifica(); ;
        }
        
    }
}