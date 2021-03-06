﻿// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityModel;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace Host.Configuration
{
    public class Resources
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new[]
            {
                // some standard scopes from the OIDC spec
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),

                // custom identity resource with some consolidated claims
                new IdentityResource("custom.profile", new[] { JwtClaimTypes.Name, JwtClaimTypes.Email, "location" })
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new[]
            {
                // simple version with ctor
                new ApiResource("api1", "Some API .Net Core")
                {
                    // this is needed for introspection when using reference tokens
                    ApiSecrets = { new Secret("secret".Sha256()) }, //bättre secret behövs såklart i produktion...

                    UserClaims =
                    {
                        JwtClaimTypes.Name,
                        JwtClaimTypes.Email,
                        "http://sambi.se/attributes/1/employeeHsaId"
                    },

                },
                new ApiResource("api2", "Some API .Net Framework")
                {
                    // this is needed for introspection when using reference tokens
                    ApiSecrets = { new Secret("secret".Sha256()) } //bättre secret behövs såklart i produktion...
                }

                
                // expanded version if more control is needed
            //    new ApiResource
            //    {
            //        Name = "api2",

            //        ApiSecrets =
            //        {
            //            new Secret("secret".Sha256())
            //        },

            //        UserClaims =
            //        {
            //            JwtClaimTypes.Name,
            //            JwtClaimTypes.Email
            //        },

            //        Scopes =
            //        {
            //            new Scope()
            //            {
            //                Name = "api2.full_access",
            //                DisplayName = "Full access to API 2"
            //            },
            //            new Scope
            //            {
            //                Name = "api2.read_only",
            //                DisplayName = "Read only access to API 2"
            //            }
            //        }
            //    }
            };
        }
    }
}