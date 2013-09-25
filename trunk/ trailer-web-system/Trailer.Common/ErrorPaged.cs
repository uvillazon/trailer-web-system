using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Trailer.Common
{
    [DataContract]
    public class ErrorPaged
    {
        [DataMember]
        public bool success { get; set; }

        [DataMember]
        public string msg { get; set; }

        [DataMember]
        public string datos { get; set; }

       
       
    }
}