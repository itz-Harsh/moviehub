import { Injectable } from '@angular/core';
import { Client, Databases, Query, ID } from 'appwrite';

@Injectable({ providedIn: 'root' })

export class ViewCountService {

  // Appwrite client
  private client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('695c9c3400040dad154b');

  private db = new Databases(this.client);

  private databaseId = '695ca222000ca9fa6fec';
  private collectionId = 'trending';

  /**
   * 🔹 Track a view (create if not exists, else increment)
   */
  async trackView(
    contentId: string,
    featured_image: string,
    title: string,
    categories:string,
    contentType: string
  ): Promise<void> {
    if (!contentId || !contentType) return;

    const res = await this.db.listDocuments(
      this.databaseId,
      this.collectionId,
      [Query.equal('contentId', contentId)]
    );

    // If document exists → increment
    if (res.documents.length > 0) {
      const doc = res.documents[0];

      await this.db.updateDocument(
        this.databaseId,
        this.collectionId,
        doc.$id,
        {
          count: (doc as any).count + 1
        }
      );
      return;
    }

    // If not exists → create with count = 1
    await this.db.createDocument(
      this.databaseId,
      this.collectionId,
      ID.unique(),
      {
        contentId,
        title,
        featured_image,
        contentType,
        count: 1,
        categories
      }
    );
  }

  /**
   * 🔹 Load all trending items (sorted by count DESC)
   */
  async loadTrending(limit: number = 20): Promise<any[]> {
    const res = await this.db.listDocuments(
      this.databaseId,
      this.collectionId,
      [
        Query.orderDesc('count'),
        Query.limit(limit)
      ]
    );

    return res.documents;
  }
}
