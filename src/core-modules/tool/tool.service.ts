import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { db } from '../../config/firebase-config';
import { CreateToolDTO } from './dto/create-tool.dto';
import { ToolListResponseType } from './types/get-tools-response.type';
import { CategoryResponseType } from './types/get-categories-response.type';
import { IPaginatedData } from 'src/shared/interfaces/paginated-data.interface';
import { GetToolDTO } from './dto/get-tool.dto';
import { capitalizeFirstLetter } from 'src/shared/utils/naming.utils';

@Injectable()
export class ToolService {
  private toolsCollection = db.collection('tools');
  constructor() {}

  async create(createToolDto: CreateToolDTO) {
    // Add the new tool document to Firestore
    const toolDoc = this.toolsCollection.doc();

    await toolDoc.set({
      ...createToolDto,
      lowercase_name: createToolDto.name.toLowerCase(),
      createdOn: new Date().toISOString(), // Add a timestamp for creation
    });

    return { id: toolDoc.id, ...createToolDto };
  }

  async getTool(id: string) {
    const toolDoc = await this.toolsCollection.doc(id).get();
    if (!toolDoc.exists) {
      throw new NotFoundException('Tool not found');
    }
    return toolDoc.data();
  }

  async getTools(
    toolList: GetToolDTO,
  ): Promise<IPaginatedData<ToolListResponseType>> {
    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      this.toolsCollection;
    // Check and apply lat/lng filter
    if (toolList.lat !== null || toolList.lng !== null) {
      const hasLocation = this.isLocationProvided(toolList.lat, toolList.lng);
      if (hasLocation) {
        query = query
          .where('_geoloc.lat', '==', toolList.lat)
          .where('_geoloc.lng', '==', toolList.lng);
      } else {
        throw new BadRequestException(
          'Both lat and lng must be provided together.',
        );
      }
    }

    if (toolList.name) {
      const name = capitalizeFirstLetter(toolList.name);
      query = query.where('name', '>=', name).where('name', '<', name + 'z');
    }
    // Apply category filter with OR logic
    if (toolList.category) {
      const category = toolList.category;
      const categoryQueries = [
        query.where('category1', '==', category),
        query.where('category2', '==', category),
        query.where('category3', '==', category),
      ];

      // Execute all queries and combine results
      const queryResults = await Promise.all(
        categoryQueries.map((q) => q.get()),
      );

      const allDocs = queryResults.flatMap((snapshot) => snapshot.docs);
      const uniqueDocs = Array.from(new Set(allDocs.map((doc) => doc.id))).map(
        (id) => allDocs.find((doc) => doc.id === id),
      );
      const totalCount = uniqueDocs.length;

      // Create a paginated result
      const limit = toolList.limit ? toolList.limit : 10;
      const offset = toolList.offset ? toolList.offset : 0;

      // Slice documents for pagination
      const paginatedDocs = uniqueDocs.slice(offset, offset + limit);
      const toolsList: ToolListResponseType[] = paginatedDocs.map((doc) => {
        const { lowercase_name, ...rest } = doc.data(); // Destructure to exclude 'lowercase_name'
        return {
          id: doc.id,
          ...rest, // Spread the rest of the data excluding 'lowercase_name'
        };
      }) as ToolListResponseType[];

      return {
        data: toolsList,
        pagination: {
          limit: toolList.limit,
          offset: toolList.offset,
          count: totalCount,
        },
      };
    }

    // If no category filter, just apply pagination
    const limit = toolList.limit ? toolList.limit : 10;
    const offset = toolList.offset ? toolList.offset : 0;

    // Count total records matching the query
    const countSnapshot = await query.get();
    const totalCount = countSnapshot.size;

    const toolsSnapshot = await query.limit(limit).offset(offset).get();
    if (toolsSnapshot.empty) {
      return {
        data: [],
        pagination: {
          limit: toolList.limit,
          offset: toolList.offset,
          count: 0,
        },
      };
    }

    const toolsList: ToolListResponseType[] = toolsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ToolListResponseType[];

    return {
      data: toolsList,
      pagination: {
        limit: toolList.limit,
        offset: toolList.offset,
        count: totalCount,
      },
    };
  }
  async getCategoriesList(): Promise<CategoryResponseType> {
    const snapshot = await this.toolsCollection.get();

    // Sets to hold unique values
    const category1Set = new Set<string>();
    const category2Set = new Set<string>();
    const category3Set = new Set<string>();

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.category1) category1Set.add(data.category1);
      if (data.category2) category2Set.add(data.category2);
      if (data.category3) category3Set.add(data.category3);
    });

    // Convert sets to arrays
    const category1 = Array.from(category1Set);
    const category2 = Array.from(category2Set);
    const category3 = Array.from(category3Set);

    return { category1, category2, category3 };
  }

  async findTool(toolId: string): Promise<any> {
    const toolDoc = await this.toolsCollection.where('id', '==', toolId).get();
    if (toolDoc.empty) {
      throw new NotFoundException(`Tool Not found.`);
    }
    return toolDoc;
  }

  private isLocationProvided(lat: number, lng: number): boolean {
    if (lat !== null && lng !== null) {
      return true;
    }
    if (lat === null && lng !== null) {
      return false;
    }
    if (lat !== null && lng === null) {
      return false;
    }
  }
}
