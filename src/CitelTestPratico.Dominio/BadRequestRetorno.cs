﻿namespace CitelTestPratico.Dominio
{
    public class BadRequestRetorno
    {
        public bool success { get; set; }
        public List<string> errors { get; set; }

        public BadRequestRetorno()
        {
            success = false;
        }
    }
}
