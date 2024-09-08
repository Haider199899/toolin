import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../../core-modules/auth/auth.service';
import { db } from '../../config/firebase-config';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateToolDTO } from './dto/create-tool.dto';
import { trackingDates } from '../../shared/utils/tracking-fields';
import { ToolListResponseType } from './types/get-tools-response.type';
import { CategoryResponseType } from './types/get-categories-response.type';
import { PaginationDto } from 'src/shared/dtos/pagination-dto';
import { IPaginatedData } from 'src/shared/interfaces/paginated-data.interface';
import { GetToolDTO } from './dto/get-tool.dto';

@Injectable()
export class ToolService {
  private categoriesCollection = db.collection('categories');
  private toolsCollection = db.collection('tools');
  constructor(private readonly authService: AuthService) {}

  async create(createToolDto: CreateToolDTO) {
    // Add the new tool document to Firestore
    const toolDoc = this.toolsCollection.doc();

    await toolDoc.set({
      ...createToolDto,
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
        query = query.where('name', '==', toolList.name);
      }
      if (toolList.category1) {
        query = query.where('category1', '==', toolList.category1);
      }
      if (toolList.category2) {
        query = query.where('category2', '==', toolList.category2);
      }
      if (toolList.category3) {
        query = query.where('category3', '==', toolList.category3);
      }
  
      // Execute the query without limit and offset for counting purposes
      const toolsSnapshot = await query.get();
  
      // Check if the snapshot is empty
      if (toolsSnapshot.empty) {
        throw new NotFoundException('Tools not found');
      }
  
      // Get the total count of documents that match the filters
      const totalTools = toolsSnapshot.size;
  
      // Apply limit and offset at the end
      const paginatedQuery = query
        .limit(toolList.limit)
        .offset(toolList.offset);
      const paginatedSnapshot = await paginatedQuery.get();
  
      // Map the documents to an array of tool data
      const toolsList: ToolListResponseType[] = paginatedSnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        }),
      ) as ToolListResponseType[];
  
      return {
        data: toolsList,
        pagination: {
          limit: toolList.limit,
          offset: toolList.offset,
          count: totalTools,
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
