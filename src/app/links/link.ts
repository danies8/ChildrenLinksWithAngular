/* Defines the link entity */
export interface Link {
    id: number;
    name: string;
    value: string;
    createdDateTime: string;
    imageUrl: string;
  }

  export interface LinkResolved {
    link: Link;
    error?: any;
  }