using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace DataAccess.Models
{
    public class ApplicationRole : IdentityRole
    {

        public string UpdatedByUserId { get; set; }

        public DateTime UpdatedDateUTC { get; set; }

        [MaxLength(500, ErrorMessage = "Maximum of 500 characters allowed.")]
        public string Description { get; set; }

        public ICollection<ApplicationUserRole> UserRoles { get; set; }
    }
}
