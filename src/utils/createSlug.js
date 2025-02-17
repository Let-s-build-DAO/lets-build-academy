export function createSlug(title) {
  // Normalize the string and convert to lowercase
  let slug = title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  
  // Remove non-alphanumeric characters except for spaces and hyphens
  slug = slug.replace(/[^a-z0-9\s-]/g, '');
  
  // Replace spaces and repeated hyphens with a single hyphen
  slug = slug.replace(/[\s-]+/g, '-');
  
  // Strip leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');
  
  return slug;
}