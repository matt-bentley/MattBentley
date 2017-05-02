using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.Repositories.Abstract;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Server.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private static string _filePath = @"./Database/Users.json";
        private static JsonSerializerSettings _jsonSettings =
            new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };

        private async Task<List<ApplicationUser>> GetUsers()
        {
            await Task.Delay(0);
            return JsonConvert.DeserializeObject<List<ApplicationUser>>(File.ReadAllText(_filePath));
        }

        private async Task SetUsers(List<ApplicationUser> users)
        {
            string output = JsonConvert.SerializeObject(users, _jsonSettings);
            await Task.Delay(0);
            File.WriteAllText(_filePath, output);
        }

        public async Task<ApplicationUser> GetById(string id)
        {
            List<ApplicationUser> users = await GetUsers();
            for (int i = 0; i < users.Count; i++)
            {
                if (users[i].Id == id)
                {
                    return users[i];
                }
            }
            return null;
        }

        public async Task<ApplicationUser> GetByName(string name)
        {
            List<ApplicationUser> users = await GetUsers();
            for (int i = 0; i < users.Count; i++)
            {
                if (users[i].Email.ToUpper() == name)
                {
                    return users[i];
                }
            }
            return null;
        }

        public async Task Add(ApplicationUser user)
        {
            List<ApplicationUser> users = await GetUsers();
            users.Add(user);
            await SetUsers(users);
        }

        public async Task<bool> Update(ApplicationUser user)
        {
            bool match = false;
            List<ApplicationUser> users = await GetUsers();
            for (int i = 0; i < users.Count; i++)
            {
                if (users[i].Id == user.Id)
                {
                    users[i] = user;
                    match = true;
                    break;
                }
            }
            if (match)
            {
                await SetUsers(users);
            }
            return match;
        }

        public async Task<bool> Delete(ApplicationUser user)
        {
            bool match = false;
            List<ApplicationUser> users = await GetUsers();
            match = users.Remove(user);
            if (match)
            {
                await SetUsers(users);
            }
            return match;
        }
    }
}
