using BusinessLogic.Helpers;
using BusinessLogic.Interfaces;
using MailKit.Net.Imap;
using MailKit.Search;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class SmtpService : ISmtpService
    {
        private readonly EmailConfiguration emailConfiguration;

        public SmtpService()
        {
            emailConfiguration = new EmailConfiguration();
        }

        public void DownloadMessages()
        {
            using (var client = new ImapClient())
            {
                // Підключення до поштового сервера
                client.Connect("imap.ukr.net", 993, MailKit.Security.SecureSocketOptions.SslOnConnect);
                client.Authenticate(emailConfiguration.UserName, emailConfiguration.Password);

                // Відкриття скриньки вхідних повідомлень
                client.Inbox.Open(MailKit.FolderAccess.ReadOnly);

                // Пошук унікальних ідентифікаторів повідомлень
                var uids = client.Inbox.Search(SearchQuery.All);

                // Цикл для обробки кожного повідомлення
                foreach (var uid in uids)
                {
                    // Отримання повідомлення за його унікальним ідентифікатором
                    var message = client.Inbox.GetMessage(uid);

                    // Виведення інформації про повідомлення на консоль
                    Console.WriteLine("------------------");
                    Console.WriteLine("From: {0}", message.From);
                    Console.WriteLine("Subject: {0}", message.Subject);

                    // Запис повідомлення у файл з розширенням .eml
                    message.WriteTo(string.Format("{0}.eml", uid));
                }

                // Відключення від поштового сервера
                client.Disconnect(true);
            }
            
        }

        public void Send(Message message)
        {
            var body = new TextPart("html")
            {
                Text = message.Body,
            };

            var multipart = new Multipart("mixed");
            multipart.Add(body);

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("UrbanCore", emailConfiguration.From));
            emailMessage.To.Add(new MailboxAddress("Recipient Name", message.To));
            emailMessage.Subject = message.Subject;
            emailMessage.Body = multipart;

            using(var client = new MailKit.Net.Smtp.SmtpClient())
            {
                try
                {
                    client.Connect(emailConfiguration.SmtpServer, emailConfiguration.Port, true);
                    client.Authenticate(emailConfiguration.UserName, emailConfiguration.Password);
                    client.Send(emailMessage);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

        public void SuccessfulLogin(string userName, string email)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            Console.InputEncoding = System.Text.Encoding.UTF8;  

            SmtpClient smtpClient = new SmtpClient();

            Message info = new Message()
            {
                Subject = "Succesful login",
                Body = "",
                To = userName,
            };

            string basePath = AppContext.BaseDirectory;
            string filePath = Path.Combine(basePath, @"..\..\..\email\email-Registred.html");

            string html = File.ReadAllText(filePath);

            string newHtml = html.Replace("name", userName);

            info.Body = newHtml;

            Send(info);
        }
    }
}
