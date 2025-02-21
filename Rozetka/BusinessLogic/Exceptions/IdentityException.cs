using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Exceptions
{
    public class IdentityException : Exception
    {
        public IdentityResult IdentityResult { get; }

        public IdentityException(IdentityResult identityResult, string message = "Identity exception")
            : base(message)
        {
            IdentityResult = identityResult ?? throw new ArgumentNullException(nameof(identityResult));
        }
    }
}
