import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from '../../core-modules/auth/auth.service';
import { db } from '../../config/firebase-config';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateToolDTO } from './dto/create-tool.dto';
import { trackingDates } from '../../shared/utils/tracking-fields';
import { ToolListResponseType } from './types/get-tools-response.type';
import { CategoryResponseType } from './types/get-categories-response.type';
import { PaginationDto } from 'src/shared/dtos/pagination-dto';
import { IPaginatedData } from 'src/shared/interfaces/paginated-data.interface';

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
    paginationDto: PaginationDto,
  ): Promise<IPaginatedData<ToolListResponseType>> {
    try {
      // Fetch the tools with pagination
      const toolsSnapshot = await this.toolsCollection
        .limit(paginationDto.limit)
        .offset(paginationDto.offset)
        .get();

      // Check if the snapshot is empty
      if (toolsSnapshot.empty) {
        throw new NotFoundException('Tools not found');
      }

      // Map the documents to an array of tool data
      const toolsList: ToolListResponseType[] = toolsSnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        }),
      ) as ToolListResponseType[];

      // Get the total count of documents
      const totalTools = (await this.toolsCollection.get()).size;

      return {
        data: toolsList,
        pagination: {
          limit: paginationDto.limit,
          offset: paginationDto.offset,
          count: totalTools,
        },
      };
    } catch (error) {
      throw new Error(error); // Rethrow error to handle it further up the call stack
    }
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
}
