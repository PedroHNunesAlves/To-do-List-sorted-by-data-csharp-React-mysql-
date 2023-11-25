using System;
using MySql.Data.MySqlClient;

class Program
{
    static void Main()
    {
        string connectionString = "Server=localhost;Database=dtidatabase;User ID=root;Password=new_password;";
        MySqlConnection connection = new MySqlConnection(connectionString);

        try
        {
            connection.Open();

            LerLembretes(connection);

            ExcluirLembrete(connection, 1);

            LerLembretes(connection);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        finally
        {
            connection.Close();
        }
    }

    static void InserirLembrete(MySqlConnection connection, string lembrete, DateTime data)
    {
        string formattedDate = data.ToString("yyyy-MM-dd");
        string query = $"INSERT INTO lembretesdti (Lembrete, Data) VALUES ('{lembrete}', '{formattedDate}')";
        MySqlCommand command = new MySqlCommand(query, connection);
        command.ExecuteNonQuery();
        Console.WriteLine("Lembrete inserido com sucesso.");
    }

    static void LerLembretes(MySqlConnection connection)
    {
        string query = "SELECT * FROM lembretesdti";
        MySqlCommand command = new MySqlCommand(query, connection);
        MySqlDataReader reader = command.ExecuteReader();

        while (reader.Read())
        {
            Console.WriteLine($"ID: {reader["ID"]}, Lembrete: {reader["Lembrete"]}, Data: {reader["Data"]}");
        }

        reader.Close();
    }

    static void ExcluirLembrete(MySqlConnection connection, int id)
    {
        string query = $"DELETE FROM lembretesdti WHERE ID = {id}";
        MySqlCommand command = new MySqlCommand(query, connection);
        command.ExecuteNonQuery();
        Console.WriteLine("Lembrete excluído com sucesso.");
    }
}