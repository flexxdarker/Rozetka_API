using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Exceptions
{
    public class IdentityException(
    IdentityResult identityResult,
    string massage = "Identity exception"
) : Exception(massage)
    {

        public IdentityResult IdentityResult { get; init; } = identityResult
                ?? throw new ArgumentNullException(nameof(identityResult));
    }
}
