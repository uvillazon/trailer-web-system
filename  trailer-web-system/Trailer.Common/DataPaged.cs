using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Trailer.Common
{
    [DataContract]
    public class DataPaged<T>
    {
        [DataMember]
        public int Total { get; set; }

        [DataMember]
        public int Page { get; set; }

        [DataMember]
        public int Records { get; set; }

        [DataMember]
        public IList<T> Rows { get; set; }
    }
}