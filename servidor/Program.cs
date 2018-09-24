using GDG.Jogos.Survivor;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace GDG.Jogos
{
    class Program
    {
        static PosicaoVeiculo[] Jogadores = new PosicaoVeiculo[4];

        static string CabecalhoRequisicao = "GET HTTP/1.1\r\n" +
                  "Access-Control-Allow-Origin: *\r\n" +
                  "Connection: keep-alive\r\n" +
                  "Content - Type: application/javascript\r\n" +
                  "User-Agent: Mozilla/5.0\r\n";
        static void Main(string[] args)
        {

            for (int i = 0; i < 4; i++)
                Jogadores[i] = new PosicaoVeiculo();

            new Thread(() => processador(0)).Start();
            new Thread(() => processador(1)).Start();
            new Thread(() => processador(2)).Start();
            new Thread(() => processador(3)).Start();

            new Thread(receptor).Start();
            new Thread(pagina).Start();
        }

        static void receptor()
        {
            TcpListener servidorSocket = new TcpListener(8085);
            TcpClient clienteSocket = default(TcpClient);

            servidorSocket.Start();

            while (true)
            {
                try
                {
                    clienteSocket = servidorSocket.AcceptTcpClient();
                    string[] dadosConexao = (new StreamReader(clienteSocket.GetStream())).ReadLine().Split(' ');

                    NetworkStream conexaoStream = clienteSocket.GetStream();

                    var construtorResposta = new StringBuilder();
                    construtorResposta.Append("{");
                    for (int i = 0; i < Jogadores.Length; i++)
                    {
                        construtorResposta.Append("\"" + i + "\":{");
                        construtorResposta.Append("\"x\":" + Jogadores[i].X + ",");
                        construtorResposta.Append("\"y\":" + Jogadores[i].Y);
                        construtorResposta.Append("}");

                        if (i < Jogadores.Length - 1)
                            construtorResposta.Append(",");
                    }
                    construtorResposta.Append("}");

                    StreamWriter stream = new StreamWriter(conexaoStream);
                    stream.WriteLine(CabecalhoRequisicao);
                    stream.Write(construtorResposta);
                    stream.Close();

                }
                catch (Exception a) { Console.Write(a.Message); }
            }
        }

        static void pagina()
        {
            TcpListener servidorSocket = new TcpListener(9098);
            TcpClient clienteSocket = default(TcpClient);

            servidorSocket.Start();

            while (true)
            {
                try
                {
                    clienteSocket = servidorSocket.AcceptTcpClient();
                    string[] dadosConexao = (new StreamReader(clienteSocket.GetStream())).ReadLine().Split(' ');

                    NetworkStream conexaoStream = clienteSocket.GetStream();

                    var construtorResposta = new StringBuilder();

                    using (WebClient client = new WebClient())
                    {
                        string htmlCode = client.DownloadString(@"C:\GDG\controle.html");
                        construtorResposta.Append(htmlCode);


                    }

                    StreamWriter stream = new StreamWriter(conexaoStream);
                    stream.WriteLine(CabecalhoRequisicao);
                    stream.Write(construtorResposta);
                    stream.Close();

                }
                catch (Exception a) { Console.Write(a.Message); }
            }
        }

        static void processador(int player)
        {


            int porta = 8080 + player;
            TcpListener servidorSocket = new TcpListener(porta);
            TcpClient clienteSocket = default(TcpClient);

            servidorSocket.Start();

            while (true)
            {
                try
                {
                    clienteSocket = servidorSocket.AcceptTcpClient();
                    string[] dadosConexao = (new StreamReader(clienteSocket.GetStream())).ReadLine().Split(' ');
                    dadosConexao = dadosConexao[1].Substring(1).Split('/');

                    NetworkStream conexaoStream = clienteSocket.GetStream();

                    Jogadores[player].X = Convert.ToInt32(dadosConexao[0]);
                    Jogadores[player].Y = Convert.ToInt32(dadosConexao[1]);

                    Console.WriteLine("Jogador:" + player + " | X:" + Jogadores[player].X + " | Y:" + Jogadores[player].Y);

                }
                catch (Exception a) { Console.Write(a.Message); }
            }
        }
    }


}
