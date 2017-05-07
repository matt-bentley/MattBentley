﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MattBentley.Server.Entities
{
    public class ChatRoom
    {
        public ChatRoom() : this(Guid.NewGuid())
        {

        }

        public ChatRoom(string id) : this(new Guid(id))
        {

        }

        public ChatRoom(Guid id)
        {
            Id = id;
            CreatedDate = DateTime.Now;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
