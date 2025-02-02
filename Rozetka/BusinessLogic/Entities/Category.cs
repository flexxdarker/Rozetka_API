namespace BusinessLogic.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        //public bool IsDeleted { get; set; }
        public string Image { get; set; } = string.Empty;
        public ICollection<Advert> Adverts { get; set; } = new HashSet<Advert>();
        public ICollection<CategoryFilter> Filters { get; set; } = new HashSet<CategoryFilter>();
        public int? ParentCategoryId { get; set; }
        public Category? ParentCategory { get; set; } = null!;
        public ICollection<Category>? SubCategories { get; set; } = new HashSet<Category>();

    }
}
