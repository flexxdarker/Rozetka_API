﻿namespace BusinessLogic.Entities
{
    public class Filter
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<FilterValue> Values { get; set; } = new HashSet<FilterValue>();
        public ICollection<CategoryFilter> Categories { get; set; } = new HashSet<CategoryFilter>();
    }
}
