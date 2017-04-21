export const getTaxonomyDisplay = (taxonomy) => {
  switch (taxonomy) {
    case 'post_tag':
      return 'Tagged';
    default:
      return taxonomy.slug.toUpperCase();
  }
};

export const getTaxonomyRewriteSlug = (taxonomy) => {
  switch (taxonomy.slug) {
    case 'post_tag':
      return 'tag';
    default:
      return taxonomy.slug;
  }
};
