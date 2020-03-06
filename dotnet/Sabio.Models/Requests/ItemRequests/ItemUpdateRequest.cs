using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.ItemRequests
{
    public class ItemUpdateRequest : ItemAddRequest
    {
        [Required]
        public int Id { get; set; }
    }
}
