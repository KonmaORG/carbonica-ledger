
// This file simulates Next.js metadata pattern for easier migration
// In Next.js, this would be used in the app directory with metadata exports

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export const siteMetadata = {
  name: 'Carbonica',
  description: 'Carbon offset and credit management platform',
  url: 'https://carbonica.example.com',
}

export const dashboardMetadata: PageMetadata = {
  title: 'Carbonica - Dashboard',
  description: 'Track and manage your carbon offsets and credits',
  keywords: ['carbon offset', 'climate change', 'carbon credits', 'dashboard'],
};

export const projectsMetadata: PageMetadata = {
  title: 'Carbon Offset Projects - Carbonica',
  description: 'Browse and invest in verified carbon offset projects worldwide',
  keywords: ['carbon projects', 'offset projects', 'carbon reduction'],
};

export const registryMetadata: PageMetadata = {
  title: 'Public Registry - Carbonica',
  description: 'Explore the public registry of verified carbon offset projects',
  keywords: ['carbon registry', 'offset registry', 'public records'],
};

export const profileMetadata: PageMetadata = {
  title: 'My Profile - Carbonica',
  description: 'Manage your carbon offset portfolio and profile',
  keywords: ['carbon profile', 'user dashboard', 'offset management'],
};

// Helper function to use metadata (will be replaced by Next.js metadata in migration)
export const usePageMetadata = (metadata: PageMetadata) => {
  // In a React app, you'd use this to set document title
  // In Next.js, this would be handled by the metadata exports
  if (typeof document !== 'undefined') {
    document.title = metadata.title;
    
    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', metadata.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = metadata.description;
      document.head.appendChild(meta);
    }
  }
  
  return metadata;
};
