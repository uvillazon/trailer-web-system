using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Trailer.Common
{
    //Clase Definida Para la Paginacion y Ordenamiento segun EXT JS 4
    public class PagingInfo
    {
        
        public int page { get; set; } //Numero De Pagina
        public int start { get; set; } //Inicio De La Lista de Donde Comenzar
        public int limit { get; set; } //Hasta Donde Mostrar
        public string sort { get; set; } //Que Campo Ordenar
        public string dir { get; set; } // De que Formar Ordenar ASC DESC
        public long _dc { get; set; } // Reservado para de EXTJS
        public string callback { get; set; } //Es un Control de Llamadas Para Evitar Cruce de Datos Entre Usuarios
        public string search { get; set; } // Parametro de Busqueda Opcional
        
    }
}
//(int page, int start, string limit, string sort, string dir, int _dc, string callback)
       