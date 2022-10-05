namespace CitelTestPratico.Dominio.Core.Models
{
    public abstract class Entity
    {
        protected Entity()
        {
            DataHoraCadastro = DateTime.Now;
        }

        public virtual int Id { get; set; }
        public DateTime DataHoraCadastro { get; set; }
    }
}
