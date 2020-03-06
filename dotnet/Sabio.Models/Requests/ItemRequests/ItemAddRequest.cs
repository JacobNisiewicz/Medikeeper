using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests
{
    public class ItemAddRequest
    {
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string ItemName { get; set; }
        [Required]
        public int Cost { get; set; }
    }
}
