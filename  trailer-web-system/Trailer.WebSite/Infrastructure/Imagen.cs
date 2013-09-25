using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.Specialized;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace Trailer.WebSite.Infrastructure
{
    public class Imagen
    {
        public int ID { get; set; }

        public int ID_TABLA { get; set; }

        public string NOMBRE_IMG { get; set; }

        public string EXTENSION { get; set; }

        public string DESCRIPCION { get; set; }

        public DateTime FECHA_REG { get; set; }

        public decimal TAMANO { get; set; }

        public string EQUIPO { get; set; }


        //solo permite los archivos imagenes y pdf
        public bool EsArchivoValido(HttpPostedFileBase FileUpload1)
        {

            string[] allowedImageTyps = { "image/gif", "image/jpeg", "image/bmp", "image/png" };

            StringCollection imageTypes = new StringCollection();

            imageTypes.AddRange(allowedImageTyps);

            if (imageTypes.Contains(FileUpload1.ContentType))
                //if (FileUpload1.ContentLength < 5048576)
                //{
                //    return true;
                //}
                //else
                //{
                //    return false;
                //}
                return true;


            else
            {

                return false;

            }

        }
        public void ResizeImage(Stream input, Stream output, int newWidth, int maxHeight)
        {
            using (var srcImage = Image.FromStream(input))
            {
                int newHeight = srcImage.Height * newWidth / srcImage.Width;
                if (newHeight > maxHeight)
                {
                    newWidth = srcImage.Width * maxHeight / srcImage.Height;
                    newHeight = maxHeight;
                }

                using (var newImage = new Bitmap(newWidth, newHeight))
                using (var gr = Graphics.FromImage(newImage))
                {
                    gr.SmoothingMode = SmoothingMode.AntiAlias;
                    gr.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    gr.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    gr.DrawImage(srcImage, new Rectangle(0, 0, newWidth, newHeight));
                    newImage.Save(output, ImageFormat.Jpeg);
                }
            }
        }
       
    }
}
     
           
            
           