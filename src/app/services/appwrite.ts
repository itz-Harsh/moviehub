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
    record_id: number,
    featured_image: string,
    title: string,
    categories:string,
    contentType: string,
    seasons: string,
    streams: any = null
  ): Promise<void> {
    if (!record_id || !contentType) return;

    const res = await this.db.listDocuments(
      this.databaseId,
      this.collectionId,
      [Query.equal('title', title)]
    );

    // If document exists → increment
    if (res.documents.length > 0) {
      const doc = res.documents[0];

      await this.db.updateDocument(
        this.databaseId,
        this.collectionId,
        doc.$id,
        {
          record_id,
          title,
          featured_image,
          contentType,
          count: (doc as any).count + 1,
          categories,
          seasons: seasons ? JSON.stringify(seasons) : null,
          streams: streams ? JSON.stringify(streams) : null
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
        record_id,
        title,
        featured_image,
        contentType,
        count: 1,
        categories,
        seasons: seasons ? JSON.stringify(seasons) : null,
        streams: streams ? JSON.stringify(streams) : null
      }
    );
  }

  /**
   * 🔹 Load all trending items (sorted by count DESC)
   */
  async loadTrending(limit: number = 10): Promise<any[]> {
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

  async loadById(documentId: string): Promise<any> {
  return await this.db.getDocument(
    this.databaseId,
    this.collectionId,
    documentId
  );
}



}

