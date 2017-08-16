declare module 'wp-relay-app' {
  declare type Props = {};

  declare type HierarchyItem = {
    parent: String,
    node: Object,
  };

  declare type Edge = {
    node: Object,
    cursor: string,
  };

  declare type PageInfo = {
    startCursor: string,
    endCursor: string,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
  };

  declare type Connection = {
    edges: Array<Edge>,
    pageInfo: PageInfo,
  };

  declare type Meta = {
    name: string,
    value: any,
  };

  declare type Text = {
    text: string,
  };

  declare type Embed = {
    title: string,
    thumbnailUrl: string,
    html: string,
    width: number,
    height: number,
  };

  declare type Element = {
    tagName: string,
    attributes: Array<Meta>,
    children: Array<Text | Embed | Element>,
  };

  declare type ContentNode = Text | Embed | Element;

  // Home

  declare type HomeProps = {
    viewer: {|
      readThis: Connection,
      watchThis: Connection,
      listenToThis: Connection,
      stickies: Connection,
    |},
  };

  // Singular

  declare type Singular = {
    id: string,
    title: {|
      raw: string,
    |},
    content: {|
      data: Array<ContentNode>,
    |},
    featuredMedia: {
      sourceUrl?: string,
      media: Object,
    },
  };

  // Single

  declare type PostTag = {|
    id: string,
    name: string,
    slug: string,
  |};

  declare type SingleProps = {
    viewer: {|
      post: Singular & {
        date: string,
        excerpt: {|
          raw: string,
        |},
        tags: Array<PostTag>,
        comments: Connection,
      },
    |},
  };

  // Page

  declare type PageProps = {
    viewer: {|
      page: Singular & {
        slug: string,
      },
    |},
  };

  // Search

  declare type SearchProps = {
    viewer: {|
      posts: Connection,
    |},
    relay: RelayRefetchProp,
  };

  declare type SearchBoxProps = {
    onSetTerm: func,
    onRefetch: func,
    pageInfo: PageInfo,
    relay: RelayRefetchProp,
  };

  // Date

  declare type DateProps = {
    viewer: {|
      posts: Connection,
    |},
    params: {
      month: string | number,
      day: string | number,
      year: string | number,
    },
    relay: RelayPaginationProp,
  };

  // Author

  declare type AuthorProps = {
    viewer: {|
      author: {
        id: string,
        name: string,
      },
      posts: Connection,
    |},
    relay: RelayPaginationProp,
  };

  // Term

  declare type Term = {|
    id: string,
    name: string,
    slug: string,
    taxonomy: {|
      rewrite: {
        slug: string,
      },
      labels: {
        singular: string,
        plural: string,
      },
    |},
  |};

  declare type TermProps = {
    viewer: {|
      term: Term,
      posts: Connection,
    |},
    relay: PaginationProp,
  };

  declare type ChartImage = {|
    url: string,
    height: number,
  |};

  // Charts
  declare type ChartItem = {|
    title: string,
    artist: string,
    releaseDate: string,
    releaseDateFormatted: string,
    url: string,
    copyright: string,
    images: Array<ChartImage>,
  |};

  declare type ITunesChart = {|
    title: string,
    copyright: string,
    updated: string,
    authorName: string,
    authorUri: string,
    items: Array<ChartItem>,
  |};

  declare type ChartProps = {
    viewer: {|
      chart: ITunesChart,
    |},
  };
}
